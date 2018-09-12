/* eslint-disable import/extensions,import/no-unresolved */
import jet from 'jet/platform/react-native';

import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';

class Root extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
    };

    // jet.exposeProperty('prop', 'someValue');
  }

  render() {
    return (
      <View>
        <Text testID="messageText">{this.state.message}</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('testing', () => Root);
