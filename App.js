import AppNavigator from "./app/navigation";
import { I18nManager } from "react-native";

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);
const App = () => {
  return <AppNavigator />;
};

export default App;
