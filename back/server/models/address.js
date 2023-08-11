'use strict';

module.exports = function(Address) {

    Address.CreateOne = function(address, callback) {
        Address.CheckAliasAvailability(address, (err, isAvailable) => {
            if(err) return callback(err);

            if(!isAvailable) return callback(`El alias ya está siendo usado por otra dirección`);
            Address.create(address, (err, newAddress) => {
                if(err) return callback(err);
    
                return callback(null, newAddress);
            });
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
        Address.CheckAliasAvailability(address, (err, isAvailable) => {
            if(err) return callback(err);

            if(!isAvailable) return callback(`El alias ya está siendo usado por otra dirección`);
            Address.upsert(address, (err, addressUpdated) => {
                if(err) return callback(err);
                
                return callback(null, addressUpdated);
            });
        });
    }

    Address.prototype.Delete = function(callback) {
        this.deleted = true;
        this.alias = null;
        this.save((err, deleted) => {
            if(err) return callback(err);

            return callback(null, deleted);
        });
    }

    Address.prototype.SetAsDefault = function(callback) {
        let where = {
            clientId: this.clientId
        };
        Address.updateAll(where, {isDefault: false}, (err, updated) => {
            if(err) return callback(err);
            
            this.isDefault = true;
            this.save((err, saved) => {
                if(err) return callback(err);

                return callback(null, updated);
            });
        });
    }

    Address.CheckAliasAvailability = function(address, callback) {
        if(!address.clientId) return callback(null, false);
        Address.findOne({
            where: {
                alias: {like: `%${address.alias}%`},
                clientId: address.clientId
            }
        }, (err, addressFound) => {
            if(err) return callback(err);
            if(!!addressFound && address.id != addressFound.id) return callback(null, !!!addressFound);
            else return callback(null, true);
        });
    }

};
