"use client";

interface UserBadgeProps {
  username: string;
}

export const UserBadge = ({ username }: UserBadgeProps) => {
  return (
    <div className="flex items-center gap-1.5 px-2 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-md">
      <span className="inline-block w-2 h-2 rounded-full bg-primary" />
      {username}
    </div>
  );
};
