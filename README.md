# Time Atlas for Raycast

Raycast extension and optional companion Python tools for [Time Atlas](https://timeatlas.app).

## Raycast extension (`raycast-timeatlas-note/`)

Zero-config macOS extension:

| Command | What it does |
| --- | --- |
| **Add Note** | Writes `note_*.json` into the Time Atlas iCloud folder |
| **Today at a Glance** | List + detail of today’s sleep, places, distance, and notes |

Requires Time Atlas + iCloud Drive. No Python, repo path, or local DB.

```bash
cd raycast-timeatlas-note
npm install
npm run dev
```

Setup/error screens cover missing iCloud Drive, missing Time Atlas folder, empty day, and load failures.

Full details: [`raycast-timeatlas-note/README.md`](raycast-timeatlas-note/README.md).

### Publish checklist

```bash
cd raycast-timeatlas-note
npm run lint
npm run build
```

Then capture Store screenshots into `metadata/` and run `npm run publish`.

Discord: https://discord.gg/zwJEYNdsPE

## Companion Python tools (optional)

Not required for the Raycast extension. Local SQLite sync/query helpers for scripting.

| Path | Purpose |
| --- | --- |
| `sync.py` | Import iCloud timeline files into `timeatlas.db` |
| `timeatlas.py` | Shared helpers |
| `tools/` | date query, known places, GeoJSON, add note, weather |

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python sync.py
```

Examples:

```bash
python tools/date_query.py 2026-04-20 --show-notes
python tools/date_query.py 2026-04-20 --summary-json
python tools/knownplaces.py "Gym"
python tools/geojson.py 2026-04-01 2026-04-07 -o week.geojson
python tools/addnote.py -d 2026-04-15 -f note.txt
python tools/weather.py 2026-04-01 2026-04-07
```

`--summary-json` is a compact SQLite-backed summary for scripts; the Raycast glance command reads iCloud directly in TypeScript instead.

| Platform | Time Atlas iCloud path |
| --- | --- |
| macOS | `~/Library/Mobile Documents/iCloud~com~timeatlaslabs~Pat/Documents` |
| Windows | `%USERPROFILE%\iCloudDrive\iCloud~com~timeatlaslabs~Pat\Documents` |

See [`CLAUDE.md`](CLAUDE.md) for the Python tooling spec. PRs welcome.
