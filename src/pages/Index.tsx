import { useState } from "react";
import AuthScreen from "@/components/messenger/AuthScreen";
import MessengerApp from "@/components/messenger/MessengerApp";

export type User = {
  id: string;
  name: string;
  status: "online" | "away" | "offline";
  lastSeen?: string;
};

const Index = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  if (!currentUser) {
    return <AuthScreen onAuth={setCurrentUser} />;
  }

  return <MessengerApp currentUser={currentUser} onLogout={() => setCurrentUser(null)} />;
};

export default Index;
