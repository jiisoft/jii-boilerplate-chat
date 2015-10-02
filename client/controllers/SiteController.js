var moment = require('moment');

/**
 * @class app.controllers.SiteController
 * @extends Jii.base.Controller
 */
Jii.defineClass('app.controllers.SiteController', /** @lends app.controllers.SiteController.prototype */{

	__extends: Jii.base.Controller,

    _isChatInit: false,

	actionIndex: function(context) {
        $('#content').html(this.renderPartial('index'));
	},

	actionChat: function(context) {
        var $content = $('#content').html(this.renderPartial('chat'));

        $content.find('> form').on('submit', function(e) {
            e.preventDefault();

            var data = {
                username: $(this).find('input[name=username]').val(),
                message: $(this).find('input[name=message]').val()
            };

            if (data.username && data.message) {
                Jii.app.comet.send('chat', data);
                $(this).find('input[name=message]').val('');
            }
        });

        if (!this._isChatInit) {
            this._isChatInit = true;
            console.log(123)
            Jii.app.comet.on(
                Jii.comet.client.ControllerClient.EVENT_CHANNEL_NAME + 'chat',
                /** @param {Jii.comet.ChannelEvent} event */
                function(event) {
                    event.params.date = moment().format('HH:mm');
                    $content.find('.chat-messages').prepend(this.renderPartial('_message', event.params));
                }.bind(this)
            );
        }
    }


});