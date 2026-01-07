import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../constants/theme';
import { useTaskDetails } from '../hooks/useTaskDetails';
import CustomDatePicker from '../components/customDatePicker/CustomDatePicker';
import { Dropdown } from 'react-native-element-dropdown';

const TaskDetails = () => {
    const navigation = useNavigation();
    const {
        mode,
        setMode,
        title,
        setTitle,
        notes,
        setNotes,
        tag,
        setTag,
        remindAt,
        setRemindAt,
        isDatePickerVisible,
        setDatePickerVisible,
        loading,
        handleSave,
        handleDelete,
        formatReminderDate,
        task,
    } = useTaskDetails();

    const tagData = [
        { label: 'Normal', value: 'normal' },
        { label: 'Urgent', value: 'urgent' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#B7B7B7" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                    {mode === 'view' ? 'Task Details' : task ? 'Edit Task' : 'Add New Task'}
                </Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Input task title..."
                        placeholderTextColor={COLORS.light.textSecondary}
                        editable={mode !== 'view'}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Notes</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={notes}
                        onChangeText={setNotes}
                        placeholder="Input task notes..."
                        placeholderTextColor={COLORS.light.textSecondary}
                        multiline
                        textAlignVertical="top"
                        editable={mode !== 'view'}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Tags</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={tagData}
                        search={false}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="-Select tags-"
                        value={tag}
                        onChange={item => {
                            setTag(item.value);
                        }}
                        disable={mode === 'view'}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.sectionHeader}>Remind Me</Text>
                    <View style={styles.reminderBox}>
                        <View>
                            <Text style={styles.reminderLabel}>Date & Time</Text>
                            <Text style={styles.reminderValue}>
                                {remindAt ? formatReminderDate(remindAt) : 'No reminder set'}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => setDatePickerVisible(true)}
                            disabled={mode === 'view'}>
                            <Ionicons name="create-outline" size={24} color={COLORS.light.textSecondary} />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {mode === 'view' ? (
                !task?.completed && (
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={() => setMode('edit')}>
                            <Text style={styles.saveButtonText}>Edit Task</Text>
                        </TouchableOpacity>
                    </View>
                )
            ) : (
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[styles.saveButton, loading && styles.saveButtonDisabled]}
                        onPress={handleSave}
                        disabled={loading}>
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.saveButtonText}>Save Task</Text>
                        )}
                    </TouchableOpacity>
                </View>
            )}

            <CustomDatePicker
                visible={isDatePickerVisible}
                onClose={() => setDatePickerVisible(false)}
                onSelectDate={(date) => setRemindAt(date)}
                initialDate={remindAt}
            />
        </SafeAreaView>
    );
};

import { styles } from '../styles/pages/taskDetailsStyles';

export default TaskDetails;
