import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  FlatList,
  Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { loadPrices } from '../redux/priceSlice';

const { width } = Dimensions.get('window');

export default function PriceOverviewScreen({ navigation }) {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.prices);
  const { selectedCategory } = useSelector((state) => state.categories);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('7days');

  const filteredItems = items.filter(
    (item) => item.categoryId === selectedCategory
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(loadPrices());
    setRefreshing(false);
  };

  useEffect(() => {
    dispatch(loadPrices());
  }, []);

 
  const priceTrend = {
    today: 120,
    weekAgo: 115,
    change: '+5',
    changePercent: '+4.3%'
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemCard}
      onPress={() => navigation.navigate('PriceDetails', { item })}
    >
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemUnit}>{item.unit}</Text>
      </View>
      <View style={styles.itemPriceContainer}>
        <Text style={styles.itemPrice}>Rs {item.price}/kg</Text>
        <Text style={styles.seeDetails}>See Details →</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
     
        <View style={styles.header}>
          <Text style={styles.title}>Price Overview</Text>
          <Text style={styles.subtitle}>Market prices for Rice</Text>
        </View>

  
        <View style={styles.currentPriceCard}>
          <Text style={styles.currentPriceLabel}>Current Market Price</Text>
          <Text style={styles.currentPrice}>Rs {priceTrend.today}/kg</Text>
          <View style={styles.priceChangeContainer}>
            <Text style={styles.priceChange}>
              {priceTrend.change} ({priceTrend.changePercent}) vs last week
            </Text>
          </View>
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          {['Today', '7days', '30days', 'All'].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                selectedFilter === filter && styles.activeFilter,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter && styles.activeFilterText,
                ]}
              >
                {filter === '7days' ? 'Last 7 days' : 
                 filter === '30days' ? 'Last 30 days' : filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

      
        <View style={styles.trendContainer}>
          <Text style={styles.trendTitle}>Price Trend Summary</Text>
          <View style={styles.trendRow}>
            <View style={styles.trendItem}>
              <Text style={styles.trendLabel}>Today</Text>
              <Text style={styles.trendValue}>Rs {priceTrend.today}</Text>
            </View>
            <View style={styles.trendItem}>
              <Text style={styles.trendLabel}>7 Days Ago</Text>
              <Text style={styles.trendValue}>Rs {priceTrend.weekAgo}</Text>
            </View>
            <View style={styles.trendItem}>
              <Text style={styles.trendLabel}>Change</Text>
              <Text style={[styles.trendValue, { color: '#4CAF50' }]}>
                {priceTrend.change}
              </Text>
            </View>
          </View>
        </View>

 
        <View style={styles.priceListContainer}>
          <Text style={styles.priceListTitle}>Price List</Text>
          {loading ? (
            <Text style={styles.loadingText}>Loading prices...</Text>
          ) : (
            <FlatList
              data={filteredItems}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No items found</Text>
              }
            />
          )}
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
    paddingBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  currentPriceCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 15,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  currentPriceLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  currentPrice: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 10,
  },
  priceChangeContainer: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  priceChange: {
    fontSize: 14,
    color: '#666',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
  },
  activeFilter: {
    backgroundColor: '#FF6B6B',
  },
  filterText: {
    color: '#666',
    fontSize: 14,
  },
  activeFilterText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  trendContainer: {
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
  trendTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  trendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trendItem: {
    alignItems: 'center',
    flex: 1,
  },
  trendLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  trendValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  priceListContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 15,
    marginBottom: 30,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  priceListTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  itemUnit: {
    fontSize: 14,
    color: '#666',
  },
  itemPriceContainer: {
    alignItems: 'flex-end',
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 5,
  },
  seeDetails: {
    fontSize: 14,
    color: '#666',
  },
  loadingText: {
    textAlign: 'center',
    color: '#666',
    padding: 20,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    padding: 20,
  },
});