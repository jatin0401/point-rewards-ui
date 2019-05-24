import React, { Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      items : [],
      isLoaded : false,
    }
  }

  componentDidMount() {
    return fetch('http://localhost:8080/reward-info/all')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoaded : true, 
          items : responseJson,
        })
      .catch((error) => {
        console.log(error)
      })
    });
  }

  render () {
    var { isLoaded, items} = this.state; 

    if (!isLoaded) {
      return <div>data NOT loaded.</div>;
    } 
    else {
      return (
        <div className="App-list">
          <ul>
            {items.map(item => (
              <li key={item.id}>
                {item.customer.firstName} {item.customer.lastName} Total Points:  {item.totalPoints}
                <ul>
                      {item.monthCustomerRewards.map(monthly => (
                        <li key={monthly.id}>
                           {monthly.monthName} Total Points: {monthly.totalMonthPoints}
                            <ul>
                                {monthly.purchases.map(purchase => (
                                  <li key={purchase.id}>
                                    Desc: {purchase.purchaseDesc} | date: {purchase.purchaseDate} | 
                                    Amount: {purchase.purchaseAmount} | Points: {purchase.points}
                                  </li>
                                ))}
                            </ul>
                        </li>
                      ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}


export default App;
