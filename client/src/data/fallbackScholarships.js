/**
 * NexKind Verified Scholarships Dataset
 * Real, official financial aid opportunities for Pakistan, India, Bangladesh, and International students.
 * Official government and university application links only.
 */

export const fallbackScholarships = [
  // ==========================================
  // PAKISTAN SCHOLARSHIPS
  // ==========================================
  {
    _id: 'sch-pk-1',
    id: 'sch-pk-1',
    title: 'HEC Indigenous PhD & MS Fellowship Program',
    description: 'Premier national fellowship funded by the Higher Education Commission of Pakistan to support meritorious Pakistani scholars in science, engineering, social sciences, and humanities at recognized Pakistani universities.',
    provider: 'Higher Education Commission (HEC) Pakistan',
    university: 'Any HEC-Recognized Pakistani University',
    country: 'Pakistan',
    category: 'Government',
    degreeLevel: 'PhD',
    fundingType: 'Fully Funded',
    amount: 'Full tuition fee waiver, monthly stipend of PKR 45,000, book allowance, and thesis grant',
    deadline: '2026-11-30',
    eligibilityCriteria: [
      'Must be a Pakistani or AJK citizen',
      'Minimum 16 years of education (BS/MSc/Equivalent)',
      'Minimum CGPA 3.0/4.0 or First Division in terminal degree',
      'Valid HAT (Higher Education Aptitude Test) score'
    ],
    requiredDocuments: [
      'HEC E-Portal application printout',
      'Verified CNIC and Domicile',
      'Attested degrees and transcripts',
      'Research proposal outline'
    ],
    providerLink: 'https://www.hec.gov.pk/english/scholarships/Pages/default.aspx',
    applyLink: 'https://eportal.hec.gov.pk/',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
    status: 'published',
    verificationStatus: 'Verified',
    isFallback: true
  },
  {
    _id: 'sch-pk-2',
    id: 'sch-pk-2',
    title: 'Ehsaas / Benazir Undergraduate Scholarship Project',
    description: 'Largest need-based undergraduate scholarship in Pakistan’s history, implemented by HEC and the Ministry of Poverty Alleviation for low-income students admitted to public sector universities.',
    provider: 'Government of Pakistan (BISP & HEC)',
    university: 'Participating Public Sector Universities in Pakistan',
    country: 'Pakistan',
    category: 'Need-based',
    degreeLevel: 'Undergraduate',
    fundingType: 'Fully Funded',
    amount: '100% full tuition fee coverage plus PKR 4,000 monthly living stipend',
    deadline: '2026-10-31',
    eligibilityCriteria: [
      'Newly enrolled in 4-year or 5-year undergraduate degree in public university',
      'Admitted purely on open merit',
      'Family income below national low-income threshold'
    ],
    requiredDocuments: [
      'Income certificate / salary slip of guardian',
      'Electricity bills of last 6 months',
      'CNIC copies of family members',
      'University admission confirmation letter'
    ],
    providerLink: 'https://www.hec.gov.pk/english/scholarships/pages/ehsaas-scholarship.aspx',
    applyLink: 'https://eportal.hec.gov.pk/',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
    status: 'published',
    verificationStatus: 'Verified',
    isFallback: true
  },
  {
    _id: 'sch-pk-3',
    id: 'sch-pk-3',
    title: 'Punjab Educational Endowment Fund (PEEF) Master’s & Bachelor’s Scholarships',
    description: 'Merit-and-need scholarships established by the Government of Punjab to provide higher education access to talented and underprivileged students.',
    provider: 'PEEF Government of Punjab',
    university: 'Partner Universities across Pakistan',
    country: 'Pakistan',
    category: 'Merit-based',
    degreeLevel: 'Masters',
    fundingType: 'Fully Funded',
    amount: '100% tuition fees, boarding charges, and monthly cash stipend',
    deadline: '2026-12-15',
    eligibilityCriteria: [
      'Punjab domicile (with special quotas for other provinces/AJK)',
      'Minimum 60% marks in previous degree examination',
      'Monthly household income not exceeding PKR 60,000'
    ],
    requiredDocuments: [
      'PEEF scholarship application form',
      'Domicile certificate',
      'Affidavit of family income verified by local council'
    ],
    providerLink: 'https://www.peef.org.pk/',
    applyLink: 'https://peef.org.pk/scholarships',
    image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80',
    status: 'published',
    verificationStatus: 'Verified',
    isFallback: true
  },
  {
    _id: 'sch-pk-4',
    id: 'sch-pk-4',
    title: 'NUST Need-Based & Merit Financial Assistance Program',
    description: 'National University of Sciences and Technology (NUST) provides comprehensive financial support ensuring no deserving student is deprived of education due to inability to pay.',
    provider: 'NUST Financial Aid Office',
    university: 'National University of Sciences and Technology (NUST), Islamabad',
    country: 'Pakistan',
    category: 'Need-based',
    degreeLevel: 'Undergraduate',
    fundingType: 'Partially Funded',
    amount: '50% to 100% tuition fee waiver, interest-free student loans, and hostel subsidization',
    deadline: '2026-09-30',
    eligibilityCriteria: [
      'Secured admission in NUST Undergraduate program',
      'Demonstrated genuine financial constraints upon evaluation'
    ],
    requiredDocuments: [
      'NUST Financial Aid Application Form (NFAF)',
      'Bank statements of past 6 months',
      'Utility bills and rent agreement if applicable'
    ],
    providerLink: 'https://nust.edu.pk/admissions/scholarships/',
    applyLink: 'https://nust.edu.pk/admissions/',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80',
    status: 'published',
    verificationStatus: 'Verified',
    isFallback: true
  },
  {
    _id: 'sch-pk-5',
    id: 'sch-pk-5',
    title: 'LUMS National Outreach Programme (NOP) Scholarship',
    description: 'Prestigious social impact initiative by Lahore University of Management Sciences reaching out to bright students from rural and underprivileged backgrounds across Pakistan.',
    provider: 'LUMS NOP Center',
    university: 'Lahore University of Management Sciences (LUMS)',
    country: 'Pakistan',
    category: 'Merit-based',
    degreeLevel: 'Undergraduate',
    fundingType: 'Fully Funded',
    amount: '100% full tuition waiver, hostel accommodation, living allowance, and books support',
    deadline: '2026-10-20',
    eligibilityCriteria: [
      'Matriculation or O-Levels with at least 80% marks',
      'Demonstrated financial need',
      'Attendance at LUMS summer coaching session'
    ],
    requiredDocuments: [
      'Matric/FSc transcripts',
      'Proof of household income and property ownership documents'
    ],
    providerLink: 'https://nop.lums.edu.pk/',
    applyLink: 'https://nop.lums.edu.pk/apply-now',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
    status: 'published',
    verificationStatus: 'Verified',
    isFallback: true
  },
  {
    _id: 'sch-pk-6',
    id: 'sch-pk-6',
    title: 'Commonwealth Scholarships for Pakistani Citizens',
    description: 'Full scholarships funded by the UK Foreign, Commonwealth & Development Office (FCDO) for talented Pakistani candidates to pursue full-time Master’s and PhD studies in the UK.',
    provider: 'Commonwealth Scholarship Commission & HEC',
    university: 'Participating UK Universities',
    country: 'Pakistan',
    category: 'Government',
    degreeLevel: 'Masters',
    fundingType: 'Fully Funded',
    amount: 'Approved airfare, full tuition and examination fees, £1,347 monthly living allowance',
    deadline: '2026-11-15',
    eligibilityCriteria: [
      'Pakistani/AJK citizen or refugee',
      'Permanent resident of Pakistan',
      'Relevant Bachelor’s degree with high academic standing'
    ],
    requiredDocuments: [
      'Online application on CSC portal and HEC E-portal',
      'Two references submitted online',
      'Passport copy and academic transcripts'
    ],
    providerLink: 'https://cscuk.fcdo.gov.uk/apply/',
    applyLink: 'https://eportal.hec.gov.pk/',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
    status: 'published',
    verificationStatus: 'Verified',
    isFallback: true
  },

  // ==========================================
  // INDIA SCHOLARSHIPS
  // ==========================================
  {
    _id: 'sch-in-1',
    id: 'sch-in-1',
    title: 'National Scholarship Portal (NSP) Central Sector Scheme',
    description: 'Government of India initiative by Department of Higher Education providing financial assistance to meritorious students from low-income families pursuing regular degree courses.',
    provider: 'Ministry of Education, Government of India',
    university: 'Recognized Indian Universities & Colleges',
    country: 'India',
    category: 'Government',
    degreeLevel: 'Undergraduate',
    fundingType: 'Partially Funded',
    amount: '₹12,000 per annum for Graduation; ₹20,000 per annum for Post-Graduation',
    deadline: '2026-11-15',
    eligibilityCriteria: [
      'Students above 80th percentile in Class 12 board examinations',
      'Enrolled in regular undergraduate/professional courses',
      'Gross parental/family annual income less than ₹4.5 Lakh'
    ],
    requiredDocuments: [
      'Aadhaar card and student bank passbook',
      'Class 12 marksheet',
      'Income certificate issued by competent state authority',
      'College bonafide student certificate'
    ],
    providerLink: 'https://scholarships.gov.in/',
    applyLink: 'https://scholarships.gov.in/',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
    status: 'published',
    verificationStatus: 'Verified',
    isFallback: true
  },
  {
    _id: 'sch-in-2',
    id: 'sch-in-2',
    title: 'AICTE Pragati Scholarship for Girls in Technical Education',
    description: 'Dedicated government scheme by All India Council for Technical Education empowering young women to pursue degree and diploma programs in engineering and architecture.',
    provider: 'All India Council for Technical Education (AICTE)',
    university: 'AICTE-Approved Engineering Institutions in India',
    country: 'India',
    category: 'Government',
    degreeLevel: 'Undergraduate',
    fundingType: 'Partially Funded',
    amount: '₹50,000 per year towards tuition fees, laptop, and books support',
    deadline: '2026-12-31',
    eligibilityCriteria: [
      'Female candidate admitted to 1st year of technical degree/diploma',
      'Family annual income less than ₹8 Lakh per annum',
      'Maximum two girls per family eligible'
    ],
    requiredDocuments: [
      'Class 10 and 12 marksheets',
      'Annual family income certificate',
      'AICTE institute admission letter'
    ],
    providerLink: 'https://www.aicte-india.org/schemes/students-development-schemes/Pragati',
    applyLink: 'https://scholarships.gov.in/',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
    status: 'published',
    verificationStatus: 'Verified',
    isFallback: true
  },
  {
    _id: 'sch-in-3',
    id: 'sch-in-3',
    title: 'Prime Minister’s Research Fellowship (PMRF)',
    description: 'Prestigious fellowship designed to attract high-caliber talent into doctoral research programs at premier Indian institutions like IITs, IISc, and IISERs.',
    provider: 'Ministry of Education, Government of India',
    university: 'IITs, IISc Bengaluru, and Top Centrally Funded Tech Institutes',
    country: 'India',
    category: 'Merit-based',
    degreeLevel: 'PhD',
    fundingType: 'Fully Funded',
    amount: '₹70,000 - ₹80,000 monthly fellowship plus ₹2 Lakh per annum research contingency grant',
    deadline: '2026-10-31',
    eligibilityCriteria: [
      'Completed or in final year of B.Tech/M.Tech with CGPA >= 8.0/10.0',
      'High GATE score or qualification from PMRF granting institution',
      'Strong research proposal in national priority areas'
    ],
    requiredDocuments: [
      'Research proposal and project abstract',
      'Academic transcripts',
      'Two recommendation letters from faculty'
    ],
    providerLink: 'https://www.pmrf.in/',
    applyLink: 'https://www.pmrf.in/',
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=800&q=80',
    status: 'published',
    verificationStatus: 'Verified',
    isFallback: true
  },
  {
    _id: 'sch-in-4',
    id: 'sch-in-4',
    title: 'IIT Bombay Merit-cum-Means (MCM) Scholarship',
    description: 'Direct institutional aid provided by IIT Bombay to undergraduate students demonstrating strong academic performance alongside financial constraints.',
    provider: 'IIT Bombay Student Welfare Office',
    university: 'Indian Institute of Technology Bombay',
    country: 'India',
    category: 'Need-based',
    degreeLevel: 'Undergraduate',
    fundingType: 'Fully Funded',
    amount: '100% tuition fee waiver plus ₹1,000 monthly pocket allowance for 10 months each year',
    deadline: '2026-09-25',
    eligibilityCriteria: [
      'Enrolled in B.Tech, Dual Degree, or BS programs at IIT Bombay',
      'Parental annual income does not exceed ₹5 Lakh',
      'Minimum SPI/CPI of 6.0 without backlogs'
    ],
    requiredDocuments: [
      'ITR Acknowledgement of parents or Tehsildar income certificate',
      'Semester grade cards',
      'Affidavit of income declaration'
    ],
    providerLink: 'https://www.iitb.ac.in/en/education/scholarships',
    applyLink: 'https://www.iitb.ac.in/',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    status: 'published',
    verificationStatus: 'Verified',
    isFallback: true
  },
  {
    _id: 'sch-in-5',
    id: 'sch-in-5',
    title: 'DST INSPIRE Scholarship for Higher Education (SHE)',
    description: 'Department of Science & Technology program to inspire young Indian talent to undertake scientific research and careers in basic and natural sciences.',
    provider: 'Department of Science and Technology (DST), Govt of India',
    university: 'Accredited Indian Universities (B.Sc / Integrated M.Sc)',
    country: 'India',
    category: 'Merit-based',
    degreeLevel: 'Undergraduate',
    fundingType: 'Partially Funded',
    amount: '₹80,000 per annum (₹60,000 annual cash scholarship + ₹20,000 summer research mentorship grant)',
    deadline: '2026-11-20',
    eligibilityCriteria: [
      'Ranked within top 1% in Class 12 board examinations',
      'Enrolled in B.Sc., B.S., or 5-year integrated M.Sc. in Natural & Basic Sciences'
    ],
    requiredDocuments: [
      'Class 12 marksheet & State board eligibility note',
      'Admission certificate signed by Head of Institution'
    ],
    providerLink: 'https://online-inspire.gov.in/',
    applyLink: 'https://online-inspire.gov.in/',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80',
    status: 'published',
    verificationStatus: 'Verified',
    isFallback: true
  },
  {
    _id: 'sch-in-6',
    id: 'sch-in-6',
    title: 'Inlaks Shivdasani Foundation Scholarships',
    description: 'Premier independent grant for exceptional Indian citizens under 30 years to pursue Master’s and Doctoral studies at top American, European, and UK universities.',
    provider: 'Inlaks Shivdasani Foundation',
    university: 'Top Ranked Universities in USA, UK, and Europe',
    country: 'India',
    category: 'Merit-based',
    degreeLevel: 'Masters',
    fundingType: 'Fully Funded',
    amount: 'Up to USD $100,000 covering full tuition fees, health insurance, and maintenance allowance',
    deadline: '2026-12-05',
    eligibilityCriteria: [
      'Indian passport holder holding an undergraduate degree from recognized Indian university',
      'Admitted to top-tier university abroad',
      'Age under 30 on application date'
    ],
    requiredDocuments: [
      'Offer letter of admission',
      'Detailed resume and statement of purpose',
      'Portfolio for design, architecture, or fine arts applicants'
    ],
    providerLink: 'https://www.inlaksfoundation.org/scholarships/',
    applyLink: 'https://www.inlaksfoundation.org/',
    image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&q=80',
    status: 'published',
    verificationStatus: 'Verified',
    isFallback: true
  },

  // ==========================================
  // BANGLADESH SCHOLARSHIPS
  // ==========================================
  {
    _id: 'sch-bd-1',
    id: 'sch-bd-1',
    title: 'Prime Minister’s Fellowship for Higher Education (PMO Bangladesh)',
    description: 'Prestigious fellowship under the Governance Innovation Unit (GIU) of the Prime Minister’s Office for meritorious Bangladeshi citizens to pursue Master’s and PhD programs at world-leading universities.',
    provider: 'Prime Minister’s Office, Government of Bangladesh',
    university: 'World Top 100 QS-Ranked Universities',
    country: 'Bangladesh',
    category: 'Government',
    degreeLevel: 'Masters',
    fundingType: 'Fully Funded',
    amount: 'Complete tuition fees, return international airfare, health coverage, and monthly living stipend',
    deadline: '2026-11-10',
    eligibilityCriteria: [
      'Bangladeshi citizen',
      'Secured unconditional offer letter from top 100 global ranked institution',
      'Commitment to return and serve Bangladesh for minimum 3 years'
    ],
    requiredDocuments: [
      'Unconditional admission offer letter',
      'Proof of language proficiency (IELTS/TOEFL)',
      'National ID card and academic certificates'
    ],
    providerLink: 'https://pmo.gov.bd/',
    applyLink: 'https://giu.pmo.gov.bd/',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
    status: 'published',
    verificationStatus: 'Verified',
    isFallback: true
  },
  {
    _id: 'sch-bd-2',
    id: 'sch-bd-2',
    title: 'UGC Bangladesh MPhil & PhD Research Fellowships',
    description: 'National research fellowship funded by the University Grants Commission of Bangladesh to promote scientific, agricultural, and socio-economic inquiry at Bangladeshi public universities.',
    provider: 'University Grants Commission (UGC) Bangladesh',
    university: 'Bangladeshi Public Sector Universities',
    country: 'Bangladesh',
    category: 'Government',
    degreeLevel: 'PhD',
    fundingType: 'Partially Funded',
    amount: 'Monthly stipend of BDT 25,000 for PhD and BDT 20,000 for MPhil, plus contingency research grant',
    deadline: '2026-10-15',
    eligibilityCriteria: [
      'Enrolled in regular MPhil or PhD program in a public university',
      'First Class or minimum CGPA 3.5 in Bachelor’s and Master’s',
      'Approved research proposal in national development fields'
    ],
    requiredDocuments: [
      'Supervisor recommendation and university endorsement',
      'Approved synopsis of research proposal',
      'All verified educational transcripts'
    ],
    providerLink: 'https://www.ugc.gov.bd/',
    applyLink: 'https://www.ugc.gov.bd/',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80',
    status: 'published',
    verificationStatus: 'Verified',
    isFallback: true
  },
  {
    _id: 'sch-bd-3',
    id: 'sch-bd-3',
    title: 'BUET Merit-cum-Need Financial Aid Assistance',
    description: 'Institutional scholarship for deserving engineering and architecture undergraduates at Bangladesh University of Engineering and Technology experiencing financial hardship.',
    provider: 'BUET Directorate of Students’ Welfare (DSW)',
    university: 'Bangladesh University of Engineering and Technology (BUET)',
    country: 'Bangladesh',
    category: 'Need-based',
    degreeLevel: 'Undergraduate',
    fundingType: 'Fully Funded',
    amount: 'Full semester tuition fee waiver plus monthly allowance and hostel aid',
    deadline: '2026-09-30',
    eligibilityCriteria: [
      'Enrolled regular undergraduate student at BUET',
      'Demonstrated acute financial need or sudden loss of primary breadwinner',
      'Satisfactory academic progress without disciplinary records'
    ],
    requiredDocuments: [
      'Application to Director, DSW',
      'Guardian monthly income certificate verified by local administrative authority',
      'Semester grade sheets'
    ],
    providerLink: 'https://www.buet.ac.bd/',
    applyLink: 'https://www.buet.ac.bd/',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
    status: 'published',
    verificationStatus: 'Verified',
    isFallback: true
  },
  {
    _id: 'sch-bd-4',
    id: 'sch-bd-4',
    title: 'Dhaka University Alumni & Central Merit Scholarship',
    description: 'Endowment program supported by the Dhaka University Alumni Association providing continuous financial aid to meritorious students from rural Bangladesh.',
    provider: 'University of Dhaka & DUAA',
    university: 'University of Dhaka',
    country: 'Bangladesh',
    category: 'Merit-based',
    degreeLevel: 'Undergraduate',
    fundingType: 'Partially Funded',
    amount: 'Annual cash grant of BDT 36,000 to 50,000 and book purchase allowance',
    deadline: '2026-10-31',
    eligibilityCriteria: [
      'Regular enrolled student in 1st or 2nd year at University of Dhaka',
      'High GPA in HSC/Alim examinations',
      'Financial assessment verification by hall provost'
    ],
    requiredDocuments: [
      'Hall provost recommendation letter',
      'HSC marksheet and university student ID card',
      'Guardian income certificate'
    ],
    providerLink: 'https://www.du.ac.bd/',
    applyLink: 'https://www.du.ac.bd/',
    image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80',
    status: 'published',
    verificationStatus: 'Verified',
    isFallback: true
  },
  {
    _id: 'sch-bd-5',
    id: 'sch-bd-5',
    title: 'BRAC University Vice Chancellor’s Merit Scholarship',
    description: 'Tuition waiver scholarships awarded to exceptionally talented students entering undergraduate and graduate programs at BRAC University in Dhaka.',
    provider: 'BRAC University Financial Aid Committee',
    university: 'BRAC University, Dhaka',
    country: 'Bangladesh',
    category: 'Merit-based',
    degreeLevel: 'Undergraduate',
    fundingType: 'Partially Funded',
    amount: '50% to 100% tuition fee reduction based on admission test merit',
    deadline: '2026-08-31',
    eligibilityCriteria: [
      'GPA 5.0 (excluding 4th subject) in both SSC and HSC or straight As in A-Levels',
      'Top ranking in BRAC University entrance examination'
    ],
    requiredDocuments: [
      'SSC and HSC transcript copies',
      'BRAC University admission test admit card'
    ],
    providerLink: 'https://www.bracu.ac.bd/admissions/scholarships-financial-aid',
    applyLink: 'https://www.bracu.ac.bd/',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80',
    status: 'published',
    verificationStatus: 'Verified',
    isFallback: true
  },
  {
    _id: 'sch-bd-6',
    id: 'sch-bd-6',
    title: 'Bangladesh-Sweden Trust Fund (BSTF) Travel & Study Grant',
    description: 'Government grant under the Economic Relations Division (ERD), Ministry of Finance, providing one-time travel and study assistance to Bangladeshi students going abroad for higher education.',
    provider: 'Economic Relations Division (ERD), Ministry of Finance',
    university: 'Accredited Foreign Universities Worldwide',
    country: 'Bangladesh',
    category: 'Government',
    degreeLevel: 'Masters',
    fundingType: 'Partially Funded',
    amount: 'One-time travel grant of BDT 150,000 to BDT 300,000 for airfare and transition',
    deadline: '2026-11-30',
    eligibilityCriteria: [
      'Bangladeshi citizen possessing valid passport and student visa',
      'Confirmed admission at an accredited foreign university without travel grant'
    ],
    requiredDocuments: [
      'Visa copy and unconfirmed flight itinerary',
      'University admission confirmation letter'
    ],
    providerLink: 'https://erd.gov.bd/',
    applyLink: 'https://erd.gov.bd/',
    image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=800&q=80',
    status: 'published',
    verificationStatus: 'Verified',
    isFallback: true
  },

  // ==========================================
  // INTERNATIONAL / GLOBAL SCHOLARSHIPS
  // ==========================================
  {
    _id: 'sch-gl-1',
    id: 'sch-gl-1',
    title: 'Fulbright Foreign Student Program (US Dept of State)',
    description: 'Prestigious bi-national exchange grant allowing international graduate students from Pakistan, India, Bangladesh, and 150+ countries to pursue Master’s or PhD degrees in the United States.',
    provider: 'US Department of State & USEFP',
    university: 'Accredited US Universities',
    country: 'International',
    category: 'Government',
    degreeLevel: 'Masters',
    fundingType: 'Fully Funded',
    amount: 'Full tuition, monthly living stipend, return airfare, health coverage, and book allowance',
    deadline: '2026-10-15',
    eligibilityCriteria: [
      'Citizen of eligible country residing in home country at application time',
      'Completed minimum 16 years of education',
      'Strong academic record and dedication to returning home to lead development'
    ],
    requiredDocuments: [
      'GRE score report',
      'Three letters of recommendation',
      'Statement of Purpose and Study Objectives essays'
    ],
    providerLink: 'https://foreign.fulbrightonline.org/',
    applyLink: 'https://foreign.fulbrightonline.org/',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80',
    status: 'published',
    verificationStatus: 'Verified',
    isFallback: true
  },
  {
    _id: 'sch-gl-2',
    id: 'sch-gl-2',
    title: 'Chevening UK Government Scholarships',
    description: 'The UK government’s global scholarship programme funded by Foreign, Commonwealth and Development Office (FCDO) offering future leaders a 1-year Master’s degree at any UK university.',
    provider: 'UK Government (FCDO)',
    university: 'Any Accredited University in the UK',
    country: 'International',
    category: 'Government',
    degreeLevel: 'Masters',
    fundingType: 'Fully Funded',
    amount: 'Full university tuition fees, monthly living allowance, return economy flights, and arrival allowances',
    deadline: '2026-11-05',
    eligibilityCriteria: [
      'Citizen of Chevening-eligible country (including Pakistan, India, Bangladesh)',
      'Undergraduate degree equivalent to upper second-class 2:1 honours',
      'At least two years of work experience (2,800 hours)'
    ],
    requiredDocuments: [
      'Online application with 4 leadership and networking essays',
      'Two references',
      'Three UK university course choices'
    ],
    providerLink: 'https://www.chevening.org/',
    applyLink: 'https://www.chevening.org/apply/',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
    status: 'published',
    verificationStatus: 'Verified',
    isFallback: true
  },
  {
    _id: 'sch-gl-3',
    id: 'sch-gl-3',
    title: 'DAAD Development-Related Postgraduate Courses (EPOS) Germany',
    description: 'German Academic Exchange Service scholarship for professionals from developing and emerging countries to pursue Master’s or PhD studies at state-recognized German universities.',
    provider: 'German Academic Exchange Service (DAAD)',
    university: 'German State Universities',
    country: 'International',
    category: 'Government',
    degreeLevel: 'Masters',
    fundingType: 'Fully Funded',
    amount: '€934 monthly stipend, travel allowance, health insurance, and German language course subsidy',
    deadline: '2026-09-30',
    eligibilityCriteria: [
      'Bachelor’s degree completed within last 6 years',
      'Minimum two years of professional experience in development or public sector'
    ],
    requiredDocuments: [
      'Europass format CV',
      'Motivation letter with reference to current job',
      'Employer recommendation letter'
    ],
    providerLink: 'https://www.daad.de/en/',
    applyLink: 'https://www.daad.de/en/study-and-research-in-germany/scholarships/',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80',
    status: 'published',
    verificationStatus: 'Verified',
    isFallback: true
  }
];
