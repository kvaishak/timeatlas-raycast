import {
  Action,
  ActionPanel,
  Form,
  getPreferenceValues,
  popToRoot,
  showToast,
  Toast,
} from "@raycast/api";
import { promises as fs } from "fs";
import os from "os";
import path from "path";

interface Preferences {
  icloudPath?: string;
}

interface FormValues {
  text: string;
  date: Date | null;
}

const DEFAULT_ICLOUD_DIR = path.join(
  os.homedir(),
  "Library",
  "Mobile Documents",
  "iCloud~com~timeatlaslabs~Pat",
  "Documents",
);

function toLocalDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function resolveIcloudDir(override?: string): string {
  const trimmed = override?.trim();
  return trimmed ? trimmed : DEFAULT_ICLOUD_DIR;
}

async function writeNote(
  icloudDir: string,
  dateStr: string,
  text: string,
): Promise<string> {
  try {
    const stat = await fs.stat(icloudDir);
    if (!stat.isDirectory()) {
      throw new Error(`Not a directory: ${icloudDir}`);
    }
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      (error as NodeJS.ErrnoException).code === "ENOENT"
    ) {
      throw new Error(
        `Time Atlas iCloud folder not found. Is Time Atlas installed and signed in to iCloud?\n${icloudDir}`,
      );
    }
    throw error;
  }

  const now = new Date();
  const record = {
    text,
    source: "user:raycast",
    timestamp: now.toISOString(),
    date: dateStr,
  };

  const filename = `note_${now.getTime()}.json`;
  const output = path.join(icloudDir, filename);
  await fs.writeFile(output, `${JSON.stringify(record, null, 2)}\n`, "utf-8");
  return output;
}

export default function AddNoteCommand() {
  const { icloudPath } = getPreferenceValues<Preferences>();

  async function handleSubmit(values: FormValues) {
    const text = values.text.trim();
    if (!text) {
      await showToast({ style: Toast.Style.Failure, title: "Note is empty" });
      return;
    }

    const dateStr = toLocalDateString(values.date ?? new Date());
    const icloudDir = resolveIcloudDir(icloudPath);

    const toast = await showToast({
      style: Toast.Style.Animated,
      title: "Saving note...",
    });
    try {
      await writeNote(icloudDir, dateStr, text);
      toast.style = Toast.Style.Success;
      toast.title = "Note added";
      toast.message = dateStr;
      await popToRoot();
    } catch (error) {
      toast.style = Toast.Style.Failure;
      toast.title = "Failed to add note";
      toast.message = error instanceof Error ? error.message : String(error);
    }
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Add Note" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.DatePicker
        id="date"
        title="Date"
        type={Form.DatePicker.Type.Date}
        defaultValue={new Date()}
      />
      <Form.TextArea
        id="text"
        title="Note"
        placeholder="What happened?"
        enableMarkdown={false}
        autoFocus
      />
    </Form>
  );
}
