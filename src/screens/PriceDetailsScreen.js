import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

export default function PriceDetailsScreen({ route, navigation }) {
  const { item } = route.params || {
    item: {
      id: 1,
      name: 'Nadu Rice',
      price: 120,
      unit: 'per kg',
      category: 'Rice',
      history: [
        { date: '2024-01-01', price: 115 },
        { date: '2024-01-02', price: 118 },
        { date: '2024-01-03', price: 120 },
        { date: '2024-01-04', price: 122 },
        { date: '2024-01-05', price: 119 },
        { date: '2024-01-06', price: 120 },
        { date: '2024-01-07', price: 120 },
      ],
    },
  };


  const averagePrice = item.history.reduce((sum, record) => sum + record.price, 0) / item.history.length;
  const minPrice = Math.min(...item.history.map(r => r.price));
  const maxPrice = Math.max(...item.history.map(r => r.price));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Item Header */}
        <View style={styles.header}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemCategory}>{item.category}</Text>
          <Text style={styles.currentPrice}>Rs {item.price}/{item.unit}</Text>
        </View>

        
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Price Summary</Text>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Average</Text>
              <Text style={styles.summaryValue}>Rs {averagePrice.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Low</Text>
              <Text style={styles.summaryValue}>Rs {minPrice}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>High</Text>
              <Text style={styles.summaryValue}>Rs {maxPrice}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Stability</Text>
              <Text style={[styles.summaryValue, { color: '#4CAF50' }]}>Stable</Text>
            </View>
          </View>
        </View>

      
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Last 7 Days Prices</Text>
          {item.history.map((record, index) => (
            <View key={index} style={styles.historyRow}>
              <Text style={styles.historyDate}>
                Day {index + 1}
              </Text>
              <Text style={styles.historyPrice}>Rs {record.price}/{item.unit}</Text>
              <View style={styles.changeIndicator}>
                <Text style={styles.changeText}>
                  {index > 0
                    ? `${record.price - item.history[index - 1].price >= 0 ? '+' : ''}${
                        record.price - item.history[index - 1].price
                      }`
                    : '-'
                  }
                </Text>
              </View>
            </View>
          ))}
        </View>

        
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Additional Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Market Average:</Text>
            <Text style={styles.infoValue}>Rs 125/{item.unit}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Best Price Found:</Text>
            <Text style={styles.infoValue}>Rs 118/{item.unit}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Price Stability:</Text>
            <Text style={[styles.infoValue, { color: '#4CAF50' }]}>Stable</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.shareButton}>
            <Text style={styles.shareButtonText}>Share Price</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.setAlertButton}>
            <Text style={styles.setAlertButtonText}>Set Price Alert</Text>
          </TouchableOpacity>
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
    backgroundColor: '#FFFFFF',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  itemName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  itemCategory: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  currentPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B6B',
  },
  summaryContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  historyContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  historyDate: {
    fontSize: 14,
    color: '#666',
    width: '40%',
  },
  historyPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    width: '40%',
  },
  changeIndicator: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 50,
    alignItems: 'center',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF6B6B',
    marginRight: 10,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#FF6B6B',
    fontWeight: 'bold',
    fontSize: 16,
  },
  setAlertButton: {
    flex: 1,
    backgroundColor: '#FF6B6B',
    paddingVertical: 15,
    borderRadius: 10,
    marginLeft: 10,
    alignItems: 'center',
  },
  setAlertButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});