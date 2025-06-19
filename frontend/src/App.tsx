import { Provider } from "react-redux";
import { store } from "./app/store";
import router from "./routes/router";
import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import { loginSuccess } from "./features/user/userSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      dispatch(loginSuccess({ token, user: JSON.parse(user) }));
    }
  }, [dispatch]);

  return (
    <RouterProvider router={router} />
  );
}

export default function WrappedApp() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
