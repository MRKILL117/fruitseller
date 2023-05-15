'use strict';

module.exports = function(Order) {

    Order.CreateOne = function(ctx, order, callback) {
        const userId = ctx.accessToken.userId;
        order.adminId = userId;
        Order.create(order, (err, newOrder) => {
            if(err) return callback(err);

            return callback(null, newOrder);
        });
    }

    Order.GetAll = function(ctx, startDate, endDate, callback) {
        const userId = ctx.accessToken.userId;
        let where = {and: [{adminId: userId}, {deleted: false}]};
        if(!!startDate && startDate != '*') where.and.push({date: {gte: startDate}});
        if(!!endDate && endDate != '*') where.and.push({date: {lte: endDate}});
        Order.find({
            where,
            order: 'date DESC'
        }, (err, orders) => {
            if(err) return callback(err);

            return callback(null, orders);
        });
    }

    Order.Update = function(order, callback) {
        Order.upsert(order, (err, orderUpdated) => {
            if(err) return callback(err);
            
            return callback(null, orderUpdated);
        });
    }

    Order.prototype.Delete = function(callback) {
        this.deleted = true;
        this.save((err, deleted) => {
            if(err) return callback(err);
            return callback(null, deleted);
        });
    }

};
