import { StatusBar } from 'expo-status-bar';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import * as Contacts from 'expo-contacts';
import { Contact } from 'expo-contacts';

export default function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  
  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync(
        { fields: [Contacts.Fields.PhoneNumbers] }
    );
       if (data.length > 0) {
      setContacts(data);
      }
      else {
        Alert.alert("Warning", "No contacts found.");      
      }
    }
    
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <FlatList
          style={styles.list}
          data={contacts}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemText}>{item.phoneNumbers?.[0]?.number}</Text>
            </View>
          )}
        />
        <Button title="GET CONTACTS" onPress={getContacts} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginBottom: 10,
  },
  list: {
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'blue',
    paddingTop: 24,
    paddingBottom: 8,
  },
  itemText: {
    fontSize: 16,
  },
});