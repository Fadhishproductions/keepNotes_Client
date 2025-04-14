import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Notes from './pages/Notes';
import PublicRoute from './components/PublicRoute';
import Header from './components/Header';
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/ReactToastify.css'
function App() {
  return (
    <Router>
      <Header/>
      <ToastContainer />
      <Routes>
       {/* 👇 Only accessible when NOT logged in */}
       <Route element={<PublicRoute />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        {/* protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/notes" element={<Notes />} />
          {/* Add more protected routes here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
