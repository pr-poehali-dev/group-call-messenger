import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";
import Avatar from "./Avatar";
import { Chat, Message } from "@/data/mockData";
import { User } from "@/pages/Index";

type Props = {
  chat: Chat;
  currentUser: User;
  onStartCall: (chat: Chat) => void;
  onSendMessage: (chatId: string, text: string, senderName: string) => Message;
};

const ChatView = ({ chat, currentUser, onStartCall, onSendMessage }: Props) => {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.messages]);

  const send = () => {
    if (!input.trim()) return;
    onSendMessage(chat.id, input.trim(), currentUser.name);
    setInput("");
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
        <div className="flex items-center gap-3">
          <Avatar name={chat.name} size="md" />
          <div>
            <h3 className="text-sm font-semibold text-foreground">{chat.name}</h3>
            {chat.isGroup ? (
              <p className="text-xs text-muted-foreground">{chat.members.length + 1} участников</p>
            ) : (
              <p className="text-xs text-muted-foreground">контакт</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onStartCall(chat)}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title="Голосовой звонок"
          >
            <Icon name="Phone" size={17} />
          </button>
          <button
            onClick={() => onStartCall(chat)}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title="Видеозвонок"
          >
            <Icon name="Video" size={17} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1">
        {chat.messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-sm">
            <Icon name="MessageSquare" size={28} className="mb-2 opacity-30" />
            <p>Начните диалог</p>
          </div>
        )}
        {chat.messages.map((msg, i) => {
          const isMe = msg.senderId === currentUser.id;
          const showName = chat.isGroup && !isMe;
          const prevMsg = chat.messages[i - 1];
          const gap = prevMsg && prevMsg.senderId === msg.senderId ? "mt-0.5" : "mt-3";

          return (
            <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"} ${gap} animate-fade-in`}>
              {!isMe && (
                <div className="mr-2 mt-auto">
                  {(!prevMsg || prevMsg.senderId !== msg.senderId) ? (
                    <Avatar name={msg.senderName} size="sm" />
                  ) : (
                    <div className="w-8" />
                  )}
                </div>
              )}
              <div className={`max-w-[68%] ${isMe ? "items-end" : "items-start"} flex flex-col`}>
                {showName && (!prevMsg || prevMsg.senderId !== msg.senderId) && (
                  <span className="text-xs text-primary mb-1 ml-1">{msg.senderName}</span>
                )}
                <div
                  className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    isMe
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-card text-foreground border border-border rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
                <div className={`flex items-center gap-1 mt-0.5 px-1 ${isMe ? "flex-row-reverse" : ""}`}>
                  <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                  {isMe && (
                    <Icon name={msg.read ? "CheckCheck" : "Check"} size={11} className={msg.read ? "text-primary" : "text-muted-foreground"} />
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <div className="px-4 py-3.5 border-t border-border">
        <div className="flex items-end gap-2 bg-muted rounded-2xl px-4 py-2.5">
          <button className="text-muted-foreground hover:text-foreground transition-colors mb-0.5">
            <Icon name="Paperclip" size={17} />
          </button>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Сообщение..."
            rows={1}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none resize-none min-h-[22px] max-h-28"
            style={{ height: "auto" }}
            onInput={(e) => {
              const t = e.currentTarget;
              t.style.height = "auto";
              t.style.height = t.scrollHeight + "px";
            }}
          />
          <button
            onClick={send}
            disabled={!input.trim()}
            className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center transition-all duration-200 disabled:opacity-30 hover:bg-primary/90 active:scale-95 mb-0.5"
          >
            <Icon name="Send" size={15} className="text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
