import { useState } from "react";
import Sidebar from "./Sidebar";
import ChatsPanel from "./ChatsPanel";
import ChatView from "./ChatView";
import CallsPanel from "./CallsPanel";
import ContactsPanel from "./ContactsPanel";
import ProfilePanel from "./ProfilePanel";
import CallScreen from "./CallScreen";
import EmptyState from "./EmptyState";
import { User } from "@/pages/Index";
import { Chat, Contact, CallRecord } from "@/data/mockData";
import { useStore } from "@/hooks/useStore";

type Tab = "chats" | "calls" | "contacts" | "profile";

type ActiveCall = {
  name: string;
  isGroup: boolean;
  members: string[];
};

type Props = {
  currentUser: User;
  onLogout: () => void;
};

const MessengerApp = ({ currentUser, onLogout }: Props) => {
  const [activeTab, setActiveTab] = useState<Tab>("chats");
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [activeCall, setActiveCall] = useState<ActiveCall | null>(null);

  const store = useStore(currentUser);

  const syncSelectedChat = (chat: Chat) => {
    const fresh = store.chats.find((c) => c.id === chat.id);
    setSelectedChat(fresh || chat);
  };

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat);
  };

  const startCallFromChat = (chat: Chat) => {
    setActiveCall({ name: chat.name, isGroup: chat.isGroup, members: chat.members });
    store.addCallRecord({ name: chat.name, isGroup: chat.isGroup, members: chat.members, type: "outgoing" });
  };

  const openContactChat = (contact: Contact) => {
    const chat = store.openOrCreateChat(contact);
    setSelectedChat(chat);
    setActiveTab("chats");
  };

  const startCallFromRecord = (call: CallRecord) => {
    setActiveCall({ name: call.name, isGroup: call.isGroup, members: call.members });
    store.addCallRecord({ name: call.name, isGroup: call.isGroup, members: call.members, type: "outgoing" });
  };

  const handleSendMessage = (chatId: string, text: string, senderName: string) => {
    const msg = store.sendMessage(chatId, text, senderName);
    const fresh = store.chats.find((c) => c.id === chatId);
    if (fresh) setSelectedChat(fresh);
    return msg;
  };

  const currentChat = selectedChat
    ? store.chats.find((c) => c.id === selectedChat.id) || selectedChat
    : null;

  const renderMainContent = () => {
    if (activeCall) {
      return (
        <CallScreen
          callName={activeCall.name}
          isGroup={activeCall.isGroup}
          members={activeCall.members}
          onEnd={() => setActiveCall(null)}
        />
      );
    }

    switch (activeTab) {
      case "chats":
        return currentChat ? (
          <ChatView
            chat={currentChat}
            currentUser={currentUser}
            onStartCall={startCallFromChat}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <EmptyState tab="chats" />
        );
      case "calls":
        return <CallsPanel calls={store.calls} onStartCall={startCallFromRecord} />;
      case "contacts":
        return (
          <ContactsPanel
            contacts={store.contacts}
            onStartChat={openContactChat}
            onAddContact={store.addContact}
            getAllUsers={store.getAllRegisteredUsers}
          />
        );
      case "profile":
        return <ProfilePanel currentUser={currentUser} onLogout={onLogout} />;
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <Sidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab !== "chats") setSelectedChat(null);
        }}
        currentUser={currentUser}
      />

      {activeTab === "chats" && !activeCall && (
        <ChatsPanel
          chats={store.chats}
          onSelectChat={handleSelectChat}
          selectedChatId={currentChat?.id}
        />
      )}

      {renderMainContent()}
    </div>
  );
};

export default MessengerApp;
