import { ROW_HEIGHT } from "../lineup.config";

interface EventsGridProps {
  children: React.ReactNode;
  columns: number;
}

export const EventsGrid = ({ children, columns }: EventsGridProps) => {
  return (
    <div
      className={`${ROW_HEIGHT} grid gap-px border-b border-neutral-700`}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(40px, 1fr))`,
      }}
    >
      {children}
    </div>
  );
};
