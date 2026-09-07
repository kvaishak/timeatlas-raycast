# Time Atlas Changelog

## [Unreleased]

- **Today at a Glance** — List + detail for sleep, places, distance, and day notes
- Reads Time Atlas iCloud timeline (`.pb`/`.zip`) and pending `note_*.json` on every open (no disk cache)
- Shared setup checks for missing iCloud Drive / Time Atlas folder with recovery actions
- Add Note shows the same setup guidance when the iCloud folder is unavailable
- Extension retitled **Time Atlas** (was Time Atlas Note)

## [Initial Release] - {PR_MERGE_DATE}

- Add Note command with date picker and text form
- Writes notes directly to the Time Atlas iCloud Documents folder
- Optional preference to override the iCloud folder path
