import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const Toast = ({ message, visible }) => {
    const opacity = new Animated.Value(0);

    React.useEffect(() => {
        if (visible) {
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                setTimeout(() => {
                    Animated.timing(opacity, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }).start();
                }, 2000);
            });
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <Animated.View style={[styles.toast, { opacity }]}>
            <Text style={styles.toastText}>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    toast: {
        position: 'absolute',
        bottom: 50,
        left: '50%',
        transform: [{ translateX: -150 }],
        backgroundColor: 'rgba(95, 183, 184, 0.7)',
        padding: 10,
        borderRadius: 5,
        width: 300,
        alignItems: 'center',
    },
    toastText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default Toast; 