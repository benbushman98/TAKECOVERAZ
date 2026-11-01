import { useState, useRef } from "react";
import { motion } from "motion/react";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { FaFacebook, FaYoutube, FaEnvelope } from "react-icons/fa";
import PageHeader from "../components/shared/PageHeader";
import PageMeta from "../components/shared/PageMeta";

const MotionBox = motion.create(Box as any);

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  reason: string;
  subject: string;
  eventType: string;
  eventDate: string;
  location: string;
  guests: string;
  message: string;
}

const BOOKING = "Book the band";
const REASONS = [BOOKING, "General question", "Other"];
const EVENT_TYPES = [
  "Wedding",
  "Corporate event",
  "Private party",
  "Bar / restaurant / venue",
  "Festival / community event",
  "Other",
];

const EMPTY_FORM: ContactForm = {
  name: "",
  email: "",
  phone: "",
  reason: BOOKING,
  subject: "",
  eventType: "",
  eventDate: "",
  location: "",
  guests: "",
  message: "",
};

/** Booking details are folded into the subject and message so the existing EmailJS template still works. */
function buildEmail(form: ContactForm) {
  if (form.reason !== BOOKING) {
    const details = form.phone ? `Phone: ${form.phone}\n\n` : "";
    return { subject: form.subject || form.reason, message: details + form.message };
  }
  const lines = [
    ["Event type", form.eventType],
    ["Event date", form.eventDate],
    ["Location", form.location],
    ["Expected guests", form.guests],
    ["Phone", form.phone],
  ]
    .filter(([, v]) => v.trim())
    .map(([k, v]) => `${k}: ${v}`);
  const subject = ["Booking request", form.eventType, form.eventDate && `on ${form.eventDate}`]
    .filter(Boolean)
    .join(" — ");
  return { subject, message: `${lines.join("\n")}\n\n${form.message}` };
}

const inputSx = {
  mb: 2,
  "& .MuiOutlinedInput-root": {
    color: "white",
    "& fieldset": { borderColor: "grey.700" },
    "&:hover fieldset": { borderColor: "primary.main" },
    "&.Mui-focused fieldset": { borderColor: "primary.main" },
  },
  "& .MuiInputLabel-root": { color: "grey.500" },
  "& .MuiInputLabel-root.Mui-focused": { color: "primary.main" },
};

function Contact() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [form, setForm] = useState<ContactForm>(EMPTY_FORM);
  const isBooking = form.reason === BOOKING;
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const setField = (field: keyof ContactForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const recaptchaToken = recaptchaRef.current?.getValue();
    if (!recaptchaToken) {
      setStatus("Please complete the reCAPTCHA.");
      return;
    }

    setStatus("Sending...");
    const { subject, message } = buildEmail(form);

    emailjs
      .send(
        "service_0qdvw8g",
        "template_zasmqnl",
        {
          name: form.name,
          email: form.email,
          subject,
          message,
          time: new Date().toLocaleString(),
          "g-recaptcha-response": recaptchaToken,
        },
        "Je1lX0MpHjZ51x-nR",
      )
      .then(() => {
        setStatus("Message sent successfully! Thank you for reaching out!");
        setForm(EMPTY_FORM);
        recaptchaRef.current?.reset();
      })
      .catch(() => setStatus("Something went wrong. Please try again."));
  };

  return (
    <Box sx={{ mt: { xs: "124px", sm: "124px" } }}>
      <PageMeta path="/contact" />
      <PageHeader title="Book Us" subtitle="Weddings, parties, corporate events, venues — tell us about your gig." />

      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: { xs: 6, md: 4 } }}>
          {/* Left — info & socials */}
          <MotionBox
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            sx={{ flex: "1 1 280px", color: "white" }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                color: "primary.main",
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
              <FaEnvelope color="#C8102E" size={18} />
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
                    borderColor: "primary.main",
                    color: "primary.main",
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
                    borderColor: "primary.main",
                    color: "primary.main",
                    bgcolor: "transparent",
                  },
                }}
              >
                <FaYoutube />
              </IconButton>
            </Box>
          </MotionBox>

          {/* Right — form */}
          <MotionBox
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            sx={{ flex: "1 1 400px" }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                bgcolor: "background.paper",
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
                id="phone"
                label="Phone (optional)"
                type="tel"
                variant="outlined"
                fullWidth
                value={form.phone}
                onChange={handleChange}
                sx={inputSx}
              />
              <TextField
                select
                id="reason"
                label="What can we help with?"
                variant="outlined"
                fullWidth
                value={form.reason}
                onChange={setField("reason")}
                sx={inputSx}
              >
                {REASONS.map((r) => (
                  <MenuItem key={r} value={r}>{r}</MenuItem>
                ))}
              </TextField>

              {isBooking ? (
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, columnGap: 2 }}>
                  <TextField
                    select
                    id="eventType"
                    label="Type of event"
                    variant="outlined"
                    fullWidth
                    required
                    value={form.eventType}
                    onChange={setField("eventType")}
                    sx={inputSx}
                  >
                    {EVENT_TYPES.map((t) => (
                      <MenuItem key={t} value={t}>{t}</MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id="eventDate"
                    label="Event date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    value={form.eventDate}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    sx={{ ...inputSx, "& input::-webkit-calendar-picker-indicator": { filter: "invert(1)" } }}
                  />
                  <TextField
                    id="location"
                    label="City / venue"
                    variant="outlined"
                    fullWidth
                    value={form.location}
                    onChange={handleChange}
                    sx={inputSx}
                  />
                  <TextField
                    id="guests"
                    label="Expected guests"
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={form.guests}
                    onChange={handleChange}
                    inputProps={{ min: 1 }}
                    sx={inputSx}
                  />
                </Box>
              ) : (
                <TextField
                  id="subject"
                  label="Subject"
                  variant="outlined"
                  fullWidth
                  value={form.subject}
                  onChange={handleChange}
                  sx={inputSx}
                />
              )}

              <TextField
                id="message"
                label={isBooking ? "Tell us about your event" : "Message"}
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
                  fontWeight: "bold",
                  letterSpacing: 2,
                  py: 1.5,
                  fontSize: "1rem",
                  textTransform: "uppercase",
                }}
              >
                {isBooking ? "Request a Booking" : "Send Message"}
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
          </MotionBox>
        </Box>
      </Container>
    </Box>
  );
}

export default Contact;
