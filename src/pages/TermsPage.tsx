import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { FileText, ArrowLeft, Mail, Phone, MapPin, Building, User } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="space-y-0 font-body">
      <SEO
        title="Terms & Conditions | WORK VORTEX"
        description="Terms & Conditions governing the use of the website and services provided by WORK VORTEX, managed by SANJAY SAMA."
        canonical="/terms"
      />

      {/* Header / Hero Section */}
      <section className="pt-32 sm:pt-40 pb-12 bg-radial-gradient border-b border-slate-200/80 text-left">
        <div className="container-vortex max-w-4xl space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono text-slate-700 shadow-xs">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>LEGAL TERMS & SERVICE AGREEMENT</span>
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
            Terms & Conditions – WORK VORTEX
          </h1>
          <p className="text-xs font-mono text-slate-500">Last Updated: October 2026</p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-200 text-left">
        <div className="container-vortex max-w-4xl space-y-10 text-sm text-slate-700 leading-relaxed font-body">
          
          {/* Preamble */}
          <div className="p-5 sm:p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <p>
              These Terms & Conditions (&quot;Terms&quot;) govern the use of the website and services provided by WORK VORTEX, managed by SANJAY SAMA (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;).
            </p>
            <p>
              By accessing our website, submitting a service enquiry, booking a service, or making a payment for our services, you agree to these Terms.
            </p>
          </div>

          {/* 1. Business Information */}
          <div className="space-y-4">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Business Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/80 p-5 rounded-xl border border-slate-200">
              <div className="flex items-start gap-3">
                <Building className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs font-mono uppercase text-slate-500 block font-semibold">Business Name</span>
                  <span className="font-medium text-slate-900">WORK VORTEX</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs font-mono uppercase text-slate-500 block font-semibold">Managed By</span>
                  <span className="font-medium text-slate-900">SANJAY SAMA</span>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:col-span-2">
                <MapPin className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs font-mono uppercase text-slate-500 block font-semibold">Address</span>
                  <span className="font-medium text-slate-900">
                    House No. 149 F, Raniya Road, Bolt Music, Professor Colony, Fatehabad, Fatehabad, Haryana – 125050, India
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs font-mono uppercase text-slate-500 block font-semibold">Email</span>
                  <a href="mailto:workvortex01@gmail.com" className="font-medium text-blue-600 hover:underline">
                    workvortex01@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs font-mono uppercase text-slate-500 block font-semibold">Mobile</span>
                  <a href="tel:7988021741" className="font-medium text-blue-600 hover:underline">
                    7988021741
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Nature of Services */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Nature of Services
            </h2>
            <p>
              WORK VORTEX is a service-based business. The Website is intended to provide information about our services and enable customers to submit enquiries, request services, make bookings, or make payments where applicable.
            </p>
            <p>
              The exact scope, deliverables, timelines, and charges for a service may depend on the service selected and the terms communicated to the customer before confirmation.
            </p>
          </div>

          {/* 3. Service Enquiries and Bookings */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Service Enquiries and Bookings
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 marker:text-blue-500">
              <li>
                Customers are responsible for providing accurate and complete information when submitting an enquiry or booking a service.
              </li>
              <li>
                A service booking will be considered confirmed only after confirmation by WORK VORTEX and, where applicable, successful payment.
              </li>
              <li>
                We reserve the right to decline a service request where the requested service cannot reasonably be provided or where the request contains inaccurate, incomplete, or misleading information.
              </li>
            </ul>
          </div>

          {/* 4. Service Scope */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Service Scope
            </h2>
            <p>
              The services will be provided according to the agreed scope between WORK VORTEX and the customer.
            </p>
            <p>
              Any additional work, modification, or service outside the originally agreed scope may be subject to additional charges and separate confirmation.
            </p>
          </div>

          {/* 5. Service Fees and Payments */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Service Fees and Payments
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 marker:text-blue-500">
              <li>Service fees will be communicated or displayed to the customer before the service is confirmed.</li>
              <li>All applicable charges must be paid through the payment methods made available by WORK VORTEX.</li>
              <li>Where applicable, taxes or additional charges will be communicated before payment.</li>
              <li>Payments may be processed through authorized third-party payment gateways.</li>
            </ul>
          </div>

          {/* 6. Service Delivery */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Service Delivery
            </h2>
            <p>
              WORK VORTEX will make reasonable efforts to provide the agreed services within the communicated or agreed timeframe.
            </p>
            <p className="font-medium text-slate-800">Service timelines may vary depending on:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 marker:text-blue-500">
              <li>Nature and complexity of the service.</li>
              <li>Information or documents required from the customer.</li>
              <li>Customer availability and cooperation.</li>
              <li>Technical requirements.</li>
              <li>Third-party dependencies.</li>
              <li>Circumstances beyond our reasonable control.</li>
            </ul>
          </div>

          {/* 7. Customer Responsibilities */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Customer Responsibilities
            </h2>
            <p className="font-medium text-slate-800">Customers are responsible for:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 marker:text-blue-500">
              <li>Providing accurate information and requirements.</li>
              <li>Providing necessary documents, access, materials, or information within the required timeframe.</li>
              <li>Cooperating with WORK VORTEX during service delivery.</li>
              <li>Providing accurate contact details.</li>
              <li>Making payments within the agreed timeframe.</li>
              <li>Using the services only for lawful purposes.</li>
            </ul>
            <p className="text-slate-600 pt-1">
              Any delay caused by incomplete information, failure to provide required materials, or lack of customer cooperation may affect the service timeline.
            </p>
          </div>

          {/* 8. Cancellation and Rescheduling */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Cancellation and Rescheduling
            </h2>
            <p>
              Service cancellation and rescheduling requests may be subject to the applicable cancellation terms communicated to the customer at the time of booking.
            </p>
            <p>
              Where work has already commenced, cancellation may not be possible or may be subject to applicable service charges.
            </p>
            <p>
              Any refund, where applicable, will be handled according to the applicable{' '}
              <Link to="/refund-policy" className="text-blue-600 hover:underline font-semibold">
                Cancellation and Refund Policy
              </Link>{' '}
              of WORK VORTEX.
            </p>
          </div>

          {/* 9. No Guarantee of Specific Results */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              No Guarantee of Specific Results
            </h2>
            <p>
              While WORK VORTEX will make reasonable efforts to provide services professionally and according to the agreed scope, we do not guarantee a particular business, financial, employment, commercial, or other outcome unless such outcome has been expressly agreed in writing.
            </p>
          </div>

          {/* 10. Intellectual Property */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Intellectual Property
            </h2>
            <p>
              Unless otherwise agreed in writing, all pre-existing materials, methodologies, processes, templates, designs, systems, content, trademarks, and other intellectual property belonging to WORK VORTEX remain the property of WORK VORTEX.
            </p>
            <p>
              Customers may not reproduce, distribute, resell, or commercially exploit such materials without prior written permission.
            </p>
          </div>

          {/* 11. Confidentiality */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Confidentiality
            </h2>
            <p>
              Where customers provide confidential information for the purpose of receiving services, WORK VORTEX will take reasonable steps to maintain the confidentiality of such information, subject to applicable law and legitimate business requirements.
            </p>
            <p>
              Customers are also responsible for ensuring that they have the necessary rights and authorization to provide any information, documents, or materials supplied to WORK VORTEX.
            </p>
          </div>

          {/* 12. Third-Party Services */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Third-Party Services
            </h2>
            <p>
              Certain services may involve third-party platforms, software, payment providers, communication services, or other external providers.
            </p>
            <p>
              Where third-party services are involved, their respective terms and policies may also apply.
            </p>
            <p>
              WORK VORTEX is not responsible for interruptions or failures caused solely by third-party service providers.
            </p>
          </div>

          {/* 13. Website Content */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Website Content
            </h2>
            <p>
              We make reasonable efforts to keep information on the Website accurate and up to date.
            </p>
            <p>
              However, service descriptions, pricing, availability, and other information may be changed or updated without prior notice.
            </p>
          </div>

          {/* 14. Prohibited Use */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Prohibited Use
            </h2>
            <p className="font-medium text-slate-800">Customers must not use the Website or services:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 marker:text-blue-500">
              <li>For unlawful or fraudulent activities.</li>
              <li>To provide false or misleading information.</li>
              <li>To infringe the rights of others.</li>
              <li>To interfere with the Website or its security.</li>
              <li>To attempt unauthorized access to systems or accounts.</li>
              <li>For any purpose prohibited under applicable law.</li>
            </ul>
          </div>

          {/* 15. Limitation of Liability */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by applicable law, WORK VORTEX shall not be liable for indirect, incidental, special, or consequential losses arising from the use of the Website or services.
            </p>
            <p>
              Our liability, where legally applicable, shall be limited to the extent permitted under applicable law and the specific service agreement with the customer.
            </p>
            <p>
              Nothing in these Terms excludes or limits liability that cannot legally be excluded or limited.
            </p>
          </div>

          {/* 16. Force Majeure */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Force Majeure
            </h2>
            <p>
              WORK VORTEX shall not be responsible for delays or failure to perform services caused by circumstances beyond our reasonable control, including natural disasters, government restrictions, internet or technical failures, strikes, emergencies, or third-party service interruptions.
            </p>
          </div>

          {/* 17. Changes to Services and Terms */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Changes to Services and Terms
            </h2>
            <p>
              WORK VORTEX reserves the right to modify, suspend, discontinue, or update its services and Website content from time to time.
            </p>
            <p>
              We may also update these Terms & Conditions. The updated Terms will become effective once published on the Website.
            </p>
          </div>

          {/* 18. Governing Law and Jurisdiction */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Governing Law and Jurisdiction
            </h2>
            <p>
              These Terms & Conditions shall be governed by and interpreted in accordance with the laws of India.
            </p>
            <p>
              Any dispute arising out of or relating to these Terms or the services provided by WORK VORTEX shall be subject to the jurisdiction of the competent courts in Fatehabad, Haryana.
            </p>
          </div>

          {/* 19. Contact Us */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Contact Us
            </h2>
            <p className="text-slate-600">
              For service enquiries, support, or questions regarding these Terms, please contact:
            </p>
            
            <div className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
              <div className="space-y-1">
                <span className="font-display font-bold text-base text-slate-900 block">WORK VORTEX</span>
                <span className="text-xs font-mono text-slate-600 block">Managed by SANJAY SAMA</span>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <span>
                    House No. 149 F, Raniya Road, Bolt Music, Professor Colony, Fatehabad, Fatehabad, Haryana – 125050, India
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

export default TermsPage;
