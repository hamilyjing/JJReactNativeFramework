/**
 * Created by JJ on 16/8/11.
 */

import React, { Component } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import WeatherTestMainPage from './containers/WeatherTestMainPage'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);

export default class WeatherTestApp extends Component {
    render() {
        return (
            <Provider store={store}>
                <WeatherTestMainPage />
            </Provider>
        );
    }
}
