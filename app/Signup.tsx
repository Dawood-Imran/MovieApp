import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { my_auth, db } from "../Firebase";
import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'expo-router';
import { doc, setDoc } from "firebase/firestore"; 
import Toast from './components/Toast'; // Import Toast component
import { useAuth } from '../app/context/AuthContext';

export default function SignUp() {
    const { user } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [age, setAge] = useState('');
    const [loading, setLoading] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const router = useRouter();

    

    async function registerUser() {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(my_auth, email, password);
            const userRef = doc(db, "users", response.user.uid);
            await setDoc(userRef, { userName, email, age });
            setToastMessage('User registered successfully!');
            setToastVisible(true);
            router.push('/Signin');
        } catch (error) {
            console.error("Error registering user:", error);
            setToastMessage('Registration failed: ' + error.message);
            setToastVisible(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Join Movie4U</Text>

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

            <TouchableOpacity style={styles.button} onPress={registerUser} disabled={loading}>
                {loading ? (
                    <ActivityIndicator size="small" color="#1c1c1c" />
                ) : (
                    <Text style={styles.buttonText}>Sign Up</Text>
                )}
            </TouchableOpacity>

            <Text style={styles.prompt}>
                Already have an account?{' '}
                <Text style={styles.link} onPress={() => router.push('/Signin')}>
                    Sign In
                </Text>
            </Text>

            <Toast message={toastMessage} visible={toastVisible} />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1c1c1c', // Dark background for movie theme
        padding: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#f9c74f', // Gold color for a cinematic feel
        marginBottom: 24,
    },
    label: {
        alignSelf: 'flex-start',
        fontSize: 16,
        color: 'white',
        marginBottom: 8,
        marginLeft: 40,

    },
    input: {
        width: '80%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#f9c74f',
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: '#333', // Dark input background
        color: '#fff', // White text for input
    },
    button: {
        backgroundColor: '#f9c74f',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
        marginTop: 8,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#1c1c1c',
        fontSize: 16,
        fontWeight: 'bold',
    },
    prompt: {
        marginTop: 20,
        color: '#f9c74f',
    },
    link: {
        color: '#f9c74f',
        fontWeight: 'bold',
    },
});
