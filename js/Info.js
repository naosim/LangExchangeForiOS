// スクリプトの情報表示をするクラス
var Info = function(keys, message) {
	this.keys = keys;
	this.message = message;
	this._isHit = function(val) {
		if(!val) val = process.argv[2];
		for(var i = 0; i < this.keys.length; i++) if(val == this.keys[i])return true;
		return false;
	};
	this.output = function() {
		if(this._isHit()) {
			console.error(this.message);
			return true;
		}
		return false;
	};
};

var printErrors = function(errors) {
	if(errors.length <= 0) return false;
	for(var i = 0; i < errors.length; i++) console.log('error: ' + errors[i].message);
	return true;
};

exports.Info = Info;
exports.printErrors = printErrors;