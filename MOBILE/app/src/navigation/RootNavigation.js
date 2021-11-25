import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    console.log('Root nav name', name);
    console.log('Root nav param', params);
    navigationRef.navigate(name, params);
  }
}
