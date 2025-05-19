import { OneSignal } from "react-native-onesignal";

export function tagUserInfoCreate() {
  OneSignal.User.addTags({
    user_name: 'luiz',
    user_email: 'Mollgoetten3012lpg@gmail.com'
  })
}