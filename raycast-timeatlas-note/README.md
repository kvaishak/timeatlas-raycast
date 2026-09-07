# Time Atlas Note

Add notes to [Time Atlas](https://timeatlas.app) from Raycast. Notes are written as JSON files into the Time Atlas iCloud Documents folder so the app picks them up on its next sync.

## Requirements

- macOS with iCloud Drive enabled
- [Time Atlas](https://timeatlas.app) installed and signed in (so its iCloud folder exists)

## How it works

Run **Add Note**, pick a date, and write your note. The extension saves a file named `note_<timestamp>.json` to:

```text
~/Library/Mobile Documents/iCloud~com~timeatlaslabs~Pat/Documents
```

Each file looks like:

```json
{
  "text": "Your note",
  "source": "user:raycast",
  "timestamp": "2026-09-07T15:00:00.000Z",
  "date": "2026-09-07"
}
```

## Preferences

| Preference | Description |
| --- | --- |
| **Time Atlas iCloud Folder** | Optional. Override the default iCloud Documents path if your Time Atlas data lives somewhere else. |

## Development

```bash
npm install
npm run dev
```

Before publishing, run `npm run lint` and `npm run build`, then capture Store screenshots into `metadata/` with Raycast’s **Capture Window** command (Save to Metadata).
