import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { firebaseAuth, firebaseFirestore } from '../config/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { setUser, setLoading } from '../store/authSlice';
import Splash from '../pages/splash';
import Welcome from '../pages/welcome';
import Login from '../pages/login';
import Home from '../pages/home';
import TaskDetails from '../pages/taskDetails';
import Settings from '../pages/settings';
import EditProfile from '../pages/editProfile';
import ChangePassword from '../pages/changePassword';

import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isAuthenticated, isLoading, isRegistering } = useAppSelector(
        (state) => state.auth,
    );
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(firebaseAuth(), async (user: User | null) => {
            if (user) {
                try {
                    const userDocRef = doc(firebaseFirestore(), 'users', user.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const firestoreData = userDoc.data();
                        const plainUser = JSON.parse(JSON.stringify(user));
                        const mergedUser = {
                            ...plainUser,
                            photoURL: firestoreData.photoURL || plainUser.photoURL,
                            displayName: firestoreData.displayName || plainUser.displayName,
                        };
                        dispatch(setUser(mergedUser));
                    } else {
                        dispatch(setUser(user));
                    }
                } catch (error) {
                    dispatch(setUser(user));
                }
            } else {
                dispatch(setUser(null));
            }
            dispatch(setLoading(false));
        });

        return unsubscribe;
    }, [dispatch]);
    const handleSplashFinish = () => {
        setShowSplash(false);
    };

    if (showSplash || isLoading) {
        return <Splash onFinish={handleSplashFinish} />;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                {!isAuthenticated || isRegistering ? (
                    <Stack.Group screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Welcome" component={Welcome} />
                        <Stack.Screen name="Login" component={Login} />
                    </Stack.Group>
                ) : (
                    <>
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="Settings" component={Settings} />
                        <Stack.Screen name="EditProfile" component={EditProfile} />
                        <Stack.Screen name="ChangePassword" component={ChangePassword} />
                        <Stack.Screen
                            name="TaskDetails"
                            component={TaskDetails}
                            options={{
                                presentation: 'modal',
                            }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
