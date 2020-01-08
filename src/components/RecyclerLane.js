import React, {Component} from 'react';
import {Image, Dimensions, View} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';

const width = Dimensions.get('window').width;
const height = Math.floor((width * 9) / 16);

/**
 * Component that renders one lane for the NestedRecyclerList page.
 * This component is written separately because it was getting too long to put
 * in a single file.
 * Props: data, onImageLoad, onImageError
 */
class RecyclerLane extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recyclerDataProvider: new DataProvider((r1, r2) => {
        // items are strings
        return r1 !== r2;
      }).cloneWithRows(props.data),
    };
  }

  recyclerLayoutProvider = new LayoutProvider(
    index => {
      return 1;
    },
    (type, dim) => {
      // size of an image
      dim.height = height;
      dim.width = width;
    },
  );

  renderImage = (type, item) => {
    const {onImageLoad, onImageError} = this.props;
    return (
      <Image
        source={{uri: item}}
        style={{height, width}}
        progressiveRenderingEnabled
        onLoad={onImageLoad}
        onError={onImageError}
      />
    );
  };

  render() {
    const {recyclerDataProvider} = this.state;
    return (
      <RecyclerListView
        style={{height, width}}
        rowRenderer={this.renderImage}
        dataProvider={recyclerDataProvider}
        layoutProvider={this.recyclerLayoutProvider}
        isHorizontal
        renderAheadOffset={width} // render one image ahead
      />
    );
  }
}
export default RecyclerLane;
