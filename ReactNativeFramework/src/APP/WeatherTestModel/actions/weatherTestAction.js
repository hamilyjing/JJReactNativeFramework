/**
 * Created by JJ on 16/8/11.
 */

import WeatherTestService from '../../../Service/WeatherTestService/WeatherTestService'
import WeatherTestConstants from '../constants'

export function weatherTestAction(type, obj)
{
    return {
        type,
        obj
    }
}

let counter = 1;

export function requestWeather()
{
    return (dispatch) =>
    {
        WeatherTestService.requestWeather(((businessSuccess, response, otherInfo) =>
        {
            if (businessSuccess)
            {
                dispatch(weatherTestAction(WeatherTestConstants.generateActionType(otherInfo.operationType), {errMsg: response.errMsg + " " + counter}));
                ++counter
            }
        }), ((error, otherInfo) =>
        {
        }));
    }
}
