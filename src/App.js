import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Error from "./pages/Error";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivateRoute from './components/core/Auth/PrivateRoute'
import Dashboard from "./pages/Dashboard";
import DashboardDefault from "./components/core/Dashboard/DashboardDefault";
import MyProfile from "./components/core/Dashboard/MyProfile";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import Settings from "./components/core/Dashboard/Settings/Settings";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import AddCourse from "./components/core/Dashboard/AddCourse/index";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/Instructor";

function App() {

  const {user} = useSelector((state) => state.profile);

  return (
    <div className = "bg-richBlack-900 w-screen min-h-screen flex flex-col justify-start font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="about" element={<About/>}/>
        <Route path="contact" element={<Contact/>}/>
        <Route path="catalog/:catalogName" element={<Catalog/>} />
        <Route path="courses/:courseId" element={<CourseDetails/>} />
        <Route path="login" element={   <OpenRoute> <LogIn/> </OpenRoute>   }/>
        <Route path="signup" element={   <OpenRoute> <SignUp/> </OpenRoute>   }/>
        <Route path="verify-email" element={   <OpenRoute> <VerifyEmail/> </OpenRoute>   }/>
        <Route path="forgot-password" element={   <OpenRoute> <ForgotPassword/> </OpenRoute>   }/>
        <Route path="update-password/:token" element={   <OpenRoute> <UpdatePassword/> </OpenRoute>   }/>

        <Route path="dashboard" element={ <PrivateRoute> <Dashboard/> </PrivateRoute> }>

          <Route index element={ <DashboardDefault/> }/>
          <Route path="my-profile" element={ <MyProfile/> }/>
          <Route path="settings" element={ <Settings/> }/>

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="cart" element={ <Cart/> }/>
                <Route path="enrolled-courses" element={ <EnrolledCourses/> }/>
              </>
            )
          }
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="instructor" element={<Instructor />} />
                <Route path="add-course" element={ <AddCourse/> }/>
                <Route path="my-courses" element={ <MyCourses/> }/>
                <Route path="edit-course/:courseId" element={<EditCourse/>} />
              </>
            )
          }

        </Route>

        {/* For the watching course lectures */}
        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route>

        <Route path='*' element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;