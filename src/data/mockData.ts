import { User } from "@/pages/Index";

export type Message = {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  time: string;
  read: boolean;
};

export type Chat = {
  id: string;
  name: string;
  isGroup: boolean;
  members: string[];
  messages: Message[];
};

export type Contact = User & {
  chatId?: string;
};

export type CallRecord = {
  id: string;
  name: string;
  isGroup: boolean;
  members: string[];
  type: "incoming" | "outgoing" | "missed";
  duration?: string;
  time: string;
};
