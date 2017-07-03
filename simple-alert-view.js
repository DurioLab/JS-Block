+function($){

    var noop = function(){};

	var defaultOptions = {
		title: '标题',
		desc: '描述',
		buttons:['取消', '确定'],
		autohide: false, // 1000ms
		callback: noop
	};

    var tmpl = [
        '<div class="alert-view fade">',
            '<div class="alert-content">',
                '<div class="alert-body"></div>',

            '</div>',
        '</div>'
    ].join('').replace(/\s\s+/g, '');

    console.log(tmpl);

	var viewsStack = [];

	function AlertView(opts) {
        this.$body = $(document.body);
	}

    AlertView.BACKDROP_TRANSITION_DURATION = 150;
    AlertView.TRANSITION_DURATION = 200;

	AlertView.prototype.show = function(){

        var that = this;

        that.isShown = true;
        that.backdrop(function(){
            console.log($(tmpl) );
            that.$element = $(tmpl).appendTo(that.$body);


        });
	}

	AlertView.prototype.dismiss = function(){

        var that = this;

        this.isShown = false;
        this.backdrop(function(){})
	}

    AlertView.prototype.backdrop = function(callback){

        callback = callback || noop;

        var that = this;

        if (this.isShown) {

            this.$backdrop = $(document.createElement('div'))
                .addClass('simple-alertview-backdrop fade')
                .appendTo(this.$body);

            this.$backdrop[0].offsetWidth; // force reflow
            this.emulateTransitionEnd(AlertView.BACKDROP_TRANSITION_DURATION, callback);
            this.$backdrop.addClass('in');

        } else {

            var callbackRemove = function () {
                that.removeBackdrop();
                callback && callback()
            };

            this.emulateTransitionEnd(AlertView.BACKDROP_TRANSITION_DURATION, callbackRemove);
            this.$backdrop.removeClass('in');
        }
    }


    AlertView.prototype.removeBackdrop = function(){
        that.$backdrop && that.$backdrop.remove();
        that.$backdrop = null;
    }

    AlertView.prototype.emulateTransitionEnd = function(duration, callback){
        setTimeout(function(){
            callback && callback();
        }, duration);
    }


    AlertView.prototype.createFooter = function(){

    }
    AlertView.prototype.createHeader = function(){

    }
    AlertView.prototype.createContent = function(){
        
    }

	$.extend({
		alertView: function(opts){
			opts = $.extend(defaultOptions, opts);
			var av = new AlertView(opts);
			viewsStack.push(av);
			return av;
		}
	});

}(jQuery);