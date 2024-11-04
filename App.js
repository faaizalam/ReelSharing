

import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Home from './src/Sharing/Home';
import Product from './src/Sharing/Product';
import SplashScreen from './SplashScreen';



const Stack = createNativeStackNavigator();
function App(){
  let [isSplash,setIsSplash]=useState(true)
  

  useEffect(()=>{
    let timer=setTimeout(()=>{
      setIsSplash(false)
    },3000)
   return(()=>clearTimeout(timer))
  },[])

  // if(isSplash){
  //   return <SplashScreen/>
    
    

  // }

  
  const config={
    screens:{
      product:"user/:id",
      Home:"reel/:id"

    }
  }
  let linking={
    prefixes:["http://localhost:3000"],
    config
  }



  return (

    <NavigationContainer linking={linking}>
    <Stack.Navigator  initialRouteName="splash" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="product" component={Product} />
      <Stack.Screen name="splash" component={SplashScreen} />
    </Stack.Navigator>
  </NavigationContainer>
   
 
  );
}

const styles = StyleSheet.create({
 
});

export default App;
