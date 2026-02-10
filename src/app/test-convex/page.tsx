"use client";

import { api } from "@convex/_generated/api";
import { useQuery } from "convex/react";

export default function TestConvex() {
  const message = useQuery(api.example.hello);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          🚀 Test Convex
        </h1>

        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Estado de conexión:
            </p>
            {message === undefined ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600" />
                <p className="text-gray-700 dark:text-gray-300">
                  Conectando...
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse" />
                <p className="text-green-600 dark:text-green-400 font-semibold">
                  Conectado
                </p>
              </div>
            )}
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Mensaje desde el servidor:
            </p>
            <p className="text-lg font-semibold text-indigo-900 dark:text-indigo-100">
              {message || "Cargando..."}
            </p>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              ✅ Convex está funcionando correctamente
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
