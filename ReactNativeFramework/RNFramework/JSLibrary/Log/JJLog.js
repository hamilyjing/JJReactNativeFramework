/**
 * Created by JJ on 16/7/26.
 */

import { NativeModules } from 'react-native'

const jjRNBLog = NativeModules.JJRNBLog;

class JJLog
{
    static debug(message)
    {
        if (__DEV__)
        {
            console.log(message);
            jjRNBLog.debug(message)
        }
    }
}

export default JJLog
