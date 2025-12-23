'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface PriceChartProps {
  data: { time: string; price: number }[];
  isPositive: boolean;
}

export default function PriceChart({ data, isPositive }: PriceChartProps) {
  const color = isPositive ? "#10b981" : "#ef4444";

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          <XAxis dataKey="time" hide />
          <YAxis domain={['auto', 'auto']} hide />
          
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            itemStyle={{ color: '#1f2937', fontWeight: 'bold' }}
            labelStyle={{ fontSize:"14px",  color: '#1f2937', fontWeight: 'normal' }}
            formatter={(value: number | string | Array<number | string> | undefined) => {
              if (typeof value !== 'number') return [''];
              return [`$${value.toLocaleString()}`];
            }}
          />
          
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke={color} 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorPrice)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}