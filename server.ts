import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory applications storage for demonstration & persistence during session
interface LectureApplication {
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

const applicationsDatabase: LectureApplication[] = [
  {
    id: 'CAI-202611-0421',
    applicantName: '이영희',
    organizationName: '신부동 대림아파트 경로당',
    phone: '010-3342-9811',
    email: 'yh.lee@cheonan-silver.kr',
    targetGroup: '시니어/어르신 (65세 이상)',
    participantCount: 18,
    instructorId: 'inst-02',
    instructorName: '박정순 시민강사',
    courseTopic: '스마트폰 기초 및 음성 AI 비서 활용법',
    preferredDate: '2026-11-20',
    preferredTime: '오후 2:00 ~ 4:00',
    durationHours: 2,
    sessions: 2,
    district: '동남구 신부동',
    venueName: '단지 내 2층 경로당 프로그램실',
    venueAddress: '충남 천안시 동남구 중앙로 210',
    hasProjector: false,
    hasWifi: true,
    hasComputers: false,
    hasSmartphones: true,
    specialRequests: '어르신들이 귀가 조금 어두우셔서 마이크 사용과 천천히 반복 교육을 부탁드립니다.',
    status: '강의확정',
    createdAt: '2026-11-05 14:30',
  },
  {
    id: 'CAI-202611-0814',
    applicantName: '최성민',
    organizationName: '불당동 주민자치센터 평생학습동아리',
    phone: '010-7712-4589',
    email: 'sm.choi@cheonan.go.kr',
    targetGroup: '직장인 및 일반 성인',
    participantCount: 25,
    instructorId: 'inst-01',
    instructorName: '김도윤 시민강사',
    courseTopic: 'ChatGPT 업무자동화 및 생성형 AI 실무 프롬프트',
    preferredDate: '2026-11-25',
    preferredTime: '저녁 7:00 ~ 9:00',
    durationHours: 2,
    sessions: 4,
    district: '서북구 불당동',
    venueName: '불당1동 행정복지센터 3층 정보화교육장',
    venueAddress: '충남 천안시 서북구 불당23로 77',
    hasProjector: true,
    hasWifi: true,
    hasComputers: true,
    hasSmartphones: true,
    specialRequests: '회사 퇴근 후 참석하시는 분들이 많아 실습 위주 강의를 희망합니다.',
    status: '일정조율',
    createdAt: '2026-11-08 10:15',
  },
  {
    id: 'CAI-202611-1205',
    applicantName: '정우진',
    organizationName: '천안 성환초등학교 학부모회',
    phone: '010-9123-5567',
    email: 'wj.jung@cne.go.kr',
    targetGroup: '학부모 및 초등학생',
    participantCount: 30,
    instructorId: 'inst-03',
    instructorName: '이수현 시민강사',
    courseTopic: '우리 아이와 함께하는 AI 창작과 올바른 AI 윤리',
    preferredDate: '2026-11-28',
    preferredTime: '오전 10:00 ~ 12:00',
    durationHours: 2,
    sessions: 1,
    district: '서북구 성환읍',
    venueName: '성환초등학교 꿈누리관 다목적실',
    venueAddress: '충남 천안시 서북구 성환읍 성환11길 15',
    hasProjector: true,
    hasWifi: true,
    hasComputers: true,
    hasSmartphones: true,
    specialRequests: '학부모와 학생이 1:1로 짝을 지어 함께 실습할 수 있도록 안내 부탁드립니다.',
    status: '접수완료',
    createdAt: '2026-11-10 09:20',
  }
];

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // API: Get applications (with optional search query)
  app.get('/api/applications', (req, res) => {
    const { query } = req.query;
    if (!query) {
      return res.json({ success: true, applications: applicationsDatabase });
    }
    const q = String(query).toLowerCase().trim();
    const filtered = applicationsDatabase.filter(
      (app) =>
        app.id.toLowerCase().includes(q) ||
        app.applicantName.toLowerCase().includes(q) ||
        app.phone.replace(/[^0-9]/g, '').includes(q.replace(/[^0-9]/g, '')) ||
        app.organizationName.toLowerCase().includes(q)
    );
    res.json({ success: true, applications: filtered });
  });

  // API: Create new application
  app.post('/api/applications', (req, res) => {
    try {
      const data = req.body;
      const now = new Date();
      const yearMonth = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}`;
      const randomDigits = Math.floor(1000 + Math.random() * 9000);
      const newId = `CAI-${yearMonth}-${randomDigits}`;

      const newApplication: LectureApplication = {
        id: newId,
        applicantName: data.applicantName || '신청자',
        organizationName: data.organizationName || '개인/단체',
        phone: data.phone || '010-0000-0000',
        email: data.email || '',
        targetGroup: data.targetGroup || '일반 시민',
        participantCount: Number(data.participantCount) || 15,
        instructorId: data.instructorId || 'any',
        instructorName: data.instructorName || '천안시 추천 강사',
        courseTopic: data.courseTopic || 'AI 기초 및 실생활 활용',
        preferredDate: data.preferredDate || '2026-12-01',
        preferredTime: data.preferredTime || '오후 2:00 ~ 4:00',
        durationHours: Number(data.durationHours) || 2,
        sessions: Number(data.sessions) || 1,
        district: data.district || '천안시 전역',
        venueName: data.venueName || '지정 교육장',
        venueAddress: data.venueAddress || '충남 천안시',
        hasProjector: Boolean(data.hasProjector),
        hasWifi: Boolean(data.hasWifi),
        hasComputers: Boolean(data.hasComputers),
        hasSmartphones: Boolean(data.hasSmartphones),
        specialRequests: data.specialRequests || '',
        status: '접수완료',
        createdAt: now.toISOString().replace('T', ' ').substring(0, 16),
      };

      applicationsDatabase.unshift(newApplication);

      res.status(201).json({
        success: true,
        message: '천안시 시민강사 강의 신청이 성공적으로 접수되었습니다.',
        application: newApplication,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message || '신청 처리 중 오류가 발생했습니다.' });
    }
  });

  // API: AI Matching & Custom Syllabus Planner
  app.post('/api/ai/match', async (req, res) => {
    const { targetAudience, goalTopic, participantCount, district, sessionCount } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;

    // If API key is available, use Gemini
    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `당신은 대한민국 충청남도 천안시의 '찾아가는 디지털 평생학습 & 시민강사 지원센터' 수석 교육기획관입니다.
슬로건은 "AI Education for the better life" 입니다.

다음 신청자의 요구사항을 바탕으로 천안시 시민강사 중 가장 적합한 강사 추천과 맟춤형 강의계획서(커리큘럼)를 JSON 형식으로 제안해주세요:
- 교육 대상: ${targetAudience || '천안시민'}
- 희망 주제/목표: ${goalTopic || '실생활 AI 활용'}
- 인원: ${participantCount || 20}명
- 희망 지역: 천안시 ${district || '동남구/서북구'}
- 희망 차시: ${sessionCount || 2}차시

응답은 반드시 유효한 JSON 문자열로만 응답해주세요. JSON 외의 부가적인 마크다운 백틱이나 설명은 붙이지 마세요.
JSON 구조:
{
  "recommendedInstructor": {
    "name": "강사 이름 (예: 김도윤, 박정순, 이수현, 최원석, 정민아, 강성호 중 적절한 분)",
    "title": "강사 직함 및 전문 분야",
    "matchReason": "이 대상을 위해 이 강사를 추천하는 이유 (2-3문장)"
  },
  "courseTitle": "추천 강의명",
  "courseOverview": "강의 개요 및 기대효과 (2-3문장)",
  "learningObjectives": ["학습목표 1", "학습목표 2", "학습목표 3"],
  "syllabus": [
    {
      "session": 1,
      "title": "1차시 소주제",
      "content": "주요 교육 내용 및 실습 항목",
      "tools": "사용할 AI 도구 (예: ChatGPT, 캔바, 네이버 클로바 등)"
    }
  ],
  "preparationTips": "교육장 및 수강생을 위한 맞춤 사전 준비 팁"
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
        });

        let text = response.text || '';
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(text);
        return res.json({ success: true, data: parsed, isAiGenerated: true });
      } catch (err: any) {
        console.warn('Gemini API call failed, falling back to smart local recommendation generator:', err.message);
      }
    }

    // High quality local rule-based AI match generator fallback
    const isSenior = /어르신|노인|시니어|경로당|실버|할머니|할아버지/.test(targetAudience + goalTopic);
    const isYouth = /청소년|어린이|학생|초등|중학|고등|아이/.test(targetAudience + goalTopic);
    const isBusiness = /소상공인|가게|상인|자영업|매출|스토어|마케팅|당근/.test(targetAudience + goalTopic);
    const isOffice = /직장인|회사|업무|엑셀|보고서|노코드|자동화|사무/.test(targetAudience + goalTopic);
    const isMedia = /유튜브|영상|쇼츠|사진|릴스|크리에이터/.test(targetAudience + goalTopic);

    let matchInstructor = {
      name: '김도윤 시민강사',
      title: '생성형 AI & 업무 생산성 마스터 (천안시 3기 공인강사)',
      matchReason: '초보자부터 실무자까지 ChatGPT 프롬프트 작성과 실전 활용을 가장 체계적으로 지도하는 천안시 대표 강사입니다.'
    };
    let title = '천안시민을 위한 실전 생성형 AI & ChatGPT 첫걸음';
    let overview = '일상과 업무에서 질문 하나로 원하는 결과를 얻는 AI 프롬프트 스킬을 배우고 삶의 편의를 높입니다.';

    if (isSenior) {
      matchInstructor = {
        name: '박정순 시민강사',
        title: '시니어 디지털 문해 & 생활 AI 비서 전문강사',
        matchReason: '천안 관내 복지관 및 경로당 출강 200회 이상의 베테랑으로, 큰 글씨와 쉬운 비유로 어르신 눈높이에 맞춰 친절히 지도합니다.'
      };
      title = '어르신을 위한 척척박사 말하는 AI 비서와 스마트폰 안심 활용';
      overview = '스마트폰을 말로 조작하여 음성 통화, 병원 예약, 손주 사진 꾸미기부터 보이스피싱 예방까지 배웁니다.';
    } else if (isYouth) {
      matchInstructor = {
        name: '이수현 시민강사',
        title: '청소년 AI 창작 & 피지컬 컴퓨팅 멘토',
        matchReason: '학생들의 호기심을 자극하는 게임형 실습과 웹툰/스토리 생성 AI 프로젝트로 미래 디지털 역량을 길러줍니다.'
      };
      title = '상상이 현실이 되는 청소년 생성형 AI 창작 공작소';
      overview = 'AI의 기본 원리를 직접 조작해보며 미래 인재가 갖춰야 할 디지털 창의력과 AI 윤리를 학습합니다.';
    } else if (isBusiness) {
      matchInstructor = {
        name: '강성호 시민강사',
        title: '소상공인 스마트 상권 & AI 마케팅 코치',
        matchReason: '천안 중앙시장 및 골목상권 소상공인 대상 실전 홍보물 제작과 네이버 지도 순위 관리 경험이 풍부합니다.'
      };
      title = '천안 소상공인을 위한 AI 기반 단골 모으기 & SNS 마케팅 특강';
      overview = '바쁜 상인분들을 위해 1분 만에 매장 홍보 문구와 포스터를 생성하고 리뷰에 스마트하게 대응하는 노하우를 전수합니다.';
    } else if (isMedia) {
      matchInstructor = {
        name: '최원석 시민강사',
        title: 'AI 숏폼 영상 & 1인 미디어 크리에이터',
        matchReason: '천안시 미디어센터 강사이자 현직 크리에이터로서 AI 자막, 배경음악, 컷편집을 스마트폰 하나로 완성하도록 코칭합니다.'
      };
      title = '스마트폰 하나로 뚝딱! AI 유튜브 쇼츠 영상 제작 마스터';
      overview = '영상 기획부터 AI 목소리 입히기, 자동 컷편집까지 초보자도 단 2시간 만에 멋진 쇼츠를 완성합니다.';
    } else if (isOffice) {
      matchInstructor = {
        name: '윤태진 시민강사',
        title: '노코드 & AI 업무 자동화 엔지니어',
        matchReason: '복잡한 코딩 없이 천안 지역 중소기업과 행정 실무자의 반복 작업을 획기적으로 줄여주는 업무 자동화 전문가입니다.'
      };
      title = '칼퇴를 부르는 직장인 AI 업무자동화 & 스마트 리포팅';
      overview = '생성형 AI와 노코드 도구를 결합하여 데이터 정리, 회의록 요약, 보고서 초안 작성을 자동화합니다.';
    }

    const syllabus = [
      {
        session: 1,
        title: `${title} - 기초 및 프롬프트 실습`,
        content: `${targetAudience || '시민'} 특성에 맞춘 기초 개념 설명 및 실제 스마트폰/PC 실습 진행`,
        tools: 'ChatGPT, 네이버 클로바, 뤼튼'
      },
      {
        session: 2,
        title: '실전 응용 및 나만의 AI 결과물 완성',
        content: '수강생 맞춤형 결과물(문서, 이미지, 생활 편의 활용) 제작 및 질의응답',
        tools: '생성형 AI 툴, 캔바, 보이스AI'
      }
    ];

    res.json({
      success: true,
      data: {
        recommendedInstructor: matchInstructor,
        courseTitle: title,
        courseOverview: overview,
        learningObjectives: [
          'AI 기술을 두려움 없이 일상생활과 직무에 능동적으로 활용할 수 있다.',
          '천안시민으로서 공인 강사의 지속적인 디지털 멘토링 혜택을 누린다.',
          '디지털 격차를 해소하고 삶의 편의성과 만족도를 대폭 향상한다.'
        ],
        syllabus,
        preparationTips: '수강생 개인 스마트폰 또는 교육장 PC 준비, 사전 와이파이 연결 상태 확인 권장'
      },
      isAiGenerated: false
    });
  });

  // Serve Vite in development, static in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Cheonan Citizen Instructor Academy running on http://localhost:${PORT}`);
  });
}

startServer();
