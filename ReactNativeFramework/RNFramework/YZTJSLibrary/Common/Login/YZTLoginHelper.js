/**
 * Created by hamilyjing on 7/31/16.
 */

import { NativeModules } from 'react-native'

const yztRNBLogin = NativeModules.YZTRNBLogin;

class YZTLoginHelper
{
    static serverForceLogout(resultStatus)
    {
        yztRNBLogin.serverForceLogout(resultStatus)
    }
}

export default YZTLoginHelper
