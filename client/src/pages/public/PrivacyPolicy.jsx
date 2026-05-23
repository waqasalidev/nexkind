import { ScrollText, ShieldCheck, Lock } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="container-custom max-w-4xl">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
              <Lock size={32} />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
            <p className="text-slate-500">Last updated: January 29, 2026</p>
          </div>

          <div className="prose prose-lg prose-slate max-w-none">
            <p>
              At NexKind, accessible from NexKind.org, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by NexKind and how we use it.
            </p>

            <h3>1. Information We Collect</h3>
            <p>
              We collect information you provide directly to us when you register for an account, apply for a scholarship, enroll in a course, or donate. This may include:
            </p>
            <ul>
              <li>Personal identification (Name, email address, phone number)</li>
              <li>Educational background and employment history (for job/scholarship applications)</li>
              <li>Payment information (for donations - processed securely via third-party providers)</li>
            </ul>

            <h3>2. How We Use Your Information</h3>
            <p>
              We use the information we collect in various ways, including to:
            </p>
            <ul>
              <li>Provide, operate, and maintain our website</li>
              <li>Improve, personalize, and expand our website</li>
              <li>Understand and analyze how you use our website</li>
              <li>Develop new products, services, features, and functionality</li>
              <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website.</li>
              <li>Send you emails</li>
              <li>Find and prevent fraud</li>
            </ul>

            <h3>3. Log Files</h3>
            <p>
              NexKind follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.
            </p>

            <h3>4. Cookies and Web Beacons</h3>
            <p>
              Like any other website, NexKind uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
            </p>

            <h3>5. Third Party Privacy Policies</h3>
            <p>
              NexKind's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 rounded-r-xl">
              <h4 className="text-blue-800 font-bold mb-2 flex items-center gap-2"><ShieldCheck size={20} /> Security of Data</h4>
              <p className="text-blue-700 text-sm mb-0">
                The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>
            </div>

            <h3>6. Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, You can contact us:
            </p>
            <ul>
              <li>By email: privacy@NexKind.org</li>
              <li>By visiting this page on our website: /contact</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
