import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function InvestmentChart({ data }) {
    return (
        <ResponsiveContainer width="100%" height="100%" minHeight={400}>
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 30,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area name="Deposit" type="monotone" dataKey="deposit" stackId="1" stroke="#8884d8" fill="#8884d8" />
          <Area name="Profit" type="monotone" dataKey="profit" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
          <Area name="Tax (19%)" type="monotone" dataKey="tax" stackId="1" stroke="#FFCCCB" fill="#FFCCCB" />
          <Area name="Fee" type="monotone" dataKey="fee" stackId="1" stroke="#ffc658" fill="#ffc658" />
        </AreaChart>
      </ResponsiveContainer>
    )
}