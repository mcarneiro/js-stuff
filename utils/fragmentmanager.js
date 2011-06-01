if(!window.jsStuff){ var jsStuff = {utils:{}}; }
if(!jsStuff.utils){ jsStuff.utils = {}; }

/**
 * Wrapper for creating and manipulating documentFragments.
 * @author Marcelo Miranda Carneiro - mcarneiro@gmail.com
 */
;(function(scope){

	var FragmentManager = function(p_values) {
			this.holder = document.createDocumentFragment();
			if(p_values){
				this.append(p_values);
			}
		},
		isArray = function(p_value) {
			return p_value && p_value.constructor === Array;
		};
	FragmentManager.prototype = {
		_append: function(p_value) {
			if(!p_value){ return; }
			for(var i=0, len=p_value.length; i < len; i++){
				if(p_value[i]){
					this.holder.appendChild(p_value[i]);
				}
			}
		},
		append: function(/*...nodes*/) {
			var args = arguments;
			switch(true){
				case (args.length === 1):
					args = isArray(args[0]) ? args[0] : [args[0]];
					this._append.call(this, args);
					break;
				case (args.length > 1):
					this._append.call(this, Array.prototype.slice.apply(args));
					break;
			}
		}
	};
	scope.FragmentManager = FragmentManager;

})(jsStuff.utils);