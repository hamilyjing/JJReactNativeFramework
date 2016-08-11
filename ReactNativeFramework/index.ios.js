/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

var MOCKED_MOVIES_DATA = [
  {title: 'Title', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];

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

import Log from './Log'

var obj = NativeModules.AwesomeProject1
//var obj1 = NativeModules.AwesomeProject1

class AwesomeProject extends Component {
  componentWillMount() {
    // alert('111111111');
    // //开始加载数据
    // fetch('http://apis.baidu.com/showapi_open_bus/weather_showapi/areaid')
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //       alert(responseJson.errMsg);
    //     }).done();
  }
  render() {
    var movie = MOCKED_MOVIES_DATA[0];
    return (
      <View style={styles.container}>
        <Text>{movie.title}</Text>
        <Text>{movie.year}</Text>
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

    alert(obj.aaa)
      //alert(this.props)
      //alert(this.props.aa);
    //Log.log();
	//obj.processString('123', null); // callback 不能为null
    // obj.processString('123', (text) => {
     //  alert(text);
    // });
    // obj.processString('123', (text) => {
     //  alert(text);
    // });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
