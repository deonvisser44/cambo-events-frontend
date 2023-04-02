import React, { useState } from 'react';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { FieldMetaProps, useField } from 'formik';
import { MapClickEvent, UserStateType } from '@/utils/types';
import { locationIcon } from '@/utils/constants';
import { useSelector } from 'react-redux';
import { selectUserState } from '@/store/user';

interface LocationMarkerProps {
  setValue: (value: any, shouldValidate?: boolean | undefined) => void;
  state: FieldMetaProps<any>;
}

function LocationMarkers({ setValue, state }: LocationMarkerProps) {
  const [marker, setMarker] = useState(state.initialValue);

  const map = useMapEvents({
    click(e: MapClickEvent) {
      setMarker(e.latlng);
      setValue(e.latlng);
    },
  });

  return (
    <React.Fragment>
      <Marker
        position={marker as unknown as LatLngExpression}
        icon={locationIcon}
      />
    </React.Fragment>
  );
}

interface PostEventProps {
  field: { name: string };
}

export default function PostEventMap({ field: { name } }: PostEventProps) {
  const userState: UserStateType = useSelector(selectUserState);
  const { currentEvent: { location: {lat, lng } } } = userState;
  const [_, state, { setValue }] = useField(name);

  return (
    <div className='flex justify-center items-center text-lg w-full max-h-[250px] z-10'>
      <MapContainer
        center={[Number(lat), Number(lng)]}
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
        <LocationMarkers setValue={setValue} state={state} />
      </MapContainer>
    </div>
  );
}
