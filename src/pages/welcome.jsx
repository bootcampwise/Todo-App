import React from 'react';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWelcome } from '../hooks/useWelcome';
import Button from '../components/button/Button';
import { globalStyles } from '../styles/globalStyles';
import { styles } from '../styles/pages/welcomeStyles';

const Welcome = () => {
    const { handleLogin, handleRegister, signInWithGoogle } = useWelcome();

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.content}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../assets/logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.illustrationContainer}>
                    <Image
                        source={require('../assets/welcome_illustration.png')}
                        style={styles.illustration}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.title}>Start with taski</Text>
                    <Text style={styles.subtitle}>
                        Join us now and get your daily things right
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        title="Login"
                        onPress={handleLogin}
                        style={styles.loginButton}
                    />
                    <Button
                        title="Register"
                        onPress={handleRegister}
                        variant="outline"
                        style={styles.registerButton}
                    />
                    <Button
                        title="Sign in with Google"
                        onPress={signInWithGoogle}
                        variant="outline"
                        style={styles.googleButton}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Welcome;
