/* =========================================================
   Site content — edit this file to change programs, classes,
   trainers, prices and reviews. Each text has { ar, en }.
   Images: replace the URLs with your own photos (e.g. images/xxx.jpg).
   ========================================================= */

const img = (id, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

const PROGRAMS = [
  { image: img("photo-1581009146145-b5ef050c2e1e"), sessions: 4,
    title: { ar: "تدريب القوة", en: "Strength Training" },
    level: { ar: "كل المستويات", en: "All levels" },
    text: { ar: "بناء العضلات وزيادة القوة ببرنامج أوزان مدروس.", en: "Build muscle and raw strength with a structured lifting plan." } },
  { image: img("photo-1517836357463-d25dfeac3438"), sessions: 3,
    title: { ar: "كروس فيت", en: "CrossFit" },
    level: { ar: "متوسط – متقدم", en: "Intermediate – Advanced" },
    text: { ar: "تمارين عالية الشدة تجمع القوة والتحمّل والسرعة.", en: "High-intensity workouts combining strength, stamina and speed." } },
  { image: img("photo-1571019613454-1cb2f99b2d8b"), sessions: 5,
    title: { ar: "كارديو و HIIT", en: "Cardio & HIIT" },
    level: { ar: "كل المستويات", en: "All levels" },
    text: { ar: "حرق دهون سريع وتحسين لياقة القلب في وقت قصير.", en: "Burn fat fast and boost heart fitness in less time." } },
  { image: img("photo-1549719386-74dfcbf7dbed"), sessions: 3,
    title: { ar: "ملاكمة", en: "Boxing" },
    level: { ar: "مبتدئ – متقدم", en: "Beginner – Advanced" },
    text: { ar: "تعلّم أساسيات الملاكمة وفرّغ طاقتك مع تمرين كامل للجسم.", en: "Learn boxing fundamentals with a full-body workout." } },
  { image: img("photo-1544367567-0f2fcb009e0b"), sessions: 2,
    title: { ar: "يوغا ومرونة", en: "Yoga & Mobility" },
    level: { ar: "كل المستويات", en: "All levels" },
    text: { ar: "مرونة وتوازن واسترخاء، وتقليل خطر الإصابات.", en: "Flexibility, balance and recovery that reduce injury risk." } },
  { image: img("photo-1534438327276-14e5300c3a48"), sessions: 3,
    title: { ar: "تدريب شخصي", en: "Personal Training" },
    level: { ar: "مخصّص لك", en: "Tailored to you" },
    text: { ar: "مدرب خاص وخطة مصمّمة لجسمك وهدفك بالتحديد.", en: "A private coach and a plan built for your body and goal." } }
];

const DAYS = [
  { ar: "السبت", en: "Sat" }, { ar: "الأحد", en: "Sun" }, { ar: "الإثنين", en: "Mon" },
  { ar: "الثلاثاء", en: "Tue" }, { ar: "الأربعاء", en: "Wed" }, { ar: "الخميس", en: "Thu" },
  { ar: "الجمعة", en: "Fri" }
];

// schedule[dayIndex] = list of classes
const SCHEDULE = [
  [
    { time: "07:00", dur: 45, name: { ar: "كارديو صباحي", en: "Morning Cardio" }, coach: 2, spots: 6 },
    { time: "10:00", dur: 60, name: { ar: "يوغا", en: "Yoga" }, coach: 3, spots: 0 },
    { time: "18:00", dur: 60, name: { ar: "كروس فيت", en: "CrossFit" }, coach: 0, spots: 4 },
    { time: "20:00", dur: 45, name: { ar: "ملاكمة", en: "Boxing" }, coach: 1, spots: 9 }
  ],
  [
    { time: "08:00", dur: 45, name: { ar: "HIIT", en: "HIIT" }, coach: 2, spots: 3 },
    { time: "17:00", dur: 60, name: { ar: "قوة للمبتدئين", en: "Beginner Strength" }, coach: 0, spots: 7 },
    { time: "19:30", dur: 60, name: { ar: "ملاكمة", en: "Boxing" }, coach: 1, spots: 2 }
  ],
  [
    { time: "07:00", dur: 45, name: { ar: "كارديو صباحي", en: "Morning Cardio" }, coach: 2, spots: 10 },
    { time: "12:00", dur: 60, name: { ar: "يوغا", en: "Yoga" }, coach: 3, spots: 5 },
    { time: "18:00", dur: 60, name: { ar: "كروس فيت", en: "CrossFit" }, coach: 0, spots: 0 },
    { time: "21:00", dur: 45, name: { ar: "HIIT مسائي", en: "Evening HIIT" }, coach: 2, spots: 8 }
  ],
  [
    { time: "09:00", dur: 60, name: { ar: "يوغا ومرونة", en: "Yoga & Mobility" }, coach: 3, spots: 6 },
    { time: "18:00", dur: 60, name: { ar: "ملاكمة", en: "Boxing" }, coach: 1, spots: 4 },
    { time: "20:00", dur: 60, name: { ar: "قوة متقدم", en: "Advanced Strength" }, coach: 0, spots: 3 }
  ],
  [
    { time: "07:00", dur: 45, name: { ar: "HIIT", en: "HIIT" }, coach: 2, spots: 9 },
    { time: "17:30", dur: 60, name: { ar: "كروس فيت", en: "CrossFit" }, coach: 0, spots: 5 },
    { time: "19:00", dur: 45, name: { ar: "يوغا مسائية", en: "Evening Yoga" }, coach: 3, spots: 7 }
  ],
  [
    { time: "10:00", dur: 90, name: { ar: "تحدي الخميس", en: "Thursday Challenge" }, coach: 0, spots: 12 },
    { time: "18:00", dur: 60, name: { ar: "ملاكمة", en: "Boxing" }, coach: 1, spots: 6 }
  ],
  [
    { time: "11:00", dur: 60, name: { ar: "يوغا عائلية", en: "Family Yoga" }, coach: 3, spots: 8 },
    { time: "17:00", dur: 45, name: { ar: "كارديو", en: "Cardio" }, coach: 2, spots: 10 }
  ]
];

const TRAINERS = [
  { image: img("photo-1567013127542-490d757e51fc", 600), years: 9,
    name: { ar: "كريم عادل", en: "Karim Adel" },
    role: { ar: "مدرب قوة وكروس فيت", en: "Strength & CrossFit Coach" } },
  { image: img("photo-1583454110551-21f2fa2afe61", 600), years: 7,
    name: { ar: "يوسف حسن", en: "Youssef Hassan" },
    role: { ar: "مدرب ملاكمة", en: "Boxing Coach" } },
  { image: img("photo-1594381898411-846e7d193883", 600), years: 6,
    name: { ar: "سارة محمود", en: "Sara Mahmoud" },
    role: { ar: "مدربة HIIT وكارديو", en: "HIIT & Cardio Coach" } },
  { image: img("photo-1518611012118-696072aa579a", 600), years: 8,
    name: { ar: "ليلى فؤاد", en: "Laila Fouad" },
    role: { ar: "مدربة يوغا ومرونة", en: "Yoga & Mobility Coach" } }
];

const PLANS = [
  { id: "basic", monthly: 600, popular: false,
    name: { ar: "الأساسية", en: "Basic" },
    features: {
      ar: ["دخول الصالة ٢٤/٧", "منطقة الكارديو والأوزان", "جلسة تعريفية مع مدرب", "خزانة ملابس"],
      en: ["24/7 gym access", "Cardio & weights area", "Intro session with a coach", "Locker access"]
    } },
  { id: "pro", monthly: 950, popular: true,
    name: { ar: "الاحترافية", en: "Pro" },
    features: {
      ar: ["كل مميزات الأساسية", "جميع الحصص الجماعية", "خطة تغذية شهرية", "قياس تحليل الجسم شهرياً", "دعوة صديق مرتين شهرياً"],
      en: ["Everything in Basic", "All group classes", "Monthly nutrition plan", "Monthly body-composition scan", "2 guest passes / month"]
    } },
  { id: "elite", monthly: 1800, popular: false,
    name: { ar: "النخبة", en: "Elite" },
    features: {
      ar: ["كل مميزات الاحترافية", "٨ جلسات تدريب شخصي", "متابعة يومية على واتساب", "ساونا وجاكوزي", "مشروب بروتين يومي"],
      en: ["Everything in Pro", "8 personal training sessions", "Daily WhatsApp follow-up", "Sauna & jacuzzi", "Daily protein shake"]
    } }
];

const TESTIMONIALS = [
  { name: { ar: "محمد سامي", en: "Mohamed Samy" }, result: { ar: "خسر ١٨ كجم في ٥ أشهر", en: "Lost 18 kg in 5 months" },
    text: { ar: "جرّبت أكثر من نادٍ، لكن هنا أول مرة ألتزم فعلاً. المدربون يتابعونك بجد، وخطة التغذية سهلة ومناسبة.", en: "I tried many gyms, but this is the first time I actually stuck with it. The coaches really follow up and the meal plan is simple." } },
  { name: { ar: "نور الهدى", en: "Nour El-Hoda" }, result: { ar: "عضوة منذ سنتين", en: "Member for 2 years" },
    text: { ar: "قسم السيدات مريح جداً وخاص، وحصص اليوغا والـ HIIT غيّرت لياقتي بالكامل.", en: "The ladies' area is comfortable and private, and the Yoga and HIIT classes completely changed my fitness." } },
  { name: { ar: "أحمد رضا", en: "Ahmed Reda" }, result: { ar: "زاد ٧ كجم عضل", en: "Gained 7 kg of muscle" },
    text: { ar: "برنامج القوة مع كابتن كريم ممتاز. الأجهزة حديثة ولا يوجد انتظار حتى في أوقات الذروة.", en: "The strength program with Coach Karim is excellent. Modern machines and no waiting even at peak times." } },
  { name: { ar: "دينا خالد", en: "Dina Khaled" }, result: { ar: "أول بطولة ملاكمة", en: "First boxing tournament" },
    text: { ar: "بدأت الملاكمة من الصفر، وبعد سنة شاركت في أول بطولة. الجو هنا يشجّعك على الاستمرار.", en: "I started boxing from zero and a year later joined my first tournament. The vibe here keeps you going." } }
];
