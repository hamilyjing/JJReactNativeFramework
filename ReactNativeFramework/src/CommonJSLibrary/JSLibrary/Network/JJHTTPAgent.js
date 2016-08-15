/**
 * Created by JJ on 16/7/20.
 */

import JJHTTPRequest, {JJ_REQUEST_METHOD_TYPE_GET, JJ_REQUEST_METHOD_TYPE_POST} from './JJHTTPRequest';
import JJHTTPTool from './JJHTTPTool';
import JJLog from '../Log/JJLog'

let instance;

const LogName = '[JJHTTPAgent]';

class JJHTTPAgent
{
    requestList = [];

    static sharedInstance()
    {
        if ('undefined' === typeof(instance))
        {
            instance = new JJHTTPAgent();

            JJLog.debug(LogName + ' invoke JJHTTPAgent.sharedInstance()');
        }
        return instance;
    }

    start(request)
    {
        const url = request.buildRequestUrl();
        const parameter = request.getRequestArgument();

        if (JJ_REQUEST_METHOD_TYPE_POST === request.getRequestMethodType())
        {
            JJHTTPTool.post(url, parameter)
                .then(response => response.json())
                .then((responseString) =>
                {
                    JJLog.debug(LogName + ' post response success, response string: \n' + JSON.stringify(responseString));

                    this.handleNetworkSuccessRequestResult(request, responseString);
                }, ((error) =>
                {
                    JJLog.debug(LogName + ' post response fail, error: \n' + error);

                    this.handleNetworkFailRequestResult(request, error);
                }))
                .catch((error) =>
                {
                    JJLog.debug(LogName + ' post response abnormally, error: \n' + error);

                    this.handleNetworkFailRequestResult(request, error);
                });
        }
        else if (JJ_REQUEST_METHOD_TYPE_GET === request.getRequestMethodType())
        {
            JJHTTPTool.get(url, parameter)
                .then(response => response.json())
                .then((responseString) =>
                {
                    JJLog.debug(LogName + ' get response success, response string: \n' + JSON.stringify(responseString));

                    this.handleNetworkSuccessRequestResult(request, responseString);
                }, ((error) =>
                {
                    JJLog.debug(LogName + ' get response fail, error: \n' + error);

                    this.handleNetworkFailRequestResult(request, error);
                }))
                .catch((error) =>
                {
                    JJLog.debug(LogName + ' get response abnormally, error: \n' + error);

                    this.handleNetworkFailRequestResult(request, error);
                });
        }

        this.addRequest(request);
    }

    stop(request)
    {
        this.removeRequest(request);
    }

    handleNetworkSuccessRequestResult(request, responseString)
    {
        const index = this.requestList.indexOf(request);
        if (index < 0)
        {
            return;
        }

        this.removeRequest(request);

        const filterResponse = request.filterResponse(responseString);

        request.requestCompleteFilter(filterResponse).then((value) =>
        {
            request.networkSuccessCallBack(request.successForBusiness(filterResponse), value, request.getOtherInfo());
        })
    }

    handleNetworkFailRequestResult(request, error)
    {
        const index = this.requestList.indexOf(request);
        if (index < 0)
        {
            return;
        }

        this.removeRequest(request);

        request.requestFailedFilter(error).then((error) =>
        {
            request.networkFailCallBack(error, request.getOtherInfo());
        });
    }

    addRequest(request)
    {
        const index = this.requestList.indexOf(request);
        if (index >= 0)
        {
            return;
        }

        this.requestList.push(request);
    }

    removeRequest(request)
    {
        const index = this.requestList.indexOf(request);
        if (index >= 0)
        {
            this.requestList.splice(index, 1);
        }
    }
}

export default JJHTTPAgent;
