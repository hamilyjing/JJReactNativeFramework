/**
 * Created by JJ on 16/8/11.
 */

export default class WeatherTestConstants
{
    static actionTypePrefix = "WeatherTest_";

    static generateActionType(type)
    {
        return WeatherTestConstants.actionTypePrefix + type
    }
}
