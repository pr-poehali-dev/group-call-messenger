import { useState } from "react";
import Icon from "@/components/ui/icon";
import Avatar from "./Avatar";
import { MOCK_CONTACTS, Contact } from "@/data/mockData";

type Props = {
  onStartChat: (contact: Contact) => void;
};

const ContactsPanel = ({ onStartChat }: Props) => {
  const [search, setSearch] = useState("");

  const filtered = MOCK_CONTACTS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const online = filtered.filter((c) => c.status === "online");
  const rest = filtered.filter((c) => c.status !== "online");

  const ContactRow = ({ contact }: { contact: Contact }) => (
    <div className="flex items-center gap-3 px-5 py-3 hover:bg-muted/40 transition-colors group cursor-pointer" onClick={() => onStartChat(contact)}>
      <Avatar name={contact.name} size="md" status={contact.status} showStatus />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{contact.name}</p>
        <p className={`text-xs ${contact.status === "online" ? "text-online" : contact.status === "away" ? "text-away" : "text-muted-foreground"}`}>
          {contact.status === "online" ? "онлайн" :
           contact.status === "away" ? `отошёл · ${contact.lastSeen}` :
           `был(а) ${contact.lastSeen}`}
        </p>
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => { e.stopPropagation(); onStartChat(contact); }}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          title="Написать"
        >
          <Icon name="MessageSquare" size={15} />
        </button>
        <button
          className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
          title="Позвонить"
        >
          <Icon name="Phone" size={15} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="px-5 pt-5 pb-3 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-foreground">Контакты</h2>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <Icon name="UserPlus" size={16} />
          </button>
        </div>
        <div className="relative">
          <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск контактов..."
            className="w-full bg-muted rounded-xl pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {online.length > 0 && (
          <>
            <div className="px-5 py-2 mt-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Онлайн · {online.length}
              </span>
            </div>
            {online.map((c) => <ContactRow key={c.id} contact={c} />)}
          </>
        )}
        {rest.length > 0 && (
          <>
            <div className="px-5 py-2 mt-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Все контакты · {rest.length}
              </span>
            </div>
            {rest.map((c) => <ContactRow key={c.id} contact={c} />)}
          </>
        )}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center h-32 text-muted-foreground text-sm">
            <Icon name="UserX" size={24} className="mb-2 opacity-40" />
            Контакты не найдены
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsPanel;
