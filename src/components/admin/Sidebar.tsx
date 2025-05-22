
import React from 'react';
import { Grid, Package, File, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  activeView: string;
  onNavigate: (view: any) => void;
  onCreateProduct: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate, onCreateProduct }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Grid },
    { id: 'list', label: 'Products', icon: Package },
    { id: 'news', label: 'News', icon: File, disabled: true }
  ];

  return (
    <aside className="bg-white w-full md:w-64 shadow-sm md:min-h-[calc(100vh-64px)]">
      <div className="p-4">
        <Button 
          onClick={onCreateProduct}
          className="w-full bg-telecom-blue hover:bg-telecom-light-blue flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          <span>New Product</span>
        </Button>
      </div>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <Button
                variant="ghost"
                className={`w-full justify-start rounded-none h-12 px-4 ${
                  activeView === item.id ? 'bg-telecom-light-gray text-telecom-blue font-medium' : ''
                }`}
                onClick={() => !item.disabled && onNavigate(item.id)}
                disabled={item.disabled}
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.label}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
