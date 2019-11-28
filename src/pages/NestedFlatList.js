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
import RandomImage from '../business/randomImage';
import PageContainer from '../components/PageContainer';

const width = Dimensions.get('window').width;
const pixelWidth = PixelRatio.getPixelSizeForLayoutSize(width);
const height = Math.floor((width * 9) / 16);
const pixelHeight = PixelRatio.getPixelSizeForLayoutSize(height);

/**
 * Component for testing lag resulting from too many images
 */
class NestedFlatList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadedImages: [],
      erroredImages: 0,
      lastErrorMessage: null,
      randomSections: null,
      primarySize: -1,
      secondarySize: -1,
    };
  }

  static navigationOptions = ({navigation}) => {
    const primarySize = navigation.getParam('primarySize', 10);
    const secondarySize = navigation.getParam('secondarySize', 5);
    return {
      title: `Nested Flat List (${primarySize}x${secondarySize})`,
    };
  };

  static getDerivedStateFromProps(props, state) {
    const {navigation} = props;
    const primarySize = navigation.getParam('primarySize', 10);
    const secondarySize = navigation.getParam('secondarySize', 5);
    if (
      primarySize !== state.primarySize ||
      secondarySize !== state.secondarySize
    ) {
      const randomSections = [];
      for (let i = 0; i < primarySize; i++) {
        randomSections.push({
          title: `Random section ${i + 1}`,
          data: RandomImage.generateUrlArray(
            i * secondarySize,
            secondarySize,
            pixelHeight,
            pixelWidth,
          ),
        });
      }
      return {
        randomSections,
        primarySize,
        secondarySize,
      };
    } else {
      return null;
    }
  }

  render() {
    const {randomSections} = this.state;
    return (
      <PageContainer>
        {randomSections && (
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
                        if (
                          this.state.loadedImages.findIndex(
                            it => it.localeCompare(item) === 0,
                          ) === -1
                        ) {
                          this.setState({
                            loadedImages: this.state.loadedImages.concat([
                              item,
                            ]),
                          });
                        }
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
        )}
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
            Loaded images: {this.state.loadedImages.length}
          </Text>
          <Text style={{color: 'white'}}>
            Errored images: {this.state.erroredImages}
          </Text>
        </View>
      </PageContainer>
    );
  }
}
export default NestedFlatList;
