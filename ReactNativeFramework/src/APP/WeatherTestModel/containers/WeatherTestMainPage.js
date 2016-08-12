/**
 * Created by JJ on 16/8/11.
 */

import React, {
    AppRegistry,
    Image,
    Component,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    NativeModules
} from 'react-native';
import actions from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

var MOCKED_MOVIES_DATA = [
    {title: 'request result', year: 'Press me to get weather', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];

class WeatherTestMainPage extends Component
{
    constructor(props) {
        super(props);

        this.onPress = this.onPress.bind(this);
    }

    render() {
        var movie = MOCKED_MOVIES_DATA[0];
        return (
            <View style={styles.container}>
                <Text>{movie.title}</Text>
                <Text>{this.props.errMsg}</Text>
                <TouchableHighlight onPress={this.onPress}>
                    <Text style={{fontSize:30,color:'#000'}}>{movie.year}</Text>
                </TouchableHighlight>
                <Image
                    source={{uri: movie.posters.thumbnail}}
                    style={styles.thumbnail}/>
            </View>
        );
    }

    onPress()
    {
        this.props.actions.requestWeather()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    thumbnail: {
        width: 53,
        height: 81
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});

export default connect(state => ({
    errMsg: state.weatherTestReducer.errMsg
}), dispatch => ({
    actions: bindActionCreators(actions, dispatch)
}))(WeatherTestMainPage);
