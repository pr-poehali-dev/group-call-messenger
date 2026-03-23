import { useState, useCallback } from "react";
import { Contact, Chat, CallRecord, Message } from "@/data/mockData";
import { User } from "@/pages/Index";

const KEY_CONTACTS = "messenger_contacts_";
const KEY_CHATS = "messenger_chats_";
const KEY_CALLS = "messenger_calls_";

const load = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const save = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const useStore = (currentUser: User) => {
  const cKey = KEY_CONTACTS + currentUser.id;
  const chKey = KEY_CHATS + currentUser.id;
  const callKey = KEY_CALLS + currentUser.id;

  const [contacts, setContactsState] = useState<Contact[]>(() => load<Contact[]>(cKey, []));
  const [chats, setChatsState] = useState<Chat[]>(() => load<Chat[]>(chKey, []));
  const [calls, setCallsState] = useState<CallRecord[]>(() => load<CallRecord[]>(callKey, []));

  const setContacts = useCallback((val: Contact[]) => {
    setContactsState(val);
    save(cKey, val);
  }, [cKey]);

  const setChats = useCallback((val: Chat[]) => {
    setChatsState(val);
    save(chKey, val);
  }, [chKey]);

  const setCalls = useCallback((val: CallRecord[]) => {
    setCallsState(val);
    save(callKey, val);
  }, [callKey]);

  const getAllRegisteredUsers = (): Contact[] => {
    const raw = localStorage.getItem("messenger_users");
    if (!raw) return [];
    const users: Record<string, string> = JSON.parse(raw);
    return Object.keys(users)
      .filter((name) => name !== currentUser.name)
      .map((name) => ({
        id: name.toLowerCase().replace(/\s+/g, "_"),
        name,
        status: "offline" as const,
      }));
  };

  const addContact = (user: Contact) => {
    if (contacts.find((c) => c.id === user.id)) return;
    const updated = [...contacts, user];
    setContacts(updated);
  };

  const openOrCreateChat = (contact: Contact): Chat => {
    const existing = chats.find(
      (c) => !c.isGroup && c.members.includes(contact.id)
    );
    if (existing) return existing;

    const newChat: Chat = {
      id: `chat_${contact.id}_${Date.now()}`,
      name: contact.name,
      isGroup: false,
      members: [contact.id],
      messages: [],
    };
    const updated = [newChat, ...chats];
    setChats(updated);
    return newChat;
  };

  const sendMessage = (chatId: string, text: string, senderName: string) => {
    const msg: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      senderName,
      text,
      time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
      read: true,
    };
    const updated = chats.map((c) =>
      c.id === chatId ? { ...c, messages: [...c.messages, msg] } : c
    );
    setChats(updated);
    return msg;
  };

  const addCallRecord = (record: Omit<CallRecord, "id" | "time">) => {
    const newRecord: CallRecord = {
      ...record,
      id: Date.now().toString(),
      time: new Date().toLocaleString("ru", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newRecord, ...calls];
    setCalls(updated);
  };

  const updateChat = (chatId: string, messages: Message[]) => {
    const updated = chats.map((c) => c.id === chatId ? { ...c, messages } : c);
    setChats(updated);
  };

  return {
    contacts,
    chats,
    calls,
    setChats,
    addContact,
    openOrCreateChat,
    sendMessage,
    addCallRecord,
    updateChat,
    getAllRegisteredUsers,
  };
};
