const scholarshipsData = [
  // --- PAKISTAN ---
  {
    title: "HEC Indigenous PhD & MS Fellowship Program",
    description: "Premier national fellowship funded by the Higher Education Commission of Pakistan to support meritorious Pakistani scholars in science, engineering, social sciences, and humanities at recognized Pakistani universities.",
    provider: "Higher Education Commission (HEC) Pakistan",
    university: "Any HEC-Recognized Pakistani University",
    country: "Pakistan",
    category: "Government",
    degreeLevel: "PhD",
    fundingType: "Fully Funded",
    amount: "Full tuition fee waiver, monthly stipend of PKR 45,000, book allowance, and thesis grant",
    deadline: "2026-11-30",
    eligibilityCriteria: [
      "Must be a Pakistani or AJK citizen",
      "Minimum 16 years of education (BS/MSc/Equivalent)",
      "Minimum CGPA 3.0/4.0 or First Division in terminal degree",
      "Valid HAT (Higher Education Aptitude Test) score"
    ],
    requiredDocuments: [
      "HEC E-Portal application printout",
      "Verified CNIC and Domicile",
      "Attested degrees and transcripts",
      "Research proposal outline"
    ],
    providerLink: "https://www.hec.gov.pk/english/scholarships/Pages/default.aspx",
    applyLink: "https://eportal.hec.gov.pk/",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80"
  },
  {
    title: "Ehsaas / Benazir Undergraduate Scholarship Project",
    description: "Largest need-based undergraduate scholarship in Pakistan’s history, implemented by HEC and the Ministry of Poverty Alleviation for low-income students admitted to public sector universities.",
    provider: "Government of Pakistan (BISP & HEC)",
    university: "Participating Public Sector Universities in Pakistan",
    country: "Pakistan",
    category: "Need-based",
    degreeLevel: "Undergraduate",
    fundingType: "Fully Funded",
    amount: "100% full tuition fee coverage plus PKR 4,000 monthly living stipend",
    deadline: "2026-10-31",
    eligibilityCriteria: [
      "Newly enrolled in 4-year or 5-year undergraduate degree in public university",
      "Admitted purely on open merit",
      "Family income below national low-income threshold"
    ],
    requiredDocuments: [
      "Income certificate / salary slip of guardian",
      "Electricity bills of last 6 months",
      "CNIC copies of family members",
      "University admission confirmation letter"
    ],
    providerLink: "https://www.hec.gov.pk/english/scholarships/pages/ehsaas-scholarship.aspx",
    applyLink: "https://eportal.hec.gov.pk/",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80"
  },
  {
    title: "Punjab Educational Endowment Fund (PEEF) Master’s & Bachelor’s Scholarships",
    description: "Merit-and-need scholarships established by the Government of Punjab to provide higher education access to talented and underprivileged students.",
    provider: "PEEF Government of Punjab",
    university: "Partner Universities across Pakistan",
    country: "Pakistan",
    category: "Merit-based",
    degreeLevel: "Masters",
    fundingType: "Fully Funded",
    amount: "100% tuition fees, boarding charges, and monthly cash stipend",
    deadline: "2026-12-15",
    eligibilityCriteria: [
      "Punjab domicile (with special quotas for other provinces/AJK)",
      "Minimum 60% marks in previous degree examination",
      "Monthly household income not exceeding PKR 60,000"
    ],
    requiredDocuments: [
      "PEEF scholarship application form",
      "Domicile certificate",
      "Affidavit of family income verified by local council"
    ],
    providerLink: "https://www.peef.org.pk/",
    applyLink: "https://peef.org.pk/scholarships",
    image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80"
  },
  {
    title: "NUST Need-Based & Merit Financial Assistance Program",
    description: "National University of Sciences and Technology (NUST) provides comprehensive financial support ensuring no deserving student is deprived of education due to inability to pay.",
    provider: "NUST Financial Aid Office",
    university: "National University of Sciences and Technology (NUST), Islamabad",
    country: "Pakistan",
    category: "Need-based",
    degreeLevel: "Undergraduate",
    fundingType: "Partially Funded",
    amount: "50% to 100% tuition fee waiver, interest-free student loans, and hostel subsidization",
    deadline: "2026-09-30",
    eligibilityCriteria: [
      "Secured admission in NUST Undergraduate program",
      "Demonstrated genuine financial constraints upon evaluation"
    ],
    requiredDocuments: [
      "NUST Financial Aid Application Form (NFAF)",
      "Bank statements of past 6 months",
      "Utility bills and rent agreement if applicable"
    ],
    providerLink: "https://nust.edu.pk/admissions/scholarships/",
    applyLink: "https://nust.edu.pk/admissions/",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80"
  },
  {
    title: "LUMS National Outreach Programme (NOP) Scholarship",
    description: "Prestigious social impact initiative by Lahore University of Management Sciences reaching out to bright students from rural and underprivileged backgrounds across Pakistan.",
    provider: "LUMS NOP Center",
    university: "Lahore University of Management Sciences (LUMS)",
    country: "Pakistan",
    category: "Merit-based",
    degreeLevel: "Undergraduate",
    fundingType: "Fully Funded",
    amount: "100% full tuition waiver, hostel accommodation, living allowance, and books support",
    deadline: "2026-10-20",
    eligibilityCriteria: [
      "Matriculation or O-Levels with at least 80% marks",
      "Demonstrated financial need",
      "Attendance at LUMS summer coaching session"
    ],
    requiredDocuments: [
      "Matric/FSc transcripts",
      "Proof of household income and property ownership documents"
    ],
    providerLink: "https://nop.lums.edu.pk/",
    applyLink: "https://nop.lums.edu.pk/apply-now",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"
  },
  {
    title: "Commonwealth Scholarships for Pakistani Citizens",
    description: "Full scholarships funded by the UK Foreign, Commonwealth & Development Office (FCDO) for talented Pakistani candidates to pursue full-time Master’s and PhD studies in the UK.",
    provider: "Commonwealth Scholarship Commission & HEC",
    university: "Participating UK Universities",
    country: "Pakistan",
    category: "Government",
    degreeLevel: "Masters",
    fundingType: "Fully Funded",
    amount: "Approved airfare, full tuition and examination fees, £1,347 monthly living allowance",
    deadline: "2026-11-15",
    eligibilityCriteria: [
      "Pakistani/AJK citizen or refugee",
      "Permanent resident of Pakistan",
      "Relevant Bachelor’s degree with high academic standing"
    ],
    requiredDocuments: [
      "Online application on CSC portal and HEC E-portal",
      "Two references submitted online",
      "Passport copy and academic transcripts"
    ],
    providerLink: "https://cscuk.fcdo.gov.uk/apply/",
    applyLink: "https://eportal.hec.gov.pk/",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80"
  },

  // --- INDIA ---
  {
    title: "National Scholarship Portal (NSP) Central Sector Scheme",
    description: "Government of India initiative by Department of Higher Education providing financial assistance to meritorious students from low-income families pursuing regular degree courses.",
    provider: "Ministry of Education, Government of India",
    university: "Recognized Indian Universities & Colleges",
    country: "India",
    category: "Government",
    degreeLevel: "Undergraduate",
    fundingType: "Partially Funded",
    amount: "₹12,000 per annum for Graduation; ₹20,000 per annum for Post-Graduation",
    deadline: "2026-11-15",
    eligibilityCriteria: [
      "Students above 80th percentile in Class 12 board examinations",
      "Enrolled in regular undergraduate/professional courses",
      "Gross parental/family annual income less than ₹4.5 Lakh"
    ],
    requiredDocuments: [
      "Aadhaar card and student bank passbook",
      "Class 12 marksheet",
      "Income certificate issued by competent state authority",
      "College bonafide student certificate"
    ],
    providerLink: "https://scholarships.gov.in/",
    applyLink: "https://scholarships.gov.in/",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80"
  },
  {
    title: "AICTE Pragati Scholarship for Girls in Technical Education",
    description: "Dedicated government scheme by All India Council for Technical Education empowering young women to pursue degree and diploma programs in engineering and architecture.",
    provider: "All India Council for Technical Education (AICTE)",
    university: "AICTE-Approved Engineering Institutions in India",
    country: "India",
    category: "Government",
    degreeLevel: "Undergraduate",
    fundingType: "Partially Funded",
    amount: "₹50,000 per year towards tuition fees, laptop, and books support",
    deadline: "2026-12-31",
    eligibilityCriteria: [
      "Female candidate admitted to 1st year of technical degree/diploma",
      "Family annual income less than ₹8 Lakh per annum",
      "Maximum two girls per family eligible"
    ],
    requiredDocuments: [
      "Class 10 and 12 marksheets",
      "Annual family income certificate",
      "AICTE institute admission letter"
    ],
    providerLink: "https://www.aicte-india.org/schemes/students-development-schemes/Pragati",
    applyLink: "https://scholarships.gov.in/",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80"
  },
  {
    title: "Prime Minister’s Research Fellowship (PMRF)",
    description: "Prestigious fellowship designed to attract high-caliber talent into doctoral research programs at premier Indian institutions like IITs, IISc, and IISERs.",
    provider: "Ministry of Education, Government of India",
    university: "IITs, IISc Bengaluru, and Top Centrally Funded Tech Institutes",
    country: "India",
    category: "Merit-based",
    degreeLevel: "PhD",
    fundingType: "Fully Funded",
    amount: "₹70,000 - ₹80,000 monthly fellowship plus ₹2 Lakh per annum research contingency grant",
    deadline: "2026-10-31",
    eligibilityCriteria: [
      "Completed or in final year of B.Tech/M.Tech with CGPA >= 8.0/10.0",
      "High GATE score or qualification from PMRF granting institution",
      "Strong research proposal in national priority areas"
    ],
    requiredDocuments: [
      "Research proposal and project abstract",
      "Academic transcripts",
      "Two recommendation letters from faculty"
    ],
    providerLink: "https://www.pmrf.in/",
    applyLink: "https://www.pmrf.in/",
    image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=800&q=80"
  },
  {
    title: "IIT Bombay Merit-cum-Means (MCM) Scholarship",
    description: "Direct institutional aid provided by IIT Bombay to undergraduate students demonstrating strong academic performance alongside financial constraints.",
    provider: "IIT Bombay Student Welfare Office",
    university: "Indian Institute of Technology Bombay",
    country: "India",
    category: "Need-based",
    degreeLevel: "Undergraduate",
    fundingType: "Fully Funded",
    amount: "100% tuition fee waiver plus ₹1,000 monthly pocket allowance for 10 months each year",
    deadline: "2026-09-25",
    eligibilityCriteria: [
      "Enrolled in B.Tech, Dual Degree, or BS programs at IIT Bombay",
      "Parental annual income does not exceed ₹5 Lakh",
      "Minimum SPI/CPI of 6.0 without backlogs"
    ],
    requiredDocuments: [
      "ITR Acknowledgement of parents or Tehsildar income certificate",
      "Semester grade cards",
      "Affidavit of income declaration"
    ],
    providerLink: "https://www.iitb.ac.in/en/education/scholarships",
    applyLink: "https://www.iitb.ac.in/",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80"
  },
  {
    title: "DST INSPIRE Scholarship for Higher Education (SHE)",
    description: "Department of Science & Technology program to inspire young Indian talent to undertake scientific research and careers in basic and natural sciences.",
    provider: "Department of Science and Technology (DST), Govt of India",
    university: "Accredited Indian Universities (B.Sc / Integrated M.Sc)",
    country: "India",
    category: "Merit-based",
    degreeLevel: "Undergraduate",
    fundingType: "Partially Funded",
    amount: "₹80,000 per annum (₹60,000 annual cash scholarship + ₹20,000 summer research mentorship grant)",
    deadline: "2026-11-20",
    eligibilityCriteria: [
      "Ranked within top 1% in Class 12 board examinations",
      "Enrolled in B.Sc., B.S., or 5-year integrated M.Sc. in Natural & Basic Sciences"
    ],
    requiredDocuments: [
      "Class 12 marksheet & State board eligibility note",
      "Admission certificate signed by Head of Institution"
    ],
    providerLink: "https://online-inspire.gov.in/",
    applyLink: "https://online-inspire.gov.in/",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80"
  },
  {
    title: "Inlaks Shivdasani Foundation Scholarships",
    description: "Premier independent grant for exceptional Indian citizens under 30 years to pursue Master’s and Doctoral studies at top American, European, and UK universities.",
    provider: "Inlaks Shivdasani Foundation",
    university: "Top Ranked Universities in USA, UK, and Europe",
    country: "India",
    category: "Merit-based",
    degreeLevel: "Masters",
    fundingType: "Fully Funded",
    amount: "Up to USD $100,000 covering full tuition fees, health insurance, and maintenance allowance",
    deadline: "2026-12-05",
    eligibilityCriteria: [
      "Indian passport holder holding an undergraduate degree from recognized Indian university",
      "Admitted to top-tier university abroad",
      "Age under 30 on application date"
    ],
    requiredDocuments: [
      "Offer letter of admission",
      "Detailed resume and statement of purpose",
      "Portfolio for design, architecture, or fine arts applicants"
    ],
    providerLink: "https://www.inlaksfoundation.org/scholarships/",
    applyLink: "https://www.inlaksfoundation.org/",
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800&q=80"
  },

  // --- BANGLADESH ---
  {
    title: "Prime Minister’s Fellowship for Higher Education (PMO Bangladesh)",
    description: "Prestigious fellowship under the Governance Innovation Unit (GIU) of the Prime Minister’s Office for meritorious Bangladeshi citizens to pursue Master’s and PhD programs at world-leading universities.",
    provider: "Prime Minister’s Office, Government of Bangladesh",
    university: "World Top 100 QS-Ranked Universities",
    country: "Bangladesh",
    category: "Government",
    degreeLevel: "Masters",
    fundingType: "Fully Funded",
    amount: "Complete tuition fees, return international airfare, health coverage, and monthly living stipend",
    deadline: "2026-11-10",
    eligibilityCriteria: [
      "Bangladeshi citizen",
      "Secured unconditional offer letter from top 100 global ranked institution",
      "Commitment to return and serve Bangladesh for minimum 3 years"
    ],
    requiredDocuments: [
      "Unconditional admission offer letter",
      "Proof of language proficiency (IELTS/TOEFL)",
      "National ID card and academic certificates"
    ],
    providerLink: "https://pmo.gov.bd/",
    applyLink: "https://giu.pmo.gov.bd/",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80"
  },
  {
    title: "UGC Bangladesh MPhil & PhD Research Fellowships",
    description: "National research fellowship funded by the University Grants Commission of Bangladesh to promote scientific, agricultural, and socio-economic inquiry at Bangladeshi public universities.",
    provider: "University Grants Commission (UGC) Bangladesh",
    university: "Bangladeshi Public Sector Universities",
    country: "Bangladesh",
    category: "Government",
    degreeLevel: "PhD",
    fundingType: "Partially Funded",
    amount: "Monthly stipend of BDT 25,000 for PhD and BDT 20,000 for MPhil, plus contingency research grant",
    deadline: "2026-10-15",
    eligibilityCriteria: [
      "Enrolled in regular MPhil or PhD program in a public university",
      "First Class or minimum CGPA 3.5 in Bachelor’s and Master’s",
      "Approved research proposal in national development fields"
    ],
    requiredDocuments: [
      "Supervisor recommendation and university endorsement",
      "Approved synopsis of research proposal",
      "All verified educational transcripts"
    ],
    providerLink: "https://www.ugc.gov.bd/",
    applyLink: "https://www.ugc.gov.bd/",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80"
  },
  {
    title: "BUET Merit-cum-Need Financial Aid Assistance",
    description: "Institutional scholarship for deserving engineering and architecture undergraduates at Bangladesh University of Engineering and Technology experiencing financial hardship.",
    provider: "BUET Directorate of Students’ Welfare (DSW)",
    university: "Bangladesh University of Engineering and Technology (BUET)",
    country: "Bangladesh",
    category: "Need-based",
    degreeLevel: "Undergraduate",
    fundingType: "Fully Funded",
    amount: "Full semester tuition fee waiver plus monthly allowance and hostel aid",
    deadline: "2026-09-30",
    eligibilityCriteria: [
      "Enrolled regular undergraduate student at BUET",
      "Demonstrated acute financial need or sudden loss of primary breadwinner",
      "Satisfactory academic progress without disciplinary records"
    ],
    requiredDocuments: [
      "Application to Director, DSW",
      "Guardian monthly income certificate verified by local administrative authority",
      "Semester grade sheets"
    ],
    providerLink: "https://www.buet.ac.bd/",
    applyLink: "https://www.buet.ac.bd/",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80"
  },
  {
    title: "Dhaka University Alumni & Central Merit Scholarship",
    description: "Endowment program supported by the Dhaka University Alumni Association providing continuous financial aid to meritorious students from rural Bangladesh.",
    provider: "University of Dhaka & DUAA",
    university: "University of Dhaka",
    country: "Bangladesh",
    category: "Merit-based",
    degreeLevel: "Undergraduate",
    fundingType: "Partially Funded",
    amount: "Annual cash grant of BDT 36,000 to 50,000 and book purchase allowance",
    deadline: "2026-10-31",
    eligibilityCriteria: [
      "Regular enrolled student in 1st or 2nd year at University of Dhaka",
      "High GPA in HSC/Alim examinations",
      "Financial assessment verification by hall provost"
    ],
    requiredDocuments: [
      "Hall provost recommendation letter",
      "HSC marksheet and university student ID card",
      "Guardian income certificate"
    ],
    providerLink: "https://www.du.ac.bd/",
    applyLink: "https://www.du.ac.bd/",
    image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80"
  },
  {
    title: "BRAC University Vice Chancellor’s Merit Scholarship",
    description: "Tuition waiver scholarships awarded to exceptionally talented students entering undergraduate and graduate programs at BRAC University in Dhaka.",
    provider: "BRAC University Financial Aid Committee",
    university: "BRAC University, Dhaka",
    country: "Bangladesh",
    category: "Merit-based",
    degreeLevel: "Undergraduate",
    fundingType: "Partially Funded",
    amount: "50% to 100% tuition fee reduction based on admission test merit",
    deadline: "2026-08-31",
    eligibilityCriteria: [
      "GPA 5.0 (excluding 4th subject) in both SSC and HSC or straight As in A-Levels",
      "Top ranking in BRAC University entrance examination"
    ],
    requiredDocuments: [
      "SSC and HSC transcript copies",
      "BRAC University admission test admit card"
    ],
    providerLink: "https://www.bracu.ac.bd/admissions/scholarships-financial-aid",
    applyLink: "https://www.bracu.ac.bd/",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80"
  },
  {
    title: "Bangladesh-Sweden Trust Fund (BSTF) Travel & Study Grant",
    description: "Government grant under the Economic Relations Division (ERD), Ministry of Finance, providing one-time travel and study assistance to Bangladeshi students going abroad for higher education.",
    provider: "Economic Relations Division (ERD), Ministry of Finance",
    university: "Accredited Foreign Universities Worldwide",
    country: "Bangladesh",
    category: "Government",
    degreeLevel: "Masters",
    fundingType: "Partially Funded",
    amount: "One-time travel grant of BDT 150,000 to BDT 300,000 for airfare and transition",
    deadline: "2026-11-30",
    eligibilityCriteria: [
      "Bangladeshi citizen possessing valid passport and student visa",
      "Confirmed admission at an accredited foreign university without travel grant"
    ],
    requiredDocuments: [
      "Visa copy and unconfirmed flight itinerary",
      "University admission confirmation letter"
    ],
    providerLink: "https://erd.gov.bd/",
    applyLink: "https://erd.gov.bd/",
    image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=800&q=80"
  },

  // --- USA (5) ---
  {
    title: "Fulbright Foreign Student Program",
    description: "The Fulbright Program enables graduate students, young professionals, and artists from abroad to study and conduct research in the United States.",
    provider: "US Department of State",
    country: "USA",
    university: "Any accredited US University",
    category: "Government",
    degreeLevel: "Masters",
    fundingType: "Fully Funded",
    amount: "Full tuition, living stipend, airfare, and health insurance",
    deadline: "2026-10-15",
    eligibilityCriteria: [
      "Must be an international student from eligible country",
      "Completed undergraduate degree or equivalent",
      "Strong academic record and leadership potential"
    ],
    requiredDocuments: [
      "Academic transcripts",
      "Letters of recommendation",
      "Personal statement",
      "TOEFL or IELTS scores"
    ],
    providerLink: "https://foreign.fulbrightonline.org/",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Hubert H. Humphrey Fellowship",
    description: "Provides ten months of non-degree academic study and related professional experiences in the United States for experienced professionals.",
    provider: "US Department of State",
    country: "USA",
    university: "Host Institutions in the US",
    category: "Government",
    degreeLevel: "Any",
    fundingType: "Fully Funded",
    amount: "Full tuition, monthly allowance, travel, and professional development grant",
    deadline: "2026-11-01",
    eligibilityCriteria: [
      "Undergraduate degree",
      "Five years of substantial professional experience",
      "Demonstrated leadership qualities"
    ],
    requiredDocuments: [
      "Professional references",
      "Proof of employment",
      "English proficiency proof",
      "Personal goals essay"
    ],
    providerLink: "https://www.humphreyprogram.org/",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Harvard Academy Scholars Program",
    description: "The Academy Scholars Program identifies and supports outstanding scholars at the start of their careers whose work combines disciplinary excellence in the social sciences or law.",
    provider: "Harvard University",
    country: "USA",
    university: "Harvard University",
    category: "Merit-based",
    degreeLevel: "PhD",
    fundingType: "Fully Funded",
    amount: "$75,000 annual stipend plus research funds",
    deadline: "2026-09-20",
    eligibilityCriteria: [
      "Recent PhD recipients or doctoral candidates",
      "Outstanding academic record",
      "Social science research focus"
    ],
    requiredDocuments: [
      "Curriculum Vitae (CV)",
      "Research proposal",
      "Three letters of recommendation",
      "Scholarly writing sample"
    ],
    providerLink: "https://academy.wcfia.harvard.edu/",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Stanford Knight-Hennessy Scholars",
    description: "The Knight-Hennessy Scholars program cultivates and supports a multidisciplinary and multicultural community of graduate students at Stanford University.",
    provider: "Stanford University",
    country: "USA",
    university: "Stanford University",
    category: "Merit-based",
    degreeLevel: "Masters",
    fundingType: "Fully Funded",
    amount: "Tuition, living stipend, travel grant, and academic resources",
    deadline: "2026-10-10",
    eligibilityCriteria: [
      "Admitted to a graduate program at Stanford",
      "Earned first bachelor's degree in last 7 years",
      "Independent thinker and leader"
    ],
    requiredDocuments: [
      "Online application",
      "Transcripts",
      "Two recommendation letters",
      "Video submission"
    ],
    providerLink: "https://knight-hennessy.stanford.edu/",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "AAUW International Fellowships",
    description: "AAUW's International Fellowship program provides support for women pursuing full-time graduate or postdoctoral study in the US who are not US citizens.",
    provider: "American Association of University Women",
    country: "USA",
    university: "Any accredited US University",
    category: "Diversity",
    degreeLevel: "Masters",
    fundingType: "Partially Funded",
    amount: "$20,000 for Master's, $25,000 for PhD",
    deadline: "2026-11-15",
    eligibilityCriteria: [
      "Identifies as female",
      "Non-US citizen or permanent resident",
      "Hold academic degree equivalent to US bachelor's"
    ],
    requiredDocuments: [
      "Three letters of recommendation",
      "Proof of highest degree",
      "English proficiency report",
      "Study or research plan"
    ],
    providerLink: "https://www.aauw.org/",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },

  // --- UK (5) ---
  {
    title: "Chevening Scholarships",
    description: "Chevening is the UK government's international awards programme aimed at developing global leaders.",
    provider: "UK Government (FCDO)",
    country: "UK",
    university: "Any UK University",
    category: "Government",
    degreeLevel: "Masters",
    fundingType: "Fully Funded",
    amount: "Full tuition fees, monthly living allowance, return flights, and arrival allowance",
    deadline: "2026-11-05",
    eligibilityCriteria: [
      "Be a citizen of a Chevening-eligible country",
      "Return to country of citizenship for minimum of two years after award",
      "At least two years of work experience"
    ],
    requiredDocuments: [
      "Education documents",
      "Two reference letters",
      "One unconditional UK university offer"
    ],
    providerLink: "https://www.chevening.org/",
    image: "https://images.unsplash.com/photo-1513829096999-4978602294fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Gates Cambridge Scholarship",
    description: "Gates Cambridge Scholarships are prestigious, highly competitive full-cost scholarships for international students to pursue a postgraduate degree at Cambridge University.",
    provider: "Bill & Melinda Gates Foundation",
    country: "UK",
    university: "University of Cambridge",
    category: "Merit-based",
    degreeLevel: "PhD",
    fundingType: "Fully Funded",
    amount: "University composition fees, maintenance allowance of £20,000, airfare, and visa costs",
    deadline: "2026-12-05",
    eligibilityCriteria: [
      "Citizen of any country outside the UK",
      "Applying to pursue a PhD or Master's degree at Cambridge",
      "Outstanding academic excellence"
    ],
    requiredDocuments: [
      "Gates Cambridge Statement",
      "Research proposal (for PhD)",
      "Three academic references"
    ],
    providerLink: "https://www.gatescambridge.org/",
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Clarendon Fund Scholarships",
    description: "The Clarendon Fund offers over 150 fully-funded scholarships each year to outstanding graduate students at the University of Oxford.",
    provider: "University of Oxford",
    country: "UK",
    university: "University of Oxford",
    category: "Merit-based",
    degreeLevel: "Masters",
    fundingType: "Fully Funded",
    amount: "Full tuition fees and a generous grant for living expenses",
    deadline: "2026-01-25",
    eligibilityCriteria: [
      "Applying to a master's or DPhil at Oxford",
      "Outstanding academic record",
      "Strong motivation and research potential"
    ],
    requiredDocuments: [
      "Oxford graduate application",
      "Official academic transcripts",
      "References and CV"
    ],
    providerLink: "https://www.ox.ac.uk/clarendon",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Rhodes Scholarship",
    description: "The Rhodes Scholarship is a life-changing opportunity for exceptional young people from around the world to study at the University of Oxford.",
    provider: "Rhodes Trust",
    country: "UK",
    university: "University of Oxford",
    category: "Merit-based",
    degreeLevel: "Masters",
    fundingType: "Fully Funded",
    amount: "All university fees, monthly stipend, return flights, and health insurance",
    deadline: "2026-10-01",
    eligibilityCriteria: [
      "Aged between 18 and 24 at application",
      "Completed undergraduate degree with first class honours",
      "Citizen of eligible Rhodes constituency"
    ],
    requiredDocuments: [
      "Birth certificate",
      "Academic transcripts",
      "Five to eight letters of reference",
      "Personal statement"
    ],
    providerLink: "https://www.rhodeshouse.ox.ac.uk/",
    image: "https://images.unsplash.com/photo-1607237138185-eedd996c5c0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Westminster International Scholarships",
    description: "Designed for students from developing countries to pursue a full-time Master's degree at the University of Westminster.",
    provider: "University of Westminster",
    country: "UK",
    university: "University of Westminster",
    category: "Need-based",
    degreeLevel: "Masters",
    fundingType: "Fully Funded",
    amount: "Full tuition fee waivers, accommodation, living expenses and flights",
    deadline: "2026-05-31",
    eligibilityCriteria: [
      "International student from a developing country",
      "Hold an unconditional offer for full-time Master's",
      "Financial need and academic excellence"
    ],
    requiredDocuments: [
      "Copy of acceptance letter",
      "Academic transcripts",
      "Reference letter",
      "Statement of financial need"
    ],
    providerLink: "https://www.westminster.ac.uk/",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },

  // --- Canada (5) ---
  {
    title: "Vanier Canada Graduate Scholarships",
    description: "Supports highly qualified doctoral students by offering a significant financial scholarship to study in Canada.",
    provider: "Government of Canada",
    country: "Canada",
    university: "Participating Canadian Universities",
    category: "Government",
    degreeLevel: "PhD",
    fundingType: "Fully Funded",
    amount: "$50,000 per year for 3 years",
    deadline: "2026-10-31",
    eligibilityCriteria: [
      "Nominated by a Canadian institution",
      "Pursuing a doctoral degree in health, natural sciences, or social sciences",
      "Outstanding leadership achievements"
    ],
    requiredDocuments: [
      "Transcripts",
      "Research proposal",
      "Two referee reports",
      "Leadership statement"
    ],
    providerLink: "https://vanier.gc.ca/",
    image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Banting Postdoctoral Fellowships",
    description: "Provides funding to the very best postdoctoral applicants, both nationally and internationally, who will positively contribute to Canada's economic growth.",
    provider: "Government of Canada",
    country: "Canada",
    university: "Canadian Host Universities",
    category: "Government",
    degreeLevel: "PhD",
    fundingType: "Fully Funded",
    amount: "$70,000 per year for 2 years",
    deadline: "2026-09-18",
    eligibilityCriteria: [
      "Completed PhD or equivalent in eligible time window",
      "Non-Canadian or Canadian citizens",
      "Top-tier research excellence"
    ],
    requiredDocuments: [
      "Research proposal",
      "Institutional synergy statement",
      "Three referee letters",
      "Curriculum Vitae"
    ],
    providerLink: "https://banting.fellowships-bourses.gc.ca/",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Lester B. Pearson International Scholarship",
    description: "The Lester B. Pearson International Scholarship Program at the University of Toronto is designed to recognize international students who demonstrate exceptional academic achievement.",
    provider: "University of Toronto",
    country: "Canada",
    university: "University of Toronto",
    category: "Merit-based",
    degreeLevel: "Undergraduate",
    fundingType: "Fully Funded",
    amount: "Tuition, books, incidental fees, and full residence support for 4 years",
    deadline: "2026-01-15",
    eligibilityCriteria: [
      "An international student nominated by their school",
      "Currently in final year of secondary school",
      "Creative thinker and community leader"
    ],
    requiredDocuments: [
      "School nomination form",
      "Online student application",
      "High school transcripts",
      "Essays"
    ],
    providerLink: "https://future.utoronto.ca/pearson/",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "University of Manitoba Graduate Fellowships",
    description: "Awarded to full-time graduate students who demonstrated superior academic performance and are registered at the University of Manitoba.",
    provider: "University of Manitoba",
    country: "Canada",
    university: "University of Manitoba",
    category: "Merit-based",
    degreeLevel: "Masters",
    fundingType: "Partially Funded",
    amount: "$14,000 for Masters, $18,000 for PhD per year",
    deadline: "2026-04-01",
    eligibilityCriteria: [
      "Minimum GPA of 3.75 in last two years of study",
      "Full-time student at University of Manitoba",
      "Open to all nationalities"
    ],
    requiredDocuments: [
      "Application form",
      "Transcripts",
      "Two letters of recommendation"
    ],
    providerLink: "https://umanitoba.ca/",
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Calgary International Entrance Scholarship",
    description: "Offered annually to international students entering their first year of an undergraduate degree who demonstrate academic excellence.",
    provider: "University of Calgary",
    country: "Canada",
    university: "University of Calgary",
    category: "Merit-based",
    degreeLevel: "Undergraduate",
    fundingType: "Partially Funded",
    amount: "$20,000 per year (renewable)",
    deadline: "2026-03-01",
    eligibilityCriteria: [
      "International student starting undergraduate degree",
      "Academic GPA of 3.2 or higher",
      "Satisfied English language proficiency"
    ],
    requiredDocuments: [
      "High school transcript",
      "Reference letter",
      "Statement of purpose"
    ],
    providerLink: "https://www.ucalgary.ca/",
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },

  // --- Australia (5) ---
  {
    title: "Destination Australia Scholarships",
    description: "The program funds eligible tertiary education providers to offer scholarships to domestic and international students to study in regional Australia.",
    provider: "Australian Government",
    country: "Australia",
    university: "Participating Regional Universities",
    category: "Government",
    degreeLevel: "Undergraduate",
    fundingType: "Partially Funded",
    amount: "$15,000 per year",
    deadline: "2026-06-30",
    eligibilityCriteria: [
      "International or domestic student",
      "Enrolled in regional Australian campus",
      "Full-time study load"
    ],
    requiredDocuments: [
      "Acceptance letter",
      "Academic transcript",
      "Proof of residency in regional area"
    ],
    providerLink: "https://www.education.gov.au/destination-australia",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Australia Awards Scholarships",
    description: "Long-term development awards administered by the Department of Foreign Affairs and Trade for leaders from developing countries.",
    provider: "Australian Government (DFAT)",
    country: "Australia",
    university: "Participating Australian Universities",
    category: "Government",
    degreeLevel: "Masters",
    fundingType: "Fully Funded",
    amount: "Full tuition fees, airfare, establishment allowance, and contribution to living expenses",
    deadline: "2026-04-30",
    eligibilityCriteria: [
      "Citizen of participating developing nation",
      "Minimum 18 years old",
      "Committed to return to home country after study"
    ],
    requiredDocuments: [
      "Academic transcripts",
      "Passport and birth certificate",
      "Employment references",
      "Development impact essay"
    ],
    providerLink: "https://www.dfat.gov.au/people-to-people/australia-awards",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "University of Sydney International Scholarships",
    description: "Funded by the University of Sydney, this scholarship assists outstanding international postgraduate research students.",
    provider: "University of Sydney",
    country: "Australia",
    university: "University of Sydney",
    category: "Merit-based",
    degreeLevel: "PhD",
    fundingType: "Fully Funded",
    amount: "$40,000 annual living allowance and tuition fee coverage",
    deadline: "2026-09-30",
    eligibilityCriteria: [
      "Commencing international postgraduate research student",
      "Outstanding academic record",
      "Research capability evidence"
    ],
    requiredDocuments: [
      "Research proposal",
      "Academic CV",
      "Two academic referee reports",
      "Offer of admission"
    ],
    providerLink: "https://www.sydney.edu.au/",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Melbourne Graduate Research Scholarships",
    description: "Awarded to high-achieving domestic and international students undertaking a graduate research degree at the University of Melbourne.",
    provider: "University of Melbourne",
    country: "Australia",
    university: "University of Melbourne",
    category: "Merit-based",
    degreeLevel: "PhD",
    fundingType: "Fully Funded",
    amount: "Full fee offset, $37,000 annual living allowance, relocation grant, and health insurance",
    deadline: "2026-10-31",
    eligibilityCriteria: [
      "Applied for a graduate research course at Melbourne",
      "Top-tier academic results",
      "Open to all research disciplines"
    ],
    requiredDocuments: [
      "Research proposal",
      "Academic transcript",
      "Academic references"
    ],
    providerLink: "https://unimelb.edu.au/",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Adelaide Global Academic Excellence Scholarships",
    description: "Highly competitive award recognizing international undergraduate and postgraduate coursework students starting at Adelaide.",
    provider: "University of Adelaide",
    country: "Australia",
    university: "University of Adelaide",
    category: "Merit-based",
    degreeLevel: "Undergraduate",
    fundingType: "Partially Funded",
    amount: "50% reduction in tuition fees",
    deadline: "2026-06-15",
    eligibilityCriteria: [
      "Commencing international student",
      "Equivalent to ATAR score of 98 for UG, or GPA 6.8/7.0 for PG",
      "Academic excellence award"
    ],
    requiredDocuments: [
      "Academic transcripts",
      "Letter of offer",
      "Proof of English proficiency"
    ],
    providerLink: "https://www.adelaide.edu.au/",
    image: "https://images.unsplash.com/photo-1607237138185-eedd996c5c0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },

  // --- Germany (5) ---
  {
    title: "DAAD EPOS Scholarships",
    description: "Offers foreign graduates from development and newly industrialized countries all disciplines the chance to take a postgraduate or Master's degree in Germany.",
    provider: "DAAD (German Academic Exchange Service)",
    country: "Germany",
    university: "German Universities",
    category: "Government",
    degreeLevel: "Masters",
    fundingType: "Fully Funded",
    amount: "934 € monthly stipend, travel allowance, health insurance, and study allowance",
    deadline: "2026-08-31",
    eligibilityCriteria: [
      "Academic degree in related field (under 6 years old)",
      "At least two years of professional experience",
      "Citizens of developing countries"
    ],
    requiredDocuments: [
      "DAAD application form",
      "Hand-signed CV (Europass)",
      "Letter of motivation",
      "Professional references"
    ],
    providerLink: "https://www.daad.de/en/",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Heinrich Böll Foundation Scholarships",
    description: "The Heinrich Böll Foundation grants scholarships to international students who gained their university entrance qualification outside Germany.",
    provider: "Heinrich Böll Foundation",
    country: "Germany",
    university: "Any accredited German University",
    category: "Merit-based",
    degreeLevel: "Masters",
    fundingType: "Fully Funded",
    amount: "934 € monthly plus family allowances and health expenses",
    deadline: "2026-03-01",
    eligibilityCriteria: [
      "Excellent academic record",
      "Social and political engagement",
      "German language skills (B2/C1 recommended)"
    ],
    requiredDocuments: [
      "Application form",
      "University entrance qualification",
      "Two reference letters",
      "German language certificate"
    ],
    providerLink: "https://www.boell.de/en/scholarships",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Deutschlandstipendium National Scholarship",
    description: "Supports highly talented students at state and state-recognized universities in Germany.",
    provider: "German Federal Government & Private Sponsors",
    country: "Germany",
    university: "Any German University",
    category: "Government",
    degreeLevel: "Undergraduate",
    fundingType: "Partially Funded",
    amount: "300 € per month",
    deadline: "2026-07-15",
    eligibilityCriteria: [
      "Enrolled at a German university",
      "Excellent grades and academic performance",
      "Social commitment and personal milestones"
    ],
    requiredDocuments: [
      "Academic transcript",
      "Motivation letter",
      "CV",
      "Proof of social involvement"
    ],
    providerLink: "https://www.deutschlandstipendium.de/",
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Friedrich Ebert Foundation Scholarship",
    description: "Supports international students with outstanding academic records who wish to study in Germany and commit to social democracy values.",
    provider: "Friedrich Ebert Stiftung (FES)",
    country: "Germany",
    university: "German Higher Education Institutions",
    category: "Merit-based",
    degreeLevel: "Masters",
    fundingType: "Fully Funded",
    amount: "Monthly stipend of 830 € to 1,200 €, health insurance contribution",
    deadline: "2026-11-30",
    eligibilityCriteria: [
      "Excellent school and academic performance",
      "Commitment to social democracy and progressive values",
      "Good knowledge of German language"
    ],
    requiredDocuments: [
      "Online questionnaire",
      "Two academic references",
      "German language certificate",
      "Enrollment certificate"
    ],
    providerLink: "https://www.fes.de/en/internship-and-scholarships",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "KAAD Academic Scholarships",
    description: "KAAD supports postgraduates and academics from developing and transitioning countries for studies at German universities.",
    provider: "Catholic Academic Exchange Service (KAAD)",
    country: "Germany",
    university: "German Universities",
    category: "Merit-based",
    degreeLevel: "PhD",
    fundingType: "Fully Funded",
    amount: "Stipend, travel, health cover, and German language preparatory courses",
    deadline: "2026-01-15",
    eligibilityCriteria: [
      "From developing or emerging country",
      "Above-average academic degree",
      "Active Catholic or Christian background (or recommendation)"
    ],
    requiredDocuments: [
      "Academic certificates",
      "KAAD application form",
      "Religious or social recommendation letter",
      "Research proposal (PhD)"
    ],
    providerLink: "https://www.kaad.de/en/",
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },

  // --- Turkey (5) ---
  {
    title: "Türkiye Scholarships (YTB)",
    description: "Türkiye Scholarships is a government-funded, competitive scholarship program, awarded to outstanding students to pursue full-time or short-term programs.",
    provider: "Government of Turkey",
    country: "Turkey",
    university: "Turkish Universities",
    category: "Government",
    degreeLevel: "Undergraduate",
    fundingType: "Fully Funded",
    amount: "University placement, tuition fee, monthly stipend, health insurance, accommodation, and 1-year Turkish language course",
    deadline: "2026-02-20",
    eligibilityCriteria: [
      "Non-Turkish citizen",
      "Under 21 for Bachelor's, under 30 for Master's, under 35 for PhD",
      "Minimum academic achievement threshold of 70% (90% for health sciences)"
    ],
    requiredDocuments: [
      "Passport or ID card",
      "Recent photo",
      "National or international exam results",
      "Transcripts and diplomas"
    ],
    providerLink: "https://www.turkiyeburslari.gov.tr/",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Sabancı University Graduate Scholarships",
    description: "Sabancı University provides various financial support opportunities for international graduate students seeking high-quality research environments.",
    provider: "Sabancı University",
    country: "Turkey",
    university: "Sabancı University",
    category: "Merit-based",
    degreeLevel: "Masters",
    fundingType: "Fully Funded",
    amount: "Full tuition waiver, monthly stipend, double room dormitory, and research support",
    deadline: "2026-05-30",
    eligibilityCriteria: [
      "Outstanding academic performance in bachelor's degree",
      "High score in GRE, GMAT, or ALES",
      "English proficiency score (TOEFL)"
    ],
    requiredDocuments: [
      "Transcripts",
      "Two letters of recommendation",
      "Statement of purpose",
      "Official test scores"
    ],
    providerLink: "https://www.sabanciuniv.edu/en",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Koç University Graduate Fellowship",
    description: "Koç University offers generous PhD scholarships to domestic and international students in science, engineering, social sciences, and health.",
    provider: "Koç University",
    country: "Turkey",
    university: "Koç University",
    category: "Merit-based",
    degreeLevel: "PhD",
    fundingType: "Fully Funded",
    amount: "Full tuition waiver, monthly stipend, private/shared dorm, health insurance, and laptop",
    deadline: "2026-06-15",
    eligibilityCriteria: [
      "Top-tier undergraduate or master's GPA",
      "Strong GRE or ALES score",
      "Interview acceptance by faculty"
    ],
    requiredDocuments: [
      "Statement of purpose",
      "Academic CV",
      "Three reference letters",
      "Standardized test results"
    ],
    providerLink: "https://gsse.ku.edu.tr/en/",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Bilkent University Undergraduate Scholarship",
    description: "Bilkent University offers significant tuition waiver scholarships for high-achieving international applicants.",
    provider: "Bilkent University",
    country: "Turkey",
    university: "Bilkent University",
    category: "Merit-based",
    degreeLevel: "Undergraduate",
    fundingType: "Partially Funded",
    amount: "20% to 100% tuition fee waivers",
    deadline: "2026-07-10",
    eligibilityCriteria: [
      "International applicant to Bilkent",
      "High score in SAT, ACT, or national high school exit exam",
      "Strong secondary school GPA"
    ],
    requiredDocuments: [
      "High school diploma",
      "Official transcripts",
      "SAT/ACT score report",
      "English test scores"
    ],
    providerLink: "https://w3.bilkent.edu.tr/bilkent/",
    image: "https://images.unsplash.com/photo-1607237138185-eedd996c5c0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "ITU International Merit Scholarship",
    description: "Istanbul Technical University rewards exceptional international students pursuing engineering and technical degrees.",
    provider: "Istanbul Technical University",
    country: "Turkey",
    university: "Istanbul Technical University",
    category: "Merit-based",
    degreeLevel: "Undergraduate",
    fundingType: "Partially Funded",
    amount: "$2,000 yearly stipend plus partial tuition waivers",
    deadline: "2026-08-01",
    eligibilityCriteria: [
      "Acceptance to ITU undergraduate engineering program",
      "Top 5% score in high school leaving exams",
      "Open to all international students"
    ],
    requiredDocuments: [
      "High school diploma",
      "Transcript",
      "English competency results",
      "Financial proof"
    ],
    providerLink: "https://www.itu.edu.tr/",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },

  // --- China (5) ---
  {
    title: "Chinese Government Scholarship (CSC)",
    description: "CSC scholarship is a government-funded initiative designed to promote mutual understanding and educational exchanges between China and the world.",
    provider: "Ministry of Education of China",
    country: "China",
    university: "Designated Chinese Universities",
    category: "Government",
    degreeLevel: "Masters",
    fundingType: "Fully Funded",
    amount: "Full tuition waiver, free on-campus accommodation, monthly stipend (3,000 RMB for Masters, 3,500 RMB for PhD), and comprehensive health insurance",
    deadline: "2026-04-30",
    eligibilityCriteria: [
      "Non-Chinese citizen in good health",
      "Age limits (under 35 for Masters, under 40 for PhD)",
      "Bachelor's degree or equivalent"
    ],
    requiredDocuments: [
      "CSC Application Form",
      "Notarized highest diploma",
      "Study Plan or Research Proposal",
      "Two recommendation letters"
    ],
    providerLink: "http://www.campuschina.org/",
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Schwarzman Scholars Program",
    description: "Designed to prepare the next generation of global leaders, Schwarzman Scholars is the first scholarship created to respond to the geopolitical landscape of the 21st Century.",
    provider: "Schwarzman Foundation",
    country: "China",
    university: "Tsinghua University",
    category: "Merit-based",
    degreeLevel: "Masters",
    fundingType: "Fully Funded",
    amount: "Tuition, room & board, travel to/from Beijing, study tour, and $4,000 stipend",
    deadline: "2026-09-20",
    eligibilityCriteria: [
      "Undergraduate degree completed",
      "Aged 18 to 28 at application time",
      "English language proficiency",
      "Exceptional leadership potential"
    ],
    requiredDocuments: [
      "Academic transcripts",
      "Three letters of recommendation",
      "Resume/CV",
      "Two essays and short video"
    ],
    providerLink: "https://www.schwarzmanscholars.org/",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Peking University Yenching Academy Scholarship",
    description: "Fully funded fellowship in China Studies for English-speaking outstanding postgraduate students globally.",
    provider: "Peking University",
    country: "China",
    university: "Peking University",
    category: "Merit-based",
    degreeLevel: "Masters",
    fundingType: "Fully Funded",
    amount: "Tuition, accommodation, monthly stipend, and travel costs",
    deadline: "2026-12-01",
    eligibilityCriteria: [
      "Bachelor's degree in any field by August 31",
      "Outstanding academic record",
      "Exceptional English skills"
    ],
    requiredDocuments: [
      "Peking University application portal forms",
      "Two recommendation letters",
      "Personal statement",
      "Research proposal outline"
    ],
    providerLink: "https://yenchingacademy.pku.edu.cn/",
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Tsinghua University President Scholarship",
    description: "Tsinghua University offers full and partial scholarships to outstanding international undergraduate students.",
    provider: "Tsinghua University",
    country: "China",
    university: "Tsinghua University",
    category: "Merit-based",
    degreeLevel: "Undergraduate",
    fundingType: "Fully Funded",
    amount: "Full tuition waiver, monthly living allowance, and comprehensive insurance",
    deadline: "2026-01-30",
    eligibilityCriteria: [
      "High school graduate with high academic standing",
      "Chinese language proficiency (HSK 5 or above for Chinese-taught programs)",
      "Excellent character and health"
    ],
    requiredDocuments: [
      "High school diploma",
      "Academic transcript",
      "HSK score report",
      "Two letters of recommendation"
    ],
    providerLink: "https://www.tsinghua.edu.cn/en/",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "SJTU Excellent International Student Scholarship",
    description: "Shanghai Jiao Tong University offers multiple scholarship types to support international graduate students with top academic performance.",
    provider: "Shanghai Jiao Tong University",
    country: "China",
    university: "Shanghai Jiao Tong University",
    category: "Merit-based",
    degreeLevel: "PhD",
    fundingType: "Fully Funded",
    amount: "Full tuition coverage, monthly stipend, on-campus housing, and insurance",
    deadline: "2026-03-31",
    eligibilityCriteria: [
      "Excellent research background",
      "Master's degree or equivalent",
      "Meets English (IELTS 6.0+) or Chinese HSK standard"
    ],
    requiredDocuments: [
      "Research plan",
      "Academic transcripts",
      "Recommendation letters",
      "CV with publication list"
    ],
    providerLink: "https://en.sjtu.edu.cn/",
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },

  // --- Saudi Arabia (5) ---
  {
    title: "KAUST Fellowship",
    description: "The KAUST Fellowship is the general scholarship program supporting students studying at King Abdullah University of Science and Technology.",
    provider: "KAUST",
    country: "Saudi Arabia",
    university: "King Abdullah University of Science and Technology",
    category: "Merit-based",
    degreeLevel: "Masters",
    fundingType: "Fully Funded",
    amount: "Full tuition support, monthly living allowance ($20k-$30k annually), free housing, medical cover, and relocation support",
    deadline: "2026-01-15",
    eligibilityCriteria: [
      "Applied and accepted into KAUST program",
      "Outstanding undergraduate GPA",
      "Strong research capabilities in STEM fields"
    ],
    requiredDocuments: [
      "Official college transcripts",
      "Curriculum Vitae",
      "Statement of purpose",
      "Three letters of recommendation",
      "GRE and English test results"
    ],
    providerLink: "https://www.kaust.edu.sa/en",
    image: "https://images.unsplash.com/photo-1586724237569-f38559901414?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "King Fahd University Scholarship",
    description: "King Fahd University of Petroleum & Minerals (KFUPM) offers full scholarship fellowships for outstanding international graduate candidates.",
    provider: "KFUPM",
    country: "Saudi Arabia",
    university: "King Fahd University of Petroleum & Minerals",
    category: "Merit-based",
    degreeLevel: "PhD",
    fundingType: "Fully Funded",
    amount: "Full tuition, free textbooks, monthly stipend, free housing, and medical care",
    deadline: "2026-06-30",
    eligibilityCriteria: [
      "First-class Master's degree in engineering/science",
      "Strong GPA (above 3.25/4.0)",
      "High GRE scores"
    ],
    requiredDocuments: [
      "Degree certificate",
      "Transcripts",
      "Three recommendation letters",
      "GMAT/GRE scores"
    ],
    providerLink: "https://www.kfupm.edu.sa/",
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "King Saud University Scholarship for International Students",
    description: "Offers non-Saudi students scholarship grants to study Arabic and other sciences at King Saud University in Riyadh.",
    provider: "King Saud University",
    country: "Saudi Arabia",
    university: "King Saud University",
    category: "Government",
    degreeLevel: "Undergraduate",
    fundingType: "Fully Funded",
    amount: "Full tuition, monthly allowance, free hostel, subsidized food, and return flights",
    deadline: "2026-05-15",
    eligibilityCriteria: [
      "High school diploma with distinction",
      "Aged between 17 and 25 years",
      "Never received another scholarship in Saudi Arabia"
    ],
    requiredDocuments: [
      "High school certificates",
      "Medical fitness certificate",
      "Recommendation from local organizations"
    ],
    providerLink: "https://ksu.edu.sa/en/",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "King Abdulaziz University Scholarships",
    description: "KAU offers fully funded postgraduate degree programs for international students to promote cultural exchange and research.",
    provider: "King Abdulaziz University",
    country: "Saudi Arabia",
    university: "King Abdulaziz University",
    category: "Merit-based",
    degreeLevel: "Masters",
    fundingType: "Fully Funded",
    amount: "Full tuition, monthly stipend, accommodation, preparation allowance, and medical care",
    deadline: "2026-03-15",
    eligibilityCriteria: [
      "Non-Saudi national",
      "Exceptional academic graduation GPA",
      "Under 30 years old for Master's"
    ],
    requiredDocuments: [
      "Graduation diploma and transcripts",
      "Research plan summary",
      "Two academic recommendations",
      "CV"
    ],
    providerLink: "https://www.kau.edu.sa/",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Islamic University of Madinah Scholarship",
    description: "Fully funded scholarship for Muslim male students around the world to study undergraduate degrees in Islamic and scientific disciplines.",
    provider: "Islamic University of Madinah",
    country: "Saudi Arabia",
    university: "Islamic University of Madinah",
    category: "Government",
    degreeLevel: "Undergraduate",
    fundingType: "Fully Funded",
    amount: "Tuition waiver, monthly stipend, free housing, return airfare, and pocket allowance",
    deadline: "2026-11-30",
    eligibilityCriteria: [
      "Must be a male Muslim",
      "High school graduate under 25 years old",
      "Good conduct and medical health"
    ],
    requiredDocuments: [
      "High school transcripts and diploma",
      "Birth certificate",
      "Passport copy",
      "Islamic recommendation letter"
    ],
    providerLink: "https://www.iu.edu.sa/en",
    image: "https://images.unsplash.com/photo-1607237138185-eedd996c5c0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },

  // --- UAE (5) ---
  {
    title: "Khalifa University Graduate Scholarships",
    description: "Offers generous scholarship support to qualified international candidates applying for graduate research degrees at Khalifa University.",
    provider: "Khalifa University",
    country: "UAE",
    university: "Khalifa University",
    category: "Merit-based",
    degreeLevel: "PhD",
    fundingType: "Fully Funded",
    amount: "Full tuition, monthly stipend (10,000-20,000 AED), free student housing, and medical insurance",
    deadline: "2026-04-15",
    eligibilityCriteria: [
      "Highly qualified graduate degree with GPA of 3.25/4.0+",
      "STEM discipline research interest",
      "Excellent GRE score"
    ],
    requiredDocuments: [
      "Detailed CV",
      "Official academic transcripts",
      "Recommendation letters",
      "Statement of research interests"
    ],
    providerLink: "https://www.ku.ac.ae/graduate-scholarships",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "UAEU Graduate Assistantship Program",
    description: "Offers graduate students who maintain a high GPA assistantship funding to participate in research and teaching support.",
    provider: "United Arab Emirates University",
    country: "UAE",
    university: "United Arab Emirates University",
    category: "Merit-based",
    degreeLevel: "Masters",
    fundingType: "Fully Funded",
    amount: "Full tuition coverage, monthly salary/allowance, and medical insurance",
    deadline: "2026-05-15",
    eligibilityCriteria: [
      "Enrolled in Master's or PhD program at UAEU",
      "CGPA of 3.0 or higher in undergraduate degree",
      "Fulfill department criteria for assistant duties"
    ],
    requiredDocuments: [
      "Academic transcript",
      "Recommendation letter",
      "CV",
      "Work interest essay"
    ],
    providerLink: "https://www.uaeu.ac.ae/en/cgs/",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Zayed University Undergraduate Merit Scholarship",
    description: "Provides undergraduate scholarships to outstanding international students who achieve exceptional high school results.",
    provider: "Zayed University",
    country: "UAE",
    university: "Zayed University",
    category: "Merit-based",
    degreeLevel: "Undergraduate",
    fundingType: "Partially Funded",
    amount: "50% to 100% tuition fee waiver",
    deadline: "2026-06-30",
    eligibilityCriteria: [
      "High school score of 95% or higher",
      "International applicant to Zayed University",
      "English language proficiency (IELTS 6.0+)"
    ],
    requiredDocuments: [
      "High school transcripts",
      "Emirates Standardized Test (EmSAT) scores (if applicable)",
      "IELTS certificate"
    ],
    providerLink: "https://www.zu.ac.ae/",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "MBZUAI Scholarship for AI Studies",
    description: "Mohamed bin Zayed University of Artificial Intelligence offers fully-funded master's and PhD programs in AI fields to attract global talent.",
    provider: "MBZUAI",
    country: "UAE",
    university: "Mohamed bin Zayed University of Artificial Intelligence",
    category: "Merit-based",
    degreeLevel: "Masters",
    fundingType: "Fully Funded",
    amount: "100% tuition coverage, monthly stipend, student accommodation, and health insurance",
    deadline: "2026-01-31",
    eligibilityCriteria: [
      "Bachelor's in STEM with high GPA",
      "Strong coding proficiency",
      "Interest in Computer Vision, Machine Learning, or NLP"
    ],
    requiredDocuments: [
      "Undergraduate transcripts",
      "Research proposal",
      "Three reference letters",
      "English test results"
    ],
    providerLink: "https://mbzuai.ac.ae/",
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Abu Dhabi University President Scholarship",
    description: "The most prestigious undergraduate scholarship offered by Abu Dhabi University to outstanding students.",
    provider: "Abu Dhabi University",
    country: "UAE",
    university: "Abu Dhabi University",
    category: "Merit-based",
    degreeLevel: "Undergraduate",
    fundingType: "Fully Funded",
    amount: "100% waiver on tuition fees, registration, student service fees, and health insurance",
    deadline: "2026-07-20",
    eligibilityCriteria: [
      "Achieved a minimum score of 97% in high school exit exam",
      "Fresh high school graduate",
      "Exceptional English skills"
    ],
    requiredDocuments: [
      "High school diploma",
      "Passport and Emirates ID copy",
      "Proof of English proficiency"
    ],
    providerLink: "https://www.adu.ac.ae/",
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },

  // --- Malaysia (5) ---
  {
    title: "Malaysia International Scholarship (MIS)",
    description: "An initiative by the Malaysian Government to attract top academic talent from around the world to pursue postgraduate studies.",
    provider: "Ministry of Higher Education, Malaysia",
    country: "Malaysia",
    university: "Participating Malaysian Universities",
    category: "Government",
    degreeLevel: "Masters",
    fundingType: "Fully Funded",
    amount: "Tuition fees waiver and monthly living allowance of RM 1,500",
    deadline: "2026-05-30",
    eligibilityCriteria: [
      "Not exceeding 40 years of age for Master's, 45 for PhD",
      "Minimum CGPA of 3.5 in previous degree",
      "Open to citizens of eligible countries"
    ],
    requiredDocuments: [
      "Application form",
      "Certified academic transcripts",
      "Proposal of study or research",
      "Proof of English proficiency"
    ],
    providerLink: "https://biasiswa.mohe.gov.my/",
    image: "https://images.unsplash.com/photo-1596497063583-13e6d72c5888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "University of Malaya Graduate Fellowship",
    description: "Assists graduate research students of high quality to complete their Master's or Doctoral programs at UM.",
    provider: "University of Malaya",
    country: "Malaysia",
    university: "University of Malaya",
    category: "Merit-based",
    degreeLevel: "PhD",
    fundingType: "Fully Funded",
    amount: "Full tuition fee waiver and RM 2,000 to RM 3,000 monthly research stipend",
    deadline: "2026-06-15",
    eligibilityCriteria: [
      "Full-time postgraduate research student at UM",
      "Above-average academic results",
      "Recommendation by research supervisor"
    ],
    requiredDocuments: [
      "Supervision agreement",
      "Academic transcripts",
      "Research methodology draft",
      "Favorable recommendation letters"
    ],
    providerLink: "https://www.um.edu.my/",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "UTM Graduate Assistantship Scheme",
    description: "Provides financial aid to local and international students in exchange for assisting with undergraduate labs or tutor classes.",
    provider: "Universiti Teknologi Malaysia",
    country: "Malaysia",
    university: "Universiti Teknologi Malaysia",
    category: "Merit-based",
    degreeLevel: "Masters",
    fundingType: "Partially Funded",
    amount: "Monthly allowance of RM 1,200 (Masters) to RM 1,800 (PhD) plus partial tuition waiver",
    deadline: "2026-07-31",
    eligibilityCriteria: [
      "Enrolled in coursework or research postgraduate degree at UTM",
      "Sufficient background in technology or engineering subjects to tutor"
    ],
    requiredDocuments: [
      "Application form",
      "Transcript showing high scores in tutored subjects",
      "Faculty recommendation"
    ],
    providerLink: "https://www.utm.my/",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Taylor's University International Scholarship",
    description: "A prestigious scholarship designed to reward academic excellence in international students starting undergraduate courses.",
    provider: "Taylor's University",
    country: "Malaysia",
    university: "Taylor's University",
    category: "Merit-based",
    degreeLevel: "Undergraduate",
    fundingType: "Partially Funded",
    amount: "25% to 50% waiver on tuition fees",
    deadline: "2026-04-15",
    eligibilityCriteria: [
      "Hold high school result matching AABB in A-Levels or equivalent GPA 3.5+",
      "Apply as full-time undergraduate at Taylor's"
    ],
    requiredDocuments: [
      "Certified transcripts of qualifying high school exam",
      "Taylor's offer letter",
      "Personal statement essay"
    ],
    providerLink: "https://university.taylors.edu.my/",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "APU Merit Scholarships",
    description: "Asia Pacific University rewards academic achievers with tuition fee study waivers of up to 50%.",
    provider: "Asia Pacific University (APU)",
    country: "Malaysia",
    university: "Asia Pacific University of Technology & Innovation",
    category: "Merit-based",
    degreeLevel: "Undergraduate",
    fundingType: "Partially Funded",
    amount: "10% to 50% tuition fee discounts",
    deadline: "2026-08-15",
    eligibilityCriteria: [
      "International student entering APU Foundation or Degree program",
      "Outstanding academic results (e.g. 5As in SPM/IGCSE or equivalent)"
    ],
    requiredDocuments: [
      "High school qualifications",
      "APU enrollment offer",
      "English competence results"
    ],
    providerLink: "https://www.apu.edu.my/",
    image: "https://images.unsplash.com/photo-1607237138185-eedd996c5c0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },

  // --- Additional (10) to reach 50+ total entries ---
  {
    title: "DAAD Development-Related Postgraduate Courses",
    description: "Scholarships for professionals from developing countries to complete Master's degrees in sustainable development fields.",
    provider: "DAAD Germany",
    country: "Germany",
    university: "Various German Universities",
    category: "Government",
    degreeLevel: "Masters",
    fundingType: "Fully Funded",
    amount: "934 € monthly stipend, travel, insurance, study allowance",
    deadline: "2026-08-31",
    eligibilityCriteria: [
      "Undergraduate degree in relevant subject",
      "Two years of work experience in public or NGO sector"
    ],
    requiredDocuments: [
      "Motivation letter",
      "EU-format CV",
      "Recommendation letter from current employer"
    ],
    providerLink: "https://www.daad.de/",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Clarendon Graduate Scholarship at Oxford",
    description: "Supports graduate study in all academic disciplines at the University of Oxford.",
    provider: "University of Oxford",
    country: "UK",
    university: "University of Oxford",
    category: "Merit-based",
    degreeLevel: "PhD",
    fundingType: "Fully Funded",
    amount: "Full tuition and living cost stipend of £18,622",
    deadline: "2026-01-20",
    eligibilityCriteria: [
      "Applying to a DPhil/PhD course at Oxford",
      "Unmatched academic capabilities"
    ],
    requiredDocuments: [
      "Oxford graduate application forms",
      "Referees and transcripts"
    ],
    providerLink: "https://www.ox.ac.uk/clarendon",
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Gates Cambridge Scholarship (US Scholars)",
    description: "Full-cost scholarships at Cambridge for citizens of the United States residing outside the US.",
    provider: "Gates Cambridge Trust",
    country: "UK",
    university: "University of Cambridge",
    category: "Merit-based",
    degreeLevel: "PhD",
    fundingType: "Fully Funded",
    amount: "Full tuition, maintenance stipend, return airfare",
    deadline: "2026-10-15",
    eligibilityCriteria: [
      "US citizen residing in the US",
      "Applying to a PhD program at Cambridge University"
    ],
    requiredDocuments: [
      "Gates statement",
      "Two academic references",
      "Personal statement essay"
    ],
    providerLink: "https://www.gatescambridge.org/",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Trudeau Foundation Doctoral Scholarship",
    description: "Highly competitive award focusing on human rights, civic engagement, and leadership.",
    provider: "Pierre Elliott Trudeau Foundation",
    country: "Canada",
    university: "Canadian Universities",
    category: "Merit-based",
    degreeLevel: "PhD",
    fundingType: "Fully Funded",
    amount: "$40,000 stipend and $20,000 research/travel allowance per year for 3 years",
    deadline: "2026-11-25",
    eligibilityCriteria: [
      "Admitted to a doctoral program in social sciences or humanities",
      "Commitment to public engagement and community leaders"
    ],
    requiredDocuments: [
      "Transcripts",
      "Three letters of recommendation",
      "Self-assessment profile"
    ],
    providerLink: "https://www.trudeaufoundation.ca/",
    image: "https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "University of Alberta Centenary Scholarship",
    description: "Awarded to international students entering undergraduate studies at UAlberta.",
    provider: "University of Alberta",
    country: "Canada",
    university: "University of Alberta",
    category: "Merit-based",
    degreeLevel: "Undergraduate",
    fundingType: "Partially Funded",
    amount: "$20,000 over 4 years",
    deadline: "2026-03-01",
    eligibilityCriteria: [
      "Superior academic high school average",
      "International student status",
      "Leadership roles evidence"
    ],
    requiredDocuments: [
      "High school transcripts",
      "English proficiency report",
      "Application forms"
    ],
    providerLink: "https://www.ualberta.ca/",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Monash International Leadership Scholarship",
    description: "Monash awards its highest achieving international students with full tuition fee coverage.",
    provider: "Monash University",
    country: "Australia",
    university: "Monash University",
    category: "Merit-based",
    degreeLevel: "Undergraduate",
    fundingType: "Fully Funded",
    amount: "100% tuition fee coverage",
    deadline: "2026-05-15",
    eligibilityCriteria: [
      "Commencing international undergraduate or postgraduate student",
      "Top-tier high school or degree academic grades"
    ],
    requiredDocuments: [
      "Monash application",
      "Scholarship essay (500 words)",
      "Academic references"
    ],
    providerLink: "https://www.monash.edu/",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "ANU Chancellor's International Scholarship",
    description: "Offers tuition fee reduction to attract high-caliber students globally.",
    provider: "Australian National University",
    country: "Australia",
    university: "Australian National University",
    category: "Merit-based",
    degreeLevel: "Masters",
    fundingType: "Partially Funded",
    amount: "25% to 50% tuition fee waiver",
    deadline: "2026-06-15",
    eligibilityCriteria: [
      "International student starting ANU degree coursework",
      "Outstanding academic average in previous study"
    ],
    requiredDocuments: [
      "Transcripts",
      "Letter of offer from ANU"
    ],
    providerLink: "https://www.anu.edu.au/",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Bilkent Graduate Research Fellowship",
    description: "Highly competitive assistantships for international students pursuing scientific research degrees.",
    provider: "Bilkent University",
    country: "Turkey",
    university: "Bilkent University",
    category: "Merit-based",
    degreeLevel: "PhD",
    fundingType: "Fully Funded",
    amount: "Full tuition waiver, monthly stipend, research budget, housing, and health insurance",
    deadline: "2026-05-31",
    eligibilityCriteria: [
      "Outstanding research potential in engineering/science",
      "High GRE or GMAT scores"
    ],
    requiredDocuments: [
      "Official academic transcripts",
      "CV with publication list",
      "Three reference letters"
    ],
    providerLink: "https://w3.bilkent.edu.tr/bilkent/",
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Peking University Academic Scholarship",
    description: "Peking University provides scholarships to outstanding international students studying at PKU.",
    provider: "Peking University",
    country: "China",
    university: "Peking University",
    category: "Merit-based",
    degreeLevel: "Undergraduate",
    fundingType: "Partially Funded",
    amount: "Partial tuition coverage and living stipend",
    deadline: "2026-03-31",
    eligibilityCriteria: [
      "Outstanding academic performance in secondary school",
      "Excellent Chinese language score (HSK 5+)"
    ],
    requiredDocuments: [
      "Transcripts",
      "Recommendation letter",
      "HSK qualification"
    ],
    providerLink: "https://www.pku.edu.cn/",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "UAEU PhD Scholarship",
    description: "Highly selective program to attract top PhD students to conduct research in core areas.",
    provider: "United Arab Emirates University",
    country: "UAE",
    university: "United Arab Emirates University",
    category: "Merit-based",
    degreeLevel: "PhD",
    fundingType: "Fully Funded",
    amount: "Full tuition, monthly stipend, housing, and research travel support",
    deadline: "2026-10-31",
    eligibilityCriteria: [
      "Master's degree with high research track record",
      "GPA of 3.5/4.0 or equivalent"
    ],
    requiredDocuments: [
      "Research plan",
      "Publications list",
      "Three letters of recommendation"
    ],
    providerLink: "https://www.uaeu.ac.ae/",
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

module.exports = scholarshipsData;
