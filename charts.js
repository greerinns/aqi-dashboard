// Add js logic here
// Create an array of each country's numbers
d3.json("http://127.0.0.1:5000/api/v1.0/aqi/month/1/json").then(function(data) {
    console.log(data);
  })

//console.log(data)
// Create an array of category labels
// let labels = Object.keys(data.australia);

// // Display the default plot
// function init() {
//   let data = [{
//     values: australia,
//     labels: labels,
//     type: "pie"
//   }];

//   let layout = {
//     height: 600,
//     width: 800
//   };

//   Plotly.newPlot("pie", data, layout);
// }

// // On change to the DOM, call getData()
// d3.selectAll("#selDataset").on("change", getData);

// // Function called by DOM changes
// function getData() {
//   let dropdownMenu = d3.select("#selDataset");
//   // Assign the value of the dropdown menu option to a letiable
//   let dataset = dropdownMenu.property("value");
//   // Initialize an empty array for the country's data
//   let data = [];

//   if (dataset == 'australia') {
//       data = australia;
//   }
//   else if (dataset == 'brazil') {
//       data = brazil;
//   }
//   else if (dataset == 'uk') {
//       data = uk;
//   }
//   else if (dataset == 'mexico') {
//     data = mexico;
//   }
//   else if (dataset == 'singapore') {
//       data = singapore;
//   }
//   else if (dataset == 'southAfrica') {
//     data = southAfrica;
//   }
// // Call function to update the chart
//   updatePlotly(data);
// }

// // Update the restyled plot's values
// function updatePlotly(newdata) {
//   Plotly.restyle("pie", "values", [newdata]);
// }

// init();