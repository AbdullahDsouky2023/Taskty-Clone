import RootNavigator from "./app/navigation";
import { I18nManager, LogBox } from "react-native";
import { Provider } from "react-redux";
import store from "./app/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

I18nManager.forceRTL(true);

export const client = new QueryClient()
const App = () => {
  return (
    <Provider store={store}>
         <QueryClientProvider client={client}>

      <RootNavigator />
      </QueryClientProvider>

    </Provider>
  );
};

export default App;