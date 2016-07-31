/**
 * Created by JJ on 16/7/26.
 */

var { NativeModules } = require('react-native');
var JJRNBLog = NativeModules.JJRNBLog;

export function jj_log(message) {
    if (__DEV__)
    {
        console.log(message)
    }
    //JJRNBLog.jjLog(message)
}
