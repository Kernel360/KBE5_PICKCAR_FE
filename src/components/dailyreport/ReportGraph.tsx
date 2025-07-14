import React from 'react'
import { Doughnut, Line } from 'react-chartjs-2'
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
} from 'chart.js'
import { DestinationCountStat } from '@/types/dailyReport'

Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
)

interface ReportGraphProps {
  destinationStats?: DestinationCountStat[]
}

const ReportGraph: React.FC<ReportGraphProps> = ({ destinationStats = [] }) => {
  const doughnutData = {
    labels: destinationStats.map(stat => stat.destination),
    datasets: [
      {
        label: '방문 횟수',
        data: destinationStats.map(stat => stat.visitCount),
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)',
          'rgb(255, 159, 64)',
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)'
        ],
        hoverOffset: 4
      }
    ]
  }

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  }

  return (
    <div className="my-5 flex min-h-0 min-w-0 flex-1 flex-col gap-4 lg:flex-row lg:gap-14">
      <div className="bg-base-100 flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-2xl p-4">
        <div className="stat-title text-sm font-bold">목적지별 방문 현황</div>
        <div className="flex min-h-0 flex-1 items-center justify-center">
          <div className="h-full max-h-full w-full max-w-full">
            <Doughnut
              data={doughnutData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: true,
                    position: 'right',
                    labels: {
                      padding: 15,
                      usePointStyle: true
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="bg-base-100 flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-2xl p-4">
        <div className="stat-title text-sm font-bold">월별 통계</div>
        <div className="flex min-h-0 flex-1 items-center justify-center">
          <div className="h-full max-h-full w-full max-w-full">
            <Line
              data={lineData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: true,
                    position: 'top',
                    labels: {
                      padding: 15,
                      usePointStyle: true
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportGraph
