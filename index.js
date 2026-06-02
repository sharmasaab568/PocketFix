/**
 * @format
 */

import { AppRegistry } from 'react-native';
<<<<<<< HEAD
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
=======
import { name as appName } from './app.json';

import Dashboard from './Screen/Dashboard';
import App from './App';
import LoginPage from './Screen/LoginPage';
AppRegistry.registerComponent(appName, () => LoginPage);
>>>>>>> 67c979550604c2f0f425c7575e23afe5a7b467f4
