

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
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import { account } from '../../lib/appwrite';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const handleSignIn = async () => {
    setLoading(true);
    try {
      await account.createSession(email, password);
      // Navigate to your app's main screen here
    } catch (error: any) {
      // Show error to user (implement your own error UI)
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push('/(auth)/forgot-password');
  };

  const handleSignUp = () => {
    router.push('/(auth)/sign-up');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-4 py-8">
          <View className="flex-1 justify-center rounded-2xl bg-white p-6 shadow-md">
            <View className="mb-6 items-center">
              <Text className="mb-1 font-pbold text-2xl text-myblack">Welcome back to LearnPath</Text>
              <Text className="text-center font-pregular text-xs text-gray-500">
                Sign in to continue your learning journey
              </Text>
            </View>

            {/* Email Input */}
            <View className="mb-4">
              <FormField
                title="Email"
                value={email}
                placeholder="Enter your email"
                handleChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                OtherStyles=""
              />
            </View>

            {/* Password Input */}
            <View className="mb-2">
              <FormField
                title="Password"
                value={password}
                placeholder="Enter your password"
                handleChangeText={setPassword}
                secureTextEntry={true}
                OtherStyles=""
              />
            </View>

            {/* Remember Me & Forgot Password */}
            <View className="mb-4 flex-row items-center justify-between">
              <TouchableOpacity
                onPress={() => setRememberMe(!rememberMe)}
                className="flex-row items-center"
              >
                <View
                  className={
                    'mr-2 h-4 w-4 items-center justify-center rounded border border-gray-300' +
                    (rememberMe ? ' border-myblue bg-myblue' : '')
                  }
                >
                  {rememberMe && <Ionicons name="checkmark" size={12} color="#fff" />}
                </View>
                <Text className="text-xs text-gray-600">Remember me</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleForgotPassword}>
                <Text className="text-xs font-psemibold text-myblue">Forgot password?</Text>
              </TouchableOpacity>
            </View>


            {/* Sign In Button */}
            <CustomButton
              title="Sign In"
              onPress={handleSignIn}
              loading={loading}
              style={{ marginBottom: 16 }}
            />

            {/* Sign Up Link */}
            <View className="mb-4 flex-row items-center justify-center">
              <Text className="font-pregular text-sm text-gray-600">
                Don't have an account?
              </Text>
              <TouchableOpacity onPress={handleSignUp}>
                <Text className="ml-1 font-pbold text-sm text-myblue">Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
