import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

function GradasyonGrafik({ data }) {
  if (!data || (Array.isArray(data) && data.length === 0)) return null;

  // Data array mi yoksa obje mi kontrol et
  let grafikData;
  if (Array.isArray(data)) {
    grafikData = data
      .map(([elek, gecen]) => ({ elek, gecen }))
      .sort((a, b) => b.elek - a.elek);
  } else {
    // Data direkt olarak obje array formatında geliyorsa
    grafikData = data.sort((a, b) => b.elek - a.elek);
  }

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
