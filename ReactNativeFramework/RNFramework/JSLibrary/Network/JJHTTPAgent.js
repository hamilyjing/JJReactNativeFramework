/**
 * Created by JJ on 16/7/20.
 */

import JJHTTPRequest, {JJ_REQUEST_METHOD_TYPE_GET, JJ_REQUEST_METHOD_TYPE_POST} from './JJHTTPRequest';
import {jj_httpPost, jj_httpGet, jj_toQueryString} from './JJHTTPTool';

let instance;

class JJHTTPAgent
{
    requestList = [];

    static sharedInstance()
    {
        if ('undefined' === typeof(instance))
        {
            instance = new JJHTTPAgent();
        }
        return instance;
    }

    start(request)
    {
        const url = request.buildRequestUrl();
        const parameter = request.getRequestArgument();

        if (JJ_REQUEST_METHOD_TYPE_POST === request.getRequestMethodType())
        {
            jj_httpPost(url, parameter)
                .then((responseString) =>
                {
                    console.log('7777777&&&&&&&&&&&&&&&')

                    this.handleNetworkSuccessRequestResult(request, responseString);
                }, ((error) =>
                {
                    console.log('88888888&&&&&&&&&&&&&&&', error)

                    this.handleNetworkFailRequestResult(request, error);
                }))
                .catch((error) =>
                {
                    console.log('999999&&&&&&&&&&&&&&&', error)
                    this.handleNetworkFailRequestResult(request, error);
                });
        }
        else if (JJ_REQUEST_METHOD_TYPE_GET === request.getRequestMethodType())
        {
            jj_httpGet(url, parameter)
                .then((responseString) =>
                {
                    this.handleNetworkSuccessRequestResult(request, responseString);
                }, ((error) =>
                {
                    this.handleNetworkFailRequestResult(request, error);
                }))
                .catch((error) =>
                {
                    this.handleNetworkFailRequestResult(request, error);
                });
        }
        else
        {
            return false;
        }

        this.addRequest(request);

        return true;
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

        const value = request.requestFailedFilter(error);
        request.networkFailCallBack(false, value, request.getOtherInfo());

        this.removeRequest(request);
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
