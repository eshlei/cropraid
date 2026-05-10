import { speciesOptions } from "../App";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import Map from "../components/Map";

export default function ReportPage() {
  const [species, setSpecies] = useState(speciesOptions[0]);
  const [description, setDescription] = useState("");
  const [trees, setTrees] = useState<any[]>([]);
  const [selectedTrees, setSelectedTrees] = useState<any[]>([]);

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
    console.log("Fetched trees:", data);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const {
      data,
      error,
    } = await supabase
      .from("sightings")
      .insert([
        {
          species,
          description,
        },
      ])
      .select()
      .single();
    if (error) {
      console.error(error);
      return;
    }

    const sightingTreeLinks =
      selectedTrees.map((tree) => ({
        sighting_id: data.id,
        tree_id: tree.id,
      }));

    const { error: treeError } =
      await supabase
        .from("sighting_trees")
        .insert(sightingTreeLinks);
    if (treeError) {
      console.error(treeError);
      return;
    }

    alert("Crop Raid Report Submitted!");
    
    // Clear form
    setSpecies(speciesOptions[0]);
    setDescription("");
    setSelectedTrees([]);
  }

  function toggleTree(id: string) {
    if (selectedTrees.some((t) => t.id === id)) {
      setSelectedTrees(
        selectedTrees.filter((t) => t.id !== id)
      );
    } else {
      const tree = trees.find((t) => t.id === id);
      if (tree) {
        setSelectedTrees([...selectedTrees, tree]);
      }
    }
  }

  return (
    <div className="h-screen overflow-hidden bg-green-50">

      <div
        className="
          fixed
          top-0
          left-0
          right-0
          z-10
        "
      >
        <div className="relative">
          <Map
            trees={trees}
            selectedTrees={selectedTrees}
            toggleTree={toggleTree}
          />
        </div>
      </div>

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
          <div className="bg-white shadow rounded-t-3xl p-6">
            <h1 className="text-xl font-bold mb-6 text-green-800">
              野生動物危害通報 (Crop Raid Report)
            </h1>
            <p className="mb-4 text-sm text-gray-600">
              從地圖選擇受損植株 (Select affected trees from the map)
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              <div className="mb-4">
                <label className="block mb-1 font-medium">
                  物種 (Species)
                </label>

                <select
                  value={species}
                  onChange={(e) =>
                    setSpecies(e.target.value)
                  }
                  className="
                    w-full
                    border
                    rounded-lg
                    p-2
                    bg-white
                    focus:outline-none
                    focus:ring-2
                    focus:ring-green-500
                  "
                >
                  {speciesOptions.map((animal) => (
                    <option
                      key={animal}
                      value={animal}
                    >
                      {animal}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 mb-4">
                <label className="block mb-1 font-medium">
                  受損植株 (Affected Trees)
                </label>
                {
                  selectedTrees.length === 0 && (
                    <div className="text-gray-500 text-sm">
                      未選取 (None selected)
                    </div>
                  )
                }
                {selectedTrees.map((tree) => (
                  <div
                    key={tree.id}
                    className="
                      flex
                      items-center
                      justify-between
                      bg-white
                      rounded-lg
                      px-3
                      py-2
                      border
                    "
                  >
                    <div>
                      <div className="font-medium">
                        {tree.name}
                      </div>

                      <div className="text-sm text-gray-500">
                        #{tree.id}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        toggleTree(tree.id)
                      }
                      className="
                        text-red-500
                        hover:text-red-700
                      "
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  描述 (Description)
                </label>

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  rows={4}
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
                上傳 (Submit)
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}