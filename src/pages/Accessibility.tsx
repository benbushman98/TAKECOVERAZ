import { Link as RouterLink } from 'react-router-dom';
import PolicyPage from '../components/shared/PolicyPage';

const EMAIL = 'jayklepinger@gmail.com';

function Accessibility() {
  return (
    <PolicyPage
      path="/accessibility"
      title="Accessibility"
      subtitle="Everyone should be able to find our shows, browse the songs and book the band."
      updated="November 19, 2026"
    >
      <h2>Our goal</h2>
      <p>
        We want this site to work for everyone, including people who use a screen reader, a
        keyboard instead of a mouse, magnification or other assistive technology. We aim to meet
        the{' '}
        <a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noopener noreferrer">
          Web Content Accessibility Guidelines (WCAG) 2.2
        </a>{' '}
        at level AA.
      </p>

      <h2>What we&apos;ve done</h2>
      <ul>
        <li>Photos have text descriptions, and decorative images are hidden from screen readers.</li>
        <li>
          Every page has a clear heading structure, page landmarks, and a &ldquo;Skip to
          content&rdquo; link for keyboard users.
        </li>
        <li>
          The menu, the playlist search and letter bar, and the booking form all work with a
          keyboard, and show where you are when you tab through them.
        </li>
        <li>Every booking form field has a visible label.</li>
        <li>Text is light on a dark background with strong contrast.</li>
        <li>The site works on phones and when zoomed in, without sideways scrolling.</li>
        <li>Each embedded video has a title so screen readers can tell them apart.</li>
      </ul>

      <h2>What we know still needs work</h2>
      <ul>
        <li>
          <strong>Videos.</strong> Our live videos are hosted on YouTube and don&apos;t have
          captions or transcripts we&apos;ve written.
        </li>
        <li>
          <strong>The spam check on the booking form.</strong> Google reCAPTCHA can be hard to use
          with some assistive technology. If it gets in your way, skip the form and email us at{' '}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a> instead.
        </li>
        <li>
          <strong>Outside sites.</strong> Directions open in Google Maps, and our social links go
          to Facebook, Instagram and YouTube. We don&apos;t control how accessible those sites
          are.
        </li>
      </ul>
      <p>
        We&apos;re a band, not a tech company, and we haven&apos;t had a formal accessibility
        audit. We check the site ourselves as we make changes, and we fix problems when we find
        them.
      </p>

      <h2>Tell us about a problem</h2>
      <p>
        If something on the site doesn&apos;t work for you, please email{' '}
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. Let us know which page you were on and what
        happened, and we&apos;ll work on a fix.
      </p>
      <p>
        If you need anything from the site in another way, like the{' '}
        <RouterLink to="/calendar">show list</RouterLink> or the{' '}
        <RouterLink to="/playlist">song list</RouterLink>, just ask and we&apos;ll send it to you.
      </p>
    </PolicyPage>
  );
}

export default Accessibility;
