import React, { useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';

export default function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const coordinatesRef = useRef(null);  // Ref for coordinates display
    const lng = 11;
    const lat = 12;
    const zoom = 10;
    const API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;

    useEffect(() => {
        if (map.current) return; // Stops map from initializing more than once
      
        map.current = new maplibregl.Map({
          container: mapContainer.current,
          style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
          center: [lng, lat],
          zoom: zoom
        });

        map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

        const marker = new maplibregl.Marker({ draggable: true })
          .setLngLat([lng, lat])
          .addTo(map.current);

        function onDragEnd() {
          const lngLat = marker.getLngLat();
          if (coordinatesRef.current) {
            coordinatesRef.current.style.display = 'block';
            coordinatesRef.current.innerHTML =
                'Longitude: ' + lngLat.lng.toFixed(4) + '<br />Latitude: ' + lngLat.lat.toFixed(4);
          }
        }

        marker.on('dragend', onDragEnd);

        // Ensures the map resizes correctly if the container size changes
        map.current.on('load', () => {
          map.current.resize();
        });

    }, [API_KEY, lng, lat, zoom]);

    return (
        <div className="map-wrap">
          <div ref={mapContainer} className="map" />
          <div ref={coordinatesRef} className="coordinates" /> {/* Coordinate display */}
        </div>
    );
}
