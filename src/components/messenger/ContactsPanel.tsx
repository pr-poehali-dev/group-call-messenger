import { useState } from "react";
import Icon from "@/components/ui/icon";
import Avatar from "./Avatar";
import { Contact } from "@/data/mockData";

type Props = {
  contacts: Contact[];
  onStartChat: (contact: Contact) => void;
  onAddContact: (contact: Contact) => void;
  getAllUsers: () => Contact[];
};

const ContactsPanel = ({ contacts, onStartChat, onAddContact, getAllUsers }: Props) => {
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<"my" | "search">("my");
  const [searchResults, setSearchResults] = useState<Contact[]>([]);

  const handleSearch = (val: string) => {
    setSearch(val);
    if (mode === "search") {
      const all = getAllUsers();
      setSearchResults(
        val.trim()
          ? all.filter((u) => u.name.toLowerCase().includes(val.toLowerCase()))
          : all
      );
    }
  };

  const switchMode = (m: "my" | "search") => {
    setMode(m);
    setSearch("");
    if (m === "search") {
      setSearchResults(getAllUsers());
    }
  };

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const isAdded = (id: string) => contacts.some((c) => c.id === id);

  const ContactRow = ({ contact, showAdd }: { contact: Contact; showAdd?: boolean }) => (
    <div
      className="flex items-center gap-3 px-5 py-3 hover:bg-muted/40 transition-colors group cursor-pointer"
      onClick={() => !showAdd && onStartChat(contact)}
    >
      <Avatar name={contact.name} size="md" status={contact.status} showStatus={!showAdd} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{contact.name}</p>
        {!showAdd && (
          <p className={`text-xs ${contact.status === "online" ? "text-online" : contact.status === "away" ? "text-away" : "text-muted-foreground"}`}>
            {contact.status === "online" ? "онлайн" :
             contact.status === "away" ? `отошёл · ${contact.lastSeen}` :
             contact.lastSeen ? `был(а) ${contact.lastSeen}` : "офлайн"}
          </p>
        )}
        {showAdd && (
          <p className="text-xs text-muted-foreground">зарегистрирован в Волне</p>
        )}
      </div>
      {showAdd ? (
        isAdded(contact.id) ? (
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Icon name="Check" size={13} className="text-online" />
            Добавлен
          </span>
        ) : (
          <button
            onClick={(e) => { e.stopPropagation(); onAddContact(contact); }}
            className="flex items-center gap-1 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-xs font-medium transition-colors"
          >
            <Icon name="UserPlus" size={13} />
            Добавить
          </button>
        )
      ) : (
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
      )}
    </div>
  );

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="px-5 pt-5 pb-3 border-b border-border">
        <h2 className="text-base font-semibold text-foreground mb-4">Контакты</h2>

        <div className="flex rounded-xl bg-muted p-1 mb-3">
          <button
            onClick={() => switchMode("my")}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              mode === "my" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Мои контакты
          </button>
          <button
            onClick={() => switchMode("search")}
            className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              mode === "search" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Найти людей
          </button>
        </div>

        <div className="relative">
          <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={mode === "my" ? "Поиск в контактах..." : "Искать по имени..."}
            className="w-full bg-muted rounded-xl pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            autoFocus={mode === "search"}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {mode === "my" ? (
          <>
            {filteredContacts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-muted-foreground text-sm px-6 text-center">
                <Icon name="Users" size={28} className="mb-3 opacity-30" />
                {contacts.length === 0 ? (
                  <>
                    <p className="font-medium text-foreground mb-1">Контактов пока нет</p>
                    <p className="text-xs">Перейди во вкладку «Найти людей», чтобы добавить кого-нибудь</p>
                  </>
                ) : (
                  <p>Контакт не найден</p>
                )}
              </div>
            ) : (
              <>
                <div className="px-5 py-2 mt-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {filteredContacts.length} контакт{filteredContacts.length === 1 ? "" : filteredContacts.length < 5 ? "а" : "ов"}
                  </span>
                </div>
                {filteredContacts.map((c) => <ContactRow key={c.id} contact={c} />)}
              </>
            )}
          </>
        ) : (
          <>
            {searchResults.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-muted-foreground text-sm px-6 text-center">
                <Icon name="UserSearch" size={28} className="mb-3 opacity-30" />
                {search ? (
                  <p>Пользователь «{search}» не найден</p>
                ) : (
                  <>
                    <p className="font-medium text-foreground mb-1">Никого нет</p>
                    <p className="text-xs">Зарегистрированные пользователи появятся здесь</p>
                  </>
                )}
              </div>
            ) : (
              <>
                <div className="px-5 py-2 mt-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Найдено: {searchResults.length}
                  </span>
                </div>
                {searchResults.map((u) => <ContactRow key={u.id} contact={u} showAdd />)}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ContactsPanel;
