import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import axios from 'axios';

const DetailsScreen = () => {
    const navigation = useNavigation();

    const [blogs, setBlogs]= useState([]);


    function fetchBlogs() {
        axios
        .get("https://www.renu-ireland.com/api/blog/")
        .then(res => {
            setBlogs(res.data);
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
      fetchBlogs();
    }, [])
    
    const { width } = useWindowDimensions();

    return (
        <View style={styles.container}>
        {blogs.map((blogPost, index) => (
        <View key={index}>
        <Text>{blogPost.title}</Text>
        <Text>{blogPost.author}</Text>
        <Text>{blogPost.date_created}</Text>
        <Text>{blogPost.category}</Text>
        <Text>{blogPost.excerpt}</Text>
        <RenderHtml
        contentWidth={width}
        source={{html: blogPost.content}}
        />
        <Image
        source={{
          uri: blogPost.thumbnail
        }}
      />
        </View>
        ))}
        
        <Text
        onPress={() => navigation.navigate('Home')}
        style={{fontSize:26, fontWeight:'bold'}}>Details Screen</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
});

export default DetailsScreen;