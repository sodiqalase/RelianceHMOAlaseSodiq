import React from 'react';
import NavBar from '../components/common/NavBar';
import Gallery from '../components/ProviderGallery'
import NewProviderForm from '../components/forms/NewProviderForm';
import ApiService from '../utils/apiService';
import LoadingScreen from '../components/common/LoadingScreen';

class ExplorePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: false
    };
  }

  componentDidMount() {
    this.setLoading(true);
    ApiService.get(ApiService.ENDPOINTS.providers)
      .then((data) => {
        console.log(data)
        this.setState({
          isLoading: false,
          data: data.data
        });
      });
  }

  setLoading = (isLoading) => {
    this.setState({
      isLoading
    });
  }

  filterProviders = async (event) => {

    // TASK 2:
    // On input, filter Available Providers based on Name, Address and Type
    //
    // ============== CODE GOES BELOW THIS LINE :) ==============
    let val = event.target.value;
    
    try {
      let req = await fetch(`https://rhmo-sample-api.herokuapp.com/providers`, {
        "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTk0MTgzMzUwLCJleHAiOjE1OTY3NzUzNTB9.SS17FWeuomLQxAqyIEiPk0hTjLcKjh91XpM6U2X7dkM"
      });
      let res = await req.json()
      
      let filtered =  await res.data.filter(each => {
        return each.name.toLowerCase().includes(val.toLowerCase()) || each.type.toLowerCase().includes(val.toLowerCase()) || each.location.address.toLowerCase().includes(val.toLowerCase())
      })
      this.setState({isLoading: false, data: filtered.length === 0? [] : filtered});
      console.log(filtered)
    } catch (error) {
      console.log(error)
      
    }
    
  }

  switchView = (e) => {
    // TASK 4:
    // onClick on a view preference, switch across the different view options (Gallery, List, Grid)
    // based on whatever the user selects.
    //
    // ============== CODE GOES BELOW THIS LINE :) ==============
    [...document.querySelectorAll('.fa')].forEach(each => {
      if (each.classList.contains('active')){
        each.classList.remove('active')
      }
      
    })
    e.target.classList.add('active')
    e.preventDefault()

  }

  render() {
    const { isLoading, data } = this.state;
    return (
      <div className="container">
        <NavBar />
        <div className="content__main">
          <section className="main__top-providers">
            <h2 className="text-header">Our Providers</h2>
            <div className="flex-row box-shadow" style={{padding:"1rem"}}>
              <div>
                <input
                  type="text"
                  className="input__style_1 input__search"
                  placeholder="&#xf002; Search with Provider Name, Address, or Type"
                  onChange={this.filterProviders}
                  onInput={this.filterProviders}
                />
              </div>
              <div className="layout-switcher">
                  <i className="fa fa-images active" onClick={this.switchView}></i>
                  <i className="fa fa-th-large" onClick={this.switchView}></i>
                  <i className="fa fa-th-list" onClick={this.switchView}></i>
                </div>
            </div>
            {(isLoading || !data) ? (
              <LoadingScreen />
            ) : (
              <React.Fragment>                
                <Gallery
                  items={data.map((item) => ({imageUrl: item.imageUrl, name: item.name, description: item.type}))}
                />
              </React.Fragment>
            )}
          </section>
          <section className="main__new-provider fixed">
              <div className="new-provider">
                <h2 className="text-header">Can't find a Provider?</h2>
                <p className="text-body">Feel free to recommend a new one.</p>
                <hr/>
                <NewProviderForm />
              </div>
          </section>
        </div>
      </div>
    );
  }
}

export default ExplorePage;
