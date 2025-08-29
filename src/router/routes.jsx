import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { AcademicYears, 
  AdminstratorsList, 
  AttendancePage, 
  ClassesList, 
  ForgetPassword, 
  Home, 
  Login, 
  NotFound, 
  ProfilePage,
  ReportPage,
  SchoolInformation, 
  SectionDetailsPage, 
  SectionsList, 
  StudentDetailsPage, 
  StudentsBySection, 
  StudentsList, 
  SubjectDetailPage, 
  SubjectsList, 
  TasksList, 
  TeachersList, 
  Terms, 
  Test, 
  TimeSlots, 
  YearCalender
} from "../pages";

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
        path: "/academic-years",
        element: <AcademicYears />
      },
      {
        path: "/academic-years/:id", 
        element: <YearCalender />
      },
      {
        path: "/academic-terms",
        element: <Terms />
      },
      {
        path: '/students',
        element: <StudentsList />,
      },
      {
        path: '/student/:id',
        element: <StudentDetailsPage />
      },
      {
        path: '/information',
        element: <SchoolInformation />
      },
      {
        path: '/classes',
        element: <ClassesList />
      },
      {
        path: '/sections',
        element: <SectionsList />,
      },
      {
        path: '/section/:id',
        element: <SectionDetailsPage />,
      },
      {
        path: '/section/:id/students',
        element: <StudentsBySection />,
      },
      {
        path: '/subjects',
        element: <SubjectsList />
      },
      {
        path: '/subject/:id',
        element: <SubjectDetailPage />
      },
      {
        path: '/teachers',
        element: <TeachersList />
      },
      {
        path: '/adminstrators',
        element: <AdminstratorsList />
      },
      {
        path: '/profile',
        element: <ProfilePage />
      },
      {
        path: '/time-slots',
        element: <TimeSlots />
      },
      {
        path: '/tasks',
        element: <TasksList />
      },
      {
        path: '/attendance',
        element: <AttendancePage />
      },
      {
        path: '/reports',
        element: <ReportPage />
      },




      {
        path: 'test',
        element: <Test />
      },
      // old pages
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
    path: 'auth',
    children:[
      {
        path: 'forget-password',
        element: <ForgetPassword />
      },
      {
        path: 'confirm-account',
        element: <ForgetPassword />
      }
    ],
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

export default router;