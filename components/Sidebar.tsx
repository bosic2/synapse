import React from 'react';
import { LayoutDashboard, KanbanSquare, Wallet, Sparkles, Settings, Zap } from 'lucide-react';

type View = string;

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'kanban', label: 'Tasks', icon: KanbanSquare },
  { id: 'finance', label: 'Finance', icon: Wallet },
  { id: 'ai', label: 'AI Co-Pilot', icon: Sparkles },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const Sidebar = ({ activeView, onViewChange }: SidebarProps) => {
  return (
    <div className="w-60 h-full bg-[#FBFBFA] border-r border-gray-200 flex flex-col py-6 px-3 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2 px-3 mb-8">
        <div className="w-7 h-7 bg-[#37352F] rounded-lg flex items-center justify-center">
          <Zap size={16} className="text-white" fill="white" />
        </div>
        <span className="font-bold text-[#37352F] text-lg">Synapse</span>
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as View)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full text-left ${
                isActive
                  ? 'bg-gray-200 text-[#37352F]'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-[#37352F]'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
