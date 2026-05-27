import { useState } from "react";
import { addTransaction, getUniqueNames } from "../utils/transactions";

export default function Withdraw() {
  const [suggestions, setSuggestions] = useState([]);
  const [form, setForm] = useState({
    name: "",
    amount: "",
    note: "",
    date: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    await addTransaction({
      ...form,
      amount: Number(form.amount),
      type: "withdraw",
    });

    alert("Withdrawal saved");

    setForm({
      name: "",
      amount: "",
      note: "",
      date: "",
    });
  }
  async function handleNameChange(value) {
    setForm({ ...form, name: value });

    if (!value) {
      setSuggestions([]);
      return;
    }

    const names = await getUniqueNames();

    const filtered = names.filter((n) =>
      n.toLowerCase().includes(value.toLowerCase()),
    );

    setSuggestions(filtered.slice(0, 5)); // limit suggestions
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Withdraw</h2>

      <div style={{ position: "relative" }}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => handleNameChange(e.target.value)}
        />

        {suggestions.length > 0 && (
          <div
            style={{
              position: "absolute",
              background: "white",
              border: "1px solid #ccc",
              width: "100%",
              zIndex: 10,
            }}
          >
            {suggestions.map((name, i) => (
              <div
                key={i}
                onClick={() => {
                  setForm({ ...form, name });
                  setSuggestions([]);
                }}
                style={{ padding: 8, cursor: "pointer" }}
              >
                {name}
              </div>
            ))}
          </div>
        )}
      </div>

      <input
        placeholder="Amount"
        type="number"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />

      <input
        placeholder="Note"
        value={form.note}
        onChange={(e) => setForm({ ...form, note: e.target.value })}
      />

      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />

      <button type="submit">Save Withdrawal</button>
    </form>
  );
}
