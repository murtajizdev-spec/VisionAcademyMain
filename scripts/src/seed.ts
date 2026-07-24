import { db, coursesTable, facultyTable, testimonialsTable, blogsTable, eventsTable, galleryTable, resultsTable, faqsTable, usersTable } from "@workspace/db";
import bcrypt from "bcryptjs";

async function seed() {
  console.log("Seeding database...");

  // Admin user
  const existing = await db.select().from(usersTable).limit(1);
  if (existing.length === 0) {
    const hash = await bcrypt.hash("admin123", 10);
    await db.insert(usersTable).values({ name: "Admin", email: "admin@visionprep.pk", password: hash, role: "admin" });
    console.log("Created admin user: admin@visionprep.pk / admin123");
  }

  // Courses
  const courseCount = await db.select().from(coursesTable).limit(1);
  if (courseCount.length === 0) {
    await db.insert(coursesTable).values([
      { title: "9th Class Complete Preparation", slug: "9th-class", category: "school", description: "Comprehensive coaching for 9th class Federal Board students. All subjects covered with expert faculty.", overview: "Our 9th class program covers all Federal Board subjects including Physics, Chemistry, Biology, Mathematics, English, and Urdu. Expert faculty with proven track records.", subjects: "Physics, Chemistry, Biology, Mathematics, English, Urdu, Islamiat, Pak Studies", duration: "10 Months", fee: "PKR 3,500/month", schedule: "Mon-Fri 5:00 PM – 8:00 PM", featured: true, sortOrder: 1 },
      { title: "10th Class Board Preparation", slug: "10th-class", category: "school", description: "Result-oriented preparation for SSC Part II Federal Board with special focus on high scoring techniques.", overview: "SSC Part II complete preparation with mock tests, past papers, and board examination strategies.", subjects: "Physics, Chemistry, Biology, Mathematics, English, Urdu, Islamiat, Pak Studies", duration: "10 Months", fee: "PKR 3,500/month", schedule: "Mon-Fri 5:00 PM – 8:00 PM", featured: true, sortOrder: 2 },
      { title: "1st Year (HSSC-I) Coaching", slug: "1st-year", category: "college", description: "Intensive HSSC Part I coaching for Pre-Medical and Pre-Engineering students.", overview: "Designed for students choosing Pre-Medical (Physics, Chemistry, Biology) or Pre-Engineering (Physics, Chemistry, Math) streams.", subjects: "Physics, Chemistry, Biology / Mathematics, English", duration: "10 Months", fee: "PKR 4,000/month", schedule: "Mon-Fri 5:00 PM – 8:30 PM", featured: true, sortOrder: 3 },
      { title: "2nd Year (HSSC-II) Coaching", slug: "2nd-year", category: "college", description: "Advanced preparation for HSSC Part II with board examination focus and entry test preparation.", overview: "Comprehensive HSSC-II program with simultaneous preparation for MDCAT and ECAT entry tests.", subjects: "Physics, Chemistry, Biology / Mathematics, English", duration: "10 Months", fee: "PKR 4,500/month", schedule: "Mon-Fri 5:00 PM – 8:30 PM", featured: true, sortOrder: 4 },
      { title: "MDCAT Complete Preparation", slug: "mdcat", category: "entry-test", description: "Pakistan's most comprehensive MDCAT preparation program with 94% success rate.", overview: "Full-length MDCAT prep covering Biology, Chemistry, Physics, and English with 1000+ practice questions.", subjects: "Biology, Chemistry, Physics, English", duration: "6 Months", fee: "PKR 8,000/month", schedule: "Daily 4:00 PM – 8:00 PM", featured: true, sortOrder: 5 },
      { title: "ECAT Engineering Entry Test", slug: "ecat", category: "entry-test", description: "Specialized ECAT preparation for top engineering universities across Pakistan.", overview: "Complete ECAT preparation for UET, NUST, PIEAS, and other top engineering universities.", subjects: "Physics, Chemistry, Mathematics, English", duration: "6 Months", fee: "PKR 7,500/month", schedule: "Daily 4:00 PM – 8:00 PM", featured: true, sortOrder: 6 },
      { title: "NUMS Test Preparation", slug: "nums", category: "entry-test", description: "Dedicated NUMS (National University of Medical Sciences) entry test coaching.", overview: "Targeted preparation for NUMS entry test with focus on biology and chemistry.", subjects: "Biology, Chemistry, Physics, English, Logical Reasoning", duration: "4 Months", fee: "PKR 6,500/month", schedule: "Weekends + Weekdays 6:00 PM – 8:00 PM", featured: false, sortOrder: 7 },
      { title: "NTS Test Preparation", slug: "nts", category: "competitive", description: "Complete NTS preparation for government jobs and admissions.", subjects: "Verbal, Quantitative, Analytical Reasoning", duration: "3 Months", fee: "PKR 5,000/month", schedule: "Weekends 10:00 AM – 2:00 PM", featured: false, sortOrder: 8 },
      { title: "PPSC/FPSC Exam Preparation", slug: "ppsc-fpsc", category: "competitive", description: "Comprehensive CSS, PPSC, and FPSC preparation for civil services aspirants.", subjects: "General Knowledge, Pakistan Studies, Current Affairs, English, Islamic Studies", duration: "6 Months", fee: "PKR 6,000/month", schedule: "Mon-Fri 7:00 PM – 9:00 PM", featured: false, sortOrder: 9 },
    ]);
    console.log("Courses seeded");
  }

  // Faculty
  const facultyCount = await db.select().from(facultyTable).limit(1);
  if (facultyCount.length === 0) {
    await db.insert(facultyTable).values([
      { name: "Prof. Ahmed Raza", subject: "Physics", qualification: "M.Sc Physics, Quaid-e-Azam University", experience: "15 years teaching experience, Ex-Federal Board examiner", bio: "Prof. Ahmed has produced over 200 top position holders in board exams. His unique teaching methodology makes complex physics concepts crystal clear.", featured: true, sortOrder: 1 },
      { name: "Dr. Fatima Khan", subject: "Chemistry", qualification: "Ph.D Chemistry, University of Punjab", experience: "12 years, MDCAT specialist", bio: "Dr. Fatima's chemistry classes are legendary in Islamabad. Her students consistently score above 95% in both board and entry tests.", featured: true, sortOrder: 2 },
      { name: "Sir Bilal Hussain", subject: "Mathematics", qualification: "M.Sc Mathematics, COMSATS University", experience: "10 years, ECAT specialist", bio: "Sir Bilal transforms mathematics from a fear into a superpower. His problem-solving techniques are used across top academies.", featured: true, sortOrder: 3 },
      { name: "Ma'am Sana Malik", subject: "Biology", qualification: "M.Sc Zoology, University of Agriculture", experience: "8 years, MDCAT biology expert", bio: "Ma'am Sana's biology notes are a goldmine. Her students achieve near-perfect scores in MDCAT biology section.", featured: true, sortOrder: 4 },
      { name: "Sir Hassan Naqvi", subject: "English", qualification: "M.A English Literature, International Islamic University", experience: "11 years, Cambridge certified", bio: "Sir Hassan makes English easy and enjoyable. His grammar and essay techniques have helped hundreds ace their English papers.", featured: true, sortOrder: 5 },
      { name: "Ma'am Rabia Aslam", subject: "Pakistan Studies & Islamiat", qualification: "M.A History, Quaid-e-Azam University", experience: "9 years, Federal Board specialist", bio: "Ma'am Rabia's comprehensive notes cover every detail of the Federal Board syllabus. Her students rarely score below A grade.", featured: false, sortOrder: 6 },
    ]);
    console.log("Faculty seeded");
  }

  // Testimonials
  const testCount = await db.select().from(testimonialsTable).limit(1);
  if (testCount.length === 0) {
    await db.insert(testimonialsTable).values([
      { studentName: "Muhammad Usman", course: "MDCAT Preparation", content: "Vision Prep changed my life. I scored 1024/1100 in MDCAT after joining their program. The faculty is exceptional and the study environment is unmatched anywhere in Islamabad.", rating: 5, year: "2024", featured: true },
      { studentName: "Ayesha Tariq", course: "10th Class", content: "I got A+ in all subjects in Federal Board thanks to Vision Prep. Sir Ahmed's physics classes are just amazing. Highly recommended for all matric students!", rating: 5, year: "2024", featured: true },
      { studentName: "Ali Hassan", course: "ECAT Preparation", content: "Cleared ECAT with 87 percentile and got admission in UET Lahore. The mathematics classes by Sir Bilal are phenomenal. Best investment I ever made!", rating: 5, year: "2023", featured: true },
      { studentName: "Fatima Zahra", course: "1st Year", content: "Scored 1030 marks out of 1100 in HSSC-I. Vision Prep's structured approach and past paper sessions made all the difference. Forever grateful!", rating: 5, year: "2024", featured: true },
      { studentName: "Hamza Sheikh", course: "NUMS Test", content: "Got admission in Army Medical College through NUMS. The dedicated coaching and mock tests at Vision Prep prepared me perfectly for the actual exam.", rating: 5, year: "2023", featured: true },
      { studentName: "Zainab Mir", course: "9th Class", content: "Topped my school in Federal Board 9th class exams. The notes, practice tests, and teacher support at Vision Prep are world-class.", rating: 5, year: "2024", featured: true },
    ]);
    console.log("Testimonials seeded");
  }

  // Results
  const resultCount = await db.select().from(resultsTable).limit(1);
  if (resultCount.length === 0) {
    await db.insert(resultsTable).values([
      { studentName: "Muhammad Usman Khan", class: "MDCAT 2024", year: "2024", marks: "1024", percentage: "93.1%", position: "1st Position - Islamabad Region", board: "PMDC" },
      { studentName: "Ayesha Tariq Butt", class: "SSC-II (10th)", year: "2024", marks: "1082", percentage: "98.4%", position: "1st Position - School", board: "Federal Board" },
      { studentName: "Ali Hassan Raza", class: "ECAT 2023", year: "2023", marks: "87 percentile", percentage: "87%", position: "Top 5% Nationally", board: "UET" },
      { studentName: "Fatima Zahra Naqvi", class: "HSSC-I (11th)", year: "2024", marks: "1030", percentage: "93.6%", position: "A+ Grade - School Topper", board: "Federal Board" },
      { studentName: "Hamza Sheikh", class: "NUMS 2023", year: "2023", marks: "175", percentage: "92.1%", position: "AMC Islamabad Admission", board: "NUMS" },
      { studentName: "Zainab Mir Ahmed", class: "SSC-I (9th)", year: "2024", marks: "1065", percentage: "96.8%", position: "District 3rd Position", board: "Federal Board" },
    ]);
    console.log("Results seeded");
  }

  // Blog posts
  const blogCount = await db.select().from(blogsTable).limit(1);
  if (blogCount.length === 0) {
    await db.insert(blogsTable).values([
      { title: "MDCAT 2024: Complete Preparation Strategy", slug: "mdcat-2024-preparation-strategy", excerpt: "A comprehensive guide to scoring 1000+ in MDCAT 2024. Learn the most effective preparation strategies from our top-scoring students.", content: "MDCAT preparation requires a structured approach. Start with understanding the syllabus completely, then focus on strong conceptual learning before moving to practice questions.\n\nKey areas to focus on:\n1. Biology: Cell biology, genetics, and human physiology are the highest-weight areas\n2. Chemistry: Organic chemistry and biochemistry overlap significantly with MDCAT biology\n3. Physics: Electricity, magnetism, and modern physics\n4. English: Reading comprehension and vocabulary\n\nPractice 100+ MCQs daily from past papers. Take full-length mock tests under timed conditions every two weeks.", category: "Tips & Strategies", tags: "MDCAT,Medical,Pakistan,Entry Test", featured: true, published: true, publishedAt: new Date("2024-03-15") },
      { title: "Federal Board vs Matric Board: Which is Better?", slug: "federal-board-vs-matric-board", excerpt: "Students often wonder whether to choose Federal Board or Provincial Board. Here is our comprehensive comparison to help you decide.", content: "The choice between Federal Board and Provincial Board is crucial for Pakistani students. Each has its advantages depending on your future goals.\n\nFederal Board advantages:\n- Recognized nationwide and internationally\n- Standard syllabus consistent with top universities\n- Better preparation for competitive exams\n\nProvincial Board advantages:\n- Can be easier in some provinces\n- Local university admission preferences\n\nFor students aiming for MDCAT, ECAT, or competitive exams, Federal Board is strongly recommended.", category: "Education", tags: "Federal Board,Education,Pakistan,Matric", featured: true, published: true, publishedAt: new Date("2024-02-20") },
      { title: "Top 10 Tips for SSC Board Exams", slug: "top-10-tips-ssc-board-exams", excerpt: "Practical, proven tips from our experienced faculty to help SSC students maximize their marks in Federal Board examinations.", content: "Getting excellent marks in SSC board exams requires both smart work and hard work. Here are the top 10 tips:\n\n1. Start preparation 6 months before exams\n2. Complete past 5 years papers at least twice\n3. Focus on frequently asked questions\n4. Make concise notes for revision\n5. Practice numerical problems daily\n6. Study in short focused sessions\n7. Join a quality coaching center\n8. Sleep properly during exam season\n9. Eat healthy and exercise\n10. Stay positive and confident\n\nThese tips, combined with quality coaching at Vision Prep, can help you achieve top grades.", category: "Tips & Strategies", tags: "SSC,Board Exams,Study Tips,Pakistan", featured: false, published: true, publishedAt: new Date("2024-01-10") },
    ]);
    console.log("Blogs seeded");
  }

  // Events
  const eventCount = await db.select().from(eventsTable).limit(1);
  if (eventCount.length === 0) {
    await db.insert(eventsTable).values([
      { title: "MDCAT Mock Test Series 2024", description: "Full-length MDCAT mock test in exam conditions. Get your score analyzed and personalized feedback from our expert faculty. Free for enrolled students.", eventDate: new Date("2024-08-15T14:00:00"), location: "Vision Prep Main Campus, Islamabad", type: "upcoming", registrationLink: "#" },
      { title: "Annual Results Celebration & Awards", description: "Celebrating our top position holders of 2024! Join us for the annual ceremony where we honor our brilliant students and their achievements.", eventDate: new Date("2024-09-01T17:00:00"), location: "Pakistan National Council of Arts, Islamabad", type: "upcoming" },
      { title: "Free Orientation Session for 9th Class", description: "Comprehensive orientation for students entering 9th class. Learn about our teaching methodology, schedule, and get to meet our faculty.", eventDate: new Date("2024-07-25T10:00:00"), location: "Vision Prep Main Campus, Islamabad", type: "upcoming", registrationLink: "#" },
      { title: "ECAT Workshop 2024", description: "Intensive two-day ECAT workshop covering advanced mathematics and physics problem-solving techniques.", eventDate: new Date("2024-06-10T09:00:00"), location: "Vision Prep Campus", type: "past" },
    ]);
    console.log("Events seeded");
  }

  // FAQs
  const faqCount = await db.select().from(faqsTable).limit(1);
  if (faqCount.length === 0) {
    await db.insert(faqsTable).values([
      { question: "What are the timings for evening classes?", answer: "Our evening classes run from 5:00 PM to 8:30 PM, Monday through Friday. Saturday classes are also available for intensive revision sessions. The exact timings vary by course level.", category: "Schedule", sortOrder: 1 },
      { question: "How much is the monthly fee?", answer: "Fees vary by course: 9th/10th class costs PKR 3,500/month, 1st Year PKR 4,000/month, 2nd Year PKR 4,500/month, MDCAT PKR 8,000/month, and ECAT PKR 7,500/month. Scholarship options are available for deserving students.", category: "Fees", sortOrder: 2 },
      { question: "Do you provide study material?", answer: "Yes, we provide comprehensive study materials including custom notes compiled by our faculty, past papers with solutions, topic-wise MCQ banks, and monthly mock tests. All material is included in the fee.", category: "Academics", sortOrder: 3 },
      { question: "What is the batch size?", answer: "We maintain small batch sizes of 25-30 students per class to ensure personalized attention from our faculty. This allows teachers to track each student's progress individually.", category: "Academics", sortOrder: 4 },
      { question: "Is there a scholarship program?", answer: "Yes! We offer merit-based scholarships for students who scored A+ in their previous board exams, and need-based scholarships for deserving students. Contact our admission office for details.", category: "Admissions", sortOrder: 5 },
      { question: "Can I join mid-session?", answer: "Yes, we accept students mid-session subject to seat availability. Our faculty provides extra support to help new students catch up with the course material quickly.", category: "Admissions", sortOrder: 6 },
      { question: "What is your success rate?", answer: "We are proud of our 94% success rate in board examinations and entry tests. Over 200 of our students have achieved 1st position in their respective examinations in the past 5 years.", category: "Results", sortOrder: 7 },
      { question: "Do you offer online classes?", answer: "We primarily offer in-person classes as we believe face-to-face interaction is most effective for learning. However, recorded lectures are available for students who miss classes.", category: "Academics", sortOrder: 8 },
    ]);
    console.log("FAQs seeded");
  }

  // Gallery
  const galleryCount = await db.select().from(galleryTable).limit(1);
  if (galleryCount.length === 0) {
    await db.insert(galleryTable).values([
      { title: "Main Campus Building", imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=800", category: "campus" },
      { title: "Modern Computer Lab", imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800", category: "classroom" },
      { title: "Annual Results Ceremony", imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800", category: "events" },
      { title: "Student Study Area", imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800", category: "library" },
      { title: "Graduation Ceremony 2023", imageUrl: "https://images.unsplash.com/photo-1627556592933-e5b7b8f56ea7?w=800", category: "graduation" },
      { title: "Physics Lab Session", imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800", category: "classroom" },
    ]);
    console.log("Gallery seeded");
  }

  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });
