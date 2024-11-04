import { useEffect } from 'react';
import axios from 'axios';
import { Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useQuery } from 'react-query';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
let Shim = createShimmerPlaceholder(LinearGradient)


const Home = () => {

    const fetchProducts = async () => {
        // console.log("woked");
        try {
            // const { data } = await axios.get('http://localhost:3000/test');
            const { data } = await axios.get('https://dummyjson.com/products')
            // https://jsonplaceholder.typicode.com/posts
            // console.log(data);
            return data;
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };


    let { data, isLoading, error } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts
    })
    console.log(data, "faaiz")
    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
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
        return <View><Text>{error?.message}kk </Text></View>
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
                data={data.products}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={()=>{
                        Alert.alert(`you have added ${item?.title}`)
                    }}>
                        
                  
                        <View style={styles.img}>
                            <Image
                                source={{ uri: item.thumbnail }}
                                style={styles.img}
                                resizeMode="cover"
                            />
                        </View>
                        <View style={styles.Mytitle}><Text>title:&nbsp;{item?.title}</Text></View>
                        <View style={styles.price}><Text>price:&nbsp;{item?.price}</Text></View>
                    
                    </TouchableOpacity>
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

    }
});
export default Home;
