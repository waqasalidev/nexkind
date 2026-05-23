import { ScrollText, Gavel, Scale } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="container-custom max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-600">
              <Gavel size={32} />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Terms of Service</h1>
            <p className="text-slate-500">Last updated: January 29, 2026</p>
          </div>

          <div className="prose prose-lg prose-slate max-w-none">
            <p>
              Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the NexKind website (the "Service") operated by NexKind NGO ("us", "we", or "our").
            </p>
            <p>
              Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
            </p>

            <h3>1. Accounts</h3>
            <p>
              When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
            </p>

            <h3>2. Intellectual Property</h3>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of NexKind and its licensors. The Service is protected by copyright, trademark, and other laws of both the Pakistan and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of NexKind.
            </p>

            <h3>3. Links To Other Web Sites</h3>
            <p>
              Our Service may contain links to third-party web sites or services that are not owned or controlled by NexKind.
            </p>
            <p>
              NexKind has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that NexKind shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
            </p>

            <h3>4. Termination</h3>
            <p>
              We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
            </p>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-6 my-8 rounded-r-xl">
              <h4 className="text-purple-800 font-bold mb-2 flex items-center gap-2"><Scale size={20} /> Changes to Terms</h4>
              <p className="text-purple-700 text-sm mb-0">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
            </div>

            <h3>5. Governing Law</h3>
            <p>
              These Terms shall be governed and construed in accordance with the laws of Pakistan, without regard to its conflict of law provisions.
            </p>

            <h3>6. Contact Us</h3>
            <p>
              If you have any questions about these Terms, please contact us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
