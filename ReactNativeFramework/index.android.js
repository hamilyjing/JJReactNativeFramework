/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  NativeModules
} from 'react-native';

var obj = NativeModules.AA

class AwesomeProject extends Component {
  componentWillMount() {
    /*
    //开始加载数据
    fetch('http://apis.baidu.com/showapi_open_bus/weather_showapi/areaid')
        .then((response) => response.json())
        .then((responseJson) => {
          alert(responseJson.errMsg);
        }).done();
        */
  }
  componentDidMount()
  {
    //obj.callBack((msg) => {alert(msg);})
    //obj.show();
    //alert('2222222');
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.onPress}>
        	<Text style={{fontSize:30,color:'#000'}}>2015</Text>
        </TouchableHighlight>
      </View>


/*
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Shake or press menu button for dev menu
        </Text>
        <TouchableHighlight onPress={this.onPress}>
        	<Text style={{fontSize:30,color:'#000'}}>2015</Text>
        </TouchableHighlight>
      </View>
      */
    );
  }

  onPress()
  {
    //alert('123456');
	//obj.callBack('123', null); // callback 不能为null
    obj.callBack('123', (text) => {
      alert(text);
    });
    // obj.processString('123', (text) => {
//       alert(text);
//     });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
