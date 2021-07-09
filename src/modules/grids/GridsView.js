import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated
} from 'react-native';
import { colors, fonts } from '../../styles';
import {useEffect} from "react";

import { RadioGroup, GridRow } from '../../components';
import { SearchBar, IconNode } from 'react-native-elements';

export default class GridsScreen extends React.Component {

  // scrollY = new Animated.value(0)
  // translateY = scrollY.interpolate({
  //   inputRange:[0,45],
  //   outputRange:[0,-45]
  // })

  state = {
    search: '',
    data:[],
    filteredData:[],
    loading:true,
    university:{}
  };
  
  url = 'http://Mahdlybe-env.eba-ydqxxb9n.us-east-1.elasticbeanstalk.com/file/download/'

  componentDidMount(){
    this.fetchedData();
  }

  fetchedData = async () => {
  await fetch('http://Mahdlybe-env.eba-ydqxxb9n.us-east-1.elasticbeanstalk.com/university/all')
    .then((response) => response.json())
      .then((json) =>this.setState({ ...this.state,data:json,filteredData:json }))
      .catch((error) => console.error(error))
      .finally(() => {this.setState({ ...this.state,loading:false })});
  }

  updateSearch = (search) => {
    // this.setState({search });
    const filtered = this.state.data.filter(item => {
        return (
          item.name.toLowerCase().includes(search.toLowerCase()) || 
          item.area.toLowerCase().includes(search.toLowerCase()))
    })
    // console.log(filtered);
    this.setState({ ...this.state,search,filteredData:filtered });
  };

  _getRenderItemFunction = () =>
    [ this.renderRowThree][
      this.props.tabIndex
    ];

    _openUniversity = university => {
      this.setState({...this.state, university})
      this.props.navigation.navigate('University', {
        university,
      });
    };
  
  

  renderRowOne = rowData => {
    // const cellViews = rowData.item.map(item => (
    //   <TouchableOpacity key={item.id} onPress={() => this._openArticle(item)}>
    //     <View style={styles.itemOneContainer}>
    //       <View style={styles.itemOneImageContainer}>
    //         <Image style={styles.itemOneImage} source={{ uri: item.image }} />
    //       </View>
    //       <View style={styles.itemOneContent}>
    //         <Text style={styles.itemOneTitle} numberOfLines={1}>
    //           {item.title}
    //         </Text>
    //         <Text
    //           style={styles.itemOneSubTitle}
    //           styleName="collapsible"
    //           numberOfLines={3}
    //         >
    //           {item.subtitle}
    //         </Text>
    //         <Text style={styles.itemOnePrice} numberOfLines={1}>
    //           {item.price}
    //         </Text>
    //       </View>
    //     </View>
    //   </TouchableOpacity>
    // ));
    // return (
    //   <View key={rowData.item[0].id} style={styles.itemOneRow}>
    //     {cellViews}
    //   </View>
    // );
  };

  renderRowTwo = 
  ({ item }) => {};
    // <TouchableOpacity
    //   key={item.id}
    //   style={styles.itemTwoContainer}
    //   onPress={() => this._openArticle(item)}
    // >
    //   <View style={styles.itemTwoContent}>
    //     <Image style={styles.itemTwoImage} source={{ uri: item.image }} />
    //     <View style={styles.itemTwoOverlay} />
    //     <Text style={styles.itemTwoTitle}>{item.title}</Text>
    //     <Text style={styles.itemTwoSubTitle}>{item.subtitle}</Text>
    //     <Text style={styles.itemTwoPrice}>{item.price}</Text>
    //   </View>
    // </TouchableOpacity>
  // );


  renderRowThree = ({ item }) => 
  
(
    <TouchableOpacity
      key={item.id}
      style={styles.itemThreeContainer}
      onPress={() => this._openUniversity(item)}
    >
      
      <View style={styles.itemThreeSubContainer}>
        <Image source={{ uri: `${this.url}${item.image}` }} style={styles.itemThreeImage} />
        <View style={styles.itemThreeContent}>
          {/* <Text style={styles.itemThreeBrand}>{item.area}</Text> */}
          <View>
            <Text style={styles.itemThreeTitle} numberOfLines={2}>{item.name} </Text>
            <Text style={styles.itemThreeSubtitle} numberOfLines={5}>
              {item.description}
            </Text>
          </View>
          <View style={styles.itemThreeMetaContainer}>
            {item.phone && (
              <View
                style={[
                  styles.badge,
                  { backgroundColor: colors.green },
                ]}
              >
                <Text
                  style={{ fontSize: 10, color: colors.white }}
                  styleName="bright"
                >
                  {item.phone}
                </Text>
              </View>
            )}
            <Text style={styles.itemThreeBrand}>{item.area}</Text>
          </View>
        </View>
      </View>
      <View style={styles.itemThreeHr} />
    </TouchableOpacity>
  );

  renderHeader = () => {
    const {search} = this.state;
    return (
    <SearchBar
    placeholder="Type Here..."
    onChangeText={this.updateSearch}
    value={search}
    round={true}
    lightTheme={true}
    inputContainerStyle ={styles.searchContainer}
    containerStyle= {styles.container}
  />

  )}

  render() {
    // const groupedData =this.props.filteredData;
    const { filteredData } = this.state;

    return (
      <View style={styles.container}>
       
        {/* <View style={{ height: 50 }}>
          <RadioGroup
            selectedIndex={this.props.tabIndex}
            items={this.props.tabs}
            onChange={this.props.setTabIndex}
            underline
          />
        </View> */}
        <FlatList
          keyExtractor={item =>
            item.id
              ? `${this.props.tabIndex}-${item.id}`
              : `${item[0] && item[0].id}`
          }
          style={{ backgroundColor: colors.white, paddingHorizontal: 15 }}
          data={filteredData}
          renderItem={this._getRenderItemFunction()}
          ListHeaderComponent={this.renderHeader}
          stickyHeaderIndices={[0]}
          stickySectionHeadersEnabled={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  searchContainer: {
    flex: 1,
    backgroundColor: colors.bluish,
  },
  tabsContainer: {
    alignSelf: 'stretch',
    marginTop: 30,
  },
  itemOneContainer: {
    flex: 1,
    width: Dimensions.get('window').width / 2 - 40,
  },
  itemOneImageContainer: {
    borderRadius: 3,
    overflow: 'hidden',
  },
  itemOneImage: {
    height: 200,
    width: Dimensions.get('window').width / 2 - 40,
  },
  itemOneTitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  itemOneSubTitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 13,
    color: '#B2B2B2',
    marginVertical: 3,
  },
  itemOnePrice: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  itemOneRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  itemOneContent: {
    marginTop: 5,
    marginBottom: 10,
  },
  itemTwoContainer: {
    paddingBottom: 10,
    backgroundColor: 'white',
    marginVertical: 5,
  },
  itemTwoContent: {
    padding: 20,
    position: 'relative',
    marginHorizontal: Platform.OS === 'ios' ? -15 : 0,
    height: 150,
  },
  itemTwoTitle: {
    color: colors.white,
    fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  itemTwoSubTitle: {
    color: colors.white,
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    marginVertical: 5,
  },
  itemTwoPrice: {
    color: colors.white,
    fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  itemTwoImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  itemTwoOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#6271da',
    opacity: 0.5,
  },
  itemThreeContainer: {
    backgroundColor: 'white',
  },
  itemThreeSubContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  itemThreeImage: {
    height: 200,
    width: 200,
  },
  itemThreeContent: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'space-between',
  },
  itemThreeBrand: {
    fontFamily: fonts.primaryRegular,
    fontSize: 18,
    color: '#617ae1',
  },
  itemThreeTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: 20,
    color: '#5F5F5F',
  },
  itemThreeSubtitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 16,
    color: '#a4a4a4',
  },
  itemThreeMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemThreePrice: {
    fontFamily: fonts.primaryRegular,
    fontSize: 19,
    color: '#5f5f5f',
    textAlign: 'right',
  },
  itemThreeHr: {
    flex: 1,
    height: 1,
    backgroundColor: '#e3e3e3',
    marginRight: -15,
  },
  badge: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
