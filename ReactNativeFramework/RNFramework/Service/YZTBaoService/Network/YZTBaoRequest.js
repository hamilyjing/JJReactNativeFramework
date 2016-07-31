/**
 * Created by JJ on 16/7/20.
 */

import YZTGPRequest from '../../Tool/YZTGPRequest';

class YZTBaoRequest extends YZTGPRequest
{
    constructor(operationType, parameters, isSaveToDisk)
    {
        super(operationType, parameters, isSaveToDisk)

        this.serviceName = 'YZTBaoService'
    }
}

export default YZTBaoRequest;
