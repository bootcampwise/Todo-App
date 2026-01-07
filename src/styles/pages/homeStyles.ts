import { StyleSheet } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';

export const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        backgroundColor: COLORS.light.background,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoImage: {
        width: 66,
        height: 17,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: SPACING.lg,
        marginBottom: SPACING.xs,
        borderWidth: 1,
        borderColor: '#D2D2D2',
        borderRadius: 4,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.xs,
        marginTop: SPACING.md,
    },
    searchInput: {
        flex: 1,
        fontSize: TYPOGRAPHY.fontSize.md,
        color: COLORS.light.text,
        paddingVertical: SPACING.sm,
    },
    searchIcon: {
        marginLeft: SPACING.sm,
    },
    listContent: {
        padding: SPACING.md,
        flexGrow: 1,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SPACING.xxl * 2,
    },
    illustration: {
        width: 120,
        height: 80,
        marginBottom: SPACING.lg,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyStateImage: {
        width: 202,
        height: 100,
    },
    emptyStateTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.light.text,
        marginBottom: SPACING.sm,
    },
    emptyStateSubtitle: {
        fontSize: TYPOGRAPHY.fontSize.sm,
        color: COLORS.light.textSecondary,
        textAlign: 'center',
        lineHeight: 18,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        paddingVertical: SPACING.sm,
        backgroundColor: COLORS.light.background,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navLabel: {
        fontSize: 12,
        color: COLORS.light.textLime,
        marginTop: 4,
    },
    addButtonContainer: {
        flex: 1,
        alignItems: 'center',
    },
    addButton: {
        width: 50,
        height: 50,
        borderRadius: 28,
        backgroundColor: COLORS.light.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#ffffff',
        marginBottom: 1,
    },
    cancelText: {
        fontSize: 16,
        color: COLORS.light.primary,
        fontWeight: '600',
    },
    selectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.light.text,
    },
    taskCardWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingTop: 60,
        paddingRight: SPACING.lg,
    },
    menuContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 4,
        width: 150,
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
});
