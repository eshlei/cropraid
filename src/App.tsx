import {
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import ReportPage from "./pages/ReportPage";
import OverviewPage from "./pages/OverviewPage";
import SettingsPage from "./pages/SettingsPage";

export const speciesOptions = [
  "臺灣獼猴 (Formosan Rock Macaque)",
  "松鼠 (Squirrel sp.)",
  "山豬 (Wild Boar)",
  "山羌 (Reeves's Muntjac)",
  "白鼻心 (Masked Palm Civet)",
  "鳥類 (Bird sp.)",
  "其他 (Other)",
];

export const defaultLocation = [
  40.1033379, -88.2324657
];

export default function App() {
  return (
    <div className="min-h-screen bg-green-50 pb-20">
      <main className="max-w-5xl mx-auto p-4">
        <Routes>
          <Route
            path="/"
            element={<ReportPage />}
          />

          <Route
            path="/overview"
            element={<OverviewPage />}
          />

          <Route
            path="/settings"
            element={<SettingsPage />}
          />
        </Routes>
      </main>

      <nav
        className="
          fixed
          bottom-0
          left-0
          right-0
          bg-white
          border-t
          shadow-lg
          flex
          justify-around
          items-center
          py-3
        "
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            `
              flex
              flex-col
              items-center
              text-sm
              transition-all

              ${
                isActive
                  ? "text-green-700 font-semibold"
                  : "text-gray-400"
              }
            `
          }
        >
          <span className="text-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12-3-3m0 0-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
          </span>

          通報 (Report)
        </NavLink>

        <NavLink
          to="/overview"
          className={({ isActive }) =>
            `
              flex
              flex-col
              items-center
              text-sm
              transition-all

              ${
                isActive
                  ? "text-green-700 font-semibold"
                  : "text-gray-400"
              }
            `
          }
        >
          <span className="text-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
          </svg>

          </span>

          統計 (Trends)
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `
              flex
              flex-col
              items-center
              text-sm
              transition-all

              ${
                isActive
                  ? "text-green-700 font-semibold"
                  : "text-gray-400"
              }
            `
          }
        >
          <span className="text-xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
            </svg>
          </span>

          植株 (Trees)
        </NavLink>
      </nav>
    </div>
  );
}