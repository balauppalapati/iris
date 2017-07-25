'use strict';

module.exports = server => {

  const appDataSource = server.dataSources.db;

  const autoupdateTables = () => {

    const builtInModels = ['ACL', 'RoleMapping', 'Role'];
    const extendedModels = ['accessToken', 'user', 'userCredential', 'userIdentity'];
    const appModels = ['dsn', 'dsnColumn', 'dsnDb', 'dsnTable', 'project', 'workbook', 'worksheet'];
    const models = appModels.concat(builtInModels, extendedModels);

    models.forEach(model => {
      appDataSource.autoupdate(model, err => {
        if (err) {
          console.log(err);
        }
        //  Handle the error to prevent application from Crashing
      });
    });
  }

  appDataSource.connected ? autoupdateTables() : appDataSource.once('connected', autoupdateTables);

};
