'use strict';

var moment = require('moment-timezone');
const constants = require('./../assets/constants');
const PdfService = require('../services/pdf.service');
var pdfService = new PdfService();


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

    Orders.CreateOne = function(order, callback) {
        if(!order.clientId && !!order.client) order.clintId = order.client.id;
        Orders.create(order, (err, newOrder) => {
            if(err) return callback(err);

            return callback(null, newOrder);
        });
    }

    Orders.CreateArray = function(products, callback) {
        let data = {
            ordersFailed: [],
            ordersSuccess: []
        }
        Orders.MapPorductsInOrders(products, (err, ordersObj) => {
            if(err) return callback(err);

            let orders = Array.from(ordersObj.map.values());
            data.ordersFailed = ordersObj.failed;
            let cont = 0, limit = orders.length;
            if(!limit) return callback(null, data);
            orders.forEach(order => {
                Orders.CreateOne(order, (err, newOrder) => {
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
        let failed = [];
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
                            const utilityPercentage = item?.product?.type?.utility != null ? item?.product?.type?.utility : Number(this.selectedClient.utilityPercentage);
                            const clientCommission = productPrice * utilityPercentage / 100;
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
                            if(++cont == limit) return callback(null, {map: ordersMap, failed});
                        } else {
                            let order = {
                                client,
                                clientId: client.id,
                                date: !!product.date ? moment(product.date).tz(constants.timezone).toISOString() : moment().tz(constants.timezone).toISOString(),
                                clientAddress: client.addresses().pop().toJSON(),
                                subtotal: item.price,
                                taxes: item.tax,
                                total: item.total,
                                items: [item]
                            }
                            ordersMap.set(product.orderId, order);
                            if(++cont == limit) return callback(null, {map: ordersMap, failed});
                        }
                    } else {
                        let errorMessage;
                        if(!productFound) errorMessage = `No se enctontró un producto con id o nombre: "${product.productNameOrId}"`
                        else if(!client) errorMessage = `No se enctontró un cliente con id o RFC: "${product.clientRfcOrId}"`
                        else if(!client.addresses().length) errorMessage = `El cliente ${client.name} no tiene direcciones"`
                        failed.push({reason: errorMessage, order: product});
                        if(++cont == limit) return callback(null, {map: ordersMap, failed});
                    }
                });

            });
        });
    }

    Orders.GetAll = function(startDate, endDate, statuses = [], clients = [], callback) {
        let where = {and: [{deleted: false}]};
        if(!!startDate && startDate != '*') where.and.push({date: {gte: startDate}});
        if(!!endDate && endDate != '*') where.and.push({date: {lte: endDate}});
        if(!!statuses && statuses.length) where.and.push({
            or: statuses.map(status => {return {statusId: status.id}})
        });
        if(!!clients && clients.length) where.and.push({
            or: clients.map(client=> {return {clientId: client.id}})
        });
        Orders.find({
            where,
            order: 'date DESC'
        }, (err, orders) => {
            if(err) return callback(err);

            return callback(null, orders);
        });
    }
    
    Orders.GetAllOfPayments = function(startDate, endDate, statuses = [], clients = [], callback) {
        let where = {and: [{deleted: false}, {statusId: {gte: 3}}]};
        if(!!startDate && startDate != '*') where.and.push({date: {gte: startDate}});
        if(!!endDate && endDate != '*') where.and.push({date: {lte: endDate}});
        if(!!statuses && statuses.length) where.and.push({
            or: statuses.map(status => {return {statusId: status.id}})
        });
        if(!!clients && clients.length) where.and.push({
            or: clients.map(client=> {return {clientId: client.id}})
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

    Orders.prototype.Update = function(order, callback) {
        if(!!this.deliveredAt) {
            const limitDateToEdit = moment(this.deliveredAt).tz(constants.timezone).add(2, 'days');
            if(moment().tz(constants.timezone).isAfter(limitDateToEdit)) return callback(`No se pueden editar ordenes que se entregaron hace más de 2 días`);
        }
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
        this.deliveredAt = moment().tz(constants.timezone).toISOString();
        this.save((err, saved) => {
            if(err) return callback(err);
            
            Orders.app.models.Inventory.SubstractItemsFromOrder(this.toJSON(), (err, order) => {
                if(err) return callback(err);
                return callback(null, saved);
            });
        });
    }

    Orders.UpdateOrdersStatus = function(ordersIds, status, callback) {
        Orders.updateAll({id: {inq: ordersIds}}, {statusId: status.id}, (err, ordersUpdated) => {
            if(err) return callback(err);

            return callback(null, ordersUpdated);
        });
    }

    Orders.prototype.GenerateOrderResume = async function(res) {
        try {
            let file = await pdfService.GenerateOrderResume(this.toJSON());
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=ficha_orden_${this.id}.pdf`);
            res.send(Buffer.from(file, 'binary'));
        } catch (err) {
            console.error("Error generating pdf", err);
            res.status(500).send('Error generating PDF');
        }
    }

    Orders.GenerateResumes = async function(ordersIds) {
        let ordersResumes = [];
        Orders.find({
            where: {id: {inq: ordersIds}}
        }, (err, orders) => {
            if(err) throw err;

            orders.forEach(async order => {
                ordersResumes.push(await pdfService.GenerateOrderResume(order.toJSON()));
            });
        });
    }

};
