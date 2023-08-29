'use strict';

var constants = require('./../assets/constants.js');
var moment = require('moment-timezone');

module.exports = function(Inventory) {

    Inventory.UpsertTodayInventories = function(ctx, callback) {
        const todayDate = moment().tz(constants.timezone).format(constants.dateFormat);
        Inventory.app.models.Product.find({
            include: {
                relation: 'inventories',
                scope: {
                    where: {date: {lte: todayDate}},
                    order: 'date DESC',
                    limit: 1
                }
            }
        }, (err, products) => {
            if(err) return callback(err);

            let cont = 0, limit = products.length;
            products.forEach(product => {
                const inventory = {
                    date: todayDate,
                    quantity: !!product.inventories().length ? product.inventories()[0].quantity : 0,
                    productId: product.id,
                    lastModified: moment().tz(constants.timezone).toISOString()
                }
                Inventory.findOrCreate({where: {date: todayDate, productId: product.id}}, inventory, (err, newInventory) => {
                    if(err) return callback(err);

                    if(++cont == limit) return callback(null, true);
                });
            });
        });
    }

    Inventory.prototype.Update = function(inventory, callback) {
        this.quantity = inventory.quantity;
        this.lastModified = moment().tz(constants.timezone).toISOString();

        this.save((err, saved) => {
            if(err) return callback(err);
            
            return callback(null, saved);
        });
    }

    Inventory.SubstractItemsFromOrder = function(order, callback) {
        if(!order || !order.items || !order.items.length) return callback(`La orden no existe o no tiene items`);
        let cont = 0, limit = order.items.length;
        order.items.forEach(item => {
            let quantity = 0;
            switch (item.product.salesMeasurementType.abrev) {
                case 'kg': quantity = item.weight; break;
                case 'pz': quantity = item.quantity; break;
            }
            Inventory.findOne({
                where: {
                    productId: item.product.id
                }
            }, (err, inventory) => {
                if(err) return callback(err);
                
                inventory.quantity -= quantity;
                inventory.save((err, saved) => {
                    if(err) return callback(err);

                    if(++cont == limit) return callback(null, order);
                });
            });
        });
    }

};
