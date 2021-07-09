import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator, Header } from '@react-navigation/stack';
import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

import StackNavigationData from './stackNavigationData';

const Stack = createStackNavigator();
import { colors, fonts } from '../../styles';

export default function NavigatorView(props) {
  // if (authState.isLoggedIn || authState.hasSkippedLogin) {
  //     return <AppNavigator />;
  // }
  // return <AuthScreen />;

  const headerTitleCustom = (props) => {
    
    // dangerouslyGetState
    const nav = {...props};
    if(nav.props.route.name ==='University'){
      const {university} = nav.props.route.params;
      return (
        <View>
            <Text style={styles.headerTitle} numberOfLines={1}>{university.name}</Text>
        </View>
    );
  }
  }

  // Header Component
function Header({children}) {
  console.log(children);
  return (
      <View>
          <Text>{children}</Text>
      </View>
  );
}

  const headerLeftComponentMenu = () => {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.toggleDrawer()}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}
      >
        <Image
          source={require('../../../assets/images/drawer/menu.png')}
          resizeMode="contain"
          style={{
            height: 20,
          }}
        />
      </TouchableOpacity>    
    )
  }
  
// console.log(JSON.stringify(props));
// const { params = {} } = props.navigation.state
// const routeName = getFocusedRouteNameFromRoute(props.route);
// console.log(routeName);
// console.log(params);
  return (
    <Stack.Navigator>
      {StackNavigationData.map((item, idx) => (
        <Stack.Screen
          key={`stack_item-${idx+1}`}
          name={item.name} 
          component={item.component} 
          options={( props ) => ({ title: headerTitleCustom({props}),
           headerLeft: item.headerLeft || headerLeftComponentMenu,
            headerBackground: () => (
              <Image style={styles.headerImage} source={item.headerBackground.source} />
            ),
            headerTitleStyle: item.headerTitleStyle, })
           
            
          } 
        />
      ))}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 100 + '%',
    height: Header.height,
  },
  headerTitle:{
  fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
  }
});
