import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API calls
import { useNavigation } from '@react-navigation/native';

export default function AddProduct() {
  // State to store form input values
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const navigation = useNavigation();
  // Handler to submit product data
  const handleAddProduct = async () => {
    try {
      const response = await axios.post('https://dummyjson.com/products/add', {
        name: productName,
        description: productDescription,
        price: productPrice,
      });
      // You can handle success or show a success message here
      console.log('Product added successfully:', response.data);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <View style={styles.container}>
         <TouchableOpacity onPress={()=>navigation.goBack()}><Text>Back</Text></TouchableOpacity>
      <Text style={styles.header}>Add Product</Text>
      
      {/* Product Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={setProductName}
      />
      
      {/* Product Description Input */}
      <TextInput
        style={styles.input}
        placeholder="Product Description"
        value={productDescription}
        onChangeText={setProductDescription}
      />
      
      {/* Product Price Input */}
      <TextInput
        style={styles.input}
        placeholder="Product Price"
        value={productPrice}
        onChangeText={setProductPrice}
        keyboardType="numeric"
      />
      
      {/* Submit Button */}
      <Button title="Add Product" onPress={handleAddProduct} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
});
