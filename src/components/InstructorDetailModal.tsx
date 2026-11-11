import React, { useState } from 'react';
import { Instructor } from '../types';
import { 
  X, 
  Award, 
  Star, 
  MapPin, 
  CalendarCheck, 
  BookOpen, 
  CheckCircle, 
  GraduationCap, 
  ShieldCheck, 
  Clock, 
  Mail,
  ChevronRight,
  Share2,
  Check
} from 'lucide-react';

interface InstructorDetailModalProps {
  instructor: Instructor | null;
  onClose: () => void;
  onApply: (instructor: Instructor) => void;
}

export const InstructorDetailModal: React.FC<InstructorDetailModalProps> = ({
  instructor,
  onClose,
  onApply
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'curriculum' | 'career' | 'reviews'>('curriculum');

  if (!instructor) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="relative bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-600 text-white p-6 sm:p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="relative shrink-0">
              <img
                src={instructor.avatar}
                alt={instructor.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-white/30 shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full shadow-md">
                <CheckCircle className="w-4 h-4" />
              </div>
            </div>

            <div className="text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white border border-white/20">
                  <Award className="w-3.5 h-3.5 text-amber-300" />
                  {instructor.badge}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-400 text-slate-900">
                  {instructor.activeStatus}
                </span>
                <span className="text-xs text-blue-100 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  출강 가능: {instructor.districts.join(', ')}
                </span>
              </div>

              <div className="flex flex-wrap items-baseline justify-center sm:justify-start gap-3">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {instructor.name} <span className="text-sm font-normal text-blue-200">시민강사</span>
                </h2>
                <div className="flex items-center gap-1 text-amber-300 text-sm font-bold bg-white/10 px-2.5 py-0.5 rounded-md">
                  <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                  <span>{instructor.rating.toFixed(2)}</span>
                  <span className="text-blue-100 font-normal">({instructor.reviewCount}개 평가)</span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-blue-100 font-medium mt-1">
                {instructor.title}
              </p>

              <blockquote className="mt-3 text-xs sm:text-sm text-sky-200 italic border-l-2 border-sky-400 pl-3">
                {instructor.teachingPhilosophy}
              </blockquote>
            </div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6">
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`py-3.5 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'curriculum'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>강의 계획서 (커리큘럼)</span>
          </button>

          <button
            onClick={() => setActiveTab('career')}
            className={`py-3.5 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'career'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>이력 및 전문 자격</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3.5 px-4 text-sm font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'reviews'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>수강생 생생 후기 ({instructor.reviews.length})</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {/* TAB 1: Curriculum */}
          {activeTab === 'curriculum' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
                  강사 상세 소개 (Instructor Profile)
                </h4>
                <p className="text-sm leading-relaxed text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  {instructor.fullBio}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span>회차별 상세 강의 계획서 (총 {instructor.curriculum.length}차시)</span>
                  </h4>
                  <span className="text-xs text-slate-500 font-medium">
                    * 기관 요청에 따라 1회 특강 또는 2~4회로 탄력 편성 가능
                  </span>
                </div>

                <div className="space-y-3">
                  {instructor.curriculum.map((item) => (
                    <div 
                      key={item.session}
                      className="p-4 rounded-2xl border border-slate-200/80 bg-white hover:border-blue-300 transition-colors shadow-2xs"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center shrink-0">
                            {item.session}강
                          </span>
                          <h5 className="text-sm font-bold text-slate-900">
                            {item.title}
                          </h5>
                        </div>
                        {item.duration && (
                          <span className="text-xs text-slate-400 flex items-center gap-1 shrink-0">
                            <Clock className="w-3 h-3" />
                            {item.duration}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 mt-2 pl-9 leading-relaxed">
                        {item.content}
                      </p>

                      <div className="flex items-center gap-1.5 mt-3 pl-9">
                        <span className="text-[11px] font-bold text-slate-400">활용 AI/SW:</span>
                        {item.tools.map((tool, idx) => (
                          <span 
                            key={idx}
                            className="text-[11px] px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-medium border border-blue-100"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Topics preview */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-900">
                <div className="font-bold flex items-center gap-1.5 mb-1 text-amber-800">
                  <ShieldCheck className="w-4 h-4" />
                  <span>천안시민 무료 평생교육 보증 안내</span>
                </div>
                본 강좌는 천안시 평생학습 지원 조례에 따라 강사료 전액이 시청에서 지원되며, 신청 기관이나 수강자에게 별도 비용이 발생하지 않습니다.
              </div>
            </div>
          )}

          {/* TAB 2: Career & Certifications */}
          {activeTab === 'career' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span>주요 활동 및 출강 이력 (천안시 및 충남)</span>
                </h4>
                <ul className="space-y-2.5">
                  {instructor.career.map((car, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></span>
                      <span>{car}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>보유 자격 및 공인 인증</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {instructor.certifications.map((cert, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <h4 className="text-sm font-bold text-slate-900 mb-2">
                  출강 가능 지역 및 환경
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  천안시 <strong>{instructor.districts.join(', ')}</strong> 관내 경로당, 주민자치센터, 도서관, 복지관, 초중고교, 소상공인 사업장, 동아리 모임 공간 출강 가능 (온라인 실시간 Zoom 원격 강의 지원).
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <div className="text-2xl font-black text-slate-900">
                    ★ {instructor.rating.toFixed(2)} <span className="text-xs font-normal text-slate-500">/ 5.0</span>
                  </div>
                  <div className="text-xs text-slate-500">천안시민 및 기관 담당자 만족도 평가</div>
                </div>
                <div className="text-xs text-slate-500 text-right">
                  총 출강 <strong>{instructor.lectureCount}회</strong> 진행 완료
                </div>
              </div>

              <div className="space-y-3">
                {instructor.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-xs text-slate-800">{rev.author}</span>
                        <span className="text-[11px] text-slate-500 ml-1.5">({rev.affiliation})</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 text-xs">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                        <span className="text-[11px] text-slate-400 ml-1">{rev.date}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      "{rev.comment}"
                    </p>
                    <div className="text-[11px] text-blue-600 font-medium">
                      수강 과목: {rev.courseTitle}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Fixed CTA */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <button
              onClick={handleShare}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? '링크 복사됨' : '프로필 공유'}</span>
            </button>
            <span>천안시민 무료 평생교육 사업</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              닫기
            </button>

            <button
              onClick={() => {
                onClose();
                onApply(instructor);
              }}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-bold shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>{instructor.name} 강사로 강의 신청하기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
