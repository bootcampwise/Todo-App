import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { firebaseAuth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { clearUser } from '../store/authSlice';

export const useSettings = () => {
    const navigation = useNavigation<any>();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    const handleLogout = async () => {
        try {
            dispatch(clearUser());
            await signOut(firebaseAuth());
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred';
            Alert.alert('Error', message);
        }
    };

    const handleChangePassword = () => {
        navigation.navigate('ChangePassword');
    };

    const handleEditProfile = () => {
        navigation.navigate('EditProfile');
    };

    return {
        user,
        handleLogout,
        handleChangePassword,
        handleEditProfile,
    };
};
