import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/routes";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
  </QueryClientProvider>
);