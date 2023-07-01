'use strict';

module.exports = function(Address) {

    Address.CreateOne = function(address, callback) {
        Address.create(address, (err, newAddress) => {
            if(err) return callback(err);

            return callback(null, newAddress);
        });
    }

    Address.GetAllOfClient = function(clientId, callback) {
        Address.find({
            where: {clientId, deleted: false}
        }, (err, clientAddresses) => {
            if(err) return callback(err);

            return callback(null, clientAddresses);
        });
    }

    Address.Update = function(address, callback) {
        Address.upsert(address, (err, addressUpdated) => {
            if(err) return callback(err);
            
            return callback(null, addressUpdated);
        });
    }

    Address.prototype.Delete = function(callback) {
        this.deleted = true;
        this.save((err, deleted) => {
            if(err) return callback(err);

            return callback(null, deleted);
        });
    }

    Address.prototype.SetAsDefault = function(callback) {
        let where = {
            clientId: this.clientId
        };
        Address.updateAll(where, {default: false}, (err, updated) => {
            if(err) return callback(err);
            
            this.default = true;
            this.save((err, saved) => {
                if(err) return callback(err);

                return callback(null, updated);
            });
        });
    }

};
