import React    from "react";
import BitCoinChart from '../BitCoinChart/BitCoinChart';
import {Container,Row,Col, Button} from 'react-bootstrap';
import BitBox from '../BitBox/BitBox';
import Moment from 'moment';



class HomePage extends React.Component {
  constructor(props)
  {
    super(props);
    this.state =
    {
      todayDate : new Date().toISOString().slice(0,10),
      startDate:  '',
      endDate : ''
    }
    this.setDateInterval = this.setDateInterval.bind(this);
    this.getDay = this.getDay.bind(this);
  }

  getDate(date){
    if(date!= null && date._i != null)
    {
      let formatedDate = date._i.toString();    
      return formatedDate;
    }
  }
  componentWillMount(){
    this.setDateInterval(5,"day");
  }

  setDateInterval(n,type,isYTD=false){
    let start=null;
    if(type==="day")
      start=this.getDay(n);     
    else if(type==="month")
      start=this.getMonth(n);
    else if(type === "year")
    {
      if(isYTD)
      start = this.getYear(n,true)
      else
      start = this.getYear(n);
    }
    else    
      start = new Date('2010-07-17');     
    var startMoment = Moment(start.toISOString().slice(0,10)); 
    var startDate =this.getDate(startMoment);
    let endDate =this.getDate(Moment(this.state.todayDate));
    this.setState({
      startDate: startDate,
      endDate : endDate
    });  
  }

  getYear(n,isYTD=false){
    var startDate=isYTD?Moment().set('months',0).set('days',1):Moment().subtract(n, 'years');
    return startDate;

  }
  getDay(day){   
    var startDate=  Moment().subtract(day, 'days');
    return startDate;
  }

  getMonth(n){
    var startDate=  Moment().subtract(n, 'months');
    return startDate;
  }
 
  render() {
    return <Container>
      <Row><div className="h1">BitShare in USD</div></Row>
          <Row>
            <Col  md={10}><BitCoinChart startDate={this.state.startDate} endDate={this.state.endDate}></BitCoinChart></Col>
            <Col>
              <BitBox></BitBox>
            </Col>
           
          </Row>
          <Row>
              <Col>
                <Button onClick={() => this.setDateInterval(5,"day")}>5D</Button>
              </Col>
              <Col>
                <Button onClick={() => this.setDateInterval(1,"month")}>1M</Button>
              </Col>
              <Col>
                <Button onClick={() => this.setDateInterval(3,"month")}>3M</Button>
              </Col>
              <Col>
                <Button onClick={() => this.setDateInterval(6,"month")}>6M</Button>
              </Col>
              <Col>
                <Button onClick={ () =>this.setDateInterval(1,"year",true)}>YTD</Button>
              </Col>
              <Col>
                <Button onClick={ () =>this.setDateInterval(1,"year")}>1Y</Button>
              </Col>
              <Col>
                <Button  onClick={ () =>this.setDateInterval(5,"year")}>5Y</Button>
              </Col>
              <Col>
                <Button  onClick={() =>this.setDateInterval(1,"all")}>All</Button>
              </Col>
            </Row>
         
          </Container>;
   
  }
}

export default HomePage;
