# Air Quality Index (AQI) Across the United States

## Contributors
- Greer Inns (@greerinns)
- Katie Djahan (@katiedjahan)
- Skyler Khalachyan (@SkylerKhalachyan)
- Mwohania Taylor (@nia12taylor)

## Introduction

Air quality has become a topic of significant public interest due to its profound impact on human health and its implications for climate change policies and health regulations. In this project, we present a series of interactive charts that visualize the trends in the Air Quality Index (AQI) across the United States. Our focus is on identifying patterns in AQI levels in different states and their variations across different months.

## Data Sources

The primary metric for measuring air quality is the Air Quality Index (AQI), which ranges from 0 to 500, with 0 representing perfect air quality and 500 indicating extremely hazardous conditions. The dataset used in this project includes the following information for each entry: CBSA Code, Date, AQI, Category, Defining Parameter, Number of Sites Reporting, city_ascii, state_id, latitude, longitude, population, density, and timezone. We have narrowed our analysis to the years 2021 and 2022 for this study.

Dataset Source: [US Air Quality Data (1980-Present)](https://www.kaggle.com/datasets/calebreigada/us-air-quality-1980present?resource=download)

![Sample Data](https://github.com/SkylerKhalachyan/Project_3_US_Air_Quality/assets/47437697/936b044a-7d10-4440-aeb5-6d8399531df9)

## Project Features

1. **Data Collection:** We collected data on US Air Quality from the chosen source.

2. **Data Cleaning:** We handled missing values and optimized file size for efficient analysis.

3. **Visualization:** Utilizing JavaScript, HTML, and PostgreSQL, we created interactive visualizations that showcase AQI trends.

4. **Presentation:** We have prepared a PowerPoint presentation summarizing our project, which can be accessed [here](https://docs.google.com/presentation/d/1JVBQ101fd3iwscJgx9ocpruc-CRSs2x4X4a9iTS9BnM/edit?pli=1#slide=id.p).

## Flask App

### Welcome Route

The welcome route connects the Flask app to the front-end by rendering a static HTML file. We use the `render_template` function to display the HTML file. This connection helps us avoid issues related to Cross-Origin Resource Sharing (CORS) and local file access.

### Month Route

The month route takes a month as input in the URL route (`/api/v1.0/aqi/month/<i>`). Here, `<i>` represents the month's numerical value (e.g., `/api/v1.0/aqi/month/1` for January data). A query is executed to retrieve all columns where the date begins with the specified month. The narrowed dataset for the selected month is then returned.

### State Route

Similar to the month route, the state route accepts a state ID or abbreviation as input in the URL route. The input is converted to uppercase to match the database values. The route executes a query to retrieve all columns of the matching rows. The narrowed dataset for the selected state is then returned.

### Average Month Route

This route calculates the average AQI (Air Quality Index) for each state over a selected month. The month is still passed as `<i>` in the route (`/api/v1.0/aqi-avg/month/<i>`). A window function is used to perform the calculation in SQL. The output of the executed statement is converted into a JSONifiable variable.

## HTML Drop-Down Menus

The index.html file includes two dropdown menus designed to control the five visualizations on our dashboard. The options in these dropdown menus have user-friendly text, while their values are intended to be easily used in API calls made in the JavaScript code. For example, the dropdown menu for monthly data and average data has options with numerical representations of months as values, and the dropdown menu for state data has options with state ID values.

![Dropdown Menus](https://github.com/SkylerKhalachyan/Project_3_US_Air_Quality/assets/47437697/37ebe33c-78d3-4c59-aa89-331bbb489dd0)

![Dropdown Menus](https://github.com/SkylerKhalachyan/Project_3_US_Air_Quality/assets/47437697/25d0819a-9068-4c12-85ef-2c0aa1fc3df6)

## JavaScript Visualizations

### Bar Chart

The bar chart displays the average AQI for each state in a selected month. Users can use the Month dropdown menu to select which month's data is represented on the chart.

![Bar Chart](https://github.com/SkylerKhalachyan/Project_3_US_Air_Quality/assets/47437697/36a64d05-b65e-4afd-be66-0f91f79f47e3)

### Maps

1. **Plotly Map**: This map displays markers showing the overall AQI for the selected month in a given location using latitude and longitude. Users can select the desired month using the Month dropdown menu.

![Plotly Map](https://github.com/SkylerKhalachyan/Project_3_US_Air_Quality/assets/47437697/04efc36b-0290-459d-ac7a-9d36becf7a80)

2. **Choropleth Map**: This map displays the average AQI in each state for the selected month. Users can choose the month of interest using the Month dropdown menu.

![Choropleth Map](https://github.com/SkylerKhalachyan/Project_3_US_Air_Quality/assets/47437697/cfd27b09-a6f3-4fe5-9c91-f2849544d9c4)

### AQI vs Population per 2000 and AQI Category Pie Chart

- **Scatter Plot**: The scatter plot represents a state's population on the x-axis and the AQI for cities with that population on the y-axis. Users can change the state represented on this plot using the State dropdown menu. 

- **Pie Chart**: The pie chart displays the breakdown of AQI categories, ranging from Good to Hazardous, based on one month of AQI data for each state. Users can customize the data represented using both the Month and State dropdown menus.

![Scatter Plot and Pie Chart](https://github.com/SkylerKhalachyan/Project_3_US_Air_Quality/assets/47437697/836a0273-a680-45cf-8349-d1235f989e07)

## Future Plans

In our dashboard project, we initially planned to include a pie chart displaying the breakdown of the six dominant particulates in the air based on a defining parameter column in our dataset. However, during the JavaScript implementation phase, we realized that we should have removed the spaces in the column names. As a workaround, we decided to use the AQI Category instead. In future projects, we would ensure to rename the columns in the Excel file before

