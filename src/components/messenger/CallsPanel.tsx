import Icon from "@/components/ui/icon";
import Avatar from "./Avatar";
import { MOCK_CALLS, CallRecord } from "@/data/mockData";
import { useState } from "react";

type Props = {
  onStartCall: (call: CallRecord) => void;
};

const CallsPanel = ({ onStartCall }: Props) => {
  const [calls] = useState<CallRecord[]>(MOCK_CALLS);

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="px-6 pt-6 pb-4 border-b border-border">
        <h2 className="text-base font-semibold text-foreground">Звонки</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {calls.map((call) => {
          const isMissed = call.type === "missed";
          const isOutgoing = call.type === "outgoing";

          return (
            <div
              key={call.id}
              className="flex items-center gap-3 px-5 py-3.5 hover:bg-muted/40 transition-colors group"
            >
              <Avatar name={call.name} size="md" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className={`text-sm font-medium ${isMissed ? "text-destructive" : "text-foreground"}`}>
                    {call.name}
                  </span>
                  {call.isGroup && (
                    <Icon name="Users" size={12} className="text-muted-foreground" />
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <Icon
                    name={isMissed ? "PhoneMissed" : isOutgoing ? "PhoneOutgoing" : "PhoneIncoming"}
                    size={12}
                    className={isMissed ? "text-destructive" : "text-muted-foreground"}
                  />
                  <span className="text-xs text-muted-foreground">
                    {call.time}
                    {call.duration && ` · ${call.duration}`}
                  </span>
                </div>
              </div>
              <button
                onClick={() => onStartCall(call)}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-primary hover:bg-primary/10 transition-colors opacity-0 group-hover:opacity-100"
                title="Перезвонить"
              >
                <Icon name="Phone" size={17} />
              </button>
            </div>
          );
        })}
      </div>

      <div className="p-5 border-t border-border">
        <button
          onClick={() => onStartCall(MOCK_CALLS[1])}
          className="w-full flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl py-3 text-sm font-medium transition-colors"
        >
          <Icon name="PhonePlus" size={16} />
          Новый групповой звонок
        </button>
      </div>
    </div>
  );
};

export default CallsPanel;
