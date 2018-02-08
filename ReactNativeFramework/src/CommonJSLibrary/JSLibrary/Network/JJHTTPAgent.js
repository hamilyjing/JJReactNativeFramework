/**
 * Created by JJ on 16/7/20.
 */

import { JJ_REQUEST_METHOD_TYPE_GET, JJ_REQUEST_METHOD_TYPE_POST } from './JJHTTPRequest';
import JJHTTPTool from './JJHTTPTool';
import JJLog from '../Log/JJLog';
import { NativeModules, Platform } from 'react-native';

let instance;

const LogName = '[JJHTTPAgent]';

class JJHTTPAgent
{
    requestList = [];

    static sharedInstance() {
        if (typeof(instance) === 'undefined') {
            instance = new JJHTTPAgent();
            const str = `${LogName} invoke JJHTTPAgent.sharedInstance()`;
            JJLog.debug(str);
        }
        return instance;
    }

    start(request) {
        const url = request.buildRequestUrl();
        const parameter = request.getRequestArgument();

        if (JJ_REQUEST_METHOD_TYPE_POST === request.getRequestMethodType()) {
            JJHTTPTool.post(url, parameter)
                .then(response => request.filterResponse(response))
                .then((response) => {
                    const str = `${LogName} post response success, response string: \n${JSON.stringify(response)}`;
                    JJLog.debug(str);
                    if (Platform.OS === 'ios') {
                        NativeModules.YZTRNBNetwork.showResponseData({ data: response });
                    }
                    this.handleNetworkSuccessRequestResult(request, response);
                }, ((error) => {
                    const str = `${LogName} post response fail, error: \n${error}`;
                    JJLog.debug(str);
                    this.handleNetworkFailRequestResult(request, error);
                }))
                .catch((error) => {
                    const str = `${LogName} post response abnormally, error: \n${error}`;
                    JJLog.debug(str);
                    this.handleNetworkFailRequestResult(request, error);
                });
        } else if (JJ_REQUEST_METHOD_TYPE_GET === request.getRequestMethodType()) {
            JJHTTPTool.get(url, parameter)
                .then(response => request.filterResponse(response))
                .then((response) => {
                    const str = `${LogName} get response success, response string: \n${JSON.stringify(response)}`;
                    JJLog.debug(str);
                    if (Platform.OS === 'ios') {
                        NativeModules.YZTRNBNetwork.showResponseData({ data: response });
                    }
                    this.handleNetworkSuccessRequestResult(request, response);
                }, ((error) => {
                    const str = `${LogName} get response fail, error: \n${error}`;
                    JJLog.debug(str);
                    this.handleNetworkFailRequestResult(request, error);
                }))
                .catch((error) => {
                    const str = `${LogName} get response abnormally, error: \n${error}`;
                    JJLog.debug(str);
                    this.handleNetworkFailRequestResult(request, error);
                });
        }
        this.addRequest(request);
    }

    stop(request) {
        this.removeRequest(request);
    }

    handleNetworkSuccessRequestResult(request, response) {
        request.cancelTimeoutTimer();

        const index = this.requestList.indexOf(request);
        if (index < 0) {
            return;
        }

        this.removeRequest(request);
        request.requestCompleteFilter(response).then((value) => {
            request.networkSuccessCallBack(request.successForBusiness(response), value, request.getOtherInfo());
        });
    }

    handleNetworkFailRequestResult(request, error) {
        request.cancelTimeoutTimer();

        const index = this.requestList.indexOf(request);
        if (index < 0) {
            return;
        }

        this.removeRequest(request);
        request.requestFailedFilter(error).then(() => {
            request.networkFailCallBack(error, request.getOtherInfo());
        });
    }

    addRequest(request) {
        const index = this.requestList.indexOf(request);
        if (index >= 0) {
            return;
        }
        this.requestList.push(request);
    }

    removeRequest(request) {
        const index = this.requestList.indexOf(request);
        if (index >= 0) {
            this.requestList.splice(index, 1);
        }
    }
}

export default JJHTTPAgent;
