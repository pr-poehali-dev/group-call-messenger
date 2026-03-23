import Icon from "@/components/ui/icon";
import Avatar from "./Avatar";
import { User } from "@/pages/Index";
import { useState } from "react";

type Props = {
  currentUser: User;
  onLogout: () => void;
};

const ProfilePanel = ({ currentUser, onLogout }: Props) => {
  const [status, setStatus] = useState<"online" | "away" | "offline">("online");
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(true);

  const statusLabels = {
    online: { label: "Онлайн", color: "text-online" },
    away: { label: "Не беспокоить", color: "text-away" },
    offline: { label: "Невидимый", color: "text-muted-foreground" },
  };

  return (
    <div className="flex-1 flex flex-col bg-background overflow-y-auto">
      <div className="px-6 pt-6 pb-4 border-b border-border">
        <h2 className="text-base font-semibold text-foreground">Профиль</h2>
      </div>

      <div className="flex flex-col items-center py-8 px-6">
        <Avatar name={currentUser.name} size="xl" status={status} showStatus />
        <h3 className="text-lg font-semibold text-foreground mt-4">{currentUser.name}</h3>
        <p className={`text-sm ${statusLabels[status].color} mt-0.5`}>{statusLabels[status].label}</p>
      </div>

      <div className="px-5 space-y-2">
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Статус</span>
          </div>
          {(["online", "away", "offline"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${
                  s === "online" ? "bg-online" : s === "away" ? "bg-away" : "bg-muted-foreground"
                }`} />
                <span className="text-sm text-foreground">{statusLabels[s].label}</span>
              </div>
              {status === s && <Icon name="Check" size={15} className="text-primary" />}
            </button>
          ))}
        </div>

        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="px-4 py-3 border-b border-border">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Уведомления</span>
          </div>
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-border/50">
            <div className="flex items-center gap-3">
              <Icon name="Bell" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Push-уведомления</span>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-10 h-6 rounded-full transition-colors duration-200 relative ${notifications ? "bg-primary" : "bg-muted"}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${notifications ? "translate-x-[18px]" : "translate-x-0.5"}`} />
            </button>
          </div>
          <div className="flex items-center justify-between px-4 py-3.5">
            <div className="flex items-center gap-3">
              <Icon name="Volume2" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Звуки</span>
            </div>
            <button
              onClick={() => setSounds(!sounds)}
              className={`w-10 h-6 rounded-full transition-colors duration-200 relative ${sounds ? "bg-primary" : "bg-muted"}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${sounds ? "translate-x-[18px]" : "translate-x-0.5"}`} />
            </button>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <button className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted/40 transition-colors border-b border-border/50">
            <Icon name="Shield" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">Конфиденциальность</span>
            <Icon name="ChevronRight" size={14} className="text-muted-foreground ml-auto" />
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted/40 transition-colors">
            <Icon name="HelpCircle" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">Помощь</span>
            <Icon name="ChevronRight" size={14} className="text-muted-foreground ml-auto" />
          </button>
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl text-destructive hover:bg-destructive/10 transition-colors text-sm font-medium"
        >
          <Icon name="LogOut" size={16} />
          Выйти из аккаунта
        </button>

        <div className="pb-6" />
      </div>
    </div>
  );
};

export default ProfilePanel;
