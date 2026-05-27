import { db } from "./db";

export async function addTransaction(transaction) {
  return await db.transactions.add({
    id: crypto.randomUUID(),
    ...transaction,
    createdAt: new Date().toISOString(),
  });
}

export async function getTransactions() {
  return await db.transactions.orderBy("createdAt").reverse().toArray();
}

export async function deleteTransaction(id) {
  return await db.transactions.delete(id);
}
export async function getUniqueNames() {
  const txns = await db.transactions.toArray();

  const names = txns.map((t) => t.name.trim().toLowerCase());

  return [...new Set(names)];
}
export async function updateTransaction(id, updatedData) {
  return await db.transactions.update(id, updatedData);
}
