import { Settings } from "@/lib/types";

export const useSettings = () => {
    function getSettings(): Settings | null {
        const data = localStorage.getItem("settings");
        if (data == null) return null;
        return JSON.parse(data) as Settings;
    }

    function updateSettings(updated: Settings) {
        localStorage.setItem("settings", JSON.stringify(updated));
    }

    return { getSettings, updateSettings };
}