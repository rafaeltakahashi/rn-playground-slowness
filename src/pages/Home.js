import React from 'react';
import {View, Text, TouchableOpacity, Button, Image} from 'react-native';
import PageContainer from '../components/PageContainer';
import {COLORS} from '../../theme';

export default ({navigation}) => (
  <PageContainer padded>
    <View style={{flex: 1, alignItems: 'center'}}>
      <Image
        source={require('../img/turtle.png')}
        style={{
          height: 70,
          width: 70,
          borderRadius: 35,
          margin: 10,
        }}
      />

      <View style={{height: 20}} />
      <Button
        title="Nested Flat List (50 x 10)"
        onPress={() =>
          navigation.navigate('NestedFlatList', {
            primarySize: 50,
            secondarySize: 10,
          })
        }
      />

      <View style={{height: 20}} />
      <Button
        title="Nested Flat List (10 x 50)"
        onPress={() =>
          navigation.navigate('NestedFlatList', {
            primarySize: 10,
            secondarySize: 50,
          })
        }
      />

      <View style={{height: 20}} />
      <Button
        title="Nested Flat List (50 x 50)"
        onPress={() =>
          navigation.navigate('NestedFlatList', {
            primarySize: 50,
            secondarySize: 50,
          })
        }
      />

      <View style={{height: 20}} />
      <Button
        title="Wrapped Flat List (10 x 50)"
        onPress={() => {
          navigation.navigate('WrappedFlatList', {
            primarySize: 10,
            secondarySize: 50,
          });
        }}
      />

      <View style={{height: 20}} />
      <Button
        title="Wrapped Flat List (50 x 10)"
        onPress={() => {
          navigation.navigate('WrappedFlatList', {
            primarySize: 50,
            secondarySize: 10,
          });
        }}
      />

      <View style={{height: 20}} />
      <Button
        title="Wrapped Flat List (50 x 50)"
        onPress={() => {
          navigation.navigate('WrappedFlatList', {
            primarySize: 50,
            secondarySize: 50,
          });
        }}
      />

      <View style={{height: 20}} />
      <Text>A x B means A lines and B columns.</Text>

      <Text
        style={{
          position: 'absolute',
          bottom: 5,
          left: 5,
          right: 5,
          fontSize: 10,
          textAlign: 'center',
          color: COLORS.FAINT_TEXT,
        }}>
        Icon made by Freepik from www.flaticon.com{'\n'}
        Images are downloaded from picsum.photos
      </Text>
    </View>
  </PageContainer>
);
