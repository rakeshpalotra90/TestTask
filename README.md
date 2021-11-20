## TestTask Mobile App

To get started with the app, make sure you have Node.js > 12 ( Use NVM for quickly switching between various node versions) and Yarn installed ( our dependency version locks are done in yarn ). Then clone this repo and run `yarn install`.

Make sure you also have the `react-native` cli installed or install and use `npx`, for example `npx react-native run-ios`.

#### Installing native dependencies

Since we are using RN 0.60, linking is now done automatically. Any library that you plan to install make sure has automatic linking support, the Readme of the lib should include that part. A general rule of thumb whenever you have native dependencies is to go to the `ios` folder and run the following command:

```
npx pod-install
```

### Running the app

Once you are done with the setup

#### For iOS

To run the app on the default simulator, type

```
npx react-native run-ios
yarn ios
```

If you want to test the app in a different simulator, type

```
npx react-native run-ios --simulator="iPhone 11"
```

You can change the simulator name to any device available in XCode.

#### For Android

Open the Android folder in Android Studio. Set up an Android virtual device).

```
npx react-native run-android
yarn android
```
