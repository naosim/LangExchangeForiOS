/**
* iPhone用言語ファイルの内容を並び替える
* otherLangの内容をoriginalLang内の並び順に合うように並び替えて出力する
* 以下の場合、error配列にErrorオブジェクトを追加する
* - orignalLangにあるKeyValueがotherLangに無い場合
* - otherLangにあるKeyValueがorignalLangに無い場合
*/
var exchange = function(originalLang, otherLang, error) {
	if(error == null) error = [];
	
	var originalLangLines = originalLang.split('\n');
	var otherLangDict = createLangDict(otherLang);
	var result = '';
	for(var i = 0; i < originalLangLines.length; i++) result += createLine(originalLangLines[i], otherLangDict, error) + '\n';

	addNoUsedValue(otherLangDict, error);
	return result;
};

var isLangLine = function(line) {
	// Key-Valueの部分はダブルクオーテで始まってる
	return line.trim().indexOf('"') == 0;
};

var getKey = function(line) {
	return line.split('"')[1];
};

var getValue = function(line) {
	var splited = line.split('"');
	var result = '';
	for(var i = 3; i < splited.length - 1; i++) {
		if(i != 3) result += '"';
		result += splited[i];
	}
	return result;
};

var createLine = function(originalLine, otherLangDict, error) {
	if(!isLangLine(originalLine)) return originalLine;

	var key = getKey(originalLine);
	var value = otherLangDict[key];
	if(value == null) {
		value = '!!! null !!!';
		error.push(new Error('(2)に ' + key + ' がありません'));
	} else {
		// もう使わないから消す
		delete otherLangDict[key];
	}
	return '"' + key + '" = "' + value + '";';
};

var createLangDict = function(lang) {
	var lines = lang.split('\n');
	var result = {};
	for(var i = 0; i < lines.length; i++) {
		var line = lines[i];
		if(!isLangLine(line)) continue;
		result[getKey(line)] = getValue(line);
	}
	return result;
};

var addNoUsedValue = function(langDict, error) {
	for(key in langDict) error.push(new Error('(1)に ' + key + ' がありません'));
};

// node.js用
try{
	exports.exchange = exchange;
}catch(e){};
