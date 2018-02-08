/**
 * Created by JJ on 16/7/21.
 */

import CacheStore from 'react-native-cache-store'

class JJFileCache
{
    static get(key)
    {
        return CacheStore.get(key)
    }

    static set(key, value, time)
    {
        return CacheStore.set(key, value, time)
    }

    static remove(key)
    {
        return CacheStore.remove(key)
    }
}

export default JJFileCache
