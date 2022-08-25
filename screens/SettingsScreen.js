import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const SettingsScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
        <Text
        onPress={() => navigation.navigate('Home')}
        style={{fontSize:26, fontWeight:'bold'}}>Settings Screen</Text>
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

export default SettingsScreen;