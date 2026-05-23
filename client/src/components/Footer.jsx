import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './common/Logo';

const Footer = () => {
  return (
    <footer className="bg-primary-dark text-slate-300 pt-16">
      <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12">
        <div className="space-y-6">
          <Logo size="md" variant="white" />
          <p className="leading-relaxed">
            Empowering students from education to employment. We provide free education, scholarships, and career guidance to build a better future.
          </p>
          <div className="flex gap-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-6">Quick Links</h3>
          <ul className="space-y-3">
            {['About Us', 'Courses', 'Scholarships', 'Jobs & Internships', 'Contact Us'].map((item) => (
              <li key={item}><Link to={`/${item.split(' ')[0].toLowerCase()}`} className="hover:text-secondary transition-colors">{item}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-6">Support</h3>
          <ul className="space-y-3">
            {[
              { name: 'FAQ', link: '/faq' },
              { name: 'Privacy Policy', link: '/privacy-policy' },
              { name: 'Terms of Service', link: '/terms-of-service' },
              { name: 'Donate', link: '/donate' }
            ].map((item) => (
              <li key={item.name}><Link to={item.link} className="hover:text-secondary transition-colors">{item.name}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold mb-6">Contact Us</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin size={20} className="text-secondary shrink-0 mt-1" />
              <span>123 Education Lane, Knowledge City</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={20} className="text-secondary shrink-0" />
              <span>+1 (234) 567-890</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={20} className="text-secondary shrink-0" />
              <span>info@NexKind.org</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-sm">
        <div className="container-custom">
          <p>&copy; {new Date().getFullYear()} NexKind NGO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
