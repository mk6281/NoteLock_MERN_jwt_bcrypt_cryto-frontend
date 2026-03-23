import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Login from './login';
import Home from './home';
import SignUp from './signUp';
import Credentials from './credentials';
import Registration from './registration';
import ProtectedRoute from './ProtectedRoute';

// ✅ New Pages
import AddNote from './AddNote';
import EditNote from './EditNote';
import ViewNote from './ViewNote';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>

          {/* ===== PUBLIC ROUTES ===== */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/registration" element={<Registration />} />

          {/* ===== PROTECTED ROUTES ===== */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-note"
            element={
              <ProtectedRoute>
                <AddNote />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-note/:id"
            element={
              <ProtectedRoute>
                <EditNote />
              </ProtectedRoute>
            }
          />

          <Route path="/credentials" element={<ProtectedRoute><Credentials /></ProtectedRoute>} />

          <Route
            path="/view-note/:id"
            element={
              <ProtectedRoute>
                <ViewNote />
              </ProtectedRoute>
            }
          />

          {/* ===== 404 PAGE ===== */}
          <Route
            path="*"
            element={
              <div className="text-center mt-5">
                <h2>404 - Page Not Found 🚫</h2>
                <p>This page doesn’t exist.</p>
              </div>
            }
          />

        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;