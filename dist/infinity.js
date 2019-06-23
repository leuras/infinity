/**
 * Infinity Page Plugin v2.0.0
 * https://github.com/leuras/infinity
 *
 * Copyright (c) 2016 Fernando Pereira Libório
 * Released under the MIT license
 *
 * Apr 06th, 2016
 */

(function($) {

    $.infinity = (options) => {

        let defaults = {
            url: '',
            dataType: 'html',
            auto: false,
            first: 0,
            count: 10,
            fail: undefined,
            success: undefined,
            done: undefined
        }

        let _firstCall = true

        this.go = (url) => {
            _firstCall = false

            this.settings.url = url || this.settings.url             
            this._search()
            
            return this
        }

        this.more = () => {

            this.settings.first += this.settings.count;
            this._search()
            
            return this
        }

        this._search = () => {
            
            let url = this.settings.url
                .replace('{first}', this.settings.first)
                .replace('{count}', (this.settings.count + 1))
            
            $.ajax({
                url : url,
                dataType: this.settings.dataType
            })
            .fail((request, status, error) => {
                if (typeof this.settings.error !== 'undefined') {
                    this.settings.error.call(this, request, status, error);
                }
            })
            .done((result, status, request) => {

                let data = []
                let hasMore = true

                if ($.isArray(result)) {
                    data = result
                } else if ($.isArray(result.data)) {
                    data = result.data
                }

                if (this.settings.dataType === 'json') {
                    hasMore = (data.length > this.settings.count) ? true : false
                    
                    if (hasMore) {
                        data.pop()
                    }
                }

                if (typeof this.settings.success !== 'undefined') {
                    this.settings.success.call(this, data, status, request)
                }

                if (typeof this.settings.done !== 'undefined' && ! hasMore) {
                    this.settings.done.call(this)
                }
            })
        }

        this.settings = $.extend({}, defaults, options)

        if (this.settings.auto === true) {
            
            let $window = $(window)

            $window.scroll(() => {
                if (($window.scrollTop() + $window.height()) === $(document).height()) {
                    if (_firstCall) {
                        this.go()
                    } else {
                        this.more()
                    }    
                }
            })
        }

        return this
    }

})(jQuery);
