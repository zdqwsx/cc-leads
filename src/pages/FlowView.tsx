import { useParams, Link, useNavigate } from 'react-router-dom';
import { getFlowById } from '@/data/flows';
import { getPageById, categoryColors } from '@/data/pages';
import { useFlowStore } from '@/store/useFlowStore';
import { useSimulatorStore } from '@/simulator/useSimulatorStore';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  Circle,
  ArrowLeft,
  Play,
  Smartphone,
  Image,
} from 'lucide-react';
import PhoneFrame from '@/components/PhoneFrame/PhoneFrame';

export default function FlowView() {
  const { flowId } = useParams<{ flowId: string }>();
  const navigate = useNavigate();
  const flow = getFlowById(flowId || '');
  const { currentStepIndex, setFlow, nextStep, prevStep, reset } = useFlowStore();
  const { resetNavigation: resetSimulator } = useSimulatorStore();
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [simulatorMode, setSimulatorMode] = useState(false);

  useEffect(() => {
    if (flowId) {
      setFlow(flowId);
    }
  }, [flowId, setFlow]);

  if (!flow) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-gray-500 mb-4">流程不存在</p>
          <Link to="/flows" className="text-[#0089FF] hover:underline">
            返回流程列表
          </Link>
        </div>
      </div>
    );
  }

  const currentStep = flow.steps[currentStepIndex];
  const currentPage = currentStep ? getPageById(currentStep.pageId) : null;
  const isLastStep = currentStepIndex === flow.steps.length - 1;

  const handleChoice = (nextStepId: string) => {
    setSelectedChoice(nextStepId);
    const nextIndex = flow.steps.findIndex((s) => s.id === nextStepId);
    if (nextIndex >= 0) {
      useFlowStore.setState({ currentStepIndex: nextIndex });
    }
    setSelectedChoice(null);
  };

  return (
    <div className="p-8">
      {/* 头部 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/flows')}
            className="flex items-center gap-2 text-gray-400 hover:text-[#0089FF] transition-colors text-sm group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            返回列表
          </button>
          <div className="w-px h-5 bg-gray-200" />
          <div>
            <h1 className="text-xl font-bold text-[#1F2329]">{flow.name}</h1>
            <p className="text-sm text-gray-400">{flow.description}</p>
          </div>
        </div>
        <button
          onClick={() => {
            reset();
            setFlow(flowId!);
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-100 text-gray-600 hover:border-[#0089FF]/30 hover:text-[#0089FF] transition-all text-sm shadow-sm"
        >
          <RotateCcw size={14} />
          重新开始
        </button>
        {/* 模式切换 */}
        <button
          onClick={() => {
            if (!simulatorMode) {
              resetSimulator();
            }
            setSimulatorMode(!simulatorMode);
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all shadow-sm border ${
            simulatorMode
              ? 'bg-[#0089FF] text-white border-[#0089FF]'
              : 'bg-white border-gray-100 text-gray-600 hover:border-[#0089FF]/30 hover:text-[#0089FF]'
          }`}
        >
          {simulatorMode ? (
            <>
              <Image size={14} />
              截图模式
            </>
          ) : (
            <>
              <Smartphone size={14} />
              交互模拟
            </>
          )}
        </button>
      </div>

      {/* 步骤进度条 */}
      <div className="bg-white rounded-2xl border border-gray-100/80 p-5 mb-6 shadow-sm">
        <div className="flex items-center gap-1 overflow-x-auto pb-1">
          {flow.steps.map((step, i) => {
            const isCompleted = i < currentStepIndex;
            const isCurrent = i === currentStepIndex;
            return (
              <div key={step.id} className="flex items-center shrink-0">
                <button
                  onClick={() => useFlowStore.setState({ currentStepIndex: i })}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${
                    isCurrent
                      ? 'text-white shadow-md'
                      : isCompleted
                      ? 'bg-[#00C853]/10 text-[#00C853]'
                      : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                  }`}
                  style={
                    isCurrent
                      ? { background: 'linear-gradient(135deg, #0089FF 0%, #00C6FF 100%)', boxShadow: '0 4px 12px rgba(0, 137, 255, 0.3)' }
                      : undefined
                  }
                >
                  {isCompleted ? (
                    <CheckCircle2 size={14} />
                  ) : isCurrent ? (
                    <Play size={12} className="ml-0.5" />
                  ) : (
                    <Circle size={14} />
                  )}
                  {step.label}
                </button>
                {i < flow.steps.length - 1 && (
                  <ChevronRight size={14} className="text-gray-200 mx-0.5 shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 主内容区 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* 手机模拟框 */}
        <div className="lg:col-span-2 flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep?.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <PhoneFrame imageUrl={currentPage?.uiImages?.[0]} simulatorMode={simulatorMode} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 步骤详情 */}
        <div className="lg:col-span-3 space-y-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep?.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              {/* 当前步骤信息 */}
              <div className="bg-white rounded-2xl border border-gray-100/80 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                    style={{
                      backgroundColor: currentPage ? categoryColors[currentPage.category] : '#0089FF',
                      boxShadow: `0 4px 12px ${currentPage ? categoryColors[currentPage.category] + '40' : 'rgba(0,137,255,0.25)'}`,
                    }}
                  >
                    {currentStepIndex + 1}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-[#1F2329]">
                      {currentStep?.label}
                    </h2>
                    {currentStep?.description && (
                      <p className="text-sm text-gray-400">{currentStep.description}</p>
                    )}
                  </div>
                </div>

                {currentPage && (
                  <div className="mt-4 space-y-3">
                    <p className="text-sm font-medium text-gray-700">功能需求：</p>
                    <ul className="space-y-2">
                      {currentPage.requirements.slice(0, 4).map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0089FF] shrink-0 mt-1.5" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* 操作选择 */}
              {currentStep?.choices && currentStep.choices.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100/80 p-6 shadow-sm">
                  <h3 className="text-sm font-semibold text-[#1F2329] mb-4">
                    请选择操作路径：
                  </h3>
                  <div className="space-y-3">
                    {currentStep.choices.map((choice) => (
                      <button
                        key={choice.nextStepId}
                        onClick={() => handleChoice(choice.nextStepId)}
                        className={`w-full flex items-center justify-between px-5 py-3.5 rounded-xl border-2 transition-all text-left hover-lift ${
                          selectedChoice === choice.nextStepId
                            ? 'border-[#0089FF] bg-[#0089FF]/5'
                            : 'border-gray-100 hover:border-[#0089FF]/40 hover:bg-[#0089FF]/5'
                        }`}
                      >
                        <span className="text-sm text-[#1F2329] font-medium">{choice.label}</span>
                        <ChevronRight size={16} className="text-gray-300" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 导航按钮 */}
              {!currentStep?.choices && (
                <div className="flex gap-3">
                  <button
                    onClick={prevStep}
                    disabled={currentStepIndex === 0}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-gray-100 text-gray-600 hover:border-gray-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed text-sm shadow-sm"
                  >
                    <ChevronLeft size={16} />
                    上一步
                  </button>
                  <button
                    onClick={() => nextStep()}
                    disabled={isLastStep}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed text-sm shadow-md"
                    style={{
                      background: 'linear-gradient(135deg, #0089FF 0%, #00C6FF 100%)',
                      boxShadow: '0 4px 12px rgba(0, 137, 255, 0.3)',
                    }}
                  >
                    {isLastStep ? '流程结束' : '下一步'}
                    {!isLastStep && <ChevronRight size={16} />}
                  </button>
                </div>
              )}

              {/* 流程结束提示 */}
              {isLastStep && !currentStep?.choices && (
                <div
                  className="rounded-2xl p-8 text-center"
                  style={{ background: 'linear-gradient(135deg, rgba(0, 200, 83, 0.06) 0%, rgba(0, 200, 83, 0.02) 100%)' }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #00C853 0%, #009624 100%)', boxShadow: '0 8px 24px rgba(0, 200, 83, 0.3)' }}
                  >
                    <CheckCircle2 size={32} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1F2329] mb-1">流程完成</h3>
                  <p className="text-sm text-gray-400 mb-5">你已完成整个流程的模拟</p>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => {
                        reset();
                        setFlow(flowId!);
                      }}
                      className="px-5 py-2 rounded-xl bg-white border border-gray-100 text-gray-600 hover:border-gray-200 transition-colors text-sm shadow-sm"
                    >
                      重新开始
                    </button>
                    <Link
                      to="/flows"
                      className="px-5 py-2 rounded-xl text-white text-sm shadow-md"
                      style={{
                        background: 'linear-gradient(135deg, #0089FF 0%, #00C6FF 100%)',
                        boxShadow: '0 4px 12px rgba(0, 137, 255, 0.3)',
                      }}
                    >
                      选择其他流程
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
