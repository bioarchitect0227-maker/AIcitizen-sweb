import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InstructorSection } from './components/InstructorSection';
import { InstructorDetailModal } from './components/InstructorDetailModal';
import { ApplicationFormModal } from './components/ApplicationFormModal';
import { ApplicationStatusView } from './components/ApplicationStatusView';
import { AiMatchModal } from './components/AiMatchModal';
import { VoiceAITutorModal } from './components/VoiceAITutorModal';
import { EducationLocations } from './components/EducationLocations';
import { ReviewsAndGallery } from './components/ReviewsAndGallery';
import { InstructorRecruitment } from './components/InstructorRecruitment';
import { Footer } from './components/Footer';
import { INSTRUCTORS } from './data/instructors';
import { Instructor, LectureApplication } from './types';
import { CalendarCheck, Sparkles, Mic, FileText, Users, MapPin, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'instructors' | 'apply' | 'status' | 'ai-match' | 'locations'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [selectedInstructorForDetail, setSelectedInstructorForDetail] = useState<Instructor | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyInstructorId, setApplyInstructorId] = useState<string>('any');
  const [applyTopic, setApplyTopic] = useState<string>('');
  const [isAiMatchModalOpen, setIsAiMatchModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  // Applications list
  const [applications, setApplications] = useState<LectureApplication[]>([]);

  // Fetch initial applications
  useEffect(() => {
    fetch('/api/applications')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.applications)) {
          setApplications(data.applications);
        }
      })
      .catch(err => {
        console.warn('Initial applications fetch warning:', err);
      });
  }, []);

  const handleOpenApplyModal = (instructorId?: string, topic?: string) => {
    setApplyInstructorId(instructorId || 'any');
    setApplyTopic(topic || '');
    setIsApplyModalOpen(true);
  };

  const handleApplyWithInstructor = (instructor: Instructor) => {
    setSelectedInstructorForDetail(null);
    handleOpenApplyModal(instructor.id, instructor.featuredTopics[0]);
  };

  const handleApplyWithMatch = (instructorName: string, topic: string) => {
    // Find instructor by name
    const found = INSTRUCTORS.find(i => instructorName.includes(i.name));
    setIsAiMatchModalOpen(false);
    handleOpenApplyModal(found?.id || 'any', topic);
  };

  const handleApplicationCreated = (newApp: LectureApplication) => {
    setApplications(prev => [newApp, ...prev.filter(a => a.id !== newApp.id)]);
  };

  const handleHeroSearch = (term: string) => {
    setSearchQuery(term);
    setActiveTab('instructors');
    const elem = document.getElementById('instructors-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openApplyModal={() => handleOpenApplyModal()}
        openVoiceModal={() => setIsVoiceModalOpen(true)}
        openAiMatchModal={() => setIsAiMatchModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* TAB: Home */}
        {activeTab === 'home' && (
          <>
            <Hero
              onSearch={handleHeroSearch}
              openApplyModal={() => handleOpenApplyModal()}
              openAiMatchModal={() => setIsAiMatchModalOpen(true)}
              openVoiceModal={() => setIsVoiceModalOpen(true)}
              onExploreInstructors={() => {
                setActiveTab('instructors');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Quick Feature Highlights Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div 
                  onClick={() => handleOpenApplyModal()}
                  className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all cursor-pointer group flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <CalendarCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                      <span>찾아가는 맞춤 강의 신청</span>
                      <ArrowRight className="w-4 h-4" />
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      천안시민 5인 이상이면 어디든! 경로당, 학교, 복지관, 상가로 전문 강사가 직접 찾아갑니다.
                    </p>
                  </div>
                </div>

                <div 
                  onClick={() => setIsAiMatchModalOpen(true)}
                  className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all cursor-pointer group flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 group-hover:text-emerald-600 transition-colors flex items-center gap-1.5">
                      <span>AI 맞춤 강사 & 교안 추천</span>
                      <ArrowRight className="w-4 h-4" />
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      우리 모임에 어떤 강사와 주제가 적합할지 고민되시나요? AI가 즉시 분석해 드립니다.
                    </p>
                  </div>
                </div>

                <div 
                  onClick={() => setIsVoiceModalOpen(true)}
                  className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all cursor-pointer group flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <Mic className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                      <span>실시간 AI 음성 튜터 체험</span>
                      <ArrowRight className="w-4 h-4" />
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      마이크로 질문하고 말로 듣는 천안시민 전용 AI 도우미와 대화해보세요.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Instructors Preview Section */}
            <InstructorSection
              instructors={INSTRUCTORS}
              onSelectDetail={(inst) => setSelectedInstructorForDetail(inst)}
              onApplyWithInstructor={handleApplyWithInstructor}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              openAiMatchModal={() => setIsAiMatchModalOpen(true)}
            />

            {/* Locations & Facilities */}
            <EducationLocations onOpenApply={() => handleOpenApplyModal()} />

            {/* Real Citizen Reviews & Gallery */}
            <ReviewsAndGallery />

            {/* Become an Instructor */}
            <InstructorRecruitment />
          </>
        )}

        {/* TAB: Instructors Directory View */}
        {activeTab === 'instructors' && (
          <div className="py-6">
            <InstructorSection
              instructors={INSTRUCTORS}
              onSelectDetail={(inst) => setSelectedInstructorForDetail(inst)}
              onApplyWithInstructor={handleApplyWithInstructor}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              openAiMatchModal={() => setIsAiMatchModalOpen(true)}
            />
          </div>
        )}

        {/* TAB: Direct Application Form */}
        {activeTab === 'apply' && (
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
              <div className="p-8 text-center bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-600 text-white space-y-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-blue-100">
                  천안시 평생교육 무료 출강 지원
                </span>
                <h1 className="text-2xl sm:text-3xl font-black">
                  천안시민강사 찾아가는 AI 맞춤 강의 신청
                </h1>
                <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto">
                  "AI Education for the better life" - 천안 관내 5인 이상 모임이면 강사비와 교재비가 전액 시비로 지원됩니다.
                </p>
              </div>

              <div className="p-8 text-center space-y-4">
                <p className="text-sm text-slate-600">
                  원하시는 시민강사님을 직접 지정하시거나, '천안시 추천 강사'로 신청하시면 일정에 맞춰 최적의 강사를 배정해 드립니다.
                </p>
                <button
                  onClick={() => handleOpenApplyModal()}
                  className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base shadow-lg shadow-blue-500/30 cursor-pointer inline-flex items-center gap-2"
                >
                  <CalendarCheck className="w-5 h-5" />
                  <span>강의 신청서 작성 시작하기</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB: Application Status */}
        {activeTab === 'status' && (
          <ApplicationStatusView
            applications={applications}
            onOpenNewApplication={() => handleOpenApplyModal()}
          />
        )}

        {/* TAB: AI Match Planner */}
        {activeTab === 'ai-match' && (
          <div className="max-w-4xl mx-auto px-4 py-12 text-center space-y-6">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-8 rounded-3xl shadow-xl space-y-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-emerald-100">
                Gemini AI 기반 지능형 추천
              </span>
              <h2 className="text-2xl sm:text-3xl font-black">
                천안형 AI 맞춤 강사 & 커리큘럼 추천
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 max-w-lg mx-auto">
                교육 대상과 희망 사항을 알려주시면 가장 알맞은 강사와 회차별 강의 계획서를 실시간으로 도출해 드립니다.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsAiMatchModalOpen(true)}
                  className="px-8 py-3.5 rounded-xl bg-white text-emerald-800 font-bold text-sm shadow-md hover:bg-emerald-50 cursor-pointer inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>AI 맞춤 추천 실행하기</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB: Locations & Reviews */}
        {activeTab === 'locations' && (
          <div>
            <EducationLocations onOpenApply={() => handleOpenApplyModal()} />
            <ReviewsAndGallery />
          </div>
        )}
      </main>

      {/* Floating Action Button for Voice AI Tutor */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3">
        <button
          onClick={() => setIsVoiceModalOpen(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-xl shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all font-bold text-xs cursor-pointer group"
          title="실시간 AI 음성 튜터와 대화"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <Mic className="w-4 h-4 text-white group-hover:animate-pulse" />
          <span className="hidden sm:inline">천안시 AI 음성 튜터</span>
        </button>
      </div>

      {/* MODALS */}
      {/* 1. Instructor Detail Modal */}
      <InstructorDetailModal
        instructor={selectedInstructorForDetail}
        onClose={() => setSelectedInstructorForDetail(null)}
        onApply={handleApplyWithInstructor}
      />

      {/* 2. Lecture Application Form Modal */}
      <ApplicationFormModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        instructors={INSTRUCTORS}
        initialInstructorId={applyInstructorId}
        initialTopic={applyTopic}
        onApplicationCreated={handleApplicationCreated}
      />

      {/* 3. AI Match Planner Modal */}
      <AiMatchModal
        isOpen={isAiMatchModalOpen}
        onClose={() => setIsAiMatchModalOpen(false)}
        instructors={INSTRUCTORS}
        onApplyWithMatch={handleApplyWithMatch}
      />

      {/* 4. Live Voice AI Tutor Modal */}
      <VoiceAITutorModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        onSelectTopic={(topic) => {
          setIsVoiceModalOpen(false);
          handleOpenApplyModal('any', topic);
        }}
      />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
