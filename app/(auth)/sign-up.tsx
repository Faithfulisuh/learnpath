import React, { useState, useRef, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

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
  const [sheetMessage, setSheetMessage] = useState<string>('');

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['30%'], []);

  const openBottomSheet = (message: string) => {
    setSheetMessage(message);
    bottomSheetModalRef.current?.present();
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

  const handleSocialLogin = (provider: string): void => {
    openBottomSheet(`${provider} login would be implemented here.`);
  };

  const handleSignIn = (): void => {
    openBottomSheet('Navigating to Sign In screen.');
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView className="flex-1 bg-gray-100">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1">
          <ScrollView contentContainerStyle={{ flexGrow: 1 }} className=" px-4 py-8">
            <View className="flex-1 items-center justify-center rounded-2xl bg-white p-6 shadow-md">
              <View className="mb-6 items-center">
                <Text className="mb-1 font-pbold text-2xl text-myblack">Join LearnPath</Text>
                <Text className="text-center font-pregular text-xs text-gray-500">
                  Create your account and start learning
                </Text>
              </View>

              {/* Input Field */}
              {(['fullName', 'email', 'password', 'confirmPassword'] as (keyof FormData)[]).map(
                (field) => (
                  <View className="mb-4" key={field}>
                    <Text className="mb-1 font-psemibold text-sm capitalize text-gray-700">
                      {field.replace(/([A-Z])/g, ' $1')}
                    </Text>
                    <View className="h-12 flex-row items-center rounded-lg border border-gray-300 bg-gray-50 px-3">
                      <Ionicons
                        name={field.includes('mail') ? 'mail-outline' : 'person-outline'}
                        size={18}
                        color="#9CA3AF"
                      />
                      <TextInput
                        className="ml-2 flex-1 font-pregular text-xs text-gray-800"
                        placeholder={`Enter your ${field}`}
                        placeholderTextColor="#9CA3AF"
                        secureTextEntry={
                          (field === 'password' && !showPassword) ||
                          (field === 'confirmPassword' && !showConfirmPassword)
                        }
                        value={formData[field]}
                        onChangeText={(text) => handleInputChange(field, text)}
                      />
                      {['password', 'confirmPassword'].includes(field) && (
                        <TouchableOpacity
                          onPress={() =>
                            field === 'password'
                              ? setShowPassword(!showPassword)
                              : setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="p-1">
                          <Ionicons
                            name={
                              (field === 'password' && showPassword) ||
                              (field === 'confirmPassword' && showConfirmPassword)
                                ? 'eye-off-outline'
                                : 'eye-outline'
                            }
                            size={20}
                            color="#9CA3AF"
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                )
              )}

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
                <Text className="text-sm text-gray-600">
                  I agree to the{' '}
                  <Text className="font-psemibold text-myblue">Terms of Service</Text> and{' '}
                  <Text className="font-psemibold text-myblue">Privacy Policy</Text>
                </Text>
              </TouchableOpacity>

              {/* Create Account Button */}
              <TouchableOpacity
                onPress={handleCreateAccount}
                className="mb-4 h-12 items-center justify-center rounded-lg bg-myblue">
                <Text className="font-pbold text-base text-white">Create Account</Text>
              </TouchableOpacity>

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
          <BottomSheetModal
            ref={bottomSheetModalRef}
            snapPoints={snapPoints}
            backdropComponent={() => <View className="flex-1 bg-black/50" />}>
            <View className="p-5">
              <Text className="mb-2 text-center font-pbold text-lg text-myblack">Notice</Text>
              <Text className="text-center text-gray-700">{sheetMessage}</Text>
            </View>
          </BottomSheetModal>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default Signup;
