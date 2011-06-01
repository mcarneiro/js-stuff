if(!window.jsStuff){ var jsStuff = {transitions:{}}; }
if(!jsStuff.transitions){ jsStuff.transitions = {}; }

/**
 * Abstract Transition class. Must be extended.
 * @author Marcelo Miranda Carneiro - mcarneiro@gmail.com (Tue May 31 23:40:36 BRT 2011)
 * @usage
 * <usage>
 *     var transition = new FadeTransition({
 *         elm1: $('#elm1'),
 *         elm2: $('@elm2')
 *     });
 *     transition.show(elm, {direction: 'right'});
 *
 *     // inside your FadeTransition (extending BaseTransition via prototype) class it could be something like:
 *     ...
 *     _doShow: function(p_node, p_extra) {
 *         switch(true){
 *             case (p_node == this.elm1):
 *                 p_node.animate({opacity:1, left: p_extra.direction == 'right' ? 10 : -10}, 1000);
 *                 break;
 *             default:
 *                 p_node.animate({opacity:1}, 300);
 *                 break;
 *         }
 *     }
 *     ...
 * </usage>
 */
;(function(scope, TimeQueue){

	var BaseTransition = function(p_nodes, p_config){
		this._registerNodes(p_nodes);
		this.config = p_config;
	};
	BaseTransition.prototype = {
		_registerNodes: function(p_nodes) {
			if(p_nodes){
				for(var n in p_nodes){
					if(p_nodes[n] && p_nodes.hasOwnProperty(n)){
						this[n] = p_nodes[n];
					}
				}
			}
		},
		init: function(p_nodes){
			this._registerNodes(p_nodes);
		},
		
		// param verification (for alone or group calls)
		_queue: function(p_node, p_extra, p_method) {
			var toRun = [];
			for(var i=0, len=p_node.length; i < len; i++){
				toRun.push({method: p_method, params: p_node[i]});
			}
			TimeQueue.lazyStart(toRun, p_extra, this);
		},
		_verifyAndRun: function(p_method, p_arguments) {
			switch(true){
				case (p_arguments[0] && p_arguments[0].constructor === Array):
					this._queue(p_arguments[0], p_arguments[1], p_method);
					break;
				default:
					p_method.apply(this, p_arguments);
					break;
			}
		},

		_doChangeData: function(p_node, p_data, p_extra) {
			throw new Error('[BaseTransition._doChangeData] This method must be extended.');
		},
		_doShow: function(p_node, p_extra) {
			throw new Error('[BaseTransition._doShow] This method must be extended.');
		},
		_doHide: function(p_node, p_extra) {
			throw new Error('[BaseTransition._doHide] This method must be extended.');
		},

		/**
		 * as array: changeData([[p_node, p_data, p_extra], [p_node, p_data, p_extra]], interval)
		 * as unique: changeData(p_node, p_data, p_extra)
		 */
		changeData: function(p_node, p_data, p_extra) {
			this._verifyAndRun(this._doChangeData, [p_node, p_data, p_extra || {}]);
		},
		
		/**
		 * as array: show([[p_node, p_extra], [p_node, p_extra]], interval)
		 * as unique: show(p_node, p_extra)
		 */
		show: function(p_node, p_extra) {
			this._verifyAndRun(this._doShow, [p_node, p_extra || {}]);
		},
		hide: function(p_node, p_extra) {
			this._verifyAndRun(this._doHide, [p_node, p_extra || {}]);
		}
	};
	scope.BaseTransition = BaseTransition;
})(
	jsStuff.transitions,
	jsStuff.utils.TimeQueue
);