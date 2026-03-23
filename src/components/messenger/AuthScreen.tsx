import { useState } from "react";
import { User } from "@/pages/Index";
import Icon from "@/components/ui/icon";

type Props = {
  onAuth: (user: User) => void;
};

const AuthScreen = ({ onAuth }: Props) => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Введите имя");
      return;
    }
    if (password.length < 4) {
      setError("Пароль должен быть не менее 4 символов");
      return;
    }

    const stored = localStorage.getItem("messenger_users");
    const users: Record<string, string> = stored ? JSON.parse(stored) : {};

    if (mode === "register") {
      if (users[name.trim()]) {
        setError("Пользователь с таким именем уже существует");
        return;
      }
      users[name.trim()] = password;
      localStorage.setItem("messenger_users", JSON.stringify(users));
    } else {
      if (!users[name.trim()] || users[name.trim()] !== password) {
        setError("Неверное имя или пароль");
        return;
      }
    }

    onAuth({
      id: name.trim().toLowerCase().replace(/\s+/g, "_"),
      name: name.trim(),
      status: "online",
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm animate-fade-in">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-5">
            <Icon name="Waves" size={28} className="text-primary" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Волна</h1>
          <p className="text-muted-foreground text-sm mt-1">Мессенджер для групповых звонков</p>
        </div>

        <div className="bg-card rounded-2xl p-6 border border-border">
          <div className="flex rounded-xl bg-muted p-1 mb-6">
            <button
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                mode === "login"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => { setMode("login"); setError(""); }}
            >
              Войти
            </button>
            <button
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                mode === "register"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => { setMode("register"); setError(""); }}
            >
              Регистрация
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">
                Имя
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Введите ваше имя"
                className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-all"
                autoFocus
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">
                Пароль
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-all"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm animate-fade-in">
                <Icon name="AlertCircle" size={14} />
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground rounded-xl py-3 text-sm font-semibold hover:bg-primary/90 transition-all duration-200 active:scale-[0.98]"
            >
              {mode === "login" ? "Войти" : "Создать аккаунт"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
