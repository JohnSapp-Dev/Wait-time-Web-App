import Chart from 'chart.js/auto'
import { Line } from "react-chartjs-2"
import "../css/WaitTimeGraph.css"
import {useState} from "react";

function WaitTimeGraphComp({waitTimeData})  {


    const YaxisMax = Math.max(...waitTimeData.RideInformation.WaitTimeData.map(i => i.waitTime));
    const YaxisCeiling = YaxisMax + 20;
    let lastEntry = waitTimeData.RideInformation.WaitTimeData.length - 1;
    let latestDate = waitTimeData.RideInformation.WaitTimeData[lastEntry].updated;
    let endingDate = new Date(latestDate);
    let startingDate = new Date(endingDate);
    startingDate.setDate(endingDate.getDate() - 1);

    let formatedEndDate = endingDate.toISOString().split("T")[0];
    let formatedStartDate = startingDate.toISOString().split("T")[0];


    console.log(`wait time graph comp -- date: ${latestDate}`);
    console.log(`formated end date: ${formatedEndDate}`);
    console.log(`formated start date: ${formatedStartDate}`);
    console.log(`y max: ${YaxisCeiling}`);

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

    return (
        <>
        <div className="Graph" style={{ height: '300px', width: '100%' }}>

            {!waitTimeData?.RideInformation?.WaitTimeData ? (
                <div style={{ height: '300px' }}>Loading chart data...</div>
            ):(
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
                                suggestedMax: Math.max(...filteredData.map(i => i.waitTime)) + 20,
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