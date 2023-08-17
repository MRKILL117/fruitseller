'use strict';

module.exports = function(ProductType) {

    ProductType.CreateOne = function(productType, callback) {
        ProductType.findOrCreate({
            where: {name: {like: `%${productType.name}%`}, deleted: false}
        }, productType, (err, newProductType) => {
            if(err) return callback(err);
            
            if(newProductType.name !== productType.name || newProductType.utility != productType.utility) {
                newProductType.name = productType.name;
                newProductType.utility = productType.utility;
                newProductType.save((err, saved) => {
                    if(err) return callback(err);
                    return callback(null, newProductType);
                });
            }
            else return callback(null, newProductType);
        });
    }

    ProductType.GetAll = function(callback) {
        let where = {deleted: false};
        ProductType.find({
            where,
            order: 'name ASC'
        }, (err, productTypes) => {
            if(err) return callback(err);

            return callback(null, productTypes);
        });
    }

};
