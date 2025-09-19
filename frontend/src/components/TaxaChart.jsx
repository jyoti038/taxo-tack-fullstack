import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function TaxaChart({ data }) {
  return (
    <div className="bg-white p-4 shadow rounded-lg w-full h-80">
      <h2 className="text-xl font-semibold mb-2">Top Taxa Counts</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="taxonomy" hide />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
