const glob = require('glob');
const path = require('path');



/**
 * Registers all routes based on file names and folder structure starting in the
 * directory specified by the `routesRootDirPath` parameter.
 *
 * @param {express} app                         - Object used to register routes.
 * @param {Object} [options]
 * @param {String} [options.prefix = ""]        - Prefix to be appended to all route paths.
 * @param {String} [options.rootDir = 'routes'] - Path to the root directory containing all routes.
 *                                                NOTE: Path is expected to be relative to `process.cwd()`.
 */
module.exports = function registerRoutes(app, { prefix = '', rootDir = 'routes' } = {}) {
  _registerRoutes(app, routesRootDirPath, routePrefix);
};


/** @private */
function _registerRoutes(app, routesDirPath, routePrefix) {
  glob.sync('!(_)*.js', { cwd: routesDirPath, nosort: true }).forEach(function(routeFilePath) {
    let routePath = `${routePrefix}/${routeFilePath.replace('.js', '')}`;

    app.use(routePath, require(path.join('..', routesDirPath, routeFilePath)));

    console.log(`Registered Route: '${routePath}'`);
  });

  _registerSubRoutes(app, routesDirPath, routePrefix);
}


/** @private */
function _registerSubRoutes(app, routesDirPath, routePrefix) {
  glob.sync('!(*.js|_*)', { cwd: routesDirPath, nosort: true }).forEach(function(subRouteDirName) {
    _registerRoutes(app, path.join(routesDirPath, subRouteDirName), `${routePrefix}/${subRouteDirName}`);
  });
}
