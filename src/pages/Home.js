import React, {Component} from 'react';
import {Button, Image, Text, View, ScrollView} from 'react-native';
import Slider from '@react-native-community/slider';
import ModalSelector from 'react-native-modal-selector';
import {COLORS} from '../../theme';
import PageContainer from '../components/PageContainer';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nestedFlatListLines: 10,
      nestedFlatListColumns: 10,
      nestedFlatListImageSize: 1,
      wrappedFlatListLines: 10,
      wrappedFlatListColumns: 10,
      wrappedFlatListImageSize: 1,
      scrollFlatListLines: 10,
      scrollFlatListColumns: 10,
      scrollFlatListImageSize: 1,
    };
  }
  render() {
    return (
      <PageContainer padded>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{alignItems: 'center'}}>
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
          <Text style={{fontWeight: 'bold'}}>Nested Flat List</Text>
          <Text>Lines: {this.state.nestedFlatListLines}</Text>
          <Slider
            style={{width: 100}}
            value={this.state.nestedFlatListLines}
            minimumValue={10}
            maximumValue={50}
            step={1}
            onValueChange={value => this.setState({nestedFlatListLines: value})}
          />
          <Text>Columns: {this.state.nestedFlatListColumns}</Text>
          <Slider
            style={{width: 100}}
            value={this.state.nestedFlatListColumns}
            minimumValue={10}
            maximumValue={50}
            step={1}
            onValueChange={value =>
              this.setState({nestedFlatListColumns: value})
            }
          />
          <ModalSelector
            data={[
              {key: 2, label: '100% larger than full size (4x area)'},
              {key: 1.5, label: '50% larger than full size (2.25x area)'},
              {key: 1, label: 'Full size images'},
              {key: 0.75, label: 'Three-quarter size images (around 56% area)'},
              {key: 0.5, label: 'Half size images (1/4 area)'},
              {key: 0.33, label: 'One third size images (1/9 area)'},
              {key: 0, label: 'Text only'},
            ]}
            style={{marginBottom: 10}}
            initValue="Full size"
            onChange={option =>
              this.setState({nestedFlatListImageSize: option.key})
            }
          />

          <Button
            title="Open Nested Flat List →"
            onPress={() => {
              this.props.navigation.navigate(
                this.state.wrappedFlatListImageSize === 0
                  ? 'NestedFlatListText'
                  : 'NestedFlatList',
                {
                  primarySize: this.state.nestedFlatListLines,
                  secondarySize: this.state.nestedFlatListColumns,
                  imageSizeMultiplier: this.state.nestedFlatListImageSize,
                },
              );
            }}
          />

          <View style={{height: 20}} />

          <Text style={{fontWeight: 'bold'}}>Wrapped Flat List</Text>
          <Text>Lines: {this.state.wrappedFlatListLines}</Text>
          <Slider
            style={{width: 100}}
            value={this.state.wrappedFlatListLines}
            minimumValue={10}
            maximumValue={50}
            step={1}
            onValueChange={value =>
              this.setState({wrappedFlatListLines: value})
            }
          />
          <Text>Columns: {this.state.wrappedFlatListColumns}</Text>
          <Slider
            style={{width: 100}}
            value={this.state.wrappedFlatListColumns}
            minimumValue={10}
            maximumValue={50}
            step={1}
            onValueChange={value =>
              this.setState({wrappedFlatListColumns: value})
            }
          />
          <ModalSelector
            data={[
              {key: 2, label: '100% larger (4x area)'},
              {key: 1.5, label: '50% larger (2.25x area)'},
              {key: 1, label: 'Full size images'},
              {key: 0.75, label: 'Three-quarter size images (around 56% area)'},
              {key: 0.5, label: 'Half size images (1/4 area)'},
              {key: 0.33, label: 'One third size images (1/9 area)'},
            ]}
            style={{marginBottom: 10}}
            initValue="Full size"
            onChange={option =>
              this.setState({wrappedFlatListImageSize: option.key})
            }
          />
          <Button
            title="Open Wrapped Flat List →"
            onPress={() => {
              this.props.navigation.navigate('WrappedFlatList', {
                primarySize: this.state.wrappedFlatListLines,
                secondarySize: this.state.wrappedFlatListColumns,
                imageSizeMultipler: this.state.wrappedFlatListImageSize,
              });
            }}
          />

          <Text style={{fontWeight: 'bold'}}>ScrollView with Flat Lists</Text>
          <Text>Lines: {this.state.scrollFlatListLines}</Text>
          <Slider
            style={{width: 100}}
            value={this.state.scrollFlatListLines}
            minimumValue={10}
            maximumValue={50}
            step={1}
            onValueChange={value => this.setState({scrollFlatListLines: value})}
          />
          <Text>Columns: {this.state.scrollFlatListColumns}</Text>
          <Slider
            style={{width: 100}}
            value={this.state.scrollFlatListColumns}
            minimumValue={10}
            maximumValue={50}
            step={1}
            onValueChange={value =>
              this.setState({scrollFlatListColumns: value})
            }
          />
          <ModalSelector
            data={[
              {key: 2, label: '100% larger (4x area)'},
              {key: 1.5, label: '50% larger (2.25x area)'},
              {key: 1, label: 'Full size images'},
              {key: 0.75, label: 'Three-quarter size images (around 56% area)'},
              {key: 0.5, label: 'Half size images (1/4 area)'},
              {key: 0.33, label: 'One third size images (1/9 area)'},
            ]}
            style={{marginBottom: 10}}
            initValue="Full size"
            onChange={option =>
              this.setState({scrollFlatListImageSize: option.key})
            }
          />
          <Button
            title="Open Scroll Flat List →"
            onPress={() => {
              this.props.navigation.navigate('ScrollFlatList', {
                primarySize: this.state.scrollFlatListLines,
                secondarySize: this.state.scrollFlatListColumns,
                imageSizeMultipler: this.state.scrollFlatListImageSize,
              });
            }}
          />
        </ScrollView>
        <Text
          style={{
            margin: 5,
            textAlign: 'center',
            color: COLORS.FAINT_TEXT,
          }}>
          Icon made by Freepik from www.flaticon.com{'\n'}
          Images are downloaded from picsum.photos
        </Text>
      </PageContainer>
    );
  }
}

export default HomeScreen;
