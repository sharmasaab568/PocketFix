import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import React, { useState } from 'react'

export default function Shop() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [address, setAddress] = useState('')
  const [errors, setErrors] = useState({})

  const handleSubmit = () => {
    const nextErrors = {}

    if (!name.trim()) nextErrors.name = 'Shop name is required.'
    if (!description.trim()) nextErrors.description = 'Shop description is required.'
    if (!address.trim()) nextErrors.address = 'Shop address is required.'

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      Alert.alert('Success', 'Shop information updated successfully.')
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Your Shop Catalog</Text>
          <Text style={styles.description}>Here you can manage your shop's products, view orders, and update your shop information.</Text>
          <View style={styles.shopform}>
            <Text style={styles.label}>Shop Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter your shop name"
              placeholderTextColor="#999"
              selectionColor="#ff6b35"
              style={styles.input}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <Text style={styles.label}>Shop Description</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Describe your shop"
              placeholderTextColor="#999"
              selectionColor="#ff6b35"
              textAlignVertical="top"
              multiline
              style={[styles.input, styles.textArea]}
            />
            {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

            <Text style={styles.label}>Shop Address</Text>
            <TextInput
              value={address}
              onChangeText={setAddress}
              placeholder="Enter shop address"
              placeholderTextColor="#999"
              selectionColor="#ff6b35"
              textAlignVertical="top"
              multiline
              style={[styles.input, styles.textArea]}
            />
            {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Update Shop Information</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b3050',
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    marginBottom: 10,
    color: '#ff6b35',
    textAlign: 'center',
    marginTop: 40,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#e0e0e0',
    textAlign: 'center',
    marginBottom: 20,
  },
  shopform: {
    marginTop: 20,
    backgroundColor: '#fff',  
    borderRadius: 15,
    padding: 25,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    color: '#333',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#ff6b35',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#d43f3a',
    marginTop: -10,
    marginBottom: 10,
    fontSize: 14,
  },
  textArea: {
    minHeight: 100,
  },

})