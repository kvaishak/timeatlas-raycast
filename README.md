# Time Atlas for Raycast

Raycast extension and companion tools for [Time Atlas](https://timeatlas.app).

The main deliverable is **`raycast-timeatlas-note/`** — a macOS Raycast extension for Time Atlas: **Add Note** (writes JSON into the iCloud folder) and **Today at a Glance** (HUD summary via `date_query.py --summary-json`).

Discord: https://discord.gg/zwJEYNdsPE

## Raycast extension

| | |
| --- | --- |
| **Commands** | Add Note, Today at a Glance |
| **Platform** | macOS |
| **Folder** | [`raycast-timeatlas-note/`](raycast-timeatlas-note/) |

### Requirements

- [Time Atlas](https://timeatlas.app) installed and signed in to iCloud
- iCloud Drive enabled on Mac
- For **Today at a Glance**: this repo synced (`python sync.py`) plus preferences for the repo folder and Python path

Default write path (Add Note):

```text
~/Library/Mobile Documents/iCloud~com~timeatlaslabs~Pat/Documents
```

Optional preference **Time Atlas iCloud Folder** overrides that path.

### Develop locally

```bash
cd raycast-timeatlas-note
npm install
npm run dev
```

Open Raycast and run **Add Note** or **Today at a Glance**.

More detail: [`raycast-timeatlas-note/README.md`](raycast-timeatlas-note/README.md).

### Publish checklist

```bash
cd raycast-timeatlas-note
npm run lint
npm run build
```

Then capture Store screenshots into `raycast-timeatlas-note/metadata/` (Raycast **Capture Window** → Save to Metadata) and run `npm run publish`.

## Companion Python tools

The rest of this repo is optional CLI tooling for syncing and querying Time Atlas data locally (SQLite). Useful for scripting and exploration; **not required** to run the Raycast extension.

| Path | Purpose |
| --- | --- |
| `sync.py` | Import iCloud timeline files into `timeatlas.db` |
| `timeatlas.py` | Shared helpers (iCloud path, DB queries) |
| `tools/` | CLIs: date query, known places, GeoJSON, add note, weather |
| `data/activity_colors.json` | Colors for GeoJSON activity strokes |

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

Time Atlas iCloud locations:

| Platform | Path |
| --- | --- |
| macOS | `~/Library/Mobile Documents/iCloud~com~timeatlaslabs~Pat/Documents` |
| Windows | `%USERPROFILE%\iCloudDrive\iCloud~com~timeatlaslabs~Pat\Documents` |

See [`CLAUDE.md`](CLAUDE.md) for how the Python side was specified. PRs welcome.
