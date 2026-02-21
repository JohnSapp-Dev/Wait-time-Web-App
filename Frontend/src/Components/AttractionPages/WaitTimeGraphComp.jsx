import { Line } from "react-chartjs-2"
import { Chart as ChartJS, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import "../../css/WaitTimeGraph.css"
import {useState} from "react";

ChartJS.register(...registerables, zoomPlugin);

function WaitTimeGraphComp({waitTimeData})  {

    let lastEntry = waitTimeData.RideInformation.WaitTimeData.length - 1;
    let latestDate = waitTimeData.RideInformation.WaitTimeData[lastEntry].updated;
    let endingDate = new Date(latestDate);
    let startingDate = new Date(endingDate);
    startingDate.setDate(endingDate.getDate() - 1);

    let formatedEndDate = endingDate.toISOString().split("T")[0];
    let formatedStartDate = startingDate.toISOString().split("T")[0];

    // console.log(`wait time graph comp -- date: ${latestDate}`);
    // console.log(`formated end date: ${formatedEndDate}`);
    // console.log(`formated start date: ${formatedStartDate}`);

    const [startDate,setStartDate] = useState(formatedStartDate);
    const [endDate,setEndDate] = useState(formatedEndDate);

    const handleStartDate = (e) => {
        setStartDate(e.target.value);
        console.log(`start date: ${e.target.value}`);
    }
    const handleEndDate = (e) => {
        setEndDate(e.target.value);
        console.log(`end date: ${e.target.value}`);
    }

    const filteredData = waitTimeData.RideInformation.WaitTimeData.filter((data) => {
        if (!startDate || !endDate) return true;

        // const dataDate = new Date(data.updated).toISOString().split("T")[0];
        const dataDate = new Date(data.updated).toLocaleDateString('en-CA',{
            timeZone:'America/New_York'
        });

       console.log(dataDate);

        return dataDate >= startDate && dataDate <= endDate;
    });

    const pointColor = filteredData.map(data => data.isOpen === true ? 'rgba(66,253,115,0.5)' : 'rgba(243, 0, 5, 0.5)');

    const capitalize = (string) => `${string.charAt(0).toUpperCase() + string.slice(1)}`;

    return (
        <>
        <div className="Graph" >

            {!waitTimeData?.RideInformation?.WaitTimeData ? (
                <div style={{ height: '300px' }}>Loading chart data...</div>
            ):(<>

                <div className="chart-legend">
                    <div className="legend-item">
                        <span className="dot openDot"></span> Open
                    </div>
                    <div className="legend-item">
                        <span className="dot closedDot"></span> Closed
                    </div>
                </div>

                <Line
                    data={{

                        labels: filteredData.map((item) =>
                            new Date(item.updated).toLocaleTimeString(['en-US'], {
                                timeZone:'America/New_York', hour: '2-digit', minute: '2-digit' })
                        ),
                        datasets: [
                            {
                                label: "Wait Time (min)",
                                // data: waitTimeData.RideInformation.WaitTimeData.map((data) => data.waitTime),
                                data: filteredData.map((data) => data.waitTime),
                                pointBackgroundColor: pointColor,
                                pointBorderColor: pointColor,
                                borderColor: 'rgb(101,101,101)',
                                tension: 0.1
                            },
                        ],
                    }}
                    options={{
                        maintainAspectRatio: false,
                        layout:{
                            padding: {
                                bottom: 20,
                            },
                        },
                        scales: {
                            y: {
                                border: {
                                    color: 'rgb(101, 101, 101)',
                                },
                                grid: {
                                    color: 'rgba(101, 101, 101,0.5)',
                                },
                                beginAtZero: true, // Ensures the chart doesn't "float"
                                suggestedMax: Math.max(...filteredData.map(i => i.waitTime)) + 20,
                                ticks: {
                                    stepSize: 5,
                                }
                            },
                            x: {
                                border: {
                                    color: 'rgb(101, 101, 101)',
                                },
                                grid: {
                                    color: 'rgba(101, 101, 101, 0.25)',
                                }
                            }
                        },
                        plugins: {
                            title:{
                                display: true,
                                text: `${capitalize(waitTimeData.RideInformation.name)}`,
                                font: {
                                    size: 18,
                                    family: 'Verdana', // You can match your Card font
                                    weight: 'bold'
                                },
                            },
                            zoom:{
                                pan: {
                                    enabled: true,
                                    mode: 'x', // Allow panning left and right
                                },
                                zoom: {
                                    wheel: {
                                        enabled: true, // Use mouse wheel to zoom
                                    },
                                    pinch: {
                                        enabled: true, // Allow touch-screen zooming
                                    },
                                    mode: 'x', // Usually better to only zoom the time axis
                                },
                            }
                        }

                    }}
                />
                </>
            )}
        </div>

        <div className="filterDate">
            <div>Start</div>
            <input onChange={handleStartDate} type="date" id="startDate" value={startDate}/>
            <div>End</div>
            <input onChange={handleEndDate} type="date" id="endDate" value={endDate}/>
        </div>
        </>
    )
}

export default WaitTimeGraphComp;