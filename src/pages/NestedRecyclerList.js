import React, {Component} from 'react';
import {Text, View, Dimensions, PixelRatio} from 'react-native';
import RandomImage from '../business/randomImage';
import PageContainer from '../components/PageContainer';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import RecyclerLane from '../components/RecyclerLane';

const width = Dimensions.get('window').width;
const pixelWidth = PixelRatio.getPixelSizeForLayoutSize(width);
const height = Math.floor((width * 9) / 16);
const pixelHeight = PixelRatio.getPixelSizeForLayoutSize(height);

class NestedRecyclerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadedImages: [],
      erroredImages: 0,
      lastErrorImage: null,
      randomSections: null,
      primarySize: -1,
      secondarySize: -1,
      recyclerDataProvider: new DataProvider((r1, r2) => {
        return r1.title !== r2.title;
      }),
    };
  }

  static navigationOptions = ({navigation}) => {
    const primarySize = navigation.getParam('primarySize', 10);
    const secondarySize = navigation.getParam('secondarySize', 5);
    return {
      title: `Nested Recycler List (${primarySize}x${secondarySize})`,
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
      const imageSizeMultiplier = navigation.getParam('imageSizeMultiplier', 1);
      for (let i = 0; i < primarySize; i++) {
        randomSections.push({
          title: `Random section ${i + 1}`,
          data: RandomImage.generateUrlArray(
            i * secondarySize,
            secondarySize,
            Math.floor(pixelHeight * imageSizeMultiplier),
            Math.floor(pixelWidth * imageSizeMultiplier),
          ),
        });
      }
      return {
        randomSections,
        primarySize,
        secondarySize,
        recyclerDataProvider: state.recyclerDataProvider.cloneWithRows(
          randomSections,
        ),
      };
    } else {
      return null;
    }
  }

  renderSection = (type, item) => (
    <View>
      <Text style={{fontWeight: 'bold', paddingLeft: 10}}>{item.title}</Text>
      <RecyclerLane
        data={item.data}
        onImageLoad={event => {
          if (
            this.state.loadedImages.findIndex(
              it => it.localeCompare(event.nativeEvent.source.url) === 0,
            ) === -1
          ) {
            this.setState({
              loadedImages: this.state.loadedImages.concat([
                event.nativeEvent.source.url,
              ]),
            });
          }
        }}
        onImageError={e => {
          this.setState({
            erroredImages: this.state.erroredImages + 1,
            lastErrorMessage: e.nativeEvent.error,
          });
        }}
      />
    </View>
  );

  recyclerLayoutProvider = new LayoutProvider(
    index => {
      // all items have the same type
      return 1;
    },
    (type, dim) => {
      // size of an image, plus some height for the title
      dim.height = height + 20;
      dim.width = width;
    },
  );

  render() {
    const {randomSections, recyclerDataProvider} = this.state;
    const imageSizeMultiplier = this.props.navigation.getParam(
      'imageSizeMultipler',
      1,
    );
    return (
      <PageContainer>
        {randomSections && (
          <RecyclerListView
            rowRenderer={this.renderSection}
            dataProvider={recyclerDataProvider}
            layoutProvider={this.recyclerLayoutProvider}
            renderAheadOffset={height} // render one lane ahead
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
            Using images of size {Math.floor(pixelWidth * imageSizeMultiplier)}{' '}
            by {Math.floor(pixelHeight * imageSizeMultiplier)}
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

export default NestedRecyclerList;
