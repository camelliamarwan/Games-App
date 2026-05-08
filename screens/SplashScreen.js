import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Animated, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { routers } from '../utils/routers';
import { colors } from '../utils/colors';

const SplashScreen = () => {
  const { navigate } = useNavigation();
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigate(routers.drawer);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <Image source={require('../assets/gamePad.png')} style={styles.logo} />
        <Text style={styles.title}>Epic Games</Text>
        <Text style={styles.subtitle}>Your Game Library</Text>
      </Animated.View>
      <View style={styles.accentLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
  width: 150,
  height: 150,
  marginBottom: 24,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: colors.primary,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: colors.primary,
    marginTop: 8,
    letterSpacing: 4,
  },
  accentLine: {
    position: 'absolute',
    bottom: 60,
    width: 60,
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
});

export default SplashScreen;