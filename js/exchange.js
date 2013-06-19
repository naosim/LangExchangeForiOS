var fs = require('fs');
var func = require('./LangExchangeForiOS.js');
var lib = require('./Info.js');

// ヘルプを表示
var helpMessage = '';
helpMessage += 'usage: node exchange.js original.strings target.strings output.strings\n';
helpMessage += 'Print to command line if you dont set "output.strings" param';
var help = new lib.Info(['--help', '-h'], helpMessage);
if(help.output()) return;

// バージョン情報
var ver = new lib.Info(['--version', '-v'], 'exchange.js 1.0');
if(ver.output()) return;

var originalLang = fs.readFileSync(process.argv[2], "utf-8");
var otherLang = fs.readFileSync(process.argv[3], "utf-8");
var outputFileName = process.argv[4];

var error = [];
var result = func.exchange(originalLang, otherLang, error);
if(!lib.printErrors(error)) {
	if(outputFileName) fs.writeFileSync(outputFileName, result);
	else console.log(result);
}
