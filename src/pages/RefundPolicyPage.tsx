import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { RotateCcw, ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';

export const RefundPolicyPage: React.FC = () => {
  return (
    <div className="space-y-0 font-body">
      <SEO
        title="Cancellation & Refund Policy | WORK VORTEX"
        description="Cancellation & Refund Policy of WORK VORTEX, managed by SANJAY SAMA. Learn about duplicate transaction refund eligibility and processing terms."
        canonical="/refund-policy"
      />

      {/* Header / Hero Section */}
      <section className="pt-32 sm:pt-40 pb-12 bg-radial-gradient border-b border-slate-200/80 text-left">
        <div className="container-vortex max-w-4xl space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono text-slate-700 shadow-xs">
              <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
              <span>CANCELLATION & REFUND GUIDELINES</span>
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
            Cancellation & Refund Policy – WORK VORTEX
          </h1>
          <p className="text-xs font-mono text-slate-500">Last Updated: October 2026</p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-200 text-left">
        <div className="container-vortex max-w-4xl space-y-10 text-sm text-slate-700 leading-relaxed font-body">

          {/* 1. Refund Eligibility */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900 flex items-center gap-2">
              <span>Refund Eligibility</span>
            </h2>
            <p>
              WORK VORTEX provides refunds only in cases where a duplicate transaction has been made for the same service/order.
            </p>
            <p>
              A duplicate transaction means that the customer has been charged more than once for the same service due to a technical issue, payment error, or accidental repeated payment.
            </p>
          </div>

          {/* 2. Duplicate Transaction Refund */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Duplicate Transaction Refund
            </h2>
            <p>
              If a customer has been charged twice or multiple times for the same transaction, the additional/duplicate amount will be eligible for a refund after verification.
            </p>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
              <p className="font-medium text-slate-800">
                The customer may contact us with the following details:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600 marker:text-blue-500">
                <li>Transaction ID/Reference Number</li>
                <li>Date and amount of the transaction</li>
                <li>Registered email address or mobile number</li>
                <li>Proof of the duplicate payment, if required</li>
              </ul>
            </div>
            <p className="text-slate-600 pt-1">
              After verification, the duplicate amount will be refunded to the original payment method used for the transaction.
            </p>
          </div>

          {/* 3. Non-Refundable Transactions */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Non-Refundable Transactions
            </h2>
            <p>
              Payments made for successfully provided services are non-refundable.
            </p>
            <p className="font-medium text-slate-800">Refunds will not be provided for:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 marker:text-blue-500">
              <li>Change of mind</li>
              <li>Failure to use the service</li>
              <li>Dissatisfaction after the service has been provided</li>
              <li>Incorrect information provided by the customer</li>
              <li>Any reason other than a verified duplicate transaction</li>
            </ul>
          </div>

          {/* 4. Refund Processing */}
          <div className="space-y-3">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Refund Processing
            </h2>
            <p>
              Once a duplicate transaction is verified and approved, the refund will be initiated to the original payment method. The time taken for the amount to reflect in the customer&apos;s account may depend on the customer&apos;s bank, card issuer, payment service provider, or other applicable financial institution.
            </p>
          </div>

          {/* 5. Contact Us */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900">
              Contact Us
            </h2>
            <p className="text-slate-600">
              For any refund-related queries regarding duplicate transactions, please contact:
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
                    Address: House No. 149 F, Raniya Road, Bolt Music, Professor Colony, Fatehabad, Fatehabad, Haryana – 125050
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
                    Phone:{' '}
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

export default RefundPolicyPage;
