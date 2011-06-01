if(!window.jsStuff){ var lim = {services:{}}; }
if(!jsStuff.services){ jsStuff.services = {}; }

/**
 * Organized way of requesting using jQuery.
 * @author Marcelo Miranda Carneiro - mcarneiro@gmail.com (Wed Jun  1 00:13:02 BRT 2011)
 */
;(function(scope, $, delegate, EventManager, replaceStringRecursive){

	var AjaxService = function(p_url, p_method){
		this.url = p_url;
		this.method = p_method || 'GET';
		this.request = null;
		this.status = 'stop'; // working, success, error, abort
		this.evt = new EventManager(this);
	};
	AjaxService.prototype = {
		_onComplete: function(p_data, p_status, p_extra) {
			switch(p_status){
				case 'success':
					if(p_data.response && p_data.response.shortcuts){
						var shortcuts = p_data.response.shortcuts;
						delete p_data.response.shortcuts;
						p_data.response = replaceStringRecursive(p_data.response, shortcuts);
					}
					this.setStatus(p_data.status, p_data.response || p_data);
					break;
				case 'parsererror':
					this.setStatus('error', {
						mensagem: 'Retorno inválido.',
						exception: p_extra
					});
					break;
				case 'error':
					this.setStatus('error', {
						mensagem: 'Erro '+p_data.status+': '+p_data.statusText,
						exception: p_data.responseText
					});
					break;
			}
		},
		abort: function() {
			if(this.status === 'working'){
				this.request.abort();
				this.setStatus('abort');
			}
		},
		send: function(p_data, p_method, p_url){
			if(this.status != 'working'){
				var dataToSend = {
					url: p_url || this.url,
					dataType: 'json',
					type: p_method || this.method,
					data: p_data,
					error: delegate(this._onComplete, this),
					success: delegate(this._onComplete, this)
				};
				this.request = $.ajax(dataToSend);
				this.setStatus('working', dataToSend);
			}
		},
		setStatus: function(p_status, p_data) {
			this.status = p_status;
			this.evt.trigger('status', {status: this.status, data: p_data});
		},
		dispose: function() {
			this.evt.unbind();
		}
	};
	scope.AjaxService = AjaxService;
})(
	jsStuff.services,
	jQuery,
	jsStuff.utils.delegate,
	jsStuff.events.EventManager,
	jsStuff.utils.delegate(jsStuff.utils.ObjectUtil.replaceStringRecursive, jsStuff.utils.ObjectUtil)
);
