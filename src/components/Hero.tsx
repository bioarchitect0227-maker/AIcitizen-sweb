import React from 'react';
import { 
  Sparkles, 
  CalendarCheck, 
  Users, 
  Award, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  ShieldCheck, 
  Mic,
  MapPin
} from 'lucide-react';

interface HeroProps {
  onSearch: (term: string) => void;
  openApplyModal: () => void;
  openAiMatchModal: () => void;
  openVoiceModal: () => void;
  onExploreInstructors: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSearch,
  openApplyModal,
  openAiMatchModal,
  openVoiceModal,
  onExploreInstructors
}) => {
  const [searchInput, setSearchInput] = React.useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    } else {
      onExploreInstructors();
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-indigo-950 to-slate-900 text-white pt-12 pb-20 sm:pt-16 sm:pb-28">
      {/* Dynamic ambient background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute top-1/3 right-10 w-[480px] h-[480px] bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full max-w-6xl h-40 bg-sky-500/10 rounded-full blur-2xl pointer-events-none"></div>

      {/* Grid texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Civic Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-blue-200 text-xs sm:text-sm font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>2026 천안시 평생학습원 공인 시민강사 프로젝트</span>
            <span className="text-white/40">|</span>
            <span className="text-amber-300 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 inline" /> 천안 31개 읍·면·동 찾아가는 배움터
            </span>
          </div>

          {/* User mandatory slogan: "AI Education for the better life" */}
          <div className="pt-2">
            <div className="text-xs sm:text-sm md:text-base font-bold uppercase tracking-widest text-sky-400/90 mb-2 font-mono">
              Empowering Cheonan Citizens
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-100 to-indigo-200 drop-shadow-sm font-sans">
                AI Education for the better life
              </span>
              <span className="block mt-3 text-2xl sm:text-4xl lg:text-5xl text-white font-extrabold tracking-tight">
                더 나은 삶을 여는 천안시 시민강사 배움터
              </span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-normal">
            스마트폰 음성 비서부터 ChatGPT 실무, 1인 미디어 제작, 소상공인 마케팅까지 — <br className="hidden sm:inline" />
            <strong className="text-white font-semibold">천안시가 공인한 전문 시민강사</strong>가 
            동남구·서북구 주민센터, 경로당, 학교, 일터로 <span className="text-sky-300 underline underline-offset-4 decoration-sky-400/50">직접 찾아가 전액 무료</span>로 교육해 드립니다.
          </p>

          {/* Search bar inside Hero */}
          <div className="pt-4 max-w-2xl mx-auto">
            <form 
              onSubmit={handleSearchSubmit}
              className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-2xl flex flex-col sm:flex-row items-center gap-2"
            >
              <div className="flex items-center gap-3 px-3 py-1 flex-1 w-full text-left">
                <Search className="w-5 h-5 text-sky-300 shrink-0" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="강사명, 분야(예: 스마트폰, ChatGPT, 영상, 소상공인) 검색..."
                  className="bg-transparent text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none w-full"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold text-sm tracking-wide shadow-md transition-all shrink-0 cursor-pointer"
              >
                강사 검색하기
              </button>
            </form>

            {/* Quick popular tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-slate-300">
              <span className="text-slate-400">인기 키워드:</span>
              {[
                'ChatGPT 실무',
                '어르신 스마트폰',
                '유튜브 쇼츠',
                '천안 소상공인 마케팅',
                '청소년 AI 코딩',
                '보이스피싱 예방'
              ].map((tag) => (
                <button
                  key={tag}
                  onClick={() => onSearch(tag)}
                  className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          {/* Action Button Row */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => openApplyModal()}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 via-indigo-600 to-sky-500 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-base shadow-xl shadow-blue-500/30 hover:scale-102 active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
            >
              <CalendarCheck className="w-5 h-5" />
              <span>무료 강의 신청하기</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={onExploreInstructors}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/20 backdrop-blur-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <Users className="w-5 h-5 text-sky-300" />
              <span>시민강사 프로필 보기</span>
            </button>

            <button
              onClick={openAiMatchModal}
              className="px-5 py-3.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-semibold text-sm border border-emerald-400/40 backdrop-blur-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span>AI 맞춤 강사 추천</span>
            </button>
          </div>

          {/* Quick Voice feature callout banner */}
          <div className="pt-2">
            <button
              onClick={openVoiceModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 text-xs sm:text-sm font-medium transition-all cursor-pointer group"
            >
              <Mic className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
              <span>궁금한 점이 있으신가요? <strong>천안시 AI 음성 튜터</strong>와 실시간으로 대화해보세요!</span>
              <span className="text-pink-300 text-[11px] underline ml-1">체험하기 →</span>
            </button>
          </div>
        </div>

        {/* Civic Statistics Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-200">
              48명
            </div>
            <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">천안시 위촉 공인 강사</div>
            <div className="text-[11px] text-slate-400 mt-0.5">정기 역량평가 100% 통과</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              14,200+
            </div>
            <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">누적 천안시민 수강생</div>
            <div className="text-[11px] text-slate-400 mt-0.5">어르신·청소년·소상공인</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-200">
              98.4%
            </div>
            <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">강의 만족도 평점</div>
            <div className="text-[11px] text-slate-400 mt-0.5">5점 만점 환산 4.92점</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-200">
              31개 읍면동
            </div>
            <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">찾아가는 현장 배움터</div>
            <div className="text-[11px] text-slate-400 mt-0.5">천안시 전액 무료 지원</div>
          </div>
        </div>
      </div>
    </div>
  );
};
