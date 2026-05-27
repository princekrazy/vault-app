import Dexie from "dexie";

export const db = new Dexie("VaultDB");

db.version(1).stores({
  transactions: "id, type, name, amount, date, createdAt",
});
