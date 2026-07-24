/**
 * Seed script — creates admin account + populates all content tables
 * Run: node scripts/seed.mjs
 */

const BASE = "http://localhost:8080/api";

async function api(method, path, body, token) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status}: ${JSON.stringify(data)}`);
  return data;
}

// ── 1. Admin account ──────────────────────────────────────────────────────────

let token;
try {
  const reg = await api("POST", "/auth/register", {
    name: "Admin",
    email: "admin@visionprep.com",
    password: "VisionAdmin@2025",
    role: "admin",
  });
  token = reg.token;
  console.log("✓ Admin account created");
} catch {
  // Already exists — log in
  const login = await api("POST", "/auth/login", {
    email: "admin@visionprep.com",
    password: "VisionAdmin@2025",
  });
  token = login.token;
  console.log("✓ Admin account already exists — logged in");
}

// ── 2. Courses ────────────────────────────────────────────────────────────────

const courses = [
  {
    title: "Matric & Secondary Preparation",
    slug: "matric-secondary",
    category: "school",
    description:
      "Comprehensive coaching for Class 9 & 10 students covering all core subjects with a strong focus on board exam excellence.",
    overview:
      "Our Matric program gives students a thorough grounding in every examinable subject. Small batch sizes ensure personal attention from experienced teachers.",
    subjects: "Mathematics, Physics, Chemistry, Biology, English, Urdu",
    duration: "10 Months",
    fee: "Rs. 2,500/month",
    schedule: "Evening: 5pm–8pm (Mon–Sat)",
    featured: true,
    sortOrder: 1,
  },
  {
    title: "Intermediate — FSc / FA / ICS",
    slug: "intermediate-fsc-fa-ics",
    category: "college",
    description:
      "Expert coaching for Part I & II students targeting top board marks in Physics, Chemistry, Biology, Maths, and Computer Science.",
    overview:
      "Taught by experienced lecturers, this program covers the full Intermediate syllabus with regular tests and extensive past-paper practice.",
    subjects: "Physics, Chemistry, Biology, Mathematics, Computer Science, English",
    duration: "12 Months",
    fee: "Rs. 3,000/month",
    schedule: "Evening: 5pm–8:30pm (Mon–Sat)",
    featured: true,
    sortOrder: 2,
  },
  {
    title: "Entry Test Preparation — MDCAT / ECAT",
    slug: "entry-test-mdcat-ecat",
    category: "entry-test",
    description:
      "Intensive preparation for MDCAT and ECAT with thousands of MCQs, past papers, and weekly mock tests.",
    overview:
      "Our students consistently rank in the top percentile. The program includes full-length timed mock exams and personalised performance analytics.",
    subjects: "Biology, Chemistry, Physics, Mathematics, English and Logical Reasoning",
    duration: "6 Months",
    fee: "Rs. 4,500/month",
    schedule: "Morning (9am–12pm) and Evening (5pm–8pm) batches available",
    featured: true,
    sortOrder: 3,
  },
  {
    title: "CSS / PMS Competitive Exam Coaching",
    slug: "css-pms-competitive",
    category: "competitive",
    description:
      "Structured coaching for aspirants targeting CSS, PMS, and other civil service examinations.",
    overview:
      "Led by former civil servants and seasoned educators, this program covers essay writing, current affairs, and all compulsory and optional subjects.",
    subjects: "Essay, Precis, Current Affairs, Pakistan Affairs, Islamic Studies, Optional Subjects",
    duration: "18 Months",
    fee: "Rs. 5,000/month",
    schedule: "Evening: 6pm–9pm (Mon–Fri)",
    featured: false,
    sortOrder: 4,
  },
];

for (const c of courses) {
  try {
    await api("POST", "/admin/courses", c, token);
    console.log(`  ✓ Course: ${c.title}`);
  } catch (e) {
    console.log(`  ⚠ Course skipped (${c.slug}): ${e.message}`);
  }
}

// ── 3. Faculty ────────────────────────────────────────────────────────────────

const faculty = [
  {
    name: "Prof. Muhammad Asif",
    subject: "Mathematics",
    qualification: "M.Sc Mathematics, B.Ed",
    experience: "15 years",
    bio: "A passionate mathematician with 15 years of experience teaching Matric and Intermediate students. Known for making complex concepts simple and exam-ready.",
    featured: true,
    sortOrder: 1,
  },
  {
    name: "Dr. Ayesha Siddiqui",
    subject: "Biology & Chemistry",
    qualification: "PhD Biochemistry, MBBS",
    experience: "12 years",
    bio: "Former NUMS lecturer, Dr. Ayesha has coached hundreds of successful MDCAT students and brings clinical insight to every class.",
    featured: true,
    sortOrder: 2,
  },
  {
    name: "Mr. Tariq Mahmood",
    subject: "Physics",
    qualification: "M.Sc Physics, MS Education",
    experience: "10 years",
    bio: "Expert in ECAT and Matric Physics, renowned for his unique conceptual approach and exam strategy sessions that boost scores significantly.",
    featured: true,
    sortOrder: 3,
  },
  {
    name: "Ms. Sana Khalid",
    subject: "English & Essay Writing",
    qualification: "MA English Literature, CELTA Certified",
    experience: "8 years",
    bio: "Specialist in CSS essay writing and Intermediate English. Ms. Sana has helped dozens of CSS finalists sharpen their written communication skills.",
    featured: true,
    sortOrder: 4,
  },
  {
    name: "Mr. Bilal Hussain",
    subject: "Computer Science & ICS",
    qualification: "BS Computer Science, M.Phil",
    experience: "7 years",
    bio: "An industry professional turned educator, Bilal brings real-world programming experience to ICS and A-Level Computer Science coaching.",
    featured: false,
    sortOrder: 5,
  },
];

for (const f of faculty) {
  try {
    await api("POST", "/admin/faculty", f, token);
    console.log(`  ✓ Faculty: ${f.name}`);
  } catch (e) {
    console.log(`  ⚠ Faculty skipped (${f.name}): ${e.message}`);
  }
}

// ── 4. Testimonials ───────────────────────────────────────────────────────────

const testimonials = [
  {
    studentName: "Hira Fatima",
    course: "Entry Test Preparation — MDCAT",
    content:
      "VisionPrep changed my life. I scored 182/200 in MDCAT after just 5 months of coaching here. The mock tests and MCQ sessions are incredibly effective!",
    rating: 5,
    year: "2025",
    featured: true,
  },
  {
    studentName: "Ahmed Raza",
    course: "Intermediate — FSc Part II",
    content:
      "I went from 65% to 89% in my board exams after enrolling at VisionPrep. The teachers genuinely care about your progress and give personal attention.",
    rating: 5,
    year: "2025",
    featured: true,
  },
  {
    studentName: "Zainab Noor",
    course: "CSS Competitive Exam Coaching",
    content:
      "Cleared CSS on my first attempt thanks to the structured program here. The current affairs and essay modules are outstanding.",
    rating: 5,
    year: "2024",
    featured: true,
  },
  {
    studentName: "Usman Tariq",
    course: "Matric Preparation",
    content:
      "I always struggled with Maths and Physics but VisionPrep teachers broke down every concept clearly. Got A-1 grade in my board exams!",
    rating: 5,
    year: "2025",
    featured: false,
  },
  {
    studentName: "Mahnoor Sheikh",
    course: "ECAT Preparation",
    content:
      "Joined VisionPrep two months before ECAT and managed to qualify for UET Lahore. The past paper sessions were extremely helpful.",
    rating: 4,
    year: "2024",
    featured: false,
  },
];

for (const t of testimonials) {
  try {
    await api("POST", "/admin/testimonials", t, token);
    console.log(`  ✓ Testimonial: ${t.studentName}`);
  } catch (e) {
    console.log(`  ⚠ Testimonial skipped: ${e.message}`);
  }
}

// ── 5. FAQs ───────────────────────────────────────────────────────────────────

const faqs = [
  {
    question: "What are the timings for evening classes?",
    answer:
      "All classes run Monday to Saturday from 5:00 PM to 8:30 PM. MDCAT/ECAT batches also have a morning slot from 9:00 AM to 12:00 PM.",
    category: "general",
    sortOrder: 1,
  },
  {
    question: "What is the fee structure and how is it paid?",
    answer:
      "Fees vary by program: Matric Rs. 2,500/month, Intermediate Rs. 3,000/month, MDCAT/ECAT Rs. 4,500/month, and CSS/PMS Rs. 5,000/month. Fees are collected monthly in advance. A one-time registration fee of Rs. 1,000 applies.",
    category: "fees",
    sortOrder: 2,
  },
  {
    question: "How do I apply for admission?",
    answer:
      "Fill in the online Admissions form on our website or visit our campus in person. Our admissions team will call you within 24 hours to confirm your slot and schedule a free counselling session.",
    category: "admissions",
    sortOrder: 3,
  },
  {
    question: "Is there a free trial class available?",
    answer:
      "Yes! Every new student is welcome to attend one free demo class in any subject before enrolling. This helps you evaluate the teaching quality before making a commitment.",
    category: "general",
    sortOrder: 4,
  },
  {
    question: "How many students are in each batch?",
    answer:
      "We keep batch sizes small — a maximum of 20 students per class — to ensure every student receives personal attention from the teacher.",
    category: "general",
    sortOrder: 5,
  },
  {
    question: "Do you provide study material?",
    answer:
      "Yes. All enrolled students receive printed notes, past papers, and MCQ booklets prepared by our faculty. MDCAT/ECAT students also get access to our online question bank.",
    category: "general",
    sortOrder: 6,
  },
  {
    question: "Are there scholarships available for deserving students?",
    answer:
      "VisionPrep offers a 50% fee waiver for students who score 90% or above in their previous board examination. Merit-based scholarships are also available for students who excel in internal monthly tests.",
    category: "fees",
    sortOrder: 7,
  },
  {
    question: "What boards and exams do you prepare students for?",
    answer:
      "We prepare students for Lahore Board, Punjab Board, FBISE, MDCAT (PMC), ECAT (UET), NTS, CSS, and PMS examinations.",
    category: "general",
    sortOrder: 8,
  },
];

for (const f of faqs) {
  try {
    await api("POST", "/admin/faqs", f, token);
    console.log(`  ✓ FAQ: ${f.question.slice(0, 50)}...`);
  } catch (e) {
    console.log(`  ⚠ FAQ skipped: ${e.message}`);
  }
}

// ── 6. Results / Toppers ──────────────────────────────────────────────────────

const results = [
  {
    studentName: "Hira Fatima",
    class: "MDCAT",
    year: "2025",
    marks: "182/200",
    percentage: "91%",
    position: "1st in Batch",
    board: "PMC",
  },
  {
    studentName: "Hamza Ali",
    class: "FSc Part II",
    year: "2025",
    marks: "1080/1100",
    percentage: "98.2%",
    position: "District Topper",
    board: "BISE Lahore",
  },
  {
    studentName: "Fatima Malik",
    class: "Matric",
    year: "2025",
    marks: "1050/1050",
    percentage: "100%",
    position: "School Topper",
    board: "BISE Lahore",
  },
  {
    studentName: "Zainab Noor",
    class: "CSS",
    year: "2024",
    marks: "First Attempt",
    percentage: "Qualified",
    position: "CSS Officer",
    board: "FPSC",
  },
  {
    studentName: "Omar Shahid",
    class: "ECAT",
    year: "2024",
    marks: "375/400",
    percentage: "93.75%",
    position: "UET Lahore — Civil Engineering",
    board: "UET",
  },
];

for (const r of results) {
  try {
    await api("POST", "/admin/results", r, token);
    console.log(`  ✓ Result: ${r.studentName}`);
  } catch (e) {
    console.log(`  ⚠ Result skipped: ${e.message}`);
  }
}

// ── 7. Events ─────────────────────────────────────────────────────────────────

const events = [
  {
    title: "Free MDCAT Orientation Seminar",
    description:
      "Join us for a free 3-hour seminar covering the updated PMC MDCAT syllabus, exam strategy, and common mistakes to avoid. Seats are limited.",
    eventDate: new Date("2026-08-10T10:00:00Z").toISOString(),
    location: "VisionPrep Main Campus, Lahore",
    type: "upcoming",
    registrationLink: "/admissions",
  },
  {
    title: "Annual Prize Distribution Ceremony",
    description:
      "Celebrating our top achievers of 2025 — board toppers, MDCAT/ECAT qualifiers, and CSS/PMS successful candidates will be honoured.",
    eventDate: new Date("2026-07-01T14:00:00Z").toISOString(),
    location: "VisionPrep Auditorium, Lahore",
    type: "past",
  },
  {
    title: "New Batch Admissions — August 2026",
    description:
      "Admissions are now open for Matric, Intermediate, MDCAT/ECAT, and CSS/PMS batches starting August 2026. Early birds get a 10% discount on the first month.",
    eventDate: new Date("2026-08-01T08:00:00Z").toISOString(),
    location: "All VisionPrep Campuses",
    type: "registration",
    registrationLink: "/admissions",
  },
];

for (const e of events) {
  try {
    await api("POST", "/admin/events", e, token);
    console.log(`  ✓ Event: ${e.title}`);
  } catch (e2) {
    console.log(`  ⚠ Event skipped: ${e2.message}`);
  }
}

// ── 8. Blog Posts ─────────────────────────────────────────────────────────────

const blogs = [
  {
    title: "How to Score 90%+ in Matric Board Exams: A Complete Guide",
    slug: "how-to-score-90-percent-matric-board",
    excerpt:
      "Consistent students who follow the right strategy can score 90% or above in Matric board exams. Here is our tried-and-tested roadmap.",
    content: `Scoring 90% or above in Matric board exams is an achievable goal for any student who is willing to work smart. Over the years, VisionPrep teachers have mentored hundreds of top scorers. Here is the strategy that works.

**Start early and be consistent**

The biggest differentiator between average and top students is not raw intelligence — it is consistency. Begin your serious preparation at least six months before the exam. Study for 3–4 hours every day rather than cramming at the last minute.

**Master the pattern**

Board exams follow a predictable format. Solve at least five years of past papers for every subject. You will notice that certain types of questions are repeated with minor variations. Practice answering them within the allotted time.

**Focus on weak subjects first**

Most students spend more time on subjects they already know. Flip this — identify your weakest subject and dedicate extra hours to it. A single weak subject can drag your overall percentage from 90% down to 82%.

**Use short notes and mind maps**

Create a one-page summary of every chapter. Review these summaries weekly. By exam time, you will have internalised the key concepts and definitions without any last-minute panic.

**Join a coaching centre**

Self-study has limits. A structured coaching programme provides guided practice, expert feedback, and the accountability that solo study lacks. At VisionPrep, our teachers hold weekly tests that mirror actual board exam conditions.

**Take care of your health**

Sleep, exercise, and a balanced diet directly affect memory and concentration. Do not sacrifice sleep for extra study hours during the final weeks — well-rested students consistently outperform exhausted ones.`,
    category: "Study Tips",
    tags: "matric,board exams,study tips,Pakistan",
    published: true,
    featured: true,
    publishedAt: new Date("2026-07-01T08:00:00Z").toISOString(),
  },
  {
    title: "MDCAT 2026: Everything You Need to Know",
    slug: "mdcat-2026-complete-guide",
    excerpt:
      "PMC has announced key updates to the MDCAT 2026 format. Here is a full breakdown of the syllabus, marking scheme, and the best preparation strategy.",
    content: `The Medical and Dental College Admission Test (MDCAT) is the gateway to Pakistan's top medical colleges. Here is everything you need to know about MDCAT 2026.

**Test format**

MDCAT 2026 consists of 210 multiple-choice questions to be answered in 3.5 hours:
- Biology: 68 questions
- Chemistry: 54 questions
- Physics: 54 questions
- English: 18 questions
- Logical Reasoning: 16 questions

Each correct answer earns 1 mark. There is no negative marking in 2026.

**Syllabus changes for 2026**

PMC has reinstated some FSc topics that were removed in previous years. Download the official PMC MDCAT 2026 syllabus from the PMC website and cross-check it with your study material before you begin.

**When to start preparing**

Ideally, you should begin MDCAT preparation alongside your FSc Part II studies. Students who start early have time to revise the entire syllabus at least three times before the test. Joining a structured programme from January gives you around seven months of preparation time.

**The VisionPrep advantage**

Our MDCAT programme includes:
- 5,000+ topic-wise MCQs
- Weekly full-length timed mock exams
- One-on-one feedback sessions
- Personalised weak-area reports
- Past MDCAT paper analysis

Students who complete our full programme and attempt all mock tests achieve an average score of 176/200.

**Final month strategy**

In the last four weeks, attempt one full mock test every three days. Review every incorrect answer — do not move on until you understand why you got it wrong. Prioritise Biology (it carries the most marks) and Physics (typically the hardest section).`,
    category: "Entry Tests",
    tags: "MDCAT,medical,PMC,entry test,Pakistan",
    published: true,
    featured: false,
    publishedAt: new Date("2026-07-10T08:00:00Z").toISOString(),
  },
];

for (const b of blogs) {
  try {
    await api("POST", "/admin/blogs", b, token);
    console.log(`  ✓ Blog: ${b.title}`);
  } catch (e) {
    console.log(`  ⚠ Blog skipped: ${e.message}`);
  }
}

// ── 9. Gallery ────────────────────────────────────────────────────────────────

const gallery = [
  {
    title: "Main Classroom — Matric Batch",
    imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800",
    category: "classroom",
  },
  {
    title: "Campus Library",
    imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800",
    category: "library",
  },
  {
    title: "Annual Prize Distribution 2025",
    imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800",
    category: "events",
  },
  {
    title: "Students at Campus",
    imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800",
    category: "students",
  },
];

for (const g of gallery) {
  try {
    await api("POST", "/admin/gallery", g, token);
    console.log(`  ✓ Gallery: ${g.title}`);
  } catch (e) {
    console.log(`  ⚠ Gallery skipped: ${e.message}`);
  }
}

console.log("\n✅ Seeding complete!");
console.log("\n─────────────────────────────────────");
console.log("Admin login credentials:");
console.log("  Email:    admin@visionprep.com");
console.log("  Password: VisionAdmin@2025");
console.log("  URL:      /admin");
console.log("─────────────────────────────────────");
