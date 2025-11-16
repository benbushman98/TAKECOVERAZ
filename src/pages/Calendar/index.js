import { useState, useEffect } from "react";
import Social from "../../components/Social/index";

export default function PublicCalendar() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/benbushman98/TAKECOVERAZ/main/public/data/shows.json"
    )
      .then((res) => res.json())
      .then((data) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcoming = data
          .filter((show) => new Date(show.date) >= today)
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        setShows(upcoming);
      });
  }, []);

  // Make address link open in Google Maps
  const getMapsLink = (address) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;
  };

  return (
    <div className="container text-white py-5 mt-5 sm:mt-3">
      <h2 className="text-center mb-4 pt-5 text-uppercase text-secondary text-decoration-underline">
        Upcoming Shows
      </h2>

      {/* DESKTOP TABLE */}
      <div className="table-responsive d-none d-md-block">
        <table className="table table-bordered text-center align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th style={{ width: "25%" }}>Date</th>
              <th style={{ width: "25%" }}>Time</th>
              <th style={{ width: "50%" }}>Venue</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {shows.map((show) => (
              <tr key={show.id}>
                <td className="fw-bold">
                  <div>{show.day}</div>
                  <div>{new Date(show.date).toLocaleDateString()}</div>
                </td>

                <td>
                  {show.timeStart} – {show.timeEnd}
                </td>

                <td>
                  <div className="fw-bold">{show.title}</div>
                  <div>
                    <a
                      href={getMapsLink(show.address)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-info text-decoration-underline"
                    >
                      {show.address}
                    </a>
                  </div>

                  {show.link && (
                    <div className="mt-2">
                      <a
                        href={show.link}
                        className="btn btn-sm btn-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        More Info
                      </a>
                    </div>
                  )}

                  {show.notes && (
                    <div className="mt-2 text-danger small">
                      <em>{show.notes}</em>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="d-md-none">
        {shows.map((show) => (
          <div
            key={show.id}
            className="card bg-dark text-white mb-3 border-secondary"
          >
            <div className="card-body">
              <h5 className="card-title fw-bold">{show.title}</h5>

              <p className="card-text mb-1">
                <strong>Date:</strong>{" "}
                {new Date(show.date).toLocaleDateString()}
              </p>

              <p className="card-text mb-1">
                <strong>Time:</strong> {show.timeStart} – {show.timeEnd}
              </p>

              <p className="card-text mb-1">
                <strong>Address:</strong>{" "}
                <a
                  href={getMapsLink(show.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-info text-decoration-underline"
                >
                  {show.address}
                </a>
              </p>

              {show.notes && (
                <p className="card-text text-warning small">
                  <em>{show.notes}</em>
                </p>
              )}

              {show.link && (
                <a
                  href={show.link}
                  className="btn btn-primary btn-sm mt-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  More Info
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      <Social />
    </div>
  );
}
