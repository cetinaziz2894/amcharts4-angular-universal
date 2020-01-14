import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.scss']
})
export class WorldComponent implements OnInit {

  constructor() {}

  ngOnInit() {
let chart = am4core.create("chartdiv", am4maps.MapChart);

// Set map definition
chart.geodata = am4geodata_worldLow;

// Set projection
chart.projection = new am4maps.projections.NaturalEarth1();
chart.panBehavior = "rotateLong";

// Create map polygon series
let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

// Make map load polygon (like country names) data from GeoJSON
polygonSeries.useGeodata = true;

polygonSeries.mapPolygons.template.fillOpacity = 0.6;
polygonSeries.mapPolygons.template.nonScalingStroke = true;
polygonSeries.mapPolygons.template.strokeWidth = 0.5;
polygonSeries.mapPolygons.template.adapter.add("fill", function(fill, target) {
    return chart.colors.getIndex(Math.round(Math.random() * 4)).saturate(0.3);
})

// Configure series
let polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name}";

// Create hover state and set alternative fill color
let hs = polygonTemplate.states.create("hover");
hs.properties.fill = chart.colors.getIndex(1);

// Center on Pacic
chart.deltaLongitude = -154.8;



let graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
graticuleSeries.fitExtent = false;

  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("index-page");
  }

}
