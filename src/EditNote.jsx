import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditNote() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 🔐 Get token
  const token = localStorage.getItem("token");

  // ✅ Fetch existing note
  useEffect(() => {

    axios.post(
      "http://localhost:8081/getNoteById",
      { id },
      {
        headers: {
          Authorization: token
        }
      }
    )
    .then(res => {
      if (res.data) {
        setTitle(res.data.title);
        setContent(res.data.content);
      } else {
        alert("Note not found");
        navigate("/home");
      }
    })
    .catch(err => {
      console.error(err);

      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      }
    });

  }, [id, token, navigate]);

  // ✅ Update note
  const handleUpdate = async () => {

    if (!title || !content) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8081/updateNote",
        {
          id,
          title,
          content
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      alert("Note Updated ✅");
      navigate("/home");

    } catch (err) {
      console.error(err);

      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        alert("Error updating note");
      }
    }
  };

  return (
    <div className="container mt-5">

      <h2>Edit Note ✏️</h2>

      <input
        className="form-control mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="form-control mb-2"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button className="btn btn-success me-2" onClick={handleUpdate}>
        Update
      </button>

      <button 
        className="btn btn-secondary"
        onClick={() => navigate("/home")}
      >
        Cancel
      </button>

    </div>
  );
}

export default EditNote;