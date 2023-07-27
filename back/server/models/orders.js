'use strict';

var moment = require('moment-timezone');
const constants = require('./../assets/constants');

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

    Orders.CreateArray = function(ctx, products, callback) {
        let data = {
            ordersFailed: [],
            ordersSuccess: []
        }
        Orders.MapPorductsInOrders(products, (err, ordersMap) => {
            if(err) return callback(err);

            let orders = Array.from(ordersMap.values());
            let cont = 0, limit = orders.length;
            if(!limit) return callback(null, data);
            orders.forEach(order => {
                Orders.CreateOne(ctx, order, (err, newOrder) => {
                    if(err) {
                        data.ordersFailed.push({order, reason: typeof err === 'string' ? err : null});
                    }
                    else data.ordersSuccess.push(newOrder);
                    if(++cont == limit) return callback(null, data);
                });
            });
        });
    }

    Orders.MapPorductsInOrders = function(products, callback) {
        let ordersMap = new Map();
        let cont = 0, limit = products.length;
        if(!limit) return callback(null, []);
        products.forEach(product => {
            Orders.app.models.Product.findOne({
                where: {
                    or: [{name: {like: `%${product.productNameOrId}%`}}, {id: product.productNameOrId}]
                }
            }, (err, productFound) => {
                if(err) return callback(err);

                Orders.app.models.Client.findOne({
                    where: {
                        or: [{rfc: {like: `%${product.clientRfcOrId}%`}}, {id: product.clientRfcOrId}]
                    },
                    include: {
                        relation: 'addresses',
                        scope: {
                            where: {or:[{isDefault: true},{id: product.addressAliasOrId},{alias: {like: `%${product.addressAliasOrId}%`}}]},
                            order: 'isDefault ASC'
                        }
                    }
                }, (err, client) => {
                    if(err) return callback(err);

                    if(!!productFound && !!client && !!client.addresses().length) {
                        let item = {
                            product: productFound,
                            quantity: product.quantity,
                            weight: product.weight,
                            price: 0,
                            tax: 0,
                            total: 0
                        };
                        productFound = productFound.toJSON();
                        const productPrice = productFound.price;
                        let productQuantity = 0;
                        switch (productFound.salesMeasurementType.abrev) {
                            case 'kg': productQuantity = !!product.weight ? product.weight : 0; break;
                            case 'pz': productQuantity = !!product.quantity ? product.quantity : 0; break;
                            default: productQuantity = !!product.weight ? product.weight : 0; break;
                        }
                        if(!Number.isNaN(Number(productQuantity))) {
                            const clientCommission = productPrice*client.utilityPercentage/100;
                            item.price = Number(productQuantity) * (productPrice + clientCommission);
                            item.tax = item.price * 0.16;
                            item.total = item.price + item.tax;
                        }
                        if(ordersMap.has(product.orderId)) {
                            let order = ordersMap.get(product.orderId);
                            order.subtotal += item.price;
                            order.taxes += item.tax;
                            order.total += item.total;
                            order.items.push(item);
                            if(++cont == limit) return callback(null, ordersMap);
                        } else {
                            let order = {
                                client,
                                clientId: client.id,
                                date: !!product.date ? moment(product.date).tz(constants.timezone).toISOString() : moment().tz(constants.timezone).toISOString(),
                                clientAddress: !!client.addresses().length ? client.addresses().pop().toJSON() : null,
                                subtotal: item.price,
                                taxes: item.tax,
                                total: item.total,
                                items: [item]
                            }
                            ordersMap.set(product.orderId, order);
                            if(++cont == limit) return callback(null, ordersMap);
                        }
                    } else {
                        // let errorMessage;
                        // if(!productFound) errorMessage = `No se enctontró un producto con id o nombre: "${product.productNameOrId}"`
                        // if(!client) errorMessage = `No se enctontró un cliente con id o RFC: "${product.productNameOrId}"`
                        // if(!client.addresses().length) errorMessage = `El cliente ${client.name} no tiene direcciones"`
                        if(++cont == limit) return callback(null, ordersMap);
                    }
                });

            });
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
