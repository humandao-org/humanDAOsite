import React from "react";
import { sbEditable } from "@storyblok/storyblok-editable";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  aspectRatio: 3.25,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
};

/*
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
*/

class Token extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
    this.state = { 
      tokenStats : { 
        labels: ['2022-03-23', '2022-03-24', '2022-03-25', '2022-03-26', '2022-03-27', '2022-03-28', '2022-03-29'],      
        datasets: [{
          label: '$HDAO - 5 days',
          data: [0.23, 0.25, 0.16, 0.18, 0.22, 0.30, 0.28],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }]
      },
      tokenHolders : { 
        labels: ['Nov 2021', 'Dec 2021', 'Jan 2022', 'Feb 2022', 'March 2022', 'April 2022'],      
        datasets: [{
          label: 'Number of holders - 6 months',
          data: [543, 764, 987, 1284, 1397, 1412],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }]
      },
      stakingPercentage : { 
        labels: ['Nov 2021', 'Dec 2021', 'Jan 2022', 'Feb 2022', 'March 2022', 'April 2022'],      
        datasets: [{
          label: 'Staked percentage - 6 months',
          data: [0, 0, 22, 28, 29, 32],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }]
      }
    }
  }

  componentDidMount() {
    console.log(this.props.blok.header)
  }

  render() {
    return (
      <div {...sbEditable(this.props.blok)}>
        {/* HDAO TOKEN */}
        <section className="Token bg-purple-200 rounded md:mx-24 lg:mx-32 m-8 mt-0 p-4">
          <h1 className="font-bungee font-bold text-3xl text-center md:text-left">
            {this.props.blok.header}
          </h1>
          {/* Token Info */}
          <span className="mt-2 ml-4 flex items-end font-bold font-play text-6xl lg:text-7xl w-full">
            <img src={this.props.blok.token_image.filename}></img>
            {Number(this.props.blok.token_price).toLocaleString()} <span className="text-xl">USD</span>
          </span>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-rows-2 lg:grid-flow-col gap-2 md:gap-3 lg:gap-2 flex-wrap  p-2 pb-0">
            <div className="row-span-3">
              <div className="flex flex-wrap rounded-xl lg:p-2">
                <div className="Card-1 bg-white rounded-md w-full lg:max-h-96 text-center justify-center lg:inline-flex" style={{overflow: 'auto'}}>
                  <div className="chart-container lg:w-full" style={{ position: 'relative', minHeight: '300px' }}>
                    <Line options={options} data={this.state.tokenStats} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="flex  rounded-xl lg:p-2">
                <div className="Card-2 bg-white rounded-md p-2 w-full md:inline-flex">
                  <div className="md:ml-2 flex-col inline-flex">
                    <p className="font-play uppercase text-lg sm:text-xl md:text-2xl lg:text-3xl">
                      Circulating Supply
                    </p>
                    <p className="font-press-start font-bold text-lg sm:text-xl lg:text-3xl -tracking-24">
                      {Number(this.props.blok.circulating_supply).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="flex  rounded-xl lg:p-2">
                <div className="Card-1 bg-white rounded-md p-2 w-full md:inline-flex">
                  <div className="md:ml-2 flex-col inline-flex">
                    <p className="font-play uppercase text-lg sm:text-xl md:text-2xl lg:text-3xl">
                      Circulating Market Cap
                    </p>
                    <p className="font-press-start font-bold text-lg sm:text-xl lg:text-3xl -tracking-24">
                    ${Number(this.props.blok.market_cap).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-1">
              <div className="flex  rounded-xl lg:p-2">
                <div className="Card-1 bg-white rounded-md p-2 w-full md:inline-flex">
                  <div className="md:ml-2 flex-col inline-flex">
                    <p className="font-play uppercase text-lg sm:text-xl md:text-2xl lg:text-3xl">
                      Fully Diluted MC
                    </p>
                    <p className="font-press-start font-bold text-lg sm:text-xl lg:text-3xl -tracking-24">
                      ${Number(this.props.blok.fully_diluted_value).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Holders and Staking */}
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2 md:gap-5 lg:gap-2 p-2">
            <div className="flex  rounded-xl lg:p-2">
              <div className="Card-1 bg-white rounded-md p-2 w-full flex-wrap md:inline-flex" style={{overflow: 'auto'}}>
                <div className="md:ml-2 flex-col inline-flex w-full">
                  <p className="font-play uppercase text-lg sm:text-lg lg:text-3xl">
                    Token holders
                  </p>
                  <p className="font-press-start font-bold text-lg sm:text-xl lg:text-3xl -tracking-24">
                    {Number(this.props.blok.token_holders).toLocaleString()}
                  </p>
                  <div className="chart-container w-full" style={{ position: 'relative', minHeight: '240px' }}>
                    <Line options={options} data={this.state.tokenHolders} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap rounded-xl lg:p-2">
              <div className="Card-1 bg-white rounded-md p-2 w-full md:inline-flex" style={{overflow: 'auto', maxHeight: '500px' }}>
                <div className="md:ml-2 flex-col inline-flex w-full">
                  <p className="font-play uppercase text-lg sm:text-xl lg:text-3xl">
                    Percent staking
                  </p>
                  <p className="font-press-start font-bold text-lg sm:text-xl lg:text-3xl -tracking-24">
                    {this.props.blok.percent_staked}%
                  </p>
                  <div className="chart-container w-full" style={{ position: 'relative', minHeight: '240px' }}>
                    <Line options={options} data={this.state.stakingPercentage} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Token;