import { Icon } from 'leaflet';
import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

interface Props {
  lat: number;
  lng: number;
}

const locationIcon = new Icon({
  iconUrl: 'https://www.svgrepo.com/show/449139/location-pin-filled.svg',
  iconSize: [32, 32],
});

export default function EventMap({ lat, lng }: Props) {
  return (
    <div className='flex justify-center items-center text-lg w-full max-h-[250px] z-10'>
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        scrollWheelZoom={false}
        className='z-0'
        style={{
          height: '200px',
          width: '100%',
          borderRadius: '8px',
          zIndex: 10,
        }}
      >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        <Marker key={1} position={[lat, lng]} icon={locationIcon} />
      </MapContainer>
    </div>
  );
}
