// Add js logic here
function init(response) {
// ------------------------- BAR CHART FOR STATE AQIs -------------------------
// Trace for the state and AQI data
//   let traceJanState = {
//     x: response.map(object => object.state_id),
//     y: response.map(object => object.AQI),
//     type: "bar"
//   };

//   // Data trace array
//   let dataJanState = [traceJanState];

//   // Apply the group barmode to the layout
//   let layoutJanState = {
//     title: "State AQI Results"
//   };

//   // Render the plot to the div tag with id "plot"
//   Plotly.newPlot("bar", dataJanState, layoutJanState);

// ------------------------- BAR CHART FOR STATE AQIs -------------------------
  createBar(response);
// ------------------------- MAP FOR AQIs -------------------------
// Using create map function made outside of the init function
  createMap(response);
// ------------------------- CHOROPLETH MAP FOR AQIs -------------------------
  createChloro(response);
// ------------------------- BUBBLE CHART FOR AQIs -------------------------
  createBubble(response);
// ------------------------- PIE CHART FOR AQIs -------------------------
  createPie(response);
};

// ########################################### 
// BAR FUNCTION CREATION 
// ###########################################
// Trace for the state and AQI data
function createBar(response) {

  let states = response.map(object => object.state_id)
    .filter((value, index, self) => self.indexOf(value) === index);
  // console.log(states);
  let aqi = "AQI";

  function mean(response, states, aqi) {
    let count = 0;
    let total = 0;
    for (let i = 0; i < response.length; i++) {
      row = response[i];

      if (row.state_id == states){
        total += row[aqi];
        count += 1;
      }
    }
    let meanAQI = total / count;

    return meanAQI;
  }
  // let state = states.map(object => object);
  // console.log(state);
  // let meanAQIData = mean(response, "CA", aqi);
  // console.log(meanAQIData);

  function xValue (){
    for (let i = 0; i < states.length; i++) {
    let meanAQIData = mean(response, states[i], aqi);
    console.log(meanAQIData);
  };
}
  // console.log(meanAQIData);

  // for (let i = 0; i < states.length; i++) {
  //   let meanAQIFunc = mean(response, states[i], aqi);
  //   console.log(meanAQIFunc);

  //   let traceJanState = {
  //     x: meanAQIFunc,
  //     y: states[i],
  //     type: "bar",
  //     orientation: "h"
  //   };

  //   // Data trace array
  // let dataJanState = [traceJanState];

  // // Apply the group barmode to the layout
  // let layoutJanState = {
  //   title: "State AQI Results"
  // };

  // // Render the plot to the div tag with id "plot"
  // Plotly.newPlot("bar", dataJanState, layoutJanState);
  // };

  // const groupByStateID = response.map(object => object).groupByToMap(object => object.state_id);
  // console.log(groupByStateID);
  // console.log(response); --- this is all the data for January (by month)
  // let good = response.map(object => object.Category).filter(catGood);

  let aqiData = response.map(object => object)
  let meanAQI = xValue();
  console.log(meanAQI);
  // let sortedByAQI = response.map(object => object).sort((a, b) => b.AQI - a.AQI);
  // let sortedByAQI = meanAQI.sort((a, b) => b.AQI - a.AQI);

  // slicedData = sortedByAQI.slice(0, 10);

  // reversedData = slicedData.reverse();
  // reversedData = meanAQI.reverse();

  let traceJanState = {
    x: meanAQI,
    y: states.map(object => object),
    type: "bar",
    orientation: "h"
  };

  // Data trace array
  let dataJanState = [traceJanState];

  // Apply the group barmode to the layout
  let layoutJanState = {
    title: "State AQI Results"
  };

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("bar", dataJanState, layoutJanState);

  // ----------------------- ORIGINAL BAR CHART LAYOUT -----------------------
  //   // Trace for the state and AQI data
  // let traceJanState = {
  //   x: response.map(object => object.state_id),
  //   y: response.map(object => object.AQI),
  //   type: "bar"
  // };

  // // Data trace array
  // let dataJanState = [traceJanState];

  // // Apply the group barmode to the layout
  // let layoutJanState = {
  //   title: "State AQI Results"
  // };

  // // Render the plot to the div tag with id "plot"
  // Plotly.newPlot("bar", dataJanState, layoutJanState);
};


// ###########################################
// MAP FUNCTION CREATION
// ###########################################
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
};

// ########################################### 
// CHOROPLETH FUNCTION 
// ###########################################
function createChloro(response) {
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
};

// ########################################### 
// BUBBLE CHART FUNCTION 
// ###########################################
function createBubble(response){
  const bubbleChart = new Chart(
    document.getElementById('bubble'),
    {
      type: 'bubble',
      data: {
        labels: response.map(object => object.population),
        datasets: [
          {
            label: 'AQI',
            data: response.map(object => ({
              x: object.population/20000,
              y: object.AQI,
              r: 1
            })),
            // borderColor: 'rgba(0,255,255,1)',
            backgroundColor: 'rgba(0,255,255,1)'
          }
        ]
      }
    }
  );
};

// ########################################### 
// PIE CHART FUNCTION 
// ###########################################
function createPie(response) {
  // let dp25 = response.map(object => object.Category)
  // let dp10 = 
  // let dpOzone = 
  // let dpCO = 
  // let dpSO2 = 
  // let dpNO2 = 
  // let catGood = response.map(object => object.Category ==)
  // let catModerate = response.map(object => object.Category)
  // let catUnhealthy = response.map(object => object.Category)
  // let catSensitive = response.map(object => object.Category)
  // let catHazardous = response.map(object => object.Category)

  // catGood = []
  // catModerate =[]
  // catUnhealthy =[]
  // catSensitive =[]
  // catHazardous =[]

  function catGood(category) {
    return category == "Good";
  }
  function catModerate(category) {
    return category == "Moderate";
  }
  function catUnhealthy(category) {
    return category == "Unhealthy";
  }
  function catSensitive(category) {
    return category == "Unhealthy for Sensitive Groups";
  }
  function catHazardous(category) {
    return category == "Hazardous";
  }

  let good = response.map(object => object.Category).filter(catGood);
  let mod = response.map(object => object.Category).filter(catModerate);
  let unhealthy = response.map(object => object.Category).filter(catUnhealthy);
  let sensitive = response.map(object => object.Category).filter(catSensitive);
  let haz = response.map(object => object.Category).filter(catHazardous);

  const pieChart = new Chart(
    document.getElementById('pie'),
    {
      type: 'pie',
      data: {
        labels: [
          'Good',
          'Moderate',
          'Unhealthy for Sensitive Groups',
          'Unhealthy',
          'Hazardous'
        ],
        datasets: [{
          label: 'AQI Category',
          data: [
            good.length,
            mod.length,
            unhealthy.length,
            sensitive.length,
            haz.length
          ],
          backgroundColor: [
            'rgb(0,255,0)',
            'rgb(255, 205, 86)',
            'rgb(255, 153, 51)',
            'rgb(128,0,0)',
            'rgb(255,0,0)'
          ]
        }]
      }
    }
  )
};

// ###########################################
// DROP DOWN CHANGES 
// ###########################################
d3.selectAll("#selDataset").on("change", updateCharts);
d3.selectAll("#selDatasetStates").on("change", updateBubble);

// when the dropdown list changes then run this, this is a function to change the bar chart

// ###########################################
// This function is called when a month dropdown menu item is selected
// ###########################################
function updateCharts() {
  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  // This will give us the number of the month selected
  let monthNumber = dropdownMenu.property("value");
  // Now we make a new API call
  let urlBaseMonth = "/api/v1.0/aqi/month/"
  // ---- NEW API CALL----
  d3.json(urlBaseMonth.concat(monthNumber)).then(function(monthData){
    //  // ---- UPDATING BAR CHART ----
    // let newX = monthData.map(object => object.state_id);
    // let newY = monthData.map(object => object.AQI);
    // Plotly.restyle("bar", "x", [newX]);
    // Plotly.restyle("bar", "y", [newY]);
    // ---- NEW MAP ----
    createBar(monthData);
    // ---- NEW MAP ----
    createMap(monthData);
    // ---- NEW CHLORO ----
    createChloro(monthData)
    // ---- NEW PIE ----
    createPie(monthData);
  });
};


// ###########################################
// This function is called when a state dropdown menu item is selected
// ###########################################
function updateBubble() {
  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDatasetStates");
  // Assign the value of the dropdown menu option to a variable
  // This will give us the number of the month selected
  let stateValue = dropdownMenu.property("value");
  // Now we make a new API call
  let urlBaseState = "/api/v1.0/aqi/state/"
  // ---- NEW API CALL----
  d3.json(urlBaseState.concat(stateValue)).then(function(stateData){
    // ---- NEW BUBBLE ----
    createBubble(stateData);
    // ---- NEW PIE ----
    createPie(stateData);
  });
};


let urlMonth = "/api/v1.0/aqi/month/"
d3.json(urlMonth.concat(1)).then(function(response){
  init(response)
  // checking on data
  // run functions to create dash here
});


let urlState = "/api/v1.0/aqi/state/"
d3.json(urlState.concat(1)).then(function(response){
  init(response)
  // checking on data
  // run functions to create dash here
});