import React from 'react';
import AppContainer  from './src/router.js';
import { createAppContainer } from 'react-navigation';

// const App = createAppContainer(SwitchNavigator);
// export default App;

export default class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isReady: true,
        };
    }

    render() {
        if(!this.state.isReady) {
            return <Expo.AppLoading />
        } else {
            return <AppContainer />
        }
    }
}
