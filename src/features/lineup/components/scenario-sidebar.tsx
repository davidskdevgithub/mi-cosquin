import { Text } from "@/ui";
import { ROW_HEIGHT } from "../lineup.config";
import type { Scenario } from "../lineup.types";

interface ScenarioSidebarProps {
  scenarios: Scenario[];
}

export const ScenarioSidebar = ({ scenarios }: ScenarioSidebarProps) => {
  return (
    <div className="flex-none w-28 border-r-2 border-primary/40">
      {/* Header vacío alineado con la fila de horarios */}
      <div
        className={`${ROW_HEIGHT} flex items-center justify-center bg-neutral-800 border-b border-neutral-700`}
      >
        <Text variant="caption" as="span">
          <span className="text-primary">Hora</span>
        </Text>
      </div>

      {/* Nombres de escenarios */}
      {scenarios.map((scenario) => (
        <div
          key={scenario.id}
          className={`${ROW_HEIGHT} flex items-center gap-2 px-3 bg-neutral-800 border-b border-neutral-700`}
        >
          <Text variant="label" as="span">
            <span className="text-neutral-100">{scenario.name}</span>
          </Text>
        </div>
      ))}
    </div>
  );
};
