import { Provider } from "react-redux";
import { store } from "./app/store";
import router from "./routes/router";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  );
}

export default App;