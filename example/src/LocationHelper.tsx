import Geolocation from 'react-native-geolocation-service';

export const getLocationPermissions = async (): Promise<boolean> => {
  const result = await Geolocation.requestAuthorization('whenInUse');
  if (result === 'granted') {
    return true;
  } else {
    return false;
  }
};

export const getCurrentLocation = (): Promise<{
  coords: { latitude: number; longitude: number };
}> => {
  return new Promise<{ coords: { latitude: number; longitude: number } }>(
    (resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position: { coords: { latitude: number; longitude: number } }) => {
          resolve(position);
        },
        (error) => {
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  );
};
