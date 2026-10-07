export type Language = 'en' | 'ar';

export type ChildId = 'layla' | 'zayn';

export type MoodType = 'happy' | 'playful' | 'calm' | 'tired' | 'curious' | 'cuddle';

export interface Child {
  id: ChildId;
  name: string;
  nameAr: string;
  age: string;
  ageAr: string;
  room: string;
  roomAr: string;
  teacher: string;
  teacherAr: string;
  avatarUrl: string;
  status: 'checked_in' | 'on_bus' | 'checked_out';
  checkInTime: string;
  currentMood: MoodType;
  temperature: string;
}

export interface MetricSummary {
  napHours: string;
  napTarget: string;
  napStatus: string;
  napStatusAr: string;
  mealPercent: number;
  mealDetail: string;
  mealDetailAr: string;
  hydrationMl: number;
  diaperCount: number;
  diaperStatus: string;
  diaperStatusAr: string;
  moodLabel: string;
  moodLabelAr: string;
}

export type TimelineCategory = 'arrival' | 'activity' | 'meal' | 'nap' | 'health' | 'departure';

export interface TimelineItem {
  id: string;
  time: string;
  category: TimelineCategory;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  educator: string;
  imageUrl?: string;
  colorCue: 'emerald' | 'amber' | 'lavender' | 'sky' | 'rose';
  likes: number;
  hasLiked?: boolean;
}

export interface BusStop {
  id: string;
  name: string;
  nameAr: string;
  time: string;
  isCompleted: boolean;
  isCurrent: boolean;
  isUserStop: boolean;
}

export interface BusTelemetry {
  busNumber: string;
  routeTitle: string;
  routeTitleAr: string;
  driverName: string;
  driverNameAr: string;
  supervisorName: string;
  supervisorNameAr: string;
  etaMinutes: number;
  currentSpeedKm: number;
  cabinTempC: number;
  allBeltsFastened: boolean;
  stops: BusStop[];
  nextStopName: string;
  nextStopNameAr: string;
}

export interface Medication {
  id: string;
  name: string;
  nameAr: string;
  dosage: string;
  dosageAr: string;
  timeScheduled: string;
  administeredBy?: string;
  administeredTime?: string;
  isCompleted: boolean;
  instructions: string;
  instructionsAr: string;
}

export interface Allergy {
  id: string;
  substance: string;
  substanceAr: string;
  severity: 'high' | 'medium' | 'low';
  reaction: string;
  reactionAr: string;
  emergencyPlan: string;
  emergencyPlanAr: string;
}

export interface InclusiveNote {
  id: string;
  category: string;
  categoryAr: string;
  description: string;
  descriptionAr: string;
  specialist: string;
}

export interface AIInsight {
  date: string;
  headline: string;
  headlineAr: string;
  pedagogicalObservation: string;
  pedagogicalObservationAr: string;
  domainProgress: {
    domain: string;
    domainAr: string;
    level: string;
    levelAr: string;
    score: number; // percentage
  }[];
  eveningBedtimePrompt: string;
  eveningBedtimePromptAr: string;
  educatorTip: string;
  educatorTipAr: string;
}

export interface MomentItem {
  id: string;
  imageUrl: string;
  title: string;
  titleAr: string;
  caption: string;
  captionAr: string;
  activityTag: string;
  activityTagAr: string;
  timestamp: string;
  likes: number;
  educator: string;
}
