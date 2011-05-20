if(!window.jsStuff){ var jsStuff = {utils:{}}; }
if(!jsStuff.utils){ jsStuff.utils = {}; }

/**
 * @author Marcelo Miranda Carneiro - mcarneiro@gmail.com
 */
;(function(scope, $, FragmentManager){

	var NodeUtil = function() {};
	NodeUtil.prototype = {
		wrap: function(p_holder, p_wrapper, p_content) {
			var childFragment = new FragmentManager(p_holder.children().toArray());
		
			p_holder.append(p_wrapper);
			$(p_content || '.content:first', p_holder)
				.append(childFragment.holder);
		}
	};
	scope.NodeUtil = new NodeUtil();
	scope.NodeUtil.Class = NodeUtil;

})(jsStuff.utils, jQuery, jsStuff.utils.FragmentManager);