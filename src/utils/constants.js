// import AsyncStorage from '@react-native-async-storage/async-storage';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const GetThemeColor = () => {
  const objUserDetail = AppConstant.shared.globalStoredUserInfo;
  if (objUserDetail) {
    return '#FFC700';
  } else {
    return '#FFC700';
  }
};

class AppConstant {
  //Shared instance.
  static shared = AppConstant.shared == null ? new AppConstant() : this.shared;
  //Global shared object.
  globalStoredUserInfo = null;
}

/**
 * It is used to remove all stored data from async storage.
 */
export const RemoveAllStoredDataFromAsyncStorage = () => {
  AppConstant.shared.globalStoredUserInfo = null;
  AppConstant.shared.globalDeliveryLocation = null;
  const keys = [
    'accessToken',
    'userDetail',
    'loginUserId',
    'loginData',
    'userType',
  ];
  AppConstant.shared.globalStoredUserInfo = null;
  AsyncStorage.multiRemove(keys, error => {
    if (error === null) {
      console.log('REMOVED ALL STORED DATAs.');
    } else {
      console.log(
        'ERROR: Storage.RemoveAllStoredDataFromAsyncStorage: - ' + error,
      );
    }
  });
};

export default AppConstant;
