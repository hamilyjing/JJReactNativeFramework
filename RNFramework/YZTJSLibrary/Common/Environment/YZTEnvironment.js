/**
 * Created by JJ on 16/8/1.
 */

import YztFn from '../../../../yzt-react-base/yzt/p.yzt.base.js'
import Development1 from './Config/Development1'
import Development2 from './Config/Development2'
import Development3 from './Config/Development3'
import Development4 from './Config/Development4'
import Development5 from './Config/Development5'
import PreProduct from './Config/PreProduct'
import Product from './Config/Product'

const Yzt = new YztFn()
const PLIST_PARAMS = Yzt.getPlist()
const GPParameters = Yzt.getGPParams()

let instance;

class YZTEnvironment
{
    urlModel = PLIST_PARAMS
    commonGPParameters = GPParameters

    static sharedInstance()
    {
        if ('undefined' === typeof(instance))
        {
            instance = new YZTEnvironment();
        }
        return instance;
    }

    resetEnvironment(env)
    {
        let urlJsonString = '{}'

        if ('Development1' == env)
        {
            urlJsonString = Development1.jsonString()
        }
        else if ('Development2' == env)
        {
            urlJsonString = Development2.jsonString()
        }
        else if ('Development3' == env)
        {
            urlJsonString = Development3.jsonString()
        }
        else if ('Development4' == env)
        {
            urlJsonString = Development4.jsonString()
        }
        else if ('Development5' == env)
        {
            urlJsonString = Development5.jsonString()
        }
        else if ('PreProduct' == env)
        {
            urlJsonString = PreProduct.jsonString()
        }
        else if ('Product' == env)
        {
            urlJsonString = Product.jsonString()
        }

        this.urlModel = JSON.parse(urlJsonString)
    }
}

export default YZTEnvironment
