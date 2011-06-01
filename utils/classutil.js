if(!window.jsStuff){ var lim = {utils:{}}; }
if(!jsStuff.utils){ jsStuff.utils = {}; }

/**
 * Class utilities.
 * @author Marcelo Miranda Carneiro - mcarneiro@gmail.com (Wed Jun  1 00:06:46 BRT 2011)
 */
;(function(scope, ObjectUtil){

	var ClassUtil = function(p_class, p_scope){
		this._classObject = p_class;
		this._scope = p_scope || this;
	};
	ClassUtil.prototype = {
		_super: function(){
			var method = this._classObject.prototype[arguments[0]];
			if(method && method.constructor === Function){
				return method.apply(this._scope, Array.prototype.slice.call(arguments, 1));
			}
			return null;
		}
	};
	
	ClassUtil.extend = function() {
		var args = [];
		for(var i=1, len=arguments.length-1; i < len; i++){
			if(arguments[i]){
				args.push(arguments[i].prototype);
			}
		}
		args.push(arguments[i]);
		return arguments[0] ? (arguments[0].prototype = ObjectUtil.clone.apply(null, args)) : null;
	};
	scope.ClassUtil = ClassUtil;
})(
	jsStuff.utils,
	jsStuff.utils.ObjectUtil
);