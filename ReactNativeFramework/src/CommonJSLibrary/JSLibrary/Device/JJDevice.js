/**
 * Created by JJ on 16/8/1.
 */

import { Platform } from 'react-native';

class JJDevice
{
    static isiOS()
    {
        return Platform.OS === 'ios'
    }

    static isAndroid()
    {
        return Platform.OS === 'android'
    }

    static isWeb()
    {
        return Platform.OS === 'web'
    }
}

export default JJDevice
