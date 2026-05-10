import { useEffect, useState } from "react";
import Map from "../components/Map";
import { supabase } from "../supabase";

export default function SettingsPage() {
  const [trees, setTrees] = useState<any[]>([]);

  const [latitude, setLatitude] =
    useState<number | null>(null);

  const [longitude, setLongitude] =
    useState<number | null>(null);

  const [name, setName] = useState("");
  const [species, setSpecies] =
    useState("");

  useEffect(() => {
    fetchTrees();
  }, []);

  async function fetchTrees() {
    const { data, error } =
      await supabase
        .from("trees")
        .select("*");

    if (error) {
      console.error(error);
      return;
    }

    setTrees(data || []);
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (
      latitude === null ||
      longitude === null
    ) {
      alert("點擊地圖選擇位置 (Select location on map)");
      return;
    }

    const { error } = await supabase
      .from("trees")
      .insert([
        {
          name,
          species,
          latitude,
          longitude,
        },
      ]);

    if (error) {
      console.error(error);
      alert("新增失敗 (Failed to register tree)");
      return;
    }

    alert("新增成功 (Tree registered)");

    setName("");
    setSpecies("");
    setLatitude(null);
    setLongitude(null);

    fetchTrees();
  }

  return (
    <div className="h-screen overflow-hidden bg-green-50">

      {/* Fixed Map */}
      <div
        className="
          fixed
          top-0
          left-0
          right-0
          z-10
        "
      >
        <Map
          trees={trees}
          selectedTrees={[]}
          toggleTree={() => {}}
          onMapClick={(lat, lng) => {
            setLatitude(lat);
            setLongitude(lng);
          }}
          previewLatitude={latitude}
          previewLongitude={longitude}
        />
      </div>

      {/* Scrollable Form */}
      <div
        className="
          pt-[320px]
          h-screen
          overflow-y-auto
          px-4
          pb-24
        "
      >
        <div className="max-w-2xl mx-auto">

          <div
            className="
              bg-white
              shadow
              rounded-t-3xl
              p-6
            "
          >
            <h1
              className="
                text-xl
                font-bold
                mb-6
                text-green-800
              "
            >
              新增 (Register)
            </h1>

            <p className="mb-4 text-sm text-gray-600">
              點擊地圖選擇位置 (Select location on map)
            </p>

            {/*latitude && longitude && (
              <div
                className="
                  mb-4
                  p-3
                  rounded-lg
                  bg-green-50
                  border
                  border-green-200
                  text-sm
                "
              >
                <div>
                  {latitude.toFixed(5)}
                  {", "}
                  {longitude.toFixed(5)}
                </div>
              </div>
            )*/}

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <label
                  className="
                    block
                    mb-1
                    font-medium
                  "
                >
                  植株代號 (Tree ID)
                </label>

                <input
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  required
                  className="
                    w-full
                    border
                    rounded-lg
                    p-2
                    focus:outline-none
                    focus:ring-2
                    focus:ring-green-500
                  "
                />
              </div>

              <div>
                <label
                  className="
                    block
                    mb-1
                    font-medium
                  "
                >
                  植株種類 (Tree Species)
                </label>

                <input
                  value={species}
                  onChange={(e) =>
                    setSpecies(
                      e.target.value
                    )
                  }
                  required
                  className="
                    w-full
                    border
                    rounded-lg
                    p-2
                    focus:outline-none
                    focus:ring-2
                    focus:ring-green-500
                  "
                />
              </div>

              <button
                type="submit"
                className="
                  w-full
                  bg-green-700
                  text-white
                  py-3
                  rounded-lg
                  font-medium
                  hover:bg-green-800
                  transition-colors
                "
              >
                新增植株 (Register New Tree)
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}