import { Link } from 'react-router-dom';
import { LegalLayout, LegalSection } from '../../components/LegalLayout.jsx';

export default function PaymentPolicy() {
  return (
    <LegalLayout title="Payment Policy" updated="September 2026" description="How rent, fees, deposits, and refunds are handled for tenancies managed by Surprise Real Estate.">
      <LegalSection heading="1. Scope">
        <p>
          This Payment Policy explains how rent, fees, and deposits are handled for tenancies managed by Surprise
          Real Estate. It applies to payments made through the tenant portal and to any payment arranged directly
          with our team.
        </p>
      </LegalSection>

      <LegalSection heading="2. Accepted payment methods">
        <p>
          Accepted payment methods are shown at the time of payment inside the tenant portal. We do not store
          your full card or bank details on our servers — payments are processed through our payment provider's
          secure systems.
        </p>
      </LegalSection>

      <LegalSection heading="3. Security deposits">
        <p>
          A refundable security deposit (typically one month's rent, unless a listing states otherwise) is
          required before move-in. Deposits are held for the duration of the tenancy and refunded after move-out,
          less any deductions for unpaid rent, damage beyond normal wear and tear, or other amounts owed under
          the lease.
        </p>
      </LegalSection>

      <LegalSection heading="4. Rent due dates and late payments">
        <p>
          Rent is due on the date specified in your lease agreement. A payment not received by the due date may
          be considered late and may be subject to a late fee as set out in your lease. Persistent late or missed
          payments may result in further action under the terms of your lease and applicable law.
        </p>
      </LegalSection>

      <LegalSection heading="5. Receipts">
        <p>
          A receipt is generated automatically for every payment made through the tenant portal and is available
          for download from your payment history at any time.
        </p>
      </LegalSection>

      <LegalSection heading="6. Refunds">
        <p>
          Refunds (for example, an overpayment or a deposit refund after move-out) are processed back to the
          original payment method where possible, or by another method we agree with you, and are typically
          issued within a reasonable time after the amount is confirmed.
        </p>
      </LegalSection>

      <LegalSection heading="7. Disputed charges">
        <p>
          If you believe a charge is incorrect, contact us as soon as possible using the details below so we can
          investigate before escalating to a formal dispute with your bank or payment provider.
        </p>
      </LegalSection>

      <LegalSection heading="8. Referral bonuses">
        <p>
          Referral bonuses are tracked amounts reviewed and approved by our team, then paid out manually — they
          are not processed automatically through the payment system and are not applied as an automatic credit
          against rent.
        </p>
      </LegalSection>

      <LegalSection heading="9. Related policies">
        <p>
          This Payment Policy forms part of our{' '}
          <Link to="/terms" className="font-medium text-navy-700 underline hover:text-navy-900">Terms &amp; Conditions</Link>. See also our{' '}
          <Link to="/privacy-policy" className="font-medium text-navy-700 underline hover:text-navy-900">Privacy Policy</Link>{' '}
          for how payment-related information is handled.
        </p>
      </LegalSection>

      <LegalSection heading="10. Contact us">
        <p>
          Questions about a payment can be sent to{' '}
          <a href="mailto:suprisesolutiongroup@gmail.com" className="font-medium text-navy-700 underline hover:text-navy-900">suprisesolutiongroup@gmail.com</a>,
          or via our <Link to="/contact" className="font-medium text-navy-700 underline hover:text-navy-900">Contact page</Link>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
