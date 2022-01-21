import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import TileWMS from 'ol/source/TileWMS';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    var layers = [
      //new ol.layer.Tile({
      new TileLayer({
        //source: new ol.source.OSM(),
        source: new OSM(),
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://localhost:8080/geoserver/mbhoni/wms',
          params: {
            LAYERS: 'mbhoni:passenger_car_restriction',
            TILED: true,
          },
          serverType: 'geoserver',
          // Countries have transparency, so do not fade tiles:
          transition: 0,
        }),
      }),
    ];
    var map = new Map({
      layers: layers,
      target: 'map',
      view: new View({
        center: [-23.372046657696778, 17.308772643903485],
        projection: 'EPSG:4326',
        zoom: 4,
      }),
    });
  }
}
