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

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat);
  };

  const handleBackFromChat = () => {
    setSelectedChat(null);
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

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (tab !== "chats") setSelectedChat(null);
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
            onBack={handleBackFromChat}
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

  const isChatOpen = activeTab === "chats" && !!currentChat;
  const isCallActive = !!activeCall;

  return (
    <div className="h-[100dvh] flex overflow-hidden bg-background">

      {/* Desktop layout */}
      <div className="hidden md:flex flex-1 overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          currentUser={currentUser}
          isMobile={false}
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

      {/* Mobile layout */}
      <div className="flex md:hidden flex-1 flex-col overflow-hidden">
        {/* Screen area */}
        <div className="flex-1 overflow-hidden relative">
          {isCallActive ? (
            renderMainContent()
          ) : activeTab === "chats" ? (
            <>
              {/* Chat list — hidden when chat is open */}
              <div className={`absolute inset-0 transition-transform duration-300 ${isChatOpen ? "-translate-x-full" : "translate-x-0"}`}>
                <ChatsPanel
                  chats={store.chats}
                  onSelectChat={handleSelectChat}
                  selectedChatId={currentChat?.id}
                />
              </div>
              {/* Chat view — slides in from right */}
              <div className={`absolute inset-0 transition-transform duration-300 ${isChatOpen ? "translate-x-0" : "translate-x-full"}`}>
                {currentChat && (
                  <ChatView
                    chat={currentChat}
                    currentUser={currentUser}
                    onStartCall={startCallFromChat}
                    onSendMessage={handleSendMessage}
                    onBack={handleBackFromChat}
                  />
                )}
              </div>
            </>
          ) : (
            renderMainContent()
          )}
        </div>

        {/* Bottom navigation — hide when chat is open or call is active */}
        {!isChatOpen && !isCallActive && (
          <Sidebar
            activeTab={activeTab}
            onTabChange={handleTabChange}
            currentUser={currentUser}
            isMobile={true}
          />
        )}
      </div>
    </div>
  );
};

export default MessengerApp;
