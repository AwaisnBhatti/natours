/* eslint-disable */

export const displayMap = (locations) => {
  const map = L.map('map', {
    center: [20, -100],
    zoom: 10,
    scrollWheelZoom: false,
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  }).addTo(map);

  const customIcon = L.icon({
    iconUrl: '/img/pin.png',
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40],
  });

  const bounds = [];

  locations.forEach((location) => {
    const coords = [location.coordinates[1], location.coordinates[0]];

    bounds.push(coords);

    L.marker(coords, { icon: customIcon })
      .addTo(map)
      .bindPopup(`<p>Day ${location.day}: ${location.description}</p>`, {
        autoClose: false,
        closeOnClick: false,
        className: 'tour-popup',
      })
      .openPopup();
  });

  map.fitBounds(bounds, {
    padding: [70, 70],
  });
};
