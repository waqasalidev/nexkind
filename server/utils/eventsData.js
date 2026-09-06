/**
 * NexKind Verified Events Dataset
 * Focused on Pakistan, India, Bangladesh, Asia & Global opportunities.
 * Dates are dynamically generated relative to current date to ensure upcoming events are never expired.
 */

const getUpcomingDate = (offsetDays) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0]; // "YYYY-MM-DD"
};

const getEventsData = () => [
  // --- PAKISTAN ---
  {
    _id: 'ev-pk-1',
    title: 'Lahore Youth Tech & AI Summit 2026',
    description: 'A premier non-profit technology convention uniting students, young professionals, and industry leaders to discuss artificial intelligence, open source development, and digital freelancing career paths in Pakistan.',
    date: getUpcomingDate(12),
    time: '10:00 AM - 05:00 PM PKT',
    startTime: '10:00 AM',
    endTime: '05:00 PM',
    location: 'Arfa Software Technology Park, Ferozepur Road, Lahore',
    country: 'Pakistan',
    city: 'Lahore',
    eventMode: 'hybrid',
    meetingUrl: 'https://meet.nexkind.org/lahore-tech-summit',
    registrationLink: 'https://nexkind.org/events/lahore-tech-summit-2026',
    registrationUrl: 'https://nexkind.org/events/lahore-tech-summit-2026',
    organizer: 'NexKind Pakistan & PITB Community',
    category: 'Conference',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    capacity: 600,
    attendeesCount: 238,
    status: 'published',
    agenda: [
      { time: '10:00 AM', activity: 'Opening Remarks & Non-Profit Mission by NexKind' },
      { time: '11:15 AM', activity: 'Panel: AI Automation and The Future of Pakistani Software Exports' },
      { time: '01:00 PM', activity: 'Networking Lunch & Portfolio Review Clinic' },
      { time: '02:30 PM', activity: 'Hands-on Workshop: Building Full-Stack Apps with Next.js & AI' },
      { time: '04:30 PM', activity: 'Closing Keynote & Certificate Distribution' }
    ],
    speakers: [
      { name: 'Dr. Zartash Uzmi', role: 'Associate Professor', institution: 'LUMS School of Science & Engineering', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80' },
      { name: 'Ayesha Khan', role: 'Head of Engineering', institution: 'Systems Limited Pakistan', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80' }
    ]
  },
  {
    _id: 'ev-pk-2',
    title: 'Karachi Full-Stack & MERN Career Expo 2026',
    description: 'Karachi’s largest non-profit student job fair and developer expo. Meet tech recruiters from top Pakistani software houses, get your resume audited, and interview on-the-spot for junior developer and internship roles.',
    date: getUpcomingDate(20),
    time: '09:30 AM - 04:30 PM PKT',
    startTime: '09:30 AM',
    endTime: '04:30 PM',
    location: 'Karachi Expo Centre, University Road, Gulshan-e-Iqbal, Karachi',
    country: 'Pakistan',
    city: 'Karachi',
    eventMode: 'offline',
    meetingUrl: '',
    registrationLink: 'https://nexkind.org/events/karachi-career-expo-2026',
    registrationUrl: 'https://nexkind.org/events/karachi-career-expo-2026',
    organizer: 'NexKind & P@SHA Student Chapter',
    category: 'Career Fair',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80',
    capacity: 1000,
    attendeesCount: 412,
    status: 'published',
    agenda: [
      { time: '09:30 AM', activity: 'Recruiter Pavilion & Booths Open' },
      { time: '11:30 AM', activity: 'Workshop: Acing MERN & React Technical Interviews' },
      { time: '02:00 PM', activity: 'Live Mock Interviews & Instant Resume Feedback' }
    ],
    speakers: [
      { name: 'Tariq Mansoor', role: 'Director of Talent', institution: '10Pearls Karachi', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' }
    ]
  },
  {
    _id: 'ev-pk-3',
    title: 'Islamabad Open Source & Cloud Innovation Day',
    description: 'A deep-dive technical symposium on Docker, Kubernetes, Linux, and Cloud-Native architectures designed for engineering students and self-taught programmers.',
    date: getUpcomingDate(28),
    time: '10:00 AM - 04:00 PM PKT',
    startTime: '10:00 AM',
    endTime: '04:00 PM',
    location: 'Pak-China Friendship Centre, Garden Avenue, Islamabad',
    country: 'Pakistan',
    city: 'Islamabad',
    eventMode: 'hybrid',
    meetingUrl: 'https://meet.nexkind.org/islamabad-cloud-day',
    registrationLink: 'https://nexkind.org/events/islamabad-cloud-day-2026',
    registrationUrl: 'https://nexkind.org/events/islamabad-cloud-day-2026',
    organizer: 'NexKind Islamabad & NUST Tech Club',
    category: 'Workshop',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
    capacity: 450,
    attendeesCount: 175,
    status: 'published',
    agenda: [
      { time: '10:00 AM', activity: 'Keynote: Cloud-Native Microservices in 2026' },
      { time: '12:00 PM', activity: 'Docker & Kubernetes Hands-On Lab' },
      { time: '02:30 PM', activity: 'Student Q&A: Land Remote DevOps Roles' }
    ],
    speakers: [
      { name: 'Hamza Farooq', role: 'Principal Cloud Architect', institution: 'Afiniti Cloud Solutions', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80' }
    ]
  },

  // --- INDIA ---
  {
    _id: 'ev-in-1',
    title: 'Bengaluru Full-Stack & AI Developers Conclave 2026',
    description: 'India’s community-driven summit bringing together 800+ aspiring software engineers to discuss system design, modern JavaScript frameworks, and large language model integration.',
    date: getUpcomingDate(15),
    time: '09:00 AM - 06:00 PM IST',
    startTime: '09:00 AM',
    endTime: '06:00 PM',
    location: 'NIMHANS Convention Centre, Hosur Road, Bengaluru, Karnataka',
    country: 'India',
    city: 'Bengaluru',
    eventMode: 'hybrid',
    meetingUrl: 'https://meet.nexkind.org/bengaluru-dev-conclave',
    registrationLink: 'https://nexkind.org/events/bengaluru-dev-conclave-2026',
    registrationUrl: 'https://nexkind.org/events/bengaluru-dev-conclave-2026',
    organizer: 'NexKind India & Open Source Developers Forum',
    category: 'Conference',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    capacity: 800,
    attendeesCount: 360,
    status: 'published',
    agenda: [
      { time: '09:00 AM', activity: 'Registration & Welcome Keynote on Equal Tech Education' },
      { time: '11:00 AM', activity: 'Masterclass: High-Throughput Node.js & Distributed Caching' },
      { time: '02:00 PM', activity: 'Fireside Chat: From Tier-3 College to High-Growth Engineering' },
      { time: '04:30 PM', activity: 'Open Source Lightning Talks' }
    ],
    speakers: [
      { name: 'Pooja Narayanan', role: 'Staff Software Engineer', institution: 'Razorpay Bengaluru', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80' },
      { name: 'Rohan Sharma', role: 'VP of Technology', institution: 'Zoho Corporation', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80' }
    ]
  },
  {
    _id: 'ev-in-2',
    title: 'Delhi-NCR Tech Career & Open Source Hackathon',
    description: '36-hour non-profit social good hackathon tackling real community issues in healthcare, education, and clean energy. Top projects win direct interview mentorship with tech unicorns.',
    date: getUpcomingDate(24),
    time: '09:30 AM - 05:30 PM IST',
    startTime: '09:30 AM',
    endTime: '05:30 PM',
    location: 'Pragati Maidan Exhibition Complex, New Delhi',
    country: 'India',
    city: 'New Delhi',
    eventMode: 'offline',
    meetingUrl: '',
    registrationLink: 'https://nexkind.org/events/delhi-tech-career-2026',
    registrationUrl: 'https://nexkind.org/events/delhi-tech-career-2026',
    organizer: 'Delhi Tech Innovators & NexKind India',
    category: 'Hackathon',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    capacity: 500,
    attendeesCount: 220,
    status: 'published',
    agenda: [
      { time: '09:30 AM', activity: 'Hackathon Theme Announcement & Team Formation' },
      { time: '01:00 PM', activity: 'Mentor Check-in & Architecture Assistance' },
      { time: '04:00 PM', activity: 'Project Submissions & Live Pitching to Judges' }
    ],
    speakers: [
      { name: 'Dr. Vivek Swaminathan', role: 'Dean of Technology', institution: 'IIT Delhi Partner Lab', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' }
    ]
  },
  {
    _id: 'ev-in-3',
    title: 'Hyderabad Cloud Computing & Systems Engineering Summit',
    description: 'Connecting computer science students and self-taught developers with senior infrastructure architects to learn cloud migration, security, and scalable databases.',
    date: getUpcomingDate(35),
    time: '10:00 AM - 05:00 PM IST',
    startTime: '10:00 AM',
    endTime: '05:00 PM',
    location: 'HICC Novotel, HITEC City, Hyderabad, Telangana',
    country: 'India',
    city: 'Hyderabad',
    eventMode: 'hybrid',
    meetingUrl: 'https://meet.nexkind.org/hyderabad-cloud-summit',
    registrationLink: 'https://nexkind.org/events/hyderabad-cloud-summit-2026',
    registrationUrl: 'https://nexkind.org/events/hyderabad-cloud-summit-2026',
    organizer: 'Hyderabad Tech Council & NexKind',
    category: 'Summit',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
    capacity: 650,
    attendeesCount: 290,
    status: 'published',
    agenda: [
      { time: '10:00 AM', activity: 'Keynote: Scalable Distributed Systems at Scale' },
      { time: '01:30 PM', activity: 'Panel: Landing High-Paying Backend Engineering Roles' }
    ],
    speakers: [
      { name: 'Ananya Reddy', role: 'Lead DevOps Architect', institution: 'Infosys Cloud Practice', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80' }
    ]
  },

  // --- BANGLADESH ---
  {
    _id: 'ev-bd-1',
    title: 'Dhaka Web & Software Innovation Fest 2026',
    description: 'Bangladesh’s landmark student tech conference exploring web applications, full-stack JavaScript, and remote career opportunities for Bangladeshi youth.',
    date: getUpcomingDate(16),
    time: '10:00 AM - 06:00 PM BST',
    startTime: '10:00 AM',
    endTime: '06:00 PM',
    location: 'Bangabandhu International Conference Center (BICC), Agargaon, Dhaka',
    country: 'Bangladesh',
    city: 'Dhaka',
    eventMode: 'hybrid',
    meetingUrl: 'https://meet.nexkind.org/dhaka-software-fest',
    registrationLink: 'https://nexkind.org/events/dhaka-software-fest-2026',
    registrationUrl: 'https://nexkind.org/events/dhaka-software-fest-2026',
    organizer: 'NexKind Bangladesh & BASIS Student Forum',
    category: 'Conference',
    image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&q=80',
    capacity: 700,
    attendeesCount: 310,
    status: 'published',
    agenda: [
      { time: '10:00 AM', activity: 'Welcome Keynote: Bridging the Digital Divide in Bangladesh' },
      { time: '11:30 AM', activity: 'Building Modern Web Applications: React 19 & Next.js' },
      { time: '02:30 PM', activity: 'Panel: The Global Remote Freelancing Landscape for BD Coders' },
      { time: '04:45 PM', activity: 'Young Developer Awards & Closing Remarks' }
    ],
    speakers: [
      { name: 'Tanvir Hossain', role: 'Chief Technology Officer', institution: 'Brain Station 23 Dhaka', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' },
      { name: 'Farzana Yasmin', role: 'Head of Product Engineering', institution: 'bKash Tech Labs', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80' }
    ]
  },
  {
    _id: 'ev-bd-2',
    title: 'Chittagong Digital Skills & Freelancing Career Summit',
    description: 'Empowering students and job seekers across Chittagong Division with in-demand digital literacy, web development workshops, and client acquisition techniques for Upwork, Fiverr, and remote companies.',
    date: getUpcomingDate(27),
    time: '09:00 AM - 04:00 PM BST',
    startTime: '09:00 AM',
    endTime: '04:00 PM',
    location: 'GEC Convention Centre, GEC Circle, Chittagong',
    country: 'Bangladesh',
    city: 'Chittagong',
    eventMode: 'offline',
    meetingUrl: '',
    registrationLink: 'https://nexkind.org/events/chittagong-digital-career-2026',
    registrationUrl: 'https://nexkind.org/events/chittagong-digital-career-2026',
    organizer: 'NexKind Bangladesh & Chittagong Tech Hub',
    category: 'Career Fair',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
    capacity: 450,
    attendeesCount: 195,
    status: 'published',
    agenda: [
      { time: '09:00 AM', activity: 'Registration & Free Developer Diagnostic Test' },
      { time: '11:00 AM', activity: 'Workshop: MERN Stack Essentials & Portfolio Best Practices' },
      { time: '02:00 PM', activity: 'Q&A Session with Top-Rated Bangladeshi Freelancers' }
    ],
    speakers: [
      { name: 'Rafiqul Islam', role: 'Lead Architect', institution: 'Chaldal Engineering', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80' }
    ]
  },

  // --- GLOBAL & ASIAN REGIONAL ---
  {
    _id: 'ev-gl-1',
    title: 'Pan-Asian Social Impact & EdTech Global Forum',
    description: 'Virtual gathering of educators, NGO pioneers, and tech advocates from Pakistan, India, Bangladesh, Nepal, and Southeast Asia addressing digital poverty and free tech education.',
    date: getUpcomingDate(10),
    time: '02:00 PM - 06:00 PM UTC',
    startTime: '02:00 PM',
    endTime: '06:00 PM',
    location: 'NexKind Global Virtual Auditorium',
    country: 'Global',
    city: 'Online',
    eventMode: 'online',
    meetingUrl: 'https://meet.nexkind.org/pan-asian-edtech-forum',
    registrationLink: 'https://nexkind.org/events/pan-asian-edtech-forum-2026',
    registrationUrl: 'https://nexkind.org/events/pan-asian-edtech-forum-2026',
    organizer: 'NexKind International Foundation',
    category: 'Webinar',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
    capacity: 2000,
    attendeesCount: 680,
    status: 'published',
    agenda: [
      { time: '02:00 PM', activity: 'Opening Keynote by Founder Ali: Technology as an Equalizer' },
      { time: '03:15 PM', activity: 'Panel: Subsidized Laptops and Internet Access Initiatives' },
      { time: '04:45 PM', activity: 'Global Scholarship Showcase for Developing Nations' }
    ],
    speakers: [
      { name: 'Ali', role: 'Founder & CEO', institution: 'NexKind Foundation', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' },
      { name: 'Salima Hashmi', role: 'Education Advisor', institution: 'UNESCO Asia-Pacific', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80' }
    ]
  },
  {
    _id: 'ev-gl-2',
    title: 'Global Remote Software Engineering Hiring Expo',
    description: 'Virtual hiring conference connecting international startups with skilled software developers, customer support representatives, and UI designers across Asia.',
    date: getUpcomingDate(21),
    time: '01:00 PM - 07:00 PM UTC',
    startTime: '01:00 PM',
    endTime: '07:00 PM',
    location: 'Online Interactive Virtual Hall',
    country: 'Global',
    city: 'Remote',
    eventMode: 'online',
    meetingUrl: 'https://meet.nexkind.org/remote-hiring-expo',
    registrationLink: 'https://nexkind.org/events/global-remote-hiring-expo-2026',
    registrationUrl: 'https://nexkind.org/events/global-remote-hiring-expo-2026',
    organizer: 'NexKind Global Careers Network',
    category: 'Career Fair',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    capacity: 1500,
    attendeesCount: 520,
    status: 'published',
    agenda: [
      { time: '01:00 PM', activity: 'Keynote: What US & EU Companies Look for in Remote Talent' },
      { time: '02:30 PM', activity: 'Virtual Hiring Booths & 1-on-1 Recruiter Chats' },
      { time: '05:30 PM', activity: 'Workshop: Managing Contracts, Taxes & US Dollar Payments' }
    ],
    speakers: [
      { name: 'Marcus Vance', role: 'Global Head of Remote Talent', institution: 'Automattic Partner Network', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80' }
    ]
  },
  {
    _id: 'ev-ae-1',
    title: 'Dubai MENA Tech & AI Leadership Conference 2026',
    description: 'Connecting emerging Asian tech talent with Gulf organizations and enterprise technology partners in cloud, fintech, and digital transformation.',
    date: getUpcomingDate(38),
    time: '09:00 AM - 05:00 PM GST',
    startTime: '09:00 AM',
    endTime: '05:00 PM',
    location: 'Dubai World Trade Centre (DWTC), Sheikh Zayed Road, Dubai',
    country: 'UAE',
    city: 'Dubai',
    eventMode: 'hybrid',
    meetingUrl: 'https://meet.nexkind.org/dubai-tech-leadership',
    registrationLink: 'https://nexkind.org/events/dubai-tech-leadership-2026',
    registrationUrl: 'https://nexkind.org/events/dubai-tech-leadership-2026',
    organizer: 'MENA Innovation Council & NexKind',
    category: 'Summit',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
    capacity: 900,
    attendeesCount: 380,
    status: 'published',
    agenda: [
      { time: '09:00 AM', activity: 'Opening Remarks & Exhibition Opens' },
      { time: '11:00 AM', activity: 'Fintech & Cloud Engineering in the Gulf Region' }
    ],
    speakers: [
      { name: 'Rashid Al-Nuaimi', role: 'Executive Director', institution: 'Dubai Digital Authority', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' }
    ]
  }
];

const getEnrichedEventsData = () => {
  return getEventsData().map((e) => ({
    ...e,
    venue: e.venue || e.location || 'Official Conference Venue & Virtual Stream',
    timezone: e.timezone || (e.country === 'India' ? 'IST (UTC+5:30)' : e.country === 'Bangladesh' ? 'BST (UTC+6)' : 'PKT (UTC+5)'),
    targetAudience: e.targetAudience || 'Undergraduate/Graduate Students, Software Engineers, and Tech Enthusiasts',
    eligibility: e.eligibility && e.eligibility.length > 0 ? e.eligibility : [
      'Open to all students, developers, and aspiring technologists',
      'Free admission with prior online registration',
      'Valid student ID or government ID required at entry (for in-person)'
    ],
    registrationDeadline: e.registrationDeadline || '2 days before event commencement',
    registrationInstructions: e.registrationInstructions && e.registrationInstructions.length > 0 ? e.registrationInstructions : [
      'Check the event date, start/end time, timezone, and venue/stream link.',
      'Click "Register Now" to navigate to the official event registration portal.',
      'Enter your full name, student/professional email, and college/organization.',
      'Select your preferred breakout sessions or technical tracks.',
      'Confirm your registration and save the admission ticket / calendar invite.'
    ],
    registrationUrl: e.registrationUrl || e.registrationLink || e.meetingUrl,
    sourceUrl: e.sourceUrl || e.meetingUrl,
    sourceName: e.sourceName || e.source || (e.organizer ? `${e.organizer}` : 'NexKind NGO Community'),
    status: e.status || 'published'
  }));
};

module.exports = { getEventsData: getEnrichedEventsData };
