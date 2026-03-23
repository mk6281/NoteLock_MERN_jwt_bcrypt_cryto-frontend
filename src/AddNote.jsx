import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddNote() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {

    if (!title || !content) {
      alert("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8081/addNote",
        {
          title,
          content   // ❌ no email
        },
        {
          headers: {
            Authorization: token  // 🔐 send token
          }
        }
      );

      alert("Note Added ✅");

      // clear fields
      setTitle("");
      setContent("");

      // redirect to home
      navigate("/home");

    } catch (err) {
      console.error(err);

      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        alert("Error adding note");
      }
    }
  };

  return (
    <div className="container mt-5">

      <h2>Add Note</h2>

      <input
        className="form-control mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="form-control mb-2"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button className="btn btn-primary" onClick={handleSubmit}>
        Save
      </button>

    </div>
  );
}

export default AddNote;