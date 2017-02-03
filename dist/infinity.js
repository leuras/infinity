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
            autoScroll: true,
            offset: 0,
            method: 'GET',
            limit: 10,
            fail: function() {},
            success: function() {},
            done: function() {},
            pageIndex: 0
        }

        var _offset;
        var plugin = this;

        plugin.settings = {};
        
        plugin.init = function() {
            plugin.settings = $.extend({}, defaults, options);
            _offset = plugin.settings.offset;
            plugin.urlSufixTemplate = new Function("limit", 
              "offset", 
              "pageIndex",
              "return `" + plugin.settings.url + "`;");
            _setupAutoScroll();
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

        var _setupAutoScroll = function(){
            if(plugin.settings.autoScroll === false) {
                return this;
            }
            $(window).scroll(function() {
                if (($(window).scrollTop() + $(window).height()) ===
                    $(document).height()) {
                    plugin.more();
               }
            });
            return this;
        };
        var _doSearch = function() {
            plugin.settings.pageIndex += 1;
            var url = plugin.urlSufixTemplate.call(plugin, 
               plugin.settings.limit,
               plugin.settings.offset,
               plugin.settings.pageIndex);
            
            $.ajax({
                type: plugin.settings.method,
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
