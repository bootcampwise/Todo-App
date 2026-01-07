import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useSettings } from '../hooks/useSettings';
import { COLORS, SPACING } from '../constants/theme';
import { globalStyles } from '../styles/globalStyles';

const Settings = () => {
    const navigation = useNavigation();
    const { user, handleLogout, handleChangePassword, handleEditProfile } = useSettings();

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#B7B7B7" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.profileContainer}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: user?.photoURL || 'https://i.pravatar.cc/150?img=12' }}
                            style={styles.avatar}
                        />
                    </View>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{user?.displayName || 'Zak Brawn'}</Text>
                        <Text style={styles.userEmail}>{user?.email || 'zakbrawn10@email.com'}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={handleEditProfile}
                    >
                        <Feather name="edit" size={20} color="#B7B7B7" />
                    </TouchableOpacity>
                </View>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionHeaderText}>About</Text>
                </View>
                <View style={styles.menuContainer}>
                    <TouchableOpacity style={styles.menuItem} onPress={handleChangePassword}>
                        <Text style={styles.menuItemText}>Change Password</Text>
                        <Ionicons name="chevron-forward" size={20} color="#B7B7B7" />
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                        <Text style={[styles.menuItemText, styles.signOutText]}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Todo App</Text>
            </View>
        </SafeAreaView>
    );
};

import { styles } from '../styles/pages/settingsStyles';

export default Settings;
