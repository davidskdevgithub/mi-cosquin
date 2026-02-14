import { ListFilter } from "lucide-react";
import { Text } from "@/ui";
import { ROW_HEIGHT } from "../lineup.config";
import type { Scenario } from "../lineup.types";

interface ScenarioSidebarProps {
  scenarios: Scenario[];
  onFilterClick?: () => void;
}

export const ScenarioSidebar = ({
  scenarios,
  onFilterClick,
}: ScenarioSidebarProps) => {
  return (
    <div className="flex-none w-24 border-r-2 border-primary/40">
      {/* Header con botón de filtro */}
      <button
        type="button"
        onClick={onFilterClick}
        className={`${ROW_HEIGHT} w-full flex items-center justify-center bg-neutral-800 border-b border-neutral-700 cursor-pointer hover:bg-neutral-700 transition-colors`}
        title="Filtrar escenarios"
      >
        <ListFilter className="w-4 h-4 text-neutral-400" />
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
