import { Text } from "@/ui";
import { COLUMN_DURATION } from "../lineup.config";

const CELLS_PER_SLOT = 30 / COLUMN_DURATION; // cada slot = 30min = 3 columnas

interface TimeSlotCellProps {
  index: number;
  time: string;
}

export const TimeSlotCell = ({ index, time }: TimeSlotCellProps) => {
  const column = Math.floor(index * CELLS_PER_SLOT) + 1;

  const [hours] = time.split(":").map(Number);
  const formattedTime = hours >= 24 ? `+${hours - 24}:00` : time;

  return (
    <div
      className="flex items-center px-3 bg-neutral-700 border-x border-neutral-700 border-b-2 border-b-primary/20"
      style={{
        gridColumn: `${column} / span ${CELLS_PER_SLOT}`,
        gridRow: "1",
      }}
    >
      <Text variant="label" as="span">
        <span className="text-neutral-100">{formattedTime}</span>
      </Text>
    </div>
  );
};
