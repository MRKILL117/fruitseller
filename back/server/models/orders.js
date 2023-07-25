'use strict';

var isOrderReadyToDeliver = function(order) {
    let errorMessages = [];
    order.items.forEach(item => {
        switch (item.product.salesMeasurementType.abrev) {
            case 'kg':
                if(!!!item.weight) errorMessages.push(`${item.product.name}: no tiene ${item.product.salesMeasurementType.name} especificados`);
            break;
            case 'pz':
                if(!!!item.quantity) errorMessages.push(`${item.product.name}: no tiene ${item.product.salesMeasurementType.name} especificados`);
            break;
        }
    });
    if(errorMessages.length) return errorMessages.join('\n');
    else return null;
}

module.exports = function(Orders) {

    Orders.CreateOne = function(ctx, order, callback) {
        const userId = ctx.accessToken.userId;
        order.adminId = userId;
        if(!order.clientId && !!order.client) order.clintId = order.client.id;
        Orders.create(order, (err, newOrder) => {
            if(err) return callback(err);

            return callback(null, newOrder);
        });
    }

    Orders.GetAll = function(ctx, startDate, endDate, statuses = [], callback) {
        const userId = ctx.accessToken.userId;
        let where = {and: [{adminId: userId}, {deleted: false}]};
        if(!!startDate && startDate != '*') where.and.push({date: {gte: startDate}});
        if(!!endDate && endDate != '*') where.and.push({date: {lte: endDate}});
        if(!!statuses && statuses.length) where.and.push({
            or: statuses.map(status => {return {statusId: status.id}})
        });
        Orders.find({
            where,
            order: 'date DESC'
        }, (err, orders) => {
            if(err) return callback(err);

            return callback(null, orders);
        });
    }
    
    Orders.GetAllOfPayments = function(ctx, startDate, endDate, statuses = [], callback) {
        const userId = ctx.accessToken.userId;
        let where = {and: [{adminId: userId}, {deleted: false}, {statusId: {gte: 3}}]};
        if(!!startDate && startDate != '*') where.and.push({date: {gte: startDate}});
        if(!!endDate && endDate != '*') where.and.push({date: {lte: endDate}});
        if(!!statuses && statuses.length) where.and.push({
            or: statuses.map(status => {return {statusId: status.id}})
        });
        Orders.find({
            where,
            order: 'date DESC'
        }, (err, orders) => {
            if(err) return callback(err);

            return callback(null, orders);
        });
    }

    Orders.prototype.GetOne = function(callback) {
        return callback(null, this);
    }

    Orders.Update = function(order, callback) {
        Orders.upsert(order, (err, orderUpdated) => {
            if(err) return callback(err);
            
            return callback(null, orderUpdated);
        });
    }

    Orders.prototype.Delete = function(callback) {
        this.deleted = true;
        this.save((err, deleted) => {
            if(err) return callback(err);
            return callback(null, deleted);
        });
    }

    Orders.prototype.SetAsDelivered = function(callback) {
        let errorMessage;
        if(!!(errorMessage = isOrderReadyToDeliver(this))) return callback(errorMessage);
        if(!!this.actualClient().paymentDays && this.actualClient().paymentDays > 0) this.statusId = 3;
        else this.statusId = 4;
        this.save((err, saved) => {
            if(err) return callback(err);
            return callback(null, saved);
        });
    }

};
