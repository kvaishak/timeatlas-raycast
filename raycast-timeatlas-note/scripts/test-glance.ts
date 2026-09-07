/**
 * CLI smoke test for glance-only iCloud summary (no Raycast runtime).
 * Usage: npx tsx scripts/test-glance.ts [YYYY-MM-DD]
 */
import os from "os";
import path from "path";
import { fileURLToPath } from "url";
import { summarizeTodayFromIcloud } from "../src/lib/glance";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const icloudDir = path.join(
  os.homedir(),
  "Library",
  "Mobile Documents",
  "iCloud~com~timeatlaslabs~Pat",
  "Documents",
);

const dateStr =
  process.argv[2] ??
  (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  })();

const protoPath = path.join(__dirname, "..", "assets", "proto", "glance.proto");

async function main() {
  console.log("iCloud:", icloudDir);
  console.log("date:", dateStr);
  const t0 = Date.now();
  const summary = await summarizeTodayFromIcloud(icloudDir, dateStr, {
    protoPath,
  });
  console.log("ms:", Date.now() - t0);
  console.log(JSON.stringify(summary, null, 2));

  const parts: string[] = [];
  if (summary.sleep) parts.push(`${summary.sleep} sleep`);
  if (summary.first_place && summary.last_place) {
    parts.push(
      summary.first_place === summary.last_place
        ? summary.first_place
        : `${summary.first_place} → ${summary.last_place}`,
    );
  } else if (summary.first_place || summary.last_place) {
    parts.push((summary.first_place || summary.last_place) as string);
  }
  if (summary.distance) parts.push(summary.distance);
  if (summary.notes.length) {
    parts.push(
      summary.notes.length === 1 ? "1 note" : `${summary.notes.length} notes`,
    );
  }
  console.log(
    "line:",
    parts.length ? parts.join(" · ") : "No Time Atlas data for today",
  );
  if (summary.notes.length) {
    console.log("--- notes ---");
    for (const n of summary.notes) console.log(n);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
