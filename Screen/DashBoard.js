import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  Animated,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  StatusBar,
  FlatList,
} from "react-native";
import GlobalFont from "react-native-global-font";
import LinearGradient from "react-native-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import { services, popular } from "./MapArray";

const { width } = Dimensions.get("window");

export default function DashBoard({navigation}) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    GlobalFont.applyGlobal(
      "Montserrat-SemiBold",
      "Poppins-Medium",
      "Poppins-Regular",
      "Poppins-Light",
      "Poppins-Bold"
    );
  }, []);

 

  const toggleShowAll = useCallback(() => {
    setShowAll((prev) => !prev);
  }, []);

  const gradientOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const lightGradientOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const HeaderContent = () => (
    <View style={{ paddingHorizontal: 20, paddingTop: width * 0.09, paddingBottom: width * 0.02 }}>
      <View style={{ paddingVertical: width * 0.02, flexDirection: "row" }}>
        <View
          style={{
            marginRight: width * 0.03,
            elevation: 1,
            borderRadius: 100,
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <Image
            source={require("../Screen/images/logo.png")}
            style={{ width: width * 0.12, height: width * 0.12, borderRadius: width * 0.06 }}
          />
        </View>
        <View>
          <Text style={{ color: "#000", fontSize: width * 0.04, fontFamily: "Montserrat-SemiBold" }}>
            Sharmasaab568
          </Text>
          <Text style={{ color: "#555", fontFamily: "Poppins-Light", fontSize: width * 0.037 }}>
            RSD Pathanot
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#f0f0f0",
          borderRadius: 12,
          paddingHorizontal: 12,
        }}
      >
        <Image
          style={{ width: width * 0.08, height: width * 0.08, tintColor: "#bababa", marginRight: 10 }}
          source={require("../Screen/images/search1.png")}
        />
        <TextInput
          placeholder="Search for services near you..."
          placeholderTextColor="#aaa"
          style={{ flex: 1, color: "#000", fontSize: 16, fontFamily: "Montserrat-SemiBold" }}
        />
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Animated Header */}
      <View style={{ position: "absolute", top: 0, width: "100%", zIndex: 10 }}>
        <Animated.View style={{ opacity: gradientOpacity }}>
          <LinearGradient colors={["#3A86FF", "#06D6A0"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <HeaderContent />
          </LinearGradient>
        </Animated.View>
        <Animated.View style={{ position: "absolute", top: 0, width: "100%", opacity: lightGradientOpacity }}>
          <LinearGradient colors={["#ffffff", "#ffffff"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <HeaderContent />
          </LinearGradient>
        </Animated.View>
      </View>

      <Animated.ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: width * 0.39 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Banner */}
        <LinearGradient
          colors={["#3A86FF", "#06D6A0"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            paddingHorizontal: 20,
            marginBottom: 20,
            paddingBottom: width * 0.02,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
          }}
        >
          <View style={{ padding: width * 0.02 }}>
            <Image
              source={require("../Screen/images/logo.png")}
              style={{ width: "100%", height: width * 0.3, borderRadius: width * 0.06 }}
            />
          </View>
        </LinearGradient>

        {/* Services Section */}
        <View style={{ paddingHorizontal: width * 0.05 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 20, color: "#000", fontWeight: "600" }}>Available Services</Text>
            <View style={{ flex: 1, height: 1.5, backgroundColor: "gray", marginLeft: 10 }} />
          </View>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              backgroundColor: "#fff",
              elevation: 15,
              borderRadius: 10,
              shadowColor: "#adadad",
              paddingVertical: width * 0.05,
              position: "relative", borderWidth: 1, borderColor: "#c9c9c9"
            }}
          >
            <FlatList
              data={showAll ? services : services.slice(0, 6)}
              keyExtractor={(item) => item.id}
              numColumns={3}
              columnWrapperStyle={{ justifyContent: "space-evenly" }}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                onPress={()=>navigation.navigate("AllShopes")}
                  style={{
                    width: width * 0.25,
                    backgroundColor: "#f8f8f8",
                    borderRadius: 16,
                    paddingVertical: width * 0.02,
                    alignItems: "center",
                    marginBottom: width * 0.02,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.05,
                    shadowRadius: 5,
                    elevation: 1,
                  }}
                >
                  <Image
                    source={item.image}
                    style={{
                      width: 50,
                      height: 50,
                      resizeMode: "contain",
                      tintColor: "#2e5247",
                    }}
                  />
                  <Text
                    style={{
                      color: "#2e5247",
                      marginTop: 10,
                      fontSize: 16,
                      fontWeight: "500",
                    }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />

            {services.length > 6 && (
              <TouchableOpacity
                onPress={toggleShowAll}
                style={{
                  position: "absolute",
                  bottom: width * 0.0,
                  right: 10,

                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  zIndex: 1
                }}
              >
                <Text style={{ color: "#525252", fontWeight: "bold" }}>
                  {showAll ? "Less" : "More.."}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Popular Section */}
        <View style={{  marginTop: 25 }}>
          <Text style={{ fontSize: 20, color: "#000", marginBottom: 15, fontWeight: "600",paddingHorizontal: 20, }}>
            Popular Near You
          </Text>

          <Animated.FlatList
            data={popular}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={true}  // Keep scrolling enabled
            renderItem={({ item, index }) => {
              const itemHeight = width * 0.36; // Approx height of each card (adjust if needed)

              // Using scrollY and the index of each item to determine scale and opacity
              const inputRange = [
                (index - 1) * itemHeight,
                index * itemHeight,
                (index + 1) * itemHeight,
              ];

              const scale = scrollY.interpolate({
                inputRange,
                outputRange: [0.95, 1, 0.95], // Adjusting scale for pop-in effect
                extrapolate: "clamp",
              });

              return (
                <Animated.View
                  style={{
                    transform: [{ scale }],
                    marginBottom: 15,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      backgroundColor: "#f8f8f8",
                      borderRadius: 16,
                      padding: 15,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.05,
                      shadowRadius: 5,
                      elevation: 4,
                      alignItems: "center",marginHorizontal:width*0.05
                    }}
                  >
                    <Image
                      source={item.img}
                      style={{
                        width: width * 0.3,
                        height: width * 0.3,
                        borderRadius: 10,
                        marginRight: 15,
                        backgroundColor: "#ddd",
                      }}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: "#000", fontWeight: "600", fontSize: 16 }}>{item.name}</Text>
                      <Text style={{ color: "#555", fontSize: 14 }}>{item.service}</Text>
                      <Text style={{ color: "#facc15", fontWeight: "bold", fontSize: 14 }}>⭐ {item.rating}</Text>
                      <TouchableOpacity
                        style={{
                          marginTop: 8,
                          backgroundColor: "#3a7cff",
                          paddingVertical: 6,
                          borderRadius: 8,
                          alignItems: "center",
                          alignSelf: "flex-start",
                          paddingHorizontal: 15,
                        }}
                      >
                        <Text style={{ color: "#fff", fontWeight: "600", fontSize: 14 }}>Book Now</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Animated.View>
              );
            }}
          />


        </View>

        {/* Refer Section */}
        <View
          style={{
            backgroundColor: "#f8f8f8",
            padding: 20,
            borderRadius: 16,
            marginHorizontal: 20,
            alignItems: "center",
            marginTop: 20,
            marginBottom: 20,
            elevation: 15,
          }}
        >
          <Text style={{ color: "#000", fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
            Get Rewards By Refer or Invite a Friend
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#3a7cff",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 10,
              marginTop: 10,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>Refer Now</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={{ height: 100, justifyContent: "center" }}>
          <Text style={{ color: "#888", textAlign: "center" }}>
            © 2025 Pocketfix. All rights reserved.
          </Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
}
