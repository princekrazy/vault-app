const KEY = "vault_transactions";

export function getTransactions() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function saveTransactions(txns) {
  localStorage.setItem(KEY, JSON.stringify(txns));
}

export function addTransaction(txn) {
  const txns = getTransactions();
  txns.push({
    id: crypto.randomUUID(),
    ...txn,
  });
  saveTransactions(txns);
}
