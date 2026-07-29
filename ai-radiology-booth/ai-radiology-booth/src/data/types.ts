export type Lang = "en" | "ar";

/** Every user-facing string in the app is authored in both languages. */
export interface Bi {
  en: string;
  ar: string;
}

export type AIOutcome = "correct" | "false_positive" | "miss";

/** A rectangular region in percent coordinates (0-100). Every ScanCanvas graphic uses viewBox="0 0 100 100", so these values are used directly with no conversion. */
export interface Region {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface AIFinding extends Region {
  label: Bi;
  confidence: number; // 0-100
}

export type ImageKind =
  | "wrist"
  | "chest"
  | "head-ct"
  | "chest-ct"
  | "mammo"
  | "knee";

export type ExpectedAnswer = "region" | "none";

export interface RadiologyCase {
  id: string;
  order: number;
  modality: Bi;
  imageKind: ImageKind;
  /** Small stylistic seed so repeated image kinds (e.g. two wrist films) don't render identically. */
  variant: number;
  bodyRegion: Bi;
  history: Bi;
  /** What the visitor is scored against. 'none' means the correct tap is "I don't see anything". */
  expected: ExpectedAnswer;
  groundTruth: Region[];
  groundTruthLabel: Bi;
  aiFindings: AIFinding[];
  aiOutcome: AIOutcome;
  aiResponseSeconds: number;
  radiologistReport: Bi;
  doctorAddedNote: Bi;
  takeaway: Bi;
  /** Drives the grid tag when aiOutcome is 'correct'; false_positive/miss cases get their own tag regardless. */
  difficulty: "easy" | "subtle";
}

export interface TriageItem {
  id: string;
  label: Bi;
  urgency: "critical" | "priority" | "routine";
  initialPosition: number;
  aiPosition: number;
}
