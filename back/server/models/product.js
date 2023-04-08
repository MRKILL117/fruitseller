'use strict';

module.exports = function(Product) {

    Product.CreateOne = function(ctx, product, callback) {
        const userId = ctx.accessToken.userId;
        Product.findOne({
            where: {rfc: product.rfc, adminId: userId, deleted: false}
        }, (err, productFound) => {
            if(err) return callback(err);
    
            if(!!productFound) return callback('El RFC ya está registrado');

            product.adminId = userId;
            Product.create(product, (err, newproduct) => {
                if(err) return callback(err);

                return callback(null, newproduct);
            });
        });
    }

    Product.CreateArray = function(ctx, products, callback) {
        let data = {
            productsFailed: [],
            productsSuccess: []
        }
        let cont = 0, limit = products.length;
        if(!limit) return callback(null, data);
        products.forEach(product => {
            Product.CreateOne(ctx, product, (err, newproduct) => {
                if(err) {
                    data.productsFailed.push({product, reason: typeof err === 'string' ? err : null});
                }
                else data.productsSuccess.push(newproduct);

                if(++cont == limit) return callback(null, data);
            });
        });
    }

    Product.GetAll = function(ctx, callback) {
        const userId = ctx.accessToken.userId;
        Product.find({
            where: {adminId: userId, deleted: false}
        }, (err, products) => {
            if(err) return callback(err);

            return callback(null, products);
        });
    }

    Product.Update = function(product, callback) {
        Product.upsert(product, (err, productUpdated) => {
            if(err) return callback(err);

            return callback(null, productUpdated);
        });
    }

    Product.prototype.Delete = function(callback) {
        this.deleted = true;
        this.save((err, deleted) => {
            if(err) return callback(err);

            return callback(null, deleted);
        });
    }

};
