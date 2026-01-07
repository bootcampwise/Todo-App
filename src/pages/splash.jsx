import React from 'react';
import { View, Image } from 'react-native';
import { useSplash } from '../hooks/useSplash';
import { styles } from '../styles/pages/splashStyles';

const Splash = ({ onFinish }) => {
    const { isDarkMode } = useSplash(onFinish);

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: '#FFFFFF',
                },
            ]}>
            <Image
                source={require('../assets/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
        </View>
    );
};

export default Splash;
