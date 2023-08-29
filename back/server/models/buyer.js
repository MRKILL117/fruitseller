'use strict';

module.exports = function(Buyer) {

    Buyer.CreateOne = function(buyer, callback) {
        let where = {deleted: false};
        if(typeof buyer === 'object') where['name'] = {like: `%${buyer.name}%`};
        else if(typeof buyer === 'string') {
            where['name'] = {like: `%${buyer}%`};
            buyer = {name: buyer};
        }
        else where['id'] = buyer;
        Buyer.findOne({where}, (err, buyerFound) => {
            if(err) return callback(err);
            
            if(!!buyerFound) return callback(null, buyerFound);
            Buyer.create(buyer, (err, newBuyer) => {
                if(err) return callback(err);

                let cont = 0, limit = !!buyer.products ? buyer.products.length : 0;
                if(!limit) return callback(null, newBuyer);
                buyer.products.forEach(product => {
                    let where = {deleted: false};
                    if(typeof product === 'string') where['name'] = {like: `${product}`};
                    else if(typeof product === 'object') where['id'] = product.id;
                    Buyer.app.models.Product.findOne({where}, (err, productInstance) => {
                        if(err) return callback(err);
                        
                        if(!!productInstance && !productInstance.buyerId) {
                            productInstance.buyerId = newBuyer.id;
                            productInstance.save((err, saved) => {
                                if(err) return callback(err);
                                if(++cont == limit) return callback(null, newBuyer);
                            });
                        } else if(++cont == limit) return callback(null, newBuyer);
                    });
                });
            });
        });
    }

    Buyer.CreateArray = function(buyers, callback) {
        let data = {
            buyersFailed: [],
            buyersSuccess: []
        }
        let cont = 0, limit = buyers.length;
        if(!limit) return callback(null, data);
        buyers.forEach(buyer => {
            Buyer.CreateOne(buyer, (err, newBuyer) => {
                if(err) {
                    data.buyersFailed.push({buyer, reason: typeof err === 'string' ? err : null});
                }
                else data.buyersSuccess.push(newBuyer);

                if(++cont == limit) return callback(null, data);
            });
        });
    }

    Buyer.GetAll = function(callback) {
        Buyer.find({
            where: {deleted: false},
            include: {
                relation: 'products',
                scope: {
                    where: {deleted: false}
                }
            },
            order: 'name ASC'
        }, (err, buyers) => {
            if(err) return callback(err);

            return callback(null, buyers);
        });
    }

    Buyer.Update = function(buyer, callback) {
        Buyer.upsert(buyer, (err, buyerUpdated) => {
            if(err) return callback(err);
            
            Buyer.findById(buyerUpdated.id, {include: 'products'}, (err, buyerUpdated) => {
                if(err) return callback(err);

                let productsToUnbind = buyerUpdated.products().filter(prod => !buyer.products.find(prod2 => prod2.id == prod.id));
                Buyer.app.models.Product.updateAll({id: {inq: productsToUnbind.map(prod => prod.id)}}, {buyerId: null}, (err, updated) => {
                    if(err) return callback(err);
                    
                    Buyer.app.models.Product.updateAll({id: {inq: buyer.products.map(prod => prod.id)}}, {buyerId: buyerUpdated.id}, (err, updated) => {
                        if(err) return callback(err);
    
                        return callback(null, buyerUpdated);
                    });
                });
            });
        });
    }

    Buyer.prototype.Delete = function(callback) {
        this.deleted = true;
        Buyer.findById(this.id, {include: 'products'}, (err, buyer) => {
            if(err) return callback(err);

            Buyer.app.models.Product.updateAll({id: {inq: buyer.products().map(prod => prod.id)}}, {buyerId: null}, (err, updated) => {
                if(err) return callback(err);

                this.save((err, deleted) => {
                    if(err) return callback(err);
                    return callback(null, deleted);
                });
            });
        });
    }

};
