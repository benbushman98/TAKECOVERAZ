import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modal State
  const [editingShow, setEditingShow] = useState(null);

  const navigate = useNavigate();
  const workerUrl = "https://takecoveraz.benbushman98.workers.dev";

  // CHECK LOGIN
  useEffect(() => {
    const session = localStorage.getItem("session");
    if (!session) navigate("/login");
  }, [navigate]);

  // LOAD SHOWS
  useEffect(() => {
    fetch("/data/shows.json")
      .then((res) => res.json())
      .then((data) => setShows(data));
  }, []);

  const openEditModal = (show) => setEditingShow({ ...show });
  const closeEditModal = () => setEditingShow(null);

  const updateEditingField = (field, value) => {
    setEditingShow((prev) => ({ ...prev, [field]: value }));
  };

  const saveSingleShow = () => {
    setShows((prev) =>
      prev.map((s) => (s.id === editingShow.id ? editingShow : s))
    );
    closeEditModal();
  };

  const addShow = () => {
    const newShow = {
      id: Date.now(),
      date: "",
      day: "",
      timeStart: "",
      timeEnd: "",
      title: "",
      address: "",
      link: "",
      notes: "",
    };
    setShows([...shows, newShow]);
  };

  const deleteShow = (id) => {
    if (window.confirm("Delete this show?")) {
      setShows((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const saveChanges = async () => {
    setLoading(true);
    const session = localStorage.getItem("session");

    const res = await fetch(`${workerUrl}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-session": session,
      },
      body: JSON.stringify({ shows }),
    });

    const data = await res.json();
    setLoading(false);

    data.success ? alert("Saved!") : alert("Save failed.");
  };

  const logout = () => {
    localStorage.removeItem("session");
    navigate("/login");
  };

  return (
    <div className="container text-white py-5 mt-5">
      <div className="d-flex justify-content-between mb-4 mt-5">
        <h2 className="">Admin Dashboard</h2>
        <button className="btn btn-danger mb-4" onClick={logout}>
          Logout
        </button>
      </div>

      <button className="btn btn-success mb-3" onClick={addShow}>
        + Add Show
      </button>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-dark table-bordered text-center align-middle">
          <thead>
            <tr>
              <th>Date</th>
              <th>Day</th>
              <th>Time</th>
              <th>Venue</th>
              <th>City / Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shows.map((show) => (
              <tr key={show.id}>
                <td>{show.date}</td>
                <td>{show.day}</td>
                <td>
                  {show.timeStart} – {show.timeEnd}
                </td>
                <td>{show.title}</td>
                <td>{show.address}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => openEditModal(show)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteShow(show.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Save All */}
      <button
        disabled={loading}
        className="btn btn-primary mt-3"
        onClick={saveChanges}
      >
        {loading ? "Saving..." : "Save All Changes"}
      </button>

      {/* Edit Modal */}
      {editingShow && (
        <div
          className="modal fade show d-block mt-5 pt-5"
          style={{ background: "rgba(0,0,0,0.7)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 className="modal-title">Edit Show</h5>
                <button
                  className="btn-close btn-close-white"
                  onClick={closeEditModal}
                ></button>
              </div>

              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={editingShow.date}
                      onChange={(e) =>
                        updateEditingField("date", e.target.value)
                      }
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Day Label</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Sat / Fri"
                      value={editingShow.day}
                      onChange={(e) =>
                        updateEditingField("day", e.target.value)
                      }
                    />
                  </div>

                  <div className="col-md-2">
                    <label className="form-label">Start</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingShow.timeStart}
                      onChange={(e) =>
                        updateEditingField("timeStart", e.target.value)
                      }
                    />
                  </div>

                  <div className="col-md-2">
                    <label className="form-label">End</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingShow.timeEnd}
                      onChange={(e) =>
                        updateEditingField("timeEnd", e.target.value)
                      }
                    />
                  </div>

                  <div className="col-md-12">
                    <label className="form-label">Venue</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingShow.title}
                      onChange={(e) =>
                        updateEditingField("title", e.target.value)
                      }
                    />
                  </div>

                  <div className="col-md-12">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingShow.address}
                      onChange={(e) =>
                        updateEditingField("address", e.target.value)
                      }
                    />
                  </div>

                  <div className="col-md-12">
                    <label className="form-label">Link</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingShow.link}
                      onChange={(e) =>
                        updateEditingField("link", e.target.value)
                      }
                    />
                  </div>

                  <div className="col-md-12">
                    <label className="form-label">Notes</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editingShow.notes}
                      onChange={(e) =>
                        updateEditingField("notes", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeEditModal}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={saveSingleShow}>
                  Save Show
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
