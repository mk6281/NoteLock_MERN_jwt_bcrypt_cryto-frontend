import React, { useState, useEffect } from "react";
import axios from "axios";

function Credentials() {

  const [creds, setCreds] = useState([]);
  const [site, setSite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [editId, setEditId] = useState(null);
  const [showPasswords, setShowPasswords] = useState({});

  const token = localStorage.getItem("token");

  // ✅ Fetch credentials
  const fetchCreds = React.useCallback(() => {
  axios.post(
    "http://localhost:8081/getCredentials",
    {},
    { headers: { Authorization: token } }
  ).then(res => setCreds(res.data));
}, [token]);

  useEffect(() => {
  fetchCreds();
}, [fetchCreds]);

  // ✅ Add or Update
  const handleSave = () => {
    if (!site || !username || !password) {
      alert("Fill all fields");
      return;
    }

    if (editId) {
      // 🔄 Update
      axios.post(
        "http://localhost:8081/updateCredential",
        { id: editId, site, username, password },
        { headers: { Authorization: token } }
      ).then(() => {
        resetForm();
        fetchCreds();
      });
    } else {
      // ➕ Add
      axios.post(
        "http://localhost:8081/addCredential",
        { site, username, password },
        { headers: { Authorization: token } }
      ).then(() => {
        resetForm();
        fetchCreds();
      });
    }
  };

  // ✅ Delete
  const handleDelete = (id) => {
    axios.post(
      "http://localhost:8081/deleteCredential",
      { id },
      { headers: { Authorization: token } }
    ).then(() => fetchCreds());
  };

  // ✅ Edit
  const handleEdit = (cred) => {
    setEditId(cred._id);
    setSite(cred.site);
    setUsername(cred.username);
    setPassword(cred.password);
  };

  // ✅ Reset form
  const resetForm = () => {
    setEditId(null);
    setSite("");
    setUsername("");
    setPassword("");
  };

  // ✅ Toggle password visibility
  const togglePassword = (id) => {
    setShowPasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="container mt-5">

      <h2>🔐 Password Manager</h2>

      {/* FORM */}
      <div className="card p-3 mb-4">
        <input
          className="form-control mb-2"
          placeholder="Site"
          value={site}
          onChange={e => setSite(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button className="btn btn-primary" onClick={handleSave}>
          {editId ? "Update" : "Save"}
        </button>

        {editId && (
          <button className="btn btn-secondary mt-2" onClick={resetForm}>
            Cancel
          </button>
        )}
      </div>

      {/* LIST */}
      <h4>Saved Credentials</h4>

      {creds.length === 0 ? (
        <p>No credentials saved</p>
      ) : (
        creds.map(c => (
          <div key={c._id} className="card p-3 mb-3">

            <h5>{c.site}</h5>
            <p><strong>Username:</strong> {c.username}</p>

            <p>
              <strong>Password:</strong>{" "}
              {showPasswords[c._id] ? c.password : "••••••••"}
            </p>

            {/* ACTION BUTTONS */}
            <div className="mt-2">

              <button
                className="btn btn-sm btn-info me-2"
                onClick={() => togglePassword(c._id)}
              >
                {showPasswords[c._id] ? "Hide" : "View"}
              </button>

              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => handleEdit(c)}
              >
                Edit
              </button>

              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(c._id)}
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

export default Credentials;
