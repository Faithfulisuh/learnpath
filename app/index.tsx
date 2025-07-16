import { View, Text } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const Home = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-pblack text-3xl">LearnPath</Text>
      <Link href="/(auth)/sign-up">Sign Up</Link>
    </View>
  );
};

export default Home;
