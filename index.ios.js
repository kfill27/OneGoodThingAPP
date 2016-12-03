/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AlertIOS
} from 'react-native';

let todaysDate = new Date();
const month = todaysDate.getMonth();
const day = todaysDate.getDay();
const year = todaysDate.getFullYear();
todaysDate = `${month}/${day}/${year}`

const REQUEST_URL = "https://onegoodthing-api.herokuapp.com/written_things"

export default class OneGoodThing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      written_things: null,
    }
  }
  
  componentDidMount() {
    this.fetchData();
  }
  
  fetchData() {
    fetch(REQUEST_URL)
    .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          written_things: responseData,
        });
      })
      .done();
  }
  
  render() {
    if (!this.state.written_things) {
      return this.renderLoadingView();
    }

    var written_thing = this.state.written_things[0];
    return this.renderGoodThing(written_thing);
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading good things...
        </Text>
      </View>
    );
  }
  
  renderGoodThing(written_thing) {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Hello, User!
        </Text>
        <Text style={styles.instructions}>
          Today is {todaysDate}
        </Text>
        <Text style={styles.instructions}>
          Today's Good Written Thing. 
        </Text>
        <Text style={styles.instructions}>
          {written_thing.description}
        </Text>
      </View>
    );
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

AppRegistry.registerComponent('OneGoodThing', () => OneGoodThing);
