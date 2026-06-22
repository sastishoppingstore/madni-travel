import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/theme/colors';
import { Spacing } from '@/theme/spacing';
import { Plane } from 'lucide-react-native';

const SplashScreen = () => {
  const navigation = useNavigation<any>();
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo animation
    Animated.sequence([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        delay: 200,
      }),
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        delay: 200,
      }),
    ]).start();

    // Navigate after splash
    const timer = setTimeout(() => {
      navigation.navigate('Onboarding' as never);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          <View style={styles.logoCircle}>
            <View style={styles.planeIconWrap}>
              <Plane size={48} color={Colors.white} />
            </View>
          </View>
          <View style={styles.logoTextContainer}>
            <Text style={styles.logoTextMT}>MT</Text>
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: textOpacity }}>
          <Text style={styles.brandName}>Madni Travel</Text>
        </Animated.View>

        <Animated.View style={{ opacity: taglineOpacity }}>
          <Text style={styles.tagline}>Your Journey Begins Here</Text>
          <View style={styles.goldLine} />
        </Animated.View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Pakistan's Premium Travel Partner</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.accent,
  },
  planeIconWrap: {
    transform: [{ rotate: '-45deg' }],
  },
  logoTextContainer: {
    position: 'absolute',
    bottom: -10,
    backgroundColor: Colors.accent,
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: 12,
  },
  logoTextMT: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '800',
  },
  brandName: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
  goldLine: {
    width: 60,
    height: 3,
    backgroundColor: Colors.accent,
    alignSelf: 'center',
    marginTop: Spacing.base,
    borderRadius: 2,
  },
  footer: {
    paddingBottom: Spacing.xl,
  },
  footerText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
  },
});

export default SplashScreen;
