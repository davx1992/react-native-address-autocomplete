import { NativeModules } from 'react-native';

type AddressAutocompleteType = {
  getAddressSuggestions(address: string): Promise<string[]>;
  getAddressDetails(address: string): Promise<any[]>;
};

const { AddressAutocomplete } = NativeModules;

export default AddressAutocomplete as AddressAutocompleteType;
