import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/routes";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import { ToastNotification } from "./components";


const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <RouterProvider router={router} />

      <ToastNotification />
    </Provider>
  </QueryClientProvider>
);