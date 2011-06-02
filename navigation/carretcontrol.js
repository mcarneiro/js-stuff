if(!window.jsStuff){ var jsStuff = {navigation:{}}; }
if(!jsStuff.navigation){ jsStuff.navigation = {}; }

/**
 * Carret control (controller class for pagination and sliders)
 * @author Marcelo Miranda Carneiro - mcarneiro@gmail.com (Wed Jun  1 00:08:12 BRT 2011)
 */
;(function(scope, EventManager, delegate){

	var CarretControl = function(p_length, p_loop, p_index) {
		this.length = p_length;
		this.loop = p_loop;
		this.index = p_index || 0;
		this.lastIndex = this.index;
		this.position = '';
		this.evt = new EventManager(this);
	};
	
	CarretControl.prototype = {
		go: function(p_index) {
			this.index = this.getNewIndex(p_index);

			this._setPositionStatus();
			this.evt.trigger('refresh', {
				index: this.index,
				length: this.length,
				loop: this.loop,
				position: this.position,
				direction: (p_index > this.lastIndex) ? 'next' : (p_index < this.lastIndex ? 'previous' : 'stopped')
			});
			this.lastIndex = this.index;
		},
		next: function() {
			this.go(this.index + 1);
		},
		previous: function() {
			this.go(this.index - 1);
		},
		getNewIndex: function(p_index) {
			if(this.loop){
				return (p_index >= this.length) ? 0 : ((p_index < 0) ? this.length-1 : p_index);
			}
			return (p_index >= this.length) ? this.length-1 : ((p_index < 0) ? 0 : p_index);
		},
		_setPositionStatus: function() {
			if(!this.loop){
				switch(this.index){
					case 0:
						this.position = 'position-first';
						break;
					case this.length-1:
						this.position = 'position-last';
						break;
					default:
						this.position = 'position-middle';
						break;
				}
			}else{
				this.position = 'position-middle';
			}
		}
	};

	scope.CarretControl = CarretControl;
	
})(
	jsStuff.navigation,
	jsStuff.events.EventManager,
	jsStuff.utils.delegate
);