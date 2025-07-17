
import { View, Text, TextInput, TextInputProps, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import React, { FC } from 'react';
import { icons } from '../constants';

interface FormFieldProps extends TextInputProps {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: (text: string) => void;
  OtherStyles?: string;
}

const FormField: FC<FormFieldProps> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  OtherStyles = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  return (
    <View className={`space-y-2 ${OtherStyles}`}>
      <Text className="text-base text-gray-700 font-pmedium">{title}</Text>

      <View className={`border-2 w-full h-16 px-4 rounded-2xl items-center flex-row ${isFocused ? 'border-myblue' : 'border-gray-200'}`}>
        <TextInput
          className="flex-1 text-sm text-gray-700 font-psemibold"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          onChangeText={handleChangeText}
          secureTextEntry={(title === 'Password' || title === 'Confirm Password') && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </View>

      {title === 'Password' && (
        <TouchableOpacity
          onPress={() => setShowPassword((prev) => !prev)}
        >
          <Image
            source={(!showPassword ? icons.eye : icons.eyeHide) as ImageSourcePropType}
            className="w-6 h-6"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FormField;