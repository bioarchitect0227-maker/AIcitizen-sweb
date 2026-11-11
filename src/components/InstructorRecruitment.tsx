import React, { useState } from 'react';
import { Award, GraduationCap, CheckCircle2, ChevronRight, FileCheck, PhoneCall } from 'lucide-react';

export const InstructorRecruitment: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="py-14 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/30 text-sky-300 text-xs font-bold border border-blue-400/30">
              <Award className="w-3.5 h-3.5" />
              <span>천안시 시민강사 인력풀 상시 모집</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              당신의 AI·디지털 지식으로 천안의 이웃에게 희망을 전하세요
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              천안시는 지역사회 디지털 격차를 해소하고 함께 성장할 열정적인 
              <strong> 2026 천안시 신규 시민강사</strong>를 모십니다. 
              위촉 시 천안시 평생교육 조례에 따른 정규 강사료 지급, 최신 AI 툴 계정 지원 및 정기 전문 역량강화 연수 혜택이 제공됩니다.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-sky-200">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>천안시장 명의 위촉장</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>시 조례 규정 강사료</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>최신 AI 실습 계정 지원</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-slate-900 font-extrabold text-sm shadow-lg transition-all text-center cursor-pointer"
            >
              시민강사 등록 신청 안내 보기
            </button>
            <div className="text-center text-xs text-slate-400">
              문의: 평생학습과 041-521-3760
            </div>
          </div>
        </div>
      </div>

      {/* Info Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 text-slate-800 space-y-5 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                <span>천안시 시민강사 등록 지원 자격</span>
              </h4>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="text-xs space-y-3 leading-relaxed text-slate-600">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <strong className="text-slate-900 block mb-1">1. 지원 자격:</strong>
                천안시에 주민등록을 두거나 관내 직장/학교에 재직·재학 중인 분으로, 인공지능(AI), 소프트웨어 코딩, 스마트폰, 미디어 영상 분야 전문 자격증 소지자 또는 교육 경력 1년 이상인 자.
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <strong className="text-slate-900 block mb-1">2. 선발 절차:</strong>
                서류 접수 → 시연 강의 및 면접 심사 → 위촉 전 역량강화 연수(16시간 이수) → 최종 위촉장 수여.
              </div>

              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-blue-900">
                <strong className="block mb-1">3. 접수 방법:</strong>
                천안시 평생학습포털 서식 다운로드 후 평생학습과 이메일(cheonan_learn@korea.kr) 또는 방문 접수 (천안시 동남구 화랑로 108).
              </div>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 cursor-pointer"
            >
              확인하였습니다
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
