import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  CalendarCheck, 
  Users, 
  MapPin, 
  Mic, 
  Menu, 
  X,
  FileCheck
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'instructors' | 'apply' | 'status' | 'ai-match' | 'locations';
  setActiveTab: (tab: 'home' | 'instructors' | 'apply' | 'status' | 'ai-match' | 'locations') => void;
  openApplyModal: (instructorId?: string) => void;
  openVoiceModal: () => void;
  openAiMatchModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openApplyModal,
  openVoiceModal,
  openAiMatchModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: '홈' },
    { id: 'instructors', label: '시민강사 소개' },
    { id: 'apply', label: '강의 신청' },
    { id: 'status', label: '신청 내역 조회' },
    { id: 'ai-match', label: 'AI 맞춤 매칭' },
    { id: 'locations', label: '교육 거점·후기' },
  ] as const;

  const handleNavClick = (id: typeof activeTab) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top micro bar for Cheonan civic identity */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-600 text-white text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium tracking-tight">천안시 찾아가는 디지털 평생학습 지원 포털</span>
            <span className="hidden md:inline-block text-blue-200">|</span>
            <span className="hidden md:inline-block text-blue-100 font-semibold tracking-wide">
              AI Education for the better life
            </span>
          </div>
          <div className="flex items-center gap-4 text-blue-100">
            <span className="hidden sm:inline">평생학습과 직통: 041-521-3760</span>
            <span className="text-white bg-blue-900/60 px-2 py-0.5 rounded text-[11px] font-medium">
              31개 읍면동 전액 무료
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo brand */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <span className="tracking-tighter">天安</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                  천안시 시민강사
                </span>
                <span className="bg-blue-100 text-blue-700 text-[11px] font-bold px-2 py-0.5 rounded-full">
                  배움터
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-tight">
                AI Education for the better life
              </p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activeTab === item.id
                    ? 'text-blue-600 bg-blue-50/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* AI Voice Assistant quick trigger */}
            <button
              onClick={openVoiceModal}
              title="실시간 AI 음성 튜터와 대화하기"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 transition-colors shadow-xs cursor-pointer"
            >
              <Mic className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
              <span>AI 음성 튜터</span>
            </button>

            {/* AI Match Button */}
            <button
              onClick={openAiMatchModal}
              title="어떤 강사가 좋을지 AI 추천받기"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 transition-colors shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>AI 강사 매칭</span>
            </button>

            {/* Direct Apply CTA */}
            <button
              onClick={() => openApplyModal()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/35 transition-all cursor-pointer active:scale-98"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>강의 신청하기</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => openApplyModal()}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700"
            >
              강의신청
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between ${
                  activeTab === item.id
                    ? 'text-blue-600 bg-blue-50 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                {activeTab === item.id && <span className="w-2 h-2 rounded-full bg-blue-600"></span>}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openVoiceModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-50 text-indigo-700 font-semibold text-sm border border-indigo-200"
            >
              <Mic className="w-4 h-4 text-indigo-600" />
              <span>AI 음성 대화 튜터 체험</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAiMatchModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 font-semibold text-sm border border-emerald-200"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>AI 맞춤 강사 & 커리큘럼 추천</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openApplyModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white font-bold text-base shadow-md"
            >
              <CalendarCheck className="w-5 h-5" />
              <span>강의 신청서 작성하기</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
