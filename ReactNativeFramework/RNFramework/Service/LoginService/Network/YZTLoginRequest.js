/**
 * Created by JJ on 16/8/1.
 */

import YZTGPRequest from '../../Tool/YZTGPRequest';

class YZTLoginRequest extends YZTGPRequest
{
    constructor(operationType, parameters, isSaveToDisk)
    {
        super(operationType, parameters, isSaveToDisk)

        this.serviceName = 'YZTLoginService'
    }
}

export default YZTLoginRequest;
