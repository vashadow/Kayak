import React from 'react';
import { Chart } from 'react-google-charts';
import * as API from '../api/API'


class BarChart extends React.Component {

    constructor(){
        super();

        this.state = {
            chartType:"BarChart",
            options : {
                title: "Click Throughput : Number of clicks per page",
                hAxis: {title: 'Number of Clicks', minValue: 0, maxValue: 15},
                vAxis: {title: 'Pages', minValue: 0, maxValue: 15},
                bar: {
                    groupWidth: "50%"
                },
                legend: {
                    position: "none"
                }
            },
            //width: "40%",
            height: "500px",
            data : [
                [Element, "Clicks", {
                    role: "style"
                }],
                ["Home", 8,"red"],
                ["Search", 10,"red"],
                ["Bookings", 10,"red"],
                ["Profile", 19,"red"],
                ["History", 50, "red"]
            ],
            chartEvents:[{
                eventName: "onmouseover"
            }]
        }

    }

    renderChart(){
        var payload={name:"ClickThroughput",type:"BarChart",index:1,query:"barChartQuery"};
        this.handleRenderChart(payload);
    }


    createChartResponse(data){

        var resData = [[Element, "Clicks", {
            role: "style"
        }]];

        var i, item;
        for (i=0; i< data.length; i++) {

                var temp =[];
                temp.push(data[i].PageName);
                temp.push(data[i].NoClicks);
                temp.push("red");

           console.log("TempData : ",temp);
            resData.push(temp);
        }
        console.log("ResData : ",resData);
        return resData;
    }

    handleRenderChart = (payload) => {
        API.getChart(payload)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);
                    var resData = this.createChartResponse(response.data);
                    this.setState({
                        data : resData
                    });

                } else if (response.status === 400) {
                    console.log("Error fetching the date for chart...!!!");
                }
            });
    };

    componentDidMount() {
        this.renderChart();
    }


    render() {
        return (
            <Chart chartType = {this.state.chartType} data = {this.state.data} options = {this.state.options} width={this.state.width} height={this.state.height} />

        );
    }
}


export default  BarChart;
