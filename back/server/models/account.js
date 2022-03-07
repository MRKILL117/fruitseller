'use strict';

module.exports = function(Account) {

    Account.CreateUserWithRole = function(user, callback) {
        return callback(null, true);
    }

};
