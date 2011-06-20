if(!window.jsStuff){ var lim = {utils:{}}; }
if(!jsStuff.utils){ jsStuff.utils = {}; }

/**
 * Delegate class (scope changer)
 * @author Marcelo Miranda Carneiro - mcarneiro@gmail.com (Wed Jun  1 00:13:45 BRT 2011)
 * @usage
 * <code>
 *     delegate(function(a,b,c[, EXTRA_PARAMETERS, ORIGINAL_SCOPE]){
 *         // wathever - this here will be newScope
 *     }, NEW_SCOPE[, EXTRA_PARAMETERS, KEEP_ARGUMENT_NUMBER]);
 * </code>
 */
;(function(scope, ArrayUtil){

	var Delegate = function() {
			this.cacheData = [];
			this.cache = {};
		}, single,

		// privates
		_getIndexByString = function(p_data, p_item) {
			for(var i=0, len=p_data.length; i < len; i++){
				if(p_data[i] && p_data[i].toString() === p_item.toString()){
					return i;
				}
			}
			return -1;
		};
		Delegate.prototype = {
			
			_createCache: function(p_method, p_scope, p_params, p_sameArgsNum) {
				var _this = this,
					currentIndex = -1,
					cacheName = "";
				
				// generate cache name
				ArrayUtil.forEach(Array.prototype.slice.call(arguments), function(i, item, arr){
					
					if(!_this.cacheData[i]){ _this.cacheData[i] = []; }

					currentIndex = ArrayUtil.indexOf(_this.cacheData[i], item);
					if(currentIndex < 0 && i === 0 && item){
						currentIndex = _getIndexByString(_this.cacheData[i], item);
					}

					if(currentIndex < 0){
						currentIndex = _this.cacheData[i].push(item) - 1;
					}
					cacheName += currentIndex;
					
				});
				
				// create method and create cache item
				if (!this.cache[cacheName]) {
					this.cache[cacheName] = function(){
						var args = Array.prototype.slice.call(arguments)
							.concat(new Array(p_sameArgsNum ? Math.max(p_method.length - arguments.length, 0) : 0))
							.concat(Array.prototype.slice.call(p_params != null ? p_params : []))
							.concat(p_scope);
						return p_method.apply(p_scope, args);
					};
				};
				
				return this.cache[cacheName];
			},
			run: function(p_method, p_scope, p_params, p_sameArgsNum){
				if(p_method && p_method.constructor === Function && p_scope){
					return this._createCache(p_method, p_scope, p_params, p_sameArgsNum);
				}
				return null;
			}
		};
	scope.Delegate = Delegate;
	scope.delegate = function(p_method, p_scope, p_params, p_sameArgsNum) {
		if(!single){
			single = new Delegate();
		}
		return single.run(p_method, p_scope, p_params, p_sameArgsNum);
	};

})(jsStuff.utils, jsStuff.utils.ArrayUtil);