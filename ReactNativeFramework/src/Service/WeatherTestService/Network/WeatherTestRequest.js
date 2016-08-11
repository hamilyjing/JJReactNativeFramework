/**
 * Created by JJ on 16/8/11.
 */

import JJHTTPRequest from '../../../RNFramework/JSLibrary/Network/JJHTTPRequest'

export default class WeatherTestRequest extends JJHTTPRequest
{
    operationType = '';
    parameters = {};

    constructor(operationType, parameters, isSaveToDisk)
    {
        super();

        this.operationType = operationType;
        this.parameters = parameters;
        this.isSaveToDisk = isSaveToDisk;
        this.otherInfo = { operationType };
    }

    getBaseUrl()
    {
        return 'http://apis.baidu.com/showapi_open_bus/weather_showapi/areaid'
    }

    successForBusiness(response)
    {
        return true;
    }
}
