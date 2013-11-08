function getMatchingTriggerType(triggertype){
	return GLOBAL.configs.filter(function(x) { return x.triggertype.toLowerCase().indexOf(triggertype) != -1; });
}
exports.getMatchingTriggerType = getMatchingTriggerType;

function checkNested(obj /*, level1, level2, ... levelN*/) {
  var args = Array.prototype.slice.call(arguments),
      obj = args.shift();

  for (var i = 0; i < args.length; i++) {
    if (!obj.hasOwnProperty(args[i])) {
      return false;
    }
    obj = obj[args[i]];
  }
  return true;
}
exports.checkNested = checkNested;
