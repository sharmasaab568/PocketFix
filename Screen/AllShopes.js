import React, { useState,useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Animated,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GlobalFont from 'react-native-global-font';
import Fonts from './fonts';
import { shopData } from './MapArray';
const { width, height } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.7;

export default function AllShopes({ navigation }) {
  const [search, setSearch] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeSort, setActiveSort] = useState(null);
  const slideAnim = useState(new Animated.Value(width))[0];
 useEffect(() => {
    GlobalFont.applyGlobal(
      "Montserrat-SemiBold",
      "Poppins-Medium",
      "Poppins-Regular",
      "Poppins-Light",
      "Poppins-Bold"
    );
  }, []);  const [shopsData, setShopsData] = useState(shopData);

  const filteredShops = shopsData.filter(shop =>
    shop.name.toLowerCase().includes(search.toLowerCase())
  );

  const openFilter = () => {
    setFilterVisible(true);
    Animated.timing(slideAnim, {
      toValue: width - DRAWER_WIDTH,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeFilter = () => {
    Animated.timing(slideAnim, {
      toValue: width,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setFilterVisible(false));
  };

  const sortLabel = (type) => {
    switch (type) {
      case 'openingTime': return 'Opening Time (Earliest)';
      case 'distance': return 'Distance (Nearest)';
      case 'rating': return 'Rating (High → Low)';
      default: return 'Default';
    }
  };

  const applyFilter = (type) => {
    setActiveSort(type);
    setLoading(true);
    closeFilter();

    setTimeout(() => {
      let sortedData = [...shopsData];
      if (type === 'openingTime') {
        sortedData.sort((a, b) => a.openingTime.localeCompare(b.openingTime));
      } else if (type === 'distance') {
        sortedData.sort((a, b) => a.distance - b.distance);
      } else if (type === 'rating') {
        sortedData.sort((a, b) => b.rating - a.rating);
      }
      setShopsData(sortedData);
      setLoading(false);
    }, 800);
  };

  const renderShop = ({ item }) => (
    <View style={styles.shopCard}>
      <Image source={item.image} style={styles.shopImage} resizeMode="cover" />
      <Text style={styles.shopName} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.shopCategory}>{item.category}</Text>
      <Text style={styles.shopMeta}>
        <Text style={{ color: '#FFD700' }}>⭐</Text> {item.rating} ({item.ratingsCount}) • {item.openingTime} • {item.distance}km
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
        <Fonts/>
      <LinearGradient colors={['#3A86FF', '#06D6A0']} style={styles.headerGradient}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('./images/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Shops</Text>
      </LinearGradient>

      <View style={styles.searchFilterContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search shops..."
          placeholderTextColor="#666"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.filterBtn} onPress={openFilter}>
          <Text style={styles.filterText}>Filters</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statusRow}>
        <Text style={styles.statusText}>
          {activeSort ? `Sorted by: ${sortLabel(activeSort)}` : 'No sort applied'}
        </Text>
        {loading && <ActivityIndicator size="small" color="#3A86FF" style={{ marginLeft: width * 0.03 }} />}
      </View>

      <FlatList
        data={filteredShops}
        keyExtractor={item => item.id}
        renderItem={renderShop}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'flex-start' }} 
        contentContainerStyle={{ paddingBottom:width*0.5, paddingHorizontal: width*0.0 }} 
        showsVerticalScrollIndicator={false}
      />

      <Modal transparent visible={filterVisible} animationType="none" onRequestClose={closeFilter}>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={closeFilter} />
        <Animated.View style={[styles.filterDrawer, { width: DRAWER_WIDTH, left: slideAnim }]}>
          <Text style={styles.filterTitle}>Sort & Filter</Text>

          <TouchableOpacity
            style={[styles.filterOption, activeSort === 'openingTime' && styles.filterOptionActive]}
            onPress={() => applyFilter('openingTime')}
          >
            <Text style={[styles.filterOptionText, activeSort === 'openingTime' && styles.filterOptionTextActive]}>
              Opening Time (Earliest)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterOption, activeSort === 'distance' && styles.filterOptionActive]}
            onPress={() => applyFilter('distance')}
          >
            <Text style={[styles.filterOptionText, activeSort === 'distance' && styles.filterOptionTextActive]}>
              Distance (Nearest)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterOption, activeSort === 'rating' && styles.filterOptionActive]}
            onPress={() => applyFilter('rating')}
          >
            <Text style={[styles.filterOptionText, activeSort === 'rating' && styles.filterOptionTextActive]}>
              Rating (High to Low)
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },

  headerGradient: {
    paddingTop: height * 0.045,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.04,
    borderBottomLeftRadius: width * 0.02,
    borderBottomRightRadius: width * 0.02,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  backIcon: { width: width * 0.06, height: width * 0.06, marginRight: width * 0.03 },
  headerTitle: { fontSize: width * 0.05, fontWeight: '700', color: '#fff',fontFamily:'Poppins-Regular' },

  searchFilterContainer: {
    flexDirection: 'row',
    marginHorizontal: width * 0.04,
    marginVertical: height * 0.018,
  },
  searchInput: {
    flex: 1,
    borderWidth: 0,
    borderRadius: width * 0.03,
    paddingHorizontal: width * 0.04,
    height: height * 0.055,
    backgroundColor: '#fff',
    fontSize: width * 0.04,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  filterBtn: {
    marginLeft: width * 0.025,
    backgroundColor: '#06D6A0',
    borderRadius: width * 0.03,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.045,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  filterText: { color: '#fff', fontWeight: '700', fontSize: width * 0.042 },

  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: width * 0.04,
    marginBottom: height * 0.012,
  },
  statusText: { fontSize: width * 0.038, color: '#444', fontWeight: '500' },

  shopCard: {
    backgroundColor: '#fff',
    padding: width * 0.035,
    flex: 1,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },borderWidth:.5,borderColor:"#d9d9d9",
  },
  shopImage: {
    width: '100%',
    height: height * 0.16,
    marginBottom: height * 0.012,
  },
  shopName: { fontSize: width * 0.042, fontWeight: '700', color: '#222', textAlign: 'center',fontFamily:'Montserrat-SemiBold' },
  shopCategory: { fontSize: width * 0.034, color: '#06D6A0', textAlign: 'center', marginTop: height * 0.005, fontWeight: '600' },
  shopMeta: { fontSize: width * 0.032, color: '#888', marginTop: height * 0.006 },

  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.35)' },
  filterDrawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: '#fff',
    padding: width * 0.05,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: -2, height: 0 },
    borderTopLeftRadius: width * 0.05,
    borderBottomLeftRadius: width * 0.05,
  },
  filterTitle: { fontSize: width * 0.052, fontWeight: '700', marginBottom: height * 0.025, color: '#222' },
  filterOption: { paddingVertical: height * 0.018, borderBottomWidth: 1, borderBottomColor: '#eee' },
  filterOptionText: { fontSize: width * 0.042, color: '#444' },
  filterOptionActive: { backgroundColor: '#E9F9F1', borderRadius: width * 0.02 },
  filterOptionTextActive: { color: '#06D6A0', fontWeight: '700' },
});
