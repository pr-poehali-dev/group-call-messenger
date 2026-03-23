import { useState } from "react";
import Icon from "@/components/ui/icon";
import Avatar from "./Avatar";
import { Chat, MOCK_CHATS } from "@/data/mockData";

type Props = {
  onSelectChat: (chat: Chat) => void;
  selectedChatId?: string;
};

const ChatsPanel = ({ onSelectChat, selectedChatId }: Props) => {
  const [search, setSearch] = useState("");
  const [chats] = useState<Chat[]>(MOCK_CHATS);

  const filtered = chats.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-72 flex flex-col border-r border-border bg-background">
      <div className="px-4 pt-5 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-foreground">Чаты</h2>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <Icon name="SquarePen" size={16} />
          </button>
        </div>
        <div className="relative">
          <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск чатов..."
            className="w-full bg-muted rounded-xl pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center h-32 text-muted-foreground text-sm">
            <Icon name="SearchX" size={24} className="mb-2 opacity-40" />
            Ничего не найдено
          </div>
        )}
        {filtered.map((chat) => {
          const lastMsg = chat.messages[chat.messages.length - 1];
          const unread = chat.messages.filter((m) => !m.read && m.senderId !== "me").length;

          return (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat)}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/60 transition-colors text-left ${
                selectedChatId === chat.id ? "bg-primary/8" : ""
              }`}
            >
              <div className="relative">
                <Avatar name={chat.name} size="md" />
                {chat.isGroup && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-muted rounded-full flex items-center justify-center border border-background">
                    <Icon name="Users" size={9} className="text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-sm font-medium text-foreground truncate">{chat.name}</span>
                  <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">{lastMsg?.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground truncate">
                    {lastMsg?.senderId === "me" ? "Вы: " : ""}{lastMsg?.text}
                  </p>
                  {unread > 0 && (
                    <span className="ml-2 flex-shrink-0 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-[10px] font-semibold text-primary-foreground">
                      {unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ChatsPanel;
