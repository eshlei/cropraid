import { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import { divIcon } from "leaflet";

import { supabase } from "../supabase";

function createIcon(color: string) {
  return divIcon({
    className: "",

    html: `
      <div
        style="
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          background: ${color};
          border: 2px solid white;
        "
      ></div>
    `,

    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

function getColor(count: number) {
  if (count >= 6) return "#dc2626";

  if (count >= 3) return "#ea580c";

  if (count >= 1) return "#ca8a04";

  return "#16a34a";
}

function CenterMap() {
  const map = useMap();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        map.setView(
          [
            position.coords.latitude,
            position.coords.longitude,
          ],
          18
        );
      },

      (error) => {
        console.error(error);
      }
    );
  }, [map]);

  return null;
}

export default function OverviewPage() {
  const [trees, setTrees] = useState<any[]>([]);

  useEffect(() => {
    fetchOverview();
  }, []);

  async function fetchOverview() {

    const { data: treesData } =
      await supabase
        .from("trees")
        .select("*");

    const { data: linksData } =
      await supabase
        .from("sighting_trees")
        .select("*");

    if (!treesData || !linksData) {
      return;
    }

    const counts: Record<number, number> =
      {};

    linksData.forEach((link) => {
      counts[link.tree_id] =
        (counts[link.tree_id] || 0) + 1;
    });

    const enrichedTrees =
      treesData.map((tree) => ({
        ...tree,

        sightingsCount:
          counts[tree.id] || 0,
      }));

    setTrees(enrichedTrees);
  }

  return (
    <div className="h-[calc(100vh-115px)]">

      <MapContainer
        center={[40.1100, -88.2272]}
        zoom={17}
        className="h-full w-full"
      >

        <CenterMap />

        <TileLayer
          attribution='Tiles &copy; Esri'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />

        {trees.map((tree) => (
          <Marker
            key={tree.id}

            position={[
              Number(tree.latitude),
              Number(tree.longitude),
            ]}

            icon={createIcon(
              getColor(
                tree.sightingsCount
              )
            )}
          >
            <Popup>
              <div className="space-y-2">

                <div className="font-bold">
                  {tree.name}
                </div>

                <div>
                  Species: {tree.species}
                </div>

                <div>
                  Sightings:{" "}
                  {tree.sightingsCount}
                </div>

                <div
                  className="
                    text-sm
                    text-gray-500
                  "
                >
                  {tree.description}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}