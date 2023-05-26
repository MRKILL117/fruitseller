'use strict';

var constants = require('./../assets/constants.js');
var moment = require('moment-timezone');

module.exports = function(Inventory) {

    Inventory.UpsertTodayInventories = function(ctx, callback) {
        let where = {};
        if(!!ctx) {
            const userId = ctx.accessToken.userId;
            where.adminId = userId;
        }
        const todayDate = moment().tz(constants.timezone).format(constants.dateFormat);
        Inventory.app.models.Product.find({
            where,
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

};
