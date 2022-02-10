import React from 'react'
import { Pie} from 'react-chartjs-2'

const data = {
    labels: ['예약', '판매중', '판매완료'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
            ],
            borderWidth: 1,
        },
    ],
};

const options = {
    responsive: false,
    maintainAspectRatio: false,
    legend: {
        position: 'bottom',
    },
    // plugins: {
    //     legend: {
    //         display: false,
    //         position: 'right',
    //     },
    //     title: {
    //         display: true,
    //         text: 'Chart.js Pie Chart'
    //     }
    // }
}

const UserChart = () => {
    return (
        <Pie data={data} options={options} width={350} height={200} />
    )
}

export default UserChart;