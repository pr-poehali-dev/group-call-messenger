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
import { Chat, MOCK_CHATS, Contact, CallRecord } from "@/data/mockData";

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

  const startCallFromChat = (chat: Chat) => {
    setActiveCall({ name: chat.name, isGroup: chat.isGroup, members: chat.members });
  };

  const startCallFromContact = (contact: Contact) => {
    const chat = MOCK_CHATS.find((c) => c.members.includes(contact.id));
    if (chat) {
      setSelectedChat(chat);
      setActiveTab("chats");
    }
  };

  const startCallFromRecord = (call: CallRecord) => {
    setActiveCall({ name: call.name, isGroup: call.isGroup, members: call.members });
  };

  const openContactChat = (contact: Contact) => {
    const chat = MOCK_CHATS.find((c) => c.members.includes(contact.id) && !c.isGroup);
    if (chat) {
      setSelectedChat(chat);
      setActiveTab("chats");
    }
  };

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
        return selectedChat ? (
          <ChatView chat={selectedChat} currentUser={currentUser} onStartCall={startCallFromChat} />
        ) : (
          <EmptyState tab="chats" />
        );
      case "calls":
        return <CallsPanel onStartCall={startCallFromRecord} />;
      case "contacts":
        return <ContactsPanel onStartChat={openContactChat} />;
      case "profile":
        return <ProfilePanel currentUser={currentUser} onLogout={onLogout} />;
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <Sidebar
        activeTab={activeTab}
        onTabChange={(tab) => { setActiveTab(tab); if (tab !== "chats") setSelectedChat(null); }}
        currentUser={currentUser}
      />

      {activeTab === "chats" && !activeCall && (
        <ChatsPanel
          onSelectChat={setSelectedChat}
          selectedChatId={selectedChat?.id}
        />
      )}

      {renderMainContent()}
    </div>
  );
};

export default MessengerApp;
