import axios from 'axios';


const BASE_URL = 'https://api.mock/v2';


const mockPrices = [
  { id: 1, name: 'Nadu Rice', price: 120, unit: 'kg', categoryId: 1, history: [] },
  { id: 2, name: 'Samba Rice', price: 220, unit: 'kg', categoryId: 1, history: [] },
  { id: 3, name: 'Red Rice', price: 160, unit: 'kg', categoryId: 1, history: [] },
  { id: 4, name: 'Keeri Samba', price: 230, unit: 'kg', categoryId: 1, history: [] },
  { id: 5, name: 'Basmathi Rice', price: 280, unit: 'kg', categoryId: 1, history: [] },
  { id: 6, name: 'Potatoes', price: 80, unit: 'kg', categoryId: 2, history: [] },
  { id: 7, name: 'Onions', price: 120, unit: 'kg', categoryId: 2, history: [] },
  { id: 8, name: 'Tomatoes', price: 150, unit: 'kg', categoryId: 2, history: [] },
  { id: 9, name: 'Chicken', price: 650, unit: 'kg', categoryId: 3, history: [] },
  { id: 10, name: 'Beef', price: 850, unit: 'kg', categoryId: 3, history: [] },
  { id: 11, name: 'Fish', price: 450, unit: 'kg', categoryId: 3, history: [] },
  { id: 12, name: 'Milk', price: 180, unit: 'liter', categoryId: 4, history: [] },
  { id: 13, name: 'Tea', price: 1200, unit: 'kg', categoryId: 4, history: [] },
  { id: 14, name: 'Coffee', price: 2500, unit: 'kg', categoryId: 4, history: [] },
];


mockPrices.forEach(item => {
  item.history = Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString(),
    price: item.price + Math.floor(Math.random() * 40) - 20,
  }));
});

export const fetchPrices = async () => {

  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    data: mockPrices,
    status: 200,
    message: 'Success',
  };
};

export const fetchPriceById = async (id) => {
  const item = mockPrices.find(item => item.id === id);
  
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (item) {
    return {
      data: item,
      status: 200,
      message: 'Success',
    };
  }
  
  return {
    data: null,
    status: 404,
    message: 'Item not found',
  };
};

export const fetchCategories = async () => {
  return {
    data: [
      { id: 1, name: 'Rice', icon: '🍚', color: '#FFEAA7' },
      { id: 2, name: 'Vegetables', icon: '🥦', color: '#55EFC4' },
      { id: 3, name: 'Fish & Meat', icon: '🍖', color: '#FD79A8' },
      { id: 4, name: 'Beverages', icon: '🥤', color: '#74B9FF' },
    ],
    status: 200,
    message: 'Success',
  };
};