var Jii = require('jii');
require('jii-httpserver');
require('jii-view');
require('jii-urlmanager');
require('jii-comet');

require('./controllers/SiteController');

var custom = require('fs').existsSync(__dirname + '/config.js') ? require('./config') : {};

require('jii-workers')
    .setEnvironment(custom.environment)
    .application('comet', Jii.mergeConfigs(
        {
            workers: 2,
            application: {
                basePath: __dirname,
                components: {
                    comet: {
                        className: 'Jii.comet.server.Server',
                        port: 4401,

                        /**
                         *
                         * @param {Jii.comet.server.ConnectionEvent} event
                         */
                        'on addConnection': function(event) {
                            Jii.app.comet.subscribe(event.connection.id, 'chat');
                        }
                    }
                }
            }
        },
        custom.comet || {}
    ))
    .application('http', Jii.mergeConfigs(
        {
            application: {
                basePath: __dirname,
                viewPath: __dirname + '/../templates',
                components: {
                    urlManager: {
                        className: 'Jii.urlManager.UrlManager',
                        rules: {
                            '': 'site/index',
                            'chat': 'site/chat'
                        }
                    },
                    http: {
                        className: 'Jii.httpServer.HttpServer',
                        port: 4400,
                        staticDirs: __dirname + '/../public/'
                    },
                    view: {
                        className: 'Jii.view.ServerWebView'
                    }
                }
            }
        },
        custom.http || {}
    ));
