import React, { useState } from 'react';
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, University } from '../types';

interface ProfileSetupScreenProps {
  navigation: any;
}

const mockUniversities: University[] = [
  { id: 'univ_001', name: 'Stanford University', location: { name: 'Stanford, CA', lat: 37.4275, lng: -122.1697 } },
  { id: 'univ_002', name: 'MIT', location: { name: 'Cambridge, MA', lat: 42.3601, lng: -71.0942 } },
  { id: 'univ_003', name: 'Harvard University', location: { name: 'Cambridge, MA', lat: 42.3770, lng: -71.1167 } },
  { id: 'univ_004', name: 'UC Berkeley', location: { name: 'Berkeley, CA', lat: 37.8719, lng: -122.2585 } },
  { id: 'univ_005', name: 'NYU', location: { name: 'New York, NY', lat: 40.7295, lng: -73.9965 } },
];

export default function ProfileSetupScreen({ navigation }: ProfileSetupScreenProps) {
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [showUniversityPicker, setShowUniversityPicker] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleCompleteSetup = async () => {
    if (!selectedUniversity) {
      Alert.alert('Error', 'Please select your university');
      return;
    }

    setIsLoading(true);
    try {
      const userData = await AsyncStorage.getItem('currentUser');
      if (userData) {
        const user: User = JSON.parse(userData);
        const updatedUser: User = {
          ...user,
          universityId: selectedUniversity.id,
          photoUrl: profileImage || user.photoUrl,
        };
        await AsyncStorage.setItem('currentUser', JSON.stringify(updatedUser));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to complete setup. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Complete Your Profile</Text>
          <Text style={styles.subtitle}>Tell us about yourself to get started</Text>
        </View>

        <View style={styles.imageSection}>
          <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Ionicons name="camera" size={40} color="#666" />
                <Text style={styles.imagePlaceholderText}>Add Photo</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your University</Text>
          <TouchableOpacity
            style={styles.universitySelector}
            onPress={() => setShowUniversityPicker(!showUniversityPicker)}
          >
            <View style={styles.universityDisplay}>
              <Ionicons name="school-outline" size={20} color="#666" />
              <Text style={styles.universityText}>
                {selectedUniversity ? selectedUniversity.name : 'Select your university'}
              </Text>
            </View>
            <Ionicons
              name={showUniversityPicker ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>

          {showUniversityPicker && (
            <View style={styles.universityList}>
              {mockUniversities.map((university) => (
                <TouchableOpacity
                  key={university.id}
                  style={[
                    styles.universityItem,
                    selectedUniversity?.id === university.id && styles.selectedUniversity,
                  ]}
                  onPress={() => {
                    setSelectedUniversity(university);
                    setShowUniversityPicker(false);
                  }}
                >
                  <Text style={[
                    styles.universityItemText,
                    selectedUniversity?.id === university.id && styles.selectedUniversityText,
                  ]}>
                    {university.name}
                  </Text>
                  {selectedUniversity?.id === university.id && (
                    <Ionicons name="checkmark" size={20} color="#FF6B6B" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[styles.completeButton, isLoading && styles.completeButtonDisabled]}
          onPress={handleCompleteSetup}
          disabled={isLoading}
        >
          <Text style={styles.completeButtonText}>
            {isLoading ? 'Setting up...' : 'Complete Setup'}
          </Text>
        </TouchableOpacity>
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
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#FF6B6B',
    borderStyle: 'dashed',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  universitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  universityDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  universityText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  universityList: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginTop: 8,
    maxHeight: 200,
  },
  universityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  selectedUniversity: {
    backgroundColor: '#FF6B6B',
  },
  universityItemText: {
    fontSize: 16,
    color: '#333',
  },
  selectedUniversityText: {
    color: '#fff',
    fontWeight: '600',
  },
  completeButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  completeButtonDisabled: {
    opacity: 0.7,
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
