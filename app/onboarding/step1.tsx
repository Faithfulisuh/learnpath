import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';

const educationLevels = ['High School', "Bachelor's", "Master's", 'PhD'];
const ageRanges = ['18-24', '25-34', '35-44', '45+'];
const experienceLevels = [
  'Beginner - New to most topics',
  'Intermediate - Some experience',
  'Advanced - Experienced learner',
];

const Step1: React.FC = () => {
  const router = useRouter();
  const [profession, setProfession] = useState('');
  const [education, setEducation] = useState('');
  const [age, setAge] = useState('');
  const [experience, setExperience] = useState('');

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View className="flex-1 bg-white p-6">
        <Text className="text-2xl font-pbold text-center mt-4">Welcome to LearnPath</Text>
        <Text className="text-center text-gray-500 mb-4 font-pregular">Let's personalize your learning experience</Text>
        <View className="h-1 bg-blue-600 my-4 rounded-full" />
        <Text className="text-lg font-psemibold text-center my-2">Tell us about yourself</Text>
        <Text className="text-center text-gray-500 mb-4 font-pregular">
          Help us understand your background to recommend the best courses
        </Text>
        <Text className="font-psemibold mt-3">What's your profession?</Text>
        <TouchableOpacity className="border border-gray-300 rounded-lg p-3 my-2">
          <Text className="text-gray-400 font-pregular">{profession ? profession : 'Select your profession'}</Text>
        </TouchableOpacity>
        <Text className="font-psemibold mt-3">Education Level</Text>
        <View className="flex-row flex-wrap my-2">
          {educationLevels.map((level) => (
            <TouchableOpacity
              key={level}
              className={`border border-gray-300 rounded-lg p-3 m-1 ${education === level ? 'bg-indigo-100 border-blue-600' : ''}`}
              onPress={() => setEducation(level)}
            >
              <Text className="font-pregular">{level}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text className="font-psemibold mt-3">Age Range</Text>
        <View className="flex-row flex-wrap my-2">
          {ageRanges.map((range) => (
            <TouchableOpacity
              key={range}
              className={`border border-gray-300 rounded-lg p-3 m-1 ${age === range ? 'bg-indigo-100 border-blue-600' : ''}`}
              onPress={() => setAge(range)}
            >
              <Text className="font-pregular">{range}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text className="font-psemibold mt-3">Overall Experience Level</Text>
        {experienceLevels.map((level) => (
          <TouchableOpacity
            key={level}
            className={`border border-gray-300 rounded-lg p-3 my-1 ${experience === level ? 'bg-indigo-100 border-blue-600' : ''}`}
            onPress={() => setExperience(level)}
          >
            <Text className="font-pregular">{level}</Text>
          </TouchableOpacity>
        ))}
        <View className="flex-row justify-between items-center mt-6">
          <Text className="font-pregular">Step 1 of 4</Text>
          <TouchableOpacity className="bg-blue-600 rounded-lg py-2 px-6" onPress={() => router.push('/onboarding/step2')}>
            <Text className="text-white font-psemibold">Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};



export default Step1;
