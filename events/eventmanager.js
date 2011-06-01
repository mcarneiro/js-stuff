if(!window.jsStuff){ var lim = {events:{}}; }
if(!jsStuff.events){ jsStuff.events = {}; }

/**
 * Event Manager (dispatcher).
 * @author Marcelo Miranda Carneiro - mcarneiro@gmail.com (Wed Jun  1 00:09:01 BRT 2011)
 */
;(function(scope) {
	var Event = function(p_type, p_callback, p_target, p_extra) {
		this.type = p_type;
		this.target = p_target;
		this.extra = p_extra;
		this._callback = p_callback;
	},
	EventManager = function(p_target) {
		this._eventTypes = {};
		this.target = p_target;
	};
	EventManager.prototype = {
		_createEventType: function(p_type) {
			if(!this._eventTypes[p_type]){
				this._eventTypes[p_type] = [];
			}
		},
		bind: function(p_type, p_callback, p_extra) {
			this._createEventType(p_type);
			if(p_callback && p_callback.constructor === Function){
				this._eventTypes[p_type].push(new Event(p_type, p_callback, this.target, p_extra));
			}
			return this;
		},
		unbind: function(p_type, p_callback) {
			var events = this._eventTypes[p_type];
			if(events){
				if(!p_callback){
					events.length = 0;
				}else{
					for(var i=0, len=events.length; i < len; i++){
						if(events[i]._callback === p_callback){
							events.splice(i, 1);
							break;
						}
					}
				}
			}else{
				for(var n in this._eventTypes){
					if(this._eventTypes.hasOwnProperty(n)){
						this._eventTypes[n].length = 0;
					}
				}
			}
			return this;
		},
		trigger: function(p_type, p_extra) {
			var events = this._eventTypes[p_type];
			if(events){
				for(var i=0, len=events.length; i < len; i++){
					if(events[i]._callback.call(events[i].target, events[i], p_extra) === false){
						break;
					}
				}
			}
			return this;
		}
	};

	scope.Event = Event;
	scope.EventManager = EventManager;
	
})(jsStuff.events);