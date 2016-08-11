/**
 * Created by JJ on 16/7/20.
 */

import JJHTTPAgent from './JJHTTPAgent';
import Store from '../Storage/JJFileCache';

const { Cache } = Store;

export const JJ_REQUEST_METHOD_TYPE_GET = 'get';
export const JJ_REQUEST_METHOD_TYPE_POST = 'post';
//export const JJ_REQUEST_METHOD_TYPE_HEAD = 'head';
//export const JJ_REQUEST_METHOD_TYPE_PUT = 'put';
//export const JJ_REQUEST_METHOD_TYPE_DELETE = 'delete';
//export const JJ_REQUEST_METHOD_TYPE_PATCH = 'patch';

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

    getBaseUrl()
    {
        return this.baseUrl;
    }

    getRequestUrl()
    {
        return this.requestUrl;
    }

    getRequestArgument()
    {
        return this.requestArgument;
    }

    getRequestMethodType()
    {
        return this.requestMethodType;
    }

    getOtherInfo()
    {
        return this.otherInfo;
    }

    getIsSaveToDisk()
    {
        return this.isSaveToDisk;
    }

    doBeforeAnyAction()
    {
        return Promise.resolve()
    }

    start(networkSuccessCallBack, networkFailCallBack)
    {
        this.networkSuccessCallBack = networkSuccessCallBack;
        this.networkFailCallBack = networkFailCallBack;

        this.doBeforeAnyAction().then(() =>
        {
            JJHTTPAgent.sharedInstance().start(this);
        })
    }

    stop()
    {
        JJHTTPAgent.sharedInstance().stop(this);
    }

    filterResponse(response)
    {
        return response
    }

    requestCompleteFilter(response)
    {
        if (!this.getIsSaveToDisk())
        {
            return Promise.resolve(response);
        }

        if (!this.successForBusiness(response))
        {
            return Promise.resolve(response);
        }

        return new Promise((resolve, reject)=>
        {
            this.obtainCache().then((cacheObj) =>
            {
                let obj;
                if (null == cacheObj)
                {
                    this.saveObjectToCache(response);
                    resolve(response);
                }
                else
                {
                    obj = this.operate(response, cacheObj);
                    this.saveObjectToCache(obj);
                    resolve(obj);
                }
            })
        })
    }

    requestFailedFilter(error)
    {
        return Promise.resolve(error);
    }

    successForBusiness(response)
    {
        return false;
    }

    buildRequestUrl()
    {
        return this.getBaseUrl() + this.getRequestUrl();
    }

    operate(newObj, oldObj)
    {
        return newObj;
    }

    // cache

    getCacheKey()
    {
        let key = this.buildRequestUrl() + JSON.stringify(this.getRequestArgument()) + this.getRequestMethodType();
        key = md5(key);
        return key;
    }

    obtainCache()
    {
        return new Promise((resolve, reject)=>
        {
            this.doBeforeAnyAction().then(() =>
            {
                resolve(Cache.get(this.getCacheKey()));
            });
        });
    }

    saveObjectToCache(obj)
    {
        this.doBeforeAnyAction().then(() =>
        {
            Cache.set(this.getCacheKey(), obj);
        });
    }

    removeCache()
    {
        this.doBeforeAnyAction().then(() =>
        {
            Cache.remove(this.getCacheKey());
        });
    }
}

export default JJHTTPRequest;
