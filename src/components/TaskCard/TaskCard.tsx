import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, SHADOWS } from '../../constants/theme';
import type { Task } from '../../store/taskSlice';

interface TaskCardProps {
    task: Task;
    onPress: () => void;
    onEdit: () => void;
    onToggleComplete: () => void;
    onDelete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
    task,
    onPress,
    onEdit,
    onToggleComplete,
    onDelete,
}) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
    const menuButtonRef = useRef<React.ElementRef<typeof TouchableOpacity>>(null);

    const tagColor = task.tag === 'urgent' ? COLORS.light.urgent : COLORS.light.normal;
    const isPastDue = task.remindAt && new Date(task.remindAt) < new Date() && !task.completed;

    const handleMenuPress = () => {
        menuButtonRef.current?.measureInWindow((px, py, width, height) => {
            setMenuPosition({
                top: py + height + 4,
                right: Dimensions.get('window').width - px - width,
            });
            setMenuVisible(true);
        });
    };

    const closeMenu = () => {
        setMenuVisible(false);
    };

    const handleEdit = () => {
        closeMenu();
        onEdit();
    };

    const handleDelete = () => {
        setMenuVisible(false);
        setTimeout(() => {
            onDelete();
        }, 300);
    };

    const formatReminder = (date: Date) => {
        const now = new Date();
        const isToday = date.getDate() === now.getDate() &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear();

        if (isToday) {
            return 'Today — ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        }

        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) +
            ' — ' +
            date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity
                style={[styles.card, task.completed && styles.cardCompleted]}
                onPress={onPress}
                activeOpacity={0.9}
            >
                <View style={styles.header}>
                    <Text
                        style={[
                            styles.title,
                            task.completed && styles.titleCompleted,
                        ]}
                        numberOfLines={1}
                    >
                        {task.title}
                    </Text>
                    <TouchableOpacity
                        ref={menuButtonRef}
                        onPress={handleMenuPress}
                        style={styles.menuButton}
                    >
                        <Ionicons name="ellipsis-vertical" size={18} color={COLORS.light.textLime} />
                    </TouchableOpacity>
                </View>

                {task.remindAt ? (
                    <Text style={styles.dateText}>
                        {formatReminder(task.remindAt)}
                    </Text>
                ) : (
                    <Text style={styles.dateText}>No Date</Text>
                )}

                {task.notes ? (
                    <Text
                        style={[styles.notes, task.completed && styles.notesCompleted]}
                        numberOfLines={2}
                    >
                        {task.notes}
                    </Text>
                ) : null}

                <View style={styles.footerContainer}>
                    <View style={[styles.tag, { backgroundColor: tagColor }]}>
                        <Text style={styles.tagText}>
                            {task.tag.charAt(0).toUpperCase() + task.tag.slice(1)}
                        </Text>
                    </View>

                    {isPastDue && (
                        <TouchableOpacity
                            style={styles.completeButton}
                            onPress={() => {
                                onToggleComplete();
                            }}
                        >
                            <Ionicons name="checkmark-circle-outline" size={16} color="#fff" style={{ marginRight: 4 }} />
                            <Text style={styles.completeButtonText}>Complete</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </TouchableOpacity>

            <Modal
                visible={menuVisible}
                transparent
                animationType="fade"
                onRequestClose={closeMenu}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={closeMenu}
                >
                    <View style={[
                        styles.menuContainer,
                        {
                            position: 'absolute',
                            top: menuPosition.top,
                            right: menuPosition.right + SPACING.md,
                        }
                    ]}>
                        {!task.completed && (
                            <>
                                <TouchableOpacity style={styles.menuItem} onPress={handleEdit}>
                                    <Text style={styles.menuText}>Edit Task</Text>
                                </TouchableOpacity>
                                <View style={styles.menuDivider} />
                            </>
                        )}
                        <TouchableOpacity style={styles.menuItem} onPress={handleDelete}>
                            <Text style={[styles.menuText, styles.deleteText]}>Delete Task</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

import { styles } from '../../styles/components/taskCardStyles';

export default React.memo(TaskCard);
