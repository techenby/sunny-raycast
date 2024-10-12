import { ActionPanel, Action, List } from "@raycast/api";
import { useEffect, useState } from "react";

export default function Command() {
    const [statuses, setState] = useState<State[]>([
        { status: "👥 Client Meeting", active: false },
        { status: "👥 Internal Meeting", active: false },
        { status: "🍐 Client Pairing", active: false },
        { status: "🍐 Internal Pairing", active: false },
        { status: "📹 Streaming", active: false },
        { status: "📹 Recording", active: false },
        { status: "🧑🏻‍💻 Coding - Work", active: false },
        { status: "🧑🏻‍💻 Coding - Institute", active: false },
        { status: "🧑🏻‍💻 Coding - Fun", active: false },
        { status: "✍🏻 Writing - Work", active: false },
        { status: "✍🏻 Writing - Fun", active: false },
        { status: "⛏️ Pretending to Work", active: false },
        { status: "🤷🏻 Therapy", active: false },
        { status: "Clear", active: false },
      ]);

  return (
    <List>
      {statuses.map((item, index) => (
        <List.Item
          key={index}
          title={item.status}
          subtitle={item.status === 'Clear' ? '' : item.active ? 'Yes' : 'No'}
          actions={
            <ActionPanel>
              <Action.CopyToClipboard content={item.title} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
