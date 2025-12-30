import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

function GradasyonGrafik({ data }) {
  if (!data || data.length === 0) return null;

  const grafikData = data
    .map(([elek, gecen]) => ({ elek, gecen }))
    .sort((a, b) => b.elek - a.elek);

  return (
    <LineChart width={600} height={300} data={grafikData}>
      <XAxis dataKey="elek" />
      <YAxis domain={[0, 100]} />
      <Tooltip />
      <Line type="monotone" dataKey="gecen" stroke="#1F3C5B" />
    </LineChart>
  );
}

export default GradasyonGrafik;
