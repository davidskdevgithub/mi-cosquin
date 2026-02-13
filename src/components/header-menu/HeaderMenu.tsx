"use client";

import { ChevronLeft, ChevronRight, Settings, User, Users } from "lucide-react";
import { Text } from "@/ui";
import { Sheet } from "@/ui/sheet";

export type MenuView = "main" | "rooms" | "profile";

interface HeaderMenuProps {
  isLoggedIn: boolean;
  currentView: MenuView;
  onViewChange: (view: MenuView) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  /** Contenido para la vista de profile */
  profileContent?: React.ReactNode;
  /** Contenido para la vista de rooms */
  roomsContent?: React.ReactNode;
}

export const HeaderMenu = ({
  isLoggedIn,
  currentView,
  onViewChange,
  isOpen,
  onOpen,
  onClose,
  profileContent,
  roomsContent,
}: HeaderMenuProps) => {
  const getTitle = () => {
    if (currentView === "profile") return "Mi perfil";
    if (currentView === "rooms") return "Salas de amigos";
    return "Menú";
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          onViewChange("main");
          onOpen();
        }}
        className="p-2 rounded-md hover:bg-neutral-700 transition-colors cursor-pointer"
        aria-label="Menú"
      >
        <Settings className="w-5 h-5 text-neutral-300" />
      </button>

      <Sheet open={isOpen} onClose={onClose} side="bottom">
        <div className="flex flex-col gap-2">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-neutral-700">
            <div className="flex items-center gap-2">
              {currentView !== "main" && (
                <button
                  type="button"
                  onClick={() => onViewChange("main")}
                  className="p-1 -ml-1 hover:bg-neutral-700 rounded-md cursor-pointer"
                  aria-label="Volver"
                >
                  <ChevronLeft className="w-5 h-5 text-neutral-400" />
                </button>
              )}
              <Text variant="label" as="h2">
                <span className="text-neutral-100">{getTitle()}</span>
              </Text>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-neutral-400 hover:text-neutral-200 cursor-pointer"
            >
              Cerrar
            </button>
          </div>

          {/* Main Menu */}
          {currentView === "main" && (
            <div className="flex flex-col gap-1">
              {isLoggedIn ? (
                <>
                  <MenuItem
                    icon={<User className="w-5 h-5" />}
                    label="Mi perfil"
                    onClick={() => onViewChange("profile")}
                  />
                  <MenuItem
                    icon={<Users className="w-5 h-5" />}
                    label="Salas de amigos"
                    onClick={() => onViewChange("rooms")}
                  />
                </>
              ) : (
                <MenuItem
                  icon={<User className="w-5 h-5" />}
                  label="Iniciar sesión"
                  onClick={() => onViewChange("profile")}
                />
              )}
            </div>
          )}

          {/* Profile View */}
          {currentView === "profile" && profileContent}

          {/* Rooms View */}
          {currentView === "rooms" && roomsContent}
        </div>
      </Sheet>
    </>
  );
};

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const MenuItem = ({ icon, label, onClick }: MenuItemProps) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center justify-between w-full px-3 py-3 rounded-md hover:bg-neutral-700 transition-colors cursor-pointer text-left"
  >
    <div className="flex items-center gap-3">
      <span className="text-neutral-400">{icon}</span>
      <Text variant="body" as="span">
        <span className="text-neutral-100">{label}</span>
      </Text>
    </div>
    <ChevronRight className="w-4 h-4 text-neutral-500" />
  </button>
);
