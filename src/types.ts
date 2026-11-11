export interface SyllabusItem {
  session: number;
  title: string;
  content: string;
  tools: string[];
  duration?: string;
}

export interface InstructorReview {
  id: string;
  author: string;
  affiliation: string; // e.g., '천안 백석동 주민자치회', '성황동 경로당 회장'
  rating: number;
  date: string;
  comment: string;
  courseTitle: string;
}

export interface Instructor {
  id: string;
  name: string;
  title: string;
  badge: string;
  category: 'generative-ai' | 'senior-digital' | 'youth-coding' | 'media-video' | 'business-marketing' | 'culture-art' | 'digital-ethics' | 'nocode-automation';
  categoryLabel: string;
  avatar: string;
  shortBio: string;
  fullBio: string;
  teachingPhilosophy: string;
  career: string[];
  certifications: string[];
  districts: ('동남구' | '서북구' | '천안 전역' | '온라인')[];
  rating: number;
  reviewCount: number;
  lectureCount: number;
  sampleVideoUrl?: string;
  portfolioTags: string[];
  featuredTopics: string[];
  curriculum: SyllabusItem[];
  reviews: InstructorReview[];
  contactEmail?: string;
  activeStatus: '출강 가능' | '일정 협의' | '예약 마감 임박';
}

export interface LectureApplication {
  id: string;
  applicantName: string;
  organizationName: string;
  phone: string;
  email: string;
  targetGroup: string;
  participantCount: number;
  instructorId: string;
  instructorName: string;
  courseTopic: string;
  preferredDate: string;
  preferredTime: string;
  durationHours: number;
  sessions: number;
  district: string;
  venueName: string;
  venueAddress: string;
  hasProjector: boolean;
  hasWifi: boolean;
  hasComputers: boolean;
  hasSmartphones: boolean;
  specialRequests: string;
  status: '접수완료' | '강사배정' | '일정조율' | '강의확정' | '교육완료';
  createdAt: string;
}

export interface AiMatchResult {
  recommendedInstructor: {
    name: string;
    title: string;
    matchReason: string;
  };
  courseTitle: string;
  courseOverview: string;
  learningObjectives: string[];
  syllabus: {
    session: number;
    title: string;
    content: string;
    tools: string;
  }[];
  preparationTips: string;
}
