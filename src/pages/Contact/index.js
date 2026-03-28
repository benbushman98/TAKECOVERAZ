import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import Social from "../../components/Social/index";

function Contact() {
  const recaptchaRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const recaptchaToken = recaptchaRef.current.getValue();
    if (!recaptchaToken) {
      setStatus("Please complete the reCAPTCHA.");
      return;
    }

    setStatus("Sending...");

    emailjs
      .send(
        "service_0qdvw8g",
        "template_zasmqnl",
        {
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
          time: new Date().toLocaleString(),
          "g-recaptcha-response": recaptchaToken,
        },
        "Je1lX0MpHjZ51x-nR",
      )
      .then(() => {
        setStatus("Message sent successfully! Thank you for reaching out!");
        setForm({ name: "", email: "", subject: "", message: "" });
        recaptchaRef.current.reset();
      })
      .catch(() => setStatus("Something went wrong. Please try again."));
  };

  return (
    <>
      <div className="container pt-5">
        <h1 className="p-5 m-0 text-center text-secondary text-decoration-underline mt-5 pt-5">
          Contact Us
        </h1>
        <div className="row">
          <div className="col"></div>
          <div className="col-10 col-lg-6">
            <form onSubmit={handleSubmit} className="justify-content-center align-items-center text-center">
              <div className="form-group m-3">
                <input type="text" className="form-control" id="name" placeholder="Name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group m-3">
                <input type="email" className="form-control" id="email" placeholder="Email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="form-group m-3">
                <input type="text" className="form-control" id="subject" placeholder="Subject" value={form.subject} onChange={handleChange} required />
              </div>
              <div className="form-group m-3">
                <textarea className="form-control" id="message" placeholder="Message" value={form.message} rows="4" onChange={handleChange} required />
              </div>
              <div className="d-flex justify-content-center m-3">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LfSMJwsAAAAADqCS4xO-5qTTaHhJ56Id_9eZNRp"
                />
              </div>
              <button type="submit" className="btn btn-primary mb-2">Submit</button>
              {status && <p className="mt-2 text-white">{status}</p>}
            </form>
          </div>
          <div className="col"></div>
        </div>
      </div>
      <div className="container py-3 mt-5">
        <div className="row">
          <div className="col"></div>
          <div className="col-10 col-lg-6 mb-5">
            <h5 className="text-white py-2 px-1 text-center">
              Please reach out with any questions, suggestions, or interest in events. Feel free to reach out via the contact form or visit us on social media.
            </h5>
          </div>
          <div className="col"></div>
        </div>
      </div>
      <Social />
    </>
  );
}

export default Contact;