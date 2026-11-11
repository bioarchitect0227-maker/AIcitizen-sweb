import React, { useState } from 'react';
import { Instructor, AiMatchResult } from '../types';
import { CHEONAN_DISTRICTS } from '../data/instructors';
import { 
  X, 
  Sparkles, 
  BookOpen, 
  UserCheck, 
  ArrowRight, 
  CheckCircle2, 
  Target, 
  Lightbulb, 
  Layers, 
  CalendarCheck,
  RefreshCw
} from 'lucide-react';

interface AiMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  instructors: Instructor[];
  onApplyWithMatch: (instructorName: string, topic: string) => void;
}

export const AiMatchModal: React.FC<AiMatchModalProps> = ({
  isOpen,
  onClose,
  instructors,
  onApplyWithMatch
}) => {
  const [targetAudience, setTargetAudience] = useState('천안 신부동 경로당 어르신 15명');
  const [goalTopic, setGoalTopic] = useState('스마트폰 말로 쓰기, 병원 예약 및 AI 보이스피싱 예방');
  const [district, setDistrict] = useState('동남구 신안동 (신부동)');
  const [sessionCount, setSessionCount] = useState<number>(2);
  const [participantCount, setParticipantCount] = useState<number>(15);

  const [loading, setLoading] = useState(false);
  const [matchResult, setMatchResult] = useState<AiMatchResult | null>(null);
  const [isAiGenerated, setIsAiGenerated] = useState(false);

  if (!isOpen) return null;

  const handleRunMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/ai/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetAudience,
          goalTopic,
          district,
          sessionCount,
          participantCount
        })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setMatchResult(data.data);
        setIsAiGenerated(Boolean(data.isAiGenerated));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const presetExamples = [
    {
      label: '👵 어르신 스마트폰 안심 활용',
      target: '천안 원성동 경로당 어르신 20명',
      topic: '스마트폰 글씨 크게 보기, 말로 전화걸기, 보이스피싱 예방',
      district: '동남구 원성1동',
      sessions: 2
    },
    {
      label: '💼 소상공인 챗GPT 마케팅',
      target: '천안 중앙시장 상인회 사장님 12명',
      topic: '가게 네이버 지도 등록, 영수증 리뷰 AI 답글, 메뉴판 홍보물 캔바 디자인',
      district: '동남구 중앙동',
      sessions: 2
    },
    {
      label: '💻 직장인 엑셀·보고서 AI 자동화',
      target: '불당동 주민센터 직장인 야간반 25명',
      topic: 'ChatGPT 프롬프트로 보고서 초안 작성 및 엑셀 데이터 분석 단축',
      district: '서북구 불당1동',
      sessions: 4
    },
    {
      label: '🎬 청년 유튜브 쇼츠 영상 제작',
      target: '천안 청년센터 이음 예비 크리에이터 15명',
      topic: '스마트폰으로 10분 만에 AI 음성 자막 릴스 영상 제작',
      district: '서북구 불당2동',
      sessions: 2
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-blue-700 text-white p-6 sm:p-7 flex items-center justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-emerald-100 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>천안형 AI 교육설계 에이전트 (AI Education for the better life)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              AI 맞춤 시민강사 & 커리큘럼 추천 도우미
            </h2>
            <p className="text-xs text-emerald-100">
              청중의 특성과 희망 목표를 알려주시면 가장 적합한 천안시민강사와 맞춤 계획서를 실시간으로 기획해 드립니다.
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

        {/* Content body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {/* Quick preset selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              빠른 예시 질문 선택하기:
            </label>
            <div className="flex flex-wrap gap-2">
              {presetExamples.map((ex, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setTargetAudience(ex.target);
                    setGoalTopic(ex.topic);
                    setDistrict(ex.district);
                    setSessionCount(ex.sessions);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200 border border-transparent text-xs font-semibold text-slate-700 transition-all cursor-pointer"
                >
                  {ex.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleRunMatch} className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                1. 교육 대상군 및 모임 성격 <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="예: 천안 목천읍 노인회 어르신 15명, 불당동 초등학생 학부모 20명 등"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-emerald-500 focus:bg-white focus:outline-none bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                2. 배우고 싶은 내용 또는 해결하고 싶은 고민 <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={2}
                required
                value={goalTopic}
                onChange={(e) => setGoalTopic(e.target.value)}
                placeholder="예: ChatGPT로 보고서 쓰는 법, 스마트폰으로 말로 병원 예약하기, 릴스 영상 만들기 등"
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 focus:border-emerald-500 focus:bg-white focus:outline-none bg-white"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                3. 희망 지역 (천안 관내)
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-emerald-500 focus:bg-white focus:outline-none bg-white font-medium"
              >
                {CHEONAN_DISTRICTS.map((d, i) => (
                  <option key={i} value={d}>{d}</option>
                ))}
                <option value="온라인 비대면 (Zoom)">온라인 비대면 (Zoom)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                4. 희망 교육 회차
              </label>
              <select
                value={sessionCount}
                onChange={(e) => setSessionCount(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:border-emerald-500 focus:bg-white focus:outline-none bg-white font-medium"
              >
                <option value={1}>단발성 1회 특강 (2시간)</option>
                <option value={2}>2회 연속 집중과정 (총 4시간 권장)</option>
                <option value={3}>3회 심화 실습과정 (총 6시간)</option>
                <option value={4}>4회 정규 마스터과정 (총 8시간)</option>
              </select>
            </div>

            <div className="sm:col-span-2 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>천안시민강사 데이터 및 AI 커리큘럼 분석 중...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>AI 맞춤 시민강사 및 교육 계획서 추천받기</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Result view */}
          {matchResult && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <h3 className="text-lg font-black text-slate-900">
                    천안시민을 위한 맞춤형 추천 기획서
                  </h3>
                </div>
                {isAiGenerated && (
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Gemini AI 지능형 설계 완료
                  </span>
                )}
              </div>

              {/* Recommended Instructor Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider bg-white px-2 py-0.5 rounded-md border border-blue-100">
                    추천 시민강사
                  </span>
                  <h4 className="text-xl font-black text-slate-900">
                    {matchResult.recommendedInstructor.name}
                  </h4>
                  <p className="text-xs font-semibold text-blue-600">
                    {matchResult.recommendedInstructor.title}
                  </p>
                  <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                    💡 <strong>추천 이유:</strong> {matchResult.recommendedInstructor.matchReason}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onApplyWithMatch(
                      matchResult.recommendedInstructor.name,
                      matchResult.courseTitle
                    );
                  }}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shrink-0 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>이 추천으로 강의 신청</span>
                </button>
              </div>

              {/* Course Title & Overview */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-slate-500">기획 강의명</div>
                <div className="text-base font-extrabold text-slate-900">
                  {matchResult.courseTitle}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {matchResult.courseOverview}
                </p>
              </div>

              {/* Learning Objectives */}
              {matchResult.learningObjectives && matchResult.learningObjectives.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-emerald-600" />
                    <span>핵심 교육 목표</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {matchResult.learningObjectives.map((obj, i) => (
                      <div key={i} className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-900 font-medium flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Syllabus sessions */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>맞춤형 회차별 강의 계획 (총 {matchResult.syllabus.length}차시)</span>
                </h4>
                <div className="space-y-2.5">
                  {matchResult.syllabus.map((s) => (
                    <div key={s.session} className="p-4 rounded-xl border border-slate-200 bg-white">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 text-xs font-black flex items-center justify-center shrink-0">
                          {s.session}강
                        </span>
                        <span className="text-sm font-bold text-slate-900">{s.title}</span>
                      </div>
                      <p className="text-xs text-slate-600 pl-8 leading-relaxed">
                        {s.content}
                      </p>
                      <div className="text-[11px] text-blue-600 font-medium pl-8 mt-1.5">
                        🛠️ 활용 AI/도구: {s.tools}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preparation tips */}
              {matchResult.preparationTips && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                  <span className="font-bold">📋 사전 준비 권장사항: </span>
                  {matchResult.preparationTips}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
