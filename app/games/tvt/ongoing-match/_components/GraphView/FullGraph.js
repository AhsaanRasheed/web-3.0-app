import LineChart from '../../../components/LineChart';
import { lineChartData, lineValues } from './chartData';
export default function FullGraph() {
    return (
        <>
            <div style={{ height: '297px', width: '85dvw' }}>
                <LineChart
                    chartData={lineChartData}
                    minimum={Math.floor(lineChartData[0] / 500) * 500}
                />
            </div>
        </>
    );
}
