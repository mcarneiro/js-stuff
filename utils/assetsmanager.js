if(!window.utils){ var jsStuff = {utils:{}}; }
if(!jsStuff.utils){ jsStuff.utils = {}; }

;(function(scope){

	var AssetsManager = function(){ },
		Templates = function(p_source) {
			this.original = p_source;
			this.html = this.original;
			this.templates = {};
		},
		single = null;
	AssetsManager.prototype = {
		getFragment: function(p_name, p_source){
			var rule = ['<'+p_name+'>','<\\/'+p_name+'>'],
				matched = p_source
					.match(new RegExp(rule[0]+'[\\s\\S]*?'+rule[1], 'gm')) || [],
				current = null,
				fragments = [];
			for(var i=0, len=matched.length; i < len; i++){
				current = (matched[i].match(new RegExp(rule[0]+'([\\s\\S]*?)'+rule[1], 'm')) || []).pop();
				if(current){
					fragments.push(current);
				}
			}
			return fragments;
		},
		getTemplates: function(p_source) {
			var regexpStr = '<template:([\\s\\S]*?)>([\\s\\S]*)<\\/template:\\1>',
				regexp = new RegExp(regexpStr, 'm'),
				templates = p_source.match(new RegExp(regexpStr, 'gm')),
				matched = null,
				returnObj = new Templates(p_source);
			if(templates){
				for(var i=0, len=templates.length; i < len; i++){
					matched = templates[i].match(regexp);
					if(matched && matched.length === 3){
						returnObj.add(matched[1], matched[2]);
						returnObj.html = returnObj.html.replace(matched[0], '');
					}
				}
			}
			return returnObj;
		},
		getTemplateObject: function(p_name, p_source) {
			return this.getTemplates(this.getFragment(p_name, p_source).shift());
		}
	};
	Templates.prototype = {
		add: function(p_name, p_value) {
			this.templates[p_name] = p_value;
		}
	};
	
	scope.AssetsManager = new AssetsManager();
	scope.AssetsManager.Class = AssetsManager;
})(
	jsStuff.utils
);