/**
 * Created by JJ on 16/7/20.
 */

import JJHTTPAgent from './JJHTTPAgent';
import Store from '../Storage/JJFileCache';
const { Cache } = Store;
export const JJ_REQUEST_METHOD_TYPE_GET = 'get';
export const JJ_REQUEST_METHOD_TYPE_POST = 'post';
// export const JJ_REQUEST_METHOD_TYPE_HEAD = 'head';
// export const JJ_REQUEST_METHOD_TYPE_PUT = 'put';
// export const JJ_REQUEST_METHOD_TYPE_DELETE = 'delete';
// export const JJ_REQUEST_METHOD_TYPE_PATCH = 'patch';

class JJHTTPRequest
{
    baseUrl = '';
    requestUrl = '';
    requestArgument = '';
    requestMethodType = JJ_REQUEST_METHOD_TYPE_POST;

    otherInfo = {};

    isSaveToDisk = false;

    networkSuccessCallBack;
    networkFailCallBack;

    timeoutInterval = 60 * 1000; // 毫秒

    getBaseUrl() {
        return this.baseUrl;
    }

    getRequestUrl() {
        return this.requestUrl;
    }

    getRequestArgument() {
        return this.requestArgument;
    }

    getRequestMethodType() {
        return this.requestMethodType;
    }

    getOtherInfo() {
        return this.otherInfo;
    }

    getIsSaveToDisk() {
        return this.isSaveToDisk;
    }

    cancelTimeoutTimer() {
        this.timer && clearTimeout(this.timer);
    }

    doBeforeAnyAction() {
        return Promise.resolve();
    }

    start(networkSuccessCallBack, networkFailCallBack) {
        this.networkSuccessCallBack = networkSuccessCallBack;
        this.networkFailCallBack = networkFailCallBack;

        this.doBeforeAnyAction().then(() => {
            JJHTTPAgent.sharedInstance().start(this);
        });

        this.timer = setTimeout(() => {
            this.stop();
            this.networkFailCallBack({message: '操作超时'}, this.getOtherInfo());
        }, this.timeoutInterval);
    }

    stop() {
        this.cancelTimeoutTimer();
        JJHTTPAgent.sharedInstance().stop(this);
    }

    filterResponse(response) {
        return response.json();
    }

    requestCompleteFilter(response) {
        if (!this.getIsSaveToDisk()) {
            return Promise.resolve(response);
        }

        if (!this.successForBusiness(response)) {
            return Promise.resolve(response);
        }

        return new Promise((resolve) => {
            this.obtainCache().then((cacheObj) => {
                let obj;
                if (cacheObj === null) {
                    this.saveObjectToCache(response);
                    resolve(response);
                } else {
                    obj = this.operate(response, cacheObj);
                    this.saveObjectToCache(obj);
                    resolve(obj);
                }
            });
        });
    }

    requestFailedFilter(error) {
        return Promise.resolve(error);
    }

    successForBusiness() {
        return false;
    }

    buildRequestUrl() {
        return this.getBaseUrl() + this.getRequestUrl();
    }

    operate(newObj) {
        return newObj;
    }

    // cache

    getCacheKey() {
        let key = this.buildRequestUrl() + JSON.stringify(this.getRequestArgument()) + this.getRequestMethodType();
        key = md5(key);
        return key;
    }

    obtainCache() {
        return new Promise((resolve) => {
            this.doBeforeAnyAction().then(() => {
                resolve(Cache.get(this.getCacheKey()));
            });
        });
    }

    saveObjectToCache(obj) {
        this.doBeforeAnyAction().then(() => {
            Cache.set(this.getCacheKey(), obj);
        });
    }

    removeCache() {
        this.doBeforeAnyAction().then(() => {
            Cache.remove(this.getCacheKey());
        });
    }
}

export default JJHTTPRequest;
