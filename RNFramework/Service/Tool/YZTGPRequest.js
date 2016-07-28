/**
 * Created by JJ on 16/7/20.
 */

import JJHTTPRequest from '../../JSLibrary/Network/JJHTTPRequest';
import YztFn from '../../../yzt-react-base/yzt/p.yzt.base.js'
import md5 from 'md5';

const Yzt = new YztFn();
let PLIST_PARAMS = Yzt.getPlist();

const YZT_ALL_ACCOUNT_CACHE_KEY = 'AllAccount';

class YZTGPRequest extends JJHTTPRequest
{
    operationType = '';
    parameters = {};

    serviceName = '';
    sensitiveDataForCacheKey = Yzt.getGPParams().appClientId;
    parametersForCacheKey = '[none]';

    constructor(operationType, parameters, isSaveToDisk)
    {
        super()

        this.operationType = operationType
        this.parameters = parameters
        this.isSaveToDisk = isSaveToDisk
    }

    // overwrite

    getBaseUrl()
    {
        return PLIST_PARAMS.SERVER_BASE_URL_TOA;
    }

    getRequestUrl()
    {
        return PLIST_PARAMS.GATEWAY_FULL_URL;
    }

    getRequestArgument()
    {
        const commonParams = this._commonParameter();
        let requestData = [commonParams];
        if (this.parameters !== '')
        {
            requestData = [commonParams, this.parameters];
        }

        return {
            operationType: this.operationType,
            requestData: JSON.stringify(requestData)};
    }

    successForBusiness(response)
    {
        return 1000 === response.resultStatus;
    }

    getCacheKey()
    {
        const spaceMark = '_';

        let key = this.serviceName + spaceMark;

        if (0 == this.sensitiveDataForCacheKey.length)
        {
            key = key + YZT_ALL_ACCOUNT_CACHE_KEY + spaceMark;
        }
        else
        {
            key = key + this.sensitiveDataForCacheKey + spaceMark;
        }

        key = key + this.operationType + spaceMark;

        if ('[none]' === this.parametersForCacheKey)
        {
            key = key + md5(JSON.stringify(this.parameters));
        }
        else
        {
            key = key + md5(this.parametersForCacheKey);
        }

        return key;
    }

    // private

    _commonParameter()
    {
        return Yzt.getGPParams();
    }
}

export default YZTGPRequest;
