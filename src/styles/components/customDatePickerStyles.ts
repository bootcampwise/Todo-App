import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants/theme';

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: SPACING.lg,
        paddingBottom: SPACING.xl,
        minHeight: 480,
    },
    handleBar: {
        width: 40,
        height: 4,
        backgroundColor: '#E0E0E0',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: SPACING.md,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.lg,
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        left: 0,
        zIndex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.light.text,
        textAlign: 'center',
        flex: 1,
    },
    monthNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F0F0F0',
        borderRadius: BORDER_RADIUS.sm,
        padding: SPACING.sm,
        marginBottom: SPACING.lg,
    },
    monthText: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.light.text,
    },
    weekDaysRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: SPACING.sm,
    },
    weekDayText: {
        fontSize: 12,
        color: COLORS.light.textSecondary,
        width: 32,
        textAlign: 'center',
    },
    calendarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginBottom: SPACING.lg,
    },
    dayCell: {
        width: (Dimensions.get('window').width - SPACING.lg * 2) / 7,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },
    selectedDayCell: {
        backgroundColor: '#8BC34A',
        borderRadius: 8,
    },
    dayText: {
        fontSize: 14,
        color: COLORS.light.text,
    },
    selectedDayText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    disabledDayCell: {
        opacity: 0.3,
    },
    disabledDayText: {
        color: COLORS.light.textSecondary,
    },
    selectedDateDisplay: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.light.text,
        textAlign: 'center',
        marginBottom: SPACING.lg,
        marginTop: SPACING.sm,
    },
    confirmButton: {
        backgroundColor: '#8BC34A',
        paddingVertical: 16,
        borderRadius: BORDER_RADIUS.md,
        alignItems: 'center',
    },
    confirmButtonDisabled: {
        opacity: 0.5,
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    timePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.xl,
        paddingVertical: SPACING.lg,
    },
    timeColumn: {
        alignItems: 'center',
        marginHorizontal: SPACING.md,
    },
    timeLabel: {
        fontSize: 12,
        color: COLORS.light.textSecondary,
        marginBottom: SPACING.sm,
    },
    timeValue: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.light.text,
        marginVertical: SPACING.sm,
    },
    timeSeparator: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.light.text,
        marginTop: 10,
    },
    ampmButton: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
        marginVertical: 2,
    },
    ampmText: {
        fontSize: 16,
        color: COLORS.light.textSecondary,
        fontWeight: 'bold',
    },
    activeAmPm: {
        color: COLORS.light.primary,
        fontSize: 20,
    },
});
