import React from 'react';
import { Phone, MapPin, Mail, ExternalLink, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      {/* Slogan Top Ribbon */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-sky-900 py-3 border-b border-white/10 text-center px-4">
        <p className="text-xs sm:text-sm font-bold text-sky-200 tracking-wide">
          "AI Education for the better life" — 배움으로 내일이 더 설레는 도시, 천안시민강사가 함께합니다.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Identity */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-sm">
                天安
              </div>
              <span className="text-base font-extrabold tracking-tight">천안시 시민강사 배움터</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs max-w-md">
              천안시 평생교육 진흥 조례에 따라 시민 누구나 일상과 직무에서 인공지능(AI)과 디지털 혜택을 골고루 누릴 수 있도록 천안시가 직접 운영·지원하는 찾아가는 평생학습 포털입니다.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-500">
              <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded">천안시 공인 강사 풀</span>
              <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded">31개 읍면동 전액무료</span>
              <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded">디지털 약자 동행</span>
            </div>
          </div>

          {/* Col 2: Inquiries & Contacts */}
          <div className="space-y-2">
            <h5 className="text-white font-bold text-xs uppercase tracking-wider">
              운영 및 문의처
            </h5>
            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>평생교육과: <strong>041-521-3760</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>평생학습관 직통: 041-521-3765</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>cheonan_learn@korea.kr</span>
              </div>
              <div className="text-[11px] text-slate-500 pt-1">
                상담시간: 평일 09:00 ~ 18:00 (점심 12:00 ~ 13:00)
              </div>
            </div>
          </div>

          {/* Col 3: Addresses & Related Links */}
          <div className="space-y-2">
            <h5 className="text-white font-bold text-xs uppercase tracking-wider">
              위치 및 관련 기관
            </h5>
            <div className="space-y-1 text-xs text-slate-400">
              <p>• 천안시청: 충남 천안시 서북구 번영로 156 (불당동)</p>
              <p>• 천안시 평생학습관: 천안시 동남구 화랑로 108 (원성동)</p>
              <div className="pt-2 flex flex-col gap-1 text-[11px]">
                <a 
                  href="https://www.cheonan.go.kr" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-blue-400 flex items-center gap-1"
                >
                  <span>천안시청 공식 누리집</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a 
                  href="https://www.cheonan.go.kr/lll.do" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-blue-400 flex items-center gap-1"
                >
                  <span>천안시 평생학습포털</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <p>© 2026 Cheonan City. All Rights Reserved. 천안시 시민강사 지원센터.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">개인정보처리방침</span>
            <span>|</span>
            <span className="hover:text-slate-400 cursor-pointer">이용약관</span>
            <span>|</span>
            <span className="hover:text-slate-400 cursor-pointer">찾아오시는 길</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
