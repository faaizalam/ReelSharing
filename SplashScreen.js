import { View, Text, Linking } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const SplashScreen = () => {

const navigate=useNavigation()

    const handleDeepLink=(e,deepType)=>{
        let {url}=e
        let uri=typeof url === 'string';;

        console.log(uri,deepType,"kk",url)
        if (!uri) {
            handleNoUrlCase()
            return
        }

        const path = url.replace(/^https?:\/\/[^/]+/, '');
        const matchUser = path.match(/^\/share\/user\/(\d+)$/);
        const matchReel = path.match(/^\/share\/reel\/(\d+)$/);
        if (matchUser) {
          console.log(matchUser)
          const id = matchUser[1]; // Extracted ID
          navigate.navigate("product", { id });
        }else if(matchReel){
          const id = matchReel[1]; // Extracted ID
          navigate.navigate("Home", { id });

        }


    }

    let handleNoUrlCase=()=>{
      console.log("no case")
    setTimeout(()=>{
   navigate.navigate("Home")
  },1000)
    }
    useEffect(()=>{
        Linking.getInitialURL().then((url)=>{
            handleDeepLink({url},"close")
        })

        Linking.addEventListener("url",(e)=>{
            handleDeepLink(e,"resume")

        })
    })
  return (
    <View>
      <Text>SplashScreen</Text>
    </View>
  )
}

export default SplashScreen