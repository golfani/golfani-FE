import {Bar} from "react-chartjs-2";
import {getCalendar} from "../../../../utils/calendar";

const {startDay,totalOfDay} = getCalendar(2022,1);
const labels = Array(totalOfDay).fill(undefined).map((index,value) => value+1);

const data = {
    labels: labels,
    datasets: [
        {
            label: '2022년 1월',
            data: labels.map(() => Math.random()*101),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgb(255, 99, 132)',
        },
        {
            label: '2021년 12월',
            data: labels.map(() => Math.random()*101),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgb(53,162,235)',
        },
    ],
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'right',
        },
        title: {
            display: true,
            text: 'Chart.js Pie Chart'
        }
    }
}


const SaleChart = () => {
    return(
        <Bar data={data} height={400} options={options} />
    )
}

export default SaleChart;