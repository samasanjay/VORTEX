import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { ShieldCheck, ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="space-y-0 font-body">
      <SEO
        title="Privacy Policy | WORK VORTEX"
        description="Privacy Policy of WORK VORTEX, managed by SANJAY SAMA. Learn how we collect, use, and protect your personal information."
        canonical="/privacy-policy"
      />

      {/* Header / Hero Section */}
      <section className="pt-32 sm:pt-40 pb-12 bg-radial-gradient border-b border-slate-200/80 text-left">
        <div className="container-vortex max-w-4xl space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono text-slate-700 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>DATA CONFIDENTIALITY & PRIVACY POLICY</span>
            </div>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight">
            Privacy Policy – WORK VORTEX
          </h1>
          <p className="text-xs font-mono text-slate-500">Last Updated: October 2026</p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-200 text-left">
        <div className="container-vortex max-w-4xl space-y-10 text-sm text-slate-700 leading-relaxed font-body">
          
          {/* Preamble */}
          <div className="p-5 sm:p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <p>
              At WORK VORTEX, managed by SANJAY SAMA, we respect your privacy and are committed to protecting the personal information shared with us through our website and services. This Privacy Policy explains what information we may collect, how we use it, how we protect it, and the choices available to you.
            </p>
          </div>

          {/* 1. Information We Collect */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Information We Collect
            </h2>
            <p>
              When you visit our website, submit an enquiry, request information, or use our services, we may collect:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 marker:text-blue-500">
              <li>Full name</li>
              <li>Mobile number</li>
              <li>Email address</li>
              <li>Address and other contact details</li>
              <li>Information provided through enquiry or service request forms</li>
              <li>Details relating to the services requested</li>
              <li>Payment and transaction information, where applicable</li>
              <li>Communications and correspondence with us</li>
              <li>Any documents or information voluntarily provided for providing the requested services</li>
            </ul>
            <p className="text-slate-600 pt-1">
              We may also automatically collect limited technical information such as IP address, browser type, device information, operating system, and website usage information.
            </p>
          </div>

          {/* 2. How We Use Your Information */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              How We Use Your Information
            </h2>
            <p>We may use the information collected to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 marker:text-blue-500">
              <li>Respond to enquiries and service requests</li>
              <li>Understand your requirements</li>
              <li>Provide and manage our services</li>
              <li>Communicate with you regarding requested services</li>
              <li>Process payments and maintain transaction records</li>
              <li>Provide customer support</li>
              <li>Improve our website and services</li>
              <li>Maintain business and administrative records</li>
              <li>Prevent fraud, misuse, or unauthorised activity</li>
              <li>Comply with applicable laws and legal requirements</li>
            </ul>
          </div>

          {/* 3. Payment Information */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Payment Information
            </h2>
            <p>
              Where payments are accepted through the website, payment transactions may be processed through third-party payment gateways or financial service providers.
            </p>
            <p>
              WORK VORTEX does not intentionally store sensitive payment credentials such as complete debit/credit card numbers, CVV numbers, UPI PINs, or banking passwords on its own systems.
            </p>
            <p>
              Payment information may be processed by the applicable payment service provider in accordance with its own privacy policy and security practices.
            </p>
          </div>

          {/* 4. Sharing of Information */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Sharing of Information
            </h2>
            <p>
              We may share necessary information with trusted third parties where reasonably required to operate our business and provide services, including:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 marker:text-blue-500">
              <li>Payment gateway and payment service providers</li>
              <li>Website hosting and technology providers</li>
              <li>Service-related vendors or professional partners</li>
              <li>Customer support providers</li>
              <li>IT, security, or maintenance service providers</li>
              <li>Government authorities, regulators, or law-enforcement agencies where required by law</li>
            </ul>
            <p className="text-slate-600 pt-1">
              We do not sell or rent your personal information to third parties for unauthorised commercial purposes.
            </p>
          </div>

          {/* 5. Cookies and Website Technologies */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Cookies and Website Technologies
            </h2>
            <p>Our website may use cookies and similar technologies to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 marker:text-blue-500">
              <li>Maintain website functionality</li>
              <li>Improve website performance</li>
              <li>Remember user preferences</li>
              <li>Understand website traffic and usage</li>
              <li>Improve user experience</li>
              <li>Support website security</li>
            </ul>
            <p className="text-slate-600 pt-1">
              You may control or disable cookies through your browser settings. Disabling certain cookies may affect some website functionality.
            </p>
          </div>

          {/* 6. Data Security */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Data Security
            </h2>
            <p>
              WORK VORTEX takes reasonable technical and organisational measures to protect personal information against unauthorised access, disclosure, alteration, misuse, or destruction.
            </p>
            <p>
              However, no internet transmission or electronic storage system can be guaranteed to be completely secure. Accordingly, while we take reasonable precautions, we cannot guarantee absolute security of information transmitted online.
            </p>
          </div>

          {/* 7. Data Retention */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Data Retention
            </h2>
            <p>We may retain personal information for as long as reasonably necessary for:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 marker:text-blue-500">
              <li>Providing and managing services</li>
              <li>Customer support</li>
              <li>Maintaining business records</li>
              <li>Accounting and financial purposes</li>
              <li>Resolving disputes</li>
              <li>Preventing fraud or misuse</li>
              <li>Complying with legal and regulatory obligations</li>
            </ul>
            <p className="text-slate-600 pt-1">
              When information is no longer required, it may be deleted, anonymised, or securely disposed of, subject to applicable legal requirements.
            </p>
          </div>

          {/* 8. Third-Party Websites and Services */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Third-Party Websites and Services
            </h2>
            <p>
              Our website may contain links to third-party websites, platforms, payment gateways, or other external services.
            </p>
            <p>
              WORK VORTEX is not responsible for the privacy practices, security, or content of third-party websites. Users are encouraged to review the applicable privacy policies of third-party websites before providing personal information.
            </p>
          </div>

          {/* 9. Communications */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Communications
            </h2>
            <p>If you provide your contact information, we may contact you regarding:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 marker:text-blue-500">
              <li>Service enquiries</li>
              <li>Requested services</li>
              <li>Appointments or service-related matters</li>
              <li>Payments or transactions</li>
              <li>Customer support</li>
              <li>Important updates relating to our services</li>
            </ul>
            <p className="text-slate-600 pt-1">
              Where applicable, you may request that we stop sending non-essential promotional communications.
            </p>
          </div>

          {/* 10. Customer Rights */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Customer Rights
            </h2>
            <p>Subject to applicable laws and reasonable verification requirements, you may contact us to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 marker:text-blue-500">
              <li>Request information regarding personal data held by us</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of personal information where legally permissible</li>
              <li>Raise concerns regarding the use of your information</li>
              <li>Withdraw consent where processing is based on consent</li>
            </ul>
            <p className="text-slate-600 pt-1">
              Certain information may need to be retained where required for legal, accounting, regulatory, fraud-prevention, or dispute-resolution purposes.
            </p>
          </div>

          {/* 11. Children's Privacy */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Children&apos;s Privacy
            </h2>
            <p>
              Our website is not intentionally directed toward children. We do not knowingly collect personal information from children where such collection is prohibited or requires specific consent under applicable law.
            </p>
            <p>
              If you believe that a child has provided personal information to us improperly, please contact us so that we can review the matter and take appropriate action.
            </p>
          </div>

          {/* 12. Changes to This Privacy Policy */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Changes to This Privacy Policy
            </h2>
            <p>
              WORK VORTEX may update this Privacy Policy from time to time to reflect changes in our services, website, technology, or applicable legal requirements.
            </p>
            <p>
              Any updated Privacy Policy will be published on this page along with a revised Last Updated date.
            </p>
          </div>

          {/* 13. Contact Us */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Contact Us
            </h2>
            <p className="text-slate-600">
              If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your personal information, please contact us:
            </p>
            
            <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
              <div className="space-y-1">
                <span className="font-display font-bold text-base text-slate-900 block">WORK VORTEX</span>
                <span className="text-xs font-mono text-slate-600 block">Managed by: SANJAY SAMA</span>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <span>
                    Address: House No. 149 F, Raniya Road, Bolt Music, Professor Colony, Fatehabad, Fatehabad, Haryana – 125050, India
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>
                    Email:{' '}
                    <a href="mailto:workvortex01@gmail.com" className="text-blue-600 hover:underline font-medium">
                      workvortex01@gmail.com
                    </a>
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>
                    Mobile:{' '}
                    <a href="tel:7988021741" className="text-blue-600 hover:underline font-medium">
                      7988021741
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;
