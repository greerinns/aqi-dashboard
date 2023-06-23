// Add js logic here
function init(response) {
// ------------------------- BAR CHART FOR STATE AQIs -----------------------------------------
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

// ------------------------- DROP DOWN CHANGES -----------------------------------------
// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updateBar);
// when the dropdown list changes then run this, this is a function to change the bar chart

// This function is called when a dropdown menu item is selected
function updateBar() {
  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  // This will give us the number of the month selected
  let monthNumber = dropdownMenu.property("value");
  // Now we make a new API call
  let urlBase = "/api/v1.0/aqi/month/"
  d3.json(urlBase.concat(monthNumber)).then(function(monthData){
    let newX = monthData.map(object => object.state_id);
    let newY = monthData.map(object => object.AQI);
    // checking on data
    Plotly.restyle("bar", "x", [newX]);
    Plotly.restyle("bar", "y", [newY]);
  });
}

let url = "/api/v1.0/aqi/month/"
d3.json(url.concat(1)).then(function(response){
  //console.log(response);
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