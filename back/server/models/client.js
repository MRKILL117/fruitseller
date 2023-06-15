'use strict';

module.exports = function(Client) {

    Client.CreateOne = function(ctx, client, callback) {
        const userId = ctx.accessToken.userId;
        Client.findOne({
            where: {rfc: client.rfc, adminId: userId, deleted: false}
        }, (err, clientFound) => {
            if(err) return callback(err);
    
            if(!!clientFound) return callback('El RFC ya está registrado');

            client.adminId = userId;
            Client.create(client, (err, newClient) => {
                if(err) return callback(err);
                
                client.address.clientId = newClient.id;
                Client.app.models.Address.CreateOne(client.address, (err, newAddress) => {
                    if(err) return callback(err);
                    return callback(null, newClient);
                });
            });
        });
    }

    Client.CreateArray = function(ctx, clients, callback) {
        let data = {
            clientsFailed: [],
            clientsSuccess: []
        }
        let cont = 0, limit = clients.length;
        if(!limit) return callback(null, data);
        clients.forEach(client => {
            Client.CreateOne(ctx, client, (err, newClient) => {
                if(err) {
                    data.clientsFailed.push({client, reason: typeof err === 'string' ? err : null});
                }
                else data.clientsSuccess.push(newClient);

                if(++cont == limit) return callback(null, data);
            });
        });
    }

    Client.GetAll = function(ctx, text, callback) {
        const userId = ctx.accessToken.userId;
        let where = {
            adminId: userId, deleted: false
        }
        if(!!text && text != '*') {
            where['or'] = [
                {name: {like: `%${text}%`}},
                {rfc: {like: `%${text}%`}},
                {state: {like: `%${text}%`}},
                {country: {like: `%${text}%`}},
                {postalCode: {like: `%${text}%`}},
            ]
        }
        Client.find({
            where,
            include: 'addresses',
            order: 'name ASC'
        }, (err, clients) => {
            if(err) return callback(err);

            return callback(null, clients);
        });
    }

    Client.Update = function(client, callback) {
        Client.upsert(client, (err, clientUpdated) => {
            if(err) return callback(err);

            return callback(null, clientUpdated);
        });
    }

    Client.prototype.Delete = function(callback) {
        this.deleted = true;
        this.save((err, deleted) => {
            if(err) return callback(err);

            return callback(null, deleted);
        });
    }

};
