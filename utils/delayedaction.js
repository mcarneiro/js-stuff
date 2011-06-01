if(!window.jsStuff){ var jsStuff = {utils:{}}; }
if(!jsStuff.utils){ jsStuff.utils = {}; }

/**
 * Delay to avoid the speed of synchronous actions (useful for hovers and loader icons).
 * @author Marcelo Miranda Carneiro - mcarneiro@gmail.com (Wed Jun  1 00:06:06 BRT 2011)
 * Example:
 *   ...
 *   loadStatus: function(e) {
 *      switch(e.status){
 *          case 'loading':
 *              this.showLoaderIcon();
 *              break;
 *          case 'finished':
 *              this.hideLoaderIcon();
 *              break;
 *      }
 *   },
 *   showLoaderIcon: function() {
 *      this.delayed = this.delayed || new DelayedAction();
 *      this.delayed.run(function() {
 *          // show loader
 *      });
 *   },
 *   hideLoaderIcon: function() {
 *      this.delayed.avoid();
 *      // hide loader
 *   }
 */
;(function(scope){

	var DelayedAction = function(p_time){
		this.delay = p_time || 300;
		this.timeout = null;
	};
	DelayedAction.prototype = {
		run: function(p_method){
			clearTimeout(this.timeout);
			this.timeout = setTimeout(function() {
				p_method();
			}, this.delay);
		},
		avoid: function() {
			clearTimeout(this.timeout);
		}
	};
	
	scope.DelayedAction = DelayedAction;
})(
	jsStuff.utils
);