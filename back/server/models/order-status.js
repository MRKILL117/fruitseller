'use strict';

module.exports = function(OrderStatus) {

    OrderStatus.GetAll = function(callback) {
        OrderStatus.find({}, (err, statuses) => {
            if(err) return callback(err);

            return callback(null, statuses);
        });
    }

    OrderStatus.GetOneByName = function(name, callback) {
        OrderStatus.findOne({
            where: {name: {like: `%${name}%`}}
        }, (err, status) => {
            if(err) return callback(err);

            return callback(null, status);
        });
    }

};
