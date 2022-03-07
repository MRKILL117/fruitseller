'use strict';

module.exports = function(Account) {

    Account.CreateUserWithRole = function(user, callback) {
        const RoleMapping = Account.app.models.RoleMapping;
        const Role = Account.app.models.Role;

        Account.findOne({where: {email: user.email}}, (err, userFound) => {
            if(err) return callback(err);

            if(userFound) return callback(null, false);
            Account.findOrCreate(user, (err, newAccount) => {
                if(err) return callback(err);
                
                Role.findOne({where: {name: user.role}}, (err, role) => {
                    if(err) {
                        newAccount.destroy((err2, destroyed) => {
                            if(err2) return callback(err2);
                            return callback(err);
                        });
                    }
                    if(!role) {
                        newAccount.destroy((err2, destroyed) => {
                            if(err2) return callback(err2);
                            return callback('role not specified');
                        });
                    }
                    else {
                        role.principals.create({
                            principalType: RoleMapping.USER,
                            principalId: newAccount.id
                        }, (err, principal) => {
                            if(err) return callback(err);
        
                            return callback(null, newAccount);
                        });
                    }
                });
            });
        });
    }

    Account.GetAllAccounts = function(callback) {
        Account.find({include: {'role': 'role'}}, (err, users) => {
            if(err) return callback(err);

            const usersWithRole = users.map(user => {
                return {
                    ...user.toJSON(),
                    role: user.role().role()
                };
            })
            return callback(null, usersWithRole);
        })
    }

    Account.Login = function(credentials, callback) {
        Account.login(credentials, (err, token) => {
            if(err) return callback(err);

            return callback(null, token);
        })
    }

};
