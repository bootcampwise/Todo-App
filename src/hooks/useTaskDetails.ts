import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { doc, updateDoc, deleteDoc, Timestamp, collection, addDoc } from 'firebase/firestore';
import { firebaseFirestore, firebaseAuth } from '../config/firebase';
import { FirebaseError } from 'firebase/app';
import { Task } from '../store/taskSlice';

type TaskDetailsRouteParams = {
    TaskDetails: {
        task?: any;
        date?: string;
        mode?: 'create' | 'view' | 'edit';
    };
};

export const useTaskDetails = () => {
    const navigation = useNavigation<any>();
    const route = useRoute<RouteProp<TaskDetailsRouteParams, 'TaskDetails'>>();
    const { task, date, mode: initialMode } = route.params || {};
    const [mode, setMode] = useState<'create' | 'view' | 'edit'>(initialMode || 'create');

    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');
    const [tag, setTag] = useState<string | null>(null);
    const [remindAt, setRemindAt] = useState<Date | null>(null);
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setNotes(task.notes || '');
            setTag(task.tag || 'normal');
            if (task.remindAt) {
                setRemindAt(new Date(task.remindAt));
            }
        } else if (date) {
            const initialDate = new Date(date);
            initialDate.setHours(9, 0, 0, 0);
            setRemindAt(initialDate);
        }
    }, [task, date]);

    const handleSave = async () => {
        if (!title.trim()) {
            Alert.alert('Error', 'Please enter a task title');
            return;
        }

        setLoading(true);
        try {
            const user = firebaseAuth().currentUser;
            if (!user) {
                Alert.alert('Error', 'You must be logged in to save tasks');
                return;
            }

            const taskData: any = {
                title,
                notes,
                tag: tag || 'normal',
                remindAt: remindAt ? Timestamp.fromDate(remindAt) : null,
                updatedAt: Timestamp.now(),
                userId: user.uid,
                completed: task ? task.completed : false,
            };

            if (task) {
                await updateDoc(doc(firebaseFirestore(), 'tasks', task.id), taskData);
            } else {
                await addDoc(collection(firebaseFirestore(), 'tasks'), {
                    ...taskData,
                    createdAt: Timestamp.now(),
                });
            }

            navigation.goBack();
        } catch (error) {
            const message = error instanceof FirebaseError ? error.message : (error as Error).message;
            Alert.alert('Error', 'Failed to save task: ' + message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!task) return;

        Alert.alert(
            'Delete Task',
            'Are you sure you want to delete this task?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        setLoading(true);
                        try {
                            await deleteDoc(doc(firebaseFirestore(), 'tasks', task.id));
                            navigation.goBack();
                        } catch (error) {
                            Alert.alert('Error', 'Failed to delete task');
                        } finally {
                            setLoading(false);
                        }
                    },
                },
            ]
        );
    };

    const formatReminderDate = (date: Date) => {
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }) + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return {
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
    };
};
