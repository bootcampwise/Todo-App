import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useChangePassword } from '../hooks/useChangePassword';
import Input from '../components/input/Input';
import Button from '../components/button/Button';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS } from '../constants/theme';
import { globalStyles } from '../styles/globalStyles';

const ChangePassword = () => {
    const navigation = useNavigation();
    const {
        oldPassword,
        setOldPassword,
        newPassword,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,
        isLoading,
        handleChangePassword,
    } = useChangePassword();

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.light.textSecondary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Change Password</Text>
                <View style={{ width: 24 }} />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.content}>
                    <Text style={styles.description}>
                        Enter your current password and choose a new password
                    </Text>

                    <View style={styles.form}>
                        <Input
                            label="Current Password"
                            placeholder="Enter your current password"
                            value={oldPassword}
                            onChangeText={setOldPassword}
                            secureTextEntry
                            autoCapitalize="none"
                        />

                        <Input
                            label="New Password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry
                            autoCapitalize="none"
                        />

                        <Input
                            label="Re-type New Password"
                            placeholder="Re-enter new password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                            autoCapitalize="none"
                        />
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <Button
                        title="Save Changes"
                        onPress={handleChangePassword}
                        loading={isLoading}
                        style={styles.saveButton}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

import { styles } from '../styles/pages/changePasswordStyles';

export default ChangePassword;
