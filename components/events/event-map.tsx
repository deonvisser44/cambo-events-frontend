import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { locationIcon } from '@/utils/constants';

interface Props {
  lat: number;
  lng: number;
}

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
        <Marker
          key={1}
          position={[lat, lng]}
          icon={locationIcon}
        />
      </MapContainer>
    </div>
  );
}
