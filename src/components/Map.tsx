import { divIcon } from "leaflet";
import { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";

import { defaultLocation } from "../App";

type MapProps = {
  trees: any[];
  selectedTrees: any[];
  toggleTree: (id: string) => void;

  onMapClick?: (
    latitude: number,
    longitude: number
  ) => void;

  previewLatitude?: number | null;
  previewLongitude?: number | null;
};

const unselectedIcon = divIcon({
  className: "",

  html: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="black" className="size-4">
      <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm.75-10.25v2.5h2.5a.75.75 0 0 1 0 1.5h-2.5v2.5a.75.75 0 0 1-1.5 0v-2.5h-2.5a.75.75 0 0 1 0-1.5h2.5v-2.5a.75.75 0 0 1 1.5 0Z" clipRule="evenodd" />
    </svg>
  `,

  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const selectedIcon = divIcon({
  className: "",

  html: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="red" className="size-4">
      <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm2.78-4.22a.75.75 0 0 1-1.06 0L8 9.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 0 1 1.06-1.06L8 6.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1 0 1.06Z" clipRule="evenodd" />
    </svg>
  `,

  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const pinIcon = divIcon({
  className: "",

  html: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" class="size-6">
      <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
    </svg>
  `,

  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

export default function Map({
  trees,
  selectedTrees,
  toggleTree,
  onMapClick,
  previewLatitude,
  previewLongitude,
}: MapProps) {

  const [mapInstance, setMapInstance] =
    useState<any>(null);

  function centerOnUser() {
    if (!mapInstance) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        mapInstance.setView(
          [
            position.coords.latitude,
            position.coords.longitude,
          ],
          20
        );
      },

      (error) => {
        console.error(error);

        alert(
          "無法取得位置 (Unable to retrieve location)"
        );
      }
    );
  }

  function CenterMap() {
    const map = useMap();

    useEffect(() => {
      setMapInstance(map);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          map.setView(
            [
              position.coords.latitude,
              position.coords.longitude,
            ],
            map.getZoom()
          );
        },

        (error) => {
          console.error(error);

          alert(
            "無法取得位置 (Unable to retrieve location)"
          );
        }
      );
    }, [map]);

    return null;
  }

  function MapClickHandler() {
    useMapEvents({
      click(e) {
        if (onMapClick) {
          onMapClick(
            e.latlng.lat,
            e.latlng.lng
          );
        }
      },
    });

    return null;
  }

  return (
    <div className="relative">

      <MapContainer
        center={[
          defaultLocation[0],
          defaultLocation[1],
        ]}
        zoom={20}
        className="h-[300px] w-full z-0"
      >
        <CenterMap />

        <MapClickHandler />

        <TileLayer
          attribution='Tiles &copy; Esri'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />

        {trees.map((tree) => {
          const isSelected =
            selectedTrees.some(
              (t) => t.id === tree.id
            );

          return (
            <Marker
              key={tree.id}
              position={[
                Number(tree.latitude),
                Number(tree.longitude),
              ]}
              icon={
                isSelected
                  ? selectedIcon
                  : unselectedIcon
              }
              opacity={
                isSelected ? 1 : 0.75
              }
              eventHandlers={{
                click: () => {
                  toggleTree(tree.id);
                },
              }}
            />
          );
        })}

        {previewLatitude &&
          previewLongitude && (
            <Marker
              position={[
                previewLatitude,
                previewLongitude,
              ]}
              icon={pinIcon}
            />
          )}
      </MapContainer>

      <button
        type="button"
        onClick={centerOnUser}
        className="
          absolute
          bottom-4
          right-4
          z-[1000]

          bg-white
          shadow-lg
          border

          rounded-full

          p-3

          hover:bg-gray-100
          transition
        "
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
          <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}