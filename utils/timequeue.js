if(!window.jsStuff){ var jsStuff = {utils:{}}; }
if(!jsStuff.utils){ jsStuff.utils = {}; }

/**
 * Standalone class for executing methods in an order.
 * @author Marcelo Miranda Carneiro - mcarneiro@gmail.com (Tue May 31 23:40:36 BRT 2011)
 * @usage
 * <code>
 *     TimeQueue.lazyStart(
 *         [ showNode1, showNode2, {method: showNode3, params: [1,2,3]} ],
 *         0.5
 *     );
 *     // This will run a method each 500 miliseconds:
 *     // 0.0: showNode1()
 *     // 0.5: showNode2()
 *     // 1.0: showNode3(1,2,3)
 *     
 *     // It is possible to give a time for each method:
 *     TimeQueue.lazyStart(
 *         [ showNode1, showNode2, {method: showNode3, params: [1,2,3]} ],
 *         [0, 0.3, 1.5]
 *     );
 *     // 0.0: showNode1()
 *     // 0.3: showNode2()
 *     // 1.5: showNode3(1,2,3)
 *     
 *     // To stop a created queue you can set a ID for the lazyStart, get the generated ID or use the Instance Class:
 *     
 *     // give ID manually:
 *     TimeQueue.lazyStart(
 *         [ showNode1, showNode2, {method: showNode3, params: [1,2,3]} ],
 *         [0, 0.3, 1.5],
 *         null, // scope for applying methods
 *         'showNodes'
 *     );
 *     TimeQueue.lazyStop('showNodes');
 *     
 *     // get generated ID:
 *     var id = TimeQueue.lazyStart(
 *         [ showNode1, showNode2, {method: showNode3, params: [1,2,3]} ],
 *         [0, 0.3, 1.5]
 *     );
 *     TimeQueue.lazyStop(id);
 *     
 *     // instantiate:
 *     var timeQueue = new TimeQueue();
 *     timeQueue.run(
 *         [ showNode1, showNode2, {method: showNode3, params: [1,2,3]} ],
 *         [0, 0.3, 1.5]
 *     );
 *     timeQueue.stop();
 * </code>
 */
;(function(scope){

	var TimeQueue = function(){
		this.queue = [];
	}, queue = {};
	TimeQueue.prototype = {
		_isArray: function(p_value) {
			return p_value && p_value.constructor === Array;
		},
		_isFunction: function(p_value) {
			return p_value && p_value.constructor === Function;
		},
		run: function(p_methods, p_interval, p_scope){
			
			if (p_interval == null || p_methods == null) {
				throw new Error("[FunctionUtil.timeQueue] ERROR: methods and interval MUST be defined: methods: " + p_methods + " /  interval: " + p_interval);
			}
			
			var _this = this, i = 0;
			switch(true) {
				case (this._isArray(p_interval)):
					var currInterval;
					for (i = 0; Boolean(p_methods[i]); i++) {
						currInterval = p_interval[i] != null && !isNaN(p_interval[i]) ? p_interval[i] : 0;
						if (currInterval == 0) {
							switch(true){
								case (this._isFunction(p_methods[i])):
									p_methods[i]();
									break;
								case (this._isFunction(p_methods[i].method)):
									p_methods[i].method.apply(this._isArray(p_scope) ? p_scope[i] : p_scope, p_methods[i].params);
									break;
							}
						} else {
							if (this._isFunction(Function)) {
								this.queue.push(setTimeout(p_methods[i], (i + 1) * (currInterval*1000)));
							}else{
								this.queue.push(setTimeout((function(i){
									return function() {
										p_methods[i].method.apply(_this._isArray(p_scope) ? p_scope[i] : p_scope, p_methods[i].params);
									};
								})(i), (i + 1) * (currInterval * 1000)));
							}
						}
					}
					break;
				case (!isNaN(p_interval)):
					for (i = 0; Boolean(p_methods[i]); i++) {
						if(this._isFunction(p_methods[i]) || this._isFunction(p_methods[i].method)){
							if (p_interval == 0) {
								if (this._isFunction(p_methods[i])) {
									p_methods[i]();
								}else{
									p_methods[i].method.apply(p_scope, p_methods[i].params);
								}
							}else {
								if (this._isFunction(p_methods[i])) {
									this.queue.push(setTimeout(p_methods[i], (i + 1) * (p_interval*1000)));
								}else{
									this.queue.push(setTimeout((function(i){
										return function() {
											p_methods[i].method.apply(_this._isArray(p_scope) ? p_scope[i] : p_scope, p_methods[i].params);
										};
									})(i), (i + 1) * (p_interval * 1000)));
								}
							}
						}
					}
					break;
				default:
					throw new Error("[timeQueue] ERROR: interval MUST be a Array OR Number. Current interval value: " + p_interval);
			}
		},
		stop: function() {
			for (var i = 0; Boolean(_queue[id][i]); i++) {
				clearTimeout(this.queue[i]);
			}
			this.queue.length = 0;
		}
	};
	scope.TimeQueue = TimeQueue;
	scope.TimeQueue.lazyStart = function(p_methods, p_interval, p_scope, p_id) {
		if(!p_id){ p_id = Number(new Date()); }
		queue[p_id] = new TimeQueue();
		queue[p_id].run(p_methods, p_interval, p_scope);
		return p_id;
	};
	scope.TimeQueue.lazyStop = function(p_id) {
		if(queue[p_id]){
			queue[p_id].stop();
			delete queue[p_id];
		}
	};
	
})(
	jsStuff.utils
);