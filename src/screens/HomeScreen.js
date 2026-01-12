import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory } from '../redux/categorySlice';
import { loadPrices } from '../redux/priceSlice';
export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const { categories, services, selectedCategory } = useSelector(
    (state) => state.categories
  );
  const user = { name: 'Amal' };

  useEffect(() => {
    dispatch(loadPrices());
  }, []);

  const handleCategoryPress = (categoryId) => {
    dispatch(selectCategory(categoryId));
    navigation.navigate('Price');
  };

  const handleServicePress = (service) => {
    alert(`Selected: ${service.name}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <Text style={styles.appTitle}>S Lathaam</Text>
          <Text style={styles.greeting}>Hi There, {user.name}!</Text>
        </View>

      
        <View style={styles.walletCard}>
          <Text style={styles.walletTitle}>Wallet Balance</Text>
          <Text style={styles.walletAmount}>LKR 15,250.00</Text>
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View Intro</Text>
          </TouchableOpacity>
        </View>

        
        <Text style={styles.sectionTitle}>Food Price</Text>
        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryCard,
                { backgroundColor: category.color },
                selectedCategory === category.id && styles.selectedCategory,
              ]}
              onPress={() => handleCategoryPress(category.id)}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

       
        <Text style={styles.sectionTitle}>Services</Text>
        <View style={styles.servicesContainer}>
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={[styles.serviceCard, { backgroundColor: service.color }]}
              onPress={() => handleServicePress(service)}
            >
              <Text style={styles.serviceIcon}>{service.icon}</Text>
              <Text style={styles.serviceName}>{service.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        
        <View style={styles.recentPricesCard}>
          <View style={styles.recentPricesHeader}>
            <Text style={styles.recentPricesTitle}>Recent Price Updates</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Price')}>
              <Text style={styles.seeAllText}>See All →</Text>
            </TouchableOpacity>
          </View>
         
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  greeting: {
    fontSize: 18,
    color: '#666',
    marginTop: 5,
  },
  walletCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  walletTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  walletAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  viewButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  viewButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  categoryCard: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  selectedCategory: {
    borderWidth: 3,
    borderColor: '#FF6B6B',
  },
  categoryIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  servicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  serviceCard: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  serviceIcon: {
    fontSize: 30,
    marginBottom: 5,
  },
  serviceName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  recentPricesCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  recentPricesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  recentPricesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
});