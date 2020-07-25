import React    from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


am4core.useTheme(am4themes_animated);


class BitCoinChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btsData: [],
      token:''
    };
    this.loadData = this.loadData.bind(this);
  }
  loadAmchart(){
    let data = [];
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.paddingRight = 20;
    chart.responsive.enabled = true;

    for (var key in this.state.btsData) {
      data.push({ date:key, name: "name" , value: this.state.btsData[key] })
    }
    chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";
    series.propertyFields.fill = "lineColor";
    series.fillOpacity = 0.2;
    series.tooltipText = "{valueY.value}";

    chart.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;
    this.chart = chart;
  }

  async loadData(){
    const apiUrl = "https://api.coindesk.com/v1/bpi/historical/close.json?start="+this.props.startDate+"&end="+this.props.endDate;
    await fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          if(result!=null && result.bpi!=null){
            this.setState({
              btsData: result.bpi
            });
          }
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      ).then((responseJson) => {
        this.loadAmchart();
      })
  }

  componentDidMount() {
    this.loadData();
    setInterval(this.loadData, 30000);
  }
  
  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
  render() {
    return (
      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
    );
  }
}
export default BitCoinChart;
