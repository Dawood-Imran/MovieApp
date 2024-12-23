import { StyleSheet, View, Text, Button } from 'react-native';
import { my_auth } from '../../Firebase';
import { signOut } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'expo-router';

export default function TabTwoScreen() {
    const { user } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut(my_auth);
            router.push('/Signin');
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Account</Text>
            {user ? (
                <>
                    <Text style={styles.userText}>Welcome, {user.email}</Text>
                    
                    <Button title="Logout" onPress={handleLogout} />
                </>
            ) : (
                <Text style={styles.userText}>You are not logged in.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color:'white'
    },
    userText: {
        fontSize: 16,
        marginVertical: 10,
        color:'white'
    },
});
