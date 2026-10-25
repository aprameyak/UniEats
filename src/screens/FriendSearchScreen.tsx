import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

interface FriendSearchScreenProps {
  navigation: any;
}

const mockFriendSuggestions: User[] = [
  {
    uid: '4',
    username: 'alex_wong',
    name: 'Alex Wong',
    email: 'alex.wong@university.edu',
    universityId: 'univ_001',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    friends: [],
    verified: true
  },
  {
    uid: '5',
    username: 'jessica_lee',
    name: 'Jessica Lee',
    email: 'jessica.lee@university.edu',
    universityId: 'univ_001',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    friends: [],
    verified: true
  },
  {
    uid: '6',
    username: 'david_kim',
    name: 'David Kim',
    email: 'david.kim@university.edu',
    universityId: 'univ_001',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    friends: [],
    verified: false
  },
  {
    uid: '7',
    username: 'sophia_rodriguez',
    name: 'Sophia Rodriguez',
    email: 'sophia.rodriguez@university.edu',
    universityId: 'univ_001',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    friends: [],
    verified: true
  }
];

const FriendCard = ({ user, onAddFriend }: { user: User; onAddFriend: (uid: string) => void }) => {
  const [isRequested, setIsRequested] = useState(false);

  const handleAddFriend = () => {
    setIsRequested(true);
    onAddFriend(user.uid);
  };

  return (
    <View style={styles.friendCard}>
      <Image
        source={{ uri: user.photoUrl || 'https://via.placeholder.com/50' }}
        style={styles.friendAvatar}
      />
      <View style={styles.friendInfo}>
        <View style={styles.friendNameRow}>
          <Text style={styles.friendName}>{user.name}</Text>
          {user.verified && (
            <Ionicons name="checkmark-circle" size={16} color="#4ECDC4" />
          )}
        </View>
        <Text style={styles.friendUsername}>@{user.username}</Text>
        <Text style={styles.friendEmail}>{user.email}</Text>
      </View>
      <TouchableOpacity
        style={[styles.addButton, isRequested && styles.addButtonRequested]}
        onPress={handleAddFriend}
        disabled={isRequested}
      >
        {isRequested ? (
          <Ionicons name="checkmark" size={20} color="#4ECDC4" />
        ) : (
          <Ionicons name="add" size={20} color="#fff" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default function FriendSearchScreen({ navigation }: FriendSearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [filteredFriends, setFilteredFriends] = useState<User[]>(mockFriendSuggestions);

  useEffect(() => {
    loadCurrentUser();
  }, []);

  useEffect(() => {
    filterFriends();
  }, [searchQuery]);

  const loadCurrentUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('currentUser');
      if (userData) {
        setCurrentUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading current user:', error);
    }
  };

  const filterFriends = () => {
    if (!searchQuery.trim()) {
      setFilteredFriends(mockFriendSuggestions);
      return;
    }

    const filtered = mockFriendSuggestions.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFriends(filtered);
  };

  const handleAddFriend = (uid: string) => {
    console.log('Friend request sent to:', uid);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Find Friends</Text>
      <Text style={styles.headerSubtitle}>
        Connect with classmates and discover new eating buddies
      </Text>
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or username..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="search" size={48} color="#ccc" />
      <Text style={styles.emptyStateTitle}>No Results Found</Text>
      <Text style={styles.emptyStateText}>
        Try searching with a different name or username
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredFriends}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <FriendCard user={item} onAddFriend={handleAddFriend} />
        )}
        ListHeaderComponent={
          <View>
            {renderHeader()}
            {renderSearchBar()}
          </View>
        }
        ListEmptyComponent={renderEmptyState()}
        contentContainerStyle={styles.listContainer}
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
  listContainer: {
    paddingBottom: 20,
  },
  header: {
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
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  searchContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 12,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  friendAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  friendInfo: {
    flex: 1,
  },
  friendNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  friendName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  friendUsername: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  friendEmail: {
    fontSize: 12,
    color: '#999',
  },
  addButton: {
    backgroundColor: '#FF6B6B',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonRequested: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#4ECDC4',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    marginTop: 60,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});
