'use client'

import { FC } from 'react'
import { Cell, Pie, PieChart } from 'recharts'

interface ProgressCircleProps {
    percentage: number
}

export const ProgressCircle: FC<ProgressCircleProps> = ({ percentage }) => {
    const data = [
        { name: 'Completed', value: percentage },
        { name: 'Remaining', value: 100 - percentage },
    ]

    const startAngle = (percentage - 50) * 2 + 180

    const COLORS = ['#F5C144', '#D9D9D9']

    return (
        <PieChart width={124} height={124}>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={62}
                startAngle={-startAngle}
                endAngle={360 - percentage}
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
            </Pie>
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={20}
                fontWeight="medium"
            >
                {percentage}%
            </text>
        </PieChart>
    )
}
