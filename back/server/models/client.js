'use strict';

module.exports = function(Client) {

    Client.CreateOne = function(client, callback) {
        Client.findOne({
            where: {rfc: client.rfc, deleted: false}
        }, (err, clientFound) => {
            if(err) return callback(err);
    
            if(!!clientFound) return callback('El RFC ya está registrado');

            Client.create(client, (err, newClient) => {
                if(err) return callback(err);
                
                client.address.clientId = newClient.id;
                client.address.alias = `Principal`;
                client.address.isDefault = true;
                Client.app.models.Address.CreateOne(client.address, (err, newAddress) => {
                    if(err) {
                        newClient.destroy((err2, destroyed) => {
                            if(err2) return callback(err2);
                            return callback(err);
                        });
                    }
                    else return callback(null, newClient);
                });
            });
        });
    }

    Client.CreateArray = function(clients, callback) {
        let data = {
            clientsFailed: [],
            clientsSuccess: []
        }
        let cont = 0, limit = clients.length;
        if(!limit) return callback(null, data);
        clients.forEach(client => {
            Client.CreateOne(client, (err, newClient) => {
                if(err) {
                    data.clientsFailed.push({client, reason: typeof err === 'string' ? err : null});
                }
                else data.clientsSuccess.push(newClient);

                if(++cont == limit) return callback(null, data);
            });
        });
    }

    Client.GetAll = function(text, callback) {
        let where = {deleted: false};
        if(!!text && text != '*') {
            where['or'] = [
                {name: {like: `%${text}%`}},
                {rfc: {like: `%${text}%`}},
            ]
        }
        Client.find({
            where,
            include: {
                relation: 'addresses',
                scope: {
                  order: 'isDefault DESC'
                }
            },
            order: 'name ASC'
        }, (err, clients) => {
            if(err) return callback(err);

            return callback(null, clients);
        });
    }

    Client.Update = function(client, callback) {
        Client.findOne({where: {rfc: {like: `%${client.rfc}%`}}}, (err, clientFound) => {
            if(err) return callback(err);

            if(!!clientFound && clientFound.id != client.id) return callback(`El RFC ya está registrado`);
            Client.upsert(client, (err, clientUpdated) => {
                if(err) return callback(err);
            
                if(!client.address.id) client.address.clientId = client.id;

                Client.app.models.Address.upsert(client.address, (err, addressUpdated) => {
                    if(err) return callback(err);
    
                    return callback(null, clientUpdated);
                });
            });
        });
    }

    Client.prototype.Delete = function(callback) {
        Client.app.models.Orders.find({where: {clientId: this.id}}, (err, clientOrders) => {
            if(err) return callback(err);

            if(!!clientOrders.length) return callback(`El cliente ya tiene ordenes`);
            this.deleted = true;
            this.rfc = null;
            this.save((err, deleted) => {
                if(err) return callback(err);
    
                return callback(null, deleted);
            });
        });
    }

};
