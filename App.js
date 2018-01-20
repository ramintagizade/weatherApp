import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground
}  from 'react-native';

var Forecast = require('./Forecast');

class App extends React.Component {
  constructor(props){
    super();
    this.state = {
      zip:'',
      forecast:null
    }
   }
   componentDidUpdate(prevProps, prevState) {
    if (this.state.forecast) {
      alert("ok changed") 
    }
  }
  _handleTextChange(event){
    var zip = event.nativeEvent.text;
    //this.setState({zip: zip});
    fetch('http://api.openweathermap.org/data/2.5/weather?zip='+zip+'&appid=61580f968a4fa95e2ba03521748b9dad')
    .then((response) => response.json()).then((responseJSON) => {
      //alert(responseJSON.main.temp);
      this.setState({
        forecast:{
          main:responseJSON.weather[0].main,
          description:responseJSON.weather[0].description,
          temp:responseJSON.main.temp
        }
      });
    })
    .catch((error) => {
      console.warn(error);
    });
  }
  render () {
    var content = null;
    if(this.state.forecast !== null) {
      content = <Forecast main={this.state.forecast.main}
      description={this.state.forecast.description}
      temp = {this.state.forecast.temp}
      />
    }
    return (
    <View style={styles.container}>
      <ImageBackground source={{uri: 'https://static1.squarespace.com/static/52c2a5d1e4b09136f70246a3/t/59836e03e3df28da05331294/1501785623299/'}}
        resizeMode='cover'
        style={styles.backdrop}>
        <View style={styles.overlay}>
          <View style={styles.row}>
          <Text style={styles.mainText}>
            Current weather for
          </Text>
          <View style={styles.zipContainer}>
            <TextInput
              style={[styles.zipCode, styles.mainText]}
              returnKeyType='go'
              onSubmitEditing={this._handleTextChange}/>
            </View>
          </View>
          {content}
        </View>
      </ImageBackground>
    </View>
  )
  }
}
export default App;

const baseFontSize = 16;
const styles = StyleSheet.create({
  container : {
    flex:1,
    alignItems:'center',
    paddingTop:30,
  },
  backdrop : {
    flex:1,
    flexDirection:'column',
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  overlay : {
    paddingTop:5,
    backgroundColor:'#000000',
    opacity:0.5,
    flexDirection:'column',
    alignItems:'center'
  },
  row : {
    flex:1,
    flexDirection:'row',
    flexWrap:'nowrap',
    alignItems:'flex-start',
    padding:30
  },
  zipContainer : {
    flex:1,
    borderBottomColor:'#DDDDDD',
    borderBottomWidth:1,
    marginLeft:5,
    marginTop:3
  },
  zipCode : {
    width:50,
    height:baseFontSize,
    color:'white'
  },
  mainText : {
    flex:1,
    fontSize:baseFontSize,
    color:'red',
  }
}); 