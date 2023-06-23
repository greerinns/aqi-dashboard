// Add js logic here
function init(response) {
// BAR CHART FOR STATE AQIs -----------------------------------------
// later on would be good to sort / color code / make the value the average instead of total
  // Sorting data by AQI severity
  // Trace for the state and AQI data
  let traceJanState = {
    x: response.map(object => object.state_id),
    y: response.map(object => object.AQI),
    type: "bar"
  };

  // Data trace array
  let dataJanState = [traceJanState];

  // Apply the group barmode to the layout
  let layoutJanState = {
    title: "State AQI Results"
  };

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("bar", dataJanState, layoutJanState);
}

let url = "http://127.0.0.1:5000/api/v1.0/aqi/month/"
d3.json(url.concat(1)).then(function(response){
  console.log(response);
  init(response)
  // checking on data
  // run functions to create dash here
});

// Setting chosen month value to a string
// let month = String(chosenMonth)
//   d3.json(url.concat(chosenMonth)).then(function(response){
//     console.log(response);
//     // checking on data
//     // run functions to create dash here
// });