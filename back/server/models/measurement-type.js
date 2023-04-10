'use strict';

module.exports = function(MeasurementType) {

    MeasurementType.GetAll = function(callback) {
        MeasurementType.find((err, measurementTypes) => {
            if(err) return callback(err);

            return callback(null, measurementTypes);
        });
    }

};
