"use client";

import { Badge, Text } from "@/ui";
import type { RoomMember } from "../rooms.types";

interface RoomMembersProps {
  members: RoomMember[];
  currentUserId: string;
}

export const RoomMembers = ({ members, currentUserId }: RoomMembersProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {members.map((member) => (
        <Badge
          key={member.userId}
          variant={member.userId === currentUserId ? "primary" : "neutral"}
          size="sm"
        >
          {member.username}
          {member.userId === currentUserId && (
            <Text variant="caption" as="span">
              <span className="opacity-70"> (vos)</span>
            </Text>
          )}
        </Badge>
      ))}
    </div>
  );
};
