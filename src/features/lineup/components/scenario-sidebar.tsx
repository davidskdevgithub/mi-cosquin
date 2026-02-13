import { Text } from "@/ui";
import { ROW_HEIGHT } from "../lineup.config";
import type { Scenario } from "../lineup.types";

interface ScenarioSidebarProps {
  scenarios: Scenario[];
  onTimeClick: () => void;
}

export const ScenarioSidebar = ({
  scenarios,
  onTimeClick,
}: ScenarioSidebarProps) => {
  return (
    <div className="flex-none w-24 border-r-2 border-primary/40">
      {/* Header con botón scroll-to-now */}
      <button
        type="button"
        className={`${ROW_HEIGHT} w-full flex items-center justify-center bg-neutral-800 border-b border-neutral-700 cursor-pointer hover:bg-neutral-700 transition-colors`}
        onClick={onTimeClick}
        title="Ir a la hora actual"
      >
        <svg
          className="w-5 h-5 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      {/* Nombres de escenarios */}
      {scenarios.map((scenario) => (
        <div
          key={scenario.id}
          className={`${ROW_HEIGHT} flex items-center justify-center gap-2 bg-neutral-800 border-b border-neutral-700`}
        >
          <Text variant="label" as="span">
            <span
              className={`flex text-neutral-100 uppercase text-center ${scenario.id === "laplaza" ? "text-xs" : "text-sm"}`}
            >
              {scenario.name}
            </span>
          </Text>
        </div>
      ))}
    </div>
  );
};
