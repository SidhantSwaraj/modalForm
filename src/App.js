import "./styles.css";
import { useState, useRef, useEffect } from "react";

export default function App() {
  const modalRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    dob: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate phone number
    let phoneValid = formData.phoneNumber.length === 10;
    if (!phoneValid) {
      alert("Invalid phone number. Please enter a 10-digit phone number");
      return;
    }

    // Validate date of birth
    let dob = new Date(formData.dob);
    let today = new Date();
    let dobValid = dob <= today;
    if (!dobValid) {
      alert("Invalid date of birth. Date of birth cannot be in the future");
      return;
    }

    // If both phone number and date of birth are valid, submit the form
    console.log(formData);
    setFormData({
      username: "",
      email: "",
      phoneNumber: "",
      dob: "",
    });
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  return (
    <div className="App">
      <h1>User Details Modal</h1>
      <button className="submit-button" onClick={() => setShowModal(true)}>
        Open Form
      </button>
      <br />
      <br />
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <form onSubmit={handleSubmit} className="form" ref={modalRef}>
              <h2>Fill Details</h2>

              <div>
                <label>
                  <strong>Username:</strong>
                </label>
                <br />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  id="username"
                />
              </div>

              <div>
                <label>
                  <strong>Email Address:</strong>
                </label>
                <br />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  id="email"
                />
              </div>

              <div>
                <label>
                  <strong>Phone Number:</strong>
                </label>
                <br />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  id="phone"
                />
              </div>

              <div>
                <label>
                  <strong>Date of Birth:</strong>
                </label>
                <br />
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                  id="dob"
                />
              </div>

              <div>
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
