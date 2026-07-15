import { useState } from 'react';
import { motion } from 'motion/react';
import { Brain, Settings, Database, Server, Terminal, Layers, CheckCircle2, ShieldAlert } from 'lucide-react';
import ThreeDCard from './ThreeDCard';

export default function ExpertiseSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'core' | 'supporting'>('all');

  const coreExpertise = [
    {
      title: "AI Automation & Agentic Workflows",
      icon: <Brain className="h-6 w-6 text-primary" />,
      bg: "bg-primary/10",
      border: "border-primary/20",
      bullets: [
        "LangChain / LangGraph (Agentic AI Development)",
        "RAG (Retrieval-Augmented Generation) & Vector Databases",
        "Prompt Engineering for complex structured outputs",
        "Production AI Systems & Observability tracking"
      ]
    },
    {
      title: "Advanced Workflow Orchestration",
      icon: <Settings className="h-6 w-6 text-secondary" />,
      bg: "bg-secondary/10",
      border: "border-secondary/20",
      bullets: [
        "n8n Workflow Automation (Advanced loops & errors)",
        "DevOps & Python Automation scripts",
        "Webhook routers & multi-service event orchestration"
      ]
    },
    {
      title: "Backend & Cloud Infrastructure",
      icon: <Server className="h-6 w-6 text-tertiary" />,
      bg: "bg-tertiary/10",
      border: "border-tertiary/20",
      bullets: [
        "Server Administration & Cloud Infrastructure",
        "FastAPI & Backend High-Performance Deployment",
        "Secure microservice communication protocols"
      ]
    }
  ];

  const supportingSkills = [
    {
      title: "Asynchronous Pipelines",
      icon: <Terminal className="h-6 w-6 text-primary" />,
      bg: "bg-primary/10",
      border: "border-primary/20",
      bullets: [
        "Python (Automation, asyncio, async pipelines)",
        "Event loops with high-throughput file stream processes"
      ]
    },
    {
      title: "Architectural Synchronization",
      icon: <Layers className="h-6 w-6 text-secondary" />,
      bg: "bg-secondary/10",
      border: "border-secondary/20",
      bullets: [
        "API Integration & Multi-Client System Architecture",
        "WebSockets for live real-time sync systems"
      ]
    },
    {
      title: "Cloud & Dev Environments",
      icon: <Database className="h-6 w-6 text-tertiary" />,
      bg: "bg-tertiary/10",
      border: "border-tertiary/20",
      bullets: [
        "Docker & CI/CD Deployment (Railway, Docker Hub)",
        "React + TypeScript (Frontend, for full-stack context)"
      ]
    }
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto scroll-mt-24" id="expertise">
      {/* Container wrapper with border and shadow so it stands out */}
      <div className="bg-surface/45 backdrop-blur-md rounded-[32px] border-2 border-outline-variant/35 p-8 md:p-14 shadow-[0_15px_50px_rgba(0,0,0,0.04)]">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="text-left">
            <span className="text-primary font-space text-xs font-bold uppercase tracking-widest block mb-2">
              EXPERTISE
            </span>
            <h2 className="font-space text-3xl md:text-4xl font-bold text-on-surface">
              Core Expertise &amp; Technical Capabilities
            </h2>
            <p className="text-sm text-on-surface-variant mt-2 max-w-xl font-medium">
              We construct reliable agentic solutions and robust Python systems using the industry's most advanced toolkits.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-outline-variant/20 p-1 rounded-2xl border border-outline-variant/30 self-start md:self-auto">
            {(['all', 'core', 'supporting'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-bold rounded-xl capitalize transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-white text-primary shadow-sm border border-outline-variant/20'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {tab === 'all' ? 'All Skills' : tab === 'core' ? 'Core Expertise' : 'Supporting Skills'}
              </button>
            ))}
          </div>
        </div>

        {/* Core Expertise Grid */}
        <div className="space-y-12">
          
          {/* Core Skills Subgrid */}
          {(activeTab === 'all' || activeTab === 'core') && (
            <div>
              {activeTab === 'all' && (
                <h3 className="font-space text-xs font-bold uppercase tracking-widest text-primary/70 mb-6 border-b border-outline-variant/25 pb-2">
                  Primary Core Solutions
                </h3>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {coreExpertise.map((exp, idx) => (
                  <ThreeDCard
                    key={idx}
                    className="bg-white p-7 rounded-2xl border-2 border-outline-variant/30 shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex flex-col justify-between"
                  >
                    <div>
                      <div className={`w-12 h-12 ${exp.bg} rounded-xl flex items-center justify-center mb-6 border ${exp.border}`}>
                        {exp.icon}
                      </div>
                      <h4 className="font-space text-lg font-extrabold text-on-surface mb-4">
                        {exp.title}
                      </h4>
                      <ul className="space-y-3">
                        {exp.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5 text-xs text-on-surface-variant leading-relaxed font-medium">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ThreeDCard>
                ))}
              </div>
            </div>
          )}

          {/* Supporting/Adjacent Skills Subgrid */}
          {(activeTab === 'all' || activeTab === 'supporting') && (
            <div className={activeTab === 'all' ? "pt-8" : ""}>
              {activeTab === 'all' && (
                <h3 className="font-space text-xs font-bold uppercase tracking-widest text-secondary/70 mb-6 border-b border-outline-variant/25 pb-2">
                  Supporting &amp; Adjacent Capabilities
                </h3>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {supportingSkills.map((exp, idx) => (
                  <ThreeDCard
                    key={idx}
                    className="bg-white p-7 rounded-2xl border-2 border-outline-variant/30 shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex flex-col justify-between"
                  >
                    <div>
                      <div className={`w-12 h-12 ${exp.bg} rounded-xl flex items-center justify-center mb-6 border ${exp.border}`}>
                        {exp.icon}
                      </div>
                      <h4 className="font-space text-lg font-extrabold text-on-surface mb-4">
                        {exp.title}
                      </h4>
                      <ul className="space-y-3">
                        {exp.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5 text-xs text-on-surface-variant leading-relaxed font-medium">
                            <CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ThreeDCard>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
