/**
 * Created by JJ on 16/7/26.
 */

var { NativeModules } = require('react-native');
var JJRNBLogModule = NativeModules.JJRNBLogModule;

export function jj_log(message) {
    if (__DEV__)
    {
        console.log(message)
    }
    JJRNBLogModule.jjLogFromJS(message)
}