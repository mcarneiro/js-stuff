if(!window.jsStuff){ var jsStuff = {data:{}}; }
if(!jsStuff.data){ jsStuff.data = {}; }

;(function(scope) {

	var TableArray = function(p_cols, p_data) {
			this.cols = p_cols;
			this.data = p_data || [];

			this.update();
		},
		
		// privates
		_getMissingItems = function(p_len, p_cols) {
			if(p_len === 0){ return p_cols; }
			return (Math.ceil(p_len / p_cols) * p_cols) - p_len;
		};
		
	TableArray.prototype = {
		cols: 0,
		rows: 0,
		data: [],
		length: 0,
		_getItemIndex: function(p_at) {
			if(p_at && p_at[0] < this.cols && p_at[1] < this.rows){
				return p_at[1] * this.cols + p_at[0];
			}
			return -1;
		},
		_getRowIndex: function(p_at) {
			return p_at < this.rows ? p_at * this.cols : -1;
		},
		/**
		 * Atualiza os dados da tabela (length, quantidade de colunas)
		 */
		update: function() {
			var len = this.data.length;
			this.length = len + _getMissingItems(len, this.cols);
			this.rows = this.length / this.cols;
		},
		/**
		 * Adiciona uma linha ou um item a tabela
		 * @param p_data {Array}
		 * @param p_type {String}
		 */
		add: function(p_data, p_type, p_at) { // LATER: add AT index
			switch(p_type){
				case "col":
					var data = [],
						line = null;
					p_at = isNaN(p_at) ? this.cols : p_at;
					for(var i=0, len=this.rows; i < len; i++){
						line = this.getRow(i);
						data = data.concat(line.slice(0, p_at).concat([p_data[i]]).concat(line.slice(p_at)));
					}
					this.cols++;
					this.data = data;
					break;
				case "row":
					p_at = isNaN(p_at) ? this.rows : p_at;
					var index = p_at * this.cols;
					this.data = this.data
						.slice(0, index)
						.concat(p_data.concat(new Array(_getMissingItems(p_data.length, this.cols))))
						.concat(this.data.slice(index));
					break;
				case "item":
				default:
					this.data.push(p_data);
					break;
			}
			this.update();
		},
		/**
		 * Remove uma linha ou um item a tabela
		 * @param p_at {int}
		 * @param p_type {String}
		 */
		remove: function(p_at, p_type) {
			var i, index, from;
			switch(p_type){
				case "item":
					if((index = this._getItemIndex(p_at)) >= 0){
						this.data.splice(index, 1, undefined);
					}
					break;
				case "col":
					if((index = this._getItemIndex([p_at, 0])) >= 0){
						index = 0;
						for(i=0, len=this.rows; i < len; i++){
							index = this._getItemIndex([p_at, i]);
							this.data.splice(index, 1, '--to-remove--');
						}
						this.cols--;
						for(i=this.data.length; i >= 0; i--){
							if(this.data[i] === '--to-remove--'){
								this.data.splice(i, 1);
							}
						}
					}
					break;
				case "row":
				default:
					if((from = this._getRowIndex(p_at)) >= 0){
						this.data.splice(from, from + this.cols);
					}
					break;
			}
			this.update();
		},
		/**
		 * Retorna linha
		 * @param p_row {Number} index da linha
		 * @return {Array} conteudo da linha
		 */
		getRow: function(p_row) {
			var from = this._getRowIndex(p_row);
			return from >= 0 ? this.data.slice(from, from+this.cols) : null;
		},
		/**
		 * Retorna um item
		 * @param p_row {Number} linha
		 * @param p_col {Number} coluna
		 * @return {Object} conteudo daquela 'celula'
		 */
		getItem: function(p_row, p_col) {
			var index = this._getItemIndex([p_row, p_col]);
			return index >= 0 ? this.data[index] : null;
		},
		// LATER: getRange{p_from[x,y], p_to[x,y]}
		toString: function() {
			var str = [], item;
			for(var i=0, len=this.length; i < len; i++){
				if(i){ str.push(i%this.cols ? '\t' : '\n'); }
				item = this.data[i] != undefined ? this.data[i] : 'null';
				str.push(item);
			}
			return str.join('');
		}
	};
	
	scope.TableArray = TableArray;
	
})(jsStuff.data);