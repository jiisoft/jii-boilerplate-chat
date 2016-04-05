
// Libs
window.$ = window.jQuery = require('jquery');
require('bootstrap');
require('jii/deps');
require('jii-urlmanager');
require('jii-clientrouter');
require('jii-view');
require('jii-comet/sockjs');

// Application
window.app = Jii.namespace('app');
require('./controllers/SiteController');

Jii.createWebApplication({
    application: {
        basePath: location.href,
        viewPath: 'views',
        components: {
            urlManager: {
                className: 'Jii.urlManager.UrlManager',
                rules: {
                    '': 'site/index',
                    'chat': 'site/chat'
                }
            },
            clientRouter: {
                className: 'Jii.clientRouter.Router'
            },
            view: {
                className: 'Jii.view.ClientWebView',
                templates: {
                    'views/site/index.ejs': require('../templates/site/index.ejs'),
                    'views/site/chat.ejs': require('../templates/site/chat.ejs'),
                    'views/site/_message.ejs': require('../templates/site/_message.ejs')
                }
            },
            comet: {
                className: 'Jii.comet.client.Client',
                serverUrl: 'http://localhost:4401/comet'
            }
        }
    }
}).start();

// Change active link
Jii.app.on(Jii.base.Module.EVENT_BEFORE_ACTION, function(event) {
    /** @typedef {Jii.base.ActionEvent} event */

    var path = event.context.request.getPathInfo();
    var links = $('a[href="#/' + path + '"');
    links.parents('ul.nav').find('> li.active').removeClass('active');
    links.parent().addClass('active');
});
