import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, EatingStatus } from '../types';

interface MainFeedScreenProps {
  navigation: any;
}

const mockUsers: User[] = [
  {
    uid: '1',
    username: 'sarah_j',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    universityId: 'univ_001',
    photoUrl: 'https://images.unsplash.com/photo-1494790108755-2616b9d8c90a?w=150&h=150&fit=crop&crop=face',
    friends: ['2', '3'],
    verified: true
  },
  {
    uid: '2',
    username: 'mike_chen',
    name: 'Mike Chen',
    email: 'mike.chen@university.edu',
    universityId: 'univ_001',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    friends: ['1', '3'],
    verified: true
  },
  {
    uid: '3',
    username: 'emma_davis',
    name: 'Emma Davis',
    email: 'emma.davis@university.edu',
    universityId: 'univ_001',
    photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    friends: ['1', '2'],
    verified: true
  }
];

const mockStatuses: EatingStatus[] = [
  {
    statusId: '1',
    uid: '2',
    universityId: 'univ_001',
    status: 'looking_to_eat',
    location: {
      name: 'Student Union Food Court',
      lat: 40.7128,
      lng: -74.0060
    },
    createdAt: new Date(Date.now() - 10 * 60000),
    expiresAt: new Date(Date.now() + 45 * 60000),
    visibleTo: ['1', '3'],
    campusMode: false
  },
  {
    statusId: '2',
    uid: '3',
    universityId: 'univ_001',
    status: 'eating_now',
    location: {
      name: 'Campus Café',
      lat: 40.7130,
      lng: -74.0058
    },
    createdAt: new Date(Date.now() - 5 * 60000),
    expiresAt: new Date(Date.now() + 25 * 60000),
    visibleTo: ['1', '2'],
    campusMode: true,
    photoUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    description: 'Having the best pasta! 🍝'
  }
];

const StatusCard = ({ status, user }: { status: EatingStatus; user: User }) => {
  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getStatusIcon = () => {
    return status.status === 'looking_to_eat' ? 'search' : 'restaurant';
  };

  const getStatusColor = () => {
    return status.status === 'looking_to_eat' ? '#FF6B6B' : '#4ECDC4';
  };

  const getStatusText = () => {
    return status.status === 'looking_to_eat' ? 'Looking to eat' : 'Eating now';
  };

  return (
    <View style={styles.statusCard}>
      <View style={styles.userInfo}>
        <Image
          source={{ uri: user.photoUrl || 'https://via.placeholder.com/50' }}
          style={styles.userAvatar}
        />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userUsername}>@{user.username}</Text>
        </View>
        <View style={styles.statusIndicator}>
          <Ionicons name={getStatusIcon()} size={20} color={getStatusColor()} />
        </View>
      </View>

      <View style={styles.statusContent}>
        <View style={styles.statusHeader}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
            <Text style={styles.statusBadgeText}>{getStatusText()}</Text>
          </View>
          <Text style={styles.timeAgo}>{getTimeAgo(status.createdAt)}</Text>
        </View>

        {status.description && (
          <Text style={styles.statusDescription}>{status.description}</Text>
        )}

        {status.photoUrl && (
          <Image source={{ uri: status.photoUrl }} style={styles.statusImage} />
        )}

        <View style={styles.locationInfo}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={styles.locationText}>{status.location.name}</Text>
        </View>

        {status.campusMode && (
          <View style={styles.campusModeBadge}>
            <Ionicons name="school-outline" size={12} color="#666" />
            <Text style={styles.campusModeText}>Campus Mode</Text>
          </View>
        )}
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={20} color="#666" />
          <Text style={styles.actionButtonText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="heart-outline" size={20} color="#666" />
          <Text style={styles.actionButtonText}>Join</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function MainFeedScreen({ navigation }: MainFeedScreenProps) {
  const [statuses, setStatuses] = useState<EatingStatus[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadStatuses();
  }, []);

  const loadStatuses = async () => {
    setStatuses(mockStatuses);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadStatuses();
    setRefreshing(false);
  };

  const getUserById = (uid: string) => {
    return mockUsers.find(user => user.uid === uid) || mockUsers[0];
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>UniEats</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate('StatusCreate')}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={statuses}
        keyExtractor={(item) => item.statusId}
        renderItem={({ item }) => (
          <StatusCard status={item} user={getUserById(item.uid)} />
        )}
        contentContainerStyle={styles.feedContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  createButton: {
    backgroundColor: '#FF6B6B',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedContainer: {
    padding: 16,
  },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  userUsername: {
    fontSize: 14,
    color: '#666',
  },
  statusIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusContent: {
    marginBottom: 16,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  timeAgo: {
    fontSize: 12,
    color: '#666',
  },
  statusDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
    lineHeight: 22,
  },
  statusImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  campusModeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  campusModeText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
});
