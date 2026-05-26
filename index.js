/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import Shop from './Screen/Shop';
import LoginPage from './Screen/LoginPage';
import ResgisterShop from './Screen/shopkeeper/RegisterShop'
AppRegistry.registerComponent(appName, () => ResgisterShop);
