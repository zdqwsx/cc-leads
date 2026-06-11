import { ReactNode } from 'react';
import SimulatorApp from '@/simulator/SimulatorApp';

interface PhoneFrameProps {
  children?: ReactNode;
  imageUrl?: string;
  /** 启用交互模拟模式 */
  simulatorMode?: boolean;
}

export default function PhoneFrame({ imageUrl, simulatorMode }: PhoneFrameProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        {/* 手机外框 */}
        <div className="w-[320px] h-[640px] bg-[#1F2329] rounded-[40px] p-3 shadow-2xl shadow-black/20">
          {/* 手机屏幕 */}
          <div className="w-full h-full bg-white rounded-[28px] overflow-hidden relative">
            {/* 顶部刘海 */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#1F2329] rounded-b-2xl z-20 pointer-events-none" />
            {/* 内容区 */}
            {simulatorMode ? (
              <SimulatorApp />
            ) : imageUrl ? (
              <img
                src={imageUrl}
                alt="UI截图"
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
                暂无UI截图
              </div>
            )}
          </div>
        </div>
        {/* 底部指示条（仅模拟器模式显示） */}
        {simulatorMode && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-black/30 rounded-full z-30" />
        )}
      </div>
    </div>
  );
}
