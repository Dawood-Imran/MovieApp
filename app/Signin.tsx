import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { my_auth } from "../Firebase";
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import Toast from './components/Toast';
import { useAuth } from '../app/context/AuthContext';
import { useRouter } from 'expo-router';

export default function SignIn() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push('/(tabs)/movies');
        }
    }, [user]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);  
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const handleSignIn = () => {
        router.push('/Signup');
    };

    async function SignInWithEmail() {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(my_auth, email, password);
            alert('User signed in successfully!');
            router.push('/(tabs)/movies');
        } catch (error) {
            console.log(error);
            setToastMessage('Sign In failed: ' + error.message);
            setToastVisible(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Movie4U</Text>

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

            <TouchableOpacity style={styles.button} onPress={SignInWithEmail} disabled={loading}>
                {loading ? (
                    <ActivityIndicator size="small" color="#1c1c1c" />
                ) : (
                    <Text style={styles.buttonText}>Sign In</Text>
                )}
            </TouchableOpacity>

            <Text style={styles.prompt}>
                Don't have an account?{' '}
                <Text style={styles.link} onPress={() => router.push('/Signup')}>
                    Sign Up
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
