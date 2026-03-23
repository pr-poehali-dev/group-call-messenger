import Icon from "@/components/ui/icon";
import Avatar from "./Avatar";
import { CallRecord } from "@/data/mockData";

type Props = {
  calls: CallRecord[];
  onStartCall: (call: CallRecord) => void;
};

const CallsPanel = ({ calls, onStartCall }: Props) => {
  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="px-6 pt-6 pb-4 border-b border-border">
        <h2 className="text-base font-semibold text-foreground">Звонки</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {calls.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground text-sm px-6 text-center">
            <Icon name="Phone" size={28} className="mb-3 opacity-30" />
            <p className="font-medium text-foreground mb-1">Звонков пока нет</p>
            <p className="text-xs">История звонков будет отображаться здесь</p>
          </div>
        ) : (
          calls.map((call) => {
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
          })
        )}
      </div>
    </div>
  );
};

export default CallsPanel;
