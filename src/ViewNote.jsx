import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ViewNote() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token"); // 🔐 get token

  useEffect(() => {
    console.log("📌 Note ID:", id);

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
      console.log("📦 Response:", res.data);

      if (res.data) {
        setNote(res.data);
      } else {
        setNote(false);
      }

      setLoading(false);
    })
    .catch(err => {
      console.error("❌ Error:", err);

      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setNote(false);
      }

      setLoading(false);
    });

  }, [id, token, navigate]);

  // 🔄 Loading state
  if (loading) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  // ❌ Not found
  if (!note) {
    return (
      <div className="text-center mt-5">
        <p>⚠️ Note not found</p>
        <button className="btn btn-secondary" onClick={() => navigate("/home")}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">

      <button 
        className="btn btn-secondary mb-3"
        onClick={() => navigate("/home")}
      >
        ⬅ Back
      </button>

      <div className="card p-4">
        <h3>{note.title}</h3>
        <hr />
        <p>{note.content}</p>
      </div>

    </div>
  );
}

export default ViewNote;