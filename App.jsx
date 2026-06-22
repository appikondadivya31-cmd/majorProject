import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./App.css";

function App() {
const [page, setPage] = useState("login");
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

    const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [regEmail, setRegEmail] = useState("");
const [regPassword, setRegPassword] = useState("");

const [selectedEvent, setSelectedEvent] = useState(null);
const [seats, setSeats] = useState([]);
const [showQR, setShowQR] = useState(false);
const handleSeatSelect = (seatNo) => {
  if (seats.includes(seatNo)) {
    setSeats(seats.filter((s) => s !== seatNo));
  } else {
    setSeats([...seats, seatNo]);
  }
};

const events = [
{
id: 1,
title: "AI Conference",
date: "28 July 2026",
location: "Bangalore",
price: "₹1499",
image:
"https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
},
{
id: 2,
title: "Tech Summit",
date: "10 August 2026",
location: "Hyderabad",
price: "₹999",
image:
"https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
},
{
id: 3,
title: "Startup Meetup",
date: "20 August 2026",
location: "Mumbai",
price: "₹799",
image:
"https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800",
},
];

  const handleLogin = () => {
  const savedEmail = localStorage.getItem("userEmail");
  const savedPassword = localStorage.getItem("userPassword");

  if (
    email === savedEmail &&
    password === savedPassword
  ) {
    localStorage.setItem("loggedIn", "true");
    setLoggedIn(true);
    setPage("home");
  } else {
    alert("Invalid Email or Password");
  }
};

  const handleRegister = () => {
  localStorage.setItem("userEmail", regEmail);
  localStorage.setItem("userPassword", regPassword);

  alert("Registration Successful!");

  setPage("login");
};

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
    setPage("home");
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <h2>EventBook</h2>

        <div>
          {!loggedIn ? (
            <>
              <button onClick={() => setPage("login")}>
                Login
              </button>

              <button onClick={() => setPage("register")}>
                Register
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setPage("home")}>
                Home
                </button>

              <button onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Home */}
      {page === "home" && (
        <div className="container">
          <h1>Corporate Event Booking Platform</h1>

          <div className="grid">
            {events.map((event) => (
              <div className="card" key={event.id}>
                <img
                  src={event.image}
                  alt={event.title}
                />

                <h3>{event.title}</h3>

                <p>{event.date}</p>
                <p>{event.location}</p>
                <p>{event.price}</p>

                <button
                  onClick={() => {
                    setSelectedEvent(event);
                    setPage("details");
                  }}
                >
                  Book Event
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Login */}
      {page === "login" && (
        <div className="form">
          <h2>Welcome Back 👋</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button onClick={handleLogin}>
            Login
          </button>

          <p>Enter your credentials to continue</p>
        </div>
      )}

      {/* Register */}
      {page === "register" && (
        <div className="form">
          <h2>Create Account</h2>

          <input placeholder="Full Name" />

<input
  placeholder="Email"
  value={regEmail}
  onChange={(e) => setRegEmail(e.target.value)}
/>

<input
  type="password"
  placeholder="Password"
  value={regPassword}
  onChange={(e) => setRegPassword(e.target.value)}
/>

          <button onClick={handleRegister}>
            Register
          </button>
        </div>
      )}

      {/* Dashboard */}
      {page === "dashboard" && (
        <>
          {loggedIn ? (
            <div className="dashboard">
  <h1>Admin Dashboard</h1>

  <button onClick={() => setPage("home")}>
    Back To Home
  </button>

  <div className="stats">
                <div className="box">
                  <h3>Total Events</h3>
                  <p>12</p>
                </div>

                <div className="box">
                  <h3>Total Bookings</h3>
                  <p>450</p>
                </div>

                <div className="box">
                  <h3>Revenue</h3>
                  <p>₹4,50,000</p>
                </div>
              </div>
            </div>
          ) : (
            <h2>Please Login First</h2>
          )}
        </>
      )}

      {/* Event Details */}
      {page === "details" && selectedEvent && (
  <div className="details">
    <img
      src={selectedEvent.image}
      alt={selectedEvent.title}
    />

    <h1>{selectedEvent.title}</h1>

    <p>Date: {selectedEvent.date}</p>
    <p>Location: {selectedEvent.location}</p>
    <p>Price: {selectedEvent.price}</p>
    <h3>Select Your Seat</h3>

<div className="seat-container">
  <button
    className={seats.includes("A1") ? "seat-btn active" : "seat-btn"}
    onClick={() => handleSeatSelect("A1")}
  >
    A1
  </button>

  <button
    className={seats.includes("A2") ? "seat-btn active" : "seat-btn"}
    onClick={() => handleSeatSelect("A2")}
  >
    A2
  </button>

  <button
    className={seats.includes("A3") ? "seat-btn active" : "seat-btn"}
    onClick={() => handleSeatSelect("A3")}
  >
    A3
  </button>

  <button
    className={seats.includes("B1") ? "seat-btn active" : "seat-btn"}
    onClick={() => handleSeatSelect("B1")}
  >
    B1
  </button>

  <button
    className={seats.includes("B2") ? "seat-btn active" : "seat-btn"}
    onClick={() => handleSeatSelect("B2")}
  >
    B2
  </button>

  <button
    className={seats.includes("B3") ? "seat-btn active" : "seat-btn"}
    onClick={() => handleSeatSelect("B3")}
  >
    B3
  </button>

  <button
    className={seats.includes("C1") ? "seat-btn active" : "seat-btn"}
    onClick={() => handleSeatSelect("C1")}
  >
    C1
  </button>

  <button
    className={seats.includes("C2") ? "seat-btn active" : "seat-btn"}
    onClick={() => handleSeatSelect("C2")}
  >
    C2
  </button>

  <button
    className={seats.includes("C3") ? "seat-btn active" : "seat-btn"}
    onClick={() => handleSeatSelect("C3")}
  >
    C3
  </button>
</div>
<p>
  Selected Seats: <strong>{seats.join(", ")}</strong>
</p>

    <button
      onClick={() => {
        if (!loggedIn) {
          alert("Please login before booking.");
          setPage("login");
          return;
        }
        if (seats.length === 0) {
  alert("Please select at least one seat");
  return;
}
        setShowQR(true);
      }}
    >
      Confirm Booking
    </button>

    {showQR && (
  <div className="qr-box">
    <h3>Booking Confirmed ✅</h3>

    <p>Seats: {seats.join(", ")}</p>

    <QRCodeCanvas
      value={`Seats: ${seats.join(", ")}`}
      size={200}
    />
  </div>
)}
  </div>
)}
    </div>
  );
}

export default App;