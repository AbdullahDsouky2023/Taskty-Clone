import RootNavigator from "./app/navigation";
import { I18nManager } from "react-native";

I18nManager.forceRTL(true);
const App = () => {
  return <RootNavigator />;
};

export default App;
