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

  
  // // Creating our initial map object:
  // // We set the longitude, latitude, and starting zoom level.
  // // This gets inserted into the div with an id of "map".
  // let myMap = L.map("map", {
  //   center: [45.52, -122.67],
  //   zoom: 13,
  //   zoomControl: false
  // });

  // // Adding a tile layer (the background map image) to our map:
  // // We use the addTo() method to add objects to our map.
  // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  // }).addTo(myMap);

  // const resizeObserver = new ResizeObserver(() => {
  //   myMap.invalidateSize();
  // });
  
  // const mapDiv = document.getElementById("map")

  // resizeObserver.observe(mapDiv);

  // let marker = L.marker([45.52, -122.67], {
  //   draggable: true,
  //   title: "My First Marker"
  // }).addTo(myMap);
  
  // // Binding a popup to our marker
  // marker.bindPopup("Hello There!");
  var data = [{
    type: 'scattergeo',
    mode: 'markers+text',
    text: [
        'Montreal', 'Toronto', 'Vancouver', 'Calgary', 'Edmonton',
        'Ottawa', 'Halifax', 'Victoria', 'Winnepeg', 'Regina'
    ],
    lon: [
        -73.57, -79.24, -123.06, -114.1, -113.28,
        -75.43, -63.57, -123.21, -97.13, -104.6
    ],
    lat: [
        45.5, 43.4, 49.13, 51.1, 53.34, 45.24,
        44.64, 48.25, 49.89, 50.45
    ],
    marker: {
        size: 7,
        color: [
            '#bebada', '#fdb462', '#fb8072', '#d9d9d9', '#bc80bd',
            '#b3de69', '#8dd3c7', '#80b1d3', '#fccde5', '#ffffb3'
        ],
        line: {
            width: 1
        }
    },
    name: 'AQI data in the US',
    textposition: [
        'top right', 'top left', 'top center', 'bottom right', 'top right',
        'top left', 'bottom right', 'bottom left', 'top right', 'top right'
    ],
}];

var layout = {
    title: 'AQI data in the US',
    font: {
        family: 'Droid Serif, serif',
        size: 6
    },
    titlefont: {
        size: 16
    },
    geo: {
        scope: 'north america',
        resolution: 50,
        lonaxis: {
            'range': [-130, -55]
        },
        lataxis: {
            'range': [40, 70]
        },
        showrivers: true,
        rivercolor: '#fff',
        showlakes: true,
        lakecolor: '#fff',
        showland: true,
        landcolor: '#EAEAAE',
        countrycolor: '#d3d3d3',
        countrywidth: 1.5,
        subunitcolor: '#d3d3d3'
    }
};

Plotly.newPlot('map', data, layout);

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