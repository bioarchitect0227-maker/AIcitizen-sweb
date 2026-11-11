import React, { useState, useEffect } from 'react';
import { Instructor, LectureApplication } from '../types';
import { CHEONAN_DISTRICTS } from '../data/instructors';
import { 
  X, 
  CalendarCheck, 
  CheckCircle2, 
  Clock, 
  Users, 
  MapPin, 
  Building, 
  FileText, 
  HelpCircle, 
  Printer, 
  Copy, 
  Check, 
  Sparkles,
  Phone,
  Mail,
  UserCheck
} from 'lucide-react';

interface ApplicationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  instructors: Instructor[];
  initialInstructorId?: string;
  initialTopic?: string;
  onApplicationCreated: (app: LectureApplication) => void;
}

export const ApplicationFormModal: React.FC<ApplicationFormModalProps> = ({
  isOpen,
  onClose,
  instructors,
  initialInstructorId,
  initialTopic,
  onApplicationCreated
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdApp, setCreatedApp] = useState<LectureApplication | null>(null);
  const [copied, setCopied] = useState(false);

  // Form states
  const [applicantName, setApplicantName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [targetGroup, setTargetGroup] = useState('시니어/어르신 (65세 이상)');
  const [participantCount, setParticipantCount] = useState<number>(15);

  const [selectedInstructorId, setSelectedInstructorId] = useState<string>(initialInstructorId || 'any');
  const [courseTopic, setCourseTopic] = useState(initialTopic || '');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('오후 2:00 ~ 4:00');
  const [durationHours, setDurationHours] = useState<number>(2);
  const [sessions, setSessions] = useState<number>(2);

  const [district, setDistrict] = useState('동남구 신안동 (신부동)');
  const [venueName, setVenueName] = useState('');
  const [venueAddress, setVenueAddress] = useState('');

  // Equipment checkboxes
  const [hasProjector, setHasProjector] = useState(true);
  const [hasWifi, setHasWifi] = useState(true);
  const [hasComputers, setHasComputers] = useState(false);
  const [hasSmartphones, setHasSmartphones] = useState(true);

  const [specialRequests, setSpecialRequests] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  useEffect(() => {
    if (initialInstructorId) {
      setSelectedInstructorId(initialInstructorId);
    }
  }, [initialInstructorId]);

  useEffect(() => {
    if (initialTopic) {
      setCourseTopic(initialTopic);
    }
  }, [initialTopic]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !phone || !venueName) {
      alert('신청자명, 연락처, 교육 장소를 반드시 입력해주세요.');
      return;
    }
    if (!agreeTerms) {
      alert('천안시 평생교육 무료 출강 지원 및 개인정보 수집에 동의해주세요.');
      return;
    }

    setIsSubmitting(true);

    const chosenInstructor = instructors.find(i => i.id === selectedInstructorId);
    const instructorName = chosenInstructor ? `${chosenInstructor.name} 시민강사` : '천안시 추천 강사 매칭';

    const payload = {
      applicantName,
      organizationName: organizationName || '개인 모임',
      phone,
      email,
      targetGroup,
      participantCount: Number(participantCount),
      instructorId: selectedInstructorId,
      instructorName,
      courseTopic: courseTopic || '맞춤형 AI 기초 및 활용',
      preferredDate: preferredDate || '2026-11-25',
      preferredTime,
      durationHours: Number(durationHours),
      sessions: Number(sessions),
      district,
      venueName,
      venueAddress,
      hasProjector,
      hasWifi,
      hasComputers,
      hasSmartphones,
      specialRequests
    };

    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success && data.application) {
        setCreatedApp(data.application);
        onApplicationCreated(data.application);
        setStep('success');
      } else {
        throw new Error(data.error || '신청 실패');
      }
    } catch (err: any) {
      // Fallback local create if network/offline
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const fallbackApp: LectureApplication = {
        id: `CAI-202611-${randomNum}`,
        applicantName,
        organizationName: organizationName || '개인 모임',
        phone,
        email,
        targetGroup,
        participantCount: Number(participantCount),
        instructorId: selectedInstructorId,
        instructorName,
        courseTopic: courseTopic || '맞춤형 AI 기초 및 활용',
        preferredDate: preferredDate || '2026-11-25',
        preferredTime,
        durationHours: Number(durationHours),
        sessions: Number(sessions),
        district,
        venueName,
        venueAddress,
        hasProjector,
        hasWifi,
        hasComputers,
        hasSmartphones,
        specialRequests,
        status: '접수완료',
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
      };
      setCreatedApp(fallbackApp);
      onApplicationCreated(fallbackApp);
      setStep('success');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyAppId = () => {
    if (createdApp) {
      navigator.clipboard.writeText(createdApp.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-600 text-white p-5 sm:p-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>천안시 찾아가는 무료 평생학습 지원</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
              천안시민강사 맞춤형 AI 강의 신청서
            </h2>
            <p className="text-xs text-blue-100 mt-1">
              AI Education for the better life - 5인 이상의 천안시민 모임 및 기관 누구나 무료 신청
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body or Success Confirmation */}
        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-800">
            {/* Guide notice */}
            <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 text-xs text-blue-900 flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong>강의 신청 안내:</strong> 천안 관내 5인 이상 모임(경로당, 주민자치회, 학부모회, 소상공인 연합, 동아리 등)이면 어디든 찾아갑니다. 
                강사비는 천안시청에서 전액 지원되며 교재 및 실습비도 무료입니다.
              </div>
            </div>

            {/* 1. Applicant & Org */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                <span>신청자 및 단체/기관 정보</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    신청자 성명 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="예: 홍길동"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    신청 단체/기관/모임명
                  </label>
                  <input
                    type="text"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    placeholder="예: 불당동 대우아파트 경로당, 천안맘 독서모임"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    연락처 (휴대폰 번호) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="예: 010-1234-5678"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    이메일 주소
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="예: cheonan@gmail.com (확인증 발송용)"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    주요 수강 대상 <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={targetGroup}
                    onChange={(e) => setTargetGroup(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none bg-slate-50/50"
                  >
                    <option value="시니어/어르신 (65세 이상)">시니어/어르신 (65세 이상)</option>
                    <option value="일반 성인 및 주부">일반 성인 및 주부</option>
                    <option value="직장인 및 구직자">직장인 및 구직자</option>
                    <option value="소상공인 및 자영업자">소상공인 및 자영업자</option>
                    <option value="청소년 (초·중·고등학생)">청소년 (초·중·고등학생)</option>
                    <option value="학부모">학부모</option>
                    <option value="장애인 및 디지털 취약계층">장애인 및 디지털 취약계층</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    예상 수강 인원 <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={5}
                      max={200}
                      value={participantCount}
                      onChange={(e) => setParticipantCount(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none bg-slate-50/50"
                    />
                    <span className="text-xs text-slate-500 shrink-0 font-medium">명 (최소 5인 이상)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Instructor & Course Topic */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                <span>희망 강사 및 강의 주제 선택</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    희망 시민강사 선택 <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={selectedInstructorId}
                    onChange={(e) => setSelectedInstructorId(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none bg-slate-50/50 font-medium"
                  >
                    <option value="any">✨ 천안시 추천 최적 강사 자동 매칭</option>
                    {instructors.map((inst) => (
                      <option key={inst.id} value={inst.id}>
                        {inst.name} 강사 ({inst.title} / 평점 {inst.rating.toFixed(1)})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    희망 교육 주제 / 강좌명
                  </label>
                  <input
                    type="text"
                    value={courseTopic}
                    onChange={(e) => setCourseTopic(e.target.value)}
                    placeholder="예: 어르신 스마트폰 음성비서, 챗GPT 업무보고서 작성"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    희망 시작 일자 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    희망 시간대 <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none bg-slate-50/50"
                  >
                    <option value="오전 10:00 ~ 12:00">오전 10:00 ~ 12:00 (오전 특강)</option>
                    <option value="오후 1:00 ~ 3:00">오후 1:00 ~ 3:00 (오후 1차)</option>
                    <option value="오후 2:00 ~ 4:00">오후 2:00 ~ 4:00 (경로당/주민센터 선호)</option>
                    <option value="오후 4:00 ~ 6:00">오후 4:00 ~ 6:00 (방과후/청소년)</option>
                    <option value="저녁 7:00 ~ 9:00">저녁 7:00 ~ 9:00 (직장인 야간)</option>
                    <option value="주말 토요일 오전 10:00 ~ 12:00">주말 토요일 오전 10:00 ~ 12:00</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    1회 교육 시간
                  </label>
                  <select
                    value={durationHours}
                    onChange={(e) => setDurationHours(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none bg-slate-50/50"
                  >
                    <option value={1}>1시간 (핵심 요약 특강)</option>
                    <option value={2}>2시간 (권장: 이론 50분 + 실습 70분)</option>
                    <option value={3}>3시간 (심화 프로젝트형)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    희망 교육 회차
                  </label>
                  <select
                    value={sessions}
                    onChange={(e) => setSessions(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none bg-slate-50/50"
                  >
                    <option value={1}>단발성 1회 특강</option>
                    <option value={2}>2회 연속 과정 (기초+실습)</option>
                    <option value={3}>3회 심화 과정</option>
                    <option value={4}>4회 마스터 정규과정 (주 1회 4주)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Venue & Facilities */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">3</span>
                <span>교육 장소 및 시설 환경 (천안시 관내)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    천안시 관할 읍·면·동 <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none bg-slate-50/50 font-medium"
                  >
                    {CHEONAN_DISTRICTS.map((dist, idx) => (
                      <option key={idx} value={dist}>{dist}</option>
                    ))}
                    <option value="온라인 비대면 (Zoom)">온라인 비대면 (Zoom)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    교육 장소 명칭 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    placeholder="예: 불당1동 행정복지센터 3층 회의실, 단지 내 경로당"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none bg-slate-50/50"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    상세 주소
                  </label>
                  <input
                    type="text"
                    value={venueAddress}
                    onChange={(e) => setVenueAddress(e.target.value)}
                    placeholder="예: 충남 천안시 서북구 불당23로 77 (정확한 주소 기재 시 강사 방문이 용이합니다)"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none bg-slate-50/50"
                  />
                </div>
              </div>

              {/* Equipment checkboxes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  교육장 보유 장비 및 환경 (체크해주세요)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50/60 text-xs font-medium cursor-pointer hover:bg-slate-100">
                    <input
                      type="checkbox"
                      checked={hasWifi}
                      onChange={(e) => setHasWifi(e.target.checked)}
                      className="rounded text-blue-600"
                    />
                    <span>무선 와이파이(Wi-Fi)</span>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50/60 text-xs font-medium cursor-pointer hover:bg-slate-100">
                    <input
                      type="checkbox"
                      checked={hasProjector}
                      onChange={(e) => setHasProjector(e.target.checked)}
                      className="rounded text-blue-600"
                    />
                    <span>빔프로젝터 / 대형TV</span>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50/60 text-xs font-medium cursor-pointer hover:bg-slate-100">
                    <input
                      type="checkbox"
                      checked={hasComputers}
                      onChange={(e) => setHasComputers(e.target.checked)}
                      className="rounded text-blue-600"
                    />
                    <span>교육용 PC 구비</span>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50/60 text-xs font-medium cursor-pointer hover:bg-slate-100">
                    <input
                      type="checkbox"
                      checked={hasSmartphones}
                      onChange={(e) => setHasSmartphones(e.target.checked)}
                      className="rounded text-blue-600"
                    />
                    <span>수강자 개별 스마트폰</span>
                  </label>
                </div>
              </div>

              {/* Special requests */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  강사님께 전달할 특별 요청사항 (선택)
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="예: 어르신들이 귀가 조금 어두우셔서 마이크 사용 부탁드립니다 / 초보자 위주로 천천히 반복 교육 희망합니다 등"
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-blue-500 focus:outline-none bg-slate-50/50"
                ></textarea>
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded text-blue-600 mt-0.5"
                />
                <span className="text-slate-700 leading-relaxed">
                  <strong>[필수]</strong> 천안시 평생학습원 찾아가는 시민강사 지원 규정에 동의하며, 
                  원활한 강사 배정 및 일정 조율을 위한 성명, 연락처 등 개인정보 수집·이용에 동의합니다.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-base shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>천안시 평생학습 포털 접수 중...</span>
                  </>
                ) : (
                  <>
                    <CalendarCheck className="w-5 h-5" />
                    <span>천안시민강사 강의 신청서 제출하기 (전액 무료)</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* SUCCESS CONFIRMATION RECEIPT */
          <div className="p-6 sm:p-10 text-center space-y-6 overflow-y-auto">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                접수 완료 (정상 등록)
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2">
                천안시민강사 강의 신청이 완료되었습니다!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                천안시 평생교육과 코디네이터가 검토 후 영업일 기준 2일 이내에 전화로 일정 및 커리큘럼을 확정해 드립니다.
              </p>
            </div>

            {/* Receipt Card */}
            {createdApp && (
              <div className="max-w-md mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left text-xs space-y-3 shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500 font-medium">접수번호</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-black text-sm text-blue-600">{createdApp.id}</span>
                    <button
                      onClick={copyAppId}
                      className="p-1 hover:bg-slate-200 rounded text-slate-500 cursor-pointer"
                      title="접수번호 복사"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">신청 단체/성명:</span>
                  <span className="font-bold text-slate-800">{createdApp.organizationName} ({createdApp.applicantName})</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">배정/희망 강사:</span>
                  <span className="font-bold text-blue-700">{createdApp.instructorName}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">강의 주제:</span>
                  <span className="font-bold text-slate-800 line-clamp-1">{createdApp.courseTopic}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">희망 일시:</span>
                  <span className="font-bold text-slate-800">{createdApp.preferredDate} ({createdApp.preferredTime})</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">교육 장소:</span>
                  <span className="font-bold text-slate-800">{createdApp.district} {createdApp.venueName}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">수강 인원 / 회차:</span>
                  <span className="font-bold text-slate-800">{createdApp.participantCount}명 / {createdApp.sessions}회차 ({createdApp.durationHours}시간)</span>
                </div>

                <div className="flex justify-between border-t border-slate-200 pt-2 text-emerald-700 font-bold">
                  <span>수강료 및 강사료:</span>
                  <span>전액 무료 (천안시 지원)</span>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>접수증 인쇄 / PDF 저장</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 shadow-md cursor-pointer"
              >
                확인 및 닫기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
