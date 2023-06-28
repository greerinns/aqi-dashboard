DROP TABLE IF EXISTS aqi;

CREATE TABLE "aqi" (
    "CBSA Code" INT,
	"Date" VARCHAR,
	"AQI" FLOAT,
	"Category" VARCHAR,
	"Defining Parameter" VARCHAR,
	"Number of Sites Reporting" INT,
	"city_ascii" VARCHAR,
	"state_id" VARCHAR,
	"state_name" VARCHAR,
	"lat" FLOAT,
	"lng" FLOAT,
	"population" INT,
	"density" INT,
	"timezone" VARCHAR
);