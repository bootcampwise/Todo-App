import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { firebaseAuth } from '../config/firebase';
import { FirebaseError } from 'firebase/app';

export const useChangePassword = () => {
    const navigation = useNavigation<any>();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChangePassword = async () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'New passwords do not match');
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert('Error', 'New password should be at least 6 characters');
            return;
        }

        if (oldPassword === newPassword) {
            Alert.alert('Error', 'New password must be different from old password');
            return;
        }

        setIsLoading(true);
        try {
            const user = firebaseAuth().currentUser;
            if (!user || !user.email) {
                Alert.alert('Error', 'User not found');
                return;
            }

            const credential = EmailAuthProvider.credential(user.email, oldPassword);
            await reauthenticateWithCredential(user, credential);

            await updatePassword(user, newPassword);

            Alert.alert('Success', 'Password changed successfully!', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        } catch (error) {
            let errorMessage = 'Failed to change password. Please try again.';
            if (error instanceof FirebaseError) {
                if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                    errorMessage = 'Old password is incorrect';
                } else if (error.code === 'auth/weak-password') {
                    errorMessage = 'New password is too weak';
                } else if (error.code === 'auth/requires-recent-login') {
                    errorMessage = 'Please log out and log in again before changing password';
                }
            }
            Alert.alert('Error', errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        oldPassword,
        setOldPassword,
        newPassword,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,
        isLoading,
        handleChangePassword,
    };
};
