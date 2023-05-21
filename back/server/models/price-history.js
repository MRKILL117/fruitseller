'use strict';

var moment = require('moment-timezone');
var CronJob = require('cron').CronJob;
var constants = require('./../assets/constants.js');
var priceHistoryCornjob = null;

module.exports = function(PriceHistory) {

    PriceHistory.UpsertTodayPrices = function(ctx, callback) {
        let where = {deleted: false}
        if(!!ctx) {
            const userId = ctx.accessToken.userId;
            where.adminId = userId;
        }
        const todayDate = moment().tz(constants.timezone).format(constants.dateFormat);
        PriceHistory.app.models.Product.find({
            where,
            include: {
                relation: 'prices',
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
                const priceHistory = {
                    date: todayDate,
                    purchasePrice: !!product.prices().length ? product.prices()[0].purchasePrice : product.price,
                    salePrice: !!product.prices().length ? product.prices()[0].salePrice : product.price,
                    productId: product.id,
                }
                PriceHistory.findOrCreate({where: {date: todayDate, productId: product.id}}, priceHistory, (err, newPriceHistory) => {
                    if(err) return callback(err);

                    if(++cont == limit) return callback(null, true);
                });
            });
        });
    }

    PriceHistory.prototype.UpdatePrices = function(priceHistory, callback) {
        this.purchasePrice = priceHistory.purchasePrice;
        this.salePrice = priceHistory.salePrice;

        this.save((err, saved) => {
            if(err) return callback(err);
            
            let product = {
                id: saved.productId,
                price: saved.salePrice
            }
            PriceHistory.app.models.Product.upsert(product, (err, productSaved) => {
                if(err) return callback(err);

                return callback(null, saved);
            });
        });
    }

    PriceHistory.DailyCronJobToUpdatePrices = function() {
        // second minute hour day(month) month day(week)
        // Every day at 4:00 a.m.
        priceHistoryCornjob = new CronJob('0 0 4 * * *', function() {
            PriceHistory.UpsertTodayPrices(null, (err, updated) => {
                if(err) console.error(`Error upserting today prices: ${moment().format(constants.dateFormat)}`, err);
            });
        }, null, true, constants.timezone);
        priceHistoryCornjob.start();
    }

};
