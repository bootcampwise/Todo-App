import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, SPACING, SHADOWS } from '../../constants/theme';

export const styles = StyleSheet.create({
    cardContainer: {
        marginBottom: SPACING.xs,
    },
    card: {
        padding: SPACING.lg,
        paddingBottom: SPACING.md,
    },
    cardCompleted: {
        opacity: 0.5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 3,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.light.text,
        flex: 1,
        marginRight: SPACING.sm,
    },
    titleCompleted: {
        textDecorationLine: 'line-through',
        color: COLORS.light.textSecondary,
    },
    menuButton: {
        padding: 4,
        marginTop: -4,
        marginRight: -4,
    },
    dateText: {
        fontSize: 12,
        color: COLORS.light.textSecondary,
        marginBottom: 6,
    },
    notes: {
        fontSize: 14,
        color: '#0B0A11',
        marginBottom: SPACING.md,
        lineHeight: 20,
    },
    notesCompleted: {
        textDecorationLine: 'line-through',
        color: COLORS.light.textSecondary,
    },
    tagContainer: {
        flexDirection: 'row',
    },
    tag: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
    },
    tagText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#fff',
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    completeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.light.primary,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
        ...SHADOWS.small,
    },
    completeButtonText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    menuContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 4,
        width: 150,
        ...SHADOWS.medium,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    menuItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    menuText: {
        fontSize: 14,
        color: COLORS.light.text,
    },
    menuDivider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginHorizontal: 16,
    },
    deleteText: {
        color: '#BA1735',
    },
});
