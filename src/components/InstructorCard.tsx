import React from 'react';
import { Instructor } from '../types';
import { Star, MapPin, BookOpen, Calendar, ArrowUpRight, Award, CheckCircle } from 'lucide-react';

interface InstructorCardProps {
  instructor: Instructor;
  onSelectDetail: (instructor: Instructor) => void;
  onApplyWithInstructor: (instructor: Instructor) => void;
}

export const InstructorCard: React.FC<InstructorCardProps> = ({
  instructor,
  onSelectDetail,
  onApplyWithInstructor
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1">
      {/* Top banner / badges */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
              <Award className="w-3 h-3 text-blue-600" />
              {instructor.badge}
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700">
              {instructor.activeStatus}
            </span>
          </div>
          <div className="flex items-center gap-1 text-amber-500 font-bold text-xs bg-amber-50 px-2 py-0.5 rounded-full">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{instructor.rating.toFixed(2)}</span>
            <span className="text-slate-400 font-normal">({instructor.reviewCount})</span>
          </div>
        </div>

        {/* Profile info */}
        <div className="flex items-center gap-4 mt-4">
          <div className="relative shrink-0">
            <img
              src={instructor.avatar}
              alt={instructor.name}
              className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover ring-2 ring-slate-100 shadow-sm group-hover:ring-blue-400 transition-all"
            />
            <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white rounded-full p-0.5" title="천안시 공인 강사">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex items-baseline gap-2">
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                {instructor.name}
              </h3>
              <span className="text-xs text-slate-500 font-medium shrink-0">시민강사</span>
            </div>
            <p className="text-xs font-semibold text-blue-600 line-clamp-1 mt-0.5">
              {instructor.title}
            </p>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
              <span className="flex items-center gap-0.5">
                <MapPin className="w-3 h-3 text-slate-400" />
                {instructor.districts.slice(0, 2).join(', ')}
              </span>
              <span>•</span>
              <span>누적 출강 {instructor.lectureCount}회</span>
            </div>
          </div>
        </div>

        {/* Short bio */}
        <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {instructor.shortBio}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {instructor.portfolioTags.slice(0, 4).map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Featured lecture highlight */}
      <div className="px-5 py-3 bg-slate-50/70 border-t border-slate-100 mt-auto">
        <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mb-1">
          <BookOpen className="w-3 h-3 text-blue-600" />
          <span>대표 강의 커리큘럼</span>
        </div>
        <div className="text-xs font-semibold text-slate-800 line-clamp-1">
          {instructor.featuredTopics[0]}
        </div>
      </div>

      {/* Action buttons */}
      <div className="p-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
        <button
          onClick={() => onSelectDetail(instructor)}
          className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1 cursor-pointer"
        >
          <span>프로필 상세</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
        </button>

        <button
          onClick={() => onApplyWithInstructor(instructor)}
          className="px-3 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center gap-1 shadow-xs cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>강의 신청하기</span>
        </button>
      </div>
    </div>
  );
};
