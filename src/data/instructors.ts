import { Instructor } from '../types';

export const INSTRUCTORS: Instructor[] = [
  {
    id: 'inst-01',
    name: '김도윤',
    title: '생성형 AI & 업무 생산성 전문 강사',
    badge: '천안시 3기 최우수 시민강사',
    category: 'generative-ai',
    categoryLabel: '생성형 AI / 업무 생산성',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    shortBio: '천안 소상공인과 직장인을 위한 쉬운 ChatGPT 실무 활용과 프롬프트 엔지니어링 전문가',
    fullBio: '삼성디스플레이 사내 SW 교육 강사 및 충남디지털배움터 주강사로 활동하며, 천안시민 3,000명 이상에게 AI 실무 교육을 전파했습니다. 복잡한 AI 용어 대신 실생활과 직무에 바로 적용 가능한 템플릿 중심 강의를 진행합니다.',
    teachingPhilosophy: '"AI는 어려운 기술이 아니라, 나의 생각을 현실로 만들어주는 가장 똑똑한 조수입니다."',
    career: [
      '천안시 평생학습관 디지털 AI 분과 전임 시민강사 (2024~현재)',
      '충남디지털배움터 거점센터 생성형 AI 주강사 (2023~현재)',
      '천안시 직장인 야간 디지털 역량강화 특강 다수 출강',
      '전 삼성디스플레이 사내 소프트웨어 교육 담당'
    ],
    certifications: [
      '국가공인 프롬프트엔지니어 1급',
      '한국인공지능교육협회 생성형 AI 전문강사',
      '평생교육사 2급'
    ],
    districts: ['천안 전역', '동남구', '서북구', '온라인'],
    rating: 4.98,
    reviewCount: 94,
    lectureCount: 156,
    portfolioTags: ['ChatGPT', 'Claude', '업무자동화', '보고서작성', '프롬프트'],
    featuredTopics: [
      '질문 하나로 1시간 일찍 퇴근하는 ChatGPT 프롬프트 마스터',
      '천안 소상공인을 위한 AI 블로그 홍보글 및 상품 상세페이지 작성법',
      '생성형 AI로 만드는 나만의 맞춤형 업무 비서 (Custom GPTs)'
    ],
    curriculum: [
      {
        session: 1,
        title: '생성형 AI 기초와 프롬프트 3단계 공식',
        content: 'ChatGPT, Claude, 뤼튼의 특징 비교와 원하는 답변을 정확히 끌어내는 3단계 프롬프트 작성 실습',
        tools: ['ChatGPT', 'Wrtn'],
        duration: '2시간'
      },
      {
        session: 2,
        title: '실무 문서 & 기획서 10분 완성하기',
        content: '회의록 요약, 공문서 초안 작성, 엑셀 함수 및 매크로 코드 생성 실습',
        tools: ['ChatGPT Plus', 'Notion AI'],
        duration: '2시간'
      },
      {
        session: 3,
        title: '천안 소상공인 실전 마케팅 문구 및 홍보 배너 제작',
        content: '인스타그램 캡션, 네이버 스마트스토어 상세설명, 캔바 AI 이미지 결합 실습',
        tools: ['Canva AI', 'ChatGPT'],
        duration: '2시간'
      },
      {
        session: 4,
        title: '나만의 맞춤형 AI 비서 (GPTs) 구축 & 실생활 적용',
        content: '코딩 없이 우리 단체/회사 전용 지식 기반 AI 챗봇을 만들고 공유하기',
        tools: ['GPTs Builder'],
        duration: '2시간'
      }
    ],
    reviews: [
      {
        id: 'rev-01',
        author: '최민성',
        affiliation: '불당동 주민자치위원회',
        rating: 5,
        date: '2026-10-18',
        comment: '컴퓨터에 익숙지 않은 위원님들도 눈높이 설명 덕분에 모두 실습을 마쳤습니다. 회사 회의록 정리가 정말 빨라졌어요!',
        courseTitle: 'ChatGPT 업무자동화 및 생성형 AI 실무'
      },
      {
        id: 'rev-02',
        author: '박정아',
        affiliation: '천안 신부동 카페 대표',
        rating: 5,
        date: '2026-09-24',
        comment: '매일 인스타 홍보글 쓰느라 1시간씩 걸렸는데 강사님이 알려주신 프롬프트로 3분 만에 해결했습니다. 천안 최고의 강사님이십니다.',
        courseTitle: '소상공인 AI 홍보글 작성 특강'
      }
    ],
    contactEmail: 'doyoon.kim@cheonan-instructor.kr',
    activeStatus: '출강 가능'
  },
  {
    id: 'inst-02',
    name: '박정순',
    title: '시니어 디지털 문해 & 생활 AI 비서 강사',
    badge: '어르신 맞춤형 공감 강사 1위',
    category: 'senior-digital',
    categoryLabel: '시니어 디지털 / 생활 AI',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    shortBio: '천안 관내 경로당과 노인복지관 어르신들의 눈높이에 맞춘 따뜻하고 친절한 음성 AI 교육',
    fullBio: '천안시 노인종합복지관 스마트기기 전담 강사로 5년간 활동하며 천안 31개 읍면동 경로당을 직접 방문하여 디지털 소외 어르신 4,500여 분께 스마트폰과 말하는 AI 비서 사용법을 전수했습니다. 한 분 한 분 손을 잡고 지도하는 다정함이 트레이드마크입니다.',
    teachingPhilosophy: '"손주와 영상통화하고, 말로 버스표를 끊는 어르신의 환한 미소가 저의 가장 큰 보람입니다."',
    career: [
      '천안시 노인종합복지관 스마트기기·인공지능 전담강사 (2021~현재)',
      '천안시 찾아가는 어르신 디지털 배움터 선임 시민강사 (2022~현재)',
      '충청남도 평생교육 유공 도지사 표창 수상 (2025)',
      '천안아산 디지털문해교육협회 이사'
    ],
    certifications: [
      '디지털문해교육사 1급',
      '스마트폰활용지도사 1급',
      '노인심리상담사 2급'
    ],
    districts: ['동남구', '서북구', '천안 전역'],
    rating: 5.0,
    reviewCount: 142,
    lectureCount: 228,
    portfolioTags: ['시니어스마트폰', '말하는AI비서', '보이스피싱예방', '병원예약', '카카오톡AI'],
    featuredTopics: [
      '손가락 대신 말로 척척! 스마트폰 음성인식 AI 비서 (네이버 클로바·빅스비)',
      '스마트폰으로 쉽게 하는 병원 모바일 접수 & 천안 버스 도착 알림',
      '진짜 자식 목소리도 의심하세요! AI 딥보이스 보이스피싱 완벽 대응법'
    ],
    curriculum: [
      {
        session: 1,
        title: '말로 다 되는 스마트폰 음성 AI 비서 첫걸음',
        content: '글씨를 치지 않고 말로 전화 걸기, 날씨 묻기, 알람 맞추기, 라디오 켜기',
        tools: ['Bixby', '네이버 클로바 음성'],
        duration: '2시간'
      },
      {
        session: 2,
        title: '손주와 카카오톡 사진 AI 예쁘게 보내기 & 영상통화',
        content: '사진 속 불필요한 사람 지우기 AI, 옛날 흑백사진 컬러 복원 AI 체험',
        tools: ['스마트폰 갤러리 AI', '카카오톡'],
        duration: '2시간'
      },
      {
        session: 3,
        title: '병원 똑딱 예약 & 천안 버스 안심 탑승',
        content: '천안 순천향대병원, 단국대병원 모바일 진료 예약 및 경로당 앞 버스 도착 시간 조회',
        tools: ['똑닥', '천안버스앱'],
        duration: '2시간'
      },
      {
        session: 4,
        title: '피땀 흘린 노후자금 지키기! AI 보이스피싱 철통방어',
        content: '가족 목소리를 흉내 내는 AI 피싱 사례와 금융사기 예방 앱(시티즌코난) 설치',
        tools: ['시티즌코난', '금융감독원 안심앱'],
        duration: '2시간'
      }
    ],
    reviews: [
      {
        id: 'rev-03',
        author: '김순옥 (76세)',
        affiliation: '동남구 원성1동 경로당 회장',
        rating: 5,
        date: '2026-10-30',
        comment: '눈도 어둡고 손도 떨려서 스마트폰은 전화만 받는 줄 알았는데, 강사님이 친절하게 알려주셔서 이제 말로 노래도 틀고 손주한테 사진도 보냅니다. 천사 같은 선생님!',
        courseTitle: '어르신 스마트폰 & 말하는 AI 교실'
      },
      {
        id: 'rev-04',
        author: '장경택 (71세)',
        affiliation: '서북구 쌍용동 주공아파트 경로당',
        rating: 5,
        date: '2026-09-15',
        comment: '모르는 번호로 아들 목소리 흉내 내는 사기 전화가 왔었는데, 박정순 강사님께 배운 대로 침착하게 확인해서 1천만원을 지켰습니다.',
        courseTitle: 'AI 보이스피싱 예방 및 안전 스마트폰'
      }
    ],
    contactEmail: 'js.park@cheonan-instructor.kr',
    activeStatus: '출강 가능'
  },
  {
    id: 'inst-03',
    name: '이수현',
    title: '청소년 AI 창작 & 코딩 멘토',
    badge: '미래인재 양성 우수지도자',
    category: 'youth-coding',
    categoryLabel: '청소년 교육 / AI 코딩 & 창작',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    shortBio: '천안 관내 초·중·고 학생들에게 AI의 원리를 흥미로운 게임과 인터랙티브 프로젝트로 전달',
    fullBio: '천안청소년수련관 메이커스페이스 전임 멘토이자 카이스트 과학영재캠프 보조강사 출신으로, 딱딱한 알고리즘 대신 내가 만든 그림이 살아 움직이는 AI 웹툰, AI 게임 프로젝트를 통해 청소년들의 디지털 창의력을 극대화합니다.',
    teachingPhilosophy: '"AI를 단순히 소비하는 세대가 아니라, 세상을 바꾸는 AI 창작자로 성장하도록 돕습니다."',
    career: [
      '천안청소년수련관 청소년 AI 메이커 교실 전임 멘토 (2023~현재)',
      '천안 관내 18개 초중고 자유학기제 AI 멘토링 출강',
      '충남 미래창의인재 코딩 챌린지 심사위원',
      '전 KAIST 과학캠프 AI 멘토'
    ],
    certifications: [
      'SW코딩지도사 1급',
      '엔트리·스크래치 AI 공인마스터',
      '정보처리기사'
    ],
    districts: ['천안 전역', '서북구', '동남구'],
    rating: 4.96,
    reviewCount: 78,
    lectureCount: 118,
    portfolioTags: ['청소년AI', '엔트리AI', 'AI웹툰창작', '블록코딩', '로봇제어'],
    featuredTopics: [
      '내가 그린 캐릭터가 움직인다! 생성형 AI 웹툰 제작 프로젝트',
      '인공지능 비전(카메라)으로 인식하는 스마트 분리수거 로봇 코딩',
      'ChatGPT와 함께하는 인터랙티브 텍스트 어드벤처 게임 개발'
    ],
    curriculum: [
      {
        session: 1,
        title: '인공지능은 어떻게 사물을 볼까? 머신러닝 비전 체험',
        content: '티처블 머신(Teachable Machine)으로 카메라 사물 인식 모델 직접 학습시키기',
        tools: ['Teachable Machine', 'Entry AI'],
        duration: '2시간'
      },
      {
        session: 2,
        title: '생성형 AI로 그리는 미래 천안 도시 & 캐릭터 기획',
        content: '프롬프트로 나만의 슈퍼히어로 캐릭터 생성 및 세계관 스토리보드 완성',
        tools: ['Bing Image Creator', 'Canva Magic'],
        duration: '2시간'
      },
      {
        session: 3,
        title: '블록코딩으로 만드는 AI 동작 인식 미니게임',
        content: '웹캠 앞에서 손을 흔들면 반응하는 손동작 인식 인터랙티브 게임 코딩',
        tools: ['Entry AI 블록', 'Scratch 3.0'],
        duration: '2시간'
      },
      {
        session: 4,
        title: '청소년을 위한 올바른 AI 윤리와 가짜뉴스 판별법',
        content: '딥페이크 영상의 위험성과 올바른 AI 저작권, 나만의 AI 발명 아이디어 발표',
        tools: ['AI 윤리 워크시트', '발표 슬라이드'],
        duration: '2시간'
      }
    ],
    reviews: [
      {
        id: 'rev-05',
        author: '한지원 교사',
        affiliation: '천안 불당중학교 진로부장',
        rating: 5,
        date: '2026-10-22',
        comment: '학생들의 집중도가 지금까지 어떤 특강보다 높았습니다. 평소 수업에 소극적이던 아이들도 눈을 반짝이며 자기만의 게임을 만들었어요.',
        courseTitle: '청소년 생성형 AI 창작과 인터랙티브 코딩'
      }
    ],
    contactEmail: 'sh.lee@cheonan-instructor.kr',
    activeStatus: '출강 가능'
  },
  {
    id: 'inst-04',
    name: '최원석',
    title: '1인 미디어 & AI 숏폼 영상 크리에이터',
    badge: '천안시 청년 미디어 멘토',
    category: 'media-video',
    categoryLabel: 'AI 미디어 / 영상 제작',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    shortBio: '스마트폰 하나로 끝내는 AI 유튜브·인스타그램 숏폼 영상 제작 및 채널 브랜딩',
    fullBio: '유튜브 채널 구독자 12만 명을 운영하는 현직 영상 크리에이터이자 천안시 영상미디어센터 출강 강사입니다. 텍스트만 넣으면 자막, AI 내레이션, 화면 컷편집까지 완성되는 최신 AI 영상 툴을 전수합니다.',
    teachingPhilosophy: '"전문 카메라나 복잡한 프리미어가 없어도, AI와 여러분의 이야기만 있으면 멋진 영상이 됩니다."',
    career: [
      '천안시 영상미디어센터 숏폼 영상 제작 전임강사 (2023~현재)',
      '천안청년센터 이음 1인 미디어 창작 아카데미 멘토',
      '충남문화산업진흥원 영상 콘텐츠 자문위원',
      '유튜브 크리에이터 및 영상 프로덕션 대표'
    ],
    certifications: [
      '어도비 공인 전문가 (Adobe ACA)',
      '디지털영상편집 1급',
      '미디어콘텐츠창작지도사'
    ],
    districts: ['천안 전역', '서북구', '동남구', '온라인'],
    rating: 4.97,
    reviewCount: 86,
    lectureCount: 134,
    portfolioTags: ['Vrew', 'CapCut AI', '유튜브쇼츠', '릴스', 'AI음성더빙'],
    featuredTopics: [
      '원고만 넣으면 끝! Vrew AI로 10분 만에 지식 정보 숏츠 만들기',
      '천안 로컬 명소 및 우리 가게를 알리는 인스타그램 릴스 바이럴 공식',
      'AI 아바타와 가상 인간으로 얼굴 노출 없이 유튜브 채널 운영하기'
    ],
    curriculum: [
      {
        session: 1,
        title: '3초 만에 시선을 사로잡는 숏폼 기획과 챗GPT 대본 작성',
        content: '후킹 문구의 비밀과 ChatGPT를 활용한 1분 숏폼 대본 3종 자동 생성',
        tools: ['ChatGPT', '뤼튼'],
        duration: '2시간'
      },
      {
        session: 2,
        title: 'AI 목소리와 자동 자막 툴 (Vrew) 마스터',
        content: '텍스트 입력으로 감정 실린 AI 음성 생성 및 오타 없는 싱크 자막 완성',
        tools: ['Vrew AI'],
        duration: '2시간'
      },
      {
        session: 3,
        title: '캡컷 AI(CapCut)를 활용한 역동적인 컷편집 & 템플릿',
        content: '인기 음원 매칭, AI 자동 컷편집, 스마트 배경 제거(누끼) 실습',
        tools: ['CapCut Pro AI'],
        duration: '2시간'
      },
      {
        session: 4,
        title: '실전 업로드 & 알고리즘을 타는 썸네일 AI 제작',
        content: '미드저니/달리로 시선 끄는 썸네일 제작 및 해시태그 최적화 실전',
        tools: ['Canva Magic Studio', 'YouTube Studio'],
        duration: '2시간'
      }
    ],
    reviews: [
      {
        id: 'rev-06',
        author: '윤다혜',
        affiliation: '천안 안서동 대학가 베이커리',
        rating: 5,
        date: '2026-10-12',
        comment: '영상 만드는 게 너무 막막했는데 2시간 배우고 당일 만든 릴스가 조회수 4만 회를 넘겼습니다! 매장에 손님이 부쩍 늘었어요.',
        courseTitle: '소상공인 10분 AI 쇼츠 제작 교실'
      }
    ],
    contactEmail: 'ws.choi@cheonan-instructor.kr',
    activeStatus: '출강 가능'
  },
  {
    id: 'inst-05',
    name: '정민아',
    title: 'AI 아트 & 디지털 융합 문화예술 강사',
    badge: '천안 감성 문화예술 메이커',
    category: 'culture-art',
    categoryLabel: 'AI 아트 / 문화예술',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    shortBio: '천안삼거리와 호두과자를 모티브로 AI 아트와 디지털 굿즈를 창작하는 예술 융합 교육',
    fullBio: '홍익대 미술학 석사 및 충남문화재단 문화예술교육사로, 생성형 AI 이미지 생성 기술을 통해 그림을 전공하지 않은 일반 시민도 작가가 되는 마법 같은 경험을 선물합니다.',
    teachingPhilosophy: '"누구나 마음속에 예술가가 살고 있습니다. AI는 그 예술가를 깨우는 가장 마법 같은 붓입니다."',
    career: [
      '천안예술의전당 문화예술아카데미 AI 아트 출강 (2024~현재)',
      '천안문화재단 시민예술학교 프로젝트 기획자',
      '충남문화재단 신진예술인 지원사업 선정',
      '천안 독립기념관 메타버스 아트 프로젝트 총괄'
    ],
    certifications: [
      '문화예술교육사 2급',
      '디지털일러스트레이터 1급',
      '시각디자인기사'
    ],
    districts: ['동남구', '서북구', '천안 전역'],
    rating: 4.95,
    reviewCount: 64,
    lectureCount: 89,
    portfolioTags: ['AI드로잉', '미드저니', '캔바', '굿즈제작', '천안스토리텔링'],
    featuredTopics: [
      '내 머릿속 상상을 화폭으로: 생성형 AI 프롬프트 드로잉 기초',
      '천안의 명소를 담은 AI 일러스트 에코백·머그컵 굿즈 디자인',
      '가족과 추억을 동화책으로 엮는 AI 스토리 & 삽화 출판 프로젝트'
    ],
    curriculum: [
      {
        session: 1,
        title: '말로 그리는 미술관: AI 이미지 생성 원리와 스타일 키워드',
        content: '수채화, 유화, 픽셀아트 등 다양한 화풍 프롬프트 구성법과 기초 실습',
        tools: ['Midjourney', 'DALL-E 3'],
        duration: '2시간'
      },
      {
        session: 2,
        title: '천안의 숨은 이야기 시각화하기 (천안삼거리, 각원사, 성성호수)',
        content: '천안 로컬 명소를 나만의 감성 일러스트로 표현하고 고화질 업스케일링',
        tools: ['Canva Magic Media', 'Upscaler'],
        duration: '2시간'
      },
      {
        session: 3,
        title: '실물 굿즈 제작을 위한 인쇄용 파일 변환 & 목업',
        content: '엽서, 패브릭 포스터, 스마트폰 그립톡 도안 완성 및 제작 발주 실습',
        tools: ['Canva Print Maker'],
        duration: '2시간'
      },
      {
        session: 4,
        title: '온라인 가상 메타버스 갤러리 개관 및 전시회',
        content: '수강생들의 작품을 모아 가상 갤러리를 구축하고 천안시민들에게 링크 공유',
        tools: ['Spatial.io', 'Artsteps'],
        duration: '2시간'
      }
    ],
    reviews: [
      {
        id: 'rev-07',
        author: '송은지',
        affiliation: '청수동 꿈꾸는 주부동아리',
        rating: 5,
        date: '2026-10-04',
        comment: '그림에 소질이 전혀 없던 제가 AI로 그린 그림으로 에코백을 만들었어요! 딸아이가 너무 자랑스러워합니다.',
        courseTitle: '나만의 AI 아트 & 굿즈 메이킹'
      }
    ],
    contactEmail: 'ma.jung@cheonan-instructor.kr',
    activeStatus: '출강 가능'
  },
  {
    id: 'inst-06',
    name: '강성호',
    title: '소상공인 스마트 상권 & AI 마케팅 코치',
    badge: '천안 골목상권 활성화 기여 표창',
    category: 'business-marketing',
    categoryLabel: '소상공인 / 마케팅 AI',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    shortBio: '천안 중앙시장, 신부동 먹자골목, 성성호수공원 주변 상인분들을 위한 실전 매출 증대 AI 교육',
    fullBio: '소상공인시장진흥공단 전문컨설턴트이자 20년 경력의 마케팅 디렉터입니다. 장사하느라 바쁜 사장님들이 복잡한 마케팅 대행사에 의존하지 않고, AI로 손쉽게 리뷰 관리와 홍보물을 해결할 수 있도록 돕습니다.',
    teachingPhilosophy: '"손님 한 분이 소중한 자영업 사장님들께 AI는 가장 든든하고 인건비 안 드는 매니저입니다."',
    career: [
      '소상공인시장진흥공단 천안센터 전임 마케팅 컨설턴트 (2020~현재)',
      '천안 중앙시장 상인대학 디지털 마케팅 주강사',
      '충남경제진흥원 골목상권 활성화 지원 멘토',
      '한국소상공인마케팅협회 충남지회장'
    ],
    certifications: [
      '경영지도사 (마케팅 부문)',
      '디지털마케팅전문가 (GA4/Meta)',
      '유통관리사 1급'
    ],
    districts: ['천안 전역', '동남구', '서북구'],
    rating: 4.99,
    reviewCount: 110,
    lectureCount: 184,
    portfolioTags: ['네이버플레이스', 'AI리뷰답글', '당근마켓광고', '스마트메뉴판', '고객관리'],
    featuredTopics: [
      '네이버 플레이스 순위를 뒤흔드는 AI 영수증 리뷰 분석 및 1초 맞춤 답글',
      '당근마켓과 인스타그램 동네 광고 카피 1분 만에 AI로 뽑아내기',
      '계절 메뉴판, 명절 선물세트 홍보 포스터 캔바 AI로 직접 디자인하기'
    ],
    curriculum: [
      {
        session: 1,
        title: '우리 가게 디지털 현주소 진단과 네이버 플레이스 AI 최적화',
        content: '천안 지역 키워드 분석과 AI로 검색 노출 확률을 높이는 소개글 작성',
        tools: ['네이버 스마트플레이스', 'ChatGPT'],
        duration: '2시간'
      },
      {
        session: 2,
        title: '정성 가득한 AI 고객 리뷰 답글 자동화 시스템',
        content: '칭찬 리뷰부터 악성 리뷰까지 감정을 상하지 않고 신뢰를 주는 답변 프롬프트',
        tools: ['Custom GPTs', '뤼튼'],
        duration: '2시간'
      },
      {
        session: 3,
        title: '돈 안 들이는 당근비즈니스 & 인스타그램 로컬 타깃 광고',
        content: '천안 2030, 4050 세대별 관심사를 저격하는 이벤트 홍보 문구 작성',
        tools: ['당근 비즈프로필', 'Canva'],
        duration: '2시간'
      },
      {
        session: 4,
        title: '카카오톡 채널 단골 관리와 재방문 쿠폰 마케팅',
        content: '단골 고객에게 보내는 계절 안부 메시지와 할인 쿠폰 템플릿 완성',
        tools: ['카카오톡 비즈니스', 'AI 이미지 생성기'],
        duration: '2시간'
      }
    ],
    reviews: [
      {
        id: 'rev-08',
        author: '배태환',
        affiliation: '천안 중앙시장 정육점 대표',
        rating: 5,
        date: '2026-10-27',
        comment: '새벽부터 고기 손질하느라 리뷰 답글 쓸 엄두가 안 났는데 강사님이 알려주신 폰 설정으로 10초 만에 답글을 답니다. 손님들이 감동했다고 단골이 되었어요.',
        courseTitle: '전통시장 사장님을 위한 1초 AI 마케팅'
      }
    ],
    contactEmail: 'sh.kang@cheonan-instructor.kr',
    activeStatus: '출강 가능'
  },
  {
    id: 'inst-07',
    name: '오세라',
    title: '디지털 리터러시 & AI 윤리 전문 강사',
    badge: '클린 디지털 천안 지킴이',
    category: 'digital-ethics',
    categoryLabel: '디지털 윤리 / AI 리터러시',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&q=80',
    shortBio: '시민 누구나 알아야 할 생성형 AI 저작권, 가짜뉴스 구별법, 딥페이크 디지털 성범죄 예방',
    fullBio: '한국지능정보사회진흥원(NIA) 전문강사 및 천안시 청소년상담복지센터 자문위원입니다. AI가 가져온 편리함 뒤에 숨겨진 개인정보 침해, 딥페이크 사기, 청소년 스마트폰 과몰입 문제를 균형 있게 짚어냅니다.',
    teachingPhilosophy: '"기술이 발전할수록 가장 중요한 것은 따뜻한 인간성과 올바른 윤리적 나침반입니다."',
    career: [
      '한국지능정보사회진흥원(NIA) 디지털 시민역량 전문강사 (2021~현재)',
      '천안시 학부모연합회 디지털 미디어 윤리 초빙 강사',
      '충청남도교육청 인공지능 윤리 교육과정 개발위원',
      '전 방송통신위원회 인터넷윤리 강사'
    ],
    certifications: [
      '디지털윤리지도사 1급',
      '청소년상담사 2급',
      '인공지능윤리지도사'
    ],
    districts: ['천안 전역', '서북구', '동남구'],
    rating: 4.96,
    reviewCount: 52,
    lectureCount: 96,
    portfolioTags: ['AI윤리', '딥페이크예방', '저작권', '스마트폰과의존예방', '디지털시민의식'],
    featuredTopics: [
      '눈으로 보고도 속는 세상: 딥페이크 영상과 가짜뉴스 판별 체크리스트',
      'AI가 그린 그림, 누구 것일까? 생성형 AI 저작권과 초상권 분쟁 예방',
      '우리 아이 스마트폰 과몰입 탈출: 건강한 디지털 디톡스와 AI 활용법'
    ],
    curriculum: [
      {
        session: 1,
        title: '생성형 AI 시대, 무엇이 진짜일까? 딥페이크 탐지와 위험성',
        content: '인공지능 합성 음성과 영상의 원리, 정교한 사기 수법과 판별 실습',
        tools: ['Deepfake Detector', 'FactCheck Lab'],
        duration: '2시간'
      },
      {
        session: 2,
        title: '저작권 침해 없는 안전한 AI 활용 가이드',
        content: '학교 과제 및 상업적 이용 시 저작권법과 올바른 출처 표기법',
        tools: ['한국저작권위원회 가이드라인'],
        duration: '2시간'
      },
      {
        session: 3,
        title: '청소년 사이버폭력 및 디지털 범죄 예방을 위한 부모 교육',
        content: '스마트폰 잠금 설정, 음란물 필터링 및 피해 발생 시 긴급 대처 매뉴얼',
        tools: ['디지털 성범죄 피해자 지원센터 안내'],
        duration: '2시간'
      },
      {
        session: 4,
        title: '우리 가족·기관의 디지털 건강 십계명 제정',
        content: 'AI 기술을 주도적으로 다루기 위한 올바른 디지털 습관 헌장 만들기',
        tools: ['디지털 웰빙 앱'],
        duration: '2시간'
      }
    ],
    reviews: [
      {
        id: 'rev-09',
        author: '이수경',
        affiliation: '천안 두정초등학교 학부모회장',
        rating: 5,
        date: '2026-10-15',
        comment: '아이들이 AI를 쓸 때마다 혹시 모를 위험 때문에 늘 불안했는데, 명쾌한 기준과 올바른 활용법을 짚어주셔서 큰 안도감이 들었습니다.',
        courseTitle: '학부모를 위한 AI 윤리와 안전한 미디어 교육'
      }
    ],
    contactEmail: 'sr.oh@cheonan-instructor.kr',
    activeStatus: '출강 가능'
  },
  {
    id: 'inst-08',
    name: '윤태진',
    title: '노코드 & AI 업무 자동화 엔지니어',
    badge: '천안 DX(디지털전환) 솔루션 마스터',
    category: 'nocode-automation',
    categoryLabel: '노코드 / 업무 자동화',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    shortBio: '코딩을 전혀 몰라도 OK! Make, Notion AI, Zapier로 만드는 나만의 자동화 비서',
    fullBio: '충남테크노파크 DX 자문위원 및 판교 IT 스타트업 CTO 출신으로, 천안 지역 중소벤처기업과 공공기관 직원들의 불필요한 단순 반복 업무를 제거하여 핵심 업무에 집중하도록 돕습니다.',
    teachingPhilosophy: '"사람은 창의적이고 가치 있는 일에 집중하고, 반복되는 노가다는 AI와 자동화 봇에 맡기세요."',
    career: [
      '충남테크노파크 디지털 전환(DX) 전문 자문위원 (2023~현재)',
      '천안 SB플라자 입주기업 업무 자동화 컨설턴트',
      '전 서울 마포 테크밸리 스타트업 CTO',
      '노코드 자동화 커뮤니티 파운더'
    ],
    certifications: [
      'Make (Integromat) Certified Partner',
      'Notion Certified Consultant',
      '정보처리기사'
    ],
    districts: ['천안 전역', '서북구', '동남구', '온라인'],
    rating: 4.98,
    reviewCount: 71,
    lectureCount: 112,
    portfolioTags: ['Make자동화', '노션AI', '구글시트자동화', '사내챗봇', 'RPA'],
    featuredTopics: [
      '클릭 몇 번으로 완성하는 이메일-구글 스프레드시트 실시간 데이터 연동',
      '천안 기업 실무자를 위한 Notion AI 대시보드와 지능형 프로젝트 관리',
      '사내 매뉴얼과 FAQ 문서를 학습시킨 카카오톡 자동응대 챗봇 구축'
    ],
    curriculum: [
      {
        session: 1,
        title: '노코드(No-code) 자동화의 기본 개념과 툴 선정',
        content: 'Make, Zapier의 기본 인터페이스 이해 및 웹훅(Webhook) 기초 실습',
        tools: ['Make.com', 'Zapier'],
        duration: '2시간'
      },
      {
        session: 2,
        title: '신청서 접수 시 자동 이메일 발송 & 엑셀 기록 파이프라인',
        content: '구글 폼 접수 즉시 알림톡/슬랙 알림 및 구글 시트 자동 저장 연동',
        tools: ['Make', 'Google Workspace'],
        duration: '2시간'
      },
      {
        session: 3,
        title: 'Notion AI를 결합한 주간 업무 보고서 자동 생성',
        content: '흩어진 업무 메모를 모아 1초 만에 깔끔한 경영진 보고서 양식으로 요약',
        tools: ['Notion AI'],
        duration: '2시간'
      },
      {
        session: 4,
        title: '우리 단체 전용 문서 학습 AI 챗봇 만들기',
        content: 'PDF 규정집을 올려놓으면 스스로 답변하는 지능형 고객응대 봇 완성',
        tools: ['Custom GPTs', 'Chatbase'],
        duration: '2시간'
      }
    ],
    reviews: [
      {
        id: 'rev-10',
        author: '곽지훈 팀장',
        affiliation: '천안 백석공단 제조기업 경영기획팀',
        rating: 5,
        date: '2026-10-19',
        comment: '매주 월요일마다 데이터 취합하느라 반나절을 썼는데 윤태진 강사님께 배운 자동화 파이프라인으로 1분 만에 끝납니다. 팀원들 만족도가 최고입니다.',
        courseTitle: '중소기업 실무자를 위한 노코드 AI 자동화'
      }
    ],
    contactEmail: 'tj.yoon@cheonan-instructor.kr',
    activeStatus: '출강 가능'
  }
];

export const CHEONAN_DISTRICTS = [
  '동남구 목천읍',
  '동남구 풍세면',
  '동남구 광덕면',
  '동남구 북면',
  '동남구 성남면',
  '동남구 수신면',
  '동남구 병천면',
  '동남구 동면',
  '동남구 중앙동',
  '동남구 문성동',
  '동남구 원성1동',
  '동남구 원성2동',
  '동남구 봉명동',
  '동남구 일봉동',
  '동남구 신방동',
  '동남구 청룡동 (청당/청수)',
  '동남구 신안동 (신부동)',
  '서북구 성환읍',
  '서북구 직산읍',
  '서북구 성거읍',
  '서북구 입장면',
  '서북구 성정1동',
  '서북구 성정2동',
  '서북구 쌍용1동',
  '서북구 쌍용2동',
  '서북구 쌍용3동',
  '서북구 백석동',
  '서북구 불당1동',
  '서북구 불당2동',
  '서북구 부성1동 (두정동)',
  '서북구 부성2동 (성성동)'
];
