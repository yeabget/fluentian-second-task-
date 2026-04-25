import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateCourse from "./components/CreateCourse";
import ManageCourses from "./components/ManageCourses";
import Home from './components/Home';
import Courses from './components/Courses';
import Dashboard from './components/Dashboard';
import Chat from './components/Chat';
import Subscription from './components/Subscription';
import Help from './components/Help';
import CourseRoadmap from "./components/CourseRoadmap";
import Register from "./components/Register";
import Payment from "./components/Payment";
import CourseProvider from "./components/CourseContext";
import AIChat from "./components/AIChat";
import TestAPI from "./components/TestAPI";
function App() {
  return (
    <BrowserRouter>
 <CourseProvider>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/help" element={<Help />} />
        <Route path="/courseRoadmap" element={<CourseRoadmap />} />
        <Route path="/create-course" element={<CreateCourse />} />
        <Route path="/manage-courses" element={<ManageCourses />} />
         <Route path="/payment" element={<Payment />} />
        <Route path="/register" element={<Register />} />
      </Routes>
        <AIChat />
          
</CourseProvider>
    </BrowserRouter>
  );
}

export default App;