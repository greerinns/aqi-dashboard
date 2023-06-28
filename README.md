# Air Quality Index (AQI) Across the United States

## Contributors
- Katie Djahan (@katiedjahan)
- Greer Inns (@greerinns)
- Skyler Khalachyan (@SkylerKhalachyan)
- Mwohania Taylor (@nia12taylor)
---

## Rationale
For our project, we focused on a series of interactive charts that visualize the trends in Air Quality Index, across the United States. Recently, air quality has been a subject of public interest as it has had such a profound effect on human health. Focusing on the patterns that come from the trends in Air Quality Index can influence climate change policy and health regulations. We chose this topic for our project due to our interest in patterns in AQI levels in different states and how it can vary across different months.

---
## Data Sources
AQI or Air Quality Index is the primary way to measure the current quality of the air. AQI values range from 0-500 with 0 being perfectly healthy and 500 being extremely hazardous. The data in this file contained the following values for each row: CBSA Code, Date, AQI, Category, Defining Paramter, Number of Sites Reporting, city_ascii, state_di, lat, lng, population, density, and timezone. This data was taken over several years, but for the purposes of this study the rows were narrowed to the years of 2021 and 2022.
https://www.kaggle.com/datasets/calebreigada/us-air-quality-1980present?resource=download

<img width="545" alt="Screenshot 2023-06-27 at 7 18 34 PM" src="https://github.com/SkylerKhalachyan/Project_3_US_Air_Quality/assets/47437697/936b044a-7d10-4440-aeb5-6d8399531df9">

<img width="475" alt="Screenshot 2023-06-27 at 7 18 52 PM" src="https://github.com/SkylerKhalachyan/Project_3_US_Air_Quality/assets/47437697/8d9c30ae-dfa1-4346-9205-0afce0d42663">

---
## Features
1. Data Collection: Gather data on US Air Quality from chosen source.
2. Data Cleaning:  Handle missing values and file size.
3. Visualization: Utilize JavaScript, HTML, PostgreSQL to create interactive visualizations showcasing AQI trends
4. Presentation: Create a powerpoint presentation and README file summarising our process. *https://docs.google.com/presentation/d/1JVBQ101fd3iwscJgx9ocpruc-CRSs2x4X4a9iTS9BnM/edit?pli=1#slide=id.p*

---
## Flask App
### Welcome Route:
This route connects the Flask app to the front-end by rendering a static HTML file.
The render_template function is used to render the HTML file. By connecting the Flask app to the front-end, we avoid issues with Cross-Origin Resource Sharing (CORS) and local file access.

### Month Route:
This route takes a month as input in the URL route (/api/v1.0/aqi/month/&lt;i&gt;). *&lt;i&gt;* is passed as the number of the month you want to select (e.g. */api/v1.0/aqi/month/1* for January data). A query is executed to retrieve all columns where the date begins with the expression "i/".
The narrowed dataset for the given month is returned.

### State Route:
Similar to the Month Route, this route takes a state ID or abbreviation as input in the URL route. The input is converted to uppercase to match the database values. The route executes a query to retrieve all columns of the matching rows. The narrowed dataset for the given state is returned.

### Average Month Route:
This route calculates the average AQI (Air Quality Index) for each state over a selected month.
The month is still passed as "i" in the route (/api/v1.0/aqi-avg/month/&lt;i&gt;).
A window function is used to perform the calculation in SQL. The output of the executed statement is converted into a JSONifiable variable. 

---
## HTML Drop Downs
The index.html file includes two dropdown menus. The dropdown menus are designed to control the five visualizations on our dashboard. The options in the dropdown menus have user-friendly texts, while their values are intended to be easily used in the API calls made in the JavaScript code.
For example, the dropdown menu for monthly data and average data has options with numbers representing months as the value, and the dropdown menu for state data has options with state ID values.

<img width="201" alt="Screenshot 2023-06-27 at 7 30 02 PM" src="https://github.com/SkylerKhalachyan/Project_3_US_Air_Quality/assets/47437697/37ebe33c-78d3-4c59-aa89-331bbb489dd0">

<img width="311" alt="Screenshot 2023-06-27 at 7 30 10 PM" src="https://github.com/SkylerKhalachyan/Project_3_US_Air_Quality/assets/47437697/25d0819a-9068-4c12-85ef-2c0aa1fc3df6">

---
## Javascript
### Bar Chart
<img width="830" alt="Screenshot 2023-06-27 at 7 33 44 PM" src="https://github.com/SkylerKhalachyan/Project_3_US_Air_Quality/assets/47437697/36a64d05-b65e-4afd-be66-0f91f79f47e3">
The bar chart displays the average AQI for each state in a given month. On our dashboard, you can use the the Month dropdown menu to select which month of data is represented on the chart.


### Maps
<img width="814" alt="Screenshot 2023-06-27 at 7 34 08 PM" src="https://github.com/SkylerKhalachyan/Project_3_US_Air_Quality/assets/47437697/04efc36b-0290-459d-ac7a-9d36becf7a80">
This is a Plotly map with markers showing the overall AQI for the selected month in a given location using the latitude and longitude. On our dashboard, you can use the the Month dropdown menu to select which month of data is represented on the map.

<img width="772" alt="Screenshot 2023-06-27 at 7 34 24 PM" src="https://github.com/SkylerKhalachyan/Project_3_US_Air_Quality/assets/47437697/cfd27b09-a6f3-4fe5-9c91-f2849544d9c4">
This is a Choropleth map that displays the average AQI in each state for the selected month. On our dashboard, you can use the the Month dropdown menu to select which month of data is represented on the map. 

### AQI vs Population per 2000 and AQI Category Pie Chart
<img width="1073" alt="Screenshot 2023-06-27 at 7 35 50 PM" src="https://github.com/SkylerKhalachyan/Project_3_US_Air_Quality/assets/47437697/836a0273-a680-45cf-8349-d1235f989e07">
The scatter plot displays a state’s population on the x-axis and the AQI for cities with that population on the y-axis. The state represented on this plot can be changed using the state dropdown menu. <br> The pie chart displays the breakdown of AQI category, ranging from Good to Hazardous. The data displayed here is one month of AQI data for each state, so the data represented here can be changed with both the month and state dropdown menus. 

---
## Future Plans

In our dashboard project, we initially planned to include a pie chart displaying the breakdown of the six dominant particulates in the air based on a defining parameter column in our dataset. However, during the JavaScript implementation phase, we realized that we should have removed the spaces in the column names. As a workaround, we decided to use the AQI Category instead. In future projects, we would ensure to rename the columns in the Excel file before creating the database to avoid such issues.

To further explore the relationship between population and Air Quality Index, it could be intriguing to incorporate an additional dataset with more detection points in areas with varying populations.

It's also important to note that our analysis was limited to data from 2021 and 2022 due to the large size of our dataset. Ideally we would increase the database in postgres to store all the years available.

