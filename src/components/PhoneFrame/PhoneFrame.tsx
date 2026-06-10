import { ReactNode } from 'react';

interface PhoneFrameProps {
  children?: ReactNode;
  imageUrl?: string;
}

export default function PhoneFrame({ imageUrl }: PhoneFrameProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        {/* 手机外框 */}
        <div className="w-[320px] h-[640px] bg-[#1F2329] rounded-[40px] p-3 shadow-2xl shadow-black/20">
          {/* 手机屏幕 */}
          <div className="w-full h-full bg-white rounded-[28px] overflow-hidden relative">
            {/* 顶部刘海 */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#1F2329] rounded-b-2xl z-10" />
            {/* 内容区 */}
            {imageUrl ? (
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
      </div>
    </div>
  );
}
