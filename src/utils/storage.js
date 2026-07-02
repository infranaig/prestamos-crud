import { STORAGE_KEY } from "../constants";

export function loadLoans() {
  const savedLoans = localStorage.getItem(STORAGE_KEY);

  if (!savedLoans) {
    return [];
  }

  try {
    return JSON.parse(savedLoans);
  } catch {
    return [];
  }
}

export function saveLoans(loans) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(loans));
}
