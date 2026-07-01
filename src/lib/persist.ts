/**
 * Simple JSON-file persistence layer for admin data.
 * Keeps changes alive across server restarts until a real database is connected.
 * Files live in <project-root>/data/ which is git-ignored.
 */

import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function readJSON<T>(filename: string, fallback: T): T {
  try {
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) return fallback;
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJSON(filename: string, data: unknown): void {
  try {
    ensureDir();
    const filePath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(`[persist] Failed to write ${filename}:`, err);
  }
}
