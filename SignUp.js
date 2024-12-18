import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity } from "react-native";
import { my_auth,db } from "../components/Firebase";
import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { doc, setDoc } from "firebase/firestore"; 


export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [age, setAge] = useState('');
  const navigation = useNavigation();

  async function registerUser() {
    try {
      // Step 1: Create user with email and password
      const response = await createUserWithEmailAndPassword(my_auth, email, password);
      
      // Step 2: Store additional data in Firestore
      const userRef = doc(db, "users", response.user.uid);
      await setDoc(userRef, { userName, email, age });
      navigation.navigate('SignIn');

      console.log("User registered and additional info saved");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  }
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>

      <Text style={styles.label}>UserName:</Text>
      <TextInput
        value={userName}
        style={styles.input}
        placeholder="username"
        onChangeText={(newText) => setUserName(newText)}
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        value={email}
        style={styles.input}
        placeholder="email@address.com"
        onChangeText={(newText) => setEmail(newText)}
      />

      <Text style={styles.label}>Age:</Text>
      <TextInput
        value={age}
        style={styles.input}
        placeholder="age"
        onChangeText={(newText) => setAge(newText)}
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

      <TouchableOpacity style={styles.button} onPress={registerUser}>
        <Text style={styles.buttonText}>Sign Up</Text>
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
    