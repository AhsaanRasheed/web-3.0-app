import LineChart from '../../../components/LineChart';
import RoundChart from '../../../components/RoundChart';
export default function RoundGraph({ chartData, chartData2 }) {

    return (
        <>
            <div style={{ height: '297px', width: '91dvw' }}>
                <RoundChart
                    chartData={chartData2}
                />
            </div>
        </>
    );
}
