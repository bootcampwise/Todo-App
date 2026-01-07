import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput,
    Modal,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useHome } from '../hooks/useHome';
import TaskCard from '../components/taskCard/TaskCard';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';
import { globalStyles } from '../styles/globalStyles';
import { Ionicons, Octicons } from '@expo/vector-icons';
import CustomDatePicker from '../components/customDatePicker/CustomDatePicker';
import { Shadow } from 'react-native-shadow-2';

const Home = () => {
    const navigation = useNavigation();
    const {
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
    } = useHome();

    const renderEmptyState = () => (
        <View style={styles.emptyState}>
            <View style={styles.illustration}>
                <Image
                    source={require('../assets/empty_state.png')}
                    style={styles.emptyStateImage}
                    resizeMode="contain"
                />
            </View>
            <Text style={styles.emptyStateTitle}>No Task</Text>
            <Text style={styles.emptyStateSubtitle}>
                Looks like you don't have a task,{'\n'}please add task
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.header}>
                {selectionMode ? (
                    <TouchableOpacity onPress={handleCancelSelection}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                        <Ionicons name="menu-outline" size={28} color={COLORS.light.textLime} />
                    </TouchableOpacity>
                )}

                <View style={styles.logoContainer}>
                    {selectionMode ? (
                        <Text style={styles.selectionTitle}>{selectedTasks.length} Selected</Text>
                    ) : (
                        <Image
                            source={require('../assets/taski_logo.png')}
                            style={styles.logoImage}
                            resizeMode="contain"
                        />
                    )}
                </View>

                {selectionMode ? (
                    <TouchableOpacity onPress={handleDeleteSelected}>
                        <Ionicons name="trash-outline" size={18} color={COLORS.light.error} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={handleMenuPress}>
                        <Ionicons name="ellipsis-vertical" size={18} color={COLORS.light.textLime} />
                    </TouchableOpacity>
                )}
            </View>

            <View style={[styles.searchContainer, { borderWidth: tasks.length === 0 ? 0 : 1 }]}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search task here..."
                    placeholderTextColor={COLORS.light.textSecondary}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <Ionicons name="search-outline" size={24} color={'#B7B7B7'} style={styles.searchIcon} />
            </View>

            <FlatList
                data={sortedTasks}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.taskCardWrapper}>
                        {selectionMode && (
                            <TouchableOpacity
                                style={styles.checkbox}
                                onPress={() => handleToggleTaskSelection(item.id)}
                            >
                                <Ionicons
                                    name={selectedTasks.includes(item.id) ? "checkbox" : "square-outline"}
                                    size={24}
                                    color={selectedTasks.includes(item.id) ? COLORS.light.primary : COLORS.light.textSecondary}
                                />
                            </TouchableOpacity>
                        )}
                        <View style={{ flex: 1 }}>
                            <TaskCard
                                task={item}
                                onPress={() => selectionMode ? handleToggleTaskSelection(item.id) : handleViewTask(item)}
                                onEdit={() => handleEditTask(item)}
                                onToggleComplete={() => toggleComplete(item.id)}
                                onDelete={() => handleDeleteTask(item.id, item.title)}
                            />
                        </View>
                    </View>
                )}
                extraData={tasks}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={!isLoading ? renderEmptyState : null}
                refreshing={isLoading}
            />

            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <Octicons name="home" size={24} color={COLORS.light.primary} />
                    <Text style={[styles.navLabel, { color: '#000' }]}>List View</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.addButtonContainer} onPress={handleAddTask}>
                    <Shadow
                        distance={3}
                        startColor={'rgba(0,0,0,0.03)'}
                        offset={[0, -3]}
                    >
                        <View style={styles.addButton}>
                            <Octicons name="home" size={24} color="#fff" />
                        </View>
                    </Shadow>
                    <Text style={styles.navLabel}>Add Task</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={handleCalendarPress}>
                    <Octicons name="calendar" size={24} color={COLORS.light.textLime} />
                    <Text style={styles.navLabel}>Calendar View</Text>
                </TouchableOpacity>
            </View>

            <Modal
                visible={menuVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setMenuVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setMenuVisible(false)}
                >
                    <View style={styles.menuContainer}>
                        <TouchableOpacity style={styles.menuItem} onPress={handleEnterSelectionMode}>
                            <Text style={styles.menuText}>Select</Text>
                        </TouchableOpacity>
                        <View style={styles.menuDivider} />
                        <TouchableOpacity style={styles.menuItem} onPress={handleSelectAll}>
                            <Text style={styles.menuText}>Select All</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

            <CustomDatePicker
                visible={isCalendarVisible}
                onClose={() => setCalendarVisible(false)}
                onSelectDate={handleDateSelect}
                initialDate={new Date()}
            />
        </SafeAreaView>
    );
};

import { styles } from '../styles/pages/homeStyles';

export default Home;
