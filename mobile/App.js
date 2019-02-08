import { SignedOutNavigator } from './src/router.js';
import { createAppContainer } from 'react-navigation';


const App = createAppContainer(SignedOutNavigator);
export default App;
