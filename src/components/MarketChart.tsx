import React from 'react';

interface MarketChartProps {
    data: number[];
}

const MarketChart: React.FC<MarketChartProps> = ({ data }) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;
    const padding = 20;
    const width = 800;
    const height = 400;

    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
        const y = height - padding - ((val - min) / range) * (height - padding * 2);
        return `${x},${y}`;
    }).join(' ');

    return (
        <div style={{ width: '100%', height: '100%', padding: '20px' }}>
            <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%' }}>
                <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--accent-secondary)" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="var(--accent-secondary)" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Area fill */}
                <path
                    d={`M ${padding},${height - padding} ${points} L ${width - padding},${height - padding} Z`}
                    fill="url(#lineGradient)"
                    style={{ transition: 'all 0.5s ease' }}
                />

                {/* The line */}
                <polyline
                    fill="none"
                    stroke="var(--accent-secondary)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                    style={{ transition: 'all 0.5s ease' }}
                />

                {/* Animation pulse at the end */}
                {data.length > 0 && (
                    <circle
                        cx={(width - padding)}
                        cy={height - padding - ((data[data.length - 1] - min) / range) * (height - padding * 2)}
                        r="6"
                        fill="var(--accent-secondary)"
                        className="pulse-animation"
                    />
                )}
            </svg>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }
        .pulse-animation {
          transform-origin: center;
          animation: pulse 2s infinite;
        }
      `}} />
        </div>
    );
};

export default MarketChart;
