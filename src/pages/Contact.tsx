import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { FaFacebook, FaYoutube, FaEnvelope } from "react-icons/fa";
import PageHeader from "../components/shared/PageHeader";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const inputSx = {
  mb: 2,
  "& .MuiOutlinedInput-root": {
    color: "white",
    "& fieldset": { borderColor: "grey.700" },
    "&:hover fieldset": { borderColor: "error.main" },
    "&.Mui-focused fieldset": { borderColor: "error.main" },
  },
  "& .MuiInputLabel-root": { color: "grey.500" },
  "& .MuiInputLabel-root.Mui-focused": { color: "error.main" },
};

function Contact() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const recaptchaToken = recaptchaRef.current?.getValue();
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
        recaptchaRef.current?.reset();
      })
      .catch(() => setStatus("Something went wrong. Please try again."));
  };

  return (
    <Box sx={{ mt: { xs: "116px", sm: "80px" } }}>
      <PageHeader title="Contact Us" subtitle="Got a gig? A question? Just want to say hey?" />

      {/* Two-column body */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: { xs: 6, md: 4 } }}>
          {/* Left — info & socials */}
          <Box sx={{ flex: "1 1 280px", color: "white" }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                color: "error.main",
                mb: 1,
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              Get In Touch
            </Typography>
            <Divider sx={{ borderColor: "grey.800", mb: 3 }} />
            <Typography sx={{ color: "grey.300", lineHeight: 1.8, mb: 4 }}>
              Reach out with any questions, booking inquiries, or suggestions.
              We'd love to hear from you — whether it's about an upcoming event
              or just to talk rock.
            </Typography>

            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}
            >
              <FaEnvelope color="#ef4444" size={18} />
              <Typography sx={{ color: "grey.300" }}>
                jayklepinger@gmail.com
              </Typography>
            </Box>

            <Divider sx={{ borderColor: "grey.800", my: 3 }} />

            <Typography
              variant="overline"
              sx={{ color: "grey.500", letterSpacing: 3 }}
            >
              Follow Us
            </Typography>
            <Box sx={{ display: "flex", gap: 1, mt: 1.5 }}>
              <IconButton
                component="a"
                href="https://www.facebook.com/takecoveraz/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                sx={{
                  color: "white",
                  border: "1px solid",
                  borderColor: "grey.700",
                  borderRadius: 1,
                  fontSize: "1.4rem",
                  "&:hover": {
                    borderColor: "error.main",
                    color: "error.main",
                    bgcolor: "transparent",
                  },
                }}
              >
                <FaFacebook />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.youtube.com/@takecover2434"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                sx={{
                  color: "white",
                  border: "1px solid",
                  borderColor: "grey.700",
                  borderRadius: 1,
                  fontSize: "1.4rem",
                  "&:hover": {
                    borderColor: "error.main",
                    color: "error.main",
                    bgcolor: "transparent",
                  },
                }}
              >
                <FaYoutube />
              </IconButton>
            </Box>
          </Box>

          {/* Right — form */}
          <Box sx={{ flex: "1 1 400px" }}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                bgcolor: "#111",
                border: "1px solid",
                borderColor: "grey.800",
                borderRadius: 2,
                p: { xs: 3, md: 4 },
              }}
            >
              <TextField
                id="name"
                label="Name"
                variant="outlined"
                fullWidth
                required
                value={form.name}
                onChange={handleChange}
                sx={inputSx}
              />
              <TextField
                id="email"
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                required
                value={form.email}
                onChange={handleChange}
                sx={inputSx}
              />
              <TextField
                id="subject"
                label="Subject"
                variant="outlined"
                fullWidth
                required
                value={form.subject}
                onChange={handleChange}
                sx={inputSx}
              />
              <TextField
                id="message"
                label="Message"
                variant="outlined"
                fullWidth
                required
                multiline
                rows={4}
                value={form.message}
                onChange={handleChange}
                sx={inputSx}
              />

              <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LfSMJwsAAAAADqCS4xO-5qTTaHhJ56Id_9eZNRp"
                  theme="dark"
                />
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: "error.main",
                  color: "white",
                  fontWeight: "bold",
                  letterSpacing: 2,
                  py: 1.5,
                  fontSize: "1rem",
                  textTransform: "uppercase",
                  "&:hover": { bgcolor: "error.dark" },
                }}
              >
                Send Message
              </Button>

              {status && (
                <Typography
                  sx={{
                    mt: 2,
                    textAlign: "center",
                    color: status.startsWith("Message sent")
                      ? "success.main"
                      : "grey.300",
                  }}
                >
                  {status}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Contact;
