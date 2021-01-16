import { NativeModules } from 'react-native';

type AddressAutocompleteType = {
  multiply(a: number, b: number): Promise<number>;
};

const { AddressAutocomplete } = NativeModules;

export default AddressAutocomplete as AddressAutocompleteType;
