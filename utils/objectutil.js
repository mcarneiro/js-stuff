if(!window.jsStuff){ var lim = {utils:{}}; }
if(!jsStuff.utils){ jsStuff.utils = {}; }

/**
 * Utitilies for Object.
 * @author Marcelo Miranda Carneiro - mcarneiro@gmail.com (Tue May 31 23:54:02 BRT 2011)
 */
;(function(scope){

	var ObjectUtil = function(){ };
	ObjectUtil.prototype = {
		/**
		 * replace based on a object (each label is a {LABEL} inside the string)
		 * Example: ObjectUtil.replaceString("um {valor}, dois {valores}", {valor: "copo", valores:"copos"}); // "um copo, dois copos"
		 */
		replaceString: function(p_string, p_data){
			var value = p_string;
			for(var n in p_data){
				if(p_data.hasOwnProperty(n) && typeof(p_data[n]) == 'string'){
					value = value.replace(new RegExp('\\{'+n+'\\}', 'g'), p_data[n]);
				}
			}
			return value;
		},
		/**
		 * replace a object with another object data.
		 * Example: ObjectUtil.replaceStringRecursive({
		 *     'imgPath': '{root}/img/image.png'
		 * }, {
		 *     'root': 'http://domain.com/'
		 * });
		 */
		replaceStringRecursive: function(p_toReplace, p_data) {
			var toReturn = p_toReplace;
			switch(p_toReplace.constructor){
				case String:
					toReturn = this.replaceString(p_toReplace, p_data);
					break;
				case Array:
					for(var i=0, len=toReturn.length; i < len; i++){
						toReturn[i] = this.replaceStringRecursive(toReturn[i], p_data);
					}
					break;
				case Object:
					for(var n in toReturn){
						if(toReturn.hasOwnProperty(n) && toReturn[n] != null){
							toReturn[n] = this.replaceStringRecursive(toReturn[n], p_data);
						}
					}
					break;
			}
			return toReturn;
		},
		/**
		 * clone or extend object (dont do it deeply)
		 * ObjectUtil.clone({a:1}) // {a:1} (new one)
		 * ObjectUtil.clone({a:1}, {b:2}) // {a:1, b:2}
		 */
		clone: function() {
			var args = arguments,
				curr = null,
				obj = {};

			for(var i = 0, len = args.length; i<len; i++){
				curr = args[i];
				if(!curr){ continue; }
				for(var n in curr){
					if(curr.hasOwnProperty(n)){
						obj[n] = curr[n];
					}
				}
			}

			return obj;
		}
	};
	scope.ObjectUtil = new ObjectUtil();
})(
	jsStuff.utils
);