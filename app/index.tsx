
import React, { useEffect } from 'react';
import { router } from 'expo-router';

const Home = () => {
  useEffect(() => {
    router.replace('/onboarding/step1');
  }, []);
  return null;
};

export default Home;
