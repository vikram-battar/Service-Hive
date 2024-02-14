
import CanvasJSReact from './canvasjs.react'




var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function BarChart({chartData, titleX}) {

   

    let dataP1 = [];  
    let dateFormatOptions = { month: 'short', year: 'numeric' };
   chartData?.map((element,index)=>{ 
      let datapoint = {
        y: element.total_order_price,
        label: element.name     
      }
      dataP1.push(datapoint);
      return ""
    })
    console.log("qwer", dataP1)
  
    const options = {
      backgroundColor: "transparent",
      animationEnabled: true,
      
      theme: "light1", // "light1", "dark1", "dark2"
      // title: {
      //   text: props.name,
      // },
        
      axisY: {
        title: `${"Total Order Price"} $`,
        includeZero: true,
        suffix: "",
        // maximum: 1000,
        minimum:0,
        lineThickness: 2,
        // interval: 250,
        // valueFormatString : "#####"
      },
     
      toolTip: {
        shared: true  //disable here. 

      },
      data: [
        {
          type: "column", 
          name: "Total Order",
          showInLegend: true,
          markerType : "circle",
          xValueFormatString:'MMM-YYYY',
          yValueFormatString : "####0.## $",
          legendText: "Total Order",
        //   markerColor : '#0066ff',
          markerSize : 1,
        //   lineColor:"#0066ff",
          fillOpacity: .8,
          dataPoints: dataP1
       }
      ],
    };
  

    return (
      <>
     
     
      <CanvasJSChart
     containerProps={{ width: '100%', height: '80%'}}
       options={options}
       /* onRef={ref => this.chart = ref} */
     /> 
         
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </>
    );
  };
  

