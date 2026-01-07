import React from 'react';
import {
    TouchableOpacity,
    Text,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { COLORS } from '../../constants/theme';
import { styles } from '../../styles/components/buttonStyles';

export enum ButtonVariant {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    OUTLINE = 'outline',
}

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: ButtonVariant;
    disabled?: boolean;
    loading?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = ButtonVariant.PRIMARY,
    disabled = false,
    loading = false,
    style,
    textStyle,
}) => {
    const getButtonStyle = () => {
        switch (variant) {
            case ButtonVariant.SECONDARY:
                return styles.buttonSecondary;
            case ButtonVariant.OUTLINE:
                return styles.buttonOutline;
            default:
                return styles.buttonPrimary;
        }
    };

    const getTextStyle = () => {
        if (variant === ButtonVariant.OUTLINE) {
            return styles.buttonTextOutline;
        }
        return styles.buttonText;
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                getButtonStyle(),
                disabled && styles.buttonDisabled,
                style,
            ]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}>
            {loading ? (
                <ActivityIndicator
                    color={variant === ButtonVariant.OUTLINE ? COLORS.light.primary : COLORS.light.background}
                />
            ) : (
                <Text style={[getTextStyle(), textStyle]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

export default Button;
