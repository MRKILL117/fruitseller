'use strict';

var moment = require('moment-timezone');
var CronJob = require('cron').CronJob;
var constants = require('./../assets/constants.js');
var priceHistoryCornjob = null;

module.exports = function(PriceHistory) {

    PriceHistory.UpsertTodayPrices = function(ctx, callback) {
        const todayDate = moment().tz(constants.timezone).format(constants.dateFormat);
        const yesterday = moment().tz(constants.timezone).subtract(1, 'day').format(constants.dateFormat);
        PriceHistory.app.models.Product.GetAll(ctx, (err, products) => {
            if(err) return callback(err);

            PriceHistory.find({
                where: {
                    and: [
                        {or: products.map(prod => {return {productId: prod.id}})},
                        {date: {like: `%${todayDate}%`}},
                    ]
                }
            }, (err, prices) => {
                if(err) return callback(err);

                if(prices.length == products.length) return callback(null, true);

                let cont = 0, limit = products.length;
                if(!limit) return callback(null, true);
                products.forEach(product => {
                    PriceHistory.findOne({
                        where: {
                            productId: product.id,
                            or: [{date: {like: `%${todayDate}%`}}, {date: {like: `%${yesterday}%`}}]
                        },
                        order: 'date DESC'
                    }, (err, priceHistoryFound) => {
                        if(err) return callback(err);

                        if(!priceHistoryFound || !priceHistoryFound.date.includes(todayDate)) {
                            const priceHistory = {
                                date: todayDate,
                                purchasePrice: !!priceHistoryFound ? priceHistoryFound.purchasePrice : product.price,
                                salePrice: !!priceHistoryFound ? priceHistoryFound.salePrice : product.price,
                                productId: product.id,
                            }
                            PriceHistory.create(priceHistory, (err, newPriceHistory) => {
                                if(err) return callback(err);

                                if(++cont == limit) return callback(null, true);
                            });
                        } else if(++cont == limit) return callback(null, true);
                    });
                });
            });
        });
    }

    PriceHistory.prototype.UpdatePrices = function(priceHistory, callback) {
        this.purchasePrice = priceHistory.purchasePrice;
        this.salePrice = priceHistory.salePrice;

        this.save((err, saved) => {
            if(err) return callback(err);

            return callback(null, saved);
        });
    }

    PriceHistory.DailyCronJobToUpdatePrices = function() {
        // second minute hour day(month) month day(week)
        // Every day at 12:00 a.m.
        priceHistoryCornjob = new CronJob('0 0 0 * * *', function() {
            PriceHistory.UpsertTodayPrices(null, (err, updated) => {
                if(err) console.error(`Error upserting today prices: ${moment().format(constants.dateFormat)}`, err);
            });
        }, null, true, constants.timezone);
        priceHistoryCornjob.start();
    }

};
