"use client";

import { Text } from "@/ui";
import { cn } from "@/ui/utils/cn";
import { HEATMAP_COLORS } from "../rooms.config";
import { buildHeatmapEntries, groupHeatmapEntries } from "../rooms.helpers";
import type { MemberWithFavorites } from "../rooms.types";

interface RoomHeatmapProps {
  membersData: MemberWithFavorites[];
}

export const RoomHeatmap = ({ membersData }: RoomHeatmapProps) => {
  if (membersData.length < 2) {
    return (
      <div className="text-center py-4">
        <Text variant="body" as="p">
          <span className="text-neutral-400">
            Se necesitan al menos 2 miembros con favoritos para ver
            coincidencias.
          </span>
        </Text>
      </div>
    );
  }

  const entries = buildHeatmapEntries(membersData);
  const groups = groupHeatmapEntries(entries, membersData.length);

  if (entries.length === 0) {
    return (
      <div className="text-center py-4">
        <Text variant="body" as="p">
          <span className="text-neutral-400">
            Todavía no hay coincidencias. Marquen más favoritos.
          </span>
        </Text>
      </div>
    );
  }

  const getGroupColor = (label: string) => {
    if (label === "Todos van") return HEATMAP_COLORS.all;
    if (label === "La mayoría") return HEATMAP_COLORS.most;
    return HEATMAP_COLORS.some;
  };

  return (
    <div className="flex flex-col gap-4">
      {groups.map((group) => (
        <div key={group.label} className="flex flex-col gap-2">
          <Text variant="label" as="h4">
            <span className="text-neutral-300">{group.label}</span>
          </Text>

          <div className="flex flex-wrap gap-2">
            {group.entries.map((entry) => (
              <div
                key={entry.banda}
                className={cn(
                  "px-3 py-2 rounded-base flex flex-col gap-0.5",
                  getGroupColor(group.label),
                )}
              >
                <Text variant="label" as="span">
                  <span className="font-semibold">{entry.banda}</span>
                </Text>
                <Text variant="caption" as="span">
                  <span className="opacity-80">
                    {entry.count}/{membersData.length} —{" "}
                    {entry.members.join(", ")}
                  </span>
                </Text>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
