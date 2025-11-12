// Service to manage user's wrong/problem review list using localStorage
const STORAGE_KEY = 'wrongProblems';

function safeParse(raw) {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function readRaw() {
  const raw = localStorage.getItem(STORAGE_KEY) || '[]';
  return safeParse(raw);
}

function write(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return true;
  } catch (e) {
    console.error('failed to write wrongProblems', e);
    return false;
  }
}

/**
 * Get all wrong entries.
 * Each entry shape: { subject: 'os'|'ds'|'web', id: number, difficulty: string, ts?: number }
 */
export function getAll() {
  return readRaw();
}

export function setAll(list) {
  if (!Array.isArray(list)) throw new Error('setAll expects an array');
  return write(list);
}

export function clear() {
  return write([]);
}

export function getBySubject(subject) {
  return readRaw().filter((e) => e.subject === subject);
}

/**
 * Get wrong entries by subject and difficulty
 */
export function getBySubjectAndDifficulty(subject, difficulty) {
  return readRaw().filter((e) => 
    e.subject === subject && 
    e.difficulty === difficulty
  );
}

export function exists(subject, id) {
  return readRaw().some((e) => e.subject === subject && e.id === id);
}

/**
 * Add a wrong entry. Will not add duplicates (subject+id unique).
 * entry: { subject, id, difficulty, ts? }
 * Returns false if entry is invalid or duplicate
 */
export function add(entry) {
  if (!entry || !entry.subject || typeof entry.id === 'undefined' || !entry.difficulty) return false;
  const list = readRaw();
  const found = list.find((e) => e.subject === entry.subject && e.id === entry.id);
  if (found) return false;
  const newEntry = { ...entry, ts: entry.ts || Date.now() };
  list.push(newEntry);
  return write(list);
}

export function remove(subject, id) {
  const list = readRaw();
  const filtered = list.filter((e) => !(e.subject === subject && e.id === id));
  return write(filtered);
}

export default {
  getAll,
  setAll,
  clear,
  getBySubject,
  getBySubjectAndDifficulty,
  exists,
  add,
  remove,
};