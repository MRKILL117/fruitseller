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

    Order.GetAll = function(ctx, callback) {
        const userId = ctx.accessToken.userId;
        Order.find({
            where: {adminId: userId, deleted: false},
            order: 'date ASC'
        }, (err, orders) => {
            if(err) return callback(err);

            return callback(null, orders);
        });
    }

    Order.Update = function(order, callback) {
        Order.upsert(order, (err, orderUpdated) => {
            if(err) return callback(err);
            
            Order.findById(orderUpdated.id, {include: 'products'}, (err, orderUpdated) => {
                if(err) return callback(err);

                let productsToUnbind = orderUpdated.products().filter(prod => !Order.products.find(prod2 => prod2.id == prod.id));
                Order.app.models.Product.updateAll({id: {inq: productsToUnbind.map(prod => prod.id)}}, {orderId: null}, (err, updated) => {
                    if(err) return callback(err);
                    
                    Order.app.models.Product.updateAll({id: {inq: Order.products.map(prod => prod.id)}}, {orderId: orderUpdated.id}, (err, updated) => {
                        if(err) return callback(err);
    
                        return callback(null, orderUpdated);
                    });
                });
            });
        });
    }

    Order.prototype.Delete = function(callback) {
        this.deleted = true;
        Order.findById(this.id, {include: 'products'}, (err, order) => {
            if(err) return callback(err);

            Order.app.models.Product.updateAll({id: {inq: Order.products().map(prod => prod.id)}}, {orderId: null}, (err, updated) => {
                if(err) return callback(err);

                this.save((err, deleted) => {
                    if(err) return callback(err);
                    return callback(null, deleted);
                });
            });
        });
    }

};
