import React from 'react';
import './App.css';
import Form from './components/form';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      DataisLoaded: false
    };
  }

  componentDidMount() {
    fetch(
      "https://gateway.api.testing.zen.co.uk/training-api/ProductAvailability/")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          items: json,
          DataIsLoaded: true
        });
      })
  }

  render() {
    const { DataIsLoaded, items} = this.state;
    if(!DataIsLoaded) return <div>
      <h1>Please wait for data to load...</h1> </div>;

    return (
      <div className = "App">
        <h1>Product Availability</h1> {
          items.map((item) => (
            <ol key ={item.id} >
              Code: { item.code },
              Name: { item.name },
              Available: { item.available}
            </ol>
          ))
        }
        <Form products= {items} />
        </div>
    );
  }
}

export default App;
