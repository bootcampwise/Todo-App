import { StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants/theme';

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
        alignItems: 'center',
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: SPACING.xl,
        marginTop: SPACING.xs,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.light.surface,
    },
    editIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.light.text,
        width: 24,
        height: 24,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.light.background,
    },
    formContainer: {
        width: '100%',
    },
    inputGroup: {
        marginBottom: SPACING.lg,
    },
    label: {
        fontSize: 14,
        color: COLORS.light.text,
        marginBottom: SPACING.xs,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.light.border,
        borderRadius: BORDER_RADIUS.sm,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        fontSize: 16,
        color: COLORS.light.text,
        backgroundColor: COLORS.light.background,
    },
    footer: {
        padding: SPACING.lg,
        paddingBottom: SPACING.xl,
    },
    saveButton: {
        backgroundColor: '#7EBB4F',
        paddingVertical: SPACING.md,
        borderRadius: BORDER_RADIUS.sm,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
