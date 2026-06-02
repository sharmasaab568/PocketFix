import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity,Dimensions } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
const { width} = Dimensions.get('window');
export default function Register({navigation}) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleRegister = () => {
    // Handle register logic
    console.log({ name, gender, locality, city, state, email, phone });
  };

  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: 'white' }}>
      <Text  onPress={()=>navigation.navigate("DashBoard")} style={{fontSize:width*0.04,position:"absolute",zIndex:100,color:'white',top:width*0.1,textDecorationLine:'underline',right:width*0.1,letterSpacing:2}}>Skip</Text>
      <LinearGradient
        colors={["#3A86FF", "#06D6A0"]}
        style={{
          width: "100%",
          height: 400,
          borderBottomLeftRadius: 220,
          borderBottomRightRadius: 120,
          paddingLeft: 80,
        }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={{
          color: "#fff",
          fontSize: 24,
          fontWeight: "600",
          marginTop: 80,
        }}>Register Yourself</Text>
      </LinearGradient>

      <View style={{
        position: "absolute",
        top: 130,
        alignSelf: "center",
        backgroundColor: "#fff",
        width: "85%",
        height: 600,
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 8,
      }}>
        <Text style={{
          fontSize: 16,
          color: "#333",
          textAlign: "center",
          marginBottom: 10,
        }}>Welcome to Pocketfix Customer Portal</Text>

        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            padding: 10,
            marginBottom: 10,
          }}
          placeholder="Full Name"
          placeholderTextColor="#777"
          value={name}
          onChangeText={setName}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
          {['Male', 'Female', 'Other'].map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => setGender(option)}
              style={{
                flex: 1,
                marginHorizontal: 5,
                padding: 10,
                borderWidth: 1,
                borderRadius: 8,
                borderColor: gender === option ? '#3A86FF' : '#ccc',
                backgroundColor: gender === option ? '#3A86FF' : '#fff',
              }}
            >
              <Text style={{
                color: gender === option ? 'white' : '#333',
                textAlign: 'center',
              }}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            padding: 10,
            marginBottom: 10,
          }}
          placeholder="Locality"
          placeholderTextColor="#777"
          value={locality}
          onChangeText={setLocality}
        />

        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            padding: 10,
            marginBottom: 10,
          }}
          placeholder="City"
          placeholderTextColor="#777"
          value={city}
          onChangeText={setCity}
        />

        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            padding: 10,
            marginBottom: 10,
          }}
          placeholder="State"
          placeholderTextColor="#777"
          value={state}
          onChangeText={setState}
        />

        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            padding: 10,
            marginBottom: 10,
          }}
          placeholder="Email"
          placeholderTextColor="#777"
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
        />

        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            padding: 10,
            marginBottom: 10,
          }}
          placeholder="Phone Number"
          placeholderTextColor="#777"
          value={phone}
          keyboardType="phone-pad"
          maxLength={10}
          onChangeText={setPhone}
        />

        <TouchableOpacity
          onPress={handleRegister}
          style={{ borderRadius: 12, overflow: 'hidden', marginTop: 10 }}
        >
          <LinearGradient
            colors={['#3A86FF', '#06D6A0']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              paddingVertical: 12,
              alignItems: 'center',
              borderRadius: 12,
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Submit</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
