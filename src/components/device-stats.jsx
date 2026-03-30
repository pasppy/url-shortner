import { Pie, PieChart, Sector, } from 'recharts';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const DeviceStats = ({ stats }) => {

    console.log(stats.map(s => s.device));

    const deviceCount = stats.reduce((acc, item) => {

        if (acc[item.device])
            acc[item.device] += 1;
        else
            acc[item.device] = 1;

        return acc;
    }, {})

    const devices = Object.entries(deviceCount).map(([device, count]) => ({
        device, count
    }))

    const MyCustomPie = (props) => {
        return <Sector {...props} fill={COLORS[props.index % COLORS.length]} />;
    };


    return (

        <PieChart className='w-full max-w-125 max-h-[20vh] sm:max-h-[40vh] m-auto aspect-square' responsive>
            <Pie
                data={devices.slice(0, 5)}
                labelLine={false}
                label={({ device, percent }) => (`${device}:${(percent * 100).toFixed(0)}%`)}
                fill="#8884d8"
                dataKey="count"
                isAnimationActive={true}
                shape={MyCustomPie}
            />
        </PieChart>

    )
}

export default DeviceStats