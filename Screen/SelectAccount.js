import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { Image } from "react-native-animatable";
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

export default function Register({ navigation }) {
    const [name, setName] = useState('');

    const handleRegister = () => {
        // Handle register logic
        console.log("Registering...");
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <LinearGradient
                colors={["#3A86FF", "#06D6A0"]}
                style={styles.header}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <Text style={styles.headerText}>Welcome to PocketFix</Text>
            </LinearGradient>

            {/* Card */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Choose your role</Text>
                <Text style={styles.cardSubtitle}>Are you a Customer or a Partner?</Text>

                {/* Customer */}
                <TouchableOpacity onPress={()=>navigation.navigate('Register')} style={styles.roleCard}>
                    <Image source={require("../Screen/images/cust1.png")} style={styles.roleImage} />
                    <Text style={styles.roleText}>Become a Customer</Text>
                </TouchableOpacity>

                {/* Partner */}
                <TouchableOpacity onPress={()=>navigation.navigate("RegisterShop")} style={styles.roleCard}>
                    <Image source={require("../Screen/images/part.png")} style={styles.roleImage} />
                    <Text style={styles.roleText}>Become a Partner</Text>
                </TouchableOpacity>
            </View>

            {/* Footer */}
            <LinearGradient
                colors={["#3A86FF", "#06D6A0"]}
                style={styles.footer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <Text style={styles.footerText}>Let’s Explore Together</Text>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        width: "100%",
        height: width*0.9,
        borderBottomLeftRadius: 180,
        borderBottomRightRadius: 120,
       
        paddingBottom:width*0.05,
    },
    headerText: {
        color: "#fff",
        fontSize: width*0.06,
        fontWeight: "bold",textAlign:"center",marginTop:width*0.2
    },
    card: {
        position: "absolute",
        top: width * 0.45,
        alignSelf: "center",
        backgroundColor: "#fff",
        width: "85%",
        padding: width*0.05,
        borderRadius: 20,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    cardTitle: {
        fontSize: width*0.05,
        fontWeight: "bold",
        textAlign: "center",
        color: "#333",
        marginBottom: 5,
    },
    cardSubtitle: {
        textAlign: "center",
        color: "#666",
        marginBottom: width*0.05,
    },
    roleCard: {
        backgroundColor: "#F8F9FA",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: width * 0.02,
        padding: width*0.035,
        elevation: 3,
    },
    roleImage: {
        width: width * 0.3,
        height: width * 0.3,
        marginBottom: 10,
        resizeMode: "contain",
    },
    roleText: {
        fontSize: width*0.04,
        fontWeight: "500",
        color: "#333",
    },
    footer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: width * 0.15,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        justifyContent: "center",
        alignItems: "center",
    },
    footerText: {
        color: "#fff",
        fontSize: width*0.05,
        fontWeight: "600",
    },
});
