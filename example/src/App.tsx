import React, { useEffect } from 'react';
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
import { getCurrentLocation, getLocationPermissions } from './LocationHelper';

export default function App() {
  const [enteredAddress, setEnteredAddress] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const reverseGeocode = async () => {
      await getLocationPermissions();

      const location = await getCurrentLocation();
      console.log(location);

      const addressDetails = await AddressAutocomplete.reverseGeocodeLocation(
        location.coords.longitude,
        location.coords.latitude
      );
      console.log(addressDetails);
    };
    reverseGeocode();
  }, []);

  const onChange = async (text: string) => {
    setEnteredAddress(text);
    AddressAutocomplete.getAddressSuggestions(text)
      .then((addresses) => {
        setSuggestions(addresses);
      })
      .catch((error) => {
        console.log(error);
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
                  key={index}
                  onPress={async () => {
                    try {
                      const addressDetails = await AddressAutocomplete.getAddressDetails(
                        address
                      );
                      console.log(addressDetails.title);
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                >
                  <View style={styles.address}>
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
