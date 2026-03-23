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
  avatar?: string;
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

export const MOCK_CONTACTS: Contact[] = [
  { id: "anna", name: "Анна Смирнова", status: "online" },
  { id: "dmitry", name: "Дмитрий Козлов", status: "online" },
  { id: "maria", name: "Мария Петрова", status: "away", lastSeen: "10 мин назад" },
  { id: "alexey", name: "Алексей Новиков", status: "offline", lastSeen: "вчера" },
  { id: "elena", name: "Елена Иванова", status: "online" },
  { id: "sergey", name: "Сергей Волков", status: "offline", lastSeen: "3 часа назад" },
];

export const MOCK_CHATS: Chat[] = [
  {
    id: "chat_anna",
    name: "Анна Смирнова",
    isGroup: false,
    members: ["anna"],
    messages: [
      { id: "1", senderId: "anna", senderName: "Анна", text: "Привет! Как дела?", time: "10:24", read: true },
      { id: "2", senderId: "me", senderName: "Я", text: "Отлично, спасибо! А у тебя?", time: "10:25", read: true },
      { id: "3", senderId: "anna", senderName: "Анна", text: "Тоже всё хорошо. Созвонимся сегодня?", time: "10:26", read: false },
    ],
  },
  {
    id: "chat_team",
    name: "Команда проекта",
    isGroup: true,
    members: ["anna", "dmitry", "maria", "elena"],
    messages: [
      { id: "1", senderId: "dmitry", senderName: "Дмитрий", text: "Всем привет! Напоминаю о встрече в 15:00", time: "09:00", read: true },
      { id: "2", senderId: "maria", senderName: "Мария", text: "Буду!", time: "09:05", read: true },
      { id: "3", senderId: "elena", senderName: "Елена", text: "Подтверждаю участие", time: "09:10", read: true },
      { id: "4", senderId: "dmitry", senderName: "Дмитрий", text: "Отлично, жду всех 👍", time: "09:12", read: false },
    ],
  },
  {
    id: "chat_dmitry",
    name: "Дмитрий Козлов",
    isGroup: false,
    members: ["dmitry"],
    messages: [
      { id: "1", senderId: "me", senderName: "Я", text: "Дима, можешь прислать файлы?", time: "вчера", read: true },
      { id: "2", senderId: "dmitry", senderName: "Дмитрий", text: "Да, отправил на почту", time: "вчера", read: true },
    ],
  },
  {
    id: "chat_design",
    name: "Дизайн-группа",
    isGroup: true,
    members: ["anna", "elena", "sergey"],
    messages: [
      { id: "1", senderId: "elena", senderName: "Елена", text: "Новые макеты готовы!", time: "вчера", read: true },
    ],
  },
];

export const MOCK_CALLS: CallRecord[] = [
  { id: "1", name: "Анна Смирнова", isGroup: false, members: ["anna"], type: "incoming", duration: "14 мин", time: "Сегодня, 10:00" },
  { id: "2", name: "Команда проекта", isGroup: true, members: ["anna", "dmitry", "maria", "elena"], type: "outgoing", duration: "45 мин", time: "Сегодня, 09:15" },
  { id: "3", name: "Дмитрий Козлов", isGroup: false, members: ["dmitry"], type: "missed", time: "Вчера, 18:30" },
  { id: "4", name: "Дизайн-группа", isGroup: true, members: ["anna", "elena", "sergey"], type: "incoming", duration: "1 ч 12 мин", time: "Вчера, 15:00" },
  { id: "5", name: "Сергей Волков", isGroup: false, members: ["sergey"], type: "outgoing", duration: "5 мин", time: "22 марта" },
];
