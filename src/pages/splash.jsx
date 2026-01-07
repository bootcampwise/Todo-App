import React from 'react';
import { View, Image } from 'react-native';
import { useSplash } from '../hooks/useSplash';
import { styles } from '../styles/pages/splashStyles';
import { IMAGES } from '../styles/images';


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
                source={IMAGES.LOGO}
                style={styles.logo}
                resizeMode="contain"
            />

        </View>
    );
};

export default Splash;
