import Icon from "@/components/ui/icon";
import Avatar from "./Avatar";
import { User } from "@/pages/Index";

type Tab = "chats" | "calls" | "contacts" | "profile";

type Props = {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  currentUser: User;
};

const tabs = [
  { id: "chats" as Tab, icon: "MessageSquare", label: "Чаты" },
  { id: "calls" as Tab, icon: "Phone", label: "Звонки" },
  { id: "contacts" as Tab, icon: "Users", label: "Контакты" },
  { id: "profile" as Tab, icon: "User", label: "Профиль" },
];

const Sidebar = ({ activeTab, onTabChange, currentUser }: Props) => {
  return (
    <div className="w-16 flex flex-col items-center py-4 bg-card border-r border-border gap-1">
      <div className="mb-4">
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon name="Waves" size={18} className="text-primary" />
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-1 w-full px-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            title={tab.label}
            className={`group w-full aspect-square rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-primary/15 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Icon name={tab.icon} size={20} />
            <span className="text-[9px] font-medium leading-none">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-auto pt-2">
        <Avatar name={currentUser.name} size="sm" status="online" showStatus />
      </div>
    </div>
  );
};

export default Sidebar;
