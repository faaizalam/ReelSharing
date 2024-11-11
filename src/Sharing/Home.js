import { useEffect } from 'react';
import axios from 'axios';
import { Alert, FlatList, Image, SafeAreaView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useQuery } from 'react-query';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
let Shim = createShimmerPlaceholder(LinearGradient)


const Home = () => {

    const fetchProducts = async () => {
       
        try {
          
            const { data } = await axios.get('https://dummyjson.com/products')
           
            return data;
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };


    let { data, isLoading, error } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts
    })
    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>

<FlatList horizontal style={styles.category} data={Array.from({length:3})}
             showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                    <View style={styles.catData}>
                        <View  style={styles.imgCat}>  
                            
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
        return <View><Text>{error?.message} </Text></View>
    }



    const handelShare=(item)=>{
        let product=`https://deeplinkthree-89cvdw8v.b4a.run/share/product/${item.id}`
        let message=product
        Share.share({
            message:`check out this product ${product}`
        }).then(()=>{
            console.log("successfully")
        }).catch((err)=>{
            console.log(err)
        })

    }
    return (
        <SafeAreaView style={styles.container}>
            <FlatList horizontal style={styles.category} data={data.products}
             showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                    <View style={styles.catData}>
                        <View  style={styles.imgCat}>  
                            
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

            <FlatList
                style={styles.products}
                data={data?.products}
                renderItem={({ item }) => (
                    <View
                    style={{padding:5}}
                    >
                 
                        
                  
                        <View style={styles.img}>
                            <Image
                                source={{ uri: item.thumbnail }}
                                style={styles.img}
                                resizeMode="cover"
                            />
                        </View>
                      
                        <View>
                        
                        <View  style={{flexDirection:"row",width:"100%"}}>
                            
                        <View><Text style={styles.Mytitle}>title:&nbsp;{item?.title}</Text></View> 
                       <TouchableOpacity onPress={()=>{
                        handelShare(item)
                       }}><View><Text>Share</Text></View></TouchableOpacity> 
                        </View>
                        <TouchableOpacity  style={{width:100,height:40,backgroundColor:"purple",
                                justifyContent:"center",
                                borderRadius:10,
                        }} onPress={()=>{
                        Alert.alert(`you have added ${item?.title}`)
                    }}
                    ><Text style={{color:"white",textAlign:"center",
               
                    }}>Add To Cart</Text></TouchableOpacity>
                        <View style={styles.price}><Text>price:&nbsp;{item?.price}</Text></View>
                        </View>

                    
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()} // Adding a key extractor is a best practice
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
       fontWeight:"bold"
        // backgroundColor: '#e0e0e0',
    },
    desc: {
        width: '80%',
        height: 15,
        borderRadius: 4,
        backgroundColor: '#e0e0e0',
    },
    
    category:{
        padding:5,
        height:150,
        width:"100%",
       
        
    },
    catData:{
        marginRight: 10,
        width: 120,
        alignItems: 'center',
    },
    imgCat:{
        width: 100,
        height: 100,
        marginBottom: 5,
        borderRadius: 8,

    },
    roundImg:{
        height:80,
        width:80,
        borderRadius:10,
        elevation:10
    },
    price:{
        marginTop:10
    }
});
export default Home;
