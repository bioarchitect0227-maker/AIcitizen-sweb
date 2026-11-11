import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Radio, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';

interface VoiceAITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTopic: (topic: string) => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const VoiceAITutorModal: React.FC<VoiceAITutorModalProps> = ({
  isOpen,
  onClose,
  onSelectTopic
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [inputText, setInputText] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const recognitionRef = useRef<any>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: '반갑습니다! 천안시 찾아가는 AI 시민강사 배움터 음성 튜터입니다. "AI Education for the better life"를 위해 천안시민 여러분의 질문에 실시간으로 답변해 드립니다. 무엇이든 편하게 물어보세요!',
      time: '방금 전'
    }
  ]);

  useEffect(() => {
    // Scroll to bottom on new message
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Speech Recognition setup (Web Speech API)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = 'ko-KR';
        recognition.interimResults = false;
        recognition.continuous = false;

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            handleSendMessage(transcript);
          }
          setIsListening(false);
        };

        recognition.onerror = (event: any) => {
          console.warn('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
          setIsListening(true);
        } catch (e) {
          console.error(e);
        }
      } else {
        alert('현재 브라우저에서 음성 인식을 지원하지 않습니다. 아래 텍스트 입력창을 이용해주세요.');
      }
    }
  };

  const speakText = (text: string) => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('SpeechSynthesis error:', e);
    }
  };

  const handleSendMessage = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Generate responsive reply based on Cheonan AI citizen education knowledge base
    let aiResponse = '';
    const q = text.toLowerCase();

    if (q.includes('어르신') || q.includes('노인') || q.includes('경로당') || q.includes('시니어')) {
      aiResponse = '어르신 교육에는 박정순 시민강사님의 [스마트폰 말하는 AI 비서와 보이스피싱 예방법] 강좌를 강력 추천합니다! 큰 글씨와 음성 조작으로 손주와 영상통화하고, 모르는 번호 사기를 예방하는 따뜻한 강의입니다. 천안 관내 경로당 어디든 찾아갑니다.';
    } else if (q.includes('무료') || q.includes('비용') || q.includes('돈') || q.includes('수강료')) {
      aiResponse = '네, 맞습니다! 천안시 평생학습 지원 조례에 따라 천안시민 5인 이상 모임이면 강사비와 교재비 전액이 천안시청에서 지원되어 100% 무료입니다.';
    } else if (q.includes('직장인') || q.includes('업무') || q.includes('엑셀') || q.includes('chatgpt') || q.includes('보고서')) {
      aiResponse = '직장인과 실무자를 위해서는 김도윤 강사님의 [ChatGPT 업무생산성 마스터]와 윤태진 강사님의 [노코드 업무자동화] 강좌가 인기가 높습니다. 야간(저녁 7시~9시)이나 주말 시간대 출강도 가능합니다.';
    } else if (q.includes('소상공인') || q.includes('가게') || q.includes('마케팅') || q.includes('리뷰')) {
      aiResponse = '천안 골목상권 사장님들을 위한 강성호 강사님의 [네이버 스마트플레이스 AI 리뷰 답글 및 홍보물 캔바 디자인] 특강을 추천합니다. 1분 만에 매장 포스터와 홍보 카피를 완성하실 수 있습니다.';
    } else if (q.includes('신청') || q.includes('방법') || q.includes('어떻게')) {
      aiResponse = '상단 메뉴의 [강의 신청] 버튼을 누르시고 신청자 성함, 연락처, 교육 장소(동남구/서북구), 희망 일시를 적어주시면 됩니다. 접수 즉시 담당 코디네이터가 2일 이내에 전화로 안내드립니다.';
    } else if (q.includes('강사') && (q.includes('모집') || q.includes('되기') || q.includes('자격'))) {
      aiResponse = '천안시는 매년 상·하반기 신규 시민강사를 모집합니다. AI 및 디지털 관련 자격증이나 교육 경력을 보유한 천안시민이면 누구나 지원하실 수 있으며, 정기 역량강화 연수와 시간당 규정 강사료가 지급됩니다.';
    } else {
      aiResponse = `천안시민의 더 나은 삶을 위한 AI 교육에 관심 가져주셔서 감사합니다! 문의하신 "${text}" 관련해서는 공인 시민강사진이 맞춤형 커리큘럼으로 찾아가 교육해 드립니다. 지금 바로 상단의 [강의 신청하기]를 통해 접수해보세요!`;
    }

    setTimeout(() => {
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponse,
        time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      speakText(aiResponse);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-200 flex flex-col h-[650px] max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-blue-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <Radio className={`w-5 h-5 ${isListening ? 'animate-pulse text-pink-300' : ''}`} />
              </div>
              {isListening && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-ping"></span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-white">
                  천안시 AI 시민강사 실시간 음성 튜터
                </h3>
                <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Gemini Live
                </span>
              </div>
              <p className="text-xs text-indigo-100">
                AI Education for the better life - 음성으로 묻고 듣는 교육 상담
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title={soundEnabled ? '음성 출력 끄기' : '음성 출력 켜기'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-300" />}
            </button>

            <button
              onClick={() => {
                window.speechSynthesis?.cancel();
                onClose();
              }}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="닫기"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Voice Visualizer Orb */}
        <div className="bg-slate-900 py-6 px-4 text-center text-white relative overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/60 to-purple-950/60 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center justify-center space-y-3">
            {/* Interactive Pulse Orb Button */}
            <button
              onClick={toggleListening}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer ${
                isListening
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 scale-110 ring-8 ring-pink-500/30 animate-pulse'
                  : isSpeaking
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 ring-8 ring-blue-500/30'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105 ring-4 ring-white/10'
              }`}
            >
              {isListening ? (
                <Mic className="w-9 h-9 text-white animate-bounce" />
              ) : (
                <Mic className="w-8 h-8 text-white" />
              )}
            </button>

            <div className="text-xs font-semibold tracking-wide">
              {isListening ? (
                <span className="text-pink-400 font-bold animate-pulse">
                  ● 천안시민님의 말씀을 듣고 있습니다... 말씀해주세요
                </span>
              ) : isSpeaking ? (
                <span className="text-sky-300 font-bold">
                  음성 답변을 들려드리는 중입니다...
                </span>
              ) : (
                <span className="text-slate-300">
                  위 마이크 버튼을 누르시거나 아래 추천 질문을 클릭하세요
                </span>
              )}
            </div>

            {/* Simulated audio waveform bars */}
            <div className="flex items-center gap-1 h-5 pt-1">
              {[4, 8, 14, 18, 12, 16, 20, 15, 9, 6, 12, 18, 8, 4].map((h, i) => (
                <span
                  key={i}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    isListening
                      ? 'bg-pink-400'
                      : isSpeaking
                      ? 'bg-blue-400'
                      : 'bg-slate-700'
                  }`}
                  style={{
                    height: isListening || isSpeaking ? `${Math.max(4, (h * (Math.sin(Date.now() / 200 + i) + 1.2)))}px` : '4px'
                  }}
                ></span>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto text-[11px] scrollbar-none">
          <span className="text-slate-400 font-bold shrink-0">추천 질문:</span>
          {[
            '경로당 어르신 스마트폰 교육',
            '천안시민 무료 수강 방법',
            '직장인 ChatGPT 야간 특강',
            '소상공인 네이버 지도 리뷰 마케팅',
            '시민강사 지원 자격'
          ].map((topic, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(topic)}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 whitespace-nowrap cursor-pointer transition-colors"
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Chat message stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-100/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-2xs ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-xs'
                    : 'bg-white text-slate-800 rounded-bl-xs border border-slate-200/80'
                }`}
              >
                <p>{msg.text}</p>
                <div className={`text-[10px] mt-1 text-right ${
                  msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'
                }`}>
                  {msg.time}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
          <div ref={chatBottomRef}></div>
        </div>

        {/* Input bar */}
        <div className="p-3 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputText);
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isListening
                  ? 'bg-pink-600 text-white border-pink-600 animate-pulse'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
              title={isListening ? '음성 듣기 중지' : '음성으로 말하기'}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="질문을 입력하거나 왼쪽 마이크를 눌러 음성으로 말씀하세요..."
              className="flex-1 px-3.5 py-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:bg-white"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs disabled:opacity-40 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
