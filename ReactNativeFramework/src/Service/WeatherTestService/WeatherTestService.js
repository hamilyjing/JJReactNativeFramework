/**
 * Created by JJ on 16/8/11.
 */

import WeatherTestRequest from './Network/WeatherTestRequest'

const WeatherTestServiceRequestTypeGetWeather = 'GetWeather';

export default class WeatherTestService
{
    static requestWeather(networkSuccessCallBack, networkFailCallBack)
    {
        const request = new WeatherTestRequest(WeatherTestServiceRequestTypeGetWeather, {}, false);
        request.start(networkSuccessCallBack, networkFailCallBack)
    }
}
