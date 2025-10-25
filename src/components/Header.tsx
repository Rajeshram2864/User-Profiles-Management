import { Headphones, Bell, User } from 'lucide-react';

interface HeaderProps {
  onLogoClick?: () => void;
}

export default function Header({ onLogoClick }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white px-4 py-[0px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={onLogoClick}
            className="px-4 py-2 flex flex-col items-center hover:bg-gray-50 transition-colors"
          >
            <span className=" border-2 border-black  px-4 py-2 text-lg font-bold text-black">LOGO</span>
            <span className="text-[7px] font-normal text-black">ESTD</span>
            <span className="text-[7px] font-normal text-black">2025</span>
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Headphones className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <User className="w-5 h-5 text-violet-600" />
          </button>
        </div>
      </div>
    </header>
  );
}

