import React, { useState,useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios'
import './Analytics.css'

// const Bargraph = () => {

//     const [dates,setDates]=useState([])

//     const [series,setSeries] = useState([
//         {
//           name: 'Complete',
//           type: 'column',
//           data: [0, 0, 0, 0, 0, 0, 0, 0],
//         },
//         {
//           name: 'Incomplete',
//           type: 'column',
//           data: [0, 0, 0, 0, 0, 0, 0, 0],
//         },
//         // {
//         //   name: 'Started',
//         //   type: 'line',
//         //   data: [20, 29, 37, 36, 44, 45, 50, 58],
//         // },
//       ]);
    
//       const [options,setOptions] = useState({
//         chart: {
//           height: 350,
//           type: 'line',
//           stacked: false,
//           toolbar:false,
//         },
//         dataLabels: {
//           enabled: false,
//         },
//         stroke: {
//           width: [1, 1, 4],
//         },
        
//         xaxis: {
//           categories: dates.length?dates:[],
//           labels: {
//             style: {
//               colors: '#FFFFFF', // Specify the colors for each date
//             },
//           },
//         },
        

//         yaxis: [
//           {
//             axisTicks: {
//               show: true,
//             },
//             axisBorder: {
//               show: true,
//               color: '#008FFB',
//             },
//             labels: {
//               style: {
//                 colors: '#008FFB',
//               },
//             },
//             title: {
//               text: 'Completed Task Count',
//               style: {
//                 color: '#008FFB',
//               },
//             },
//             tooltip: {
//               enabled: true,

//             },
//           },
//           {
//             seriesName: 'Completed',
//             opposite: true,
//             axisTicks: {
//               show: true,
//             },
//             axisBorder: {
//               show: true,
//               color: '#FF0000',
//             },
//             labels: {
//               style: {
//                 colors: '#FF0000',
//               },
//             },
//             title: {
//               text: 'Incomplete Task Count',
//               style: {
//                 color: '#FF0000',
//               },
//             },
//           },
         
//         ],
//         tooltip: {
//           fixed: {
//             enabled: true,
//             position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
//             offsetY: 30,
//             offsetX: 60,
//           },
//           style: {
//             colors: 'black !important', // Set the desired text color for the tooltip
//           },
//         },
//         legend: {
//           horizontalAlign: 'left',
//           offsetX: 40,
//         },
//       });

//       useEffect(() => {
//         setOptions(
//           {
//             chart: {
//               height: 350,
//               type: 'line',
//               stacked: false,
//             },
//             dataLabels: {
//               enabled: false,
//             },
//             stroke: {
//               width: [1, 1, 4],
//             },
            
//             xaxis: {
//               categories: dates.length?dates:[],
//               labels: {
//                 style: {
//                   colors: localStorage.mode==='0'?'#FFFFFF':'#000000', // Specify the colors for each date
//                 },
//               },
//             },
            
    
//             yaxis: [
//               {
//                 axisTicks: {
//                   show: true,
//                 },
//                 axisBorder: {
//                   show: true,
//                   color: '#008FFB',
//                 },
//                 labels: {
//                   style: {
//                     colors: '#008FFB',
//                   },
//                 },
//                 title: {
//                   text: 'Completed Task Count',
//                   style: {
//                     color: '#008FFB',
//                   },
//                 },
//                 tooltip: {
//                   enabled: true,
    
//                 },
//               },
//               {
//                 seriesName: 'Income',
//                 opposite: true,
//                 axisTicks: {
//                   show: true,
//                 },
//                 axisBorder: {
//                   show: true,
//                   color: '#00E396',
//                 },
//                 labels: {
//                   style: {
//                     colors: '#00E396',
//                   },
//                 },
//                 title: {
//                   text: 'Incomplete Task Count',
//                   style: {
//                     color: '#00E396',
//                   },
//                 },
//               },
             
//             ],
//             tooltip: {
//               fixed: {
//                 enabled: true,
//                 position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
//                 offsetY: 30,
//                 offsetX: 60,
//               },
//             },
//             legend: {
//               horizontalAlign: 'left',
//               offsetX: 40,
//               labels:{
//                 colors: localStorage.mode == "0" ? 'white' : 'black'
//               }
//             },
//           }
//         )
//       }, [dates]);


//       if((localStorage.startdate && localStorage.enddate))
//       {
//         console.log(1)
        
//         axios.post('http://ec2-3-82-248-76.compute-1.amazonaws.com:5000/api/analytics/bargraph/'+localStorage.startdate+'/'+localStorage.enddate)
//         .then((res)=>{
//           console.log(res.data)
//             setSeries(res.data.series)
//             setDates(res.data.dates)
            
//         }).catch((error) => {
//           console.log(error);
//           window.location.reload(false)
//         });
//       }
    
    
//       return (
//         <div id="chart">
//           <ReactApexChart options={options} series={series} type="line" height={350} />
//         </div>
//       );
//     };
    

// exportdefaultBargraph;

import { ResponsiveBar } from '@nivo/bar';
import { useContext} from 'react';
import { ModeContext } from '../../components/MiniDrawer/MiniDrawer'

 

const Bargraph = ({width,handleWidth}) => {

const [data,setData] =useState([
    {
        "id": "",
        "Completed": 0,
        "Incomplete": 0
    }
]);

if(localStorage.startdate&& localStorage.enddate && localStorage.startdate<=localStorage.enddate)
{
    axios.post('http://3.110.123.213:5000/api/analytics/bargraph/'+localStorage.startdate+'/'+localStorage.enddate)
    .then((res)=>{
        setData(res.data)
    }).catch((error) => {
                  console.log(error);
                  window.location.reload(false)
                });
}

const keys = Object.keys(data[0]);
const keys1=keys.slice(1)



const colors=['#e8c1a0','#f47560']

const {mode} = useContext(ModeContext);

const customTheme = {
  axis: {
    ticks: {
      text: {
        fill: mode ? 'black' : 'white', // Change the color of tick values on both x and y axes
      },
    },
    legend: {
      text: {
        fill: mode ? 'black' : 'white', // Change the color of axis legends
      },
    },
  },
};


  return (
    <>
     <ResponsiveBar
        data={data}
        keys={keys1}
        // Adjust the number of ticks displayed on the x axis for smaller screens
        indexBy="id"
        // width={width > desiredWidth ? width : desiredWidth}

        
        theme={customTheme}
        margin={{ top: 30, right: 90, bottom:135, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        tooltip={({ id, value }) => (
            <div style={{color:mode?'white' : 'black',backgroundColor:mode ? '#27293d' : 'white',padding:'3px'}}>
              {id} - Value: <strong> {value} </strong>
            </div>
          )}
        colors={colors}
        groupMode='grouped'
        enableGridX={false}
        enableGridY={false}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -90,
            legend: '',
            legendPosition: 'middle',
            legendOffset: 62,
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Count',
            legendPosition: 'middle',
            legendOffset: -40,
            
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={mode ? '#00000000' : '#ffffff00'}
        legends={[
            {
              dataFrom: 'dates',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 5,
              itemTextColor: mode ? 'black' : 'white',
              itemWidth: 100,
              itemHeight: 10,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 10,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
       
    />
    </>
  )
}

export default Bargraph;