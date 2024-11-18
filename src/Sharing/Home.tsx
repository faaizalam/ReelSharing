import { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, FlatList, Image, SafeAreaView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useQuery } from 'react-query';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { ProductType, typeErrorString } from './components/type';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
let Shim = createShimmerPlaceholder(LinearGradient)



// types.ts or navigation.ts
export type RootStackParamList = {
    Home: undefined; // The Home screen doesn't need parameters
    ProductDetails: { item: ProductType }; // The ProductDetails screen expects an `item` parameter
    AddProduct: undefined; // The AddProduct screen doesn't require any parameters
  };
  

const Home = () => {

    let [data, setData] = useState<ProductType[]>([]);
    // Define the type of navigation you're using
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const fetchProducts = async () => {
        try {
          const response = await axios.get('https://dummyjson.com/products');
          return response.data.products; // Assuming the correct path for the products array
        } catch (error) {
          console.error('Error fetching products:', error);
          throw error; // Throwing the error to let React Query handle it
        }
      };
    const { data: queryData, isLoading, error } = useQuery<ProductType[]>({
        queryKey: ['products'],
        queryFn: fetchProducts,
      });
    
      // When data from the query changes, update the state
      useEffect(() => {
        if (queryData) {
          setData(queryData); // Update state with the fetched data
        }
      }, [queryData]); // Run whenever `queryData` changes
    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>

                <FlatList horizontal style={styles.category} data={Array.from({ length: 3 })}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.catData}>
                            <View style={styles.imgCat}>

                                <Shim style={styles.roundImg}></Shim>

                            </View>
                            {/* <View style={styles.Mytitle}><Text>title:&nbsp;{item?.title}</Text></View> */}
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                ></FlatList>
                <FlatList
                    data={Array.from({ length: 4 })}
                    renderItem={() => (
                        <View style={styles.shimmerContainer}>
                            {/* <Shim style={styles.shimmer} > */}

                            <Shim style={styles.img}></Shim>
                            <Shim style={styles.title}></Shim>
                            <Shim style={styles.price}></Shim>

                            {/* </Shim> */}
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </SafeAreaView>
        );
    }

    if (error) {
        return <View><Text>{(error as typeErrorString)?.message} </Text></View>
    }



    const handelShare = (item: ProductType) => {
        let product = `https://deeplinkthree-89cvdw8v.b4a.run/share/product/${item.id}`
        let message = product
        Share.share({
            message: `check out this product ${product}`
        }).then(() => {
            console.log("successfully")
        }).catch((err) => {
            console.log(err)
        })

    }
    return (
        <SafeAreaView style={styles.container}>
            <FlatList horizontal style={styles.category} data={data}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.catData}>
                        <View style={styles.imgCat}>

                            <Image
                                source={{ uri: item.thumbnail }}
                                style={styles.img}
                                resizeMode="cover"
                            />
                        </View>
                        {/* <View style={styles.Mytitle}><Text>title:&nbsp;{item?.title}</Text></View> */}
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            ></FlatList>
             <TouchableOpacity style={{backgroundColor:"black",width:150,height:60,borderRadius:10,justifyContent:"center",alignItems:"center"}}
        
        onPress={() => navigation.navigate('AddProduct')} // Navigates to AddProduct screen
      >
        <Text style={{margin:10,fontSize:20,color:"white"}} >Add Products</Text>
      </TouchableOpacity>
            <FlatList

                data={data}
                renderItem={({ item }) => (
                    <View
                        style={{ padding: 5 }}
                    >

                        <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { item })}>
                            <View style={styles.img}>
                                <Image
                                    source={{ uri: item.thumbnail }}
                                    style={styles.img}
                                    resizeMode="cover"
                                />
                            </View>
                        </TouchableOpacity>



                        <View>

                            <View style={{ flexDirection: "row", width: "100%" }}>

                                <View><Text style={styles.Mytitle}>title:&nbsp;{item?.title}</Text></View>
                                <TouchableOpacity onPress={() => {
                                    handelShare(item)
                                }}><View><Text>Share</Text></View></TouchableOpacity>
                            </View>
                            <TouchableOpacity style={{
                                width: 100, height: 40, backgroundColor: "purple",
                                justifyContent: "center",
                                borderRadius: 10,
                            }} onPress={() => {
                                Alert.alert(`you have added ${item?.title}`)
                            }}
                            ><Text style={{
                                color: "white", textAlign: "center",

                            }}>Add To Cart</Text></TouchableOpacity>
                            <View style={styles.price}><Text>price:&nbsp;{item?.price}</Text></View>
                        </View>


                    </View>
                )}
                keyExtractor={(item) => item.id!.toString()}

            />

        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    shimmerContainer: {
        marginBottom: 16,
    },
    shimmer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    img: {
        width: '100%',
        height: 100,
        borderRadius: 8,
        marginBottom: 8,
        backgroundColor: '#e0e0e0',
    },
    title: {
        width: '60%',
        height: 20,
        borderRadius: 4,
        marginBottom: 8,
        backgroundColor: '#e0e0e0',
    },
    Mytitle: {
        width: '60%',
        height: 20,
        borderRadius: 4,
        marginBottom: 8,
        fontWeight: "bold"
        // backgroundColor: '#e0e0e0',
    },
    desc: {
        width: '80%',
        height: 15,
        borderRadius: 4,
        backgroundColor: '#e0e0e0',
    },

    category: {
        padding: 5,
        height: 150,
        width: "100%",


    },
    catData: {
        marginRight: 10,
        width: 120,
        alignItems: 'center',
    },
    imgCat: {
        width: 100,
        height: 100,
        marginBottom: 5,
        borderRadius: 8,

    },
    roundImg: {
        height: 80,
        width: 80,
        borderRadius: 10,
        elevation: 10
    },
    price: {
        marginTop: 10
    }
});
export default Home;
