'use strict';

module.exports = function(Client) {

    Client.CreateOne = function(ctx, client, callback) {
        const userId = ctx.accessToken.userId;
        Client.findOne({
            where: {rfc: client.rfc, adminId: userId}
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
            where: {adminId: userId}
        }, (err, clients) => {
            if(err) return callback(err);

            return callback(null, clients);
        });
    }

};
