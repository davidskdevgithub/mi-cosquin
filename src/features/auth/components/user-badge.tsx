"use client";

import { Badge } from "@/ui";

interface UserBadgeProps {
  username: string;
}

export const UserBadge = ({ username }: UserBadgeProps) => {
  return (
    <Badge variant="primary" size="sm">
      <span className="inline-block w-2 h-2 rounded-full bg-white" />
      {username}
    </Badge>
  );
};
