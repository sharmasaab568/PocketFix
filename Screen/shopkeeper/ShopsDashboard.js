import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, FlatList, Dimensions } from 'react-native';
import React, { useState,useRef,useEffect } from 'react';
import { Image } from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get("window");

const THEME = {
  primary: '#3A86FF',
  secondary: '#06D6A0',
  lightBlue: '#a9c8fa',
  white: '#fff',
  lightGray: '#f8f9fa',
  textDark: '#333',
};

export default function ShopsDashboard() {
  const [modalVisible, setModalVisible] = useState(false);
 const animRef = useRef(null);
  const animations = ['slideInDown', 'slideInLeft', 'slideInRight', 'slideInUp'];

  useEffect(() => {
    let index = 0;

    const runAnimation = () => {
      if (animRef.current) {
        animRef.current.animate(animations[index], 1000);
        index = (index + 1) % animations.length; // Move to next animation
      }
    };

    runAnimation(); // run first animation immediately

    const interval = setInterval(() => {
      runAnimation();
    }, 3000); // 1s animation + 10s pause

    return () => clearInterval(interval);
  }, []);


  const accounts = [
    { id: '1', name: 'Nisha Makeover', avatar: require('../images/elect.jpeg') },
    { id: '2', name: 'Raj Hair Studio', avatar: require('../images/elect.jpeg') },
    { id: '3', name: 'Beauty Bliss', avatar: require('../images/elect.jpeg') },
  ];

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <LinearGradient
          colors={["#3A86FF", "#06D6A0"]}
          style={{ width: "100%", paddingVertical: width * 0.02, paddingHorizontal: width * 0.05, paddingTop: width * 0.1, borderBottomRightRadius: 15, borderBottomLeftRadius: 15 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={{ paddingVertical: width * 0.02, flexDirection: "row"}}>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{
                marginRight: width * 0.03,
                elevation: 5,
                borderRadius: 100,
                alignItems: "center",
                backgroundColor: "white",
                width: width * 0.12, height: width * 0.12
              }}
            >
              <Image
                source={require("../images/elect.jpeg")}
                style={{ width: width * 0.12, height: width * 0.12, borderRadius: width * 0.06, borderWidth: 2, borderColor: THEME.white }}
              />
            </TouchableOpacity>
            <View style={{ flex: 1}}>
              <Text style={{ color: "#ffffff", fontSize: width * 0.04, fontFamily: "Montserrat-SemiBold" }}>
                Sharmasaab568
              </Text>
              <Text style={{ color: "#e3e3e3", fontFamily: "Poppins-Light", fontSize: width * 0.037 }}>
               RSD Pathankot
              </Text>
            </View>
            <TouchableOpacity style={{elevation:10,}}>
              <Image ref={animRef} source={require('../images/noti2.png')}style={{width: width * 0.15, height: width * 0.15, marginLeft: 'auto' }} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
        {/* Shop Header Card */}
        <LinearGradient
          colors={["#3A86FF", "#06D6A0"]}
          style={styles.shopcon}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',alignItems:'center',marginBottom:height*0.01 }}>
            <Text style={styles.shopTitle}>MY SHOP</Text>
            <TouchableOpacity >
              <Image
                source={require('../images/edit.png')}
                style={{ width: width * 0.05, height: width * 0.05 }} />
            </TouchableOpacity>
          </View>
          <View style={styles.shoplogo}>
            <View style={styles.rowBetween}>
              <Image
                source={require('../images/elect.jpeg')}
                style={styles.shopav}
                animation="bounceIn"
                duration={1500}
              />
              <Text style={styles.shopName}>Nisha Makeover</Text>
            </View>
          </View>
          <View style={styles.divider} />

          <View style={[styles.rowBetween,{justifyContent:"space-between"}]}>
            <Text style={styles.infoText}>Customers: 35k</Text>
            <Text style={styles.infoText}>Services: 89</Text>
          </View>
        </LinearGradient>

        {/* Analytics Section */}
        <View style={styles.shopanalytics}>
          <View style={styles.analyticRow}>
            {[
              { label: "Monthly Customers", value: "₹ 50,000" },
              { label: "Total Earnings", value: "₹ 50,000" },
              { label: "Today's Bookings", value: "₹ 50,000" },
              { label: "Next Appointment", value: "34" },
            ].map((item, index) => (
              <View style={styles.anaitems} key={index}>
                <Image source={require('../images/elect.jpeg')} style={styles.analyticsIcon} />
                <View style={styles.analyticsText}>
                  <Text style={styles.analyticsLabel}>{item.label}</Text>
                  <Text style={styles.analyticsValue}>{item.value}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Appointments */}
        <View style={styles.appointmentcon}>
          <Text style={styles.apptext}>APPOINTMENTS</Text>
          <View style={styles.divider} />

          <View style={styles.appointmentCard}>
            <View>
              <Text style={styles.appointmentName}>Riya Sharma</Text>
              <Text style={styles.appointmentDetail}>12 Aug, 2025 • 2:00 PM</Text>
            </View>
            <Text style={[styles.appointmentStatus, { backgroundColor: THEME.secondary }]}>Confirmed</Text>
          </View>

          <View style={styles.appointmentCard}>
            <View>
              <Text style={styles.appointmentName}>Ankit Verma</Text>
              <Text style={styles.appointmentDetail}>13 Aug, 2025 • 11:00 AM</Text>
            </View>
            <Text style={[styles.appointmentStatus, { backgroundColor: '#ffb703' }]}>Pending</Text>
          </View>
        </View>
      </ScrollView>

      {/* Switch Account Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Switch Account</Text>
            <FlatList
              data={accounts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.accountRow}
                  onPress={() => {
                    console.log('Switched to:', item.name);
                    setModalVisible(false);
                  }}
                >
                  <Image source={item.avatar} style={styles.accountAvatar} />
                  <Text style={styles.accountName}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(false)}>
              <Text style={{ color: THEME.white, fontWeight: 'bold' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: THEME.lightGray, },

  shopcon: {
    width: width * 0.9,
    backgroundColor: THEME.primary,
    borderRadius: width * 0.05,
    marginTop: height * 0.025,
    alignSelf: 'center',
    paddingHorizontal: width * 0.05,paddingVertical:width*0.02,
    elevation: 5,
  },
  shopTitle: { fontSize: width * 0.04, fontWeight: 'bold', color: THEME.white,fontFamily: 'Montserrat-SemiBold' },
  shopav: {
    marginTop: height * 0.01,
    borderRadius: width * 0.2,
    width: width * 0.22,
    height: width * 0.22,
    borderWidth: .5,
    borderColor: THEME.white,
  },
  shopImage: { width: width * 0.22, height: width * 0.19 },
  shopName: { fontSize: width * 0.045, color: THEME.white, fontWeight: '600',paddingHorizontal:width*0.05 },
  manageButton: {
    backgroundColor: THEME.white,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.007,
    borderRadius: width * 0.025,
    marginRight: width * 0.05,
  },
  manageText: { color: THEME.primary, fontWeight: 'bold' },
  divider: { width: '100%', height: 1, backgroundColor: '#ffffff99',marginTop:width*0.025  },
  infoText: { fontSize: width * 0.03, fontWeight: 'bold', color: THEME.white, marginHorizontal: width * 0.05 ,paddingTop:width*0.022},
  rowBetween: { flexDirection: 'row',  alignItems: 'center' },

  shopanalytics: {
    width: width * 0.9,
    backgroundColor: THEME.white,
    marginTop: height * 0.025,
    alignSelf: 'center',
    borderRadius: width * 0.05,
    padding: width * 0.04,
    elevation: 5,
  },
  analyticRow: { flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' },
  anaitems: {
    width: '45%',
    backgroundColor: THEME.lightBlue,
    borderRadius: width * 0.025,
    flexDirection: 'row',
    alignItems: 'center',
    padding: width * 0.025,
    marginVertical: height * 0.012,
  },
  analyticsIcon: { width: width * 0.1, height: width * 0.1 },
  analyticsText: { marginLeft: width * 0.025, flex: 1 },
  analyticsLabel: { fontSize: width * 0.03, fontWeight: 'bold', color: THEME.textDark },
  analyticsValue: { fontSize: width * 0.03, fontWeight: 'bold', color: THEME.primary, marginTop: height * 0.003 },

  appointmentcon: {
    width: width * 0.9,
    backgroundColor: THEME.white,
    borderRadius: width * 0.05,
    padding: width * 0.04,
    marginTop: height * 0.025,
    alignSelf: 'center',
    elevation: 5,
  },
  apptext: { fontSize: width * 0.045, fontWeight: 'bold', color: THEME.primary, marginBottom: height * 0.012 },
  appointmentCard: {
    backgroundColor: '#f1f5ff',
    borderRadius: width * 0.025,
    padding: width * 0.04,
    marginBottom: height * 0.012,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appointmentName: { fontSize: width * 0.04, fontWeight: 'bold', color: THEME.textDark },
  appointmentDetail: { fontSize: width * 0.03, color: '#666', marginTop: height * 0.005 },
  appointmentStatus: {
    fontSize: width * 0.03,
    paddingVertical: height * 0.004,
    paddingHorizontal: width * 0.025,
    borderRadius: width * 0.05,
    color: THEME.white,
    fontWeight: 'bold',
  },

  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' },
  modalBox: { backgroundColor: THEME.white, width: width * 0.8, borderRadius: width * 0.03, padding: width * 0.04, elevation: 5 },
  modalTitle: { fontSize: width * 0.045, fontWeight: 'bold', marginBottom: height * 0.012, textAlign: 'center', color: THEME.primary },
  accountRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: height * 0.01 },
  accountAvatar: { width: width * 0.1, height: width * 0.1, borderRadius: width * 0.05, marginRight: width * 0.025 },
  accountName: { fontSize: width * 0.04, color: THEME.textDark },
  closeBtn: { marginTop: height * 0.015, backgroundColor: THEME.primary, padding: height * 0.01, borderRadius: width * 0.025, alignItems: 'center' },
});
