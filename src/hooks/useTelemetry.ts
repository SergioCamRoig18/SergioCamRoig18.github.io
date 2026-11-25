import { useEffect, useState } from 'react';
import fallbackData from '../data/telemetry.fallback.json';
import type { HudSnapshot } from '../types/hud';

// Live telemetry synced daily from SergioCamRoig18 via GitHub Actions
const ENABLE_REMOTE_TELEMETRY = true;
const REMOTE_TELEMETRY_URL =
  'https://raw.githubusercontent.com/SergioCamRoig18/SergioCamRoig18/main/data/telemetry.json';

export function useTelemetry() {
  const [snapshot, setSnapshot] = useState<HudSnapshot>(fallbackData as HudSnapshot);
  const [isLiveRemote, setIsLiveRemote] = useState(false);

  useEffect(() => {
    if (!ENABLE_REMOTE_TELEMETRY) return;

    let cancelled = false;
    const controller = new AbortController();

    fetch(REMOTE_TELEMETRY_URL, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: HudSnapshot | null) => {
        if (!cancelled && data && data.version === 1 && data.metrics) {
          setSnapshot(data);
          setIsLiveRemote(true);
        }
      })
      .catch(() => {
        // Fallback snapshot already loaded — fail silently until Phase 2 remote JSON is published
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  return { snapshot, isLiveRemote };
}
