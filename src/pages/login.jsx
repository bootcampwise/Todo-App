import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useLogin } from '../hooks/useLogin';
import Button from '../components/button/Button';
import Input from '../components/input/Input';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/theme';
import { globalStyles } from '../styles/globalStyles';

const Login = () => {
    const navigation = useNavigation();
    const {
        email,
        setEmail,
        password,
        setPassword,
        fullName,
        setFullName,
        phoneNumber,
        setPhoneNumber,
        isSignUp,
        loading,
        isTermsAccepted,
        setIsTermsAccepted,
        handleEmailAuth,
        toggleMode,
    } = useLogin();

    return (
        <SafeAreaView style={globalStyles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled">

                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color="#B7B7B7" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>{isSignUp ? 'Register' : 'Login'}</Text>
                        <View style={styles.placeholder} />
                    </View>

                    <View style={styles.content}>
                        <View>
                            <Text style={styles.title}>
                                {isSignUp ? 'Join us today.' : 'Welcome Back.'}
                            </Text>
                            <Text style={styles.subtitle}>
                                {isSignUp
                                    ? 'It’s Nice too see you, let’s start'
                                    : 'It’s Nice too see you again, let’s get going'}
                            </Text>

                            <View style={styles.form}>
                                {isSignUp && (
                                    <Input
                                        label="Full Name"
                                        placeholder="Enter your full name"
                                        value={fullName}
                                        onChangeText={setFullName}
                                        autoCapitalize="words"
                                        autoComplete="name"
                                    />
                                )}

                                <Input
                                    label="Email Address"
                                    placeholder="yourname@email.com"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoComplete="email"
                                />

                                {isSignUp && (
                                    <Input
                                        label="Phone Number"
                                        placeholder="Enter your phone number"
                                        value={phoneNumber}
                                        onChangeText={(text) => setPhoneNumber(text.replace(/[^0-9+]/g, ''))}
                                        keyboardType="phone-pad"
                                        autoComplete="tel"
                                    />
                                )}

                                <Input
                                    label="Password"
                                    placeholder="Input password here..."
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                    autoCapitalize="none"
                                />

                                {isSignUp && (
                                    <TouchableOpacity
                                        style={styles.termsContainer}
                                        onPress={() => setIsTermsAccepted(!isTermsAccepted)}
                                        activeOpacity={0.7}
                                    >
                                        <View style={[
                                            styles.checkbox,
                                            isTermsAccepted && styles.checkboxChecked
                                        ]}>
                                            {isTermsAccepted && (
                                                <Text style={styles.checkmark}>✓</Text>
                                            )}
                                        </View>
                                        <Text style={styles.termsText}>
                                            I Agree with <Text style={styles.termsHighlight}>Term & Conditions</Text>
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <View style={[styles.bottomSection, { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.lg }]}>
                <Button
                    title={isSignUp ? 'Register' : 'Login'}
                    onPress={handleEmailAuth}
                    loading={loading}
                    style={styles.authButton}
                />

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        {isSignUp ? 'Already have Account? ' : 'Don’t have an account? '}
                    </Text>
                    <TouchableOpacity onPress={toggleMode}>
                        <Text style={styles.footerLink}>
                            {isSignUp ? 'Login' : 'Register'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

import { styles } from '../styles/pages/loginStyles';

export default Login;
