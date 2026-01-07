import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../constants/theme';

export const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.md,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.light.text,
    },
    content: {
        padding: SPACING.lg,
    },
    description: {
        fontSize: 14,
        color: COLORS.light.textSecondary,
        marginBottom: SPACING.xl,
        lineHeight: 20,
    },
    form: {
        gap: SPACING.md,
    },
    footer: {
        padding: SPACING.lg,
        paddingBottom: SPACING.xl,
    },
    saveButton: {
        backgroundColor: COLORS.light.primary,
    },
});
