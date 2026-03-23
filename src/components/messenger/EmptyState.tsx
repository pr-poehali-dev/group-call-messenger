import Icon from "@/components/ui/icon";

type Props = {
  tab: "chats" | "calls" | "contacts" | "profile";
};

const EmptyState = ({ tab }: Props) => {
  const content = {
    chats: { icon: "MessageSquare", title: "Выберите чат", desc: "Нажмите на диалог слева, чтобы начать общение" },
    calls: { icon: "Phone", title: "Звонки", desc: "Выберите контакт, чтобы начать звонок" },
    contacts: { icon: "Users", title: "Контакты", desc: "Выберите контакт для начала диалога" },
    profile: { icon: "User", title: "Профиль", desc: "" },
  };

  const { icon, title, desc } = content[tab];

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-background text-center px-8">
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
        <Icon name={icon} size={28} className="text-muted-foreground" />
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1">{title}</h3>
      {desc && <p className="text-sm text-muted-foreground max-w-xs">{desc}</p>}
    </div>
  );
};

export default EmptyState;
