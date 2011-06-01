if(!window.jsStuff){ var jsStuff = {utils:{}}; }
if(!jsStuff.utils){ jsStuff.utils = {}; }

;(function(scope, delegate, EventManager){

	/**
	 * Creates an interval of time and define a "step" value based on "size".
	 * @author Marcelo Miranda Carneiro - mcarneiro@gmail.com Tue May 31 12:14:29 BRT 2011
	 * 
	 * @requires jsStuff.utils.ClassUtil, jsStuff.events.EventManager, jsStuff.utils.StepInterval
	 * @example
	 * <code>
	 *    window.steps = new jsStuff.display.StepInterval({
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
	 *    window.steps.evt.bind('refresh', function(e, p_data){
	 *        console.info('step at: ', p_data.position);
	 *    })
	 *    window.steps.play();
	 * </code>
	 */
	
	var StepInterval = function(p_config, p_index){
		this.size = p_config.size;
		this.steps = p_config.steps;
		this.keys = p_config.keyGroups || {};
		this.loop = !!p_config.loop;
		this.currStep = null;
		this.index = 0;
		this._setFirstFrame(p_index);
		this.fps = p_config.fps || 24;
		this.interval = null;
		this.status = 'stopped';
		this.evt = new EventManager(this);
	};
	StepInterval.prototype = {
		_verifyLoop: function() {
			if(this.loop && this.currStep.start > this.currStep.end){
				this.index = this.currStep.start;
			}
		},
		_verifyEnd: function() {
			if(!this.loop && this.index >= this.currStep.end){
				this.stop();
			}
		},
		_animate: function(p_callback) {
			this._verifyLoop();
			this.evt.trigger('refresh', {
				position: this.size*(this.index),
				keyGroup: this.currStep,
				totalSteps: this.steps,
				index: this.index
			});
			this.index++;
			this._verifyEnd();
		},
		_setFirstFrame: function(p_start) {
			if(p_start != null){
				switch(p_start.constructor){
					case Object:
						if(p_start.start != null){
							this.currStep = p_start;
						}
						break;
					case String:
						if(this.keys[p_start]){
							this.currStep = this.keys[p_start];
						}
						break;
					case Number:
						var start = Math.abs(p_start);
						this.currStep = {
							start: start >= this.steps ? 0 : start,
							end:this.steps
						};
						break;
				}
				this.index = this.currStep.start;
			}
		},
		play: function(p_start, p_loop) {
			this.stop();
			this.loop = typeof(p_loop) === 'boolean' ? p_loop : this.loop;
			this._setFirstFrame(p_start);
			this.evt.trigger('play', { keyGroup: this.currStep, totalSteps: this.steps });
			this.status = 'playing';
			this.interval = setInterval(delegate(this._animate, this), 1000/this.fps);
		},
		stop: function() {
			this.status = 'stopped';
			clearInterval(this.interval);
			this.evt.trigger('stop', { keyGroup: this.currStep, totalSteps: this.steps });
		}
	};
	scope.StepInterval = StepInterval;

})(jsStuff.utils, jsStuff.utils.delegate, jsStuff.events.EventManager);