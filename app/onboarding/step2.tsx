import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';


const topics = [
  'Programming', 'Data Science', 'Design', 'Marketing', 'Business', 'Finance',
  'Photography', 'Writing', 'Music', 'Languages', 'Health & Fitness', 'Cooking',
];
const skills = [
  'Python', 'JavaScript', 'React', 'SQL', 'Excel', 'Photoshop', 'Figma', 'Marketing',
  'Project Management', 'Communication', 'Leadership', 'Analytics',
];

const Step2: React.FC = () => {
  const router = useRouter();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const toggleSelection = (item: string, list: string[], setList: (l: string[]) => void) => {
    setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View className="flex-1 bg-white p-6">
        <Text className="text-2xl font-pbold text-center my-4">Welcome to LearnPath</Text>
        <Text className="text-center text-gray-500 font-pregular">Let's personalize your learning experience</Text>
        <View className="h-1 bg-blue-600 my-4 rounded-full" />
        <Text className="text-lg font-psemibold text-center my-2">Your interests & skills</Text>
        <Text className="text-center text-sm text-gray-500 mb-4 font-pregular">
          What topics interest you and what skills do you currently have?
        </Text>
        <Text className="font-psemibold mt-3">What are you interested in learning? (Select all that apply)</Text>
        <View className="flex-row flex-wrap my-2">
          {topics.map((topic) => (
            <TouchableOpacity
              key={topic}
              className={`border border-gray-300 rounded-lg p-3 m-1 ${selectedTopics.includes(topic) ? 'bg-indigo-100 border-blue-600' : ''}`}
              onPress={() => toggleSelection(topic, selectedTopics, setSelectedTopics)}
            >
              <Text className="font-pregular">{topic}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text className="font-psemibold mt-3">What skills do you currently have?</Text>
        <View className="flex-row flex-wrap my-2">
          {skills.map((skill) => (
            <TouchableOpacity
              key={skill}
              className={`border border-gray-300 rounded-lg p-3 m-1 ${selectedSkills.includes(skill) ? 'bg-indigo-100 border-blue-600' : ''}`}
              onPress={() => toggleSelection(skill, selectedSkills, setSelectedSkills)}
            >
              <Text className="font-pregular">{skill}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="flex-row justify-between items-center mt-6">
          <TouchableOpacity className="rounded-lg py-2 px-6 border border-gray-300" onPress={() => router.back()}>
          <Text className="font-pregular">Back</Text>
          </TouchableOpacity>
          <Text className="font-pregular">Step 2 of 4</Text>
          <TouchableOpacity className="bg-blue-600 rounded-lg py-2 px-6" onPress={() => router.push('/onboarding/step3')}>
            <Text className="text-white font-psemibold">Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};



export default Step2;
