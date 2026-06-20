import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://13.201.96.137:30080/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.text();

      setResponseMsg(data);

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      setResponseMsg("Failed to submit request");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>🏗️ Halmandge Construction Pvt Ltd</h1>

      <h2>Building Strong Foundations, Creating Better Futures</h2>

      <hr />

      <h3>About Us</h3>
      <p>
        Halmandge Construction Pvt Ltd is a trusted construction company
        providing residential, commercial and renovation services.
      </p>

      <h3>Our Services</h3>
      <ul>
        <li>Residential Construction</li>
        <li>Commercial Buildings</li>
        <li>Interior Design</li>
        <li>Renovation Services</li>
      </ul>

      <h3>Completed Projects</h3>
      <ul>
        <li>Sky Heights Apartment - Bangalore</li>
        <li>Green Valley Villas - Hyderabad</li>
        <li>Tech Park Tower - Pune</li>
      </ul>

      <hr />

      <h3>Request a Quote</h3>

      <form onSubmit={submitForm}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="text"
          name="phone"
          placeholder="Enter Phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <br />
        <br />

        <textarea
          name="message"
          placeholder="Enter Message"
          value={formData.message}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">Submit Request</button>
      </form>

      <br />

      <h3>{responseMsg}</h3>
    </div>
  );
}

export default App;
