import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const token = localStorage.getItem("token");

  // 🔥 BACKEND URL (CHANGE AFTER DEPLOY)
  const API = "https://notelock-mern-jwt-bcrypt-cryto-backend.onrender.com";

  // ✅ Fetch notes (FIXED with useCallback)
  const fetchNotes = useCallback(() => {
    axios.post(
      `${API}/getNotes`,
      {},
      {
        headers: {
          Authorization: token
        }
      }
    )
    .then(res => setNotes(res.data))
    .catch(err => {
      console.error(err);

      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    });
  }, [token, navigate]);

  // ✅ Protect + Fetch (FIXED dependencies)
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchNotes();
    }
  }, [token, fetchNotes, navigate]);

  // ✅ Add note
  const handleAddNote = () => {
    if (!title || !content) {
      alert("Please fill all fields");
      return;
    }

    axios.post(
      `${API}/addNote`,
      { title, content },
      {
        headers: {
          Authorization: token
        }
      }
    )
    .then(() => {
      setTitle("");
      setContent("");
      fetchNotes();
    })
    .catch(err => {
      console.error(err);

      if (err.response?.status === 401) {
        alert("Session expired");
        localStorage.removeItem("token");
        navigate("/login");
      }
    });
  };

  // ✅ Delete note
  const handleDelete = (id) => {
    axios.post(
      `${API}/deleteNote`,
      { id },
      {
        headers: {
          Authorization: token
        }
      }
    )
    .then(() => fetchNotes())
    .catch(err => {
      console.error(err);

      if (err.response?.status === 401) {
        alert("Session expired");
        localStorage.removeItem("token");
        navigate("/login");
      }
    });
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container mt-5">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>📒 NoteLock Dashboard</h2>

        <div>
          <button 
            className="btn btn-secondary me-2"
            onClick={() => navigate("/credentials")}
          >
            🔐 Password Manager
          </button>

          <button 
            className="btn btn-danger"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Add Note */}
      <div className="card p-3 mb-4">
        <h5>Add New Note</h5>

        <input
          type="text"
          className="form-control mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="form-control mb-2"
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button className="btn btn-primary" onClick={handleAddNote}>
          Save Note
        </button>
      </div>

      {/* Notes List */}
      <h4>Your Notes</h4>

      {notes.length === 0 ? (
        <p>No notes found</p>
      ) : (
        notes.map((note) => (
          <div key={note._id} className="card p-3 mb-3">

            <h5>{note.title}</h5>
            <p>{note.content}</p>

            <div className="mt-2">

              <button
                className="btn btn-sm btn-primary me-2"
                onClick={() => navigate(`/view-note/${note._id}`)}
              >
                View
              </button>

              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => navigate(`/edit-note/${note._id}`)}
              >
                Edit
              </button>

              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(note._id)}
              >
                Delete
              </button>

            </div>

          </div>
        ))
      )}

    </div>
  );
}

export default Home;
