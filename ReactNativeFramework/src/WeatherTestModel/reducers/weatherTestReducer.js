/**
 * Created by JJ on 16/8/11.
 */

import WeatherTestConstants from '../constants'

const initialState = {
    errMsg: 'no message'
};

export default function weatherTestReducer(state = initialState, action)
{
    const isWeatherTest = (0 == action.type.indexOf(WeatherTestConstants.actionTypePrefix));

    if (!isWeatherTest)
    {
        return state;
    }

    let newState = {...state};

    for (let key in action.obj)
    {
        newState[key] = action.obj[key];
    }

    return newState;
}
