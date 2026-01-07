import { StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../../constants/theme';

export const styles = StyleSheet.create({
    button: {
        borderRadius: BORDER_RADIUS.md,
        padding: SPACING.md,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 48,
    },
    buttonPrimary: {
        backgroundColor: COLORS.light.primary,
    },
    buttonSecondary: {
        backgroundColor: COLORS.light.secondary,
    },
    buttonOutline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: COLORS.light.primary,
    },
    buttonText: {
        fontSize: TYPOGRAPHY.fontSize.md,
        fontWeight: TYPOGRAPHY.fontWeight.semibold,
        color: COLORS.light.background,
    },
    buttonTextOutline: {
        fontSize: TYPOGRAPHY.fontSize.md,
        fontWeight: TYPOGRAPHY.fontWeight.semibold,
        color: COLORS.light.primary,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
});
