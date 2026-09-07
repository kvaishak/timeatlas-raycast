# Time Atlas tools

Open-source tools for reading and writing [Time Atlas](https://timeatlas.app) data from your computer.

Time Atlas syncs through iCloud:

| Platform | Path |
| --- | --- |
| macOS | `~/Library/Mobile Documents/iCloud~com~timeatlaslabs~Pat/Documents` |
| Windows | `%USERPROFILE%\iCloudDrive\iCloud~com~timeatlaslabs~Pat\Documents` |

That folder holds protobuf timeline files (see `timeatlas.proto` / `FORMAT.txt` in the iCloud directory) and JSON notes the app imports on sync.

Join the Discord: https://discord.gg/zwJEYNdsPE

## What’s in this repo

| Path | Purpose |
| --- | --- |
| `sync.py` | Build/update local SQLite DB (`timeatlas.db`) from iCloud files |
| `timeatlas.py` | Shared helpers (iCloud path, DB queries) |
| `timeatlas.proto` / `timeatlas_pb2.py` | Protobuf schema and generated Python |
| `tools/` | CLI scripts on top of the synced database (and note writing) |
| `data/activity_colors.json` | Activity → hex colors for GeoJSON export |
| `raycast-timeatlas-note/` | Self-contained Raycast extension to add notes |

The Python side was largely generated from [`CLAUDE.md`](CLAUDE.md). PRs for new tools are welcome.

## Python setup

```bash
python3 -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\Activate.ps1
pip install -r requirements.txt
python sync.py
```

`sync.py` creates `timeatlas.db` and imports any Time Atlas files not synced yet. Re-run it whenever you want fresh data (a cron job works well).

Windows (PowerShell) venv:

```powershell
py -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python sync.py
```

## CLI tools

Always run `sync.py` first (except for `addnote.py`, which writes straight to iCloud).

### `tools/date_query.py`

List events for a day or date range. Sleeps are summarised at the end of each day; movements show distance and non-zero steps.

```bash
python tools/date_query.py 2026-04-20
python tools/date_query.py 2026-04-01 2026-04-07
python tools/date_query.py 2026-04-20 --show-notes
python tools/date_query.py 2026-04-20 --no-summary
```

### `tools/knownplaces.py`

Look up known places by name, print address/location, and list place-visit events.

```bash
python tools/knownplaces.py "Starbucks"
python tools/knownplaces.py "Gym" --show-notes
```

### `tools/geojson.py`

Export place visits (points) and movement trajectories (lines) as GeoJSON for a date range. Optional `--activity` filter (short code or full name); when filtering by activity, places are omitted.

```bash
python tools/geojson.py 2026-04-20
python tools/geojson.py 2026-04-01 2026-04-07 -o april.geojson
python tools/geojson.py 2025-01-15 --activity ski
python tools/geojson.py 2025-01-10 2025-01-20 --activity cycling -o rides.geojson
```

### `tools/addnote.py`

Write a `note_<millis>.json` into the Time Atlas iCloud folder so the app picks it up.

```bash
python tools/addnote.py                          # stdin; two empty lines to finish
python tools/addnote.py -f note.txt
python tools/addnote.py -w                       # $EDITOR
python tools/addnote.py -d 2026-04-15 -f note.txt
python tools/addnote.py -d 2026-04-15 -f note.txt --source user:oss
```

### `tools/weather.py`

Temperature range and conditions per day, plus a conditions histogram. `-v` plots with matplotlib (`pip install matplotlib`); `-o` saves the plot instead of opening a window.

```bash
python tools/weather.py 2026-04-20
python tools/weather.py 2026-04-01 2026-04-07
python tools/weather.py 2026-04-01 2026-04-07 -v
python tools/weather.py 2026-04-01 2026-04-07 -v -o april-weather.png
```

## Raycast extension

[`raycast-timeatlas-note/`](raycast-timeatlas-note/) is a macOS Raycast extension with one command, **Add Note**. It does not use the Python tools or `.venv` — it writes the same note JSON format directly to the Time Atlas iCloud Documents folder (`"source": "user:raycast"`).

Requirements: Time Atlas installed and signed in to iCloud. Optional preference overrides the iCloud folder path.

```bash
cd raycast-timeatlas-note
npm install
npm run dev
```

Then open Raycast and run **Add Note**. See [`raycast-timeatlas-note/README.md`](raycast-timeatlas-note/README.md) for Store packaging notes (lint/build, screenshots in `metadata/`).
