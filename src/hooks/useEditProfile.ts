import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateProfile } from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';
import { doc, setDoc } from 'firebase/firestore';
import { firebaseAuth, firebaseFirestore } from '../config/firebase';
import { FirebaseError } from 'firebase/app';
import { setUser } from '../store/authSlice';

export const useEditProfile = () => {
    const navigation = useNavigation<any>();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    const [fullName, setFullName] = useState(user?.displayName || '');
    const [email, setEmail] = useState(user?.email || '');
    const [image, setImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.3,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const convertImageToBase64 = async (uri: string): Promise<string> => {
        try {
            const response = await fetch(uri);
            const blob = await response.blob();

            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64 = reader.result as string;
                    resolve(base64);
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            throw error;
        }
    };

    const handleSaveChanges = async () => {
        if (!fullName.trim()) {
            Alert.alert('Error', 'Full Name cannot be empty.');
            return;
        }

        setIsLoading(true);
        try {
            const authUser = firebaseAuth().currentUser;
            if (authUser) {
                let photoURL = user?.photoURL || null;

                if (image) {
                    const base64 = await convertImageToBase64(image);
                    
                    if (base64.length > 1000000) {
                        Alert.alert('Error', 'The selected image is too large even after compression. Please try a smaller image.');
                        setIsLoading(false);
                        return;
                    }
                    
                    photoURL = base64;
                }

                const userDocRef = doc(firebaseFirestore(), 'users', authUser.uid);
                await setDoc(userDocRef, {
                    displayName: fullName,
                    email: authUser.email,
                    photoURL: photoURL,
                }, { merge: true });

                await updateProfile(authUser, {
                    displayName: fullName,
                });

                const plainUser = JSON.parse(JSON.stringify(user));
                const updatedUser = {
                    ...plainUser,
                    displayName: fullName,
                    photoURL: photoURL,
                };
                dispatch(setUser(updatedUser));

                Alert.alert('Success', 'Profile updated successfully!', [
                    { text: 'OK', onPress: () => navigation.goBack() }
                ]);
            } else {
                Alert.alert('Error', 'User not found.');
            }
        } catch (error) {
            const message = error instanceof FirebaseError ? error.message : (error as Error).message;
            Alert.alert('Error', message);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        fullName,
        setFullName,
        email,
        setEmail,
        image,
        isLoading,
        pickImage,
        handleSaveChanges,
        user,
    };
};
