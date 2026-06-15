const jobsData = [
  // --- 1. Software Engineering (5) ---
  {
    title: "Software Engineer I",
    description: "Build robust, scalable software products and core libraries. Collaborate with cross-functional product and engineering teams.",
    company: "Google",
    location: "Mountain View, CA",
    category: "Software Engineering",
    type: "Full-time",
    workMode: "Hybrid",
    salary: "$120,000 - $150,000",
    experience: "Entry Level (1-2 years)",
    responsibilities: [
      "Write high-quality, maintainable code in Java, C++, or Python",
      "Participate in design and code reviews",
      "Identify and resolve production performance issues"
    ],
    requirements: [
      "Degree in Computer Science or equivalent",
      "Solid knowledge of algorithms and data structures",
      "Experience with Python, C++, or Java"
    ],
    benefits: [
      "Free gourmet meals",
      "On-site gym and wellness classes",
      "401k matching and full health coverage"
    ],
    companyLink: "https://google.com",
    applyLink: "https://careers.google.com",
    image: "https://logo.clearbit.com/google.com"
  },
  {
    title: "Associate Software Engineer",
    description: "Support the development of platform services and contribute to modernizing internal toolsets.",
    company: "Microsoft",
    location: "Redmond, WA",
    category: "Software Engineering",
    type: "Full-time",
    workMode: "On-site",
    salary: "$105,000 - $130,000",
    experience: "Entry Level (0-1 years)",
    responsibilities: [
      "Collaborate with senior engineers on coding tasks",
      "Implement unit tests and continuous integration pipelines",
      "Document API endpoints and software architectures"
    ],
    requirements: [
      "Bachelor's in Computer Science, Software Engineering, or related",
      "Familiarity with C# or C++",
      "Understanding of object-oriented design"
    ],
    benefits: [
      "Flexible spending accounts",
      "Generous PTO policy",
      "Stock purchase plans"
    ],
    companyLink: "https://microsoft.com",
    applyLink: "https://careers.microsoft.com",
    image: "https://logo.clearbit.com/microsoft.com"
  },
  {
    title: "Software Development Intern",
    description: "Gain hands-on software development experience working on real-world projects that impact millions of users.",
    company: "Amazon",
    location: "Seattle, WA",
    category: "Software Engineering",
    type: "Internship",
    workMode: "On-site",
    salary: "$45 - $60 / hr",
    experience: "Internship (Student)",
    responsibilities: [
      "Design and deploy small-scale microservices",
      "Write clean code under the mentorship of senior staff",
      "Present project outcomes to the team at the end of internship"
    ],
    requirements: [
      "Currently pursuing a BS or MS in Computer Science",
      "Proficient in Java, Python, or C++",
      "Basic understanding of SQL and web services"
    ],
    benefits: [
      "Housing stipend",
      "Transit pass and wellness discount",
      "Direct conversion path to full-time roles"
    ],
    companyLink: "https://amazon.com",
    applyLink: "https://amazon.jobs",
    image: "https://logo.clearbit.com/amazon.com"
  },
  {
    title: "Systems Software Developer",
    description: "Design low-level system software components, operating system integrations, and firmware drivers.",
    company: "Apple",
    location: "Cupertino, CA",
    category: "Software Engineering",
    type: "Contract",
    workMode: "On-site",
    salary: "$85 - $110 / hr",
    experience: "Mid Level (3-5 years)",
    responsibilities: [
      "Optimize hardware-software interfaces for speed and battery life",
      "Debug kernel-level crashes and memory leaks",
      "Collaborate with hardware design teams"
    ],
    requirements: [
      "Strong coding proficiency in C and C++",
      "Knowledge of ARM architecture and assembly language",
      "Experience with RTOS or kernel debugging"
    ],
    benefits: [
      "Competitive hourly pay",
      "Access to employee discounts",
      "Health benefits program"
    ],
    companyLink: "https://apple.com",
    applyLink: "https://www.apple.com/jobs",
    image: "https://logo.clearbit.com/apple.com"
  },
  {
    title: "Remote Core Platform Engineer",
    description: "Develop scalable and secure backend pipelines, data warehouses, and queue systems remotely.",
    company: "Netflix",
    location: "Remote",
    category: "Software Engineering",
    type: "Remote",
    workMode: "Remote",
    salary: "$180,000 - $220,000",
    experience: "Senior Level (5+ years)",
    responsibilities: [
      "Architect microservice systems handling high-traffic streaming requests",
      "Build resilient data pipelines using Kafka and gRPC",
      "Optimize database queries and caching strategies"
    ],
    requirements: [
      "Proven experience in distributed systems design",
      "Expertise in Java, Scala, or Go",
      "Excellent asynchronous communication skills"
    ],
    benefits: [
      "Fully remote work flexibility",
      "Unlimited PTO",
      "Top-tier compensation package"
    ],
    companyLink: "https://netflix.com",
    applyLink: "https://jobs.netflix.com",
    image: "https://logo.clearbit.com/netflix.com"
  },

  // --- 2. Frontend Developer (5) ---
  {
    title: "Frontend Developer",
    description: "Build beautiful, highly interactive web applications using React, TailwindCSS, and state management.",
    company: "Meta",
    location: "Menlo Park, CA",
    category: "Frontend Developer",
    type: "Full-time",
    workMode: "Hybrid",
    salary: "$130,000 - $160,000",
    experience: "Mid Level (2-4 years)",
    responsibilities: [
      "Develop responsive user-facing components",
      "Integrate web interfaces with RESTful and GraphQL APIs",
      "Optimize frontend bundle sizes and rendering speeds"
    ],
    requirements: [
      "Strong JavaScript / TypeScript foundations",
      "Hands-on experience with React, Vue, or Angular",
      "Knowledge of CSS frameworks like Tailwind or styled-components"
    ],
    benefits: [
      "Wellness stipend",
      "Generous health plans",
      "Annual education budget"
    ],
    companyLink: "https://meta.com",
    applyLink: "https://www.metacareers.com",
    image: "https://logo.clearbit.com/meta.com"
  },
  {
    title: "Junior Frontend Developer",
    description: "Help build the user interface of our e-commerce platforms. Excellent role for career starters.",
    company: "Shopify",
    location: "Toronto, Canada",
    category: "Frontend Developer",
    type: "Full-time",
    workMode: "Remote",
    salary: "$75,000 - $90,000",
    experience: "Entry Level (1-2 years)",
    responsibilities: [
      "Maintain and improve existing UI pages",
      "Collaborate with product designers to implement mockups",
      "Fix bugs related to CSS styling and state updates"
    ],
    requirements: [
      "HTML, CSS, JavaScript (ES6+)",
      "Basic understanding of React and NPM",
      "Familiarity with Git version control"
    ],
    benefits: [
      "Work from home allowance",
      "Flexible hours",
      "Mental health support program"
    ],
    companyLink: "https://shopify.com",
    applyLink: "https://www.shopify.com/careers",
    image: "https://logo.clearbit.com/shopify.com"
  },
  {
    title: "Frontend Development Intern",
    description: "Get introduced to production-level frontend engineering. Work on building customer portals and dashboards.",
    company: "Stripe",
    location: "San Francisco, CA",
    category: "Frontend Developer",
    type: "Internship",
    workMode: "Hybrid",
    salary: "$40 - $55 / hr",
    experience: "Internship (Student)",
    responsibilities: [
      "Write UI tests and storybook components",
      "Assist in migrating legacy code to modern React components",
      "Document custom CSS components"
    ],
    requirements: [
      "Basic React and JavaScript skills",
      "Interest in user interfaces and web performance",
      "Eager to learn and accept constructive feedback"
    ],
    benefits: [
      "Mentorship pairing with lead developers",
      "Commuter subsidies",
      "Intern events and networking"
    ],
    companyLink: "https://stripe.com",
    applyLink: "https://stripe.com/jobs",
    image: "https://logo.clearbit.com/stripe.com"
  },
  {
    title: "Senior UI Developer",
    description: "Lead the frontend team to build high-performance dashboard interfaces and custom charting tools.",
    company: "Salesforce",
    location: "New York, NY",
    category: "Frontend Developer",
    type: "Full-time",
    workMode: "On-site",
    salary: "$150,000 - $185,000",
    experience: "Senior Level (6+ years)",
    responsibilities: [
      "Define frontend architectures and coding standards",
      "Mentor junior developers and review code packages",
      "Optimize complex state visualizations"
    ],
    requirements: [
      "Expertise in modern JavaScript, CSS, and HTML",
      "Advanced state management knowledge (Redux, Zustand)",
      "Strong communication and leadership experience"
    ],
    benefits: [
      "Pension contribution",
      "Comprehensive medical package",
      "Volunteering time off"
    ],
    companyLink: "https://salesforce.com",
    applyLink: "https://careers.salesforce.com",
    image: "https://logo.clearbit.com/salesforce.com"
  },
  {
    title: "Contract Web Developer",
    description: "Develop marketing landing pages, interactive calculators, and micro-sites for a 6-month product release campaign.",
    company: "HubSpot",
    location: "Boston, MA",
    category: "Frontend Developer",
    type: "Contract",
    workMode: "Remote",
    salary: "$60 - $80 / hr",
    experience: "Mid Level (3+ years)",
    responsibilities: [
      "Translate designs into pixel-perfect responsive HTML/CSS/JS",
      "Implement animations and video embed components",
      "Perform cross-browser compatibility checks"
    ],
    requirements: [
      "Proficient in CSS, JS, and responsive web principles",
      "Experience with Framer Motion or GSAP",
      "Portfolio demonstrating interactive web projects"
    ],
    benefits: [
      "Flexible contract duration",
      "Weekly payments",
      "Fully remote"
    ],
    companyLink: "https://hubspot.com",
    applyLink: "https://careers.hubspot.com",
    image: "https://logo.clearbit.com/hubspot.com"
  },

  // --- 3. Backend Developer (5) ---
  {
    title: "Backend Services Developer",
    description: "Build microservices and APIs that handle high volume read and write operations.",
    company: "GitHub",
    location: "San Francisco, CA",
    category: "Backend Developer",
    type: "Full-time",
    workMode: "Remote",
    salary: "$130,000 - $160,000",
    experience: "Mid Level (3-5 years)",
    responsibilities: [
      "Develop and clean database structures and API schemas",
      "Implement authorization strategies and JWT verification mechanisms",
      "Optimize data caching strategies using Redis"
    ],
    requirements: [
      "Experience with Ruby on Rails, Go, or Node.js",
      "Database skills (PostgreSQL, MySQL, Redis)",
      "RESTful API design best practices"
    ],
    benefits: [
      "Home office setup budget",
      "Paid parental leave",
      "Generous health plans"
    ],
    companyLink: "https://github.com",
    applyLink: "https://github.com/about/careers",
    image: "https://logo.clearbit.com/github.com"
  },
  {
    title: "Junior Database & Backend Developer",
    description: "Work on database management, index optimizations, and writing Express.js services.",
    company: "MongoDB",
    location: "New York, NY",
    category: "Backend Developer",
    type: "Full-time",
    workMode: "Hybrid",
    salary: "$90,000 - $110,000",
    experience: "Entry Level (1-2 years)",
    responsibilities: [
      "Create API endpoints and link MongoDB collections",
      "Assist in writing database aggregations",
      "Troubleshoot server side delays"
    ],
    requirements: [
      "Knowledge of Node.js and Express",
      "Understanding of NoSQL databases, specifically MongoDB",
      "Basic testing knowledge using Jest"
    ],
    benefits: [
      "MongoDB certification support",
      "Free transit pass",
      "Health and wellness credits"
    ],
    companyLink: "https://mongodb.com",
    applyLink: "https://careers.mongodb.com",
    image: "https://logo.clearbit.com/mongodb.com"
  },
  {
    title: "Backend Engineer Intern",
    description: "Assist our server-side engineering team in developing search index systems and transaction logs.",
    company: "PayPal",
    location: "San Jose, CA",
    category: "Backend Developer",
    type: "Internship",
    workMode: "Hybrid",
    salary: "$35 - $50 / hr",
    experience: "Internship (Student)",
    responsibilities: [
      "Develop backend automated regression tests",
      "Fix bugs related to API headers and timeouts",
      "Participate in weekly team sprint retrospectives"
    ],
    requirements: [
      "Student in CS or related technical major",
      "Java or Python coding capability",
      "Understanding of MVC patterns"
    ],
    benefits: [
      "Competitive intern hourly salary",
      "Flexible study hours allowance",
      "Access to internal learning platforms"
    ],
    companyLink: "https://paypal.com",
    applyLink: "https://careers.pypl.com",
    image: "https://logo.clearbit.com/paypal.com"
  },
  {
    title: "Principal Backend Developer",
    description: "Define backend software architectures, coordinate database migrations, and lead service security reviews.",
    company: "Uber",
    location: "San Francisco, CA",
    category: "Backend Developer",
    type: "Full-time",
    workMode: "Hybrid",
    salary: "$190,000 - $240,000",
    experience: "Senior Level (7+ years)",
    responsibilities: [
      "Direct technical layout of real-time ride and delivery APIs",
      "Mentor senior developers on architectural principles",
      "Design fault-tolerant system models"
    ],
    requirements: [
      "Expertise in Go, Java, or C++",
      "Proven track record with high-throughput microservices",
      "Knowledge of Kafka or similar queue systems"
    ],
    benefits: [
      "Equity packages",
      "Gym membership",
      "Free Uber rides"
    ],
    companyLink: "https://uber.com",
    applyLink: "https://careers.uber.com",
    image: "https://logo.clearbit.com/uber.com"
  },
  {
    title: "Backend Developer (Node.js/Express)",
    description: "A 9-month contract role focused on building administrative dashboards and student report generation systems.",
    company: "Coursera",
    location: "Mountain View, CA",
    category: "Backend Developer",
    type: "Contract",
    workMode: "Remote",
    salary: "$70 - $95 / hr",
    experience: "Mid Level (3+ years)",
    responsibilities: [
      "Generate custom Excel/PDF output endpoints",
      "Develop user registration tracking databases",
      "Connect auth protocols via SAML and OAuth"
    ],
    requirements: [
      "Strong Node.js and Express development background",
      "Knowledge of PostgreSQL databases",
      "Experience with PDF/Excel generation modules"
    ],
    benefits: [
      "Fully remote work opportunity",
      "Option to extend contract",
      "Access to all Coursera catalog courses"
    ],
    companyLink: "https://coursera.org",
    applyLink: "https://about.coursera.org/careers",
    image: "https://logo.clearbit.com/coursera.org"
  },

  // --- 4. Full Stack Developer (5) ---
  {
    title: "Full Stack Engineer",
    description: "Develop both client-side and server-side components of our primary SaaS product. Maintain end-to-end features.",
    company: "Atlassian",
    location: "Sydney, Australia",
    category: "Full Stack Developer",
    type: "Full-time",
    workMode: "Hybrid",
    salary: "$130,000 - $160,000",
    experience: "Mid Level (2-4 years)",
    responsibilities: [
      "Develop React visual interfaces and connect them to Node.js backend controllers",
      "Write schema updates and database triggers",
      "Cover both frontend and backend scripts with automated tests"
    ],
    requirements: [
      "Full stack development experience (React/Node.js or similar)",
      "Database systems knowledge (SQL and NoSQL)",
      "Understanding of CI/CD concepts"
    ],
    benefits: [
      "Purchased leave options",
      "Annual health stipend",
      "Flexible schedule"
    ],
    companyLink: "https://atlassian.com",
    applyLink: "https://careers.atlassian.com",
    image: "https://logo.clearbit.com/atlassian.com"
  },
  {
    title: "Junior MERN Stack Developer",
    description: "Maintain web portals using MongoDB, Express, React, and Node.js. Great opportunity for boot camp graduates.",
    company: "Twilio",
    location: "Denver, CO",
    category: "Full Stack Developer",
    type: "Full-time",
    workMode: "Remote",
    salary: "$80,000 - $95,000",
    experience: "Entry Level (1-2 years)",
    responsibilities: [
      "Implement bug fixes across both client and server repos",
      "Create CRUD operations and hook them to interactive components",
      "Collaborate with the design team"
    ],
    requirements: [
      "Familiarity with the MERN stack (MongoDB, Express, React, Node)",
      "Basic CSS / HTML responsive principles",
      "Good team communication skills"
    ],
    benefits: [
      "Home office allowance",
      "Internet subscription reimbursement",
      "Healthcare plans"
    ],
    companyLink: "https://twilio.com",
    applyLink: "https://careers.twilio.com",
    image: "https://logo.clearbit.com/twilio.com"
  },
  {
    title: "Full Stack Engineering Intern",
    description: "Work with modern frameworks like Next.js, Postgres, and Node.js on our client dashboard projects.",
    company: "Vercel",
    location: "Remote",
    category: "Full Stack Developer",
    type: "Internship",
    workMode: "Remote",
    salary: "$45 - $55 / hr",
    experience: "Internship (Student)",
    responsibilities: [
      "Build backend mock services and frontend API integrations",
      "Assist in writing visual layout pages",
      "Participate in agile sprint ceremonies"
    ],
    requirements: [
      "Undergraduate student in engineering/CS",
      "Experience with Next.js or React",
      "Understanding of relational databases"
    ],
    benefits: [
      "Fully remote work opportunity",
      "Stipend for study materials",
      "Direct guidance from core contributors"
    ],
    companyLink: "https://vercel.com",
    applyLink: "https://vercel.com/careers",
    image: "https://logo.clearbit.com/vercel.com"
  },
  {
    title: "Senior Full Stack Architect",
    description: "Lead software architecture designs, decide on technology stacks, and review code quality across web projects.",
    company: "Airbnb",
    location: "San Francisco, CA",
    category: "Full Stack Developer",
    type: "Full-time",
    workMode: "Hybrid",
    salary: "$180,000 - $210,000",
    experience: "Senior Level (6+ years)",
    responsibilities: [
      "Direct technical layout of large scale client-server applications",
      "Integrate legacy systems with microservices",
      "Set testing standards and coverage goals"
    ],
    requirements: [
      "Expertise in React, Node.js, and SQL databases",
      "Experience with AWS services and Docker",
      "Familiarity with GraphQL and caching"
    ],
    benefits: [
      "Travel credits",
      "Comprehensive medical package",
      "Stock awards"
    ],
    companyLink: "https://airbnb.com",
    applyLink: "https://careers.airbnb.com",
    image: "https://logo.clearbit.com/airbnb.com"
  },
  {
    title: "Full Stack Contractor",
    description: "Develop a custom content management dashboard from scratch in a 3-month contract period.",
    company: "Medium",
    location: "New York, NY",
    category: "Full Stack Developer",
    type: "Contract",
    workMode: "Hybrid",
    salary: "$90 - $120 / hr",
    experience: "Senior Level (5+ years)",
    responsibilities: [
      "Develop custom editors and database models",
      "Implement user login and group permission levels",
      "Optimize data pipelines and file uploads"
    ],
    requirements: [
      "Extensive experience in React, Express, and PostgreSQL",
      "Ability to work independently",
      "Strong portfolio of completed projects"
    ],
    benefits: [
      "High hourly rate",
      "Direct interface with product lead",
      "Hardware allowance"
    ],
    companyLink: "https://medium.com",
    applyLink: "https://jobs.medium.com",
    image: "https://logo.clearbit.com/medium.com"
  },

  // --- 5. Data Analyst (5) ---
  {
    title: "Data Analyst",
    description: "Analyze customer behaviors, track system performance metrics, and build business intelligence dashboards.",
    company: "Uber",
    location: "New York, NY",
    category: "Data Analyst",
    type: "Full-time",
    workMode: "Hybrid",
    salary: "$95,000 - $120,000",
    experience: "Mid Level (2-4 years)",
    responsibilities: [
      "Create clean SQL queries to retrieve user data reports",
      "Build and maintain Tableau dashboard indicators",
      "Perform A/B testing statistical analyses"
    ],
    requirements: [
      "Degree in Statistics, Finance, Mathematics, or CS",
      "Strong SQL capability",
      "Familiarity with Python (Pandas) and visualization tools (Tableau/PowerBI)"
    ],
    benefits: [
      "Subsidized transport programs",
      "Gym membership",
      "Health savings account"
    ],
    companyLink: "https://uber.com",
    applyLink: "https://careers.uber.com",
    image: "https://logo.clearbit.com/uber.com"
  },
  {
    title: "Junior Business Intelligence Analyst",
    description: "Support financial groups with data extraction, cleaning reports, and preparing presentation slides.",
    company: "Goldman Sachs",
    location: "New York, NY",
    category: "Data Analyst",
    type: "Full-time",
    workMode: "On-site",
    salary: "$85,000 - $105,000",
    experience: "Entry Level (1-2 years)",
    responsibilities: [
      "Extract dataset reports from warehouse endpoints",
      "Clean records using Excel and basic Python libraries",
      "Maintain monthly performance boards"
    ],
    requirements: [
      "Degree in Finance, Economics, or Business Analytics",
      "Highly proficient in Microsoft Excel (Pivot tables, VBA)",
      "Basic SQL knowledge"
    ],
    benefits: [
      "Access to wealth management advice",
      "Insurance packages",
      "Continuing education classes"
    ],
    companyLink: "https://goldmansachs.com",
    applyLink: "https://careers.goldmansachs.com",
    image: "https://logo.clearbit.com/goldmansachs.com"
  },
  {
    title: "Data Analytics Intern",
    description: "Learn how to conduct user retention analysis and build dashboards for product teams.",
    company: "Spotify",
    location: "New York, NY",
    category: "Data Analyst",
    type: "Internship",
    workMode: "Hybrid",
    salary: "$30 - $42 / hr",
    experience: "Internship (Student)",
    responsibilities: [
      "Perform data cleaning and formatting operations",
      "Assist in updating active visual user dashboards",
      "Document key calculation parameters"
    ],
    requirements: [
      "Familiarity with Python or R for data analysis",
      "Basic understanding of SQL queries",
      "Strong communication and curiosity"
    ],
    benefits: [
      "Spotify Premium subscription",
      "Social events with other interns",
      "Direct mentoring from lead analysts"
    ],
    companyLink: "https://spotify.com",
    applyLink: "https://careers.spotify.com",
    image: "https://logo.clearbit.com/spotify.com"
  },
  {
    title: "Senior Product Data Analyst",
    description: "Drive product decision-making by analyzing search data, user flows, and engagement numbers.",
    company: "Pinterest",
    location: "San Francisco, CA",
    category: "Data Analyst",
    type: "Full-time",
    workMode: "Hybrid",
    salary: "$140,000 - $170,000",
    experience: "Senior Level (5+ years)",
    responsibilities: [
      "Establish product KPI structures and metrics tracking systems",
      "Lead data modeling improvements",
      "Deliver strategic reports to leadership groups"
    ],
    requirements: [
      "Extensive experience in product analytics",
      "Advanced SQL and Python skills",
      "Strong statistical background (regression, hypothesis testing)"
    ],
    benefits: [
      "Stock purchase plans",
      "Wellness allowance",
      "Catered lunches"
    ],
    companyLink: "https://pinterest.com",
    applyLink: "https://careers.pinterest.com",
    image: "https://logo.clearbit.com/pinterest.com"
  },
  {
    title: "Data Analyst Contractor",
    description: "6-month contract opportunity to organize transaction databases and design migration reports.",
    company: "Stripe",
    location: "Remote",
    category: "Data Analyst",
    type: "Contract",
    workMode: "Remote",
    salary: "$65 - $85 / hr",
    experience: "Mid Level (3+ years)",
    responsibilities: [
      "Audit existing user registration files",
      "Translate transaction databases to cleaner formats",
      "Generate daily transfer success logs"
    ],
    requirements: [
      "Advanced SQL skills",
      "Experience with data warehousing (Snowflake, BigQuery)",
      "Strong attention to detail"
    ],
    benefits: [
      "Remote flexibility",
      "High hourly payment rate",
      "Hardware provided"
    ],
    companyLink: "https://stripe.com",
    applyLink: "https://stripe.com/jobs",
    image: "https://logo.clearbit.com/stripe.com"
  },

  // --- 6. AI Engineer (5) ---
  {
    title: "AI Research Engineer",
    description: "Train and deploy deep learning models. Work on natural language processing and transformer models.",
    company: "OpenAI",
    location: "San Francisco, CA",
    category: "AI Engineer",
    type: "Full-time",
    workMode: "Hybrid",
    salary: "$250,000 - $320,000",
    experience: "Senior Level (4+ years)",
    responsibilities: [
      "Train large-scale language models and optimize parameters",
      "Implement model evaluation pipelines",
      "Optimize model inference speeds in production systems"
    ],
    requirements: [
      "Degree in Machine Learning, Computer Science, or similar",
      "Strong PyTorch or TensorFlow background",
      "Experience training large neural networks"
    ],
    benefits: [
      "Generous stock equity grants",
      "Full health/vision/dental premiums covered",
      "Unlimited meals and snacks"
    ],
    companyLink: "https://openai.com",
    applyLink: "https://openai.com/careers",
    image: "https://logo.clearbit.com/openai.com"
  },
  {
    title: "Junior Machine Learning Engineer",
    description: "Develop data processing scripts and help deploy predictive models to production servers.",
    company: "NVIDIA",
    location: "Santa Clara, CA",
    category: "AI Engineer",
    type: "Full-time",
    workMode: "On-site",
    salary: "$110,000 - $140,000",
    experience: "Entry Level (1-2 years)",
    responsibilities: [
      "Clean large datasets and run model training logs",
      "Assist in model packaging and containerization using Docker",
      "Track training performance metrics"
    ],
    requirements: [
      "Degree in CS, Mathematics, or engineering",
      "Solid Python skills and experience with Pandas/Numpy",
      "Basic understanding of neural network layers"
    ],
    benefits: [
      "ESPP program access",
      "On-site gym membership",
      "Educational assistance"
    ],
    companyLink: "https://nvidia.com",
    applyLink: "https://careers.nvidia.com",
    image: "https://logo.clearbit.com/nvidia.com"
  },
  {
    title: "Computer Vision Intern",
    description: "Assist in developing real-time object detection models for autonomous vehicle navigation databases.",
    company: "Tesla",
    location: "Palo Alto, CA",
    category: "AI Engineer",
    type: "Internship",
    workMode: "On-site",
    salary: "$45 - $60 / hr",
    experience: "Internship (Student)",
    responsibilities: [
      "Annotate and check camera video datasets",
      "Train baseline models and document accuracy metrics",
      "Collaborate with integration teams"
    ],
    requirements: [
      "Pursuing PhD or MS in computer vision/ML field",
      "Experience with OpenCV and PyTorch",
      "Understanding of CNN architectures"
    ],
    benefits: [
      "Housing support option",
      "Tesla product discounts",
      "High conversion rates to full-time roles"
    ],
    companyLink: "https://tesla.com",
    applyLink: "https://www.tesla.com/careers",
    image: "https://logo.clearbit.com/tesla.com"
  },
  {
    title: "Senior AI Solutions Engineer",
    description: "Architect custom machine learning solutions for enterprise clients and direct integration layouts.",
    company: "IBM",
    location: "Armonk, NY",
    category: "AI Engineer",
    type: "Full-time",
    workMode: "Hybrid",
    salary: "$160,000 - $190,000",
    experience: "Senior Level (6+ years)",
    responsibilities: [
      "Consult with corporate clients on AI use cases",
      "Lead deployment pipelines on cloud clusters",
      "Design security audits for data models"
    ],
    requirements: [
      "Experience deploying models to AWS/Azure/IBM Cloud",
      "Strong Python and API design experience",
      "Excellent client-facing skills"
    ],
    benefits: [
      "Retirement match options",
      "Comprehensive medical package",
      "Global transfer opportunities"
    ],
    companyLink: "https://ibm.com",
    applyLink: "https://careers.ibm.com",
    image: "https://logo.clearbit.com/ibm.com"
  },
  {
    title: "NLP Engineer (Contract)",
    description: "A 6-month contract role to build custom classification models and clean chat transcript databases.",
    company: "Slack",
    location: "Remote",
    category: "AI Engineer",
    type: "Contract",
    workMode: "Remote",
    salary: "$95 - $130 / hr",
    experience: "Mid Level (3+ years)",
    responsibilities: [
      "Fine-tune pre-trained BERT/GPT models on local datasets",
      "Deploy models behind high-speed API gateways",
      "Perform model safety audits"
    ],
    requirements: [
      "Experience with Hugging Face transformers",
      "Strong Python backend skills",
      "Experience with vector databases (Pinecone, Milvus)"
    ],
    benefits: [
      "Fully remote work opportunity",
      "Weekly payments",
      "Extension possibility"
    ],
    companyLink: "https://slack.com",
    applyLink: "https://slack.com/careers",
    image: "https://logo.clearbit.com/slack.com"
  },

  // --- 7. UI/UX Designer (5) ---
  {
    title: "Product Designer",
    description: "Design intuitive interfaces, user wireframes, and prototypes for our core consumer applications.",
    company: "Airbnb",
    location: "San Francisco, CA",
    category: "UI/UX Designer",
    type: "Full-time",
    workMode: "Hybrid",
    salary: "$115,000 - $145,000",
    experience: "Mid Level (2-4 years)",
    responsibilities: [
      "Create high-fidelity UI screens in Figma",
      "Conduct user interviews and run feedback workshops",
      "Maintain and update the product design style library"
    ],
    requirements: [
      "Figma design mastery",
      "Strong portfolio demonstrating user-centered design processes",
      "Familiarity with web design principles"
    ],
    benefits: [
      "Travel credits",
      "Comprehensive health/vision plans",
      "Annual growth budget"
    ],
    companyLink: "https://airbnb.com",
    applyLink: "https://careers.airbnb.com",
    image: "https://logo.clearbit.com/airbnb.com"
  },
  {
    title: "Junior UI/UX Designer",
    description: "Support UI layout designs, export icons, and coordinate with frontend developers. Perfect starter role.",
    company: "Figma",
    location: "San Francisco, CA",
    category: "UI/UX Designer",
    type: "Full-time",
    workMode: "Hybrid",
    salary: "$85,000 - $105,000",
    experience: "Entry Level (1-2 years)",
    responsibilities: [
      "Build basic layout wireframes",
      "Review design inconsistencies in live pages",
      "Assist in updating component libraries"
    ],
    requirements: [
      "Design portfolio with mobile or web concepts",
      "Understanding of typography and grid systems",
      "Knowledge of Figma or Sketch tools"
    ],
    benefits: [
      "Tech setup stipend",
      "Free transit card",
      "Onsite meals"
    ],
    companyLink: "https://figma.com",
    applyLink: "https://careers.figma.com",
    image: "https://logo.clearbit.com/figma.com"
  },
  {
    title: "UI/UX Design Intern",
    description: "Work with lead designers to learn research methods, run user tests, and build design system libraries.",
    company: "Adobe",
    location: "San Jose, CA",
    category: "UI/UX Designer",
    type: "Internship",
    workMode: "On-site",
    salary: "$30 - $42 / hr",
    experience: "Internship (Student)",
    responsibilities: [
      "Conduct competitive design research audits",
      "Assist in building and testing prototypes",
      "Organize asset folder structures"
    ],
    requirements: [
      "Student in design, HCI, or related fields",
      "Basic skills in Adobe Creative Suite or Figma",
      "Strong visual communication"
    ],
    benefits: [
      "Access to all Adobe software licenses",
      "Intern activities program",
      "Flexible schedule"
    ],
    companyLink: "https://adobe.com",
    applyLink: "https://adobe.com/careers",
    image: "https://logo.clearbit.com/adobe.com"
  },
  {
    title: "Senior UX Researcher",
    description: "Lead user research studies globally to discover design insights and direct product updates.",
    company: "Google",
    location: "London, UK",
    category: "UI/UX Designer",
    type: "Full-time",
    workMode: "Hybrid",
    salary: "$140,000 - $175,000",
    experience: "Senior Level (6+ years)",
    responsibilities: [
      "Plan and conduct quantitative/qualitative user research",
      "Present user studies data to engineering leads",
      "Establish design research standards"
    ],
    requirements: [
      "Advanced degree in Cognitive Science, HCI, or psychology",
      "Proven experience conducting large-scale user studies",
      "Strong analytical skills"
    ],
    benefits: [
      "Gourmet lunch programs",
      "Pension contributions",
      "Relocation support"
    ],
    companyLink: "https://google.com",
    applyLink: "https://careers.google.com",
    image: "https://logo.clearbit.com/google.com"
  },
  {
    title: "UI Designer (Contract)",
    description: "Redesign the student registration portal interfaces. A 3-month contract role.",
    company: "Duolingo",
    location: "Remote",
    category: "UI/UX Designer",
    type: "Contract",
    workMode: "Remote",
    salary: "$55 - $75 / hr",
    experience: "Mid Level (3+ years)",
    responsibilities: [
      "Design responsive registration flows",
      "Test design alternatives for conversion metrics",
      "Deliver assets to frontend developers"
    ],
    requirements: [
      "Strong responsive web design skills",
      "Experience designing educational products",
      "Excellent typography and branding skills"
    ],
    benefits: [
      "Remote flexibility",
      "Fast payout terms",
      "Design team integration"
    ],
    companyLink: "https://duolingo.com",
    applyLink: "https://careers.duolingo.com",
    image: "https://logo.clearbit.com/duolingo.com"
  },

  // --- 8. Digital Marketing (5) ---
  {
    title: "Digital Marketing Specialist",
    description: "Develop paid ads campaigns, coordinate social media strategies, and improve search engine rankings.",
    company: "HubSpot",
    location: "Dublin, Ireland",
    category: "Digital Marketing",
    type: "Full-time",
    workMode: "Hybrid",
    salary: "$70,000 - $90,000",
    experience: "Mid Level (2-4 years)",
    responsibilities: [
      "Manage Google Ads and Facebook Ads accounts",
      "Perform keyword research and content optimizations for SEO",
      "Track campaign cost per conversion metrics"
    ],
    requirements: [
      "Degree in Marketing, Communications, or Business",
      "Google Ads/Analytics certifications",
      "Experience running paid ad spend budgets"
    ],
    benefits: [
      "Pension matching plans",
      "Onsite fitness rooms",
      "Generous health plans"
    ],
    companyLink: "https://hubspot.com",
    applyLink: "https://careers.hubspot.com",
    image: "https://logo.clearbit.com/hubspot.com"
  },
  {
    title: "Junior Social Media Coordinator",
    description: "Manage brand accounts on TikTok, Instagram, and LinkedIn. Create content schedules and engage audiences.",
    company: "TikTok",
    location: "Los Angeles, CA",
    category: "Digital Marketing",
    type: "Full-time",
    workMode: "On-site",
    salary: "$60,000 - $75,000",
    experience: "Entry Level (1-2 years)",
    responsibilities: [
      "Create weekly video and graphics posts",
      "Respond to community messages and trends",
      "Track engagement and follower analytics"
    ],
    requirements: [
      "Active presence on social platforms",
      "Basic video editing skills (CapCut/Premiere)",
      "Strong copywriting skills"
    ],
    benefits: [
      "Catered meals programs",
      "Wellness allowance",
      "Employee discounts"
    ],
    companyLink: "https://tiktok.com",
    applyLink: "https://careers.tiktok.com",
    image: "https://logo.clearbit.com/tiktok.com"
  },
  {
    title: "Marketing Analytics Intern",
    description: "Help pull campaign metrics, compile Excel reports, and audit competitor marketing activities.",
    company: "Netflix",
    location: "Los Angeles, CA",
    category: "Digital Marketing",
    type: "Internship",
    workMode: "Hybrid",
    salary: "$25 - $38 / hr",
    experience: "Internship (Student)",
    responsibilities: [
      "Audit search keyword listings",
      "Assist in compiling weekly campaign performance reports",
      "Draft promotional emails"
    ],
    requirements: [
      "Pursuing a degree in marketing or data science",
      "Proficient in Microsoft Excel",
      "Good analytical mindset"
    ],
    benefits: [
      "Free streaming subscription",
      "Intern activities program",
      "Networking opportunities"
    ],
    companyLink: "https://netflix.com",
    applyLink: "https://jobs.netflix.com",
    image: "https://logo.clearbit.com/netflix.com"
  },
  {
    title: "Senior Growth Marketing Manager",
    description: "Direct user acquisition strategies, scale marketing channels, and oversee growth spending structures.",
    company: "Shopify",
    location: "Remote",
    category: "Digital Marketing",
    type: "Full-time",
    workMode: "Remote",
    salary: "$125,000 - $155,000",
    experience: "Senior Level (6+ years)",
    responsibilities: [
      "Manage annual acquisition budgets",
      "Direct conversion optimization strategies",
      "Lead growth marketing teams"
    ],
    requirements: [
      "Track record of scaling digital marketing metrics",
      "Experience with advanced analytic architectures",
      "Strong leadership history"
    ],
    benefits: [
      "Flexible work from home options",
      "Learning allowance program",
      "Equity shares"
    ],
    companyLink: "https://shopify.com",
    applyLink: "https://www.shopify.com/careers",
    image: "https://logo.clearbit.com/shopify.com"
  },
  {
    title: "SEO Copywriter (Contract)",
    description: "Write 30 SEO-optimized blog posts focusing on software development and tech career roadmaps. 3-month contract.",
    company: "Medium",
    location: "Remote",
    category: "Digital Marketing",
    type: "Contract",
    workMode: "Remote",
    salary: "$40 - $55 / hr",
    experience: "Mid Level (2+ years)",
    responsibilities: [
      "Write high-quality, engaging articles",
      "Integrate target keywords naturally",
      "Coordinate with editor groups"
    ],
    requirements: [
      "Exceptional English writing and grammar",
      "Basic understanding of SEO ranking principles",
      "Portfolio of published online articles"
    ],
    benefits: [
      "Flexible working schedule",
      "Weekly payments",
      "Exposure to large audience base"
    ],
    companyLink: "https://medium.com",
    applyLink: "https://jobs.medium.com",
    image: "https://logo.clearbit.com/medium.com"
  },

  // --- 9. Cybersecurity (5) ---
  {
    title: "Security Analyst",
    description: "Monitor network traffic, perform vulnerability assessments, and coordinate incident responses.",
    company: "CrowdStrike",
    location: "Austin, TX",
    category: "Cybersecurity",
    type: "Full-time",
    workMode: "Hybrid",
    salary: "$100,000 - $130,000",
    experience: "Mid Level (2-4 years)",
    responsibilities: [
      "Review security logs and identify system threats",
      "Perform internal penetration test protocols",
      "Respond to system alarm alerts"
    ],
    requirements: [
      "Degree in Cybersecurity, CS, or information systems",
      "Certifications (CompTIA Security+ or CEH)",
      "Familiarity with Wireshark and SIEM tools"
    ],
    benefits: [
      "Security training stipends",
      "Health and wellness plans",
      "Stock option grants"
    ],
    companyLink: "https://crowdstrike.com",
    applyLink: "https://careers.crowdstrike.com",
    image: "https://logo.clearbit.com/crowdstrike.com"
  },
  {
    title: "Junior Security Engineer",
    description: "Configure system firewalls, review authentication logs, and support audit operations.",
    company: "Cloudflare",
    location: "Austin, TX",
    category: "Cybersecurity",
    type: "Full-time",
    workMode: "On-site",
    salary: "$90,000 - $115,000",
    experience: "Entry Level (1-2 years)",
    responsibilities: [
      "Update security patches on internal servers",
      "Configure SSL certificates and domain firewalls",
      "Analyze malicious spam records"
    ],
    requirements: [
      "Degree in computer networking or security",
      "Understanding of TCP/IP protocol layers",
      "Experience with Linux environments"
    ],
    benefits: [
      "Onsite healthy meal plans",
      "Transit support",
      "Continuous learning opportunities"
    ],
    companyLink: "https://cloudflare.com",
    applyLink: "https://careers.cloudflare.com",
    image: "https://logo.clearbit.com/cloudflare.com"
  },
  {
    title: "Information Security Intern",
    description: "Learn network auditing, trace threat patterns, and document server security structures.",
    company: "Cisco",
    location: "San Jose, CA",
    category: "Cybersecurity",
    type: "Internship",
    workMode: "Hybrid",
    salary: "$35 - $48 / hr",
    experience: "Internship (Student)",
    responsibilities: [
      "Assist in auditing user access settings",
      "Document security process changes",
      "Participate in threat simulation tasks"
    ],
    requirements: [
      "Student in engineering, networking, or CS",
      "Familiarity with standard operating systems",
      "Basic coding logic (Python or Bash)"
    ],
    benefits: [
      "Technical training classes",
      "Competitive hourly wage",
      "Post-graduation offer potential"
    ],
    companyLink: "https://cisco.com",
    applyLink: "https://careers.cisco.com",
    image: "https://logo.clearbit.com/cisco.com"
  },
  {
    title: "Lead Penetration Tester",
    description: "Ethical hacking role. Run penetration tests across SaaS systems, mobile apps, and server infrastructure.",
    company: "Slack",
    location: "Remote",
    category: "Cybersecurity",
    type: "Full-time",
    workMode: "Remote",
    salary: "$160,000 - $195,000",
    experience: "Senior Level (6+ years)",
    responsibilities: [
      "Find and safely exploit security gaps in code structures",
      "Prepare detailed reports of threat issues for development teams",
      "Advise engineers on patching code holes"
    ],
    requirements: [
      "Advanced certifications (OSCP or GPEN)",
      "Strong scripting capability (Python, Ruby, Bash)",
      "Deep understanding of web vulnerabilities (OWASP Top 10)"
    ],
    benefits: [
      "Remote work stipend",
      "Retirement pension plan matching",
      "Unlimited PTO"
    ],
    companyLink: "https://slack.com",
    applyLink: "https://slack.com/careers",
    image: "https://logo.clearbit.com/slack.com"
  },
  {
    title: "Security Consultant (Contract)",
    description: "Perform a comprehensive security audit of customer database interfaces. A 6-month contract role.",
    company: "Okta",
    location: "San Francisco, CA",
    category: "Cybersecurity",
    type: "Contract",
    workMode: "Hybrid",
    salary: "$100 - $135 / hr",
    experience: "Senior Level (5+ years)",
    responsibilities: [
      "Audit Okta API setup models",
      "Check compliance with SOC2 security standards",
      "Provide clean-up guides for authentication scripts"
    ],
    requirements: [
      "Extensive experience in identity management audits",
      "Knowledge of SOC2/ISO27001 requirements",
      "Excellent report writing skills"
    ],
    benefits: [
      "Flexible schedule options",
      "High daily payouts",
      "Direct work with corporate security officers"
    ],
    companyLink: "https://okta.com",
    applyLink: "https://careers.okta.com",
    image: "https://logo.clearbit.com/okta.com"
  },

  // --- 10. Cloud Engineer (5) ---
  {
    title: "Cloud Engineer",
    description: "Manage server deployments on cloud networks, monitor system loads, and build automated deployment pipelines.",
    company: "Amazon Web Services",
    location: "Seattle, WA",
    category: "Cloud Engineer",
    type: "Full-time",
    workMode: "Hybrid",
    salary: "$125,000 - $155,000",
    experience: "Mid Level (2-4 years)",
    responsibilities: [
      "Manage container workloads on AWS ECS and EKS",
      "Configure Infrastructure as Code using Terraform",
      "Support Devops setup tasks"
    ],
    requirements: [
      "Experience with AWS services (EC2, VPC, S3, IAM)",
      "Familiarity with Docker and Kubernetes",
      "Basic scripting skills (Bash, Python)"
    ],
    benefits: [
      "AWS training and exam support",
      "Wellness credit plans",
      "Excellent relocation compensation"
    ],
    companyLink: "https://aws.amazon.com",
    applyLink: "https://amazon.jobs",
    image: "https://logo.clearbit.com/amazon.com"
  },
  {
    title: "Junior Cloud Operations Associate",
    description: "Assist cloud operations groups in monitoring server warnings, responding to load alerts, and executing updates.",
    company: "DigitalOcean",
    location: "New York, NY",
    category: "Cloud Engineer",
    type: "Full-time",
    workMode: "Hybrid",
    salary: "$85,000 - $105,000",
    experience: "Entry Level (1-2 years)",
    responsibilities: [
      "Review cloud usage metrics and report excess costs",
      "Deploy basic server setups for client projects",
      "Manage firewall security groups"
    ],
    requirements: [
      "Basic understanding of Linux system setups",
      "Familiarity with cloud models (VPS, Object storage)",
      "Relevant certification is a plus (e.g. AWS Associate or DO Certified)"
    ],
    benefits: [
      "DigitalOcean usage credits",
      "Commuter support plans",
      "Healthy snack bars"
    ],
    companyLink: "https://digitalocean.com",
    applyLink: "https://careers.digitalocean.com",
    image: "https://logo.clearbit.com/digitalocean.com"
  },
  {
    title: "Cloud Infrastructure Intern",
    description: "Help build deployment pipelines, monitor network parameters, and configure automated backup routines.",
    company: "HashiCorp",
    location: "Remote",
    category: "Cloud Engineer",
    type: "Internship",
    workMode: "Remote",
    salary: "$40 - $55 / hr",
    experience: "Internship (Student)",
    responsibilities: [
      "Assist in writing Terraform script examples",
      "Run server performance test programs",
      "Prepare system documents"
    ],
    requirements: [
      "Currently pursuing an engineering degree",
      "Familiarity with command line environments",
      "Basic interest in infrastructure coding"
    ],
    benefits: [
      "Fully remote work opportunity",
      "Guidance from core tool creators",
      "Generous intern stipend"
    ],
    companyLink: "https://hashicorp.com",
    applyLink: "https://www.hashicorp.com/careers",
    image: "https://logo.clearbit.com/hashicorp.com"
  },
  {
    title: "Senior DevOps Architect",
    description: "Establish CI/CD frameworks, design cloud disaster recovery schemes, and optimize cloud billing patterns.",
    company: "Stripe",
    location: "San Francisco, CA",
    category: "Cloud Engineer",
    type: "Full-time",
    workMode: "Hybrid",
    salary: "$180,000 - $215,000",
    experience: "Senior Level (6+ years)",
    responsibilities: [
      "Direct technical layout of large scale cloud networks",
      "Scale Kubernetes server clusters across regions",
      "Manage cloud network security audits"
    ],
    requirements: [
      "Mastery of Kubernetes, Terraform, and cloud networking",
      "Experience scaling applications serving millions of users",
      "AWS or GCP Solutions Architect Certification"
    ],
    benefits: [
      "Top-tier compensation package",
      "Generous equity grants",
      "Full family health coverage"
    ],
    companyLink: "https://stripe.com",
    applyLink: "https://stripe.com/jobs",
    image: "https://logo.clearbit.com/stripe.com"
  },
  {
    title: "Cloud Consultant (Contract)",
    description: "Assist with migrating server configurations from onsite computers to AWS cloud servers. 6-month contract.",
    company: "Okta",
    location: "Bellevue, WA",
    category: "Cloud Engineer",
    type: "Contract",
    workMode: "Hybrid",
    salary: "$90 - $125 / hr",
    experience: "Senior Level (5+ years)",
    responsibilities: [
      "Audit onsite server loads",
      "Prepare AWS migration script models",
      "Manage database sync transfers"
    ],
    requirements: [
      "Extensive experience with cloud migrations",
      "Strong Terraform skills",
      "AWS Certified SysOps Administrator"
    ],
    benefits: [
      "High hourly payment rate",
      "Option to extend contract",
      "Hardware provided"
    ],
    companyLink: "https://okta.com",
    applyLink: "https://careers.okta.com",
    image: "https://logo.clearbit.com/okta.com"
  }
];

module.exports = jobsData;
