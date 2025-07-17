
import React, { useEffect } from 'react';
import { router } from 'expo-router';

const Home = () => {
  useEffect(() => {
    router.replace('/(auth)/sign-up');
  }, []);
  return null;
};

export default Home;
