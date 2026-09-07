# Time Atlas

Raycast extension for [Time Atlas](https://timeatlas.app): add notes and see today’s timeline at a glance — **zero config** (no Python, no git checkout, no local database).

## Requirements

- macOS with **iCloud Drive** enabled
- [Time Atlas](https://timeatlas.app) installed and signed in (so its iCloud Documents folder exists)

If iCloud Drive or the Time Atlas folder is missing, both commands show a clear setup screen with actions to open iCloud Settings / Time Atlas and to recheck.

## Commands

### Add Note

Pick a date, write a note, submit. Saves `note_<timestamp>.json` to:

```text
~/Library/Mobile Documents/iCloud~com~timeatlaslabs~Pat/Documents
```

```json
{
  "text": "Your note",
  "source": "user:raycast",
  "timestamp": "2026-09-07T15:00:00.000Z",
  "date": "2026-09-07"
}
```

### Today at a Glance

List + detail view (Overview, Sleep, Places, Distance, Notes).

Each open reads the Time Atlas iCloud folder **fresh** (no disk cache):

- Timeline `.pb` / `.zip` update files (protobuf)
- Pending `note_*.json` files from **Add Note** (shown immediately, even before Time Atlas imports them)

Shortcuts:

- **⌘C** — copy one-line summary  
- **⌘⇧C** — copy notes  
- **⌘R** — refresh  

## Preferences

| Preference | Description |
| --- | --- |
| **Time Atlas iCloud Folder** | Optional. Override the default iCloud Documents path. |

## Development

```bash
npm install
npm run dev
```

Smoke-test the glance pipeline without Raycast:

```bash
npx tsx scripts/test-glance.ts
npx tsx scripts/test-glance.ts 2026-08-01
```

Before publishing: `npm run lint`, `npm run build`, then capture Store screenshots into `metadata/`.
