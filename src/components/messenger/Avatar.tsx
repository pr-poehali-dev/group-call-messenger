type Props = {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  status?: "online" | "away" | "offline";
  showStatus?: boolean;
};

const COLORS = [
  "from-blue-500 to-cyan-400",
  "from-violet-500 to-purple-400",
  "from-rose-500 to-pink-400",
  "from-amber-500 to-orange-400",
  "from-emerald-500 to-teal-400",
  "from-indigo-500 to-blue-400",
];

const getColor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
};

const getInitials = (name: string) => {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
};

const SIZES = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-xl",
};

const STATUS_SIZES = {
  sm: "w-2 h-2 border",
  md: "w-2.5 h-2.5 border-2",
  lg: "w-3 h-3 border-2",
  xl: "w-4 h-4 border-2",
};

const Avatar = ({ name, size = "md", status, showStatus = false }: Props) => {
  const color = getColor(name);
  const initials = getInitials(name);

  const statusColor =
    status === "online" ? "bg-online" :
    status === "away" ? "bg-away" :
    "bg-muted-foreground";

  return (
    <div className="relative inline-flex flex-shrink-0">
      <div
        className={`${SIZES[size]} rounded-full bg-gradient-to-br ${color} flex items-center justify-center font-semibold text-white`}
      >
        {initials}
      </div>
      {showStatus && status && (
        <span
          className={`absolute bottom-0 right-0 ${STATUS_SIZES[size]} ${statusColor} rounded-full border-card`}
        />
      )}
    </div>
  );
};

export default Avatar;
