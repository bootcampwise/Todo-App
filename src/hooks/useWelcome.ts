import { useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { firebaseAuth } from '../config/firebase';

const WEB_CLIENT_ID = process.env.EXPO_PUBLIC_WEB_CLIENT_ID;

export const useWelcome = () => {
    const navigation = useNavigation<any>();
    const auth = firebaseAuth();

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: WEB_CLIENT_ID,
            offlineAccess: false,
        });
    }, []);

    const handleLogin = () => {
        navigation.navigate('Login', { isSignUp: false });
    };

    const handleRegister = () => {
        navigation.navigate('Login', { isSignUp: true });
    };

    const signInWithGoogle = async () => {
        try {
            if (Platform.OS === 'android') {
                await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            }

            const response = await GoogleSignin.signIn();

            if (response.type !== 'success') {
                throw new Error('Google Sign-In was cancelled or failed');
            }

            const { idToken } = response.data;

            if (!idToken) {
                throw new Error('No ID token found');
            }

            const googleCredential = GoogleAuthProvider.credential(idToken);
            await signInWithCredential(auth, googleCredential);

        } catch (error) {
            Alert.alert('Sign-In Error', (error as Error).message);
        }
    };

    return {
        handleLogin,
        handleRegister,
        signInWithGoogle,
    };
};
