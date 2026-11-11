import React, { useState } from 'react';
import { 
  MapPin, 
  Building, 
  Laptop, 
  Wifi, 
  Monitor, 
  Phone, 
  Clock, 
  Bus,
  CheckCircle2,
  CalendarCheck
} from 'lucide-react';

interface EducationLocationsProps {
  onOpenApply: () => void;
}

export const EducationLocations: React.FC<EducationLocationsProps> = ({ onOpenApply }) => {
  const [activeDistrict, setActiveDistrict] = useState<'all' | 'dongnam' | 'seobuk'>('all');

  const hubs = [
    {
      id: 'hub-1',
      district: 'dongnam',
      districtName: '동남구',
      name: '천안시 평생학습관 디지털 AI 강의실',
      address: '충남 천안시 동남구 화랑로 108 (원성동)',
      description: '최신 교육용 PC 30대, 대형 스마트 전자칠판, 고속 Wi-Fi 완비. 시민강사 정기 역량강화 연수 및 주말 시민 AI 특강 장소.',
      facilities: ['교육용 PC 30대', '스마트 전자칠판', '초고속 Wi-Fi', '마이크 음향시설', '장애인 편의시설'],
      phone: '041-521-3760',
      hours: '평일 09:00 ~ 21:00 / 토요일 09:00 ~ 17:00'
    },
    {
      id: 'hub-2',
      district: 'dongnam',
      districtName: '동남구',
      name: '천안시민대학 디지털 상상존',
      address: '충남 천안시 동남구 버들로 40 동남구청사 별관 4층',
      description: '원도심 시민과 어르신들을 위한 1:1 스마트폰 배움터 및 AI 생활밀착 실습 공간.',
      facilities: ['태블릿 PC 20대', '스마트폰 충전 스테이션', '체험형 키오스크', '상담 부스'],
      phone: '041-521-3765',
      hours: '평일 09:00 ~ 18:00'
    },
    {
      id: 'hub-3',
      district: 'seobuk',
      districtName: '서북구',
      name: '천안청년센터 이음 디지털 스튜디오',
      address: '충남 천안시 서북구 불당25로 142 (불당동)',
      description: '청년 창업자, 대학생, 1인 크리에이터를 위한 AI 숏폼 영상 제작 및 프롬프트 실습 장비 완비.',
      facilities: ['방송 조명 & 크로마키', '영상 편집용 고성능 PC', '팟캐스트 녹음 마이크', '빔프로젝터'],
      phone: '041-900-8001',
      hours: '평일 10:00 ~ 21:00 / 토 10:00 ~ 18:00'
    },
    {
      id: 'hub-4',
      district: 'seobuk',
      districtName: '서북구',
      name: '쌍용도서관 디지털 체험존',
      address: '충남 천안시 서북구 월봉로 30 (쌍용동)',
      description: '지역 주민과 어린이들이 생성형 AI 동화책, 인터랙티브 코딩을 체험할 수 있는 가족 친화형 공간.',
      facilities: ['가족형 실습 데스크', 'AI 그림 생성 PC', '어린이 코딩 교구', '3D 프린터'],
      phone: '041-521-3870',
      hours: '화~일 09:00 ~ 18:00 (월요일 휴관)'
    },
    {
      id: 'hub-5',
      district: 'dongnam',
      districtName: '동남구',
      name: '천안 중앙시장 상인회 스마트 배움터',
      address: '충남 천안시 동남구 사직로 7 (사직동)',
      description: '시장 상인분들이 장사 전후 틈틈이 들러 네이버 지도 등록과 영수증 리뷰 관리를 배우는 현장 밀착 교육장.',
      facilities: ['모바일 실습 테이블', '태블릿 PC', 'Wi-Fi', '상인 맞춤 1:1 튜터'],
      phone: '041-555-1150',
      hours: '평일 14:00 ~ 18:00'
    },
    {
      id: 'hub-6',
      district: 'seobuk',
      districtName: '서북구',
      name: '성환문화회관 디지털 배움실',
      address: '충남 천안시 서북구 성환읍 성환백석길 67',
      description: '북부 읍면지역(성환, 직산, 성거, 입장) 어르신과 농업인을 위한 찾아가는 디지털 문해 거점.',
      facilities: ['교육용 노트북 15대', '대형 TV 모니터', '음향 마이크'],
      phone: '041-521-3950',
      hours: '평일 09:00 ~ 18:00'
    }
  ];

  const filteredHubs = activeDistrict === 'all' 
    ? hubs 
    : hubs.filter(h => h.district === activeDistrict);

  return (
    <section className="py-14 sm:py-20 bg-slate-50/70 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
            <MapPin className="w-3.5 h-3.5" />
            <span>천안시 31개 읍·면·동 배움 거점</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            천안 어디서나 만나는 디지털 & AI 교육 거점
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            교육 시설이 갖춰진 거점 배움터는 물론, 마을 경로당, 행정복지센터 회의실, 동아리 공간까지 
            <strong> 시민강사가 직접 장비와 교재를 지참하고 방문</strong>합니다.
          </p>
        </div>

        {/* Bus Special Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <Bus className="w-8 h-8 text-amber-300" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-300 bg-black/20 px-2 py-0.5 rounded-full">
                특수 시책
              </span>
              <h3 className="text-lg sm:text-xl font-bold mt-1">
                천안시 찾아가는 "에듀버스(Edu-Bus)" 이동형 AI 체험관
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 mt-0.5">
                원거리 농촌 마을회관이나 컴퓨터실이 없는 경로당으로 노트북과 통신망이 완비된 특수버스가 직접 찾아갑니다!
              </p>
            </div>
          </div>

          <button
            onClick={onOpenApply}
            className="w-full md:w-auto px-5 py-3 rounded-xl bg-white text-blue-800 font-extrabold text-xs hover:bg-blue-50 shrink-0 shadow-md transition-all cursor-pointer"
          >
            찾아가는 에듀버스 신청하기 →
          </button>
        </div>

        {/* District Switcher */}
        <div className="flex justify-center gap-2">
          {[
            { id: 'all', label: '천안시 전체 거점' },
            { id: 'dongnam', label: '동남구 거점 센터' },
            { id: 'seobuk', label: '서북구 거점 센터' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveDistrict(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeDistrict === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Hubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHubs.map((hub) => (
            <div
              key={hub.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                    {hub.districtName}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-1.5">
                    {hub.name}
                  </h4>
                </div>
              </div>

              <div className="text-xs text-slate-600 flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{hub.address}</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                {hub.description}
              </p>

              <div>
                <div className="text-[11px] font-bold text-slate-400 mb-1.5">구비 시설 및 장비:</div>
                <div className="flex flex-wrap gap-1">
                  {hub.facilities.map((fac, i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-medium">
                      ✓ {fac}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-blue-600" />
                  {hub.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {hub.hours.split('/')[0]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
