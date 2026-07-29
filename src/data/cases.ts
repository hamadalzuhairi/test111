import type { RadiologyCase } from "./types";

/**
 * Add a 9th case by copying one of these objects — no component code needs
 * to change. `imageKind` picks which stylized graphic ScanCanvas renders;
 * `variant` (0 or 1) just seeds a slightly different grain/texture so two
 * cases sharing an imageKind don't look identical. All region coordinates
 * are percent (0-100) against ScanCanvas's viewBox="0 0 100 100".
 */
const cases: RadiologyCase[] = [
  {
    id: "wrist-fracture-obvious",
    order: 1,
    modality: { en: "X-ray", ar: "أشعة سينية" },
    imageKind: "wrist",
    variant: 0,
    bodyRegion: { en: "Wrist", ar: "الرسغ" },
    history: {
      en: "42-year-old, fell onto an outstretched hand.",
      ar: "رجل عمره 42 عامًا سقط على يده الممدودة.",
    },
    expected: "region",
    groundTruth: [{ x: 39, y: 40, width: 18, height: 12 }],
    groundTruthLabel: { en: "Distal radius fracture", ar: "كسر في نهاية عظم الكعبرة" },
    aiFindings: [
      {
        x: 39,
        y: 40,
        width: 18,
        height: 12,
        label: { en: "Fracture", ar: "كسر" },
        confidence: 97,
      },
    ],
    aiOutcome: "correct",
    aiResponseSeconds: 0.6,
    radiologistReport: {
      en: "Displaced fracture of the distal radius, dorsally angulated. Recommend orthopedic referral for reduction.",
      ar: "كسر في نهاية عظم الكعبرة مع انزياح ظهري. يُنصح بتحويل المريض لجراحة العظام لتثبيت الكسر.",
    },
    doctorAddedNote: {
      en: "The image shows the break — the doctor decides whether it needs a cast or surgery based on the angle, the patient's age, and how the wrist moves on exam.",
      ar: "الصورة تُظهر مكان الكسر، لكن الطبيب هو من يقرر العلاج المناسب (جبيرة أو عملية) بناءً على زاوية الكسر وعمر المريض وفحص حركة الرسغ.",
    },
    takeaway: {
      en: "Obvious fractures are easy for both people and AI to catch.",
      ar: "الكسور الواضحة يسهل رصدها على الإنسان والذكاء الاصطناعي معًا.",
    },
    difficulty: "easy",
  },

  {
    id: "wrist-scaphoid-subtle",
    order: 2,
    modality: { en: "X-ray", ar: "أشعة سينية" },
    imageKind: "wrist",
    variant: 1,
    bodyRegion: { en: "Wrist", ar: "الرسغ" },
    history: {
      en: "19-year-old athlete, wrist pain after a fall — the wrist looks normal at first glance.",
      ar: "لاعب رياضي عمره 19 عامًا يعاني من ألم في الرسغ بعد سقوط، والرسغ يبدو طبيعيًا للوهلة الأولى.",
    },
    expected: "region",
    groundTruth: [{ x: 51, y: 49, width: 10, height: 9 }],
    groundTruthLabel: { en: "Scaphoid fracture", ar: "كسر عظم الزورقي" },
    aiFindings: [
      {
        x: 51,
        y: 49,
        width: 10,
        height: 9,
        label: { en: "Possible fracture line", ar: "خط كسر محتمل" },
        confidence: 81,
      },
    ],
    aiOutcome: "correct",
    aiResponseSeconds: 0.7,
    radiologistReport: {
      en: "Subtle non-displaced fracture of the scaphoid waist — easily missed on first read. Immobilize; re-image in 10–14 days if pain persists.",
      ar: "كسر بسيط غير منزاح في منتصف عظم الزورقي، يسهل إغفاله عند القراءة الأولى. يُنصح بالتثبيت وإعادة التصوير خلال 10-14 يومًا إذا استمر الألم.",
    },
    doctorAddedNote: {
      en: "Scaphoid fractures are famous for hiding in plain sight — exactly the kind of repetitive pattern AI is trained to flag for a second look.",
      ar: "تشتهر كسور عظم الزورقي بأنها تختبئ رغم وضوح الصورة، وهذا بالضبط النوع من الأنماط المتكررة الذي يتم تدريب الذكاء الاصطناعي على رصده لمراجعة إضافية.",
    },
    takeaway: {
      en: "This is where AI earns its keep — catching what a tired or rushed eye can miss.",
      ar: "هنا يثبت الذكاء الاصطناعي فائدته: رصد ما قد تفوته عين متعبة أو مستعجلة.",
    },
    difficulty: "subtle",
  },

  {
    id: "chest-pneumothorax",
    order: 3,
    modality: { en: "X-ray", ar: "أشعة سينية" },
    imageKind: "chest",
    variant: 0,
    bodyRegion: { en: "Chest", ar: "الصدر" },
    history: {
      en: "27-year-old, sudden sharp chest pain and shortness of breath after a car accident.",
      ar: "شاب عمره 27 عامًا يعاني من ألم مفاجئ حاد في الصدر وضيق تنفس بعد حادث سيارة.",
    },
    expected: "region",
    groundTruth: [{ x: 73, y: 18, width: 15, height: 42 }],
    groundTruthLabel: { en: "Pneumothorax", ar: "استرواح صدري" },
    aiFindings: [
      {
        x: 73,
        y: 18,
        width: 15,
        height: 42,
        label: { en: "Pneumothorax — large", ar: "استرواح صدري كبير" },
        confidence: 95,
      },
    ],
    aiOutcome: "correct",
    aiResponseSeconds: 0.5,
    radiologistReport: {
      en: "Large right-sided pneumothorax with partial lung collapse. Urgent — needs a chest tube.",
      ar: "استرواح صدري كبير في الجانب الأيمن مع انخماص جزئي للرئة. حالة عاجلة تحتاج تركيب أنبوب صدري.",
    },
    doctorAddedNote: {
      en: "The AI flagged this and pushed it to the top of the reading queue — the radiologist confirmed it in seconds and treatment started within minutes.",
      ar: "قام الذكاء الاصطناعي برصد هذه الحالة ورفعها لأعلى قائمة القراءة، فأكدها الطبيب خلال ثوانٍ وتم علاج المريض خلال دقائق.",
    },
    takeaway: {
      en: "For emergencies, speed can matter as much as accuracy.",
      ar: "في الحالات الطارئة، السرعة قد تكون بأهمية الدقة.",
    },
    difficulty: "easy",
  },

  {
    id: "head-ct-hemorrhage",
    order: 4,
    modality: { en: "CT", ar: "أشعة مقطعية" },
    imageKind: "head-ct",
    variant: 0,
    bodyRegion: { en: "Head", ar: "الرأس" },
    history: {
      en: "68-year-old, sudden severe headache and confusion, brought in by family.",
      ar: "رجل عمره 68 عامًا أصيب بصداع شديد مفاجئ وتشوش في الوعي، أحضرته العائلة للطوارئ.",
    },
    expected: "region",
    groundTruth: [{ x: 59, y: 37, width: 15, height: 14 }],
    groundTruthLabel: { en: "Intracranial hemorrhage", ar: "نزيف داخل الجمجمة" },
    aiFindings: [
      {
        x: 59,
        y: 37,
        width: 15,
        height: 14,
        label: { en: "Suspected hemorrhage", ar: "اشتباه نزيف" },
        confidence: 92,
      },
    ],
    aiOutcome: "correct",
    aiResponseSeconds: 0.4,
    radiologistReport: {
      en: "Acute intraparenchymal hemorrhage. Neurosurgery notified immediately.",
      ar: "نزيف دماغي حاد داخل نسيج المخ. تم إبلاغ جراحة الأعصاب فورًا.",
    },
    doctorAddedNote: {
      en: "The scan reached the radiologist's screen already flagged and prioritized — before the patient had even left the CT room.",
      ar: "وصلت الصورة إلى شاشة الطبيب مصنّفة كحالة عاجلة قبل أن يغادر المريض غرفة الأشعة المقطعية.",
    },
    takeaway: {
      en: "In stroke and bleeds, minutes decide outcomes — this is triage, not diagnosis.",
      ar: "في حالات الجلطة والنزيف، الدقائق تُحدد النتيجة، وهذا ترتيب أولويات وليس تشخيصًا نهائيًا.",
    },
    difficulty: "easy",
  },

  {
    id: "chest-ct-nodule",
    order: 5,
    modality: { en: "CT", ar: "أشعة مقطعية" },
    imageKind: "chest-ct",
    variant: 0,
    bodyRegion: { en: "Chest", ar: "الصدر" },
    history: {
      en: "55-year-old former smoker — incidental finding on a scan done for another reason.",
      ar: "رجل عمره 55 عامًا مدخن سابق، تم اكتشاف الحالة صدفة أثناء أشعة لسبب آخر.",
    },
    expected: "region",
    groundTruth: [{ x: 68, y: 40, width: 7, height: 7 }],
    groundTruthLabel: { en: "6 mm lung nodule", ar: "عقيدة رئوية 6 ملم" },
    aiFindings: [
      {
        x: 68,
        y: 40,
        width: 7,
        height: 7,
        label: { en: "Nodule 6mm — stable vs. prior", ar: "عقيدة 6 ملم — مستقرة مقارنة بالسابق" },
        confidence: 88,
      },
    ],
    aiOutcome: "correct",
    aiResponseSeconds: 0.9,
    radiologistReport: {
      en: "6 mm solid nodule, unchanged from the scan performed 14 months ago. Low risk; routine follow-up in 12 months.",
      ar: "عقيدة صلبة قطرها 6 ملم، لم تتغير مقارنة بأشعة سابقة قبل 14 شهرًا. خطورتها منخفضة، ويُكتفى بمتابعة روتينية بعد 12 شهرًا.",
    },
    doctorAddedNote: {
      en: "The AI measured the nodule and pulled up the prior scan automatically in seconds. What \u201cstable\u201d means for this patient is still the doctor's call.",
      ar: "قام الذكاء الاصطناعي بقياس العقيدة واستدعاء الأشعة السابقة تلقائيًا خلال ثوانٍ، لكن قرار ما تعنيه كلمة 'مستقرة' لهذا المريض يبقى بيد الطبيب.",
    },
    takeaway: {
      en: "A nodule is a measurement, not a verdict — it gets watched, not feared.",
      ar: "العقيدة قياس وليست حكمًا نهائيًا؛ تتم متابعتها لا الخوف منها.",
    },
    difficulty: "subtle",
  },

  {
    id: "mammo-mass",
    order: 6,
    modality: { en: "Mammogram", ar: "ماموغرام" },
    imageKind: "mammo",
    variant: 0,
    bodyRegion: { en: "Breast", ar: "الثدي" },
    history: {
      en: "50-year-old, routine screening mammogram, no symptoms.",
      ar: "سيدة عمرها 50 عامًا، أشعة ماموغرام دورية دون أي أعراض.",
    },
    expected: "region",
    groundTruth: [{ x: 46, y: 36, width: 16, height: 16 }],
    groundTruthLabel: { en: "Spiculated mass", ar: "كتلة ذات حواف شائكة" },
    aiFindings: [
      {
        x: 46,
        y: 36,
        width: 16,
        height: 16,
        label: { en: "Spiculated mass — suspicious", ar: "كتلة شائكة — مشتبه بها" },
        confidence: 90,
      },
    ],
    aiOutcome: "correct",
    aiResponseSeconds: 0.6,
    radiologistReport: {
      en: "Spiculated mass, BI-RADS 4C. Needs a tissue biopsy for a definite answer.",
      ar: "كتلة ذات حواف شائكة، تصنيف BI-RADS 4C. تحتاج إلى خزعة نسيجية للوصول لتشخيص مؤكد.",
    },
    doctorAddedNote: {
      en: "\u201cMass\u201d is a shape on an image, not a diagnosis. Whether it's cancer can only be known after a biopsy looks at the tissue itself.",
      ar: "'الكتلة' هي شكل يظهر في الصورة وليست تشخيصًا. لا يمكن معرفة ما إذا كانت سرطانًا إلا بعد فحص الأنسجة بالخزعة.",
    },
    takeaway: {
      en: "A suspicious mass is a question, not an answer — biopsy gives the answer.",
      ar: "الكتلة المشتبه بها سؤال وليست إجابة؛ الخزعة هي التي تُجيب.",
    },
    difficulty: "easy",
  },

  {
    id: "knee-false-positive",
    order: 7,
    modality: { en: "X-ray", ar: "أشعة سينية" },
    imageKind: "knee",
    variant: 0,
    bodyRegion: { en: "Knee", ar: "الركبة" },
    history: {
      en: "14-year-old, knee X-ray after a minor sports injury — an unrelated incidental bone finding.",
      ar: "مراهق عمره 14 عامًا، أشعة على الركبة بعد إصابة رياضية بسيطة، مع اكتشاف عرضي غير مرتبط بالإصابة.",
    },
    expected: "none",
    groundTruth: [{ x: 47, y: 51, width: 13, height: 11 }],
    groundTruthLabel: {
      en: "Non-ossifying fibroma (benign)",
      ar: "ورم ليفي غير متعظم (حميد)",
    },
    aiFindings: [
      {
        x: 47,
        y: 51,
        width: 13,
        height: 11,
        label: { en: "Suspicious lesion", ar: "آفة مشتبه بها" },
        confidence: 74,
      },
    ],
    aiOutcome: "false_positive",
    aiResponseSeconds: 0.6,
    radiologistReport: {
      en: "Non-ossifying fibroma — a common benign bone finding in teenagers. No treatment needed.",
      ar: "ورم ليفي غير متعظم — وهو اكتشاف حميد شائع في عظام المراهقين. لا يحتاج إلى أي علاج.",
    },
    doctorAddedNote: {
      en: "The AI flagged a pattern that looks alarming. The radiologist recognized the age, location, and exact appearance that make this one of the most common benign findings in a growing skeleton — and closed the case in one line.",
      ar: "رصد الذكاء الاصطناعي نمطًا يبدو مخيفًا، لكن الطبيب تعرّف فورًا على السن والموقع والشكل المميز الذي يجعل هذا من أكثر الاكتشافات الحميدة شيوعًا في عظام المراهقين، وأغلق الحالة بجملة واحدة.",
    },
    takeaway: {
      en: "A confident AI can still be wrong — this is exactly why every result is reviewed by a radiologist.",
      ar: "قد يكون الذكاء الاصطناعي واثقًا ومخطئًا في آنٍ واحد، ولهذا يُراجع طبيب الأشعة كل نتيجة.",
    },
    difficulty: "easy",
  },

  {
    id: "chest-foreign-body-miss",
    order: 8,
    modality: { en: "X-ray", ar: "أشعة سينية" },
    imageKind: "chest",
    variant: 1,
    bodyRegion: { en: "Chest", ar: "الصدر" },
    history: {
      en: "3-year-old, brought in after choking briefly while playing — now seems fine.",
      ar: "طفل عمره 3 سنوات أُحضر بعد أن اختنق لفترة قصيرة أثناء اللعب، ويبدو الآن بحالة طبيعية.",
    },
    expected: "region",
    groundTruth: [{ x: 46, y: 20, width: 8, height: 8 }],
    groundTruthLabel: { en: "Swallowed foreign body", ar: "جسم غريب مُبتلع" },
    aiFindings: [],
    aiOutcome: "miss",
    aiResponseSeconds: 0.5,
    radiologistReport: {
      en: "Small radio-opaque foreign body in the upper esophagus, consistent with a swallowed object. Refer for removal.",
      ar: "جسم غريب صغير كثيف الظل في الجزء العلوي من المريء، يتوافق مع جسم مُبتلع. يُحال لاستخراجه.",
    },
    doctorAddedNote: {
      en: "The AI wasn't trained to look for this pattern in this location, so it reported the study as normal. The radiologist read the history alongside the image and went looking for exactly this.",
      ar: "لم يكن الذكاء الاصطناعي مدرَّبًا على البحث عن هذا النمط في هذا الموضع، فاعتبر الصورة طبيعية. أما الطبيب، فقد قرأ التاريخ المرضي مع الصورة وبحث تحديدًا عن هذا الاحتمال.",
    },
    takeaway: {
      en: "AI only finds what it was taught to look for. A radiologist reads the whole picture — including the story behind it.",
      ar: "الذكاء الاصطناعي يجد فقط ما تم تدريبه على البحث عنه، أما الطبيب فيقرأ الصورة كاملة، بما في ذلك القصة التي خلفها.",
    },
    difficulty: "subtle",
  },
];

export default cases;
