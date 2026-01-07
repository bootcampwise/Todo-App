import { useState, useMemo } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTasks } from './useTasks';
import { Task } from '../store/taskSlice';

export const useHome = () => {
    const navigation = useNavigation<any>();
    const { tasks, isLoading, deleteTask, toggleComplete } = useTasks();
    const [isCalendarVisible, setCalendarVisible] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [selectionMode, setSelectionMode] = useState(false);
    const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const sortedTasks = useMemo(() => {
        const now = new Date();

        const filteredTasks = tasks.filter(task =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.notes.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const upcoming = filteredTasks.filter(task =>
            !task.completed && task.remindAt && new Date(task.remindAt) > now
        );

        const others = filteredTasks.filter(task =>
            task.completed || !task.remindAt || new Date(task.remindAt) <= now
        );

        upcoming.sort((a, b) => {
            const dateA = new Date(a.remindAt!).getTime();
            const dateB = new Date(b.remindAt!).getTime();
            return dateA - dateB;
        });

        others.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateB - dateA;
        });

        return [...upcoming, ...others];
    }, [tasks, searchQuery]);

    const handleAddTask = () => {
        navigation.navigate('TaskDetails', { mode: 'create' });
    };

    const handleViewTask = (task: Task) => {
        const serializedTask = {
            ...task,
            remindAt: task.remindAt?.toISOString() || null,
            createdAt: task.createdAt.toISOString(),
            updatedAt: task.updatedAt.toISOString(),
        };
        navigation.navigate('TaskDetails', { mode: 'view', task: serializedTask });
    };

    const handleEditTask = (task: Task) => {
        const serializedTask = {
            ...task,
            remindAt: task.remindAt?.toISOString() || null,
            createdAt: task.createdAt.toISOString(),
            updatedAt: task.updatedAt.toISOString(),
        };
        navigation.navigate('TaskDetails', { mode: 'edit', task: serializedTask });
    };

    const handleDeleteTask = (taskId: string, taskTitle: string) => {
        Alert.alert('Delete Task', `Are you sure you want to delete "${taskTitle}"?`, [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: () => {
                    deleteTask(taskId);
                },
            },
        ]);
    };

    const handleCalendarPress = () => {
        setCalendarVisible(true);
    };

    const handleDateSelect = (date: Date) => {
        setCalendarVisible(false);
        navigation.navigate('TaskDetails', { mode: 'create', date: date.toISOString() });
    };

    const handleMenuPress = () => {
        setMenuVisible(true);
    };

    const handleSelectAll = () => {
        setMenuVisible(false);
        setSelectionMode(true);
        setSelectedTasks(tasks.map(task => task.id));
    };

    const handleEnterSelectionMode = () => {
        setMenuVisible(false);
        setSelectionMode(true);
        setSelectedTasks([]);
    };

    const handleToggleTaskSelection = (taskId: string) => {
        if (selectedTasks.includes(taskId)) {
            setSelectedTasks(selectedTasks.filter(id => id !== taskId));
        } else {
            setSelectedTasks([...selectedTasks, taskId]);
        }
    };

    const handleCancelSelection = () => {
        setSelectionMode(false);
        setSelectedTasks([]);
    };

    const handleDeleteSelected = () => {
        if (selectedTasks.length === 0) {
            Alert.alert('No Tasks Selected', 'Please select at least one task to delete.');
            return;
        }

        Alert.alert(
            'Delete Tasks',
            `Are you sure you want to delete ${selectedTasks.length} task(s)?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        selectedTasks.forEach(taskId => deleteTask(taskId));
                        setSelectionMode(false);
                        setSelectedTasks([]);
                    },
                },
            ]
        );
    };

    return {
        tasks,
        isLoading,
        isCalendarVisible,
        setCalendarVisible,
        menuVisible,
        setMenuVisible,
        selectionMode,
        selectedTasks,
        searchQuery,
        setSearchQuery,
        sortedTasks,
        handleAddTask,
        handleViewTask,
        handleEditTask,
        handleDeleteTask,
        handleCalendarPress,
        handleDateSelect,
        handleMenuPress,
        handleSelectAll,
        handleEnterSelectionMode,
        handleToggleTaskSelection,
        handleCancelSelection,
        handleDeleteSelected,
        toggleComplete,
    };
};
