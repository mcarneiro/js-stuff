if(!window.jsStuff){ var lim = {util:{}}; }
if(!jsStuff.utils){ jsStuff.utils = {}; }

/**
 * Array utilities.
 * @author Marcelo Miranda Carneiro - mcarneiro@gmail.com (Wed Jun  1 00:07:18 BRT 2011)
 */
;(function(scope){

	var ArrayUtil = {
		indexOf: function(p_array, p_obj, p_start){
			if(Array.prototype.indexOf){
				return p_array.indexOf(p_obj, p_start);
			}
			for (var i = (p_start || 0); i < p_array.length; i++) {
				if (p_array[i] == p_obj) { return i; }
			}
			return -1;
		},
		forEach: function(p_array, p_method){
			if(p_method && p_method.constructor === Function){
				for(var i=0, returnVal = null, len=p_array.length; i < len; i++){
					if(p_method(i, p_array[i], p_array) === false){
						break;
					}
				}
			}
		},
		isArray: function(p_value){
			return p_value && p_value.constructor === Array;
		}
	};
	scope.ArrayUtil = ArrayUtil;

})(jsStuff.utils);