/**
 * Created by JJ on 16/7/26.
 */

import YZTLoginHelper from '../../YZTJSLibrary/Common/Login/YZTLoginHelper'

let instance;

class YZTLoginService
{
    static sharedInstance()
    {
        if ('undefined' === typeof(instance))
        {
            instance = new YZTLoginService();
        }
        return instance;
    }

    serverForceLogout(resultStatus)
    {
        YZTLoginHelper.serverForceLogout(resultStatus)
    }
}

export default YZTLoginService
