import Chart from 'chart.js/auto'
import { Line } from "react-chartjs-2"
import "../css/WaitTimeGraph.css"

function WaitTimeGraphComp({waitTimeData})  {

    const YaxisMax = Math.max(...waitTimeData.RideInformation.WaitTimeData.map(i => i.waitTime));
    const YaxisCeiling = YaxisMax + 20;

    return (
        <div className="Graph">

            {!waitTimeData?.RideInformation?.WaitTimeData ? (
                <div style={{ height: '300px' }}>Loading chart data...</div>
            ):(
                <Line
                    data={{
                        labels: waitTimeData.RideInformation.WaitTimeData.map((item) =>
                            new Date(item.updated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        ),
                        datasets: [
                            {
                                label: "Wait Time (min)",
                                data: waitTimeData.RideInformation.WaitTimeData.map((data) => data.waitTime),
                                borderColor: 'rgb(75, 192, 192)',
                                tension: 0.1
                            },
                        ],
                    }}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true, // Ensures the chart doesn't "float"
                                suggestedMax: YaxisCeiling,
                                ticks: {
                                    stepSize: 5,
                                }
                            },
                        },
                        plugins: {
                            title:{
                                display: true,
                                text: `${waitTimeData.RideInformation.name}`,
                                font: {
                                    size: 18,
                                    family: 'Verdana', // You can match your Card font
                                    weight: 'bold'
                                },
                            }
                        }

                    }}
                />
            )}
        </div>
    );
}

export default WaitTimeGraphComp;