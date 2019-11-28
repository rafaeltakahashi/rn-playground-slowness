import React from 'react';
import {View, SafeAreaView, StatusBar} from 'react-native';
import {COLORS} from '../../theme';

export default ({padded, children}) => (
  <SafeAreaView style={{flex: 1}}>
    <StatusBar
      barStyle="light-content"
      backgroundColor={COLORS.PRIMARY_COLOR}
    />
    <View style={{flex: 1, padding: padded ? 5 : 0}}>{children}</View>
  </SafeAreaView>
);
