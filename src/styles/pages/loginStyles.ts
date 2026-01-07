import { StyleSheet, Platform } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';

export const styles = StyleSheet.create({
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.md,
    },
    backButton: {
        padding: SPACING.sm,
    },
    backButtonText: {
        fontSize: 24,
        color: COLORS.light.text,
    },
    headerTitle: {
        fontSize: TYPOGRAPHY.fontSize.lg,
        fontWeight: TYPOGRAPHY.fontWeight.bold,
        color: COLORS.light.text,
    },
    placeholder: {
        width: 40,
    },
    content: {
        flex: 1,
        padding: SPACING.lg,
        paddingTop: SPACING.sm,
        justifyContent: 'space-between',
    },
    bottomSection: {
        marginTop: SPACING.xl,
    },
    title: {
        fontSize: 26,
        fontWeight: TYPOGRAPHY.fontWeight.bold,
        color: COLORS.light.text,
        marginBottom: SPACING.xs,
    },
    subtitle: {
        fontSize: TYPOGRAPHY.fontSize.sm,
        color: COLORS.light.textSecondary,
        marginBottom: SPACING.lg,
        lineHeight: 24,
    },
    form: {
        marginTop: SPACING.md,
    },
    authButton: {
        marginTop: SPACING.xl,
        marginBottom: SPACING.lg,
        backgroundColor: COLORS.light.primary,
        borderRadius: 4,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        fontSize: TYPOGRAPHY.fontSize.sm,
        color: COLORS.light.textSecondary,
    },
    footerLink: {
        fontSize: TYPOGRAPHY.fontSize.sm,
        color: COLORS.light.primary,
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: COLORS.light.primary,
        borderRadius: 4,
        marginRight: SPACING.sm,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: COLORS.light.primary,
    },
    checkmark: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    termsText: {
        fontSize: TYPOGRAPHY.fontSize.sm,
        color: COLORS.light.textSecondary,
    },
    termsHighlight: {
        color: COLORS.light.primary,
    },
});
