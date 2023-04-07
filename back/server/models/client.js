'use strict';

module.exports = function(Client) {

    Client.CreateOne = function(ctx, client, callback) {
        const userId = ctx.accessToken.userId;
        Client.findOne({
            where: {rfc: client.rfc, adminId: userId, deleted: false}
        }, (err, clientFound) => {
            if(err) return callback(err);
    
            if(!!clientFound) return callback('rfc is already registered!!');

            client.adminId = userId;
            Client.create(client, (err, newClient) => {
                if(err) return callback(err);

                return callback(null, newClient);
            });
        });
    }

    Client.CreateArray = function(ctx, clients, callback) {

    }

    Client.GetAll = function(ctx, callback) {
        const userId = ctx.accessToken.userId;
        Client.find({
            where: {adminId: userId, deleted: false}
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
