import { Provider } from 'react-redux';
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { colors } from './src/styles';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';

import { store, persistor } from './src/redux/store';

import AppView from './src/modules/AppViewContainer';
import RNBootSplash from 'react-native-bootsplash';

export default function App() {
  React.useEffect(()=>{
     setTimeout(()=>{
      RNBootSplash.hide({ fade: true });
     },1000)
  },[])
  return (
      <ApplicationProvider {...eva} theme={eva.light}>

    <Provider store={store}>
      <NavigationContainer>
        <PersistGate
          loading={
            // eslint-disable-next-line react/jsx-wrap-multilines
            <View style={styles.container}>
              <ActivityIndicator color={colors.red} />
            </View>
          }
          persistor={persistor}
          >
          <AppView />
        </PersistGate>
      </NavigationContainer>
    </Provider>
  </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
