import { ActionPanel, Action, List, getPreferenceValues } from "@raycast/api";
import axios from "axios";
import { useEffect, useState } from "react";

interface Preferences {
    apiKey: string;
    url: string;
}

interface State {
    status: string;
    active: boolean;
}

export default function Command() {
    const preferences = getPreferenceValues<Preferences>();

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

    async function fetchStatus() {
        axios.get(preferences.url + 'api/user', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + preferences.apiKey,
            }
        })
            .then(function (response) {
                setState(statuses.map(item => {
                    if (item.status === response.data.status) {
                        return { ...item, active: true }
                    } else if (response.data.status === null) {
                        return { ...item, active: false }
                    }
                    return item
                }))
            });
    }

    useEffect(() => {
        fetchStatus();
    }, []);

    function setStatus(status: string) {
        if (status === 'Clear') {
            axios.delete(preferences.url + 'api/user/status', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + preferences.apiKey,
                }
            })
                .then(async function () {
                    await fetchStatus();
                });
        } else {
            axios.post(preferences.url + 'api/user/status', {
                status: status
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + preferences.apiKey,
                }
            })
                .then(async function () {
                    await fetchStatus();
                });
        }
    }

    return (
        <List>
            {statuses.map((item, index) => (
                <List.Item
                    key={index}
                    title={item.status}
                    subtitle={item.status === 'Clear' ? '' : item.active ? 'Yes' : 'No'}
                    actions={
                        <ActionPanel>
                            <Action title="Set" onAction={() => setStatus(item.status)} />
                        </ActionPanel>
                    }
                />
            ))}
        </List>
    );
}
