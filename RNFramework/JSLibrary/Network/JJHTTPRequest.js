/**
 * Created by JJ on 16/7/20.
 */

import {jj_httpPost, jj_httpGet, jj_toQueryString} from './JJHTTPTool';
import JJHTTPAgent from './JJHTTPAgent';
import {jj_obtainFileCache, jj_saveFileCache, jj_removeFileCache} from '../Storage/JJFileCache';

export const JJ_REQUEST_METHOD_TYPE_GET = 'get';
export const JJ_REQUEST_METHOD_TYPE_POST = 'post';
export const JJ_REQUEST_METHOD_TYPE_HEAD = 'head';
export const JJ_REQUEST_METHOD_TYPE_PUT = 'put';
export const JJ_REQUEST_METHOD_TYPE_DELETE = 'delete';
export const JJ_REQUEST_METHOD_TYPE_PATCH = 'patch';

class JJHTTPRequest
{
    baseUrl = '';
    requestUrl = '';
    requestArgument = '';
    requestMethodType = JJ_REQUEST_METHOD_TYPE_POST;

    otherInfo;

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

    getIsStop()
    {
        return this.isStop;
    }

    getOtherInfo()
    {
        return this.otherInfo;
    }

    getIsSaveToDisk()
    {
        return this.isSaveToDisk;
    }

    start(networkSuccessCallBack, networkFailCallBack)
    {
        this.networkSuccessCallBack = networkSuccessCallBack;
        this.networkFailCallBack = networkFailCallBack;

        return JJHTTPAgent.sharedInstance().start(this);

        /*
        const url = this.buildRequestUrl();
        const parameter = this.getRequestArgument();

        if (JJ_REQUEST_METHOD_TYPE_POST === this.getRequestMethodType())
        {
            jj_httpPost(url, parameter)
                .then((response) =>
                {
                    var filterResponse = this.filterResponse(response);
                    const value = this.requestCompleteFilter(filterResponse);
                    networkSuccessCallBack(this.successForBusiness(filterResponse), value, this.getOtherInfo());
                })
                .catch((error) =>
                {
                    const value = this.requestFailedFilter(error);
                    networkFailCallBack(false, value, this.getOtherInfo());
                });
        }
        else if (JJ_REQUEST_METHOD_TYPE_GET === this.getRequestMethodType())
        {
            jj_httpGet(url, parameter)
                .then((response) =>
                {
                    var filterResponse = this.filterResponse(response);
                    const value = this.requestCompleteFilter(filterResponse);
                    networkSuccessCallBack(this.successForBusiness(filterResponse), value, this.getOtherInfo());
                })
                .catch((error) =>
                {
                    const value = this.requestFailedFilter(error);
                    networkFailCallBack(false, value, this.getOtherInfo());
                });
        }
        else
        {
            networkSuccessCallBack(null, this.getOtherInfo());
            return false;
        }

        return true;
        */
    }

    stop()
    {
        JJHTTPAgent.sharedInstance().stop(this);
    }

    filterResponse(response)
    {
        let obj = JSON.parse(response._bodyText);

        if ('undefined' === typeof(obj))
        {
            return response;
        }

        return obj;
    }

    requestCompleteFilter(response)
    {
        if (!this.getIsSaveToDisk())
        {
            return Promise.resolve(response)
        }

        if (!this.successForBusiness(response))
        {
            return Promise.resolve(response)
        }

        return new Promise((resolve, reject)=>
        {
            this.obtainCache().then((cacheObj) =>
            {
                let obj
                if (null == cacheObj)
                {
                    this.saveObjectToCache(response)
                    resolve(response)
                }
                else
                {
                    obj = this.operate(response, cacheObj)
                    this.saveObjectToCache(obj)

                    resolve(obj)
                }
            })
        })
    }

    requestFailedFilter(error)
    {
        return error;
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
        return jj_obtainFileCache(this.getCacheKey());
    }

    saveObjectToCache(obj)
    {
        return jj_saveFileCache(this.getCacheKey(), obj);
    }

    removeCache()
    {
        return jj_removeFileCache(this.getCacheKey());
    }
}

export default JJHTTPRequest;
