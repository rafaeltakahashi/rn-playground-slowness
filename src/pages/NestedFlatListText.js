/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React, {Component} from 'react';
import {FlatList, Text, View, Dimensions, PixelRatio} from 'react-native';
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
      let number = 1;
      for (let i = 0; i < primarySize; i++) {
        const data = [];
        for (let j = 0; j < secondarySize; j++) {
          data.push(`${number}`);
          number++;
        }
        randomSections.push({
          title: `Flatlist ${i + 1}`,
          data,
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

  renderInnerFlatList = ({item}) => (
    <View>
      <Text style={{fontWeight: 'bold', paddingLeft: 10}}>{item.title}</Text>
      <FlatList
        horizontal
        data={item.data}
        keyExtractor={item => item}
        snapToAlignment="center"
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        pagingEnabled
        showsHorizontalScrollIndicator
        renderItem={this.renderImageCard}
      />
    </View>
  );

  renderImageCard = ({item}) => (
    <View
      style={{
        height,
        width,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          textAlign: 'center',
          textAlignVertical: 'center',
          fontSize: 36,
          fontWeight: 'bold',
        }}>
        {item}
      </Text>
    </View>
  );

  render() {
    const {randomSections} = this.state;
    return (
      <PageContainer>
        {randomSections && (
          <FlatList
            data={randomSections}
            keyExtractor={randomSection => randomSection.title}
            getItemLayout={(data, index) => ({
              length: height + 20,
              offset: (height + 20) * index,
              index,
            })}
            renderItem={this.renderInnerFlatList}
          />
        )}
      </PageContainer>
    );
  }
}
export default NestedFlatList;
