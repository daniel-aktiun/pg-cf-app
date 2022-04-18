const providers = [
  {
    name: "PG",
    url: " http://127.0.0.1:5000",
    active: true,
    provider: "redshift",
    id: "24908b7f-5d99-4eb0-af6a-573d04b1662c",
  },
];
cf.setProviders(providers);

// ============== VISUALIZATION FUNCTIONS ===================

function interactionManager() {
  let aktive = cf.create();
  let myChart = aktive
    .graph("Interaction Manager")
    .set("skin", "modern")
    .element("i-manager")
    .execute();
}

function donutChart() {
  let provider = cf.provider("PG");
  let source = provider.source("public.chicago_taxi_trips");
  // Define metrics
  let metric0 = cf.Metric("community_areas", "sum");
  // Define attributes to group by
  let group1 = cf
    .Attribute("payment_type")
    .limit(10)
    .sort("desc", cf.Metric("company", "unique"));
  // Add metrics and groups to data source
  let myData = source.groupby(group1).metrics(metric0);
  // --- Define chart options and static filters ---
  // Define Color Palette
  let color = cf
    .Color()
    .palette([
      "#0095b7",
      "#a0b774",
      "#f4c658",
      "#fe8b3e",
      "#cf2f23",
      "#756c56",
      "#007896",
      "#47a694",
      "#f9a94b",
      "#ff6b30",
      "#e94d29",
      "#005b76",
    ]);
  const myChart = myData
    .graph("Donut")
    .set("color", color)
    .element("donut-chart")
    .execute();
}

function barChart() {
  /* Configuration code for this widget */
  let provider = cf.provider("PG");
  let source = provider.source("public.chicago_taxi_trips");
  // Define metrics
  let metric0 = cf.Metric("count");
  // Define attributes to group by
  let group1 = cf
    .Attribute("company")
    .limit(10)
    .sort("desc", cf.Metric("trip_id", "unique"));
  // Add metrics and groups to data source
  let myData = source.groupby(group1).metrics(metric0);
  // --- Define chart options and static filters ---
  // Define Grid
  let grid = cf.Grid().top(10).right(15).bottom(35).left(65);
  // Define Color Palette
  let color = cf
    .Color()
    .palette([
      "#0095b7",
      "#a0b774",
      "#f4c658",
      "#fe8b3e",
      "#cf2f23",
      "#756c56",
      "#007896",
      "#47a694",
      "#f9a94b",
      "#ff6b30",
      "#e94d29",
      "#005b76",
    ]);
  let myChart = myData
    .graph("Bars")
    .set("grid", grid)
    .set("color", color)
    .set("dataZoom", false)
    .element("bar-chart")
    .execute();
}

function table() {
  /* Configuration code for this widget */
  let provider = cf.provider("PG");
  let source = provider.source("public.chicago_taxi_trips");
  // Declare your fields (do not remove this comment line)
  const fields = [
    cf.Field("company", "Company"),
    cf.Field("trip_total", "Trip total"),
    cf.Field("tips", "Tips"),
    cf.Field("payment_type", "Payment type"),
    cf.Field("trip_start_hour", "Trip start hour"),
    cf.Field("trip_end_hour", "Trip end hour"),
    cf.Field("trip_minutes", "Trip_minutes"),
    cf.Field("dropoff_location_lat", "dropoff_location_lat"),
    cf.Field("dropoff_location_lon", "dropoff_location_lon"),
    cf.Field("dropoff_latitude", "dropoff_latitude"),
    cf.Field("pickup_latitude", "pickup_latitude"),
    cf.Field("pickup_longitude", "pickup_longitude"),
    cf.Field("dropoff_longitude", "dropoff_longitude"),
  ];
  let myData = source.fields(fields);
  let histogramColor = cf.Color();
  histogramColor.theme({ background: "white" });
  // --- Define chart options and static filters ---
  let myChart = myData
    .graph("Raw Data Table")
    .set("columnFilters", [
      { field: "company", component: "slicer" },
      { field: "trip_total", component: "range" },
      { field: "tips", component: "range" },
      { field: "payment_type", component: "slicer" },
      { field: "trip_start_hour", component: "slicer" },
      { field: "trip_end_hour", component: "slicer" },
      { field: "trip_minutes", component: "range" },
      { field: "dropoff_location_lat", component: "range" },
      { field: "dropoff_location_lon", component: "range" },
      { field: "dropoff_latitude", component: "range" },
      { field: "pickup_latitude", component: "range" },
      { field: "pickup_longitude", component: "range" },
      { field: "dropoff_longitude", component: "range" },
    ])
    .set("columnStats", {
      enabled: true,
      height: 70,
      // widgetProps: [
      //   {
      //     field: "trip_start_timestamp",
      //     props: {
      //       granularity: "DAY", // Useful just for TIME fields
      //       limit: 5, // For slicers means 5 rows, for histogram you need to use fixedBars for the number of buckets
      //     },
      //   },
      // ],
    })
    .set("autoSizeColumns", true)
    .limit(100)
    .element("table")
    .execute();
}

interactionManager();
donutChart();
barChart();
table();
