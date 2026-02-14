import { Text } from "@/ui";
import { ROW_HEIGHT } from "../lineup.config";
import type { Scenario } from "../lineup.types";

interface ScenarioSidebarProps {
  scenarios: Scenario[];
}

export const ScenarioSidebar = ({ scenarios }: ScenarioSidebarProps) => {
  return (
    <div className="flex-none w-24 border-r-2 border-primary/40">
      {/* Header vacío - el botón de scroll está ahora en el LineupContainer */}
      <div
        className={`${ROW_HEIGHT} w-full bg-neutral-800 border-b border-neutral-700`}
      />

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
