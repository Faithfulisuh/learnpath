import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';


const durations = ['1-2 weeks', '3-6 weeks', '2-3 months', '3+ months'];
const budgets = [
  'Free courses only',
  'Up to $50 per course',
  '$50-200 per course',
  '$200+ per course',
];
const learningStyles = [
  'Video lectures', 'Interactive exercises', 'Reading materials', 'Hands-on projects',
  'Quizzes and tests', 'Discussion forums', 'Live sessions', 'Self-paced learning',
];

const Step4: React.FC = () => {
  const router = useRouter();
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  const toggleSelection = (item: string, list: string[], setList: (l: string[]) => void) => {
    setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View className="flex-1 bg-white p-6">
        <Text className="text-2xl font-pbold text-center mt-4">Welcome to LearnPath</Text>
        <Text className="text-center text-gray-500 mb-4 font-pregular">Let's personalize your learning experience</Text>
        <View className="h-1 bg-blue-600 my-4 rounded-full" />
        <Text className="text-lg font-psemibold text-center my-2">Learning preferences</Text>
        <Text className="text-center text-gray-500 mb-4 font-pregular">
          Tell us about your learning style and availability
        </Text>
        <Text className="font-psemibold mt-3">How much time can you dedicate to learning per week?</Text>
        {durations.map((duration) => (
          <TouchableOpacity
            key={duration}
            className={`border border-gray-300 rounded-lg p-3 my-1 ${selectedDuration === duration ? 'bg-indigo-100 border-blue-600' : ''}`}
            onPress={() => setSelectedDuration(duration)}
          >
            <Text className="font-pregular">{duration}</Text>
          </TouchableOpacity>
        ))}
        <Text className="font-psemibold mt-3">What's your preferred learning style? (Select all that apply)</Text>
        <View className="flex-row flex-wrap my-2">
          {learningStyles.map((style) => (
            <TouchableOpacity
              key={style}
              className={`border border-gray-300 rounded-lg p-3 m-1 ${selectedStyles.includes(style) ? 'bg-indigo-100 border-blue-600' : ''}`}
              onPress={() => toggleSelection(style, selectedStyles, setSelectedStyles)}
            >
              <Text className="font-pregular">{style}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text className="font-psemibold mt-3">What's your budget for courses?</Text>
        {budgets.map((budget) => (
          <TouchableOpacity
            key={budget}
            className={`border border-gray-300 rounded-lg p-3 my-1 ${selectedBudget === budget ? 'bg-indigo-100 border-blue-600' : ''}`}
            onPress={() => setSelectedBudget(budget)}
          >
            <Text className="font-pregular">{budget}</Text>
          </TouchableOpacity>
        ))}
        <View className="flex-row justify-between items-center mt-6">
          <TouchableOpacity className="rounded-lg py-2 px-6 border border-gray-300" onPress={() => router.back()}>
          <Text className="font-pregular">Back</Text>
          </TouchableOpacity>
          <Text className="font-pregular">Step 4 of 4</Text>
          <TouchableOpacity className="bg-blue-600 rounded-lg py-2 px-6" onPress={() => {/* handle finish */}}>
            <Text className="text-white font-psemibold">Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};



export default Step4;
