import type { TriageItem } from "./types";

/**
 * initialPosition = order the study landed in the queue (1 = first).
 * aiPosition = order after AI urgency sorting (1 = read first).
 * Critical items keep their relative order, then priority, then routine —
 * exactly what a real worklist-prioritization tool does today.
 */
const triageQueue: TriageItem[] = [
  {
    id: "t-chest-preop",
    label: { en: "Chest X-ray — pre-op clearance", ar: "أشعة صدر — تجهيز ما قبل العملية" },
    urgency: "routine",
    initialPosition: 1,
    aiPosition: 5,
  },
  {
    id: "t-wrist-fall",
    label: { en: "Wrist X-ray — fall, suspected fracture", ar: "أشعة رسغ — سقوط، اشتباه كسر" },
    urgency: "priority",
    initialPosition: 2,
    aiPosition: 3,
  },
  {
    id: "t-head-headache",
    label: { en: "Head CT — sudden severe headache", ar: "أشعة مقطعية للرأس — صداع شديد مفاجئ" },
    urgency: "critical",
    initialPosition: 3,
    aiPosition: 1,
  },
  {
    id: "t-mammo-screen",
    label: { en: "Mammogram — routine screening", ar: "ماموغرام — فحص دوري" },
    urgency: "routine",
    initialPosition: 4,
    aiPosition: 6,
  },
  {
    id: "t-chest-trauma",
    label: { en: "Chest X-ray — trauma, chest pain", ar: "أشعة صدر — إصابة، ألم في الصدر" },
    urgency: "critical",
    initialPosition: 5,
    aiPosition: 2,
  },
  {
    id: "t-chestct-cough",
    label: { en: "Chest CT — persistent cough, 3 months", ar: "أشعة مقطعية للصدر — سعال مستمر منذ 3 أشهر" },
    urgency: "priority",
    initialPosition: 6,
    aiPosition: 4,
  },
  {
    id: "t-knee-sport",
    label: { en: "Knee X-ray — sports injury", ar: "أشعة ركبة — إصابة رياضية" },
    urgency: "routine",
    initialPosition: 7,
    aiPosition: 7,
  },
  {
    id: "t-head-mild",
    label: { en: "Head CT — mild headache, 2 weeks", ar: "أشعة مقطعية للرأس — صداع خفيف منذ أسبوعين" },
    urgency: "routine",
    initialPosition: 8,
    aiPosition: 8,
  },
  {
    id: "t-abdo-followup",
    label: { en: "Abdominal CT — post-op follow-up", ar: "أشعة مقطعية للبطن — متابعة ما بعد العملية" },
    urgency: "routine",
    initialPosition: 9,
    aiPosition: 9,
  },
  {
    id: "t-spine-chronic",
    label: { en: "Spine MRI — chronic back pain", ar: "رنين مغناطيسي للعمود الفقري — ألم ظهر مزمن" },
    urgency: "routine",
    initialPosition: 10,
    aiPosition: 10,
  },
];

export default triageQueue;
