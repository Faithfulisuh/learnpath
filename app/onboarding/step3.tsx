import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';


const goals = [
  'Career advancement', 'Career transition', 'Skill improvement', 'Personal enrichment',
  'Academic requirements', 'Stay current with trends', 'Start a business', 'Hobby development',
];
const topics = [
  'Technology', 'Business', 'Creative', 'Science', 'Health', 'Language', 'Personal Development', 'Arts',
];

const Step3: React.FC = () => {
  const router = useRouter();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [careerGoal, setCareerGoal] = useState('');
  const [focusTopics, setFocusTopics] = useState<string[]>([]);

  const toggleSelection = (item: string, list: string[], setList: (l: string[]) => void) => {
    setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View className="flex-1 bg-white p-6">
        <Text className="text-2xl font-pbold text-center mt-4">Welcome to LearnPath</Text>
        <Text className="text-center text-gray-500 mb-4 font-pregular">Let's personalize your learning experience</Text>
        <View className="h-1 bg-blue-600 my-4 rounded-full" />
        <Text className="text-lg font-psemibold text-center my-2">Your learning goals</Text>
        <Text className="text-center text-gray-500 mb-4 font-pregular">
          What do you want to achieve through online learning?
        </Text>
        <Text className="font-psemibold mt-3">What are your learning goals? (Select all that apply)</Text>
        {goals.map((goal) => (
          <TouchableOpacity
            key={goal}
            className={`border border-gray-300 rounded-lg p-3 my-1 ${selectedGoals.includes(goal) ? 'bg-indigo-100 border-blue-600' : ''}`}
            onPress={() => toggleSelection(goal, selectedGoals, setSelectedGoals)}
          >
            <Text className="font-pregular">{goal}</Text>
          </TouchableOpacity>
        ))}
        <Text className="font-psemibold mt-3">What's your primary career goal?</Text>
        <TouchableOpacity className="border border-gray-300 rounded-lg p-3 my-2">
          <Text className="text-gray-400 font-pregular">{careerGoal ? careerGoal : 'Select your career goal'}</Text>
        </TouchableOpacity>
        <Text className="font-psemibold mt-3">Which topics would you like to focus on?</Text>
        <View className="flex-row flex-wrap my-2">
          {topics.map((topic) => (
            <TouchableOpacity
              key={topic}
              className={`border border-gray-300 rounded-lg p-3 m-1 ${focusTopics.includes(topic) ? 'bg-indigo-100 border-blue-600' : ''}`}
              onPress={() => toggleSelection(topic, focusTopics, setFocusTopics)}
            >
              <Text className="font-pregular">{topic}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="flex-row justify-between items-center mt-6">
          <TouchableOpacity className="rounded-lg py-2 px-6 border border-gray-300" onPress={() => router.back()}>
          <Text className="font-pregular">Back</Text>
          </TouchableOpacity>
          <Text className="font-pregular">Step 3 of 4</Text>
          <TouchableOpacity className="bg-blue-600 rounded-lg py-2 px-6" onPress={() => router.push('/onboarding/step4')}>
            <Text className="text-white font-psemibold">Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};



export default Step3;
