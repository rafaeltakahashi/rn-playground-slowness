/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  Image,
  FlatList,
  Text,
  View,
  Dimensions,
  PixelRatio,
} from 'react-native';

const width = Dimensions.get('window').width;
const pixelWidth = PixelRatio.getPixelSizeForLayoutSize(width);
const height = Math.floor((width * 9) / 16);
const pixelHeight = PixelRatio.getPixelSizeForLayoutSize(height);

let seed = 0;

const generateUrl = () => {
  const randomUrls = [];
  for (var i = 0; i < 70; i++) {
    randomUrls.push(
      `https://picsum.photos/seed/${seed}/${pixelHeight}/${pixelWidth}`,
    );
    seed = seed + 1;
  }
  return randomUrls;
};

const randomSections = [];
for (var i = 0; i < 70; i++) {
  randomSections.push({
    title: `Random section ${i + 1}`,
    data: generateUrl(),
  });
}

/**
 * Component for testing lag resulting from too many images
 */
class App extends Component {
  constructor() {
    super();
    this.state = {
      loadedImages: 0,
      erroredImages: 0,
      lastErrorMessage: null,
    };
  }
  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={randomSections}
          keyExtractor={randomSection => randomSection.title}
          renderItem={({item}) => (
            <View>
              <Text style={{fontWeight: 'bold', paddingLeft: 10}}>
                {item.title}
              </Text>
              <FlatList
                horizontal
                data={item.data}
                keyExtractor={item => item}
                snapToAlignment="center"
                pagingEnabled
                showsHorizontalScrollIndicator
                renderItem={({item}) => (
                  <Image
                    source={{uri: item}}
                    style={{height, width}}
                    progressiveRenderingEnabled
                    onLoad={() => {
                      this.setState({
                        loadedImages: this.state.loadedImages + 1,
                      });
                    }}
                    onError={e => {
                      this.setState({
                        erroredImages: this.state.erroredImages + 1,
                        lastErrorMessage: e.nativeEvent.error,
                      });
                    }}
                  />
                )}
              />
            </View>
          )}
        />
        {this.state.lastErrorMessage && (
          <View
            style={{
              backgroundColor: '#ffff80',
              position: 'absolute',
              paddingLeft: 20,
              top: 20,
              left: 180,
              right: 10,
              borderRadius: 10,
            }}>
            <Text>{this.state.lastErrorMessage}</Text>
          </View>
        )}
        <View
          style={{
            backgroundColor: '#5050ff',
            height: 80,
            position: 'absolute',
            justifyContent: 'center',
            paddingLeft: 20,
            bottom: 10,
            left: 10,
            right: 10,
            borderRadius: 10,
          }}>
          <Text style={{color: 'white'}}>
            Using images of size {pixelWidth} by {pixelHeight}
          </Text>
          <Text style={{color: 'white'}}>
            Loaded images: {this.state.loadedImages}
          </Text>
          <Text style={{color: 'white'}}>
            Errored images: {this.state.erroredImages}
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}
export default App;
