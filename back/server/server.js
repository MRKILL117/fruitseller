// Copyright IBM Corp. 2016,2019. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');

const app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  AutoUpdate();

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

var AutoUpdate = function() {
  const models = app.models();
  const dataSource = app.datasources.mysql;
  const modelsName = models.filter(model => model.config.dataSource ? model.config.dataSource.name == dataSource.name : false).map(model => model.modelName);

  // Disable user email verification
  app.models.Account.settings.emailVerificationRequired = false;
  dataSource.autoupdate(modelsName, err => {
    if(err) throw err;
    else{
      console.log("Models updated succesfully");
      //Fil the database with the first use data
      AutoFillData().then((response) => {
        console.log("Auto Fill Successfully");
      }).catch((err) => {
        throw err;
      });
    }
  });
}

/*
model es el modelo al cual se le van a insertar el arreglo de datos
array es el arreglo de datos que se van a insertar en el modelo
tiene que tener una propiedad llamada conditions la cual es un arreglo
que a su vez tiene un objeto obligatorio que tiene key que se utiliza
para crear un filtro dinamico para buscar el dato, y en caso
de que ya se encuentre en la base de datos simplemente no lo volvera a insertar
esto para evitar que se repitan los datos y evitar problemas de referencias en un futuro
y regresa una promesa, que te indica si todo salio bien o algo salio mal
*/
var SeedArrayInModel = function(model, array = [], conditions = [{ key: ""}]){
  return new Promise((resolve, reject) => {
    let cont = 0, limit = array.length;
    array.forEach((element) => {
      let filter = {
        where: {}
      }
      conditions.forEach((condition) => {
        if(!!condition.key) filter.where[condition.key] = element[condition.key];
      });
      model.findOrCreate(filter, element, (err) => {
        if(err) reject(err);
        if(++cont == limit) resolve('ok');
      });
    });
  });
}

var SeedRoles = function() {
  return new Promise((res, rej) => {
    const roles = [
      {
        name: 'Admin',
        description: 'Administrador'
      },
      {
        name: 'Warehouseman',
        description: 'Almacenista'
      },
    ];
    const conditions = [
      {key: 'name'}
    ];
  
    SeedArrayInModel(app.models.Role, roles, conditions).then(() => res()).catch(err => rej(err));
  });
}

var SeedUsers = function() {
  return new Promise((res, rej) => {
    const users = [
      {
        role: 'Admin',
        username: 'Admin',
        email: 'admin@test.com',
        password: '123'
      },
    ];

    let cont = 0, limit = users.length;
    users.forEach(user => {
      app.models.Account.CreateUserWithRole(user, (err, newUser) => {
        if(err) rej(err);
        if(++cont == limit) res();
      });
    });
  });
}

var SeedMeasurementTypes = function() {
  return new Promise((res, rej) => {
    const measurementTypes = [
      {
        name: 'Kilogramos',
        abrev: 'kg',
      },
      {
        name: 'Piezas',
        abrev: 'pz',
      },
    ];
    const conditions = [
      {key: 'name'}
    ];

    let cont = 0, limit = measurementTypes.length;
    SeedArrayInModel(app.models.MeasurementType, measurementTypes, conditions).then(() => res()).catch(err => rej(err));
  });
}

var SeedOrderStatuses = function() {
  return new Promise((res, rej) => {
    const orderStatuses = [
      {
        id: 1,
        name: 'Pedido creado',
      },
      {
        id: 2,
        name: 'Pedido entregado',
      },
      {
        id: 3,
        name: 'Pendiente de pago',
      },
      {
        id: 4,
        name: 'Pagado',
      },
      {
        id: 5,
        name: 'Incobrable',
      },
      {
        id: 6,
        name: 'Cancelado',
      },
    ];
    const conditions = [
      {key: 'id'}
    ];

    let cont = 0, limit = orderStatuses.length;
    SeedArrayInModel(app.models.OrderStatus, orderStatuses, conditions).then(() => res()).catch(err => rej(err));
  });
}

var SeedProductTypes = function() {
  return new Promise((res, rej) => {
    const productTypes = [
      {
        name: 'Alimentos',
        utility: null,
      },
      {
        name: 'Varios',
        utility: 22.00,
      },
    ];

    let cont = 0, limit = productTypes.length;
    productTypes.forEach(type => {
      app.models.ProductType.CreateOne(type, (err, newType) => {
        if(err) rej(err);
        if(++cont == limit) res();
      });
    });
  });
}

var SeedFolders = function() {
  return new Promise((res, rej) => {
    const folders = [
      'orders-resumes'
    ];
  
    const Files = app.models.Files;
    let cont = 0, limit = folders.length;
    folders.forEach(folder => {
      // Get the container and if it doesn't exist, then create the container
      Files.getContainer(folder, (err, container) => {
        // Check if the error code is related with "No such file or directory" (ENOENT)
        // and if it does, create the container
        if(err && err.code == "ENOENT") {
          Files.createContainer({name: folder}, (err, newContainer) => {
            if(err) rej(err);
            cont++;
            if(cont == limit) res();
          });
        }
        else {
          cont++;
          if(cont == limit) res();
        }
      });
    })
  });
}

var InitializeCornjobs = function() {
  return new Promise((res, rej) => {
    app.models.PriceHistory.DailyCronJobToUpdatePrices();
    res();
  });
}

var AutoFillData = function() {
  return new Promise(async (res, rej) => {
    try {
      await SeedFolders();
      await SeedRoles();
      await SeedUsers();
      await SeedOrderStatuses();
      await SeedMeasurementTypes();
      await SeedProductTypes();
      await InitializeCornjobs();
    } catch (err) {
      console.error("Error", err);
    }
    res();
  });
}