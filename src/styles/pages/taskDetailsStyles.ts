import { StyleSheet } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.light.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.md,
        backgroundColor: COLORS.light.background,
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
        flex: 1,
    },
    contentContainer: {
        padding: SPACING.lg,
    },
    inputGroup: {
        marginBottom: SPACING.lg,
    },
    label: {
        fontSize: 12,
        marginBottom: SPACING.xs,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.light.border,
        borderRadius: BORDER_RADIUS.sm,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm + 4,
        fontSize: 14,
        color: COLORS.light.text,
        backgroundColor: '#fff',
    },
    textArea: {
        minHeight: 100,
    },
    dropdown: {
        height: 50,
        borderColor: COLORS.light.border,
        borderWidth: 1,
        borderRadius: BORDER_RADIUS.sm,
        paddingLeft: 10,
        paddingRight: 8,
        backgroundColor: '#fff',
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 14,
        color: COLORS.light.textSecondary,
        marginLeft: 5,
    },
    selectedTextStyle: {
        fontSize: 14,
        color: COLORS.light.text,
        marginLeft: 5,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    sectionHeader: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.light.text,
        marginBottom: SPACING.md,
    },
    reminderBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.light.border,
        borderRadius: BORDER_RADIUS.sm,
        padding: SPACING.md,
        backgroundColor: '#fff',
    },
    reminderLabel: {
        fontSize: 12,
        color: COLORS.light.textSecondary,
        marginBottom: 4,
    },
    reminderValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.light.text,
    },
    footer: {
        padding: SPACING.lg,
        backgroundColor: COLORS.light.background,
    },
    saveButton: {
        backgroundColor: COLORS.light.primary,
        paddingVertical: 16,
        borderRadius: BORDER_RADIUS.sm,
        alignItems: 'center',
    },
    saveButtonDisabled: {
        opacity: 0.7,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
