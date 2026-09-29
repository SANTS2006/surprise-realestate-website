import { Link } from 'react-router-dom';
import { LegalLayout, LegalSection } from '../../components/LegalLayout.jsx';

// "Terms and Conditions" and "Terms of Service" are, for this site, the
// same document under two common names — both /terms and footer links use
// this one page rather than maintaining two near-duplicate documents.
export default function Terms() {
  return (
    <LegalLayout title="Terms &amp; Conditions" updated="September 2026" description="The terms and conditions governing use of the Surprise Real Estate website and tenant/owner portal.">
      <LegalSection heading="1. Agreement to terms">
        <p>
          These Terms &amp; Conditions ("Terms") govern your use of the Surprise Real Estate website and our
          tenant/owner portal (together, the "Service"), operated by Surprise Real Estate, Central University,
          Mile 91, Sierra Leone. By browsing this site, submitting an inquiry, or creating a portal account, you
          agree to be bound by these Terms. If you do not agree, please do not use the Service.
        </p>
      </LegalSection>

      <LegalSection heading="2. Who can use the Service">
        <p>
          You must be at least 18 years old and able to form a legally binding contract to register for a portal
          account, enter into a tenancy, or list a property with us.
        </p>
      </LegalSection>

      <LegalSection heading="3. Listings are informational, not offers">
        <p>
          Property listings on this site describe available units to the best of our knowledge at the time they
          are published. Availability, pricing, and details can change without notice. A listing is not an offer
          to lease, and no tenancy is formed until a lease agreement is signed through the proper process with
          our team.
        </p>
      </LegalSection>

      <LegalSection heading="4. Account responsibilities">
        <ul className="list-disc pl-5">
          <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
          <li>You agree to provide accurate, current, and complete information when registering or updating your account.</li>
          <li>You are responsible for all activity that occurs under your account.</li>
          <li>Notify us immediately at <a href="mailto:hello@surprise-realestate.com" className="font-medium text-navy-700 underline hover:text-navy-900">hello@surprise-realestate.com</a> if you suspect unauthorized use of your account.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="5. Acceptable use">
        <p>You agree not to:</p>
        <ul className="list-disc pl-5">
          <li>Use the Service for any unlawful purpose or in violation of these Terms.</li>
          <li>Submit false, misleading, or fraudulent information through any form on the Service.</li>
          <li>Attempt to gain unauthorized access to any account, system, or network connected to the Service.</li>
          <li>Interfere with or disrupt the integrity or performance of the Service.</li>
          <li>Scrape, harvest, or bulk-collect data from the Service without our written permission.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="6. Payments">
        <p>
          Rent, fees, and deposits paid through the tenant portal are governed by our{' '}
          <Link to="/payment-policy" className="font-medium text-navy-700 underline hover:text-navy-900">Payment Policy</Link>, which forms part of these Terms.
        </p>
      </LegalSection>

      <LegalSection heading="7. Referral program">
        <p>
          Current tenants may share a personal referral code. Referral bonuses are discretionary, reviewed by our
          team, and paid out manually once a referred applicant signs a lease — a referral code does not
          guarantee a bonus and an invalid or unrecognized code never blocks registration.
        </p>
      </LegalSection>

      <LegalSection heading="8. Intellectual property">
        <p>
          All content on this site — text, graphics, logos, and the underlying software — is owned by or licensed
          to Surprise Real Estate and is protected by applicable intellectual property laws. You may not
          reproduce, distribute, or create derivative works from this content without our written permission.
        </p>
      </LegalSection>

      <LegalSection heading="9. Termination">
        <p>
          We may suspend or terminate your portal account if you violate these Terms, provide false information,
          or engage in fraudulent or abusive conduct. You may request deletion of your account at any time by
          contacting us.
        </p>
      </LegalSection>

      <LegalSection heading="10. Disclaimer &amp; limitation of liability">
        <p>
          The Service is provided "as is" without warranties of any kind, express or implied. To the fullest
          extent permitted by law, Surprise Real Estate is not liable for any indirect, incidental, or
          consequential damages arising from your use of the Service.
        </p>
      </LegalSection>

      <LegalSection heading="11. Governing law">
        <p>These Terms are governed by the laws of Sierra Leone, without regard to its conflict-of-law principles.</p>
      </LegalSection>

      <LegalSection heading="12. Changes to these Terms">
        <p>
          We may revise these Terms from time to time. We will update the "Last updated" date above when we do.
          Continued use of the Service after changes take effect constitutes acceptance of the revised Terms.
        </p>
      </LegalSection>

      <LegalSection heading="13. Contact us">
        <p>
          Questions about these Terms can be sent to{' '}
          <a href="mailto:hello@surprise-realestate.com" className="font-medium text-navy-700 underline hover:text-navy-900">hello@surprise-realestate.com</a>,
          or via our <Link to="/contact" className="font-medium text-navy-700 underline hover:text-navy-900">Contact page</Link>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
