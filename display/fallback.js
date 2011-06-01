if(!window.jsStuff){ var lim = {display:{}}; }
if(!jsStuff.display){ jsStuff.display = {}; }

/**
 * Helper to create fallbacks for older browsers (ex.: inserting elements to create rounded corners)
 * @author Marcelo Miranda Carneiro - mcarneiro@gmail.com (Wed Jun  1 00:11:09 BRT 2011)
 */
;(function(scope, $, wrap, getTextFragment){

	var HtmlFallback = function(){ };
	HtmlFallback.prototype = {
		runMultiple: function(p_data) {
			if(p_data){
				for(var i=0, len=p_data.length; i < len; i++){
					this.run(p_data[i].holder, p_data[i].fragment, p_data[i].className);
				}
			}
		},
		run: function(p_holder, p_fragment, p_class) {
			if(arguments[0] && arguments[0].constructor == Array){
				this.runMultiple(arguments[0]);
				return;
			}
			
			if(p_holder && p_holder.length > 0){
				p_holder.each(function() {
					wrap(
						$(this),
						getTextFragment(p_fragment.template, p_fragment.source)[0],
						p_class
					);
				});
			}
		}
	};
	
	scope.HtmlFallback = new HtmlFallback();
	scope.HtmlFallback.Class = HtmlFallback;

})(jsStuff.display, jQuery, jsStuff.utils.NodeUtil.wrap, jsStuff.utils.AssetsManager.getTextFragment);