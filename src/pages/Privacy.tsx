import { Link as RouterLink } from 'react-router-dom';
import PolicyPage from '../components/shared/PolicyPage';

const EMAIL = 'jayklepinger@gmail.com';

function Privacy() {
  return (
    <PolicyPage
      path="/privacy"
      title="Privacy policy"
      subtitle="What this site collects, and what we do with it."
      updated="November 19, 2026"
    >
      <h2>The short version</h2>
      <p>
        This site has no analytics, no ad trackers and no visitor accounts. The only personal
        information we get is what you choose to send us through the{' '}
        <RouterLink to="/contact">booking form</RouterLink> or by email. We use it to answer you
        and to plan your event. We never sell it.
      </p>

      <h2>What we collect</h2>
      <p>
        <strong>When you fill out the booking form</strong>, we receive your name, email address,
        phone number if you give one, the details of your event (type, date, location and guest
        count) and your message. The form sends this to our email inbox.
      </p>
      <p>
        We use it to reply to you, to quote and plan your event, and to keep in touch about that
        booking. We keep it in our email for as long as it is useful for your booking, and we
        will delete it if you ask.
      </p>
      <p>
        <strong>When you just visit</strong>, we don&apos;t collect anything ourselves. The site
        doesn&apos;t set cookies of its own. The companies listed below that host and power parts of
        the site can see basic technical details, like your IP address and browser type, when your
        browser loads their content.
      </p>

      <h2>Outside services the site uses</h2>
      <ul>
        <li>
          <strong>EmailJS</strong> delivers booking form messages to our inbox. See the{' '}
          <a href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">
            EmailJS privacy policy
          </a>
          .
        </li>
        <li>
          <strong>Google reCAPTCHA</strong> protects the booking form from spam. It collects
          information about your device and how you use the page to tell people from bots. Your
          use of reCAPTCHA is subject to the Google{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">
            Terms of Service
          </a>
          .
        </li>
        <li>
          <strong>YouTube</strong> hosts our videos. We embed them in YouTube&apos;s
          privacy-enhanced mode, so YouTube doesn&apos;t store information about you until you
          press play. After that, Google&apos;s privacy policy applies.
        </li>
        <li>
          <strong>Google Fonts</strong> supplies the fonts on the site, so Google&apos;s servers
          receive your IP address when the page loads.
        </li>
        <li>
          <strong>GitHub Pages</strong> hosts the site and <strong>Cloudflare</strong> serves our
          show calendar. Like any web host, they may log IP addresses to keep their services
          running and secure.
        </li>
        <li>
          <strong>Facebook, Instagram and YouTube</strong> links take you to those sites, where
          their own privacy policies apply.
        </li>
      </ul>

      <h2>What we don&apos;t do</h2>
      <p>
        We don&apos;t sell, rent or trade your information, and we don&apos;t share it with anyone
        for advertising. We only share booking details when we need to for your event, for example
        with the venue you booked us at.
      </p>

      <h2>Do Not Track</h2>
      <p>
        We don&apos;t track visitors across websites, so the site works the same way whether or
        not your browser sends a Do Not Track signal.
      </p>

      <h2>Children</h2>
      <p>
        This site isn&apos;t aimed at children under 13, and we don&apos;t knowingly collect
        information from them. If you think a child has sent us their information, email us and
        we&apos;ll delete it.
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask us what information we have from you, ask us to correct it, or ask us to delete
        it. Just email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we change how the site handles information, we&apos;ll update this page and the date
        at the top.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
    </PolicyPage>
  );
}

export default Privacy;
