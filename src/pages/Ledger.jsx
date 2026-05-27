import { useEffect, useState } from "react";
import {
  getTransactions,
  deleteTransaction,
  updateTransaction,
} from "../utils/transactions";
import { exportToExcel, exportToPDF } from "../utils/export";

export default function Ledger() {
  const [editingTx, setEditingTx] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    note: "",
    minAmount: "",
    maxAmount: "",
    startDate: "",
    endDate: "",
  });
  const [txns, setTxns] = useState([]);
  const filteredTxns = txns.filter((tx) => {
    const nameMatch = tx.name
      .toLowerCase()
      .includes(filters.name.toLowerCase());

    const noteMatch = tx.note
      .toLowerCase()
      .includes(filters.note.toLowerCase());

    const amount = Number(tx.amount);

    const minOk =
      filters.minAmount === "" || amount >= Number(filters.minAmount);

    const maxOk =
      filters.maxAmount === "" || amount <= Number(filters.maxAmount);

    const date = new Date(tx.date);

    const startOk =
      filters.startDate === "" || date >= new Date(filters.startDate);

    const endOk = filters.endDate === "" || date <= new Date(filters.endDate);

    return nameMatch && noteMatch && minOk && maxOk && startOk && endOk;
  });
  function clearFilters() {
    setFilters({
      name: "",
      note: "",
      minAmount: "",
      maxAmount: "",
      startDate: "",
      endDate: "",
    });
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  async function loadTransactions() {
    const data = await getTransactions();
    setTxns(data);
  }

  const deposits = filteredTxns
    .filter((t) => t.type === "deposit")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const withdrawals = filteredTxns
    .filter((t) => t.type === "withdraw")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = deposits - withdrawals;

  return (
    <div>
      <h2>Ledger</h2>
      <div style={{ marginBottom: 20, display: "flex", gap: 10 }}>
        <button onClick={() => exportToExcel(filteredTxns)}>
          Export Excel
        </button>

        <button onClick={() => exportToPDF(filteredTxns)}>Export PDF</button>
      </div>

      <div style={{ marginBottom: 20 }}>
        <p>Balance: {balance}</p>
        <p>Total Deposits: {deposits}</p>
        <p>Total Withdrawals: {withdrawals}</p>
      </div>
      <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
        <input
          placeholder="Search Name"
          value={filters.name}
          onChange={(e) => setFilters({ ...filters, name: e.target.value })}
        />

        <input
          placeholder="Search Note"
          value={filters.note}
          onChange={(e) => setFilters({ ...filters, note: e.target.value })}
        />

        <div style={{ display: "flex", gap: 10 }}>
          <input
            type="number"
            placeholder="Min Amount"
            value={filters.minAmount}
            onChange={(e) =>
              setFilters({ ...filters, minAmount: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Max Amount"
            value={filters.maxAmount}
            onChange={(e) =>
              setFilters({ ...filters, maxAmount: e.target.value })
            }
          />
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) =>
              setFilters({ ...filters, startDate: e.target.value })
            }
          />

          <input
            type="date"
            value={filters.endDate}
            onChange={(e) =>
              setFilters({ ...filters, endDate: e.target.value })
            }
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <button
            onClick={clearFilters}
            style={{
              padding: "8px 12px",
              cursor: "pointer",
            }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Note</th>
            <th>Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredTxns.map((tx) => (
            <tr key={tx.id}>
              <td>{tx.name}</td>
              <td>{tx.amount}</td>
              <td>{tx.type}</td>
              <td>{tx.note}</td>
              <td>{tx.date}</td>
              <td>
                <button
                  onClick={async () => {
                    await deleteTransaction(tx.id);
                    loadTransactions();
                  }}
                >
                  Delete
                </button>
              </td>
              <td>
                <button onClick={() => setEditingTx(tx)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingTx && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ background: "white", padding: 20, width: 300 }}>
            <h3>Edit Transaction</h3>

            <input
              value={editingTx.name}
              onChange={(e) =>
                setEditingTx({ ...editingTx, name: e.target.value })
              }
            />

            <input
              type="number"
              value={editingTx.amount}
              onChange={(e) =>
                setEditingTx({ ...editingTx, amount: e.target.value })
              }
            />

            <input
              value={editingTx.note}
              onChange={(e) =>
                setEditingTx({ ...editingTx, note: e.target.value })
              }
            />

            <input
              type="date"
              value={editingTx.date}
              onChange={(e) =>
                setEditingTx({ ...editingTx, date: e.target.value })
              }
            />

            <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
              <button
                onClick={async () => {
                  await updateTransaction(editingTx.id, {
                    ...editingTx,
                    amount: Number(editingTx.amount),
                  });

                  setEditingTx(null);
                  loadTransactions();
                }}
              >
                Save
              </button>

              <button onClick={() => setEditingTx(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
