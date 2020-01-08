import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import NestedFlatList from './pages/NestedFlatList';
import NestedFlatListText from './pages/NestedFlatListText';
import WrappedFlatList from './pages/WrappedFlatList';
import ScrollFlatList from './pages/ScrollFlatList';
import NestedRecyclerList from './pages/NestedRecyclerList';
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
    NestedFlatListText: {
      screen: NestedFlatListText,
    },
    WrappedFlatList: {
      screen: WrappedFlatList,
    },
    ScrollFlatList: {
      screen: ScrollFlatList,
    },
    NestedRecyclerList: {
      screen: NestedRecyclerList,
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
