import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity } from "react-native";
import { my_auth } from "../components/Firebase";
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    async function SignInWithEmail() {
    try {
      const response = await signInWithEmailAndPassword(my_auth, email, password);
      alert('User signed in successfully!');
      navigation.navigate('UserProfile', { userId: response.user.uid });
    } catch (error) {
      console.log(error);
      alert('Sign In failed: ' + error);
    }
  }

  return(
    <View style={styles.container}>
    <Text style={styles.title}>Welcome</Text>

    <Text style={styles.label}>Email:</Text>
    <TextInput
      value={email}
      style={styles.input}
      placeholder="email@address.com"
      onChangeText={(newText) => setEmail(newText)}
    />

    <Text style={styles.label}>Password:</Text>
    <TextInput
      value={password}
      style={styles.input}
      placeholder="Password"
      secureTextEntry={true}
      autoCapitalize="none"
      onChangeText={(newText) => setPassword(newText)}
    />

    <TouchableOpacity style={styles.button} onPress={SignInWithEmail}>
      <Text style={styles.buttonText}>Sign In</Text>
    </TouchableOpacity>
    
    <StatusBar style="auto" />
  </View>
  );


}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f8f9fa',
      padding: 16,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 24,
    },
    label: {
      alignSelf: 'flex-start',
      fontSize: 16,
      color: '#555',
      marginBottom: 8,
      marginLeft: 40,
    },
    input: {
      width: '80%',
      padding: 12,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      marginBottom: 16,
      backgroundColor: '#fff',
    },
    button: {
      backgroundColor: '#007bff',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 8,
      marginTop: 8,
      width: '80%',
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });