/**
 * Created by JJ on 16/7/21.
 */

import CacheStore from 'react-native-cache-store';

export function jj_obtainFileCache(key)
{
    return CacheStore.get(key);
}

export function jj_saveFileCache(key, value, time)
{
    return CacheStore.set(key, value, time);
}

export function jj_removeFileCache(key)
{
    return CacheStore.remove(key);
}
