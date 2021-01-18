import { NativeModules } from 'react-native';

type AddressDetails = {
  title: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  region: {
    longitude: number;
    latitude: number;
    longitudeDelta: number;
    latitudeDelta: number;
  };
};

const NativeAddressAutocomplete = NativeModules.AddressAutocomplete;

class AddressAutocomplete {
  static getAddressDetails = async (
    address: string
  ): Promise<AddressDetails> => {
    const promise = new Promise<AddressDetails>(async (resolve, reject) => {
      if (address.length > 0) {
        try {
          const details = await NativeAddressAutocomplete.getAddressDetails(
            address
          );
          resolve(details);
        } catch (err) {
          reject(err);
        }
      } else {
        reject('Address length should be greater than 0');
      }
    });
    return promise;
  };

  static getAddressSuggestions = async (address: string): Promise<string[]> => {
    const promise = new Promise<string[]>(async (resolve, reject) => {
      if (address.length > 0) {
        try {
          const suggestions = await NativeAddressAutocomplete.getAddressSuggestions(
            address
          );
          resolve(suggestions);
        } catch (err) {
          reject(err);
        }
      } else {
        reject('Address length should be greater than 0');
      }
    });
    return promise;
  };
}

export default AddressAutocomplete;
