import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Alert,
  ScrollView
  // Text,
} from 'react-native';

import { SimpleAnimation } from 'react-native-simple-animations';

import { SliderBox } from "react-native-image-slider-box";

import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

import { Component } from 'react'
// import {  Avatar, withStyles, List, FlatList } from 'react-native-ui-kitten'
import { Card, List } from '@ui-kitten/components';

const { width: screenWidth } = Dimensions.get('window')
const { height: screenHeight } = Dimensions.get('window')



export default class HomeScreen  extends React.Component{

  state = {
    search: '',
    universities:[],
    posts:[],
    loading:true,
    university:{},
    majors:[],
    major:{}
  };
  
  


  componentDidMount(){
    this.fetchedData();
  }

  renderItemList = ({ item }) => (
    <View>
      <Image
        source={{ uri: item.imageURI }}
      />
      <View>
        <Text category='s1'>
          {item.postTitle}
        </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Profile')}>
          <Avatar
            source={{ uri: item.avatarURI }}
            size='small'
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text category='p2'>{item.randomText}</Text>
      </View>
    </View>
  )

  fetchedData = async () => {
  await fetch('http://Mahdlybe-env.eba-ydqxxb9n.us-east-1.elasticbeanstalk.com/university/all')
    .then((response) => response.json())
      .then((json) =>{
        const universities = json.filter(item => {
          return item.featured
        })
        this.setState({ ...this.state,universities })})
      .catch((error) => console.error(error))
      .finally(() => {this.setState({ ...this.state,loading:false })});

  await fetch('http://Mahdlybe-env.eba-ydqxxb9n.us-east-1.elasticbeanstalk.com/major/all')
    .then((response) => response.json())
      .then((json) =>{
        const majors = json.filter(item => {
          return item.trending
        })
        this.setState({ ...this.state,majors })})
      .catch((error) => console.error(error))
      .finally(() => {this.setState({ ...this.state,loading:false })});

  await fetch('http://Mahdlybe-env.eba-ydqxxb9n.us-east-1.elasticbeanstalk.com/post/all')
    .then((response) => response.json())
      .then((json) =>{
        this.setState({ ...this.state,posts:json })})
      .catch((error) => console.error(error))
      .finally(() => {this.setState({ ...this.state,loading:false })});


  }

  _openUniversity = university => {
    this.setState({...this.state, university})
    this.props.navigation.navigate('University', {
      university,
    });
  };

  _renderItemImage = ({item, index}, parallaxProps) =>{
    const url = 'http://Mahdlybe-env.eba-ydqxxb9n.us-east-1.elasticbeanstalk.com/file/download/';
    return (
      <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
      <TouchableOpacity  key={item.id} onPress={() => this._openUniversity(item)} style={styles.item}>
            <ParallaxImage
                source={{ uri: `${url}${item.image}`  }}
                containerStyle={styles.imageContainer}
                style={styles.image}
                parallaxFactor={0.4}
                blurRadiusStart={3}
                blurRadiusEnd={1}
                unBlurDuration={1000}
                {...parallaxProps}
            />

            <Text style={styles.title} numberOfLines={2}>
                { item.name }
            </Text>
            <Text style={styles.area} numberOfLines={1}>
                { item.area }
            </Text>
            </TouchableOpacity>
            </SimpleAnimation>
    );
}
  _renderItemPost = ({item, index}) =>{
    const url = 'http://Mahdlybe-env.eba-ydqxxb9n.us-east-1.elasticbeanstalk.com/file/download/';
    let images = []
    item.postImages.forEach(element => {
      images.push(`${url}${element.url}`)
    });

    if ((index +1) % 5 === 0) {

      return (
<View >
  <View style={styles.itemContainer}>
        <SimpleAnimation delay={300} duration={1000} fade staticType='zoom' >
        <Text style={styles.bodyText}>
          The smartest and easiest way to build your future...
        </Text>
        </SimpleAnimation>

      <View style={styles.sectionLarge}>
          <View style={styles.header}>
          <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
      <Text style={styles.description}>
          Featured Universities
        </Text>
        </SimpleAnimation>
          </View>
           <Carousel
           layout={'stack'}
              sliderWidth={screenWidth}
              sliderHeight={screenWidth}
              itemWidth={screenWidth - 60}
              data={this.state.universities}
              renderItem={this._renderItemImage }
              hasParallaxImages={true}
              autoplay={true}
              loop={true}
              autoplayDelay={3000}
              autoplayInterval={5000}
              activeAnimationType={'decay'}
          />
    </View>
    </View>
    <View style={styles.postItemContainer} >
    <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
      <TouchableOpacity  key={item.id} style={styles.postItem}>
            <Text style={styles.postTitle} numberOfLines={2}>
                { item.university.name }
            </Text>
      <SliderBox
  images={images}
  onCurrentImagePressed={index => {}}
  currentImageEmitter={index => {}}
  autoplay={true}
  circleLoop={true}
  parentWidth={screenWidth -60}
/>
            <Text style={styles.postDescription} numberOfLines={3}>
                { item.description }
            </Text>

            </TouchableOpacity>
            </SimpleAnimation>
    </View>
</View>

      )

    }
    else  if ((index +1) % 7 === 0) {
      return (
<View >
  <View style={styles.itemContainerText}>
      <View style={styles.sectionLarge}> 
             <View style={styles.header}>
            <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
        <Text style={styles.description}>
            Trending Majors
          </Text>
          </SimpleAnimation>
            </View>
             <Carousel
             layout={'stack'}
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 60}
                data={this.state.majors}
                renderItem={this._renderItemText }
                autoplay={true}
                loop={true}
                autoplayDelay={3000}
                autoplayInterval={8000}
                activeAnimationType={'spring'}
            /> 
       </View>
    <View style={styles.postItemContainer} >
    <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
      <TouchableOpacity  key={item.id} style={styles.postItem}>
            <Text style={styles.postTitle} numberOfLines={2}>
                { item.university.name }
            </Text>
      <SliderBox
  images={images}
  onCurrentImagePressed={index => {}}
  currentImageEmitter={index => {}}
  autoplay={true}
  circleLoop={true}
  parentWidth={screenWidth -60}
/>
            <Text style={styles.postDescription} numberOfLines={3}>
                { item.description }
            </Text>

            </TouchableOpacity>
            </SimpleAnimation>
    </View>
</View>
</View> )}

      else {
    return (
      <View style={styles.postItem} >

      <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
      <TouchableOpacity  key={item.id} >
            <Text style={styles.postTitle} numberOfLines={2}>
                { item.university.name }
            </Text>
      <SliderBox
  images={images}
  onCurrentImagePressed={index => {}}
  currentImageEmitter={index => {}}
  autoplay={true}
  circleLoop={true}
  parentWidth={screenWidth -60}
/>
            <Text style={styles.postDescription} numberOfLines={3}>
                { item.description }
            </Text>

            </TouchableOpacity>
            </SimpleAnimation>
  </View>
    )
  }
    ;
}
  _renderItemText = ({item, index}) =>{
    return (
      <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>

          <TouchableOpacity  key={item.id} style={styles.itemText}>
            <Text style={styles.title} numberOfLines={2}>
                { item.name }
            </Text>
            <Text style={styles.area} numberOfLines={1}>
                Expected GPA: { item.requiredGPALow } - {item.requiredGPAHigh}
            </Text>
            </TouchableOpacity>
      </SimpleAnimation>
    );
}

render(){

  return (
          <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={styles.bgImage}
        resizeMode="cover"
      >
    <List

    style={styles.listContainer}
    contentContainerStyle={styles.contentContainer}
    backgroundColor={colors.bluish}
    data={this.state.posts}
    renderItem={this._renderItemPost}
    keyExtractor={item =>
            item.id
              ? `${this.props.tabIndex}-${item.id}`
              : `${item[0] && item[0].id}`
          }
  />
</ImageBackground>
    /* <ScrollView contentContainerStyle={styles.contentContainer}> */
     
        /* <View style={styles.sectionLarge}> */

        /* <View style={styles.sectionLarge}> */
            /* <View style={styles.header}>
            <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
        <Text style={styles.description}>
            Trending Majors
          </Text>
          </SimpleAnimation>
            </View>
             <Carousel
             layout={'stack'}
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 60}
                data={this.state.majors}
                renderItem={this._renderItemText }
                autoplay={true}
                loop={true}
                autoplayDelay={3000}
                autoplayInterval={8000}
                activeAnimationType={'spring'}
            /> */

      /* </View> */
        /* </View> */
    /* </ScrollView> */
      /* </ImageBackground> */
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  listContainer: {
    maxHeight: screenHeight,
    maxWidth:screenWidth,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'space-around',
 
  },
  bgImage: {
    flex: 1,
    // marginHorizontal: -20,
  },
  bodyText: {
    fontStyle:'italic',
    paddingHorizontal: 30,
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize:23
  },
  sectionLarge: {
    flex: 1,
    paddingHorizontal: 20,
    padding:20,
    justifyContent: 'center',
    justifyContent: 'space-around',
  },
  sectionHeader: {
    marginBottom: 8,
  },
  priceContainer: {
    alignItems: 'center',
  },
  description: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: fonts.primaryRegular,
    fontSize: 18,
  },
  header: {
    width:300,
    fontFamily: fonts.primaryRegular,
    fontSize: 20,
    padding: 10,
    marginStart:5,
    backgroundColor: colors.blue,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  imageSlide: {
    height: 300,
    width: 300,
  },
  titleDescription: {
    color: '#19e7f7',
    textAlign: 'center',
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  title: {
    marginTop: 10,
    marginStart: 3,
    fontWeight: 'bold',
    color: colors.white,
    fontFamily: fonts.primaryRegular,
    fontSize: 18,
  },
  area: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    color:  colors.white,
    fontFamily: fonts.primaryRegular,
    fontSize: 12,
    marginStart: 8,
    marginBottom:10,
    marginTop:2
  },
  item: {
    marginTop:10,
    width: screenWidth - 100,
    height: screenWidth -120,
    // backgroundColor:'rgba(52, 52, 52, 0.9)',
    backgroundColor: colors.green,
    borderRadius: 9,
  },
  itemContainer: {
    marginTop:20,
    width: screenWidth,
    height: screenHeight -400,
    // backgroundColor:'rgba(52, 52, 52, 0.9)',
    // backgroundColor: colors.green,
    borderRadius: 9,
  },
  itemContainerText: {
    // marginTop:10,
    width: screenWidth,
    height: screenHeight -350,
    // backgroundColor:'rgba(52, 52, 52, 0.9)',
    // backgroundColor: colors.green,
    borderRadius: 9,
  },
  postTitle: {
    marginTop: 10,
    marginBottom: 5,
    marginStart: 3,
    fontWeight: 'bold',
    color: colors.black,
    fontFamily: fonts.primaryRegular,
    fontSize: 12,
  },
  postDescription: {
    color:  colors.black,
    fontFamily: fonts.primaryRegular,
    fontSize: 10,
    marginStart: 8,
    marginBottom:10,
    marginTop:2
  },
  postItem: {
    marginTop:20,
    // marginBottom:15,
    width: screenWidth -60,
    height: screenWidth -110,
    // backgroundColor:'rgba(52, 52, 52, 0.9)',
    backgroundColor: colors.white,
    borderRadius: 9,
  },
  postItemContainer: {
    marginStart:30,
    marginBottom:40,
    width: screenWidth -60,
    height: screenWidth -110,
    // backgroundColor:'rgba(52, 52, 52, 0.9)',
    backgroundColor: colors.white,
    borderRadius: 9,
  },
  itemText: {
    marginTop:10,
    width: screenWidth -120,
    // backgroundColor:'rgba(52, 52, 52, 0.9)',
    backgroundColor: colors.green,
    borderRadius: 9,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  price: {
    marginBottom: 5,
  },
  priceLink: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
});
