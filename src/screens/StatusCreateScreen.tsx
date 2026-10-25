import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EatingStatus, Location as LocationType } from '../types';

interface StatusCreateScreenProps {
  navigation: any;
}

const mockLocations = [
  { name: 'Student Union Food Court', lat: 40.7128, lng: -74.0060 },
  { name: 'Campus Café', lat: 40.7130, lng: -74.0058 },
  { name: 'Library Coffee Shop', lat: 40.7125, lng: -74.0065 },
  { name: 'Dining Hall', lat: 40.7135, lng: -74.0055 },
  { name: 'Food Truck Area', lat: 40.7120, lng: -74.0070 },
];

export default function StatusCreateScreen({ navigation }: StatusCreateScreenProps) {
  const [status, setStatus] = useState<'looking_to_eat' | 'eating_now'>('looking_to_eat');
  const [description, setDescription] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<LocationType | null>(null);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [campusMode, setCampusMode] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      const nearestLocation = mockLocations[0];
      setSelectedLocation(nearestLocation);
    } catch (error) {
      console.log('Error getting location:', error);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleCreateStatus = async () => {
    if (!selectedLocation) {
      Alert.alert('Error', 'Please select a location');
      return;
    }

    setIsLoading(true);
    try {
      const userData = await AsyncStorage.getItem('currentUser');
      if (userData) {
        const user = JSON.parse(userData);
        const newStatus: EatingStatus = {
          statusId: Date.now().toString(),
          uid: user.uid,
          universityId: user.universityId || 'univ_001',
          status,
          location: selectedLocation,
          createdAt: new Date(),
          expiresAt: new Date(Date.now() + 60 * 60000),
          visibleTo: user.friends || [],
          campusMode,
          photoUrl: photo || undefined,
          description: description || undefined,
        };

        console.log('Created status:', newStatus);
        Alert.alert('Success', 'Status created successfully!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to create status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Status</Text>
          <TouchableOpacity
            style={[styles.postButton, isLoading && styles.postButtonDisabled]}
            onPress={handleCreateStatus}
            disabled={isLoading}
          >
            <Text style={styles.postButtonText}>
              {isLoading ? 'Posting...' : 'Post'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statusTypeContainer}>
          <TouchableOpacity
            style={[
              styles.statusTypeButton,
              status === 'looking_to_eat' && styles.statusTypeButtonActive,
            ]}
            onPress={() => setStatus('looking_to_eat')}
          >
            <Ionicons
              name="search"
              size={24}
              color={status === 'looking_to_eat' ? '#fff' : '#FF6B6B'}
            />
            <Text style={[
              styles.statusTypeText,
              status === 'looking_to_eat' && styles.statusTypeTextActive,
            ]}>
              Looking to Eat
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.statusTypeButton,
              status === 'eating_now' && styles.statusTypeButtonActive,
            ]}
            onPress={() => setStatus('eating_now')}
          >
            <Ionicons
              name="restaurant"
              size={24}
              color={status === 'eating_now' ? '#fff' : '#4ECDC4'}
            />
            <Text style={[
              styles.statusTypeText,
              status === 'eating_now' && styles.statusTypeTextActive,
            ]}>
              Eating Now
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What's on your mind?</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Share what you're eating or looking for..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add Photo (Optional)</Text>
          <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
            {photo ? (
              <Image source={{ uri: photo }} style={styles.photoPreview} />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Ionicons name="camera" size={32} color="#666" />
                <Text style={styles.photoPlaceholderText}>Add Photo</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <TouchableOpacity
            style={styles.locationSelector}
            onPress={() => setShowLocationPicker(!showLocationPicker)}
          >
            <View style={styles.locationDisplay}>
              <Ionicons name="location-outline" size={20} color="#666" />
              <Text style={styles.locationText}>
                {selectedLocation ? selectedLocation.name : 'Select location'}
              </Text>
            </View>
            <Ionicons
              name={showLocationPicker ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>

          {showLocationPicker && (
            <View style={styles.locationList}>
              {mockLocations.map((location, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.locationItem,
                    selectedLocation?.name === location.name && styles.selectedLocation,
                  ]}
                  onPress={() => {
                    setSelectedLocation(location);
                    setShowLocationPicker(false);
                  }}
                >
                  <Text style={[
                    styles.locationItemText,
                    selectedLocation?.name === location.name && styles.selectedLocationText,
                  ]}>
                    {location.name}
                  </Text>
                  {selectedLocation?.name === location.name && (
                    <Ionicons name="checkmark" size={20} color="#FF6B6B" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.campusModeContainer}>
            <View style={styles.campusModeInfo}>
              <Text style={styles.sectionTitle}>Campus Mode</Text>
              <Text style={styles.campusModeDescription}>
                Only visible to students at your university
              </Text>
            </View>
            <Switch
              value={campusMode}
              onValueChange={setCampusMode}
              trackColor={{ false: '#e9ecef', true: '#FF6B6B' }}
              thumbColor={campusMode ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  postButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  postButtonDisabled: {
    opacity: 0.7,
  },
  postButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statusTypeContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 4,
  },
  statusTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  statusTypeButtonActive: {
    backgroundColor: '#FF6B6B',
  },
  statusTypeText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#666',
  },
  statusTypeTextActive: {
    color: '#fff',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  descriptionInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
    minHeight: 100,
  },
  photoButton: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
  },
  photoPreview: {
    width: '100%',
    height: '100%',
  },
  photoPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e9ecef',
    borderStyle: 'dashed',
  },
  photoPlaceholderText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  locationDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  locationList: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginTop: 8,
    maxHeight: 200,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  selectedLocation: {
    backgroundColor: '#FF6B6B',
  },
  locationItemText: {
    fontSize: 16,
    color: '#333',
  },
  selectedLocationText: {
    color: '#fff',
    fontWeight: '600',
  },
  campusModeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
  },
  campusModeInfo: {
    flex: 1,
  },
  campusModeDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
