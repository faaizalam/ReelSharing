import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function ProductInfo({ route }: any) {
  const { item } = route.params;
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={()=>navigation.goBack()}><Text>Back</Text></TouchableOpacity>
      <View style={styles.header}>
        <Image source={{ uri: item?.thumbnail }} style={styles.thumbnail} />
        <Text style={styles.title}>{item?.title}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.description}>{item?.description}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Category:</Text>
          <Text>{item?.category}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Price:</Text>
          <Text>${item?.price.toFixed(2)}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Brand:</Text>
          <Text>{item?.brand}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Rating:</Text>
          <Text>{item?.rating} ⭐</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Stock:</Text>
          <Text>{item?.stock > 0 ? 'In Stock' : 'Out of Stock'}</Text>
        </View>

        <Text style={styles.label}>Tags:</Text>
        <View style={styles.tagsContainer}>
          {item?.tags?.map((tag:any, index:number) => (
            <Text key={index} style={styles.tag}>
              {tag}
            </Text>
          ))}
        </View>

        <Text style={styles.label}>Dimensions:</Text>
        <Text>Width: {item?.dimensions?.width} cm</Text>
        <Text>Height: {item?.dimensions?.height} cm</Text>
        <Text>Depth: {item?.dimensions?.depth} cm</Text>

        <Text style={styles.label}>Warranty Information:</Text>
        <Text>{item?.warrantyInformation}</Text>

        <Text style={styles.label}>Shipping Information:</Text>
        <Text>{item?.shippingInformation}</Text>

        <Text style={styles.label}>Availability Status:</Text>
        <Text>{item?.availabilityStatus}</Text>

        <Text style={styles.label}>Return Policy:</Text>
        <Text>{item?.returnPolicy}</Text>

        <Text style={styles.label}>Reviews:</Text>
        {item?.reviews?.map((review:any, index:number) => (
          <View key={index} style={styles.review}>
            <Text style={styles.reviewName}>{review.reviewerName}</Text>
            <Text>{review.comment}</Text>
            <Text>Rating: {review.rating} ⭐</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tagsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginVertical: 10,
  },
  tag: {
    backgroundColor: '#e0e0e0',
    color: '#333',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 5,
    marginBottom: 5,
    fontSize: 12,
  },
  review: {
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  reviewName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
