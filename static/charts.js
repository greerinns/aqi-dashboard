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

// ------------------------- MAP FOR AQIs -----------------------------------------
// Using create map function made outside of the init function
  createMap(response)
// ------------------------- CHLOROPLETH MAP FOR AQIs -----------------------------------------
  createChloro(response)
}

// -------------------------MAP FUNCTION CREATION-----------------------------------------
function createMap(response) {      
  
  var mapScl = [[0,'rgb(5, 10, 172)'],[0.35,'rgb(40, 60, 190)'],[0.5,'rgb(70, 100, 245)'], [0.6,'rgb(90, 120, 245)'],[0.7,'rgb(106, 137, 247)'],[1,'rgb(220, 220, 220)']];

  var mapData = [{
          type:'scattergeo',
          locationmode: 'USA-states',
          lon: response.map(object => object.lng),
          lat: response.map(object => object.lat),
          hoverinfor:  response.map(object => object.AQI),
          text:  response.map(object => object.AQI),
          mode: 'markers',
          marker: {
              size: 7,
              opacity: 0.9,
              reversescale: true,
              autocolorscale: false,
              symbol: 'square',
              line: {
                  width: 1,
                  color: 'rgb(102,102,102)'
              },
              colorscale: mapScl,
              cmin: 0,
              color: response.map(object => object.AQI),
              colorbar: {
                  title: 'Detected AQIs During Month'
              }
          }
      }];


      var mapLayout = {
          title: 'AQI Levels in the US',
          colorbar: true,
          geo: {
              scope: 'usa',
              projection: {
                  type: 'albers usa'
              },
              showland: true,
              landcolor: 'rgb(250,250,250)',
              subunitcolor: 'rgb(217,217,217)',
              countrycolor: 'rgb(217,217,217)',
              countrywidth: 0.5,
              subunitwidth: 0.5
          }
      };

      Plotly.newPlot("map", mapData, mapLayout, {showLink: false});
      // source: https://plotly.com/javascript/scatter-plots-on-maps/
    }

// ------------------------- CHLOROPLETH FUNCTION -----------------------------------------
function createChloro(response) {
  console.log(response.map(object => object.AQI))
  console.log(response.map(object => object.state_id))
      var dataChloro = [{
          type: 'choropleth',
          locationmode: 'USA-states',
          locations: response.map(object => object.state_id),
          z: response.map(object => object.AQI),
          text: response.map(object => object.state_name),
          zmin: 0,
          zmax: 100,
          colorscale: [
              [0, 'rgb(242,240,247)'], [0.2, 'rgb(218,218,235)'],
              [0.4, 'rgb(188,189,220)'], [0.6, 'rgb(158,154,200)'],
              [0.8, 'rgb(117,107,177)'], [1, 'rgb(84,39,143)']
          ],
          colorbar: {
              title: 'AQI',
              thickness: 0.1
          },
          marker: {
              line:{
                  color: 'rgb(255,255,255)',
                  width: 2
              }
          }
      }];


      var layoutChloro = {
          title: 'Chosen Month AQI Levels by State',
          geo:{
              scope: 'usa',
              showlakes: true,
              lakecolor: 'rgb(255,255,255)'
          }
      };

      Plotly.newPlot("mapChloro", dataChloro, layoutChloro, {showLink: false});

// source https://plotly.com/javascript/choropleth-maps/
}

// ------------------------- DROP DOWN CHANGES -----------------------------------------
// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updateCharts);
// when the dropdown list changes then run this, this is a function to change the bar chart

// This function is called when a dropdown menu item is selected
function updateCharts() {
  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  // This will give us the number of the month selected
  let monthNumber = dropdownMenu.property("value");
  // Now we make a new API call
  let urlBase = "/api/v1.0/aqi/month/"
  // ---- NEW API CALL----
  d3.json(urlBase.concat(monthNumber)).then(function(monthData){
     // ---- UPDATING BAR CHART ----
    let newX = monthData.map(object => object.state_id);
    let newY = monthData.map(object => object.AQI);
    Plotly.restyle("bar", "x", [newX]);
    Plotly.restyle("bar", "y", [newY]);
    // ---- NEW MAP ----
    createMap(monthData)
    // ---- NEW CHLORO ----
    createChloro(monthData)
  });
}

let url = "/api/v1.0/aqi/month/"
d3.json(url.concat(1)).then(function(response){
  //console.log(response);
  init(response)
  // checking on data
  // run functions to create dash here
});