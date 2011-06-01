if(!window.jsStuff){ var lim = {display:{}}; }
if(!jsStuff.display){ jsStuff.display = {}; }

/**
 * Simple and lazy class to creates an animation based on the background position.
 * Important: all animations go from left to right (not top do bottom) in sprite position
 * @author Marcelo Miranda Carneiro - mcarneiro@gmail.com Tue May 31 12:14:29 BRT 2011
 * 
 * @extends jsStuff.utils.StepInterval
 * @requires jsStuff.utils.ClassUtil, jsStuff.events.EventManager, jsStuff.utils.StepInterval
 * @example
 * <code>
 *    window.steps = new jsStuff.display.SpriteAnimation($('.ico-bullet')[0], {
 *        size: 26, // "frame" size
 *        steps: 17, // "frame" count
 *        fps: 30, // frame per second
 *        keyGroups: { // optional
 *            // groups of animation: Ex.: the key "show" will start at "frame" 0 and
 *            // and at "frame" 8 (if loop is enabled, it will loop through these frames)
 *            show: {
 *                start: 0,
 *                end: 8
 *            },
 *            hide: {
 *                start: 8,
 *                end: 17
 *            }
 *        },
 *        loop: false // optional (defaults to false)
 *    });
 *    window.steps.play();
 * </code>
 */

;(function(scope, StepInterval, ClassUtil){

	var SpriteAnimation = function(p_holder, p_config, p_index){
		StepInterval.call(this, p_config, p_index);
		ClassUtil.call(this, StepInterval);
		this.holder = p_holder;
		this.built = false;
	};
	ClassUtil.extend(SpriteAnimation, StepInterval, ClassUtil, {
		_onRefresh: function(e, p_data) {
			e.extra.ico.style.backgroundPosition = '-'+p_data.position+'px 0px';
		},
		init: function(){
			if(this.built){ return; }
			this.evt.bind('refresh', this._onRefresh, {ico: this.holder});
			this.built = true;
		},
		play: function(p_start, p_loop) {
			this.init();
			this._super('play', p_start, p_loop);
		}
	});
	scope.SpriteAnimation = SpriteAnimation;
})(
	jsStuff.display,
	jsStuff.utils.StepInterval,
	jsStuff.utils.ClassUtil
);