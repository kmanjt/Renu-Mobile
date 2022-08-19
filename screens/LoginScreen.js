import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateCurrentUser, updateProfile } from 'firebase/auth';
import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import { auth } from '../firebase-config';

const LoginScreen = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [displayName, setDisplayName] = useState("");
    const navigation = useNavigation();

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            return updateProfile(user, {displayName: displayName});
        })
        .catch(err => {
            alert(err.message)
        });
    };

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
        })
        .catch(err => {
            alert(err.message)
        })
    };

    useEffect(() => {

          const unsubscribe = onAuthStateChanged(auth, (user) => {
            // if user is null, then we force them to login
            if (user) {
            navigation.replace("Home")
            }
          });
    
          return unsubscribe;
      }, []);
    

    return (
        <KeyboardAvoidingView
        style={styles.container}
        behaviour="padding">

            <View style={styles.inputContainer}>
                <TextInput 
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
                
                />
                <TextInput 
                placeholder="Username"
                style={styles.input}
                value={displayName}
                onChangeText={text => setDisplayName(text)}
                
                />
                <TextInput 
                placeholder="Password"
                style={styles.input}
                secureTextEntry
                value={password}
                onChangeText={text => setPassword(text)}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                onPress={handleLogin}
                style={styles.button}>
                
                <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={handleSignUp}
                style={[styles.button, styles.buttonOutline]}>
                
                <Text style={styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },        
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
});