import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { setIntroShown } from '../redux/uiSlice';

const { width } = Dimensions.get('window');

const introSlides = [
  {
    id: 1,
    title: 'Welcome to S Lathaam!',
    description: 'Shop for groceries at the best prices',
    image: '🛒',
  },
  {
    id: 2,
    title: 'Local services available',
    description: 'Effortless solutions, just a tap away',
    image: '📱',
  },
  {
    id: 3,
    title: 'Quick delivery at your door',
    description: 'Get your orders delivered super fast',
    image: '🚚',
  },
];

export default function IntroScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();

  const handleNext = () => {
    if (currentSlide < introSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      dispatch(setIntroShown(true));
    }
  };

  const handleSkip = () => {
    dispatch(setIntroShown(true));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const contentOffsetX = e.nativeEvent.contentOffset.x;
          const newIndex = Math.round(contentOffsetX / width);
          setCurrentSlide(newIndex);
        }}
        scrollEventThrottle={16}
      >
        {introSlides.map((slide) => (
          <View key={slide.id} style={[styles.slide, { width }]}>
            <Text style={styles.emoji}>{slide.image}</Text>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.description}>{slide.description}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.indicatorContainer}>
        {introSlides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentSlide === index && styles.activeIndicator,
            ]}
          />
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextText}>
            {currentSlide === introSlides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#DDD',
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: '#FF6B6B',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  skipButton: {
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  skipText: {
    fontSize: 16,
    color: '#666',
  },
  nextButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  nextText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});