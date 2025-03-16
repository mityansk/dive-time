import { Provider } from "react-redux";
import store from "./store/store";
import Router from "./router/router";
import dayjs from 'dayjs';
dayjs().format();

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
