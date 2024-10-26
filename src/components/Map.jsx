import React, { useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';

export default function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const lng = 11;
    const lat = 12;
    const zoom = 10;
    const API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;

    useEffect(() => {
        if (map.current) return; // stops map from intializing more than once
      
        map.current = new maplibregl.Map({
          container: mapContainer.current,
          style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
          center: [lng, lat],
          zoom: zoom
        });
        map.current.addControl(new maplibregl.NavigationControl(),'top-right')
        new maplibregl.Marker({draggable:true})
        .setLngLat([11,12])
        .addTo(map.current);
      
    }, [API_KEY, lng, lat, zoom]);

    return (
        <div className="map-wrap">
          <div ref={mapContainer} className="map" />
        </div>
      );
  }