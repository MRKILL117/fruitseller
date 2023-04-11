'use strict';

module.exports = function(Buyer) {

    Buyer.CreateOne = function(ctx, buyer, callback) {
        const userId = ctx.accessToken.userId;
        Buyer.findOne({
            where: {name: {like: `${buyer.name}`}, adminId: userId, deleted: false}
        }, (err, buyerFound) => {
            if(err) return callback(err);
    
            if(!!buyerFound) return callback('El comprador ya existe');

            Buyer.adminId = userId;
            Buyer.create(buyer, (err, newBuyer) => {
                if(err) return callback(err);

                return callback(null, newBuyer);
            });
        });
    }

    Buyer.CreateArray = function(ctx, buyers, callback) {
        let data = {
            buyersFailed: [],
            buyersSuccess: []
        }
        let cont = 0, limit = buyers.length;
        if(!limit) return callback(null, data);
        buyers.forEach(buyer => {
            Buyer.CreateOne(ctx, buyer, (err, newBuyer) => {
                if(err) {
                    data.buyersFailed.push({buyer, reason: typeof err === 'string' ? err : null});
                }
                else data.buyersSuccess.push(newBuyer);

                if(++cont == limit) return callback(null, data);
            });
        });
    }

    Buyer.GetAll = function(ctx, callback) {
        const userId = ctx.accessToken.userId;
        Buyer.find({
            where: {adminId: userId, deleted: false}
        }, (err, buyers) => {
            if(err) return callback(err);

            return callback(null, buyers);
        });
    }

    Buyer.Update = function(buyer, callback) {
        Buyer.upsert(buyer, (err, buyerUpdated) => {
            if(err) return callback(err);

            return callback(null, buyerUpdated);
        });
    }

    Buyer.prototype.Delete = function(callback) {
        this.deleted = true;
        this.save((err, deleted) => {
            if(err) return callback(err);

            return callback(null, deleted);
        });
    }

};
