var path = require('path');
var debug = require('./debug');
var appName = require(path.join(process.cwd(), 'package.json')).name;

/** set all output to go via console.info overrides all per-namespace log settings */
debug.log = console.info.bind(console);

/**
 * Builds a console debug object.
 * @param  {String} groupName The application segment to debug
 * @param  {String} refName   The application segment to reference
 * @param  {String} envName   Node environment of when to log the given string
 * @return {String}           debug object with the formatted console log output
 */
module.exports = function(groupName, refName, envName) {
	return debug(getDebugName(groupName, refName, envName));
};

/**
 * Builds a string formatted for the debug module.
 * @param  {String} groupName The application segment to debug
 * @param  {String} refName   The application segment to reference
 * @param  {String} envName   Node environment of when to log the given string
 * @return {String}           Formatted string (app:group:ref) to debug
 */
function getDebugName(groupName, refName, envName) {
	var debugName = appName;
	if (envName)
		debugName += ":" + envName;
	if (groupName)
		debugName += ":" + groupName;
	if (refName)
		debugName += ":" + refName;
	return debugName;
}
