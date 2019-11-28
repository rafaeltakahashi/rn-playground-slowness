import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import NestedFlatList from './pages/NestedFlatList';
import Home from './pages/Home';
import {COLORS} from '../theme';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: 'Slowness',
      },
    },
    NestedFlatList: {
      screen: NestedFlatList,
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: COLORS.PRIMARY_COLOR,
      },
      headerTintColor: COLORS.PRIMARY_TEXT_COLOR,
    },
  },
);

export default createAppContainer(AppNavigator);
