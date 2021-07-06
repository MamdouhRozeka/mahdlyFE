import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Alert
  // Text,
} from 'react-native';

import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window')

export default class HomeScreen  extends React.Component{

  state = {
    search: '',
    data:[],
    loading:true,
    university:{}
  };
  


  componentDidMount(){
    this.fetchedData();
  }

  fetchedData = async () => {
  await fetch('http://localhost:9090/university/all')
    .then((response) => response.json())
      .then((json) =>{
        const data = json.filter(item => {
          return item.featured
        })
        this.setState({ ...this.state,data })})
      .catch((error) => console.error(error))
      .finally(() => {this.setState({ ...this.state,loading:false })});
  }

  _openUniversity = university => {
    this.setState({...this.state, university})
    this.props.navigation.navigate('University', {
      university,
    });
  };

  _renderItem = ({item, index}, parallaxProps) =>{
    const url = 'http://localhost:9090/file/download/';
    return (
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
    );
}

render(){
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={styles.bgImage}
        resizeMode="cover"
      >
     
        <View style={styles.sectionLarge}>
          <Text style={styles.bodyText}>
            The smartest and easiest way to build your future...
          </Text>

          <View style={styles.sectionLarge}>
            <View style={styles.header}>
        <Text style={styles.description}>
            Featured Universities
          </Text>
            </View>
             <Carousel
             layout={'stack'}
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 60}
                data={this.state.data}
                renderItem={this._renderItem }
                hasParallaxImages={true}
            />
      </View>

        </View>
      </ImageBackground>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
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
    padding:40,
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
    marginTop:5,
    width: screenWidth - 120,
    height: screenWidth - 120,
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
