import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SignedOutNavigator } from './src/router.js';
import { createAppContainer } from 'react-navigation';

/*export default class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
      isLoggedIn: false,
    }
  }

  render() {
      return <AppContainer />
  }
}*/

const App = createAppContainer(SignedOutNavigator);
export default App;
