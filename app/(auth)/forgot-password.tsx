
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import FormField from '../../components/FormField';

import CustomButton from '../../components/CustomButton';
import { Ionicons } from '@expo/vector-icons';
import { account } from '../../lib/appwrite';
import { router } from 'expo-router';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleBackToSignIn = () => {
    router.push('/(auth)/sign-in');
  };

  const [loading, setLoading] = useState(false);
  const handleSendResetLink = async () => {
    setLoading(true);
    try {
      await account.createRecovery(email, 'https://your-app.com/reset-password');
      // Show success message (implement your own UI)
    } catch (error: any) {
      // Show error to user (implement your own error UI)
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4 py-8">
          <View className="flex-1 items-center justify-center">
            <TouchableOpacity onPress={handleBackToSignIn} className="mb-6 flex-row items-center self-start">
              <Ionicons name="arrow-back-outline" size={18} color="#3A5BFF" />
              <Text className="ml-1 font-psemibold text-myblue text-sm">Back to Sign In</Text>
            </TouchableOpacity>

            <Text className="mb-2 font-pbold text-2xl text-myblack text-center">Forgot Password?</Text>
            <Text className="mb-6 text-center font-pregular text-xs text-gray-500">
              Enter your email address and we'll send you a link to reset your password
            </Text>

            <View className="w-full rounded-2xl bg-white p-6 shadow-md">
              <FormField
                title="Email"
                value={email}
                placeholder="Enter your email"
                handleChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                OtherStyles="mb-4"
              />
              <CustomButton
                title="Send Reset Link"
                onPress={handleSendResetLink}
                loading={loading}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPassword;