import React, { useState, useEffect } from 'react';
import { LectureApplication } from '../types';
import { 
  Search, 
  CalendarCheck, 
  Clock, 
  MapPin, 
  User, 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall,
  FileText,
  AlertCircle
} from 'lucide-react';

interface ApplicationStatusViewProps {
  onOpenNewApplication: () => void;
  applications: LectureApplication[];
}

export const ApplicationStatusView: React.FC<ApplicationStatusViewProps> = ({
  onOpenNewApplication,
  applications
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState<LectureApplication[]>(applications);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResult(applications);
    } else {
      const q = searchTerm.toLowerCase().trim();
      const filtered = applications.filter((app) => 
        app.id.toLowerCase().includes(q) ||
        app.applicantName.toLowerCase().includes(q) ||
        app.phone.replace(/[^0-9]/g, '').includes(q.replace(/[^0-9]/g, '')) ||
        app.organizationName.toLowerCase().includes(q) ||
        app.instructorName.toLowerCase().includes(q)
      );
      setSearchResult(filtered);
    }
  }, [searchTerm, applications]);

  const getStatusColor = (status: LectureApplication['status']) => {
    switch (status) {
      case '접수완료':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case '강사배정':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case '일정조율':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case '강의확정':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case '교육완료':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const steps = ['접수완료', '강사배정', '일정조율', '강의확정', '교육완료'];

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
            <FileText className="w-3.5 h-3.5" />
            <span>실시간 진행현황 조회</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            내 강의 신청 내역 및 매칭 진행상황
          </h2>
          <p className="text-sm text-slate-600">
            신청 시 발급받으신 <strong>접수번호(예: CAI-202611-0421)</strong> 또는 <strong>신청자 성명/전화번호</strong>로 조회가 가능합니다.
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="접수번호, 신청자 성명, 연락처 뒤 4자리로 검색..."
              className="w-full pl-12 pr-4 py-3.5 text-sm bg-slate-50 rounded-2xl border border-slate-300 focus:border-blue-500 focus:bg-white focus:outline-none transition-all shadow-2xs"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-slate-200 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Applications list */}
        <div className="space-y-4">
          {searchResult.length > 0 ? (
            searchResult.map((app) => {
              const currentStepIdx = steps.indexOf(app.status);

              return (
                <div
                  key={app.id}
                  className="p-6 rounded-3xl border border-slate-200/90 bg-white hover:border-blue-200 hover:shadow-lg transition-all space-y-4"
                >
                  {/* Card top */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                        {app.id}
                      </span>
                      <span className="text-xs text-slate-400">신청일시: {app.createdAt}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusColor(app.status)}`}>
                        ● {app.status}
                      </span>
                    </div>
                  </div>

                  {/* Step Timeline */}
                  <div className="pt-1 pb-3">
                    <div className="relative flex items-center justify-between">
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 -z-0"></div>
                      <div 
                        className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 -z-0 transition-all duration-500"
                        style={{ width: `${(currentStepIdx / (steps.length - 1)) * 100}%` }}
                      ></div>

                      {steps.map((st, idx) => {
                        const isDone = idx <= currentStepIdx;
                        const isCurrent = idx === currentStepIdx;

                        return (
                          <div key={st} className="relative z-10 flex flex-col items-center">
                            <div 
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all ${
                                isCurrent 
                                  ? 'bg-blue-600 text-white border-blue-600 ring-4 ring-blue-100'
                                  : isDone
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : 'bg-white text-slate-400 border-slate-300'
                              }`}
                            >
                              {isDone ? '✓' : idx + 1}
                            </div>
                            <span className={`text-[11px] mt-1 font-semibold whitespace-nowrap ${
                              isCurrent ? 'text-blue-700 font-bold' : isDone ? 'text-slate-800' : 'text-slate-400'
                            }`}>
                              {st}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50/80 text-xs text-slate-700">
                    <div>
                      <span className="text-slate-400 font-medium block">신청 기관/성명:</span>
                      <strong className="text-slate-900">{app.organizationName} ({app.applicantName})</strong>
                    </div>

                    <div>
                      <span className="text-slate-400 font-medium block">배정/희망 강사:</span>
                      <strong className="text-blue-700">{app.instructorName}</strong>
                    </div>

                    <div>
                      <span className="text-slate-400 font-medium block">강의 주제:</span>
                      <span className="font-semibold text-slate-900 line-clamp-1">{app.courseTopic}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 font-medium block">희망 일정:</span>
                      <span>{app.preferredDate} ({app.preferredTime})</span>
                    </div>

                    <div>
                      <span className="text-slate-400 font-medium block">교육 장소:</span>
                      <span>{app.district} {app.venueName}</span>
                    </div>

                    <div>
                      <span className="text-slate-400 font-medium block">참여 인원 / 차시:</span>
                      <span>{app.participantCount}명 / {app.sessions}회 ({app.durationHours}시간)</span>
                    </div>
                  </div>

                  {/* Special note / requests */}
                  {app.specialRequests && (
                    <div className="text-xs text-slate-600 bg-amber-50/60 p-3 rounded-xl border border-amber-200/50">
                      <span className="font-bold text-amber-900">요청사항: </span>
                      {app.specialRequests}
                    </div>
                  )}

                  {/* Hotline note */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-500 pt-1 gap-2">
                    <div className="flex items-center gap-1 text-slate-600">
                      <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
                      <span>일정 변경 및 문의: 천안시 평생교육과 <strong>041-521-3760</strong></span>
                    </div>
                    <span className="text-emerald-700 font-semibold">
                      * 수강료 및 교재비 전액 무료 (천안시 지원)
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-12 text-center rounded-3xl border border-slate-200 bg-slate-50 space-y-3">
              <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
              <h4 className="text-base font-bold text-slate-800">조회된 신청 내역이 없습니다</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                입력하신 검색어와 일치하는 신청 내역이 없습니다. 새로운 맞춤형 강의를 신청해 보세요.
              </p>
              <button
                onClick={onOpenNewApplication}
                className="mt-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 cursor-pointer"
              >
                새 강의 신청하기
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
