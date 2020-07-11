import React from 'react';

class NewProviderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      state: '',
      rating: null,
      type: '',
      file: null
    };
  }
  // TASK 5: Add New Provider
  // Add Functionality to the form below
  // On submission it should make a POST request to 
  // the server to create a new provider.
  // Refer to the API documentation for details.
  handleChange = e => {
    console.log(e.target.value || e.target.files[0])
    if (e.target.name === 'file'){
      this.setState({...this.state, file: e.target.files[0]})
    }
    this.setState({...this.state, [e.target.name]: e.target.value})
    e.preventDefault();
  }

  handleSubmit = async e => {
    
    const dataToSend = {...this.state}
    try {
      if (dataToSend.file !== null){
        let req = await fetch(`https://rhmo-sample-api.herokuapp.com/providers`, { method: 'POST',body: dataToSend,
      "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk0MTgzMzUwLCJleHAiOjE1OTY3NzUzNTB9.SS17FWeuomLQxAqyIEiPk0hTjLcKjh91XpM6U2X7dkM"
    });
      let res = await req.json();
      console.log(res)
      }
      
    } catch (error) {
      console.log(error)
    }
    
    e.preventDefault()

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Provider Name:</label>
          <input onChange={this.handleChange} className="input__style_1" type="text" name="name" />
        </div>
        <div className="form-group">
          <label  htmlFor="address">Provider Address:</label>
          <input onChange={this.handleChange} className="input__style_1" type="text" name="address" />
        </div>
        <div className="form-group">
          <label htmlFor="address">Provider State:</label>
          <input onChange={this.handleChange} className="input__style_1" type="text" name="state" />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Provider Rating:</label>
          <select onChange={this.handleChange} className="select input__style_1" type="number" name="rating">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="type">Provider type:</label>
          <select onChange={this.handleChange} className="select input__style_1" type="text" name="type">
            <option value="hospital">Hospital</option>
            <option value="pharmacy">Pharmacy</option>
            <option value="clinic">Clinic</option>
          </select>
        </div>        
        <div className="form-group">
          <label htmlFor="image">Provider Image</label>
          <img className="img-responsive" src="https://via.placeholder.com/1500x840" alt="new provider"/>
          <input onChange={this.handleChange} type="file" name="file" />
        </div>
        <div className="form-group button-row">
          <button
            type="submit"
            className="btn btn-primary no-margin"
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default NewProviderForm;
