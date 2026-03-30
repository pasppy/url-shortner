import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

const LocationStats = ({ stats }) => {

    const cityCount = stats.reduce((acc, item) => {

        if (acc[item.city])
            acc[item.city][0] += 1;
        else
            acc[item.city] = [1, item.country];

        return acc;
    }, {})

    const cities = Object.entries(cityCount).map(([city, metrics]) => ({
        city, count: metrics[0], country: metrics[1]
    }))

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;

            return (
                <div className='p-2 bg-secondary border border-primary '>
                    <p><strong>City:</strong> {label}</p>
                    <p><strong>Country:</strong> {data.country}</p>
                    <p ><strong>Count:</strong> {data.count}</p>
                </div>
            );
        }
        return null;
    };

    return (

        <LineChart style={{ width: '100%', aspectRatio: 1.618, maxWidth: 800, margin: 'auto' }} responsive data={cities.slice(0, 5)}>
            <XAxis dataKey="city" />
            <YAxis />
            <Tooltip content={CustomTooltip} />
            <Legend />
            <Line
                type="monotone"
                dataKey="count"
                stroke="#88848d"
            />

        </LineChart>
    )
}

export default LocationStats