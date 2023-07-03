'use strict';

module.exports = function(Product) {

    Product.CreateOne = function(ctx, product, callback) {
        const userId = ctx.accessToken.userId;
        Product.findOne({
            where: {name: {like: `%${product.name}%`}, adminId: userId, deleted: false}
        }, (err, productFound) => {
            if(err) return callback(err);
    
            if(!!productFound) return callback('El producto ya existe');

            Product.app.models.Buyer.CreateOne(ctx, !!product.buyer ? product.buyer : product.buyerId, (err, newBuyer) => {
                if(err) return callback(err);

                product.buyerId = newBuyer.id;
                product.adminId = userId;
                Product.create(product, (err, newproduct) => {
                    if(err) return callback(err);
    
                    return callback(null, newproduct);
                });
            })
        });
    }

    Product.CreateArray = function(ctx, products, callback) {
        let data = {
            productsFailed: [],
            productsSuccess: []
        }
        let cont = 0, limit = products.length;
        if(!limit) return callback(null, data);
        Product.app.models.MeasurementType.GetAll((err, measurementTypes) => {
            if(err) return callback(err);

            products.forEach(product => {
                if(!!product.salesMeasurementType) {
                    const measurementType = measurementTypes.find(type => type.name.toLowerCase().includes(product.salesMeasurementType.toLowerCase()) || type.abrev.toLowerCase().includes(product.salesMeasurementType.toLowerCase()));
                    product.salesMeasurementTypeId = !!measurementType ? measurementType.id : null;
                }
                if(!!product.inventoryMeasurementType) {
                    const measurementType = measurementTypes.find(type => type.name.toLowerCase().includes(product.inventoryMeasurementType.toLowerCase()) || type.abrev.toLowerCase().includes(product.inventoryMeasurementType.toLowerCase()));
                    product.inventoryMeasurementTypeId = !!measurementType ? measurementType.id : null;
                }
                Product.CreateOne(ctx, product, (err, newproduct) => {
                    if(err) {
                        data.productsFailed.push({product, reason: typeof err === 'string' ? err : null});
                    }
                    else data.productsSuccess.push(newproduct);
    
                    if(++cont == limit) return callback(null, data);
                });
            });
        });
    }

    Product.GetAll = function(ctx, callback) {
        let where = {deleted: false};
        if(!!ctx) {
            where['adminId'] = ctx.accessToken.userId;
        }
        Product.find({
            where,
            order: 'name ASC'
        }, (err, products) => {
            if(err) return callback(err);

            return callback(null, products);
        });
    }

    Product.GetAllWithPriceHistory = function(ctx, text = null, startDate = null, endDate = null, callback) {
        const userId = ctx.accessToken.userId;
        let where = {adminId: userId, deleted: false};
        let wherePrices = {and: []};
        if(!!text && text != '*') where['name'] = {like: `%${text}%`};
        if(!!startDate && startDate != '*') wherePrices.and.push({date: {gte: startDate}});
        if(!!endDate && endDate != '*') wherePrices.and.push({date: {lte: endDate}});

        Product.app.models.PriceHistory.UpsertTodayPrices(ctx, (err, pricesUPdated) => {
            if(err) return callback(err);
            
            Product.find({
                where,
                include: {
                    relation: 'prices',
                    scope: {
                        where: !!wherePrices.and.length ? wherePrices : {},
                        order: 'date DESC',
                        limit: 10
                    }
                },
                order: 'name ASC'
            }, (err, products) => {
                if(err) return callback(err);

                return callback(null, products);
            });
        });
    }

    Product.GetAllWithInventories = function(ctx, text = null, startDate = null, endDate = null, callback) {
        const userId = ctx.accessToken.userId;
        let where = {adminId: userId, deleted: false};
        let whereInventories = {and: []};
        if(!!text && text != '*') where['name'] = {like: `%${text}%`};
        if(!!startDate && startDate != '*') whereInventories.and.push({date: {gte: startDate}});
        if(!!endDate && endDate != '*') whereInventories.and.push({date: {lte: endDate}});

        Product.app.models.Inventory.UpsertTodayInventories(ctx, (err, inventoriesUpdated) => {
            if(err) return callback(err);
            
            Product.find({
                where,
                include: {
                    relation: 'inventories',
                    scope: {
                        where: !!whereInventories.and.length ? whereInventories : {},
                        order: 'date DESC',
                        limit: 10
                    }
                },
                order: 'name ASC'
            }, (err, products) => {
                if(err) return callback(err);

                return callback(null, products);
            });
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
