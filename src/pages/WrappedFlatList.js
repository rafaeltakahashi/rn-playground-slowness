import React, {Component} from 'react';
import {
  Image,
  FlatList,
  View,
  Text,
  Dimensions,
  ScrollView,
  PixelRatio,
} from 'react-native';
import RandomImage from '../business/randomImage';
import PageContainer from '../components/PageContainer';

const width = Dimensions.get('window').width;
const pixelWidth = PixelRatio.getPixelSizeForLayoutSize(width);
const height = Math.floor((width * 9) / 16);
const pixelHeight = PixelRatio.getPixelSizeForLayoutSize(height);

class WrappedFlatList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadedImages: [],
      erroredImages: 0,
      lastErrorMessage: null,
      randomImages: null,
      primarySize: -1,
      secondarySize: -1,
    };
  }

  static navigationOptions = ({navigation}) => {
    const primarySize = navigation.getParam('primarySize', 10);
    const secondarySize = navigation.getParam('secondarySize', 5);
    return {
      title: `Wrapped Flat List (${primarySize}x${secondarySize})`,
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
      const randomImages = [];
      for (let i = 0; i < primarySize * secondarySize; i++) {
        randomImages.push(RandomImage.generateUrl(i, pixelHeight, pixelWidth));
      }
      return {
        randomImages,
        primarySize,
        secondarySize,
      };
    } else {
      return null;
    }
  }

  render() {
    const {randomImages, secondarySize} = this.state;
    return (
      <PageContainer>
        <ScrollView horizontal>
          {randomImages && (
            <FlatList
              data={randomImages}
              numColumns={secondarySize}
              keyExtractor={randomItem => randomItem}
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
                        loadedImages: this.state.loadedImages.concat([item]),
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
          )}
        </ScrollView>
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
export default WrappedFlatList;
