import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Notes from './pages/Notes';
import PublicRoute from './components/PublicRoute';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header/>
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
