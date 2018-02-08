/**
 * Created by JJ on 16/8/1.
 */

class JJRegExp
{
    static isEmail(text)
    {
        const reg = /^(?:\w+\.?)*\w+@(?:\w+\.?)*\w+$/
        return reg.test(text);
    }
}

export default JJRegExp
