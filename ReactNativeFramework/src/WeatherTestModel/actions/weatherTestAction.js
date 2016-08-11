/**
 * Created by JJ on 16/8/11.
 */

import WeatherTestService from '../../Service/WeatherTestService/WeatherTestService'
import WeatherTestConstants from '../constants'

export function weatherTestAction(type, obj)
{
    return {
        type,
        obj
    }
}

export function requestWeather()
{
    return (dispatch) =>
    {
        WeatherTestService.requestWeather(((businessSuccess, response, otherInfo) =>
        {
            if (businessSuccess)
            {
                dispatch(weatherTestAction(WeatherTestConstants.generateActionType(otherInfo.operationType), {accountDetail: response.result.accountDetail,
                    fundIncomeDetail: response.result.fundIncomeDetail}));
            }
        }), ((error, otherInfo) =>
        {
        }));
    }
}
