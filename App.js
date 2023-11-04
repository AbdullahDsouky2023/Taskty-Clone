import RootNavigator from "./app/navigation";
import { I18nManager, LogBox } from "react-native";
import { Provider } from "react-redux";
import store from "./app/store";

I18nManager.forceRTL(true);

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;