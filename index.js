/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

import Dashboard from './Screen/Dashboard';
import App from './App';
import LoginPage from './Screen/LoginPage';
AppRegistry.registerComponent(appName, () => LoginPage);