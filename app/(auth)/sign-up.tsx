import React, { useState, useRef, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import CustomBottomSheet, { CustomBottomSheetRef } from 'components/CustomBottomSheet';
import { router } from 'expo-router';
import FormField from '../../components/FormField';
import CustomButton from 'components/CustomButton';

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);

  const bottomSheetRef = useRef<CustomBottomSheetRef>(null);

  const openBottomSheet = (message: string) => {
    bottomSheetRef.current?.present(message);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) {
      openBottomSheet('Please enter your full name.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      openBottomSheet('Please enter a valid email address.');
      return false;
    }
    if (formData.password.length < 6) {
      openBottomSheet('Password must be at least 6 characters long.');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      openBottomSheet('Passwords do not match.');
      return false;
    }
    if (!agreeToTerms) {
      openBottomSheet('Please agree to the Terms of Service and Privacy Policy.');
      return false;
    }
    return true;
  };

  const handleCreateAccount = (): void => {
    if (validateForm()) {
      openBottomSheet('Account created successfully!');
    }
  };

  const handleSignIn = (): void => {
    router.push('/(auth)/sign-in');
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView className="flex-1 bg-gray-100">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1">
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} className=" px-4 py-8">
            <View className="flex-1 justify-center rounded-2xl bg-white p-6 shadow-md">
              <View className="mb-6 items-center">
                <Text className="mb-1 font-pbold text-2xl text-myblack">Join LearnPath</Text>
                <Text className="text-center font-pregular text-xs text-gray-500">
                  Create your account and start learning
                </Text>
              </View>
              
              {/* Input Fields */}
              <View className="mb-4">
                <FormField
                  title="Full Name"
                  value={formData.fullName}
                  placeholder="Enter your full name"
                  handleChangeText={(text) => handleInputChange('fullName', text)}
                  OtherStyles=""
                />
              </View>
              <View className="mb-4">
                <FormField
                  title="Email"
                  value={formData.email}
                  placeholder="Enter your email"
                  handleChangeText={(text) => handleInputChange('email', text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  OtherStyles=""
                />
              </View>
              <View className="mb-4">
                <FormField
                  title="Password"
                  value={formData.password}
                  placeholder="Enter your password"
                  handleChangeText={(text) => handleInputChange('password', text)}
                  secureTextEntry={true}
                  OtherStyles=""
                />
              </View>
              <View className="mb-4">
                <FormField
                  title="Confirm Password"
                  value={formData.confirmPassword}
                  placeholder="Confirm your password"
                  handleChangeText={(text) => handleInputChange('confirmPassword', text)}
                  secureTextEntry={true}
                  OtherStyles=""
                />
              </View>

              {/* Checkbox */}
              <TouchableOpacity
                onPress={() => setAgreeToTerms(!agreeToTerms)}
                className="my-4 flex-row items-center">
                <View
                  className={
                    'mr-2 h-5 w-5 items-center justify-center rounded border border-gray-300' +
                    (agreeToTerms ? 'border-myblue bg-myblue' : '')
                  }>
                  {agreeToTerms && <Ionicons name="checkmark" size={14} color="#fff" />}
                </View>
                <Text className="text-sm font-pregular text-gray-600">
                  I agree to the{' '}
                  <Text className="font-psemibold text-myblue">Terms of Service</Text> and{' '}
                  <Text className="font-psemibold text-myblue">Privacy Policy</Text>
                </Text>
              </TouchableOpacity>

              {/* Create Account Button */}
              <CustomButton
                title="Create Account"
                onPress={handleCreateAccount}
                style={{ marginBottom: 16 }}
              />

              {/* Sign In */}
              <View className="mb-4 flex-row items-center justify-center">
                <Text className="font-pregular text-sm text-gray-600">
                  Already have an account?{' '}
                </Text>
                <TouchableOpacity onPress={handleSignIn}>
                  <Text className="ml-1 font-pbold text-sm text-myblue">Sign in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          {/* Bottom Sheet Modal */}
          <CustomBottomSheet ref={bottomSheetRef} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default Signup;
