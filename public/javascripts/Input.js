var PlaceCard = React.createClass({
  render: function() {
    return (
      <div>
        <h2>{this.props.placeName}</h2>
      </div>
    );
  }
});

var PlaceList = React.createClass({
  render: function() {
    var placeNodes = this.props.data.map(function(place) {
      return (
        <PlaceCard placeName={place.name}>
        </PlaceCard>
      );
    });

    return (
      <div className="placeList">
        <h1>Results</h1>
        {placeNodes}
      </div>
    );
  }
});

var InputForm = React.createClass({
  render: function() {
    return (
      <form className="searchForm" onSubmit={this.handleSubmit}>
        <input className="searchTerms" type="text" placeholder="I'm looking for..." ref="terms"/>
        <input className="searchCity" type="text" placeholder="city or location..." ref="location"/>
        <button className="yelpRequest" type="submit">Make Request</button>
      </form>
    );
  }, 
  handleSubmit: function(e) {
    e.preventDefault();
    var terms = this.refs.terms.getDOMNode().value.trim(),
        location = this.refs.location.getDOMNode().value.trim(),
        url = '/api/yelp?term=' + terms + '&location=' + location.split(' ').join('%20');

    if (!terms || !location) {
      return;
    }

    $.ajax({
      url: url,
      type: 'GET',
      success: function(data) {
        React.render(
          <PlaceList data={data.businesses} />,
          document.getElementById('places')
        );
      },
      error: function(xhr, status, err) {
        console.error(status, err.toString());
      }
    });
  }
});


React.render(
  <InputForm />,
  document.getElementById('searchForm')
);