import React from 'react';
import { Star, Heart, Quote, Image, Award, CheckCircle } from 'lucide-react';

export const ReviewsAndGallery: React.FC = () => {
  const galleries = [
    {
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=700&q=80',
      title: '신부동 대림경로당 스마트폰 음성비서 실습',
      tag: '시니어 배움터',
      date: '2026년 10월',
      caption: '어르신들이 직접 음성으로 날씨를 묻고 손주와 영상통화 사진을 꾸미는 즐거운 수업'
    },
    {
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=700&q=80',
      title: '불당동 주민자치센터 직장인 야간 ChatGPT 특강',
      tag: '직장인 DX',
      date: '2026년 10월',
      caption: '퇴근 후 모인 천안 직장인들이 업무 효율을 2배 높이는 프롬프트 실무를 실습하는 모습'
    },
    {
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=80',
      title: '천안청소년수련관 생성형 AI 웹툰 창작 캠프',
      tag: '청소년 AI',
      date: '2026년 9월',
      caption: '학생들이 자신이 상상한 캐릭터를 생성형 AI 이미지로 제작하고 나만의 스토리를 완성'
    },
    {
      image: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=700&q=80',
      title: '천안 중앙시장 상인 대상 캔바 AI 메뉴판 디자인',
      tag: '소상공인',
      date: '2026년 9월',
      caption: '스마트폰 하나로 계절 메뉴판과 네이버 영수증 리뷰 답글을 손쉽게 완성하는 현장 코칭'
    }
  ];

  const stories = [
    {
      quote: '예전엔 버스 언제 오는지 몰라 정류장에서 30분씩 서서 기다렸는데, 박정순 선생님 덕분에 경로당 안에서 따뜻하게 시간 맞춰 나갑니다. 삶이 정말 편리해졌어요.',
      name: '이순자 어르신 (78세)',
      role: '동남구 청수동 경로당 회원',
      star: 5,
      course: '어르신 말하는 스마트폰 AI 교실'
    },
    {
      quote: '매주 보고서 작성할 때마다 몇 시간씩 야근하던 부서원들이 김도윤 강사님의 프롬프트 팁을 적용한 뒤로 칼퇴근하고 있습니다. 천안시민이라 행복합니다!',
      name: '한동훈 과장',
      role: '서북구 백석공단 IT 제조업체',
      star: 5,
      course: '직장인 생성형 AI 프롬프트 실무'
    },
    {
      quote: '가게를 운영하면서 비싼 디자인 업체에 맡기기 부담스러웠는데, 강성호 강사님께서 1분 만에 인스타그램 포스터 만드는 법을 가르쳐주셔서 매출이 20% 늘었습니다.',
      name: '박수진 대표',
      role: '신부동 먹자골목 카페 운영',
      star: 5,
      course: '소상공인 AI 홍보물 및 마케팅'
    }
  ];

  return (
    <section className="py-14 sm:py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>천안시민과 함께하는 생생한 교육 현장</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            배움으로 달라진 천안시민의 일상 이야기
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            "AI Education for the better life" — 기술이 사람의 온기가 되어 천안의 이웃들에게 전해지고 있습니다.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {galleries.map((item, idx) => (
            <div
              key={idx}
              className="group rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-xs hover:shadow-xl transition-all"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-900/80 text-white backdrop-blur-xs">
                  {item.tag}
                </span>
                <span className="absolute bottom-3 right-3 text-[10px] font-medium px-2 py-0.5 rounded-md bg-black/60 text-slate-200 backdrop-blur-xs">
                  {item.date}
                </span>
              </div>

              <div className="p-4 space-y-1.5">
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Civic Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {stories.map((story, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-2xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: story.star }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{story.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">{story.name}</div>
                  <div className="text-[11px] text-slate-500">{story.role}</div>
                </div>
                <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded-md">
                  {story.course}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
