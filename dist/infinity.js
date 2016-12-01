/**
 * Infinity Page Plugin v1.0.0
 * https://github.com/leuras/infinity
 *
 * Copyright (c) 2016 Fernando Pereira Libório
 * Released under the MIT license
 *
 * Apr 06th, 2016
 */

(function($) {

    $.infinity = function(options) {

        var defaults = {
            url: '',
            dataType: 'html',
            offset: 0,
            limit: 10,
            fail: function() {},
            success: function() {},
            done: function() {}
        }

        var _offset;
        var plugin = this;

        plugin.settings = {}
        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
            _offset = plugin.settings.offset;
        }

        plugin.go = function(url) {
            plugin.settings.offset = _offset;
            if (url !== undefined) {
                plugin.settings.url = url;
            }
            _doSearch();
            return this;
        };

        plugin.more = function() {
            plugin.settings.offset += plugin.settings.limit;
            _doSearch();
            return this;
        };

        var _doSearch = function() {

            var url = plugin.settings.url + '/';
            url = url.replace(/(\/\/)$/, '/0/');
            url+= (plugin.settings.limit + 1) + '/' + plugin.settings.offset

            $.ajax({
                type: 'GET',
                url :  url,
                dataType: plugin.settings.dataType
            })
            .done(function(r,c,h) {

                var hasMore = true;
                if (plugin.settings.dataType === 'json') {
                    if ($.isArray(r) && (r.length > plugin.settings.limit) ) {
                        hasMore = true;
                        r.pop();
                    } else {
                        hasMore = false;
                    }
                }

                if ( $.isFunction( plugin.settings.success ) ) {
                    plugin.settings.success.call(this, r, c, h);
                }

                if ( !hasMore && $.isFunction( plugin.settings.done ) ) {
                    plugin.settings.done.call(this);
                }
            })
            .fail(function(r) {
                if ( $.isFunction( plugin.settings.error ) ) {
                    plugin.settings.error.call(this, r, c, h);
                }
            });
        }

        plugin.init();

        return plugin;
    }

})(jQuery);