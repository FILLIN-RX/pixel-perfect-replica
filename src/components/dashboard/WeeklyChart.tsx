import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { day: "Lun", CM: 8, TD: 6, TP: 4 },
  { day: "Mar", CM: 6, TD: 8, TP: 5 },
  { day: "Mer", CM: 7, TD: 5, TP: 6 },
  { day: "Jeu", CM: 9, TD: 7, TP: 3 },
  { day: "Ven", CM: 5, TD: 6, TP: 8 },
  { day: "Sam", CM: 3, TD: 2, TP: 0 },
];

export function WeeklyChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="rounded-xl bg-card p-6 card-elevated"
    >
      <h2 className="mb-6 text-lg font-semibold text-card-foreground">
        Répartition hebdomadaire des séances
      </h2>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="20%">
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="hsl(var(--border))"
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "var(--shadow-lg)",
              }}
              labelStyle={{ color: "hsl(var(--card-foreground))" }}
            />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              formatter={(value) => (
                <span style={{ color: "hsl(var(--card-foreground))" }}>
                  {value}
                </span>
              )}
            />
            <Bar
              dataKey="CM"
              name="Cours Magistraux"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="TD"
              name="Travaux Dirigés"
              fill="hsl(var(--accent))"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="TP"
              name="Travaux Pratiques"
              fill="hsl(var(--success))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
