import { Link } from 'react-router-dom';
import { LegalLayout, LegalSection } from '../../components/LegalLayout.jsx';

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" updated="September 2026" description="How Surprise Real Estate collects, uses, and protects your personal information.">
      <LegalSection heading="1. Overview">
        <p>
          Surprise Real Estate ("we", "us", "our") respects your privacy. This Privacy Policy explains what
          personal information we collect through this website and our tenant/owner portal, why we collect it,
          how we use it, and the choices you have. By using this site or the portal, you agree to the practices
          described here.
        </p>
      </LegalSection>

      <LegalSection heading="2. Information we collect">
        <p>We collect information in the following ways:</p>
        <ul className="list-disc pl-5">
          <li><strong>Information you give us directly</strong> — your name, email address, phone number, and message when you submit a listing inquiry, the general contact form, or when you register for a portal account.</li>
          <li><strong>Account and tenancy information</strong> — once you register for the portal, we hold the information needed to manage your tenancy or property: lease details, payment history, maintenance requests, and documents you upload.</li>
          <li><strong>Automatically collected information</strong> — standard technical data such as IP address, browser type, and pages visited, collected via server logs to keep the site secure and working correctly.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="3. How we use your information">
        <ul className="list-disc pl-5">
          <li>To respond to listing inquiries and general contact messages.</li>
          <li>To create and administer your portal account, process rent payments, and manage maintenance requests.</li>
          <li>To send you service-related emails (verification, receipts, maintenance updates, notifications you've opted into).</li>
          <li>To detect, investigate, and prevent fraud, abuse, and security incidents.</li>
          <li>To meet our legal and regulatory obligations.</li>
        </ul>
        <p>We do not sell your personal information to third parties.</p>
      </LegalSection>

      <LegalSection heading="4. Sharing your information">
        <p>We share information only where necessary to operate the service:</p>
        <ul className="list-disc pl-5">
          <li>With the listing agent responsible for a property you've inquired about, so they can respond to you.</li>
          <li>With service providers who process data on our behalf (e.g. email delivery, cloud file storage, payment processing), under contractual confidentiality obligations.</li>
          <li>Where required by law, court order, or to protect the rights, property, or safety of Surprise Real Estate, our users, or the public.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="5. Data retention">
        <p>
          We retain personal information for as long as necessary to provide our services and to comply with our
          legal obligations (for example, financial and tenancy records are typically retained for the period
          required by applicable law). Inquiry and contact-form messages are retained only as long as needed to
          respond to and resolve your request.
        </p>
      </LegalSection>

      <LegalSection heading="6. Your rights">
        <p>
          You may request access to, correction of, or deletion of your personal information by contacting us
          using the details below. Portal account holders can review and update most of their own information
          directly from their account settings.
        </p>
      </LegalSection>

      <LegalSection heading="7. Security">
        <p>
          We use industry-standard technical and organizational measures — including encryption in transit,
          hashed passwords, and role-based access controls — to protect your information. No method of
          transmission or storage is completely secure, but we work to protect your data appropriately for its
          sensitivity.
        </p>
      </LegalSection>

      <LegalSection heading="8. Cookies">
        <p>
          This site uses only the minimum technical storage needed for it to function. See our{' '}
          <Link to="/cookie-policy" className="font-medium text-navy-700 underline hover:text-navy-900">Cookie Policy</Link>{' '}
          for details.
        </p>
      </LegalSection>

      <LegalSection heading="9. Changes to this policy">
        <p>
          We may update this Privacy Policy from time to time. We will update the "Last updated" date above when
          we do. Continued use of the site or portal after changes take effect constitutes acceptance of the
          revised policy.
        </p>
      </LegalSection>

      <LegalSection heading="10. Contact us">
        <p>
          Questions about this Privacy Policy or your personal information can be sent to{' '}
          <a href="mailto:hello@surprise-realestate.com" className="font-medium text-navy-700 underline hover:text-navy-900">hello@surprise-realestate.com</a>,
          or via our <Link to="/contact" className="font-medium text-navy-700 underline hover:text-navy-900">Contact page</Link>.
          Our office is located at Central University, Mile 91, Sierra Leone.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
