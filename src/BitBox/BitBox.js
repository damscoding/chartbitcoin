import React    from "react";
import {Card} from 'react-bootstrap';
import BitCoinAverage from 'bitcoinaverage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCircle } from '@fortawesome/free-solid-svg-icons'

class BitBox extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      ask:0,
      percentage:0
    };
    this.loadData = this.loadData.bind(this);
    this.loadSocket = this.loadSocket.bind(this);
  }

  loadData(response)
  {
    this.setState({
      high:response.high,
      percentage: response.changes.percent.hour,
      ask: response.ask
    });
  }

  async loadSocket(){
    var publicKey = 'OWJhZjJlMWNiNmRjNDdlZjhlMWI1NTZhY2MyNzczNmQ';
    var secretKey = 'ZDM5YWJiMTQzMDk3NDM5NjgwMDBiNWQxNWI4MGIyOGExZmNjZTE1M2FkY2U0OTMzOGM5MGI1ZjIxZTBhZWQwNg';
    
    var restClient = BitCoinAverage.restfulClient(publicKey, secretKey);
    const loadData= this.loadData;
    restClient.getTickerDataPerSymbol('global', 'BTCUSD', function(response) {
        if(response!=null){
          loadData(JSON.parse(response));
        }
        console.log(response);
    }, function(error){
        console.log(error);
    });
  }

  componentDidMount(){
    this.loadSocket();
    setInterval(this.loadSocket, 10000);
  }
  render() {
    let textType='text-danger';
    let textSymbol="";
    if(this.state.percentage>0){
      textType = 'text-success';
      textSymbol = "+"
    }
    return <Card className="">
            <Card.Body>
              <Card.Title>BIT USD</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">BitCoin/ USD Dollar</Card.Subtitle>
              <Card.Text>
                <div className={textType}>
                    {this.state.ask} USD                  
                  <div>
                    <span>
                      (</span>{this.state.textSymbol} {this.state.percentage}%<span>)
                    </span>
                  
                  </div>
                  <div>
                    <p className="text-success"><FontAwesomeIcon icon={faCircle} />Market Open</p>
                  </div>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>;
  }
}

export default BitBox;
