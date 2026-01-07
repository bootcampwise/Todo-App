import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useAppDispatch } from '../store/hooks';
import { firebaseAuth, firebaseFirestore } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';
import { setUser, setError, setIsRegistering } from '../store/authSlice';

type LoginRouteParams = {
    Login: {
        isSignUp?: boolean;
    };
};

export const useLogin = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<any>();
    const route = useRoute<RouteProp<LoginRouteParams, 'Login'>>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isSignUp, setIsSignUp] = useState(route.params?.isSignUp ?? false);
    const [loading, setLoadingState] = useState(false);
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);

    const handleEmailAuth = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter email and password');
            return;
        }

        if (isSignUp && (!fullName || !phoneNumber)) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (isSignUp && !isTermsAccepted) {
            Alert.alert('Error', 'Please agree to the Terms & Conditions to register.');
            return;
        }

        if (isSignUp && password.length < 6) {
            Alert.alert('Error', 'Password should be at least 6 characters.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Error', 'Please enter a valid email address.');
            return;
        }

        setLoadingState(true);

        try {
            let userCredential: UserCredential;
            if (isSignUp) {
                dispatch(setIsRegistering(true));
                userCredential = await createUserWithEmailAndPassword(
                    firebaseAuth(),
                    email,
                    password,
                );

                try {
                    await setDoc(doc(firebaseFirestore(), 'users', userCredential.user.uid), {
                        fullName,
                        displayName: fullName,
                        phoneNumber,
                        email,
                        createdAt: Timestamp.fromDate(new Date()),
                    });

                    const docSnap = await getDoc(doc(firebaseFirestore(), 'users', userCredential.user.uid));
                    if (!docSnap.exists()) {
                        throw new Error('Data verification failed: Document not found after save.');
                    }
                } catch (firestoreError) {
                    const message = firestoreError instanceof FirebaseError ? firestoreError.message : (firestoreError as Error).message;
                    Alert.alert('Warning', 'Account created but profile data could not be saved: ' + message);
                }

                await signOut(firebaseAuth());
                dispatch(setIsRegistering(false));

                Alert.alert(
                    'Success',
                    'Account created successfully! Please login with your credentials.',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                setIsSignUp(false);
                                setPassword('');
                            },
                        },
                    ],
                );
                return;
            } else {
                userCredential = await signInWithEmailAndPassword(
                    firebaseAuth(),
                    email,
                    password,
                );
            }
            dispatch(setUser(userCredential.user));
        } catch (error) {
            dispatch(setIsRegistering(false));
            let errorMessage = 'An error occurred. Please try again.';

            if (error instanceof FirebaseError) {
                if (error.code === 'auth/email-already-in-use') {
                    errorMessage = 'This email is already registered. Please login instead.';
                } else if (error.code === 'auth/invalid-email') {
                    errorMessage = 'Please enter a valid email address.';
                } else if (error.code === 'auth/weak-password') {
                    errorMessage = 'Password should be at least 6 characters.';
                } else if (error.code === 'auth/user-not-found') {
                    errorMessage = 'No account found with this email.';
                } else if (error.code === 'auth/wrong-password') {
                    errorMessage = 'Incorrect password. Please try again.';
                } else if (error.code === 'auth/invalid-credential') {
                    errorMessage = 'Invalid email or password.';
                } else if (error.code === 'auth/too-many-requests') {
                    errorMessage = 'Too many failed attempts. Please try again later.';
                }
            }

            dispatch(setError(errorMessage));
            Alert.alert('Error', errorMessage);
            return;
        } finally {
            setLoadingState(false);
        }
    };

    const toggleMode = () => {
        setIsSignUp(!isSignUp);
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        fullName,
        setFullName,
        phoneNumber,
        setPhoneNumber,
        isSignUp,
        loading,
        isTermsAccepted,
        setIsTermsAccepted,
        handleEmailAuth,
        toggleMode,
    };
};
