import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import Avatar from "./Avatar";
import { MOCK_CONTACTS } from "@/data/mockData";

type Participant = {
  id: string;
  name: string;
  muted: boolean;
  video: boolean;
  speaking: boolean;
};

type Props = {
  callName: string;
  isGroup: boolean;
  members: string[];
  onEnd: () => void;
};

const CallScreen = ({ callName, isGroup, members, onEnd }: Props) => {
  const [muted, setMuted] = useState(false);
  const [videoOn, setVideoOn] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(true);
  const [duration, setDuration] = useState(0);

  const participants: Participant[] = [
    { id: "me", name: "Вы", muted, video: videoOn, speaking: !muted },
    ...members.slice(0, 5).map((id) => {
      const contact = MOCK_CONTACTS.find((c) => c.id === id);
      return {
        id,
        name: contact?.name || id,
        muted: Math.random() > 0.7,
        video: false,
        speaking: Math.random() > 0.6,
      };
    }),
  ];

  useEffect(() => {
    const timer = setInterval(() => setDuration((d) => d + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDuration = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div className="flex-1 flex flex-col bg-background animate-fade-in">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{callName}</h3>
          <p className="text-xs text-primary">{formatDuration(duration)}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 px-2.5 py-1 bg-online/10 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-online animate-pulse" />
            <span className="text-xs text-online font-medium">{participants.length} в звонке</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {isGroup ? (
          <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto">
            {participants.map((p) => (
              <div
                key={p.id}
                className={`relative aspect-video bg-card rounded-2xl border flex flex-col items-center justify-center overflow-hidden transition-all ${
                  p.speaking && !p.muted ? "border-primary shadow-lg shadow-primary/10" : "border-border"
                }`}
              >
                {p.speaking && !p.muted && (
                  <div className="absolute inset-0 rounded-2xl border-2 border-primary animate-pulse-ring" />
                )}
                <Avatar name={p.name} size="lg" />
                <div className="mt-3 flex items-center gap-1.5">
                  <span className="text-xs font-medium text-foreground">{p.name}</span>
                  {p.muted && <Icon name="MicOff" size={11} className="text-destructive" />}
                </div>
                {!p.muted && (
                  <div className="absolute bottom-2 left-2 flex items-end gap-0.5">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-0.5 bg-primary rounded-full animate-pulse"
                        style={{ height: `${6 + i * 3}px`, animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse-ring scale-125" />
              <Avatar name={callName} size="xl" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground">{callName}</h3>
              <p className="text-sm text-muted-foreground mt-1">{formatDuration(duration)}</p>
            </div>
          </div>
        )}
      </div>

      <div className="px-6 py-5 border-t border-border">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setMuted(!muted)}
            className={`w-13 h-13 rounded-2xl flex flex-col items-center justify-center gap-1 p-3 transition-all ${
              muted ? "bg-destructive/15 text-destructive" : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
            }`}
            title={muted ? "Включить микрофон" : "Выключить микрофон"}
          >
            <Icon name={muted ? "MicOff" : "Mic"} size={20} />
            <span className="text-[9px] font-medium">{muted ? "Микр. выкл" : "Микрофон"}</span>
          </button>

          <button
            onClick={() => setVideoOn(!videoOn)}
            className={`w-13 h-13 rounded-2xl flex flex-col items-center justify-center gap-1 p-3 transition-all ${
              videoOn ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
            }`}
          >
            <Icon name={videoOn ? "Video" : "VideoOff"} size={20} />
            <span className="text-[9px] font-medium">{videoOn ? "Камера вкл" : "Камера"}</span>
          </button>

          <button
            onClick={onEnd}
            className="w-14 h-14 rounded-2xl bg-destructive flex flex-col items-center justify-center gap-1 p-3 text-white hover:bg-destructive/90 transition-all active:scale-95"
          >
            <Icon name="PhoneOff" size={22} />
            <span className="text-[9px] font-medium">Завершить</span>
          </button>

          <button
            onClick={() => setSpeakerOn(!speakerOn)}
            className={`w-13 h-13 rounded-2xl flex flex-col items-center justify-center gap-1 p-3 transition-all ${
              speakerOn ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
            }`}
          >
            <Icon name={speakerOn ? "Volume2" : "VolumeX"} size={20} />
            <span className="text-[9px] font-medium">{speakerOn ? "Звук вкл" : "Без звука"}</span>
          </button>

          <button className="w-13 h-13 rounded-2xl flex flex-col items-center justify-center gap-1 p-3 bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all">
            <Icon name="ScreenShare" size={20} />
            <span className="text-[9px] font-medium">Экран</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallScreen;
