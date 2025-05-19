import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { NotificationClickEvent, OneSignal } from "react-native-onesignal"

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';
import { tagUserInfoCreate } from './src/notifications/notificationsTags';

OneSignal.initialize("09023ffe-5fa0-40cf-95d1-6c024d8feb14")

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate()

  useEffect(() => {
    const handleNotificationClick = (event: NotificationClickEvent): void => {
      const { actionId } = event.result;

      if (actionId === "1") {
        return console.log("Ver todas")
      }

      if (actionId === "2") {
        return console.log("Ver pedido")
      }
    }

    OneSignal.Notifications.addEventListener("click", handleNotificationClick)

    return () => OneSignal.Notifications.removeEventListener("click", handleNotificationClick)
  }, [])
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}