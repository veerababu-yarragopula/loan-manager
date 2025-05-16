const stats = [
  { label: "Active Users", value: "200", icon: "👥" },
  { label: "Borrowers", value: "100", icon: "👤" },
  { label: "Cash Disbursed", value: "550,000", icon: "💰" },
  { label: "Cash Received", value: "1,000,000", icon: "💵" },
  { label: "Savings", value: "450,000", icon: "🏦" },
  { label: "Repaid Loans", value: "30", icon: "✔️" },
];

export default function Stats() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map(({ label, value, icon }) => (
        <div
          key={label}
          className="bg-green-800 text-white p-4 rounded-lg flex items-center space-x-3"
        >
          <span className="text-2xl">{icon}</span>
          <div>
            <h3 className="text-lg font-bold">{value}</h3>
            <p className="text-sm">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
