import * as React from 'react';
import { useState } from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import AddressAutocomplete from 'react-native-address-autocomplete';

export default function App() {
  const [enteredAddress, setEnteredAddress] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const onChange = async (text: string) => {
    setEnteredAddress(text);
    AddressAutocomplete.getAddressSuggestions(text).then((addresses) => {
      setSuggestions(addresses);
    });
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={enteredAddress}
            onChangeText={onChange}
          />
        </View>

        <View style={styles.suggestionsContainer}>
          <ScrollView style={styles.suggestions}>
            {suggestions.map((address, index) => {
              return (
                <TouchableOpacity
                  onPress={async () => {
                    console.log('search');

                    const addressDetails = await AddressAutocomplete.getAddressDetails(
                      address
                    );
                    console.log(addressDetails);
                  }}
                >
                  <View style={styles.address} key={index}>
                    <Text>{address}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'red',
    height: 40,
    padding: 5,
  },
  inputWrapper: {
    marginVertical: 15,
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  address: {
    paddingVertical: 10,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  suggestions: {},
  suggestionsContainer: {},
});
