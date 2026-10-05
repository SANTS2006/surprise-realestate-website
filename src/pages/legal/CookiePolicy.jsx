import { Link } from 'react-router-dom';
import { LegalLayout, LegalSection } from '../../components/LegalLayout.jsx';

export default function CookiePolicy() {
  return (
    <LegalLayout title="Cookie Policy" updated="September 2026" description="How Surprise Real Estate uses cookies and local browser storage on our website and portal.">
      <LegalSection heading="1. What this covers">
        <p>
          This Cookie Policy explains how Surprise Real Estate uses cookies and similar local browser storage on
          this website and our tenant/owner portal.
        </p>
      </LegalSection>

      <LegalSection heading="2. What are cookies?">
        <p>
          Cookies are small text files placed on your device by a website. "Local storage" is a similar
          browser-based mechanism used for the same kind of purpose.
        </p>
      </LegalSection>

      <LegalSection heading="3. How we use them">
        <ul className="list-disc pl-5">
          <li><strong>Strictly necessary</strong> — this listings site does not set any tracking cookies. The tenant/owner portal uses an essential, secure session cookie to keep you signed in; without it, the portal cannot function.</li>
          <li><strong>Preferences</strong> — your device may remember small conveniences, such as a previously selected filter, entirely on your own device.</li>
        </ul>
        <p>We do not use cookies for third-party advertising or cross-site tracking.</p>
      </LegalSection>

      <LegalSection heading="4. Managing cookies">
        <p>
          Most browsers let you block or delete cookies through their settings. Blocking the essential session
          cookie used by the tenant/owner portal will prevent you from signing in.
        </p>
      </LegalSection>

      <LegalSection heading="5. Changes to this policy">
        <p>
          We may update this Cookie Policy from time to time. We will update the "Last updated" date above when
          we do.
        </p>
      </LegalSection>

      <LegalSection heading="6. Contact us">
        <p>
          Questions about this Cookie Policy can be sent to{' '}
          <a href="mailto:suprisesolutiongroup@gmail.com" className="font-medium text-navy-700 underline hover:text-navy-900">suprisesolutiongroup@gmail.com</a>,
          or via our <Link to="/contact" className="font-medium text-navy-700 underline hover:text-navy-900">Contact page</Link>. See also our{' '}
          <Link to="/privacy-policy" className="font-medium text-navy-700 underline hover:text-navy-900">Privacy Policy</Link>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
