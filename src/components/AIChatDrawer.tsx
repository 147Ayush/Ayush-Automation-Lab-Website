import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Bot, User, Sparkles, MessageSquare, Terminal, ChevronRight } from 'lucide-react';

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

const PRESETS = [
  { label: 'Agentic Workflows', query: 'What kind of AI Agents and agentic workflows can you build?' },
  { label: 'n8n & Python', query: 'Explain your n8n & Python automation expertise.' },
  { label: 'Cloud & FastAPI', query: 'What are your backend deployment and cloud setup solutions?' },
  { label: 'RAG & Vector DBs', query: 'How do you implement RAG systems and vector databases?' }
];

export default function AIChatDrawer({ isOpen, onClose }: AIChatDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hello! Welcome to Ayush Automation Lab's AI Assistant. I am trained on Ayush's expertise in AI Automation, Agentic Workflows (LangGraph/LangChain), Cloud Infrastructure, n8n, and Python Pipelines. \n\nHow can I help accelerate your business operations today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response with highly professional structured content after a brief delay
    setTimeout(() => {
      const aiResponse = getAIResponse(text);
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const text = inputValue;
    setInputValue('');
    handleSendMessage(text);
  };

  // Automated custom matching engine specifically designed with Ayush's expertise
  const getAIResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('agent') || q.includes('langchain') || q.includes('langgraph') || q.includes('agentic')) {
      return "🤖 **AI Automation & Agentic Workflows** is Ayush's core discipline. \n\nWe design multi-agent pipelines using **LangGraph** and **LangChain** that can plan, self-reflect, call external APIs, and execute complex business strategies autonomously.\n\n**Capabilities include:**\n• Autonomous lead scoring and personalized email generation\n• Client-facing smart support bots with memory management\n• Self-healing multi-turn pipelines that retry on API timeouts";
    }

    if (q.includes('n8n') || q.includes('python') || q.includes('automation') || q.includes('script') || q.includes('async')) {
      return "⚡ **n8n Workflow Automation & Python Systems:**\n\nAyush builds high-throughput, asynchronous pipelines in **Python (asyncio)** and orchestrates complex business logical loops in **n8n (Advanced)**.\n\n**Specific systems built:**\n• Synchronized real-time inventory updates across multiple channels\n• Automated invoice processing combining OCR, Gemini parsing, and accounting APIs\n• Automated social outreach and report generators with Slack & email notifications";
    }

    if (q.includes('cloud') || q.includes('fastapi') || q.includes('server') || q.includes('backend') || q.includes('deployment') || q.includes('docker') || q.includes('railway') || q.includes('ci')) {
      return "🌐 **Server Administration & Backend Systems:**\n\nAyush specializes in **FastAPI** backend deployments, packaging services securely using **Docker**, and automating deployments via CI/CD pipelines to platforms like **Railway** and Cloud environments.\n\n**Key features:**\n• Multi-Client System Architecture with real-time WebSockets synchronization\n• API performance tuning with asyncio & async databases\n• Comprehensive production AI observability & tracking tools";
    }

    if (q.includes('rag') || q.includes('vector') || q.includes('database') || q.includes('retrieval') || q.includes('knowledge')) {
      return "📚 **RAG (Retrieval-Augmented Generation) & Knowledge Systems:**\n\nAyush implements semantic search pipelines by vectorizing custom knowledge bases (PDFs, Notion workspaces, databases) and utilizing vector databases.\n\n**Technology stack:**\n• Pinecone, PGVector, or ChromaDB for high-dimensional vector search\n• Optimized semantic retrieval algorithms with custom prompt engineering\n• Dynamic contextual grounding to prevent AI hallucinations";
    }

    if (q.includes('contact') || q.includes('book') || q.includes('consultation') || q.includes('phone') || q.includes('meet')) {
      return "📅 **Ready to collaborate?**\n\nYou can easily book a **free 30-minute consultation/audit**! Click the 'Book a Consultation' button at the top or bottom of this page. \n\nOur wizard will guide you through entering your requirements, selecting a preferred date, and scheduling a slot. Let's build your next breakthrough system!";
    }

    if (q.includes('who') || q.includes('about') || q.includes('ayush')) {
      return "👨‍💻 **Ayush** is the chief technologist and automation architect behind Ayush Automation Lab. \n\nHe has a stellar record of helping modern companies scale their operations, automate manual workloads, and deploy state-of-the-art AI systems built for production-grade reliability.";
    }

    // Default response using rich tech keywords
    return "💡 That is an interesting scenario! In Ayush Automation Lab, we solve challenges like this by combining:\n\n• **AI Agentic Loops** (LangGraph / FastAPI)\n• **Advanced Integrations** (n8n Workflows / Python asyncio pipelines)\n• **Semantic Databases** (RAG Vector Stores)\n\nCould you specify if you are looking to automate a manual task, integrate an AI model into your app, or configure robust cloud infrastructure?";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer Container */}
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-outline-variant/30"
              id="ai-chat-drawer"
            >
              {/* Header */}
              <div className="px-5 py-4 border-b border-outline-variant/20 flex items-center justify-between bg-surface">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                      <Bot className="h-5 w-5 text-primary" />
                    </div>
                    {/* Live status dot */}
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border-2 border-white animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-space font-bold text-sm text-on-surface">
                      Automation Lab AI
                    </h3>
                    <div className="flex items-center gap-1">
                      <Terminal className="h-3 w-3 text-success" />
                      <span className="text-[10px] text-on-surface-variant font-mono uppercase tracking-wider">Agent system online</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors"
                  aria-label="Close"
                  id="close-ai-chat"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Chat Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface/30">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 max-w-[85%] ${
                      msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                        msg.sender === 'user'
                          ? 'bg-primary/5 text-primary border-primary/15'
                          : 'bg-white text-secondary border-outline-variant/50'
                      }`}
                    >
                      {msg.sender === 'user' ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                    </div>

                    <div className="space-y-1">
                      <div
                        className={`rounded-2xl px-4 py-3 text-xs leading-relaxed whitespace-pre-wrap ${
                          msg.sender === 'user'
                            ? 'bg-primary text-white font-medium rounded-tr-none'
                            : 'bg-white text-on-surface border border-outline-variant/40 rounded-tl-none shadow-sm'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-on-surface-variant px-1 font-mono block">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 max-w-[85%] mr-auto">
                    <div className="w-8 h-8 rounded-lg bg-white border border-outline-variant/50 text-secondary flex items-center justify-center shrink-0">
                      <Sparkles className="h-4 w-4 animate-spin text-primary" />
                    </div>
                    <div className="bg-white border border-outline-variant/30 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Presets Grid */}
              <div className="p-3 border-t border-outline-variant/10 bg-surface/50">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block mb-2 px-1">
                  Quick Queries
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handleSendMessage(preset.query)}
                      className="text-left px-2.5 py-1.5 rounded-lg border border-outline-variant bg-white text-[10px] font-medium text-on-surface-variant hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-between group"
                    >
                      <span className="truncate">{preset.label}</span>
                      <ChevronRight className="h-3 w-3 shrink-0 ml-1 transform group-hover:translate-x-0.5 transition-transform text-outline" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-outline-variant/20 bg-white">
                <div className="flex items-center gap-2 border border-outline-variant rounded-xl px-3 py-1.5 bg-surface focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about n8n, AI agents, Python..."
                    className="flex-1 text-xs bg-transparent outline-none border-none py-1.5 text-on-surface placeholder:text-on-surface-variant/75"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className={`p-2 rounded-lg transition-colors ${
                      inputValue.trim()
                        ? 'bg-primary text-white hover:bg-primary-container'
                        : 'bg-outline-variant/30 text-on-surface-variant cursor-not-allowed'
                    }`}
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
