
import React, { useState } from 'react';
import { Recommendation } from '../lib/api';
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from './FormField';
import CustomButton from './CustomButton';
import { fetchRecommendations } from '../lib/api';

const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

// const courses = [
//   {
//     id: 1,
//     title: 'Complete Python for Data Science Bootcamp',
//     provider: 'DataTech Academy',
//     tags: ['Python', 'Data Analysis', 'Machine Learning', '+2 more'],
//     trending: true,
//     rating: 4.8,
//     reviews: 2847,
//     enrolled: 18500,
//     duration: '12 weeks',
//     level: 'Intermediate',
//     price: 89,
//   },
//   {
//     id: 2,
//     title: 'Advanced React Native Mobile Development',
//     provider: 'Mobile Masters',
//     tags: ['React Native', 'JavaScript', 'Mobile UI', '+1 more'],
//     trending: false,
//     rating: 4.6,
//     reviews: 1523,
//     enrolled: 12300,
//     duration: '8 weeks',
//     level: 'Advanced',
//     price: 129,
//   },
// ];

const RecommendedCourses = () => {
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // default to not logged in
  const [query, setQuery] = useState('');
  const [courses, setCourses] = useState<Recommendation[]>([]);

  const handleAuth = () => {
    if (isLoggedIn) {
      // handle logout logic here
      setIsLoggedIn(false);
    } else {
      // handle login logic here (e.g., navigate to login screen)
      setIsLoggedIn(true);
    }
  };

  const handleSearch = async () => {
    const results = await fetchRecommendations(query);
    setCourses(results);
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-white px-2 pt-4 gap-y-4">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-2xl font-pbold">LearnPath</Text>
          <TouchableOpacity onPress={handleAuth}>
            <Text className="font-psemibold text-blue-600">{isLoggedIn ? 'Logout' : 'Login'}</Text>
          </TouchableOpacity>
        </View>
        {/* <FormField
          title=""
          value={search}
          placeholder="Search courses or skills..."
          handleChangeText={setSearch}
        /> */}

        <View className="flex-row items-center mb-2">
          <Ionicons name="filter-outline" size={18} color="#6B7280" />
          <Text className="ml-2 font-psemibold text-gray-700">Filter by level:</Text>
          {levels.map((level) => (
            <TouchableOpacity
              key={level}
              className={`ml-2 px-3 py-1 rounded-lg border ${selectedLevel === level ? 'bg-blue-600 border-blue-600' : 'border-gray-300'} `}
              onPress={() => setSelectedLevel(level)}
            >
              <Text className={`font-psemibold ${selectedLevel === level ? 'text-white' : 'text-gray-700'}`}>{level}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="font-psemibold text-lg mt-2">Recommended for You</Text>
        <Text className="font-pregular text-sm text-gray-500 mb-3">Based on your interests and learning goals</Text>

        <View style={{ flex: 1, paddingBottom: 64 }}>
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ marginTop: 20 }}>
              <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
              <Text>Instructor: {item.instructor_name}</Text>
              <Text>Skills: {item.skills.join(', ')}</Text>
              <Text>Rating: {item.avg_rating} ({item.num_reviews} reviews)</Text>
              <Text>Length: {item.content_length_min}</Text>
              <Text>Category: {item.category}</Text>
              <Text>Price: ${item.price}</Text>
            </View>
          )}
        />
          <ScrollView showsVerticalScrollIndicator={false}>
            {courses
              .filter((c) => selectedLevel === 'All' || c.level === selectedLevel)
              .map((course) => (
                <View key={course.id} className="bg-white rounded-2xl shadow-sm p-3 mb-4 border border-gray-100">
                  <View className="flex-row justify-between items-center">
                    <Text className="font-psemibold text-base">{course.title}</Text>
                    {course.trending && (
                      <View className="bg-orange-100 px-2 py-1 rounded-full ml-2">
                        <Text className="text-xs text-orange-600 font-psemibold">🔥 Trending</Text>
                      </View>
                    )}
                  </View>
                  <Text className="font-pregular text-sm text-gray-500 mb-1 py-3">{course.provider}</Text>
                  <View className="flex-row flex-wrap mb-2">
                    {course.tags.map((tag, idx) => (
                      <View key={idx} className="bg-gray-100 px-2 py-1 rounded-full mr-2 mb-1">
                        <Text className="text-xs font-pregular text-blue-700">{tag}</Text>
                      </View>
                    ))}
                  </View>
                  <View className="flex-row items-center mb-1">
                    <Ionicons name="star" size={16} color="#FBBF24" />
                    <Text className="ml-1 font-psemibold">{course.rating}</Text>
                    <Text className="ml-1 font-pregular text-sm text-gray-500">({course.reviews} reviews)</Text>
                    <Ionicons name="people-outline" size={16} color="#6B7280" className="ml-4" />
                    <Text className="ml-1 font-pregular text-sm text-gray-500">{course.enrolled.toLocaleString()} enrolled</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <View className="flex-row items-center mb-6">
                      <Ionicons name="time-outline" size={16} color="#6B7280" />
                      <Text className="ml-1 font-pregular text-sm text-gray-500">{course.duration}</Text>
                      <View className={`ml-3 px-2 py-0.5 rounded-full ${course.level === 'Intermediate' ? 'bg-blue-100' : 'bg-red-100'}`}>
                        <Text className={`text-xs font-psemibold ${course.level === 'Intermediate' ? 'text-blue-700' : 'text-red-700'}`}>{course.level}</Text>
                      </View>
                    </View>
                    <Text className="font-pbold text-lg">${course.price}</Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                    <CustomButton
                      title="Enroll Now"
                      onPress={() => {}}
                      style={{maxWidth: "85%", flex: 1 }}
                      />
                    <TouchableOpacity className="w-14 h-16 items-center justify-center border-gray-200 border-2 rounded-2xl">
                      <Ionicons name="share-social-outline" size={20} color="#6B7280" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
          </ScrollView>
          <View className="flex-row absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200">
            <FormField
              title=""
              value={query}
              placeholder="Search courses or skills..."
              handleChangeText={setQuery}
            />
            <TouchableOpacity onPress={handleSearch} className="w-14 h-16 items-center justify-center border-gray-200 border-2 rounded-2xl">
              <Ionicons name="search-outline" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RecommendedCourses;
