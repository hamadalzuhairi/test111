export interface FaqItem {
  q: string;
  a: string;
}

export interface Copy {
  meta: {
    campaignEyebrow: string;
    title: string;
    disclaimer: string;
  };
  header: {
    booth: string;
    langToggle: string;
  };
  hero: {
    kicker: string;
    question: string;
    answer: string;
    boothMessage: string;
    cta: string;
    ctaSub: string;
  };
  caseGrid: {
    label: string;
    title: string;
    sub: string;
    startCase: string;
    easy: string;
    subtle: string;
    falsePositive: string;
    miss: string;
  };
  viewer: {
    step: string;
    of: string;
    close: string;
    history: string;
    step1Title: string;
    step1Prompt: string;
    step1None: string;
    step1TimeLeft: string;
    step1TimeUp: string;
    step2Title: string;
    step2Analyzing: string;
    step2ResponseTime: string;
    step2Continue: string;
    step3Title: string;
    verdictYou: string;
    verdictAI: string;
    verdictRadiologist: string;
    hit: string;
    missResult: string;
    noneCorrect: string;
    noneIncorrect: string;
    aiCorrect: string;
    aiFalsePositive: string;
    aiMiss: string;
    radiologistNote: string;
    step4Title: string;
    nextCase: string;
    backToAll: string;
    confidence: string;
  };
  scoreboard: {
    label: string;
    you: string;
    ai: string;
    radiologist: string;
    footnote: string;
  };
  triage: {
    label: string;
    title: string;
    sub: string;
    play: string;
    replay: string;
    before: string;
    after: string;
    critical: string;
    priority: string;
    routine: string;
    caption: string;
  };
  compare: {
    label: string;
    title: string;
    aiTitle: string;
    aiItems: string[];
    docTitle: string;
    docItems: string[];
  };
  alerts: {
    label: string;
    title: string;
    items: string[];
  };
  faq: {
    label: string;
    title: string;
    items: FaqItem[];
  };
  closing: {
    label: string;
    line1: string;
    line2: string;
    line3: string;
    qrCaption: string;
  };
  idle: {
    warning: string;
    resetting: string;
    stay: string;
  };
}

const en: Copy = {
  meta: {
    campaignEyebrow: "Booth 5",
    title: "AI in Radiology",
    disclaimer:
      "Educational demonstration only. Not a medical device and not a diagnostic tool. Images are illustrative teaching examples and do not belong to any real patient.",
  },

  header: {
    booth: "Booth 5 · AI in Radiology",
    langToggle: "العربية",
  },

  hero: {
    kicker: "A question we hear a lot",
    question: "Will AI read my scan instead of my doctor?",
    answer: "Short answer — it helps. It doesn't replace.",
    boothMessage:
      "AI is a smart assistant to the radiologist, not a replacement — the medical decision stays with the doctor.",
    cta: "Try it yourself",
    ctaSub: "8 real teaching cases · 2 minutes",
  },

  caseGrid: {
    label: "Read the scan",
    title: "Eight cases. You go first.",
    sub: "Tap where you think something's wrong before the AI shows you its answer — then see what the radiologist actually wrote.",
    startCase: "Open case",
    easy: "Warm-up",
    subtle: "Subtle",
    falsePositive: "AI got this one wrong",
    miss: "AI missed this one",
  },

  viewer: {
    step: "Step",
    of: "of",
    close: "Close",
    history: "Clinical history",
    step1Title: "Your turn",
    step1Prompt: "Tap where you think something is wrong.",
    step1None: "I don't see anything",
    step1TimeLeft: "seconds left",
    step1TimeUp: "Time's up — moving on to the AI's read.",
    step2Title: "The AI's turn",
    step2Analyzing: "Analyzing…",
    step2ResponseTime: "AI response",
    step2Continue: "Show the verdict",
    step3Title: "The verdict",
    verdictYou: "You",
    verdictAI: "The AI",
    verdictRadiologist: "The radiologist",
    hit: "Found it",
    missResult: "Missed it",
    noneCorrect: "Correctly cleared",
    noneIncorrect: "Flagged a false alarm",
    aiCorrect: "Correct",
    aiFalsePositive: "False alarm",
    aiMiss: "Missed it",
    radiologistNote: "What the doctor added",
    step4Title: "Takeaway",
    nextCase: "Next case",
    backToAll: "Back to all cases",
    confidence: "confidence",
  },

  scoreboard: {
    label: "Running score",
    you: "You",
    ai: "AI",
    radiologist: "Radiologist",
    footnote: "The radiologist column is always complete. That's the point.",
  },

  triage: {
    label: "Behind the scenes",
    title: "Who gets read first?",
    sub: "Ten studies just landed in the reading queue. Watch the AI re-order them by urgency — it doesn't decide who is sick, it decides who gets looked at first.",
    play: "Run the queue",
    replay: "Run again",
    before: "As they arrived",
    after: "AI-prioritized queue",
    critical: "Critical",
    priority: "Priority",
    routine: "Routine",
    caption: "The AI doesn't decide who is sick. It decides who gets looked at first.",
  },

  compare: {
    label: "Where each one stands",
    title: "What AI helps with vs. what only the radiologist does",
    aiTitle: "What AI helps with",
    aiItems: [
      "Spotting certain patterns and marking them on the image, plus repetitive measurements and calculations.",
      "Prioritizing cases, organizing workflow, and processing images to improve their quality.",
    ],
    docTitle: "What only the radiologist does",
    docItems: [
      "Connecting the image to the patient's condition, history, and lab results — and handling rare or complex cases.",
      "Making the final call, carrying the medical responsibility, and talking the patient through the result.",
    ],
  },

  alerts: {
    label: "Before you leave",
    title: "Six things worth remembering",
    items: [
      "Don't get a scan without a clear medical reason, and don't repeat one just to ease worry.",
      "Don't fear a scan if your doctor says it's necessary.",
      "Don't over-worry about contrast dye — but do tell your doctor about kidney issues or allergies.",
      "Don't delay a cancer screening if you're in a group that needs early detection.",
      "A mass doesn't always mean cancer — diagnosis needs full medical evaluation.",
      "A scan result alone isn't enough — the doctor connects it with symptoms, labs, and examination.",
    ],
  },

  faq: {
    label: "Questions people ask",
    title: "Frequently asked",
    items: [
      {
        q: "Will AI replace the radiologist?",
        a: "No. It's an assistive tool that spots patterns, does measurements, and improves images — while the doctor still connects the image to the case and labs, makes the final call, and carries the medical responsibility.",
      },
      {
        q: "Does AI make mistakes?",
        a: "Like any technology, it has limits and can be wrong — which is why every result is always reviewed by a radiologist, who signs off on the final report.",
      },
      {
        q: "My report says \u201cmass\u201d — does that mean cancer?",
        a: "Not necessarily. Many masses are benign, and a diagnosis needs a full medical evaluation connecting the image with symptoms, labs, and clinical exam.",
      },
      {
        q: "Is AI actually used in hospitals today?",
        a: "Yes — it's gradually being used for tasks like improving image quality, prioritizing cases, and spotting certain patterns, all under a radiologist's supervision.",
      },
      {
        q: "I just want reassurance — should I get a full-body scan?",
        a: "Getting a scan without a clear medical reason, or repeating one just to ease worry, isn't recommended. It's best to see a doctor to decide whether you need a scan and which one suits you — only certain groups need specific early-detection screening.",
      },
    ],
  },

  closing: {
    label: "Leave with this",
    line1: "Technology assists.",
    line2: "The doctor decides.",
    line3: "And a scan done at the right time is the best reassurance of all.",
    qrCaption: "Scan for more",
  },

  idle: {
    warning: "Still there?",
    resetting: "Resetting in",
    stay: "I'm still here",
  },
};

export default en;
