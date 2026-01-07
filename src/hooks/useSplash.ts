import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

export const useSplash = (onFinish: () => void) => {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish();
        }, 1000);

        return () => clearTimeout(timer);
    }, [onFinish]);

    return {
        isDarkMode,
    };
};
