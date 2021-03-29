# react-native-address-autocomplete IOS Only

Autocomplete address natively without any external API.
This module is using MKLocalSearchCompleter Class in IOs, to provide suggestions to user entered address.
Reason to use this over Google Places API is that this solution is free of charge, meanwhile other external API providers charge requests.
This solution is only for IOs, as Android do not have free of charge service to get address suggesions.

**[29.03.2021]** Implemented reverse geocoding, now you can reverse geocode coordinates.

## Installation

```sh
npm install react-native-address-autocomplete
cd ios
pod install
```

## Usage

```js
import AddressAutocomplete from 'react-native-address-autocomplete';

// ...

const suggestions = await AddressAutocomplete.getAddressSuggestions('New York');
console.log(suggestions);
// string[]

const details = await AddressAutocomplete.getAddressDetails('New York');
console.log(details);
// {
//   title: string;
//   coordinate: {
//     latitude: number;
//     longitude: number;
//   };
//   region: {
//     longitude: number;
//     latitude: number;
//     longitudeDelta: number;
//     latitudeDelta: number;
//   };
// };

const reverseGeocodeResult = await AddressAutocomplete.reverseGeocodeLocation(22.16887, 52.12333);
console.log(reverseGeocodeResult);
// {
//  street: string;
//  house: string;
//  zip: number;
//  country: string;
// };
```

You should fetch details, using string from suggestion on touch, as details will return only one result.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
