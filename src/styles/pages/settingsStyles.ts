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
        padding: SPACING.md,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    avatarContainer: {
        marginRight: SPACING.md,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.light.surface,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.light.text,
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: COLORS.light.textSecondary,
    },
    editButton: {
        padding: 8,
    },
    sectionHeader: {
        backgroundColor: '#F5F5F5',
        paddingVertical: SPACING.sm,
        paddingHorizontal: SPACING.md,
        marginHorizontal: -SPACING.lg,
        marginBottom: SPACING.md,
        alignItems: 'center',
    },
    sectionHeaderText: {
        fontSize: 14,
        color: COLORS.light.textSecondary,
        textAlign: 'center',
    },
    menuContainer: {
        marginBottom: SPACING.xl,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: SPACING.md,
    },
    menuItemText: {
        fontSize: 16,
        color: COLORS.light.textSecondary,
    },
    signOutText: {
        color: '#BA1735',
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.light.border,
        marginVertical: 4,
    },
    footer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.lg,
    },
    footerText: {
        fontSize: 14,
        color: '#afafb5ff',
    },
});
