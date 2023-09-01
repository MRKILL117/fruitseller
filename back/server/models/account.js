'use strict';

module.exports = function(Account) {

    Account.CreateUserWithRole = function(user, callback) {
        const RoleMapping = Account.app.models.RoleMapping;
        const Role = Account.app.models.Role;

        Account.findOne({where: {email: user.email}}, (err, userFound) => {
            if(err) return callback(err);

            if(userFound) return callback('El correo ya está registrado');
            if(!user.password) user.password = '123';
            Account.create(user, (err, newAccount) => {
                if(err) return callback(err);
                
                Role.findOne({where: {name: {like: `%${user.role}%`}}}, (err, role) => {
                    if(err) {
                        newAccount.destroy((err2, destroyed) => {
                            if(err2) return callback(err2);
                            return callback(err);
                        });
                    }
                    if(!role) {
                        newAccount.destroy((err2, destroyed) => {
                            if(err2) return callback(err2);
                            return callback('Rol no especificado');
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

    Account.GetAll = function(text, roles, callback) {
        let where = {};
        if(!!text && text != '*') {
            where['or'] = [
                {username: {like: `%${text}%`}},
                {email: {like: `%${text}%`}},
            ]
        }
        Account.find({where, include: {'role': 'role'}}, (err, users) => {
            if(err) return callback(err);

            const usersWithRole = users.map(user => {
                return {
                    ...user.toJSON(),
                    role: user.role().role()
                };
            }).filter(user => {
                if(!!roles && roles.length) {
                    return roles.map(rol => rol.id).includes(user.role.id);
                }
                else return true;
            });
            return callback(null, usersWithRole);
        });
    }

    Account.LogIn = function(credentials, callback) {
        Account.findOne({where: {email: credentials.email}, include: {'role': 'role'}}, (err, user) => {
            if(err) return callback(err);
            
            if(!user) return callback('Usuario no registrado');
            if(!user.isEnabled) return callback('Usuario desactivado');
            credentials.ttl = -1;
            Account.login(credentials, (err, token) => {
                if(err) return callback(err);
    
                user = Object.assign({}, user.toJSON());
                user.role = user.role.role;
                user.token = token;
                return callback(null, user);
            });
        });
    }

    Account.LogOut = function(token, callback) {
        console.log("logging out", token);
        Account.logout(token, (err, loggedOut) => {
            if(err) return callback(err);

            return callback(null, loggedOut);
        });
    }

    Account.GetRoles = function(callback) {
        Account.app.models.Role.find({}, (err, roles) => {
            if(err) return callback(err);

            return callback(null, roles);
        });
    }

    Account.prototype.Update = function(user, callback) {
        let generateToken = user.email != this.email;
        this.email = user.email;
        this.username = user.username;
        this.save((err, userSaved) => {
            if(err) return callback(err);
            
            userSaved = userSaved.toJSON();
            if(generateToken) {
                userWithRole.createAccessToken(-1, (err, token) => {
                    if(err) return callback(err);

                    userSaved.token = token;
                    return callback(null, userSaved);
                });
            }
            else return callback(null, userSaved);
        });
    }

    Account.prototype.Delete = function(callback) {
        this.deleted = true;
        this.save((err, user) => {
            if(err) return callback(err);

            return callback(null, user);
        });
    }

    Account.prototype.ToggleEnabled = function(callback) {
        this.isEnabled = !this.isEnabled;
        this.save((err, user) => {
            if(err) return callback(err);

            return callback(null, user);
        });
    }

};
