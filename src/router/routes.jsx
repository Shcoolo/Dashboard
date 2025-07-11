import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { ForgetPassword, Home, Login, NotFound } from "../pages";
import Team from "../scenes/team";
import Contacts from "../scenes/contacts";
import Form from "../scenes/form";
import Bar from "../scenes/bar";
import Pie from "../scenes/pie";
import Line from "../scenes/line";
import Calendar from "../scenes/calendar/calendar";
import AuthProtected from "./AuthProtected";

const router = createBrowserRouter([
    {
    path: "/",
    element: (
      <AuthProtected>
        <App />
      </AuthProtected>
    ),
    children: [
      {
        index:true,
        element: <Home />
      },
      {
        path: "/team",
        element: <Team />
      },
      {
        path: "/contacts",
        element: <Contacts />
      },
      {
        path: "/form",
        element: <Form />
      },
      {
        path: "/bar",
        element: <Bar />
      },
      {
        path: "/pie",
        element: <Pie />
      },
      {
        path: "/line",
        element: <Line />
      },
      {
        path: "/calendar",
        element: <Calendar />
      }
    ]
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'forget-password',
    element: <ForgetPassword />
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

export default router;