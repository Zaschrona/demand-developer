(function () {
  "use strict";

  const TAG = "[DemandDevelopment]";
  const api = window.SubwayBuilderAPI;
  if (!api) {
    console.error(`${TAG} SubwayBuilderAPI not found.`);
    return;
  }

  const CFG = {
    STEP: 200,
    BASE_STEP_COST: 21000000,
    COST_ROUNDING: 1000000,
    CREATE_PREMIUM: 1.30,
    MAP_GROWTH_PRICE_STRENGTH: 10,

    LOCAL_MAX_RADIUS_M: 2500,
    LOCAL_DECAY_SCALE_M: 900,
    LOCAL_DECAY_EXP: 1.65,
    LOCAL_COUNT_MIN_MASS: 100,
    LOCAL_COUNT_DECAY_SCALE_M: 1000,
    LOCAL_COUNT_DECAY_EXP: 1.55,

    CITY_MAX_RADIUS_M: 6500,
    CITY_DECAY_SCALE_M: 2600,
    CITY_DECAY_EXP: 1.55,
    CITY_COUNT_MIN_MASS: 100,

    ACCESS_INNER_RADIUS_M: 5500,
    ACCESS_DECAY_SCALE_M: 28000,
    ACCESS_DECAY_EXP: 2.15,
    ACCESS_POINT_MIN_MASS: 100,

    ACCESS_NEAR_BAND_END_M: 15000,
    ACCESS_MID_BAND_END_M: 30000,
    ACCESS_RETENTION_BASE: 0.75,
    ACCESS_RETENTION_NEAR_SHARE: 0.25,
    ACCESS_RETENTION_MID_SHARE: 0.10,

    ACCESS_SATURATION_LOW: 0.45,
    ACCESS_SATURATION_HIGH: 0.95,
    ACCESS_COMPACTNESS_NEAR_LOW: 0.04,
    ACCESS_COMPACTNESS_NEAR_HIGH: 0.30,
    ACCESS_COMPACTNESS_FLOOR: 0.72,

    NEAR_METRO_INNER_RADIUS_M: 2500,
    NEAR_METRO_DECAY_SCALE_M: 6500,
    NEAR_METRO_DECAY_EXP: 3.4,
    NEAR_METRO_POINT_MIN_MASS: 100,

    LOCATION_FLOOR_TERM: 0.36,
    SETTLEMENT_MAX_TERM: 0.46,
    SETTLEMENT_MASS_LOW: 500,
    SETTLEMENT_MASS_HIGH: 80000,
    SETTLEMENT_COUNT_LOW: 1.5,
    SETTLEMENT_COUNT_HIGH: 20,

    RURAL_SETTLEMENT_MAX_TERM: 0.14,
    RURAL_SETTLEMENT_MASS_LOW: 20,
    RURAL_SETTLEMENT_MASS_HIGH: 4000,
    ACCESS_MAX_TERM: 1.12,
    ACCESS_MASS_LOW: 500000,
    ACCESS_MASS_HIGH: 4000000,
    CORE_MASS_THRESHOLD: 110000,
    CORE_MASS_SCALE: 170000,
    CORE_COUNT_THRESHOLD: 12,
    CORE_COUNT_SCALE: 20,
    CORE_STRENGTH: 0.72,
    CORE_MAX_TERM: 2.20,
    CORE_LOCAL_SUPPORT_BASE: 0.55,
    CORE_LOCAL_SUPPORT_LOW: 12000,
    CORE_LOCAL_SUPPORT_HIGH: 80000,

    NEAR_METRO_MAX_TERM: 0.72,
    NEAR_METRO_MASS_LOW: 100000,
    NEAR_METRO_MASS_HIGH: 650000,

    METRO_CONTINUITY_CONTACT_LOW: 0.04,
    METRO_CONTINUITY_CONTACT_HIGH: 0.07,
    METRO_CONTINUITY_ACCESS_LOW: 0.45,
    METRO_CONTINUITY_ACCESS_HIGH: 0.60,

    NORMAL_TAIL_MASS_THRESHOLD: 100000,
    NORMAL_TAIL_MASS_SCALE: 60000,
    NORMAL_TAIL_STRENGTH: 0.35,

    ULTRA_TAIL_CONTEXT_RADIUS_M: 1250,

    DONOR_COUNT: 16,
    DONOR_DISTANCE_SCALE_M: 1500,
    DONOR_DISTANCE_EXP: 1.35,
    DONOR_TARGET_BOOST: 2.0,
    DONOR_RING_NEIGHBORS: 3,
    DONOR_RING_WEIGHT: 0.45,
    DONOR_POOL_CAP: 32,
    REPEAT_USE_STRENGTH: 0.5,
    EXISTING_LINK_MULTIPLIER: 0.30,
    ACTION_REPEAT_USE_STRENGTH: 3.0,
    NEW_POINT_ACTION_REPEAT_USE_STRENGTH: 6.0,
    NEW_POINT_MIN_LINKS: 8,
    SCORE_RANDOMNESS: 0.10,
    MAX_LINKS: 18,
    MIN_LINKS: 3,
    DEFAULT_LINKS: 8,
    SIGNIFICANT_SHARE: 0.02,
    SIGNIFICANT_PEOPLE: 5,
    MIN_FLOW: 5,
    FLOW_SIZE_VARIATION: 0.45,
    FLOW_CAP_HEADROOM_PEOPLE: 24,
    MIN_COUNTERPOINTS: 2,
    MAX_SHARE_FLOOR: 0.12,
    MAX_SHARE_CEIL: 0.30,
    MAX_SHARE_MULT: 1.25,
    FALLBACK_SCORE_SCALE: 0.12,
    FALLBACK_DISTANCE_SCALE_M: 4000,
    NOVELTY_CANDIDATE_POOL: 64,
    SECONDARY_GROWTH_DAMPING: 0.6,
    NEW_POINT_PREFIX: "demand-dev-pt:",
    POP_PREFIX: "demand-dev-pop:",
    SOURCE_ID: "demand-developer-ui-points-v3",
    CONTEXT_LAYER_ID: "demand-developer-context-layer-v3",
    PENDING_LAYER_ID: "demand-developer-pending-layer-v3",
    LEGACY_SOURCE_ID: "demand-developer-points",
    LEGACY_LAYER_ID: "demand-developer-points-layer",
    PANEL_ID: "demand-developer-panel",
    STORAGE_PREFIX: "demand-developer:ledger:",
  };
  const DEVELOPMENT_AMOUNTS = [200, 400, 600, 800, 1000];
  const MAX_DEVELOPMENT_AMOUNT = 1000;
  const NEW_POINT_NATIVE_ANCHOR_MAX_M = 5000;

  const EARTH_RADIUS_M = 6371008.8;
  const toRad = (d) => d * Math.PI / 180;
  function haversine(a, b) {
    const [lon1, lat1] = a;
    const [lon2, lat2] = b;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const s = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return 2 * EARTH_RADIUS_M * Math.asin(Math.min(1, Math.sqrt(s)));
  }

  function clamp(x, lo, hi) { return Math.max(lo, Math.min(hi, x)); }
  function fmtMoney(v) {
    if (v >= 1e9) return `$${(v / 1e9).toFixed(v >= 1e10 ? 0 : 1)}B`;
    if (v >= 1e6) {
      const m = v / 1e6;
      const text = v >= 1e8 ? m.toFixed(0) : m.toFixed(1).replace(/\.0$/, "");
      return `$${text}M`;
    }
    if (v >= 1e3) return `$${(v / 1e3).toFixed(0)}K`;
    return `$${Math.round(v).toLocaleString()}`;
  }
  function fmtBalance(v) {
    const n = Number(v) || 0;
    if (Math.abs(n) >= 1e9) return `$${(n / 1e9).toFixed(3)}B`;
    if (Math.abs(n) >= 1e6) return `$${Math.round(n / 1e6).toLocaleString()}M`;
    if (Math.abs(n) >= 1e3) return `$${Math.round(n / 1e3).toLocaleString()}K`;
    return `$${Math.round(n).toLocaleString()}`;
  }

  function currentCity() {
    try { return api.utils.getCityCode?.() || "unknown"; }
    catch { return "unknown"; }
  }

  function safeBudget() {
    try {
      const v = api.gameState.getBudget();
      return Number.isFinite(v) ? v : 0;
    } catch { return 0; }
  }

  let modStorage = null;
  try { modStorage = api.storage?.scoped?.() || null; }
  catch (e) { console.warn(`${TAG} scoped storage unavailable`, e); }

  function legacyStorage() {
    try { return window.localStorage; }
    catch { return null; }
  }

  function newLedger() {
    return {
      version: 3,
      seq: 1,
      pointSeq: 1,
      points: {},
      pops: {},
      actions: [],
      originalMapDemand: null,
    };
  }

  function migrateLedger(raw) {
    const base = newLedger();
    const source = raw && typeof raw === "object" ? raw : {};
    const sourceVersion = Number(source.version || 1);
    const migrated = { ...base, ...source };
    migrated.points = source.points && typeof source.points === "object" ? source.points : {};
    migrated.pops = source.pops && typeof source.pops === "object" ? source.pops : {};
    migrated.actions = Array.isArray(source.actions) ? source.actions.map((action) => {
      if (!action || typeof action !== "object") return action;
      const { flows, popIds, ...summary } = action;
      if (!(Number(summary.chargedCost) >= 0)) {
        const quoted = Math.max(0, Number(summary.cost) || 0);
        summary.chargedCost = sourceVersion >= 2 ? quoted * 2 : quoted;
        summary.chargeMethod = sourceVersion >= 2 ? "legacy-subtractMoney" : "legacy-setMoney";
      }
      return summary;
    }).filter(Boolean) : [];
    for (const rec of Object.values(migrated.pops)) {
      if (!rec || typeof rec !== "object") continue;
      if (!("active" in rec)) rec.active = true;
    }
    migrated.version = 3;
    return migrated;
  }

  function readLiveSaveName() {
    try {
      const name = api.gameState.getSaveName?.();
      return typeof name === "string" && name.length > 0 ? name : null;
    } catch { return null; }
  }

  function resolveSavedSlotName(saveName) {
    const hookName = typeof saveName === "string" && saveName.length > 0 ? saveName : null;
    const liveName = readLiveSaveName();
    if (hookName === "Autosave" && liveName) return liveName;
    return hookName ?? liveName;
  }

  let ledger = newLedger();
  let demandRevision = 0;
  const nearestStationsCache = new Map();
  let activeDevelopmentGroupsCache = null;
  let developmentInfoStatsCache = null;

  function clearDevelopmentSummaryCaches() {
    activeDevelopmentGroupsCache = null;
    developmentInfoStatsCache = null;
  }

  let loadedLedgerKey = null;
  let ledgerSaveChain = Promise.resolve();
  let ledgerLoadToken = 0;
  let currentSaveName = null;

  function sessionLedgerBaseKey() {
    try {
      const sessionId = api.gameState.getGameSessionId?.();
      return sessionId ? `${CFG.STORAGE_PREFIX}session:${sessionId}` : null;
    } catch { return null; }
  }

  function saveSlotKeyPart(name) {
    return encodeURIComponent(name ?? "_unsaved");
  }

  function ledgerKeyForSaveName(saveName) {
    const base = sessionLedgerBaseKey();
    return base ? `${base}:save:${saveSlotKeyPart(saveName)}` : null;
  }

  function ledgerKey() {
    return ledgerKeyForSaveName(currentSaveName);
  }

  function legacySessionLedgerKey() {
    return sessionLedgerBaseKey();
  }

  function slotMigrationMarkerKey() {
    const base = sessionLedgerBaseKey();
    return base ? `${base}:save-slots-v3-migrated` : null;
  }

  function parseLedgerCandidate(value) {
    if (value == null) return null;
    if (typeof value === "string") {
      try { return JSON.parse(value); }
      catch { return null; }
    }
    return typeof value === "object" ? value : null;
  }

  async function loadLedger(expectedEpoch = lifecycleEpoch, expectedToken = ledgerLoadToken) {
    clearDevelopmentSummaryCaches();
    if (currentSaveName == null) currentSaveName = readLiveSaveName();
    const key = ledgerKey();
    if (!key) {
      ledger = newLedger();
      loadedLedgerKey = null;
      return { found: false, migratedSessionLedger: false, needsLegacyRepair: false };
    }

    let raw = null;
    let migratedFromLegacyLocalStorage = false;
    let migratedSessionLedger = false;
    try {
      if (modStorage) raw = parseLedgerCandidate(await modStorage.get(key, null));
    } catch (e) {
      console.warn(`${TAG} failed to load save-slot ledger`, e);
    }

    if (!raw) {
      try {
        raw = parseLedgerCandidate(legacyStorage()?.getItem?.(key));
        migratedFromLegacyLocalStorage = !!raw;
      } catch (e) {
        console.warn(`${TAG} failed to read save-slot fallback ledger`, e);
      }
    }

    if (!raw) {
      const markerKey = slotMigrationMarkerKey();
      let alreadyMigrated = false;
      try {
        if (markerKey && modStorage) alreadyMigrated = !!(await modStorage.get(markerKey, null));
        if (!alreadyMigrated && markerKey) alreadyMigrated = !!legacyStorage()?.getItem?.(markerKey);
      } catch {}
      if (!alreadyMigrated) {
        const oldKey = legacySessionLedgerKey();
        try {
          if (oldKey && modStorage) raw = parseLedgerCandidate(await modStorage.get(oldKey, null));
        } catch (e) { console.warn(`${TAG} failed to read pre-v3 session ledger`, e); }
        if (!raw && oldKey) {
          try { raw = parseLedgerCandidate(legacyStorage()?.getItem?.(oldKey)); } catch {}
        }
        migratedSessionLedger = !!raw;
      }
    }

    if (expectedEpoch !== lifecycleEpoch || expectedToken !== ledgerLoadToken || ledgerKey() !== key) {
      return { found: false, migratedSessionLedger: false, needsLegacyRepair: false };
    }

    const sourceVersion = Number(raw?.version || 0);
    ledger = migrateLedger(raw);
    loadedLedgerKey = key;

    if (raw && (migratedSessionLedger || migratedFromLegacyLocalStorage || sourceVersion < 3)) {
      await saveLedger();
      if (migratedSessionLedger) {
        const markerKey = slotMigrationMarkerKey();
        const marker = { migratedAt: Date.now(), saveName: currentSaveName };
        try {
          if (markerKey && modStorage) await modStorage.set(markerKey, marker);
          else if (markerKey) legacyStorage()?.setItem?.(markerKey, JSON.stringify(marker));
        } catch {}
      }
      if (migratedFromLegacyLocalStorage && modStorage) {
        try {
          const stored = parseLedgerCandidate(await modStorage.get(key, null));
          if (Number(stored?.version || 0) >= 3) legacyStorage()?.removeItem?.(key);
        } catch {}
      }
    }
    return { found: !!raw, migratedSessionLedger, needsLegacyRepair: !!raw && sourceVersion < 3 };
  }

  function saveLedger() {
    clearDevelopmentSummaryCaches();
    const key = ledgerKey();
    if (!key || loadedLedgerKey !== key) return Promise.resolve(false);
    const snapshot = JSON.parse(JSON.stringify(ledger));

    ledgerSaveChain = ledgerSaveChain.then(async () => {
      try {
        if (modStorage) {
          await modStorage.set(key, snapshot);
          return true;
        }
        const legacy = legacyStorage();
        if (!legacy) return false;
        legacy.setItem(key, JSON.stringify(snapshot));
        return true;
      } catch (e) {
        console.warn(`${TAG} failed to save ledger`, e);
        try {
          const legacy = legacyStorage();
          if (legacy) {
            legacy.setItem(key, JSON.stringify(snapshot));
            return true;
          }
        } catch {}
        return false;
      }
    });
    return ledgerSaveChain;
  }

  const MODE_SHARE_KEYS = ["walking", "driving", "transit", "unknown"];

  function copyModeShare(value) {
    if (!value || typeof value !== "object") return null;
    const out = {};
    for (const key of MODE_SHARE_KEYS) {
      const n = Number(value[key]);
      out[key] = Number.isFinite(n) && n >= 0 ? n : 0;
    }
    return out;
  }

  function modeShareTotal(value) {
    const share = copyModeShare(value);
    return share ? MODE_SHARE_KEYS.reduce((sum, key) => sum + share[key], 0) : 0;
  }

  function scaledModeShare(value, targetTotal) {
    const share = copyModeShare(value);
    if (!share) return null;
    const target = Math.max(0, Number(targetTotal) || 0);
    const current = MODE_SHARE_KEYS.reduce((sum, key) => sum + share[key], 0);
    if (current <= 1e-9) return target <= 1e-9 ? share : null;
    if (Math.abs(current - target) <= 1e-6) return share;
    const factor = target / current;
    for (const key of MODE_SHARE_KEYS) share[key] *= factor;
    return share;
  }

  function captureOwnedPointModeShares(dd = api.gameState.getDemandData?.()) {
    if (!dd?.points) return 0;
    let changed = 0;
    for (const [id, rec] of Object.entries(ledger.points || {})) {
      if (!rec?.created) continue;
      const point = looseMapGet(dd.points, id);
      if (!point) continue;
      const resident = copyModeShare(point.residentModeShare);
      const worker = copyModeShare(point.workerModeShare);
      const beforeResident = JSON.stringify(rec.residentModeShare ?? null);
      const beforeWorker = JSON.stringify(rec.workerModeShare ?? null);
      if (resident && ((Number(point.residents) || 0) <= 1e-9 || modeShareTotal(resident) > 1e-9)) rec.residentModeShare = resident;
      if (worker && ((Number(point.jobs) || 0) <= 1e-9 || modeShareTotal(worker) > 1e-9)) rec.workerModeShare = worker;
      if (beforeResident !== JSON.stringify(rec.residentModeShare ?? null) || beforeWorker !== JSON.stringify(rec.workerModeShare ?? null)) changed++;
    }
    return changed;
  }

  function restoreOwnedPointModeShares(dd = api.gameState.getDemandData?.()) {
    if (!dd?.points) return 0;
    let restored = 0;
    for (const [id, rec] of Object.entries(ledger.points || {})) {
      if (!rec?.created) continue;
      const point = looseMapGet(dd.points, id);
      if (!point) continue;
      const resident = scaledModeShare(rec.residentModeShare, point.residents);
      const worker = scaledModeShare(rec.workerModeShare, point.jobs);
      let changed = false;
      if (resident) {
        point.residentModeShare = resident;
        changed = true;
      }
      if (worker) {
        point.workerModeShare = worker;
        changed = true;
      }
      if (changed) restored++;
    }
    return restored;
  }

  function pointHasPopId(point, popId) {
    const ids = point?.popIds;
    if (!ids || typeof ids === "string" || typeof ids[Symbol.iterator] !== "function") return false;
    const wanted = String(popId);
    for (const id of ids) if (String(id) === wanted) return true;
    return false;
  }

  function addPointPopId(point, popId) {
    if (!point) return false;
    const wanted = String(popId);
    const ids = point.popIds;
    if (Array.isArray(ids)) {
      if (!ids.some((id) => String(id) === wanted)) ids.push(popId);
      return true;
    }
    if (ids && typeof ids.add === "function") { ids.add(popId); return true; }
    point.popIds = [popId];
    return true;
  }

  function removePointPopId(point, popId) {
    if (!point) return;
    const wanted = String(popId);
    const ids = point.popIds;
    if (Array.isArray(ids)) {
      for (let i = ids.length - 1; i >= 0; i--) if (String(ids[i]) === wanted) ids.splice(i, 1);
      return;
    }
    if (ids && typeof ids.delete === "function") {
      for (const id of [...ids]) if (String(id) === wanted) ids.delete(id);
    }
  }

  function cloneJsonSafe(value) {
    if (value == null) return value;
    try { return JSON.parse(JSON.stringify(value)); } catch { return undefined; }
  }

  function capturePopRuntimeIntoRecord(rec, live) {
    if (!rec || !live) return false;
    const before = JSON.stringify([
      rec.drivingDistance ?? null, rec.drivingSeconds ?? null,
      rec.homeDepartureTime ?? null, rec.workDepartureTime ?? null,
      rec.drivingPath ?? null, rec.lastCommute ?? null
    ]);
    const distance = Number(live.drivingDistance);
    const seconds = Number(live.drivingSeconds);
    const home = Number(live.homeDepartureTime);
    const work = Number(live.workDepartureTime);
    if (Number.isFinite(distance) && distance > 0) rec.drivingDistance = distance;
    if (Number.isFinite(seconds) && seconds > 0) rec.drivingSeconds = seconds;
    if (Number.isFinite(home)) rec.homeDepartureTime = home;
    if (Number.isFinite(work)) rec.workDepartureTime = work;
    const path = cloneJsonSafe(live.drivingPath);
    if (path !== undefined) rec.drivingPath = path;
    const last = cloneJsonSafe(live.lastCommute);
    if (last !== undefined) rec.lastCommute = last;
    return before !== JSON.stringify([
      rec.drivingDistance ?? null, rec.drivingSeconds ?? null,
      rec.homeDepartureTime ?? null, rec.workDepartureTime ?? null,
      rec.drivingPath ?? null, rec.lastCommute ?? null
    ]);
  }

  function fallbackDepartureTimes(popId) {
    const a = mixedDeterministicUnit(`${popId}:home`);
    const b = mixedDeterministicUnit(`${popId}:work`);
    return {
      homeDepartureTime: Math.floor((6.5 + 3.5 * a) * 3600),
      workDepartureTime: Math.floor((15.5 + 4.5 * b) * 3600),
    };
  }

  function materializeLedgerPop(dd, popId, rec) {
    const res = looseMapGet(dd?.points, rec?.residenceId);
    const job = looseMapGet(dd?.points, rec?.jobId);
    if (!dd?.popsMap || !res || !job || !rec || !(Number(rec.size) > 0)) return false;
    const id = String(popId);
    const fallback = fallbackDepartureTimes(id);
    const pop = {
      id,
      size: Number(rec.size),
      residenceId: rec.residenceId,
      jobId: rec.jobId,
      drivingDistance: Number(rec.drivingDistance) || 0,
      drivingSeconds: Number(rec.drivingSeconds) || 0,
      homeDepartureTime: Number.isFinite(Number(rec.homeDepartureTime)) ? Number(rec.homeDepartureTime) : fallback.homeDepartureTime,
      workDepartureTime: Number.isFinite(Number(rec.workDepartureTime)) ? Number(rec.workDepartureTime) : fallback.workDepartureTime,
    };
    if (Array.isArray(rec.drivingPath)) pop.drivingPath = cloneJsonSafe(rec.drivingPath);
    if (rec.lastCommute && typeof rec.lastCommute === "object") {
      pop.lastCommute = cloneJsonSafe(rec.lastCommute);
    } else {
      pop.lastCommute = {
        modeChoice: { walking: 0, driving: 0, transit: 0, unknown: Number(rec.size) || 0 },
        transitPaths: [],
        walking: { time: 0, distance: 0 },
      };
    }
    dd.popsMap.set(id, pop);
    addPointPopId(res, id);
    if (String(rec.jobId) !== String(rec.residenceId)) addPointPopId(job, id);
    return true;
  }

  function detachLedgerPopObject(dd, popId, rec) {
    if (!dd?.popsMap) return;
    const key = looseMapKey(dd.popsMap, popId);
    if (key != null) dd.popsMap.delete(key);
    removePointPopId(looseMapGet(dd.points, rec?.residenceId), key ?? popId);
    if (String(rec?.jobId) !== String(rec?.residenceId)) removePointPopId(looseMapGet(dd.points, rec?.jobId), key ?? popId);
  }

  function reconcilePointTotalsFromLedger(dd) {
    if (!dd?.points) return 0;
    rebuildLedgerPointAdditions();
    let changed = 0;
    for (const [pointId, rec] of Object.entries(ledger.points || {})) {
      if (!rec) continue;
      const point = looseMapGet(dd.points, pointId);
      if (!point) continue;
      const minResidents = Math.max(0, (Number(rec.baselineResidents) || 0) + (Number(rec.addedResidents) || 0));
      const minJobs = Math.max(0, (Number(rec.baselineJobs) || 0) + (Number(rec.addedJobs) || 0));
      if ((Number(point.residents) || 0) + 0.001 < minResidents) { point.residents = minResidents; changed++; }
      if ((Number(point.jobs) || 0) + 0.001 < minJobs) { point.jobs = minJobs; changed++; }
    }
    return changed;
  }

  function liveOwnedPopIsComplete(dd, popId, rec) {
    if (!dd?.points || !dd?.popsMap || !rec) return false;
    const key = looseMapKey(dd.popsMap, popId);
    if (key == null) return false;
    const live = dd.popsMap.get(key);
    if (!popMatchesLedgerRecord(live, rec)) return false;
    const residence = looseMapGet(dd.points, rec.residenceId);
    const job = looseMapGet(dd.points, rec.jobId);
    if (!residence || !job) return false;
    return pointHasPopId(residence, key) && pointHasPopId(job, key);
  }

  function ledgerNeedsLiveRestore(dd = api.gameState.getDemandData?.()) {
    if (!dd?.points || !dd?.popsMap) return false;
    for (const [popId, rec] of Object.entries(ledger.pops || {})) {
      if (!rec || rec.active === false || !(Number(rec.size) > 0)) continue;
      if (!liveOwnedPopIsComplete(dd, popId, rec)) return true;
    }
    for (const [pointId, rec] of Object.entries(ledger.points || {})) {
      if (!rec?.created) continue;
      const ownsActiveDemand = Object.values(ledger.pops || {}).some((pop) =>
        pop && pop.active !== false &&
        (String(pop.residenceId) === String(pointId) || String(pop.jobId) === String(pointId))
      );
      if (ownsActiveDemand && looseMapKey(dd.points, pointId) == null) return true;
    }
    return false;
  }

  function captureOwnedPopSnapshots(dd = api.gameState.getDemandData?.()) {
    if (!dd?.popsMap) return 0;
    let changed = 0;
    for (const [ledgerId, rec] of Object.entries(ledger.pops || {})) {
      if (!rec || rec.active === false) continue;
      const key = looseMapKey(dd.popsMap, ledgerId);
      if (key == null || !liveOwnedPopIsComplete(dd, key, rec)) continue;
      const live = dd.popsMap.get(key);
      if (capturePopRuntimeIntoRecord(rec, live)) changed++;
    }
    return changed;
  }

  function pointLedger(id, point) {
    let rec = ledger.points[id];
    if (!rec) {
      rec = ledger.points[id] = {
        baselineResidents: point?.residents ?? 0,
        baselineJobs: point?.jobs ?? 0,
        addedResidents: 0,
        addedJobs: 0,
        created: false,
      };
    }
    if (point?.location && !rec.location) {
      rec.location = Array.isArray(point.location) ? [...point.location] : point.location;
    }
    return rec;
  }

  function cloneDemandData(dd) {
    const points = new Map();
    for (const [id, p] of dd.points) {
      points.set(id, { ...p, popIds: [...(p.popIds || [])] });
    }
    return { points, popsMap: new Map(dd.popsMap) };
  }

  const DEFAULT_DRIVING_BANDS = [
    { maxMeters: 1000, detour: 1.60, speed: 7.20 },
    { maxMeters: 2500, detour: 1.52, speed: 8.59 },
    { maxMeters: 5000, detour: 1.41, speed: 10.57 },
    { maxMeters: 10000, detour: 1.37, speed: 12.59 },
    { maxMeters: 20000, detour: 1.33, speed: 14.08 },
    { maxMeters: Infinity, detour: 1.29, speed: 16.76 },
  ];
  function bandFor(m) {
    return DEFAULT_DRIVING_BANDS.find((b) => m < b.maxMeters) || DEFAULT_DRIVING_BANDS[DEFAULT_DRIVING_BANDS.length - 1];
  }
  function buildDrivingDonors(dd) {
    const bands = DEFAULT_DRIVING_BANDS.map(() => []);
    for (const pop of dd.popsMap.values()) {
      if (!(pop.drivingSeconds > 0) || !(pop.drivingDistance > 0)) continue;
      const r = dd.points.get(pop.residenceId);
      const j = dd.points.get(pop.jobId);
      if (!r || !j) continue;
      const straight = haversine(r.location, j.location);
      if (straight < 50) continue;
      const detour = pop.drivingDistance / straight;
      const speed = pop.drivingDistance / pop.drivingSeconds;
      if (!Number.isFinite(detour) || !Number.isFinite(speed) || speed <= 0) continue;
      const idx = DEFAULT_DRIVING_BANDS.findIndex((b) => straight < b.maxMeters);
      bands[idx < 0 ? bands.length - 1 : idx].push({ detour, speed });
    }
    return bands;
  }
  function deterministicUnit(seed) {
    let h = 2166136261;
    for (let i = 0; i < seed.length; i++) {
      h ^= seed.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return (h >>> 0) / 4294967296;
  }
  function mixedDeterministicUnit(seed) {
    let h = 2166136261;
    for (let i = 0; i < seed.length; i++) {
      h ^= seed.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    h ^= h >>> 16;
    h = Math.imul(h, 0x7feb352d);
    h ^= h >>> 15;
    h = Math.imul(h, 0x846ca68b);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  }
  function estimateDriving(dd, popId, residenceId, jobId, donorBands) {
    const r = dd.points.get(residenceId);
    const j = dd.points.get(jobId);
    if (!r || !j) return { distance: 0, seconds: 0 };
    const straight = Math.max(50, haversine(r.location, j.location));
    let idx = DEFAULT_DRIVING_BANDS.findIndex((b) => straight < b.maxMeters);
    if (idx < 0) idx = DEFAULT_DRIVING_BANDS.length - 1;
    let pool = donorBands[idx];
    if (!pool?.length) {
      for (let step = 1; step < donorBands.length && !pool?.length; step++) {
        pool = donorBands[idx - step]?.length ? donorBands[idx - step] : donorBands[idx + step]?.length ? donorBands[idx + step] : null;
      }
    }
    if (pool?.length) {
      const d = pool[Math.floor(deterministicUnit(popId) * pool.length) % pool.length];
      const distance = straight * d.detour;
      return { distance, seconds: distance / d.speed };
    }
    const b = bandFor(straight);
    const distance = straight * b.detour;
    return { distance, seconds: distance / b.speed };
  }

  function addPlannedPop(dd, residenceId, jobId, id, size, donorBands) {
    const res = dd.points.get(residenceId);
    const job = dd.points.get(jobId);
    if (!res || !job || !(size > 0)) return false;
    const drive = estimateDriving(dd, id, residenceId, jobId, donorBands);
    dd.popsMap.set(id, {
      id,
      size,
      residenceId,
      jobId,
      drivingDistance: drive.distance,
      drivingSeconds: drive.seconds,
    });
    res.popIds.push(id);
    job.popIds.push(id);
    res.residents += size;
    job.jobs += size;
    return true;
  }

  function allocateInteger(weights, total, caps) {
    const n = weights.length;
    const result = new Array(n).fill(0);
    const c = caps.map((x) => Math.max(0, Math.floor(x)));
    let remaining = Math.min(Math.max(0, Math.floor(total)), c.reduce((a, b) => a + b, 0));
    const w = weights.map((x) => Math.max(0, x));
    const sum = w.reduce((a, b) => a + b, 0);
    if (remaining <= 0 || sum <= 0) return result;
    const frac = [];
    for (let i = 0; i < n; i++) {
      const ideal = remaining * w[i] / sum;
      result[i] = Math.min(Math.floor(ideal), c[i]);
      frac.push({ i, f: ideal - Math.floor(ideal) });
    }
    remaining -= result.reduce((a, b) => a + b, 0);
    frac.sort((a, b) => b.f - a.f || a.i - b.i);
    while (remaining > 0) {
      let placed = false;
      for (const { i } of frac) {
        if (result[i] < c[i]) {
          result[i]++;
          remaining--;
          placed = true;
          if (!remaining) break;
        }
      }
      if (!placed) break;
    }
    return result;
  }

  function sideMass(point, side) {
    return side === "residential" ? (point.residents || 0) : (point.jobs || 0);
  }
  function donorWeight(distance, mass, isTarget) {
    const d = 1 / Math.pow(1 + distance / CFG.DONOR_DISTANCE_SCALE_M, CFG.DONOR_DISTANCE_EXP);
    const m = Math.sqrt(Math.max(1, mass));
    return d * m * (isTarget ? CFG.DONOR_TARGET_BOOST : 1);
  }

  function comparePointDistance(a, b, distanceKey = "distance") {
    return a[distanceKey] - b[distanceKey] || String(a.id).localeCompare(String(b.id));
  }

  function insertNearest(rows, row, limit, distanceKey = "distance") {
    let i = 0;
    while (i < rows.length && comparePointDistance(rows[i], row, distanceKey) <= 0) i++;
    rows.splice(i, 0, row);
    if (rows.length > limit) rows.pop();
  }

  function collectSameSideDonorDescriptors(dd, location, side, targetId) {
    const rows = [];
    for (const p of dd.points.values()) {
      const mass = sideMass(p, side);
      if (!(mass > 0)) continue;
      rows.push({ id: p.id, distance: haversine(location, p.location) });
    }
    rows.sort((a, b) => comparePointDistance(a, b));
    const primary = rows.slice(0, Math.min(CFG.DONOR_COUNT, rows.length));
    const byId = new Map();
    for (const r of primary) byId.set(String(r.id), { ...r, ring: false });

    for (const d of primary) {
      if (byId.size >= CFG.DONOR_POOL_CAP) break;
      const donorPoint = dd.points.get(d.id);
      if (!donorPoint) continue;
      const near = [];
      for (const r of rows) {
        if (String(r.id) === String(d.id) || byId.has(String(r.id))) continue;
        const p = dd.points.get(r.id);
        if (!p) continue;
        insertNearest(near, { ...r, donorDistance: haversine(donorPoint.location, p.location) }, CFG.DONOR_RING_NEIGHBORS, "donorDistance");
      }
      for (const r of near) {
        if (byId.size >= CFG.DONOR_POOL_CAP) break;
        byId.set(String(r.id), { id: r.id, distance: r.distance, ring: true });
      }
    }
    return [...byId.values()];
  }

  function donorProfile(dd, donorId, side) {
    const donor = dd.points.get(donorId);
    if (!donor) return null;
    const flows = new Map();
    let total = 0;
    for (const popId of donor.popIds || []) {
      const pop = dd.popsMap.get(popId);
      if (!pop || !(pop.size > 0)) continue;
      if (side === "residential") {
        if (pop.residenceId !== donorId || !dd.points.has(pop.jobId)) continue;
        flows.set(pop.jobId, (flows.get(pop.jobId) || 0) + pop.size);
      } else {
        if (pop.jobId !== donorId || !dd.points.has(pop.residenceId)) continue;
        flows.set(pop.residenceId, (flows.get(pop.residenceId) || 0) + pop.size);
      }
      total += pop.size;
    }
    if (!(total > 0) || flows.size === 0) return null;
    const shares = [...flows.entries()].map(([id, people]) => ({ id, people, share: people / total }));
    shares.sort((a, b) => b.share - a.share || String(a.id).localeCompare(String(b.id)));
    const significant = shares.filter((x) => x.people >= CFG.SIGNIFICANT_PEOPLE && x.share >= CFG.SIGNIFICANT_SHARE);
    const count = significant.length || Math.min(shares.length, 1);
    const maxShare = shares[0]?.share || 1;
    return { total, shares, count, maxShare };
  }

  function weightedQuantile(rows, q) {
    if (!rows.length) return 0;
    const sorted = [...rows].sort((a, b) => a.value - b.value);
    const total = sorted.reduce((sum, row) => sum + Math.max(0, row.weight || 0), 0);
    if (!(total > 0)) return sorted[Math.floor((sorted.length - 1) * q)]?.value || 0;
    const threshold = total * clamp(q, 0, 1);
    let seen = 0;
    for (const row of sorted) {
      seen += Math.max(0, row.weight || 0);
      if (seen >= threshold) return row.value;
    }
    return sorted[sorted.length - 1].value;
  }

  function localPopSizeProfile(dd, ctx, primarySide, targetId) {
    const samples = [];
    let totalWeight = 0;
    let stepAlignedWeight = 0;

    for (const d of ctx?.donorDescriptors || []) {
      const point = dd.points.get(d.id);
      if (!point) continue;
      const mass = sideMass(point, primarySide);
      if (!(mass > 0)) continue;
      const donorW = donorWeight(d.distance, mass, String(d.id) === String(targetId)) * (d.ring ? CFG.DONOR_RING_WEIGHT : 1);
      const ids = point.popIds;
      if (!ids || typeof ids === "string" || typeof ids[Symbol.iterator] !== "function") continue;

      for (const popId of ids) {
        if (String(popId).startsWith(CFG.POP_PREFIX)) continue;
        const pop = looseMapGet(dd.popsMap, popId);
        const size = Number(pop?.size) || 0;
        if (!(size > 0)) continue;
        if (primarySide === "residential") {
          if (String(pop.residenceId) !== String(point.id)) continue;
        } else if (String(pop.jobId) !== String(point.id)) continue;

        const w = donorW / Math.max(1, Number(ids.size ?? ids.length) || 1);
        samples.push({ value: size, weight: w });
        totalWeight += w;
        const units = size / CFG.STEP;
        if (Math.abs(units - Math.round(units)) < 1e-6) stepAlignedWeight += w;
      }
    }

    if (!samples.length) {
      return { typicalSize: CFG.STEP / CFG.DEFAULT_LINKS, q25: 0, q75: 0, stepAlignedShare: 0, sampleCount: 0 };
    }

    const median = weightedQuantile(samples, 0.5);
    const q25 = weightedQuantile(samples, 0.25);
    const q75 = weightedQuantile(samples, 0.75);
    const stepAlignedShare = totalWeight > 0 ? stepAlignedWeight / totalWeight : 0;

    const typicalSize = stepAlignedShare >= 0.70
      ? CFG.STEP
      : clamp(median || CFG.STEP / CFG.DEFAULT_LINKS, CFG.MIN_FLOW, CFG.STEP);

    return { typicalSize, q25, q75, stepAlignedShare, sampleCount: samples.length };
  }

  function ledgerGrowthDamping(pointId, oppositeSide, dd) {
    const p = dd.points.get(pointId);
    if (!p) return 0;
    const rec = ledger.points?.[pointId];
    if (!rec) return 1;
    const added = Number(oppositeSide === "jobs" ? rec.addedJobs : rec.addedResidents) || 0;
    const base = Number(oppositeSide === "jobs" ? rec.baselineJobs : rec.baselineResidents) || 0;
    const ratio = added / Math.max(1000, base);
    return 1 / (1 + CFG.SECONDARY_GROWTH_DAMPING * ratio);
  }

  function buildCounterpartUseIndex(primaryId, primarySide) {
    const uses = new Map();
    const primary = String(primaryId);
    for (const pop of Object.values(ledger.pops || {})) {
      if (!pop || pop.active === false || String(pop.primaryId || "") !== primary || pop.primarySide !== primarySide) continue;
      const other = primarySide === "residential" ? String(pop.jobId) : String(pop.residenceId);
      uses.set(other, (uses.get(other) || 0) + 1);
    }
    return uses;
  }

  function repetitionMultiplierFromIndex(useIndex, counterpartId) {
    const uses = useIndex?.get(String(counterpartId)) || 0;
    return 1 / (1 + CFG.REPEAT_USE_STRENGTH * uses);
  }

  function buildExistingCounterpartSet(dd, primaryId, primarySide) {
    const out = new Set();
    const primary = looseMapGet(dd?.points, primaryId);
    if (!primary) return out;
    for (const popId of primary.popIds || []) {
      const pop = looseMapGet(dd?.popsMap, popId);
      if (!pop || !(Number(pop.size) > 0)) continue;
      if (primarySide === "residential") {
        if (String(pop.residenceId) !== String(primaryId)) continue;
        out.add(String(pop.jobId));
      } else {
        if (String(pop.jobId) !== String(primaryId)) continue;
        out.add(String(pop.residenceId));
      }
    }
    return out;
  }

  function actionRepetitionMultiplier(ctx, counterpartId) {
    const uses = ctx?.actionUseIndex?.get(String(counterpartId)) || 0;
    if (!uses) return 1;
    const strength = ctx?.isCreate ? CFG.NEW_POINT_ACTION_REPEAT_USE_STRENGTH : CFG.ACTION_REPEAT_USE_STRENGTH;
    return 1 / (1 + strength * uses);
  }

  function existingLinkMultiplier(ctx, counterpartId) {
    return ctx?.existingCounterparts?.has(String(counterpartId)) ? CFG.EXISTING_LINK_MULTIPLIER : 1;
  }

  function createSecondaryContext(dd, location, primarySide, targetId, options = {}) {
    const donorDescriptors = collectSameSideDonorDescriptors(dd, location, primarySide, targetId);
    const donorProfiles = new Map();
    for (const d of donorDescriptors) {
      if (String(d.id) === String(targetId)) continue;
      donorProfiles.set(d.id, donorProfile(dd, d.id, primarySide));
    }
    const oppositeSideName = primarySide === "residential" ? "jobs" : "residents";
    const fallback = [];
    for (const p of dd.points.values()) {
      if (String(p.id) === String(targetId)) continue;
      const mass = oppositeSideName === "jobs" ? p.jobs : p.residents;
      if (!(mass > 0)) continue;
      const distance = haversine(location, p.location);
      fallback.push({
        id: p.id,
        distance,
        distWeight: 1 / Math.pow(1 + distance / CFG.FALLBACK_DISTANCE_SCALE_M, 1.25),
      });
    }
    return {
      targetId: String(targetId),
      primarySide,
      donorDescriptors,
      donorProfiles,
      fallback,
      useIndex: buildCounterpartUseIndex(targetId, primarySide),
      actionUseIndex: new Map(),
      existingCounterparts: buildExistingCounterpartSet(dd, targetId, primarySide),
      isCreate: !!options.isCreate,
    };
  }

  function buildSecondaryProfile(dd, location, primarySide, targetId, variationSeed = "", context = null) {
    const ctx = context || createSecondaryContext(dd, location, primarySide, targetId);
    const donors = ctx.donorDescriptors.map((d) => {
      const p = dd.points.get(d.id);
      const mass = sideMass(p, primarySide);
      return {
        point: p,
        distance: d.distance,
        mass,
        ring: d.ring,
        weight: donorWeight(d.distance, mass, String(d.id) === String(targetId)) * (d.ring ? CFG.DONOR_RING_WEIGHT : 1),
      };
    }).filter((d) => d.point && d.mass > 0);
    const candidateScore = new Map();
    const candidateCoverage = new Map();
    let linkCountWeighted = 0;
    let maxShareWeighted = 0;
    let profileWeightSum = 0;

    for (const d of donors) {
      const profile = String(d.point.id) === String(targetId) ? donorProfile(dd, d.point.id, primarySide) : ctx.donorProfiles.get(d.point.id);
      if (!profile) continue;
      profileWeightSum += d.weight;
      linkCountWeighted += d.weight * profile.count;
      maxShareWeighted += d.weight * profile.maxShare;
      const seen = new Set();
      for (const flow of profile.shares) {
        const oppositePoint = dd.points.get(flow.id);
        if (!oppositePoint) continue;
        const oppositeSide = primarySide === "residential" ? "jobs" : "residents";
        const existingOppositeMass = oppositeSide === "jobs" ? (oppositePoint.jobs || 0) : (oppositePoint.residents || 0);
        if (!(existingOppositeMass > 0)) continue;
        const damp = ledgerGrowthDamping(flow.id, oppositeSide, dd);
        const repeat = repetitionMultiplierFromIndex(ctx.useIndex, flow.id);
        const actionRepeat = actionRepetitionMultiplier(ctx, flow.id);
        const existingLink = existingLinkMultiplier(ctx, flow.id);
        const jitter = 1 + CFG.SCORE_RANDOMNESS * (2 * deterministicUnit(`${variationSeed}:${targetId}:${flow.id}`) - 1);
        const score = d.weight * flow.share * damp * repeat * actionRepeat * existingLink * jitter;
        candidateScore.set(flow.id, (candidateScore.get(flow.id) || 0) + score);
        if (!seen.has(flow.id)) {
          candidateCoverage.set(flow.id, (candidateCoverage.get(flow.id) || 0) + d.weight);
          seen.add(flow.id);
        }
      }
    }

    let desiredLinks = profileWeightSum > 0 ? Math.round(linkCountWeighted / profileWeightSum) : CFG.DEFAULT_LINKS;
    desiredLinks = clamp(desiredLinks, CFG.MIN_LINKS, CFG.MAX_LINKS);
    if (ctx.isCreate) desiredLinks = Math.min(CFG.MAX_LINKS, Math.max(desiredLinks, CFG.NEW_POINT_MIN_LINKS));
    const localMaxShare = profileWeightSum > 0 ? maxShareWeighted / profileWeightSum : 0.20;
    const popStyle = localPopSizeProfile(dd, ctx, primarySide, targetId);

    if (profileWeightSum > 0) {
      for (const [id, score] of candidateScore) {
        const coverage = (candidateCoverage.get(id) || 0) / profileWeightSum;
        candidateScore.set(id, score * (0.75 + 0.25 * coverage));
      }
    }

    const oppositeSideName = primarySide === "residential" ? "jobs" : "residents";
    const existing = new Set(candidateScore.keys());
    const fallback = [];
    for (const f of ctx.fallback) {
      if (existing.has(f.id)) continue;
      const p = dd.points.get(f.id);
      if (!p) continue;
      const mass = oppositeSideName === "jobs" ? p.jobs : p.residents;
      if (!(mass > 0)) continue;
      const damp = ledgerGrowthDamping(f.id, oppositeSideName, dd);
      const repeat = repetitionMultiplierFromIndex(ctx.useIndex, f.id);
      const actionRepeat = actionRepetitionMultiplier(ctx, f.id);
      const existingLink = existingLinkMultiplier(ctx, f.id);
      const jitter = 1 + CFG.SCORE_RANDOMNESS * (2 * deterministicUnit(`${variationSeed}:fallback:${targetId}:${f.id}`) - 1);
      fallback.push({ id: f.id, score: CFG.FALLBACK_SCORE_SCALE * Math.sqrt(mass) * f.distWeight * damp * repeat * actionRepeat * existingLink * jitter });
    }
    fallback.sort((a, b) => b.score - a.score || String(a.id).localeCompare(String(b.id)));
    const needCandidates = Math.max(desiredLinks, CFG.MIN_COUNTERPOINTS);
    const candidatePoolTarget = Math.max(needCandidates * 4, CFG.NOVELTY_CANDIDATE_POOL);
    for (const f of fallback) {
      if (candidateScore.size >= candidatePoolTarget) break;
      if (!candidateScore.has(f.id)) candidateScore.set(f.id, f.score);
    }

    const ranked = [...candidateScore.entries()]
      .filter(([, score]) => score > 0)
      .map(([id, score]) => ({ id, score }))
      .sort((a, b) => b.score - a.score || String(a.id).localeCompare(String(b.id)));

    if (!ranked.length) {
      return { ok: false, reason: "not-enough-counterpoints", donors: donors.length, candidates: 0 };
    }

    const targetFlowCount = clamp(
      Math.round(CFG.STEP / Math.max(CFG.MIN_FLOW, popStyle.typicalSize)),
      1,
      Math.min(desiredLinks, ranked.length)
    );
    const minimumFlows = targetFlowCount === 1 ? 1 : Math.min(CFG.MIN_COUNTERPOINTS, targetFlowCount);
    let selected = ranked.slice(0, targetFlowCount);
    const rawCapShare = clamp(localMaxShare * CFG.MAX_SHARE_MULT, CFG.MAX_SHARE_FLOOR, CFG.MAX_SHARE_CEIL);

    while (selected.length >= minimumFlows) {
      const average = CFG.STEP / selected.length;
      const cap = selected.length === 1 ? CFG.STEP : Math.min(
        CFG.STEP - CFG.MIN_FLOW * (selected.length - 1),
        Math.max(
          Math.ceil(CFG.STEP * rawCapShare),
          Math.ceil(average + CFG.FLOW_CAP_HEADROOM_PEOPLE)
        )
      );
      const baseTotal = CFG.MIN_FLOW * selected.length;
      const residual = Math.max(0, CFG.STEP - baseTotal);
      const sizeWeights = selected.map((x) => {
        const u = mixedDeterministicUnit(`${variationSeed}:size:${targetId}:${x.id}`);
        const variation = 1 + CFG.FLOW_SIZE_VARIATION * (2 * u - 1);
        return Math.max(1e-9, x.score * variation);
      });
      const extraCaps = selected.map(() => Math.max(0, cap - CFG.MIN_FLOW));
      const extras = allocateInteger(sizeWeights, residual, extraCaps);
      const allocations = extras.map((x) => x + CFG.MIN_FLOW);
      const flows = selected.map((x, i) => ({ id: x.id, size: allocations[i], score: x.score })).filter((x) => x.size > 0);
      if (flows.length >= minimumFlows && flows.every((x) => x.size >= CFG.MIN_FLOW) && flows.reduce((sum, x) => sum + x.size, 0) === CFG.STEP) {
        return {
          ok: true,
          flows,
          donors: donors.length,
          desiredLinks,
          localMaxShare,
          selectedLinks: flows.length,
          popStyle,
        };
      }
      if (selected.length === minimumFlows) break;
      selected = selected.slice(0, -1);
    }

    return { ok: false, reason: "allocation-failed", donors: donors.length, candidates: ranked.length };
  }

  const spatialPricingCache = new Map();

  function emptySpatialPricingProfile() {
    return {
      local: 0,
      ultra1250Mass: 0,
      localCount: 0,
      cityMass: 0,
      cityCount: 0,
      accessMass: 0,
      accessNearMass: 0,
      accessMidMass: 0,
      accessFarMass: 0,
      nearMetroMass: 0,
    };
  }

  function computeSpatialPricingFeatures(dd, location) {
    const out = emptySpatialPricingProfile();
    if (!dd?.points || !Array.isArray(location)) return out;

    for (const p of dd.points.values()) {
      if (!Array.isArray(p?.location)) continue;
      const pointMass = Math.max(0, Number(p.residents) || 0) + Math.max(0, Number(p.jobs) || 0);
      if (!(pointMass > 0)) continue;

      const d = haversine(location, p.location);

      if (d <= CFG.LOCAL_MAX_RADIUS_M) {
        const localWeight = 1 / (1 + Math.pow(d / CFG.LOCAL_DECAY_SCALE_M, CFG.LOCAL_DECAY_EXP));
        const localWeightedMass = pointMass * localWeight;
        out.local += localWeightedMass;
        if (d <= CFG.ULTRA_TAIL_CONTEXT_RADIUS_M) out.ultra1250Mass += localWeightedMass;

        if (pointMass >= CFG.LOCAL_COUNT_MIN_MASS) {
          out.localCount += 1 / (1 + Math.pow(d / CFG.LOCAL_COUNT_DECAY_SCALE_M, CFG.LOCAL_COUNT_DECAY_EXP));
        }
      }

      if (d <= CFG.CITY_MAX_RADIUS_M) {
        const cityWeight = 1 / (1 + Math.pow(d / CFG.CITY_DECAY_SCALE_M, CFG.CITY_DECAY_EXP));
        out.cityMass += pointMass * cityWeight;
        if (pointMass >= CFG.CITY_COUNT_MIN_MASS) out.cityCount += cityWeight;
      }

      if (pointMass >= CFG.ACCESS_POINT_MIN_MASS && d > CFG.ACCESS_INNER_RADIUS_M) {
        const accessWeight = 1 / (1 + Math.pow(d / CFG.ACCESS_DECAY_SCALE_M, CFG.ACCESS_DECAY_EXP));
        const weighted = pointMass * accessWeight;
        out.accessMass += weighted;
        if (d <= CFG.ACCESS_NEAR_BAND_END_M) {
          out.accessNearMass += weighted;
        } else if (d <= CFG.ACCESS_MID_BAND_END_M) {
          out.accessMidMass += weighted;
        } else {
          out.accessFarMass += weighted;
        }
      }

      if (pointMass >= CFG.NEAR_METRO_POINT_MIN_MASS && d > CFG.NEAR_METRO_INNER_RADIUS_M) {
        const nearMetroWeight = 1 / (1 + Math.pow(d / CFG.NEAR_METRO_DECAY_SCALE_M, CFG.NEAR_METRO_DECAY_EXP));
        out.nearMetroMass += pointMass * nearMetroWeight;
      }
    }

    return out;
  }

  function spatialPricingKey(location) {
    if (!Array.isArray(location)) return null;
    return `${demandRevision}|${Number(location[0])}|${Number(location[1])}`;
  }

  function locationMassProfile(dd, location) {
    const key = spatialPricingKey(location);
    if (key) {
      const cached = spatialPricingCache.get(key);
      if (cached) {
        return { ...cached };
      }
    }

    const profile = computeSpatialPricingFeatures(dd, location);
    if (key) {
      spatialPricingCache.set(key, profile);
      if (spatialPricingCache.size > 64) spatialPricingCache.delete(spatialPricingCache.keys().next().value);
    }
    return { ...profile };
  }

  function smoothLogBand(value, low, high) {
    if (!(value > low) || !(high > low)) return 0;
    if (value >= high) return 1;
    const lo = Math.log1p(low);
    const hi = Math.log1p(high);
    const t = clamp((Math.log1p(value) - lo) / Math.max(1e-9, hi - lo), 0, 1);
    return t * t * (3 - 2 * t);
  }

  function smoothLinearBand(value, low, high) {
    if (!(high > low)) return value >= high ? 1 : 0;
    const t = clamp((value - low) / (high - low), 0, 1);
    return t * t * (3 - 2 * t);
  }

  function locationMultiplierFromProfile(profile) {
    const local = Math.max(0, profile?.local || 0);
    const localCount = Math.max(0, profile?.localCount || 0);
    const cityMass = Math.max(0, profile?.cityMass || 0);
    const cityCount = Math.max(0, profile?.cityCount || 0);
    const accessMass = Math.max(0, profile?.accessMass || 0);
    const accessNearMass = Math.max(0, profile?.accessNearMass || 0);
    const accessMidMass = Math.max(0, profile?.accessMidMass || 0);
    const accessFarMass = Math.max(0, profile?.accessFarMass || 0);
    const metroMass = Math.max(0, profile?.nearMetroMass || 0);
    const ultra1250Mass = Math.max(0, profile?.ultra1250Mass || 0);

    const localMassScore = smoothLogBand(local, CFG.SETTLEMENT_MASS_LOW, CFG.SETTLEMENT_MASS_HIGH);
    const localCountScore = smoothLogBand(localCount, CFG.SETTLEMENT_COUNT_LOW, CFG.SETTLEMENT_COUNT_HIGH);
    const baseSettlementTerm = CFG.SETTLEMENT_MAX_TERM * (0.72 * localMassScore + 0.28 * localCountScore);
    const ruralSettlementScore = smoothLogBand(ultra1250Mass, CFG.RURAL_SETTLEMENT_MASS_LOW, CFG.RURAL_SETTLEMENT_MASS_HIGH);
    const ruralSettlementTerm = CFG.RURAL_SETTLEMENT_MAX_TERM * ruralSettlementScore;
    const settlementTerm = Math.max(baseSettlementTerm, ruralSettlementTerm);

    const low = Math.log1p(CFG.ACCESS_MASS_LOW);
    const high = Math.log1p(CFG.ACCESS_MASS_HIGH);
    const accessScore = clamp((Math.log1p(accessMass) - low) / Math.max(1e-9, high - low), 0, 1);
    const composedAccessMass = accessNearMass + accessMidMass + accessFarMass;
    const nearShare = composedAccessMass > 0 ? accessNearMass / composedAccessMass : 0;
    const midShare = composedAccessMass > 0 ? accessMidMass / composedAccessMass : 0;
    const accessCompositionRetention = composedAccessMass > 0
      ? clamp(
          CFG.ACCESS_RETENTION_BASE
            + CFG.ACCESS_RETENTION_NEAR_SHARE * nearShare
            + CFG.ACCESS_RETENTION_MID_SHARE * midShare,
          CFG.ACCESS_RETENTION_BASE,
          1
        )
      : 1;
    const accessSaturation = smoothLinearBand(accessScore, CFG.ACCESS_SATURATION_LOW, CFG.ACCESS_SATURATION_HIGH);
    const accessCompactness = CFG.ACCESS_COMPACTNESS_FLOOR
      + (1 - CFG.ACCESS_COMPACTNESS_FLOOR)
        * smoothLinearBand(nearShare, CFG.ACCESS_COMPACTNESS_NEAR_LOW, CFG.ACCESS_COMPACTNESS_NEAR_HIGH);
    const accessSaturationRetention = 1 - accessSaturation * (1 - accessCompactness);
    const accessRetention = accessCompositionRetention * accessSaturationRetention;
    const accessTerm = CFG.ACCESS_MAX_TERM * accessScore * accessRetention;

    const coreMassExcess = Math.max(0, cityMass - CFG.CORE_MASS_THRESHOLD) / CFG.CORE_MASS_SCALE;
    const coreCountExcess = Math.max(0, cityCount - CFG.CORE_COUNT_THRESHOLD) / CFG.CORE_COUNT_SCALE;
    const coreRaw = CFG.CORE_STRENGTH * Math.sqrt(Math.log1p(coreMassExcess) * Math.log1p(coreCountExcess));
    const coreRawTerm = Math.min(CFG.CORE_MAX_TERM, coreRaw);
    const coreLocalSupport = CFG.CORE_LOCAL_SUPPORT_BASE
      + (1 - CFG.CORE_LOCAL_SUPPORT_BASE)
        * smoothLogBand(local, CFG.CORE_LOCAL_SUPPORT_LOW, CFG.CORE_LOCAL_SUPPORT_HIGH);
    const coreTerm = coreRawTerm * coreLocalSupport;

    const nearMetroScore = smoothLogBand(metroMass, CFG.NEAR_METRO_MASS_LOW, CFG.NEAR_METRO_MASS_HIGH);
    const nearMetroTerm = CFG.NEAR_METRO_MAX_TERM * nearMetroScore;
    const metroContactRatio = (metroMass + accessMass) > 0 ? metroMass / (metroMass + accessMass) : 0;
    const metroContactScore = smoothLinearBand(
      metroContactRatio,
      CFG.METRO_CONTINUITY_CONTACT_LOW,
      CFG.METRO_CONTINUITY_CONTACT_HIGH
    );
    const metroFieldScore = smoothLinearBand(
      accessScore,
      CFG.METRO_CONTINUITY_ACCESS_LOW,
      CFG.METRO_CONTINUITY_ACCESS_HIGH
    );
    const nearMetroGap = CFG.NEAR_METRO_MAX_TERM > 0
      ? clamp(1 - nearMetroTerm / CFG.NEAR_METRO_MAX_TERM, 0, 1)
      : 0;
    const metroContinuityTerm = CFG.NEAR_METRO_MAX_TERM
      * metroContactScore
      * metroFieldScore
      * nearMetroGap;
    const urbanPressureTerm = Math.max(coreTerm, nearMetroTerm, metroContinuityTerm);

    const tailExcess = Math.max(0, local - CFG.NORMAL_TAIL_MASS_THRESHOLD);
    const highDensityTail = CFG.NORMAL_TAIL_STRENGTH
      * Math.log1p(tailExcess / CFG.NORMAL_TAIL_MASS_SCALE);

    return 1
      + CFG.LOCATION_FLOOR_TERM
      + settlementTerm
      + accessTerm
      + urbanPressureTerm
      + highDensityTail;
  }

  function roundDevelopmentCost(cost) {
    const quantum = Math.max(1, Number(CFG.COST_ROUNDING) || 1);
    return Math.round((Number(cost) || 0) / quantum) * quantum;
  }

  function effectiveStepCost(profile) {
    return CFG.BASE_STEP_COST * locationMultiplierFromProfile(profile);
  }

  function activeAddedDemand() {
    let total = 0;
    for (const action of ledger.actions || []) {
      if (!action || action.active === false) continue;
      total += Math.max(0, Number(action.amount) || 0);
    }
    return total;
  }

  function deriveOriginalMapDemand(dd) {
    if (!dd?.points) return 0;
    let total = 0;
    for (const [pointId, point] of dd.points) {
      const rec = ledger.points?.[String(pointId)];
      if (rec && Number.isFinite(Number(rec.baselineResidents))) {
        total += Math.max(0, Number(rec.baselineResidents) || 0);
      } else {
        total += Math.max(0, Number(point?.residents) || 0);
      }
    }
    return total;
  }

  function originalMapDemand(dd) {
    const stored = Number(ledger.originalMapDemand);
    if (stored > 0) return stored;
    const derived = deriveOriginalMapDemand(dd);
    if (derived > 0) ledger.originalMapDemand = derived;
    return derived;
  }

  function mapGrowthPercent(addedDemand, baseDemand) {
    if (!(baseDemand > 0)) return 0;
    return Math.max(0, Math.ceil((Math.max(0, Number(addedDemand) || 0) / baseDemand) * 1000 - 1e-9) / 10);
  }

  function mapGrowthPriceMultiplier(addedDemand, baseDemand) {
    const growthPercent = mapGrowthPercent(addedDemand, baseDemand);
    return 1 + CFG.MAP_GROWTH_PRICE_STRENGTH * (growthPercent / 100);
  }

  function quoteDevelopmentPrice(dd, location, amount, isCreate = false) {
    if (!dd || !Array.isArray(location) || !DEVELOPMENT_AMOUNTS.includes(amount)) {
      return { ok: false, totalCost: Infinity };
    }
    const profile = locationMassProfile(dd, location);
    const baseDemand = originalMapDemand(dd);
    let addedDemand = activeAddedDemand();
    let totalCost = 0;
    const cumulative = {};
    const steps = amount / CFG.STEP;
    for (let step = 0; step < steps; step++) {
      const creation = isCreate && step === 0 ? CFG.CREATE_PREMIUM : 1;
      const growth = mapGrowthPriceMultiplier(addedDemand, baseDemand);
      totalCost += roundDevelopmentCost(effectiveStepCost(profile) * creation * growth);
      cumulative[(step + 1) * CFG.STEP] = totalCost;
      addedDemand += CFG.STEP;
      profile.local += CFG.STEP;
      profile.ultra1250Mass += CFG.STEP;
      profile.cityMass += CFG.STEP;
    }
    return {
      ok: true,
      totalCost,
      cumulative,
    };
  }

  const locationProfiles = new Map();
  const locationLabelSeen = new Set();
  const locationLabels = { city: [], district: [], street: [] };
  const locationGrids = { district: new Map(), street: new Map() };
  const LOCATION_GRID_DEG = 0.02;
  const locationZoomThresholds = { district: 11, street: 14.5 };
  let locationIndexMap = null;
  let locationIndexTimer = null;

  function distanceMeters(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b)) return Infinity;
    const R = 6371000;
    const lat1 = a[1] * Math.PI / 180, lat2 = b[1] * Math.PI / 180;
    const dLat = (b[1] - a[1]) * Math.PI / 180;
    const dLon = (b[0] - a[0]) * Math.PI / 180;
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
  }

  function locationKey(location) {
    if (!Array.isArray(location)) return null;
    return `${Number(location[0]).toFixed(5)},${Number(location[1]).toFixed(5)}`;
  }

  function gridCell(location) {
    return `${Math.floor(location[0] / LOCATION_GRID_DEG)},${Math.floor(location[1] / LOCATION_GRID_DEG)}`;
  }

  function featureRepresentativeCoordinates(feature) {
    const g = feature?.geometry;
    if (g?.type === "Point" && Array.isArray(g.coordinates)) return g.coordinates;
    if (g?.type === "MultiPoint" && Array.isArray(g.coordinates?.[0])) return g.coordinates[0];
    if (g?.type === "LineString" && Array.isArray(g.coordinates) && g.coordinates.length) return g.coordinates[Math.floor(g.coordinates.length / 2)];
    if (g?.type === "MultiLineString" && Array.isArray(g.coordinates?.[0]) && g.coordinates[0].length) {
      const line = g.coordinates[0];
      return line[Math.floor(line.length / 2)];
    }
    return null;
  }

  function classifyLocationLayer(sourceLayer = "", layerId = "") {
    const text = `${sourceLayer} ${layerId}`.toLowerCase();
    if (/neigh|suburb|quarter|borough|district/.test(text)) return "district";
    if (/road[-_ ]?labels?|street[-_ ]?labels?/.test(text)) return "street";
    if (/city[-_ ]?labels?|town[-_ ]?labels?|village[-_ ]?labels?|place[-_ ]?labels?/.test(text)) return "city";
    return null;
  }

  function addLocationLabel(kind, name, coords) {
    if (!kind || !locationLabels[kind] || !name || !Array.isArray(coords)) return false;
    if (/^(?:point|demand point|settlement|locality|place|area|location|unnamed)(?:\b|\s*#|\s*[-_:])/i.test(name)) return false;
    const key = `${kind}|${name}|${Number(coords[0]).toFixed(4)},${Number(coords[1]).toFixed(4)}`;
    if (locationLabelSeen.has(key)) return false;
    locationLabelSeen.add(key);
    const rec = { name, coords: [Number(coords[0]), Number(coords[1])] };
    locationLabels[kind].push(rec);
    if (kind === "district" || kind === "street") {
      const cell = gridCell(rec.coords);
      const bucket = locationGrids[kind].get(cell) || [];
      bucket.push(rec);
      locationGrids[kind].set(cell, bucket);
    }
    return true;
  }

  function nearbyGridLabels(kind, location, maxMeters) {
    const grid = locationGrids[kind];
    if (!grid) return [];
    const lat = Number(location[1]);
    const metersPerDegLat = 111320;
    const metersPerDegLon = Math.max(20000, metersPerDegLat * Math.cos(lat * Math.PI / 180));
    const lonCells = Math.max(1, Math.ceil(maxMeters / (LOCATION_GRID_DEG * metersPerDegLon)));
    const latCells = Math.max(1, Math.ceil(maxMeters / (LOCATION_GRID_DEG * metersPerDegLat)));
    const gx = Math.floor(location[0] / LOCATION_GRID_DEG);
    const gy = Math.floor(location[1] / LOCATION_GRID_DEG);
    const out = [];
    for (let dx = -lonCells; dx <= lonCells; dx++) {
      for (let dy = -latCells; dy <= latCells; dy++) {
        const bucket = grid.get(`${gx + dx},${gy + dy}`);
        if (bucket) out.push(...bucket);
      }
    }
    return out;
  }

  function nearestLocationLabel(kind, location) {
    const maxMeters = kind === "street" ? 900 : kind === "district" ? 8000 : 22000;
    const pool = kind === "city" ? locationLabels.city : nearbyGridLabels(kind, location, maxMeters);
    let best = null;
    for (const rec of pool) {
      const meters = distanceMeters(location, rec.coords);
      if (!Number.isFinite(meters) || meters > maxMeters) continue;
      if (!best || meters < best.meters) best = { name: rec.name, meters };
    }
    return best;
  }

  function resolveLocationProfile(location) {
    const key = locationKey(location);
    if (!key) return null;
    const profile = locationProfiles.get(key) || { city: null, district: null, street: null };
    for (const kind of ["city", "district", "street"]) {
      const candidate = nearestLocationLabel(kind, location);
      if (candidate && (!profile[kind] || candidate.meters < profile[kind].meters)) profile[kind] = candidate;
    }
    locationProfiles.set(key, profile);
    return profile;
  }

  function collectLoadedLocationLabels(map = api.utils.getMap?.()) {
    if (!map) return false;
    let added = false;
    try {
      const style = map.getStyle?.() || {};
      const queries = new Map();
      for (const layer of style.layers || []) {
        const sourceId = layer?.source;
        const sourceLayer = layer?.["source-layer"];
        const kind = classifyLocationLayer(sourceLayer, layer?.id);
        if (!kind || !sourceId || !sourceLayer) continue;
        queries.set(`${sourceId}|${sourceLayer}`, { sourceId, sourceLayer, kind });
        const minz = Number(layer?.minzoom);
        if (Number.isFinite(minz)) {
          if (kind === "district") locationZoomThresholds.district = Math.min(locationZoomThresholds.district, minz);
          if (kind === "street") locationZoomThresholds.street = Math.min(locationZoomThresholds.street, minz);
        }
      }
      if (map.querySourceFeatures) {
        for (const { sourceId, sourceLayer, kind } of queries.values()) {
          let fs = [];
          try { fs = map.querySourceFeatures(sourceId, { sourceLayer }) || []; } catch { continue; }
          for (const f of fs) {
            const props = f?.properties || {};
            const name = typeof props.name === "string" ? props.name.trim() : "";
            const coords = featureRepresentativeCoordinates(f);
            if (name && coords) added = addLocationLabel(kind, name, coords) || added;
          }
        }
      }
      if (map.queryRenderedFeatures) {
        let fs = [];
        try { fs = map.queryRenderedFeatures() || []; } catch {}
        for (const f of fs) {
          const kind = classifyLocationLayer(f?.layer?.["source-layer"], f?.layer?.id);
          if (!kind) continue;
          const name = typeof f?.properties?.name === "string" ? f.properties.name.trim() : "";
          const coords = featureRepresentativeCoordinates(f);
          if (name && coords) added = addLocationLabel(kind, name, coords) || added;
        }
      }
    } catch {}
    return added;
  }

  function seedDemandLocationProfiles() {
    const dd = api.gameState.getDemandData?.();
    if (!dd?.points) return;
    for (const p of dd.points.values()) if (Array.isArray(p?.location)) resolveLocationProfile(p.location);
  }

  function refreshLocationIndex() {
    const added = collectLoadedLocationLabels();
    if (added) seedDemandLocationProfiles();
  }

  function scheduleLocationIndexRefresh() {
    if (locationIndexTimer) clearTimeout(locationIndexTimer);
    locationIndexTimer = setTimeout(() => {
      locationIndexTimer = null;
      refreshLocationIndex();
      if (uiStore.get().panelOpen) refreshUi();
    }, 120);
  }

  function scheduleGeneralTileLocationRefresh(event) {
    if (event?.sourceId && event.sourceId !== "general-tiles") return;
    scheduleLocationIndexRefresh();
  }

  function bindLocationIndex(map) {
    if (!map) return;
    if (locationIndexMap && locationIndexMap !== map) {
      try { locationIndexMap.off("moveend", scheduleLocationIndexRefresh); } catch {}
      try { locationIndexMap.off("zoomend", scheduleLocationIndexRefresh); } catch {}
      try { locationIndexMap.off("idle", scheduleLocationIndexRefresh); } catch {}
      try { locationIndexMap.off("sourcedata", scheduleGeneralTileLocationRefresh); } catch {}
    }
    locationIndexMap = map;
    try { map.off("moveend", scheduleLocationIndexRefresh); } catch {}
    try { map.off("zoomend", scheduleLocationIndexRefresh); } catch {}
    try { map.off("idle", scheduleLocationIndexRefresh); } catch {}
    try { map.off("sourcedata", scheduleGeneralTileLocationRefresh); } catch {}
    try { map.on("moveend", scheduleLocationIndexRefresh); } catch {}
    try { map.on("zoomend", scheduleLocationIndexRefresh); } catch {}
    try { map.on("idle", scheduleLocationIndexRefresh); } catch {}
    try { map.on("sourcedata", scheduleGeneralTileLocationRefresh); } catch {}
    scheduleLocationIndexRefresh();
  }

  function clearLocationIndexData() {
    locationProfiles.clear();
    locationLabelSeen.clear();
    for (const kind of Object.keys(locationLabels)) locationLabels[kind].length = 0;
    locationGrids.district.clear();
    locationGrids.street.clear();
    locationZoomThresholds.district = 11;
    locationZoomThresholds.street = 14.5;
  }

  function nearestStreetFromGameState(location, radiusMeters = 900) {
    if (!Array.isArray(location)) return null;
    try {
      const streets = api.gameState.getStreetsAt?.(location, radiusMeters);
      if (!Array.isArray(streets)) return null;
      let best = null;
      for (const rec of streets) {
        const props = rec?.properties || rec || {};
        const name = String(props?.name || "").trim();
        if (!name) continue;
        const meters = Number(props?.distanceMeters ?? rec?.distanceMeters);
        if (!Number.isFinite(meters) || meters > radiusMeters) continue;
        if (!best || meters < best.meters) best = { name, meters };
      }
      return best?.name || null;
    } catch (_) {
      return null;
    }
  }

  function locationDisplayProfile(location) {
    if (!Array.isArray(location)) return { city: null, district: null, street: null };
    collectLoadedLocationLabels();
    const profile = resolveLocationProfile(location) || {};
    const street = nearestStreetFromGameState(location) || profile?.street?.name || null;
    return {
      city: profile?.city?.name || null,
      district: profile?.district?.name || null,
      street,
    };
  }

  function locationHeaderParts(location) {
    const profile = locationDisplayProfile(location);
    const district = profile.district || null;
    const street = profile.street || null;
    const title = district || street || "Area";
    const detail = district && street ? street : "";
    return { title, detail };
  }

  function friendlyLocationLabel(location) {
    const parts = locationHeaderParts(location);
    return parts.detail ? `${parts.title} · ${parts.detail}` : parts.title;
  }

  function nearestAreaLabel(location) {
    return locationHeaderParts(location).title;
  }

  function stablePointRef(id) {
    const text = String(id ?? "");
    let h = 2166136261;
    for (let i = 0; i < text.length; i++) {
      h ^= text.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return `#${(h >>> 0).toString(16).toUpperCase().padStart(8, "0")}`;
  }

  function nearestStations(location, limit = 3) {
    if (!Array.isArray(location) || limit <= 0) return [];
    const key = `${currentCity()}|${locationKey(location)}|${limit}`;
    const now = Date.now();
    const cached = nearestStationsCache.get(key);
    if (cached && now - cached.at < 2500) return cached.rows;
    let stations = [];
    try { stations = api.gameState.getStations?.() || []; } catch { return []; }
    const best = [];
    for (const station of stations) {
      if (!Array.isArray(station?.coords)) continue;
      const meters = distanceMeters(location, station.coords);
      if (!Number.isFinite(meters)) continue;
      const row = { station, meters };
      let i = 0;
      while (i < best.length && best[i].meters <= meters) i++;
      if (i < limit) {
        best.splice(i, 0, row);
        if (best.length > limit) best.pop();
      } else if (best.length < limit) best.push(row);
    }
    nearestStationsCache.set(key, { at: now, rows: best });
    if (nearestStationsCache.size > 64) nearestStationsCache.delete(nearestStationsCache.keys().next().value);
    return best;
  }

  function focusStation(station) {
    const coords = station?.coords;
    if (!Array.isArray(coords)) return;
    const map = api.utils.getMap?.();
    if (!map) return;
    try {
      const zoom = Math.max(Number(map.getZoom?.()) || 0, 15);
      if (map.easeTo) map.easeTo({ center: coords, zoom, duration: 350 });
      else if (map.flyTo) map.flyTo({ center: coords, zoom, duration: 350 });
      else if (map.setCenter) map.setCenter(coords);
    } catch {}
  }

  function humanRouteLabel(route) {
    if (!route || typeof route !== "object") return null;
    const bullet = route.bullet == null ? "" : String(route.bullet).trim();
    return bullet || null;
  }

  function humanRouteTitle(route) {
    if (!route || typeof route !== "object") return null;
    const bullet = route.bullet == null ? "" : String(route.bullet).trim();
    const fullName = route.fullName == null ? "" : String(route.fullName).trim();
    if (bullet && fullName) return `${bullet} · ${fullName}`;
    return fullName || bullet || null;
  }

  function stationRouteBadges(station) {
    const ids = Array.isArray(station?.routeIds) ? station.routeIds : [];
    if (!ids.length) return [];
    let routes = [];
    try { routes = api.gameState.getRoutes?.() || []; } catch {}
    const byId = new Map((Array.isArray(routes) ? routes : []).map((r) => [String(r?.id), r]));
    return ids.slice(0, 5).map((routeId) => {
      const route = byId.get(String(routeId)) || {};
      const color = route.color || route.hexColor || route.lineColor || route.routeColor || null;
      const label = humanRouteLabel(route);
      const title = humanRouteTitle(route);
      return { routeId, color, label, title };
    });
  }

  function areaSlug(location) {
    const raw = nearestAreaLabel(location) || "area";
    const slug = String(raw)
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40);
    return slug || "area";
  }

  function nextPointId(location) {
    return `${CFG.NEW_POINT_PREFIX}${areaSlug(location)}:${ledger.pointSeq++}`;
  }
  function nextPopId() { return `${CFG.POP_PREFIX}${Date.now().toString(36)}:${ledger.seq++}`; }

  function ensureNewPoint(planned, id, location) {
    planned.points.set(id, {
      id,
      location: [location[0], location[1]],
      popIds: [],
      residents: 0,
      jobs: 0,
      residentModeShare: { walking: 0, driving: 0, transit: 0, unknown: 0 },
      workerModeShare: { walking: 0, driving: 0, transit: 0, unknown: 0 },
    });
  }

  function updateLedgerForFlow(primaryId, secondaryId, primarySide, size, planned) {
    const primaryPoint = planned.points.get(primaryId);
    const secondaryPoint = planned.points.get(secondaryId);
    const pr = pointLedger(primaryId, primaryPoint);
    const sr = pointLedger(secondaryId, secondaryPoint);
    if (primarySide === "residential") {
      pr.addedResidents += size;
      sr.addedJobs += size;
    } else {
      pr.addedJobs += size;
      sr.addedResidents += size;
    }
  }

  function planDevelopment(live, target, side, amount, isCreate) {
    if (!DEVELOPMENT_AMOUNTS.includes(amount)) return { ok: false, error: "Unsupported amount" };
    if (!isCreate) {
      const hasResidential = (target?.residents || 0) > 0;
      const hasWork = (target?.jobs || 0) > 0;
      if (side === "residential" && !hasResidential) return { ok: false, error: "This point has no residents to upgrade." };
      if (side === "work" && !hasWork) return { ok: false, error: "This point has no work demand to upgrade." };
    }
    const priceQuote = quoteDevelopmentPrice(live, target.location, amount, isCreate);
    if (!priceQuote.ok || !Number.isFinite(priceQuote.totalCost)) return { ok: false, error: "Could not price development." };
    const before = cloneDemandData(live);
    const planned = cloneDemandData(live);
    const ledgerBefore = JSON.parse(JSON.stringify(ledger));
    const donorBands = buildDrivingDonors(planned);
    let pointId = target.id;
    if (isCreate) {
      do { pointId = nextPointId(target.location); }
      while (planned.points.has(pointId));
    }
    const actionId = `act:${Date.now().toString(36)}:${ledger.seq++}`;
    if (isCreate) {
      ensureNewPoint(planned, pointId, target.location);
      const rec = pointLedger(pointId, planned.points.get(pointId));
      rec.baselineResidents = 0;
      rec.baselineJobs = 0;
      rec.created = true;
    }
    if (!planned.points.has(pointId)) {
      ledger = ledgerBefore;
      return { ok: false, error: "Target demand point no longer exists." };
    }
    pointLedger(pointId, planned.points.get(pointId));
    const secondaryContext = createSecondaryContext(planned, target.location, side, pointId, { isCreate });

    const steps = amount / CFG.STEP;
    const totalCost = priceQuote.totalCost;
    const allFlows = [];
    try {
      for (let step = 0; step < steps; step++) {
        const p = planned.points.get(pointId);
        const profile = buildSecondaryProfile(planned, p.location, side, pointId, `${pointId}:${ledger.actions.length}:${step}`, secondaryContext);
        if (!profile.ok) throw new Error(`Could not find enough valid ${side === "residential" ? "work" : "residential"} points (${profile.reason}).`);
        for (const flow of profile.flows) {
          const popId = nextPopId();
          const residenceId = side === "residential" ? pointId : flow.id;
          const jobId = side === "residential" ? flow.id : pointId;
          pointLedger(flow.id, planned.points.get(flow.id));
          if (!addPlannedPop(planned, residenceId, jobId, popId, flow.size, donorBands)) {
            throw new Error(`Failed to create planned commuter ${residenceId} -> ${jobId}`);
          }
          const plannedPop = planned.popsMap.get(popId);
          ledger.pops[popId] = {
            residenceId,
            jobId,
            size: flow.size,
            drivingDistance: Number(plannedPop?.drivingDistance) || 0,
            drivingSeconds: Number(plannedPop?.drivingSeconds) || 0,
            actionId,
            primaryId: pointId,
            primarySide: side,
            active: true,
          };
          const counterpartKey = String(flow.id);
          secondaryContext.useIndex.set(counterpartKey, (secondaryContext.useIndex.get(counterpartKey) || 0) + 1);
          secondaryContext.actionUseIndex.set(counterpartKey, (secondaryContext.actionUseIndex.get(counterpartKey) || 0) + 1);
          updateLedgerForFlow(pointId, flow.id, side, flow.size, planned);
          allFlows.push({ residenceId, jobId, size: flow.size, step: step + 1 });
        }
      }
    } catch (e) {
      ledger = ledgerBefore;
      return { ok: false, error: e instanceof Error ? e.message : String(e) };
    }

    const addedPoints = [...planned.points.values()].filter((p) => !before.points.has(p.id));
    const addedPops = [...planned.popsMap.values()].filter((p) => !before.popsMap.has(p.id));
    const totalFlow = allFlows.reduce((sum, f) => sum + (Number(f.size) || 0), 0);
    if (!allFlows.length || totalFlow !== amount || addedPops.length === 0) {
      ledger = ledgerBefore;
      return { ok: false, error: `Invalid development plan: expected ${amount} commuters, planned ${totalFlow}.` };
    }
    const ledgerAfter = JSON.parse(JSON.stringify(ledger));
    ledger = ledgerBefore;
    return { ok: true, before, planned, addedPoints, addedPops, ledgerAfter, pointId, totalCost, flows: allFlows, side, amount, isCreate, actionId };
  }

  async function charge(cost) {
    const before = safeBudget();
    const expected = before - cost;
    if (before < cost) return { ok: false, error: `Costs ${fmtMoney(cost)}; budget is ${fmtMoney(before)}.` };
    try {
      api.actions.setMoney(expected);
      await new Promise((r) => setTimeout(r, 0));
    } catch (e) {
      return { ok: false, error: `Could not charge development cost: ${String(e)}` };
    }
    const after = safeBudget();
    if (Math.abs(after - expected) > 1) {
      try { api.actions.setMoney(before); } catch {}
      return { ok: false, error: "Development charge could not be verified; budget restored." };
    }
    return { ok: true, before, after, charged: Math.max(0, before - after) };
  }
  function refund(cost) {
    try { api.actions.addMoney(cost, "Demand Developer refund"); }
    catch (e) { console.error(`${TAG} refund failed`, e); }
  }

  function rollbackApplied(addedPointIds, addedPopIds) {
    const errors = [];
    if (addedPopIds.length) {
      try {
        const r = api.demand.removePops(addedPopIds);
        if (!r?.success) errors.push(r?.error || "removePops failed");
      } catch (e) { errors.push(String(e)); }
    }
    for (let i = addedPointIds.length - 1; i >= 0; i--) {
      try {
        const r = api.demand.removeDemandPoint(addedPointIds[i]);
        if (!r?.success) errors.push(r?.error || `removeDemandPoint failed for ${addedPointIds[i]}`);
      } catch (e) { errors.push(String(e)); }
    }
    return { ok: errors.length === 0, errors };
  }

  function applyPlan(plan) {
    if (!api.demand) return { ok: false, error: "Subway Builder demand editor API is unavailable." };
    const addedPointIds = [];
    const addedPopIds = [];
    for (const p of plan.addedPoints) {
      const r = api.demand.addDemandPoint({ id: p.id, location: p.location });
      if (!r.success) {
        const rb = rollbackApplied(addedPointIds, addedPopIds);
        return { ok: false, error: (r.error || "addDemandPoint failed") + (rb.ok ? "" : `; rollback failed: ${rb.errors.join("; ")}`) };
      }
      if (r.pointId !== p.id) {
        const rb = rollbackApplied([...addedPointIds, r.pointId].filter(Boolean), addedPopIds);
        return { ok: false, error: `Demand API changed requested point id (${p.id} -> ${r.pointId}); refusing unsafe apply.` + (rb.ok ? "" : ` Rollback failed: ${rb.errors.join("; ")}`) };
      }
      addedPointIds.push(r.pointId);
    }
    if (plan.addedPops.length) {
      const additions = plan.addedPops.map((p) => ({
        residenceId: p.residenceId,
        jobId: p.jobId,
        size: p.size,
        drivingSeconds: p.drivingSeconds,
        drivingDistance: p.drivingDistance,
      }));
      const r = api.demand.addPops(additions);
      if (!r.success) {
        const rb = rollbackApplied(addedPointIds, addedPopIds);
        return { ok: false, error: (r.error || "addPops failed") + (rb.ok ? "" : `; rollback failed: ${rb.errors.join("; ")}`) };
      }
      if (!Array.isArray(r.popIds) || r.popIds.length !== additions.length) {
        const actualIds = Array.isArray(r.popIds) ? r.popIds : [];
        const rb = rollbackApplied(addedPointIds, actualIds);
        return { ok: false, error: `Demand API returned ${actualIds.length} pop ids for ${additions.length} additions.` + (rb.ok ? "" : ` Rollback failed: ${rb.errors.join("; ")}`) };
      }
      addedPopIds.push(...r.popIds);
      const provisional = plan.addedPops.map((p) => p.id);
      for (let i = 0; i < provisional.length; i++) {
        const rec = plan.ledgerAfter.pops[provisional[i]];
        if (!rec) continue;
        delete plan.ledgerAfter.pops[provisional[i]];
        plan.ledgerAfter.pops[addedPopIds[i]] = rec;
      }
    }
    const liveAfter = api.gameState.getDemandData();
    const targetAfter = looseMapGet(liveAfter?.points, plan.pointId);
    const targetBefore = looseMapGet(plan.before?.points, plan.pointId);
    const baselinePrimary = Number(plan.side === "residential" ? targetBefore?.residents : targetBefore?.jobs) || 0;
    const expectedPrimary = baselinePrimary + plan.amount;
    const actualPrimary = Number(plan.side === "residential" ? targetAfter?.residents : targetAfter?.jobs);
    let popAuditError = null;
    if (!liveAfter?.popsMap) {
      popAuditError = "live commuter map is unavailable";
    } else {
      for (let i = 0; i < addedPopIds.length; i++) {
        const id = addedPopIds[i];
        const expected = plan.addedPops[i];
        const livePop = liveAfter.popsMap.get(id) ?? liveAfter.popsMap.get(String(id));
        const endpointsMatch = !!livePop &&
          String(livePop.residenceId || "") === String(expected?.residenceId || "") &&
          String(livePop.jobId || "") === String(expected?.jobId || "");
        const sizeMatch = !!livePop && Math.abs((Number(livePop.size) || 0) - (Number(expected?.size) || 0)) < 0.001;
        const residencePoint = looseMapGet(liveAfter?.points, expected?.residenceId);
        const jobPoint = looseMapGet(liveAfter?.points, expected?.jobId);
        const attached = pointHasPopId(residencePoint, id) && pointHasPopId(jobPoint, id);
        if (!endpointsMatch || !sizeMatch || !attached) {
          popAuditError = `commuter ${id} is missing, detached, or does not match the requested flow`;
          break;
        }
      }
    }
    let endpointAuditError = null;
    if (!popAuditError && liveAfter?.points) {
      const expectedByPoint = new Map();
      const addExpected = (id, field, size) => {
        const key = String(id);
        let rec = expectedByPoint.get(key);
        if (!rec) { rec = { id, residents: 0, jobs: 0 }; expectedByPoint.set(key, rec); }
        rec[field] += Math.max(0, Number(size) || 0);
      };
      for (const pop of plan.addedPops || []) {
        addExpected(pop.residenceId, "residents", pop.size);
        addExpected(pop.jobId, "jobs", pop.size);
      }
      for (const rec of expectedByPoint.values()) {
        const beforePoint = looseMapGet(plan.before?.points, rec.id);
        const afterPoint = looseMapGet(liveAfter.points, rec.id);
        if (!afterPoint) { endpointAuditError = `counterpart point ${rec.id} is missing after addPops`; break; }
        const expectedResidents = (Number(beforePoint?.residents) || 0) + rec.residents;
        const expectedJobs = (Number(beforePoint?.jobs) || 0) + rec.jobs;
        const actualResidents = Number(afterPoint.residents);
        const actualJobs = Number(afterPoint.jobs);
        if (rec.residents > 0 && (!Number.isFinite(actualResidents) || actualResidents + 0.001 < expectedResidents)) {
          endpointAuditError = `point ${rec.id} should have at least ${expectedResidents} residents, got ${Number.isFinite(actualResidents) ? actualResidents : "missing"}`;
          break;
        }
        if (rec.jobs > 0 && (!Number.isFinite(actualJobs) || actualJobs + 0.001 < expectedJobs)) {
          endpointAuditError = `point ${rec.id} should have at least ${expectedJobs} jobs, got ${Number.isFinite(actualJobs) ? actualJobs : "missing"}`;
          break;
        }
      }
    }
    if (!targetAfter || !Number.isFinite(actualPrimary) || actualPrimary + 0.001 < expectedPrimary || popAuditError || endpointAuditError) {
      const rb = rollbackApplied(addedPointIds, addedPopIds);
      const detail = popAuditError || endpointAuditError || `expected at least ${expectedPrimary} ${plan.side === "residential" ? "residents" : "jobs"}, got ${Number.isFinite(actualPrimary) ? actualPrimary : "missing"}`;
      return {
        ok: false,
        error: `Post-apply audit failed for ${plan.pointId}: ${detail}.` +
          (rb.ok ? " Changes were rolled back." : ` Rollback failed: ${rb.errors.join("; ")}`),
      };
    }

    for (const id of addedPopIds) {
      const rec = plan.ledgerAfter.pops[String(id)] ?? plan.ledgerAfter.pops[id];
      const livePop = looseMapGet(liveAfter?.popsMap, id);
      if (rec && livePop) capturePopRuntimeIntoRecord(rec, livePop);
    }

    return { ok: true, addedPointIds, addedPopIds };
  }

  async function executePlan(plan) {
    const c = await charge(plan.totalCost);
    if (!c.ok) return c;
    const applied = applyPlan(plan);
    if (!applied.ok) {
      refund(plan.totalCost);
      return applied;
    }
    ledger = plan.ledgerAfter;
    ledger.actions.push({
      id: plan.actionId,
      at: Date.now(),
      city: currentCity(),
      pointId: plan.pointId,
      side: plan.side,
      amount: plan.amount,
      cost: plan.totalCost,
      chargedCost: c.charged,
      chargeMethod: "setMoney-verified",
      create: plan.isCreate,
      active: true,
    });
    saveLedger();
    return { ok: true };
  }

  function demandBubbleRadius(point, side) {
    if (!point) return 6;
    const value = Math.max(0, Number(side === "residential" ? point.residents : point.jobs) || 0);
    return clamp(1.8 + 0.57 * Math.sqrt(value), 3.0, 39);
  }

  function focusDemandPoint(pointId, { zoom = 14 } = {}) {
    const id = String(pointId ?? "");
    const p = api.gameState.getDemandData?.()?.points?.get(id);
    if (!Array.isArray(p?.location)) return false;
    const map = api.utils.getMap?.();
    if (!map) return false;
    try {
      const targetZoom = Math.max(Number(map.getZoom?.()) || 0, zoom);
      if (map.easeTo) map.easeTo({ center: p.location, zoom: targetZoom, duration: 350 });
      else if (map.flyTo) map.flyTo({ center: p.location, zoom: targetZoom, duration: 350 });
      else if (map.setCenter) map.setCenter(p.location);
      return true;
    } catch { return false; }
  }

  function focusDevelopmentGroups(groups) {
    const rows = (groups || []).filter((g) => Array.isArray(g?.location));
    if (!rows.length) return false;
    if (rows.length === 1) return focusDemandPoint(rows[0].pointId, { zoom: 13 });
    const map = api.utils.getMap?.();
    if (!map) return false;
    let west = Infinity, south = Infinity, east = -Infinity, north = -Infinity;
    for (const g of rows) {
      const lon = Number(g.location[0]), lat = Number(g.location[1]);
      if (!Number.isFinite(lon) || !Number.isFinite(lat)) continue;
      west = Math.min(west, lon); east = Math.max(east, lon);
      south = Math.min(south, lat); north = Math.max(north, lat);
    }
    try {
      if (Number.isFinite(west) && west <= east && Number.isFinite(south) && south <= north && typeof map.fitBounds === "function") {
        map.fitBounds([[west, south], [east, north]], { padding: 48, duration: 350, maxZoom: 13 });
        return true;
      }
    } catch {}
    let largest = null;
    let largestDemand = -1;
    for (const row of rows) {
      const demand = Number(row.residents || 0) + Number(row.workers || 0);
      if (!largest || demand > largestDemand) { largest = row; largestDemand = demand; }
    }
    return largest ? focusDemandPoint(largest.pointId, { zoom: 13 }) : false;
  }

  function activeDevelopmentGroups() {
    if (activeDevelopmentGroupsCache) return activeDevelopmentGroupsCache;
    const dd = api.gameState.getDemandData?.();
    const groups = new Map();

    for (const action of ledger.actions || []) {
      if (!action || action.active === false || action.pointId == null) continue;
      const id = String(action.pointId);
      let g = groups.get(id);
      if (!g) {
        const live = looseMapGet(dd?.points, action.pointId);
        g = { pointId: id, location: live?.location || null, created: !!ledger.points?.[id]?.created, residents: 0, workers: 0, counterpartResidents: 0, counterpartWorkers: 0, counterpartPointIds: new Set(), popIds: [], spent: 0, actions: 0 };
        groups.set(id, g);
      }
      const amount = Number(action.amount) || 0;
      if (action.side === "residential") g.residents += amount;
      if (action.side === "work") g.workers += amount;
      g.spent += Number(action.chargedCost ?? action.cost) || 0;
      g.actions += 1;
    }

    for (const [popId, rec] of Object.entries(ledger.pops || {})) {
      if (!rec || rec.active === false || rec.primaryId == null) continue;
      const g = groups.get(String(rec.primaryId));
      if (!g) continue;
      g.popIds.push(popId);
      const size = Math.max(0, Number(rec.size) || 0);
      if (rec.primarySide === "residential") {
        g.counterpartWorkers += size;
        if (rec.jobId != null && String(rec.jobId) !== String(rec.primaryId)) g.counterpartPointIds.add(String(rec.jobId));
      } else if (rec.primarySide === "work") {
        g.counterpartResidents += size;
        if (rec.residenceId != null && String(rec.residenceId) !== String(rec.primaryId)) g.counterpartPointIds.add(String(rec.residenceId));
      }
    }

    activeDevelopmentGroupsCache = [...groups.values()].map((g) => ({
      ...g,
      counterpartPoints: g.counterpartPointIds.size,
    })).sort((a,b) => (b.spent-a.spent) || String(a.pointId).localeCompare(String(b.pointId)));
    return activeDevelopmentGroupsCache;
  }

  function developmentInfoStats() {
    if (developmentInfoStatsCache) return developmentInfoStatsCache;
    let totalSpent = 0, improvements = 0, activePeople = 0;
    for (const a of ledger.actions || []) {
      totalSpent += Number(a?.chargedCost ?? a?.cost) || 0;
      improvements += Math.max(0, (Number(a?.amount) || 0) / CFG.STEP);
      if (a?.active !== false) activePeople += Math.max(0, Number(a?.amount) || 0);
    }
    developmentInfoStatsCache = { totalSpent, improvements, activePeople };
    return developmentInfoStatsCache;
  }

  function rebuildLedgerPointAdditions() {
    for (const rec of Object.values(ledger.points || {})) {
      if (!rec) continue;
      rec.addedResidents = 0;
      rec.addedJobs = 0;
    }
    for (const rec of Object.values(ledger.pops || {})) {
      if (!rec || rec.active === false) continue;
      const size = Number(rec.size) || 0;
      if (ledger.points?.[rec.residenceId]) ledger.points[rec.residenceId].addedResidents += size;
      if (ledger.points?.[rec.jobId]) ledger.points[rec.jobId].addedJobs += size;
    }
  }

  function looseMapKey(map, id) {
    if (!map?.has || id == null) return null;
    if (map.has(id)) return id;
    const text = String(id);
    if (map.has(text)) return text;
    if (/^-?\d+(?:\.\d+)?$/.test(text)) {
      const numeric = Number(text);
      if (Number.isFinite(numeric) && map.has(numeric)) return numeric;
    }
    return null;
  }

  function looseMapGet(map, id) {
    const key = looseMapKey(map, id);
    return key == null ? null : map.get(key);
  }

  function candidatePopIdsForLedgerRecord(dd, rec) {
    const ids = [];
    const seen = new Set();
    for (const endpointId of [rec?.primaryId, rec?.residenceId, rec?.jobId]) {
      const point = looseMapGet(dd?.points, endpointId);
      const popIds = point?.popIds;
      if (!popIds || typeof popIds === "string" || typeof popIds[Symbol.iterator] !== "function") continue;
      for (const id of popIds) {
        const key = String(id);
        if (seen.has(key)) continue;
        seen.add(key);
        ids.push(id);
      }
    }
    return ids;
  }

  function repairMigratedInactiveState(dd) {
    if (!dd?.points || !dd?.popsMap) return 0;
    let repaired = 0;
    const used = new Set();
    for (const action of ledger.actions || []) {
      if (!action?.id || action.active !== false) continue;
      const owned = Object.entries(ledger.pops || {}).filter(([, rec]) => rec && String(rec.actionId || "") === String(action.id));
      if (!owned.length) continue;
      const matched = [];
      let complete = true;
      for (const [ledgerId, rec] of owned) {
        let actualId = null;
        const exactKey = looseMapKey(dd.popsMap, ledgerId);
        const exact = exactKey == null ? null : dd.popsMap.get(exactKey);
        if (popMatchesLedgerRecord(exact, rec) && !used.has(String(exact?.id ?? exactKey))) {
          actualId = exact?.id ?? exactKey;
        } else {
          for (const candidateId of candidatePopIdsForLedgerRecord(dd, rec)) {
            const candidateKey = String(candidateId);
            if (used.has(candidateKey)) continue;
            const live = looseMapGet(dd.popsMap, candidateId);
            if (!popMatchesLedgerRecord(live, rec)) continue;
            actualId = live?.id ?? candidateId;
            break;
          }
        }
        if (actualId == null) { complete = false; break; }
        matched.push([ledgerId, actualId]);
        used.add(String(actualId));
      }
      if (!complete) {
        for (const [, actualId] of matched) used.delete(String(actualId));
        continue;
      }
      action.active = true;
      delete action.removedAt;
      for (const [ledgerId] of matched) {
        const rec = ledger.pops?.[ledgerId];
        if (!rec) continue;
        rec.active = true;
        delete rec.removedAt;
      }
      repaired++;
    }
    if (repaired) {
      rebuildLedgerPointAdditions();
      clearDevelopmentSummaryCaches();
    }
    return repaired;
  }

  function popMatchesLedgerRecord(live, rec) {
    return !!live && !!rec &&
      String(live.residenceId ?? "") === String(rec.residenceId ?? "") &&
      String(live.jobId ?? "") === String(rec.jobId ?? "") &&
      Math.abs((Number(live.size) || 0) - (Number(rec.size) || 0)) < 0.001;
  }

  let replayingLedgerDemand = false;

  async function replayActiveLedgerDemand(dd) {
    if (!dd?.points || !dd?.popsMap) return { ok: false, error: "Live demand data is unavailable." };
    if (!api.demand) return { ok: false, error: "Subway Builder demand editor API is unavailable." };

    const activeEntries = Object.entries(ledger.pops || {}).filter(([, rec]) => rec && rec.active !== false && (Number(rec.size) || 0) > 0);
    if (!activeEntries.length) return { ok: true, restoredPops: 0, recreatedPoints: 0, rekeyed: 0 };

    let ledgerChanged = false;
    const activeEndpointIds = new Set();
    for (const [, rec] of activeEntries) {
      activeEndpointIds.add(String(rec.residenceId));
      activeEndpointIds.add(String(rec.jobId));
    }
    for (const id of activeEndpointIds) {
      const livePoint = looseMapGet(dd.points, id);
      const pointRec = ledger.points?.[id];
      if (livePoint && pointRec && livePoint.location && !pointRec.location) {
        pointRec.location = Array.isArray(livePoint.location) ? [...livePoint.location] : livePoint.location;
        ledgerChanged = true;
      }
    }

    const pointsToCreate = [];
    for (const id of activeEndpointIds) {
      if (looseMapKey(dd.points, id) != null) continue;
      const rec = ledger.points?.[id];
      const loc = rec?.location;
      const validLoc = Array.isArray(loc) && loc.length >= 2 && Number.isFinite(Number(loc[0])) && Number.isFinite(Number(loc[1]));
      if (!rec?.created || !validLoc) {
        return { ok: false, error: `Cannot safely restore Demand Developer because demand point ${id} is missing${rec?.created ? " and its older ledger has no saved location" : ""}.` };
      }
      pointsToCreate.push({ id, location: [Number(loc[0]), Number(loc[1])] });
    }

    const missing = [];
    for (const [ledgerId, rec] of activeEntries) {
      const exactKey = looseMapKey(dd.popsMap, ledgerId);
      if (exactKey != null && liveOwnedPopIsComplete(dd, exactKey, rec)) continue;
      missing.push({ ledgerId: String(ledgerId), rec });
    }

    if (!pointsToCreate.length && !missing.length) {
      if (ledgerChanged) await saveLedger();
      return { ok: true, restoredPops: 0, recreatedPoints: 0, rekeyed: 0 };
    }

    const createdPointIds = [];
    const addedPopIds = [];
    replayingLedgerDemand = true;
    try {
      for (const item of missing) detachLedgerPopObject(dd, item.ledgerId, item.rec);

      for (const point of pointsToCreate) {
        const r = api.demand.addDemandPoint?.({ id: point.id, location: point.location });
        if (!r?.success || String(r.pointId ?? point.id) !== String(point.id)) {
          for (const id of addedPopIds) {
            const rec = ledger.pops?.[String(id)] ?? ledger.pops?.[id];
            if (rec) detachLedgerPopObject(api.gameState.getDemandData?.() || dd, id, rec);
          }
          const rb = rollbackApplied(createdPointIds, []);
          return { ok: false, error: `Could not recreate Demand Developer point ${point.id}: ${r?.error || "unexpected point id"}` + (rb.ok ? "" : `; rollback failed: ${rb.errors.join("; ")}`) };
        }
        createdPointIds.push(r.pointId ?? point.id);
      }

      let live = api.gameState.getDemandData?.() || dd;
      if (!live?.points || !live?.popsMap) {
        const rb = rollbackApplied(createdPointIds, []);
        return { ok: false, error: "Live demand disappeared while restoring Demand Developer." + (rb.ok ? "" : ` Rollback failed: ${rb.errors.join("; ")}`) };
      }

      for (const item of missing) {
        const res = looseMapGet(live.points, item.rec.residenceId);
        const job = looseMapGet(live.points, item.rec.jobId);
        if (!res || !job) {
          for (const id of addedPopIds) {
            const rec = ledger.pops?.[String(id)] ?? ledger.pops?.[id];
            if (rec) detachLedgerPopObject(live, id, rec);
          }
          const rb = rollbackApplied(createdPointIds, []);
          return { ok: false, error: `Could not restore commuter ${item.rec.residenceId} -> ${item.rec.jobId}: endpoint missing.` + (rb.ok ? "" : ` Rollback failed: ${rb.errors.join("; ")}`) };
        }
        if (!(Number(item.rec.drivingDistance) > 0) || !(Number(item.rec.drivingSeconds) > 0)) {
          const donorBands = buildDrivingDonors(live);
          const drive = estimateDriving(live, `replay:${item.ledgerId}`, item.rec.residenceId, item.rec.jobId, donorBands);
          if (!(Number(item.rec.drivingDistance) > 0)) item.rec.drivingDistance = drive.distance;
          if (!(Number(item.rec.drivingSeconds) > 0)) item.rec.drivingSeconds = drive.seconds;
          ledgerChanged = true;
        }
        if (!materializeLedgerPop(live, item.ledgerId, item.rec)) {
          for (const id of addedPopIds) {
            const rec = ledger.pops?.[String(id)] ?? ledger.pops?.[id];
            if (rec) detachLedgerPopObject(live, id, rec);
          }
          const rb = rollbackApplied(createdPointIds, []);
          return { ok: false, error: `Could not materialize saved commuter ${item.rec.residenceId} -> ${item.rec.jobId}.` + (rb.ok ? "" : ` Rollback failed: ${rb.errors.join("; ")}`) };
        }
        addedPopIds.push(String(item.ledgerId));
      }

      reconcilePointTotalsFromLedger(live);

      if (addedPopIds.length && typeof api.demand?.updatePops === "function") {
        try {
          const touch = api.demand.updatePops(addedPopIds.map((id) => ({ id, size: Number(ledger.pops?.[id]?.size) || 0 })));
          if (!touch?.success) console.warn(`${TAG} restored pops are live but demand refresh touch failed: ${touch?.error || "updatePops failed"}`);
          live = api.gameState.getDemandData?.() || live;
        } catch (e) {
          console.warn(`${TAG} restored pops are live but demand refresh touch threw`, e);
        }
      }

      for (const item of missing) {
        if (!liveOwnedPopIsComplete(live, item.ledgerId, item.rec)) {
          return { ok: false, error: `Restored commuter ${item.rec.residenceId} -> ${item.rec.jobId} failed verification.` };
        }
      }
      if (missing.length) ledgerChanged = true;
      rebuildLedgerPointAdditions();
      clearDevelopmentSummaryCaches();
      if (ledgerChanged || createdPointIds.length || addedPopIds.length) await saveLedger();
      return { ok: true, restoredPops: addedPopIds.length, recreatedPoints: createdPointIds.length, rekeyed: 0 };
    } catch (e) {
      const rb = rollbackApplied(createdPointIds, addedPopIds);
      return { ok: false, error: `Demand Developer replay failed: ${String(e?.message || e)}` + (rb.ok ? "" : `; rollback failed: ${rb.errors.join("; ")}`) };
    } finally {
      replayingLedgerDemand = false;
    }
  }

  function resolveLivePopIds(ledgerIds) {
    const dd = api.gameState.getDemandData?.();
    if (!dd?.popsMap) return { ok: false, error: "Live commuter data is unavailable." };

    const requested = [];
    for (const id of ledgerIds || []) {
      const key = String(id);
      const rec = ledger.pops?.[key];
      if (rec?.active === false || !rec) continue;
      requested.push({ ledgerId: key, rec, liveId: null });
    }
    if (!requested.length) return { ok: false, error: "No active Demand Developer commuters are recorded here." };

    const used = new Set();
    for (const item of requested) {
      const actualKey = looseMapKey(dd.popsMap, item.ledgerId);
      const live = actualKey == null ? null : dd.popsMap.get(actualKey);
      if (!popMatchesLedgerRecord(live, item.rec)) continue;
      const actualId = live.id ?? actualKey;
      item.liveId = actualId;
      used.add(String(actualId));
    }

    const candidateIds = [];
    const candidateSeen = new Set();
    for (const item of requested) {
      if (item.liveId != null) continue;
      for (const endpointId of [item.rec.primaryId, item.rec.residenceId, item.rec.jobId]) {
        const point = looseMapGet(dd.points, endpointId);
        const ids = point?.popIds;
        if (!ids || typeof ids === "string" || typeof ids[Symbol.iterator] !== "function") continue;
        for (const candidateId of ids) {
          const key = String(candidateId);
          if (candidateSeen.has(key)) continue;
          candidateSeen.add(key);
          candidateIds.push(candidateId);
        }
      }
    }

    const tryCandidates = (ids) => {
      for (const item of requested) {
        if (item.liveId != null) continue;
        let fallback = null;
        for (const candidateId of ids) {
          const key = String(candidateId);
          if (used.has(key)) continue;
          const live = looseMapGet(dd.popsMap, candidateId);
          if (!popMatchesLedgerRecord(live, item.rec)) continue;
          if (key.startsWith("mod-pop-")) {
            item.liveId = live?.id ?? candidateId;
            used.add(String(item.liveId));
            fallback = null;
            break;
          }
          if (fallback == null) fallback = candidateId;
        }
        if (item.liveId == null && fallback != null) {
          const live = looseMapGet(dd.popsMap, fallback);
          item.liveId = live?.id ?? fallback;
          used.add(String(item.liveId));
        }
      }
    };
    tryCandidates(candidateIds);

    if (requested.some((item) => item.liveId == null)) {
      tryCandidates([...dd.popsMap.keys()]);
    }

    const unresolved = requested.filter((item) => item.liveId == null);
    if (unresolved.length) {
      return { ok: false, error: `Could not safely match ${unresolved.length} saved development commuter${unresolved.length === 1 ? "" : "s"} to the loaded map.` };
    }
    return { ok: true, resolved: requested };
  }

  function activeOwnedPopCount() {
    let count = 0;
    for (const rec of Object.values(ledger.pops || {})) if (rec && rec.active !== false) count += 1;
    return count;
  }

  function removeOwnedPops(popIds) {
    const resolution = resolveLivePopIds(popIds);
    if (!resolution.ok) return resolution;
    const ids = resolution.resolved.map((entry) => entry.liveId);
    try {
      const r = api.demand?.removePops?.(ids);
      if (!r?.success) return { ok: false, error: r?.error || "Could not remove development commuters." };
      const now = Date.now();
      for (const { ledgerId } of resolution.resolved) {
        const rec = ledger.pops?.[ledgerId];
        if (!rec) continue;
        rec.active = false;
        rec.removedAt = now;
      }
      rebuildLedgerPointAdditions();
      void saveLedger();
      invalidatePreviews({ demand: true, ledgerState: true });
      refreshUi();
      return { ok: true, removedCount: Number(r.removedCount ?? ids.length) };
    } catch (e) { return { ok: false, error: String(e?.message || e) }; }
  }

  function removeDevelopmentForPoint(pointId) {
    const ids = Object.entries(ledger.pops || {}).filter(([, rec]) => rec?.active !== false && String(rec?.primaryId || "") === String(pointId)).map(([id]) => id);
    const result = removeOwnedPops(ids);
    if (!result.ok) return result;
    const now = Date.now();
    for (const a of ledger.actions || []) if (String(a?.pointId || "") === String(pointId) && a.active !== false) { a.active = false; a.removedAt = now; }
    const live = api.gameState.getDemandData?.()?.points?.get(pointId);
    if (ledger.points?.[pointId]?.created && live && (live.residents || 0) === 0 && (live.jobs || 0) === 0 && (live.popIds?.length || 0) === 0) {
      try { api.demand?.removeDemandPoint?.(pointId); } catch {}
    }
    saveLedger();
    invalidatePreviews({ demand: true, ledgerState: true });
    refreshUi();
    return result;
  }

  function removeAllDevelopment() {
    const result = removeOwnedPops(Object.entries(ledger.pops || {}).filter(([, rec]) => rec?.active !== false).map(([id]) => id));
    if (!result.ok) return result;
    const now = Date.now();
    for (const a of ledger.actions || []) if (a && a.active !== false) { a.active = false; a.removedAt = now; }
    const dd = api.gameState.getDemandData?.();
    for (const [pointId, rec] of Object.entries(ledger.points || {})) {
      if (!rec?.created) continue;
      const live = dd?.points?.get(pointId);
      if (live && (live.residents || 0) === 0 && (live.jobs || 0) === 0 && (live.popIds?.length || 0) === 0) {
        try { api.demand?.removeDemandPoint?.(pointId); } catch {}
      }
    }
    saveLedger();
    invalidatePreviews({ demand: true, ledgerState: true });
    refreshUi();
    return result;
  }

  let lastOverlaySource = null;
  let lastOverlayKey = null;

  function overlayRenderKey(s = uiStore.get()) {
    const pending = Array.isArray(s.pendingLocation) ? `${Number(s.pendingLocation[0])},${Number(s.pendingLocation[1])}` : "";
    return [
      demandRevision,
      s.panelOpen ? 1 : 0,
      s.infoOpen ? 1 : 0,
      s.infoMapVisible ? 1 : 0,
      s.mode || "",
      s.existingSide || "",
      s.selectedId || "",
      s.previewExistingId || "",
      pending,
    ].join("|");
  }

  function overlayGeoJSON() {
    const s = uiStore.get();
    const features = [];
    if (!s.panelOpen || !demandReady) return { type: "FeatureCollection", features };

    const dd = api.gameState.getDemandData?.();
    if (s.infoOpen) {
      if (!s.infoMapVisible && !s.selectedId) return { type: "FeatureCollection", features };
      const improvedGroups = activeDevelopmentGroups();
      const improvedById = new Map(improvedGroups.map((g) => [String(g.pointId), g]));
      if (dd?.points) {
        for (const [id, p] of dd.points.entries()) {
          const sid = String(id);
          const improved = improvedById.get(sid);
          if (!improved) continue;
          if (!s.infoMapVisible && sid !== String(s.selectedId || "")) continue;
          if (!Array.isArray(p?.location)) continue;
          const addedResidents = Number(improved.residents || 0);
          const addedWorkers = Number(improved.workers || 0);
          let radiusSide;
          if (addedResidents > addedWorkers) radiusSide = "residential";
          else if (addedWorkers > addedResidents) radiusSide = "work";
          else radiusSide = Number(p?.residents || 0) >= Number(p?.jobs || 0) ? "residential" : "work";
          features.push({
            type: "Feature",
            properties: {
              kind: "existing",
              pointId: sid,
              pointType: radiusSide,
              bubbleRadius: demandBubbleRadius(p, radiusSide),
              selected: sid === String(s.selectedId || "") ? 1 : 0,
            },
            geometry: { type: "Point", coordinates: p.location },
          });
        }
      }
      return { type: "FeatureCollection", features };
    }

    if (dd?.points) {
      for (const [id, p] of dd.points.entries()) {
        if (!Array.isArray(p?.location)) continue;
        const residents = Number(p.residents || 0);
        const workers = Number(p.jobs || 0);
        let include = false;
        let radiusSide = residents >= workers ? "residential" : "work";
        let pointType = radiusSide;

        if (s.mode === "create") {
          include = residents > 0 || workers > 0;
          pointType = "neutral";
        } else if (!s.existingSide && s.mode === "normal") {
          include = residents > 0 || workers > 0;
          pointType = "neutral";
        } else if (s.existingSide === "residential") {
          include = residents > 0;
          pointType = "residential";
          radiusSide = "residential";
        } else if (s.existingSide === "work") {
          include = workers > 0;
          pointType = "work";
          radiusSide = "work";
        }
        if (!include) continue;
        features.push({
          type: "Feature",
          properties: {
            kind: "existing",
            pointId: String(id),
            pointType,
            bubbleRadius: demandBubbleRadius(p, radiusSide),
            selected: (String(id) === String(s.selectedId || "") || (s.mode === "create" && String(id) === String(s.previewExistingId || ""))) ? 1 : 0,
          },
          geometry: { type: "Point", coordinates: p.location },
        });
      }
    }

    if (s.mode === "create" && s.pendingLocation) {
      features.push({
        type: "Feature",
        properties: { kind: "pending" },
        geometry: { type: "Point", coordinates: s.pendingLocation },
      });
    }
    return { type: "FeatureCollection", features };
  }

  const EMPTY_GEOJSON = { type: "FeatureCollection", features: [] };
  let demandReady = false;
  let pointsNeedRefresh = true;
  let lifecycleEpoch = 0;
  let lifecycleCity = null;

  function cleanupLegacyOverlay(map = api.utils.getMap?.()) {
    if (!map) return;
    try { if (map.getLayer?.(CFG.LEGACY_LAYER_ID)) map.removeLayer(CFG.LEGACY_LAYER_ID); } catch {}
    try { if (map.getSource?.(CFG.LEGACY_SOURCE_ID)) map.removeSource(CFG.LEGACY_SOURCE_ID); } catch {}
  }

  function overlayLayerSpecs() {
    return [
      {
        id: CFG.CONTEXT_LAYER_ID,
        type: "circle",
        source: CFG.SOURCE_ID,
        filter: ["==", ["get", "kind"], "existing"],
        paint: {
          "circle-radius": ["+", ["get", "bubbleRadius"], ["case", ["==", ["get", "selected"], 1], 7.5, 0]],
          "circle-color": ["match", ["get", "pointType"], "residential", "#3b82f6", "work", "#f59e0b", "#6b7280"],
          "circle-opacity": ["case", ["==", ["get", "selected"], 1], 0.60, 0.32],
          "circle-stroke-width": ["case", ["==", ["get", "selected"], 1], 4, 2],
          "circle-stroke-color": ["case", ["==", ["get", "selected"], 1], "#ef4444", ["match", ["get", "pointType"], "residential", "#60a5fa", "work", "#f59e0b", "#9ca3af"]],
          "circle-stroke-opacity": ["case", ["==", ["get", "selected"], 1], 1, 0.78],
        },
      },
      {
        id: CFG.PENDING_LAYER_ID,
        type: "circle",
        source: CFG.SOURCE_ID,
        filter: ["==", ["get", "kind"], "pending"],
        paint: {
          "circle-radius": 15,
          "circle-color": "rgba(255,255,255,.16)",
          "circle-opacity": 1,
          "circle-stroke-width": 4,
          "circle-stroke-color": "#ffffff",
          "circle-stroke-opacity": 1,
        },
      },
    ];
  }

  function ensureOverlay() {
    const map = api.utils.getMap?.();
    if (!map) return false;
    cleanupLegacyOverlay(map);

    try {
      if (!map.getSource?.(CFG.SOURCE_ID) && typeof map.addSource === "function") {
        map.addSource(CFG.SOURCE_ID, { type: "geojson", data: EMPTY_GEOJSON });
        lastOverlaySource = null;
        lastOverlayKey = null;
      }
      if (map.getSource?.(CFG.SOURCE_ID) && typeof map.addLayer === "function") {
        for (const spec of overlayLayerSpecs()) {
          if (!map.getLayer?.(spec.id)) map.addLayer(spec);
        }
      }
    } catch {
      return false;
    }

    const ready = !!map.getSource?.(CFG.SOURCE_ID) &&
      !!map.getLayer?.(CFG.CONTEXT_LAYER_ID) &&
      !!map.getLayer?.(CFG.PENDING_LAYER_ID);
    if (ready) {
      if (demandReady) refreshOverlay();
      else clearOverlay(map);
    }
    return ready;
  }
  function clearOverlay(map = api.utils.getMap?.()) {
    try {
      const source = map?.getSource(CFG.SOURCE_ID);
      if (!source) return;
      if (source === lastOverlaySource && lastOverlayKey === "__empty__") return;
      source.setData?.(EMPTY_GEOJSON);
      lastOverlaySource = source;
      lastOverlayKey = "__empty__";
    } catch {}
  }
  function refreshOverlay() {
    const s = uiStore.get();
    if (!demandReady || !s.panelOpen) { clearOverlay(); return; }
    try {
      const map = api.utils.getMap?.();
      const source = map?.getSource(CFG.SOURCE_ID);
      if (!source) return;
      const key = overlayRenderKey(s);
      if (source === lastOverlaySource && key === lastOverlayKey) return;
      source.setData?.(overlayGeoJSON());
      lastOverlaySource = source;
      lastOverlayKey = key;
    } catch {}
  }

  function resetUiForMapTransition(status = "") {
    lifecycleEpoch += 1;
    demandReady = false;
    ledger = newLedger();
    loadedLedgerKey = null;
    uiStore.set({ mode: "normal", existingSide: null, createSide: null, selectedId: null, previewExistingId: null, selectedAmount: null, pendingLocation: null, infoOpen: false, status, busy: false });
    clearOverlay();
    lastOverlaySource = null;
    lastOverlayKey = null;
    clearLocationIndexData();
  }

  const uiStore = (() => {
    let state = { mode: "normal", existingSide: null, createSide: null, selectedId: null, previewExistingId: null, selectedAmount: null, pendingLocation: null, panelOpen: false, infoOpen: false, infoMapVisible: false, status: "", busy: false, revision: 0 };
    const subs = new Set();
    return {
      get: () => state,
      set: (patch) => { state = { ...state, ...patch, revision: state.revision + 1 }; for (const fn of subs) fn(); },
      subscribe: (fn) => { subs.add(fn); return () => subs.delete(fn); },
    };
  })();

  function refreshUi() { uiStore.set({}); refreshOverlay(); }

  const DEMAND_HIT_GRID_DEG = 0.02;
  let demandHitIndexRevision = -1;
  let demandHitIndexPoints = null;
  let demandHitIndexGrid = null;

  function demandHitGridCell(lon, lat) {
    return `${Math.floor(lon / DEMAND_HIT_GRID_DEG)},${Math.floor(lat / DEMAND_HIT_GRID_DEG)}`;
  }

  function ensureDemandHitIndex(dd) {
    if (demandHitIndexRevision === demandRevision && demandHitIndexPoints && demandHitIndexGrid) return;
    const points = [];
    const grid = new Map();
    if (dd?.points) {
      for (const [id, p] of dd.points.entries()) {
        if (!Array.isArray(p?.location)) continue;
        const lon = Number(p.location[0]), lat = Number(p.location[1]);
        if (!Number.isFinite(lon) || !Number.isFinite(lat)) continue;
        const rec = { id: String(id), p, lon, lat };
        points.push(rec);
        const key = demandHitGridCell(lon, lat);
        const bucket = grid.get(key) || [];
        bucket.push(rec);
        grid.set(key, bucket);
      }
    }
    demandHitIndexPoints = points;
    demandHitIndexGrid = grid;
    demandHitIndexRevision = demandRevision;
  }

  function demandGeoCandidates(location, maxMeters, dd) {
    ensureDemandHitIndex(dd);
    if (!demandHitIndexPoints?.length || !Array.isArray(location)) return [];
    const lon = Number(location[0]), lat = Number(location[1]);
    if (!Number.isFinite(lon) || !Number.isFinite(lat) || !Number.isFinite(maxMeters) || maxMeters <= 0) return [];
    const dLat = maxMeters / 111320;
    const metersPerDegLon = 111320 * Math.abs(Math.cos(lat * Math.PI / 180));
    const dLon = maxMeters / Math.max(1, metersPerDegLon);
    if (lon - dLon < -180 || lon + dLon > 180) return demandHitIndexPoints;
    const gx1 = Math.floor((lon - dLon) / DEMAND_HIT_GRID_DEG), gx2 = Math.floor((lon + dLon) / DEMAND_HIT_GRID_DEG);
    const gy1 = Math.floor((lat - dLat) / DEMAND_HIT_GRID_DEG), gy2 = Math.floor((lat + dLat) / DEMAND_HIT_GRID_DEG);
    if ((gx2 - gx1 + 1) * (gy2 - gy1 + 1) > 1600) return demandHitIndexPoints;
    const out = [];
    for (let gx = gx1; gx <= gx2; gx++) {
      for (let gy = gy1; gy <= gy2; gy++) {
        const bucket = demandHitIndexGrid.get(`${gx},${gy}`);
        if (bucket) out.push(...bucket);
      }
    }
    return out;
  }

  function demandHitCandidates(map, point, dd) {
    ensureDemandHitIndex(dd);
    if (!demandHitIndexPoints?.length) return [];
    if (typeof map.unproject !== "function") return demandHitIndexPoints;
    let corners;
    try {
      const x = Number(point.x), y = Number(point.y);
      corners = [
        map.unproject([x - 50, y - 50]),
        map.unproject([x + 50, y - 50]),
        map.unproject([x + 50, y + 50]),
        map.unproject([x - 50, y + 50]),
      ];
    } catch {
      return demandHitIndexPoints;
    }
    const lons = corners.map((c) => Number(c?.lng ?? c?.lon));
    const lats = corners.map((c) => Number(c?.lat));
    if (![...lons, ...lats].every(Number.isFinite)) return demandHitIndexPoints;
    const minLon = Math.min(...lons), maxLon = Math.max(...lons);
    if (maxLon - minLon > 180) return demandHitIndexPoints;
    const minLat = Math.min(...lats), maxLat = Math.max(...lats);
    const gx1 = Math.floor(minLon / DEMAND_HIT_GRID_DEG), gx2 = Math.floor(maxLon / DEMAND_HIT_GRID_DEG);
    const gy1 = Math.floor(minLat / DEMAND_HIT_GRID_DEG), gy2 = Math.floor(maxLat / DEMAND_HIT_GRID_DEG);
    if ((gx2 - gx1 + 1) * (gy2 - gy1 + 1) > 1600) return demandHitIndexPoints;
    const out = [];
    for (let gx = gx1; gx <= gx2; gx++) {
      for (let gy = gy1; gy <= gy2; gy++) {
        const bucket = demandHitIndexGrid.get(`${gx},${gy}`);
        if (bucket) out.push(...bucket);
      }
    }
    return out;
  }

  function contextPointIdAt(map, point) {
    if (!map || !point) return null;
    if (map.queryRenderedFeatures) {
      try {
        const hits = map.queryRenderedFeatures(point, { layers: [CFG.CONTEXT_LAYER_ID] }) || [];
        let bestId = null;
        let bestD2 = Infinity;
        for (const f of hits) {
          const id = f?.properties?.pointId;
          const coords = f?.geometry?.type === "Point" ? f.geometry.coordinates : null;
          if (id == null || !Array.isArray(coords)) continue;
          let pp;
          try { pp = map.project({ lng: coords[0], lat: coords[1] }); }
          catch { try { pp = map.project(coords); } catch { continue; } }
          const dx = Number(pp?.x) - Number(point.x);
          const dy = Number(pp?.y) - Number(point.y);
          if (!Number.isFinite(dx) || !Number.isFinite(dy)) continue;
          const d2 = dx * dx + dy * dy;
          if (d2 < bestD2) {
            bestD2 = d2;
            bestId = String(id);
          }
        }
        if (bestId != null) return bestId;
      } catch {}
    }

    const dd = api.gameState.getDemandData?.();
    if (!dd?.points || typeof map.project !== "function") return null;
    let bestId = null;
    let bestD2 = Infinity;
    for (const rec of demandHitCandidates(map, point, dd)) {
      const { id, p } = rec;
      const residents = Number(p.residents || 0);
      const workers = Number(p.jobs || 0);
      if (!(residents > 0 || workers > 0)) continue;
      let pp;
      try { pp = map.project({ lng: p.location[0], lat: p.location[1] }); }
      catch { try { pp = map.project(p.location); } catch { continue; } }
      const dx = Number(pp?.x) - Number(point.x);
      const dy = Number(pp?.y) - Number(point.y);
      if (!Number.isFinite(dx) || !Number.isFinite(dy)) continue;
      const radiusSide = residents >= workers ? "residential" : "work";
      const hitRadius = Math.max(11, demandBubbleRadius(p, radiusSide) + 6);
      const d2 = dx * dx + dy * dy;
      if (d2 <= hitRadius * hitRadius && d2 < bestD2) {
        bestD2 = d2;
        bestId = id;
      }
    }
    return bestId;
  }

  function sideForPoint(p) {
    const r = Number(p?.residents || 0) > 0;
    const w = Number(p?.jobs || 0) > 0;
    if (r && !w) return "residential";
    if (w && !r) return "work";
    return null;
  }

  function dominantLiveSide(p) {
    const residents = Math.max(0, Number(p?.residents || 0));
    const workers = Math.max(0, Number(p?.jobs || 0));
    return residents >= workers ? "residential" : "work";
  }

  function placementLayerRole(layerId, sourceLayer) {
    const sl = String(sourceLayer || "").toLowerCase();
    if (sl === "water" || sl === "ocean_foundations") return "water";
    if (sl === "parks" || sl === "park") return "green";
    if (sl === "airports" || sl === "aeroway") return "airport";
    const id = String(layerId || "").toLowerCase();
    if (/water|ocean|lake|river/.test(id)) return "water";
    if (/airport|aerodrome|aero/.test(id)) return "airport";
    if (/park|green|forest|wood|grass/.test(id)) return "green";
    return null;
  }

  function placementBlockAt(map, point) {
    if (!map || !point) return null;
    let features = [];
    try {
      const pad = 2;
      const box = [
        [point.x - pad, point.y - pad],
        [point.x + pad, point.y + pad],
      ];
      features = map.queryRenderedFeatures(box) || [];
    } catch {
      try { features = map.queryRenderedFeatures(point) || []; } catch { return null; }
    }
    let best = null;
    const priority = { water: 2, airport: 1 };
    for (const f of features) {
      const layerType = String(f?.layer?.type || "").toLowerCase();
      const geomType = String(f?.geometry?.type || "").toLowerCase();
      const physical = layerType === "fill" || layerType === "fill-extrusion" ||
        geomType === "polygon" || geomType === "multipolygon" ||
        (layerType === "line" && geomType.includes("line"));
      if (!physical) continue;
      const role = placementLayerRole(f?.layer?.id, f?.layer?.["source-layer"] || f?.sourceLayer);
      if (role !== "water" && role !== "airport") continue;
      if (!best || priority[role] > priority[best]) best = role;
    }
    return best;
  }

  function boundsArray(raw) {
    if (!raw) return null;
    if (Array.isArray(raw) && raw.length >= 4 && raw.slice(0, 4).every(Number.isFinite)) return raw.slice(0, 4).map(Number);
    try {
      if (typeof raw.toArray === "function") {
        const a = raw.toArray();
        if (Array.isArray(a) && a.length >= 2) return [Number(a[0][0]), Number(a[0][1]), Number(a[1][0]), Number(a[1][1])];
      }
      if ([raw.getWest, raw.getSouth, raw.getEast, raw.getNorth].every((fn) => typeof fn === "function")) {
        return [Number(raw.getWest()), Number(raw.getSouth()), Number(raw.getEast()), Number(raw.getNorth())];
      }
    } catch {}
    return null;
  }

  function validPlayableBounds(b) {
    if (!Array.isArray(b) || b.length < 4 || !b.every(Number.isFinite)) return false;
    const [w, south, e, north] = b;
    return south < north && south >= -90 && north <= 90 && w !== e;
  }

  function locationInBounds(location, b) {
    if (!validPlayableBounds(b) || !Array.isArray(location)) return true;
    const [lng, lat] = location.map(Number);
    if (!Number.isFinite(lng) || !Number.isFinite(lat)) return false;
    const [w, south, e, north] = b;
    if (lat < south || lat > north) return false;
    return w <= e ? lng >= w && lng <= e : lng >= w || lng <= e;
  }

  let demandGeometrySummaryRevision = -1;
  let demandGeometrySummaryCache = null;

  function demandGeometrySummary() {
    if (demandGeometrySummaryRevision === demandRevision && demandGeometrySummaryCache) return demandGeometrySummaryCache;
    const dd = api.gameState.getDemandData?.();
    let sx = 0, sy = 0, n = 0;
    let minLon = Infinity, minLat = Infinity, maxLon = -Infinity, maxLat = -Infinity, latSum = 0;
    if (dd?.points) {
      for (const p of dd.points.values()) {
        if (!Array.isArray(p?.location)) continue;
        const lon = Number(p.location[0]), lat = Number(p.location[1]);
        if (!Number.isFinite(lon) || !Number.isFinite(lat)) continue;
        sx += lon; sy += lat; latSum += lat; n += 1;
        minLon = Math.min(minLon, lon); maxLon = Math.max(maxLon, lon);
        minLat = Math.min(minLat, lat); maxLat = Math.max(maxLat, lat);
      }
    }
    demandGeometrySummaryCache = n ? {
      count: n,
      center: [sx / n, sy / n],
      minLon, minLat, maxLon, maxLat,
      midLat: latSum / n,
    } : { count: 0, center: null };
    demandGeometrySummaryRevision = demandRevision;
    return demandGeometrySummaryCache;
  }

  function playableMapBounds(map) {
    if (!map) return null;
    try {
      const b = boundsArray(map.getMaxBounds?.());
      if (validPlayableBounds(b)) return b;
    } catch {}
    try {
      const tr = map.transform;
      const lr = tr?.lngRange, ar = tr?.latRange;
      if (Array.isArray(lr) && Array.isArray(ar)) {
        const b = [Number(lr[0]), Number(ar[0]), Number(lr[1]), Number(ar[1])];
        if (validPlayableBounds(b)) return b;
      }
    } catch {}

    let style = null;
    try { style = map.getStyle?.(); } catch {}
    const candidates = [];
    for (const src of Object.values(style?.sources || {})) {
      const b = boundsArray(src?.bounds);
      if (!validPlayableBounds(b)) continue;
      const lonSpan = b[0] <= b[2] ? b[2] - b[0] : 360 - b[0] + b[2];
      const latSpan = b[3] - b[1];
      if (!(lonSpan > 0 && latSpan > 0) || lonSpan > 60 || latSpan > 40) continue;
      candidates.push({ b, area: lonSpan * latSpan });
    }
    if (!candidates.length) return null;
    const center = demandGeometrySummary().center;
    const pool = center ? candidates.filter((x) => locationInBounds(center, x.b)) : candidates;
    const usable = pool.length ? pool : candidates;
    let best = usable[0];
    for (let i = 1; i < usable.length; i++) if (usable[i].area < best.area) best = usable[i];
    return best.b;
  }

  function areaFallbackOutsideDemandFootprint(location) {
    if (!Array.isArray(location)) return false;
    const summary = demandGeometrySummary();
    if (!summary.count) return false;
    const marginM = 3000;
    const dLat = marginM / 111320;
    const dLon = marginM / Math.max(20000, 111320 * Math.cos(summary.midLat * Math.PI / 180));
    return location[0] < summary.minLon - dLon || location[0] > summary.maxLon + dLon ||
      location[1] < summary.minLat - dLat || location[1] > summary.maxLat + dLat;
  }

  function hasNativeDemandAnchorNearby(location, maxDistanceM = NEW_POINT_NATIVE_ANCHOR_MAX_M) {
    const dd = api.gameState.getDemandData?.();
    if (!dd?.points?.size || !Array.isArray(location)) return false;
    for (const rec of demandGeoCandidates(location, maxDistanceM, dd)) {
      const { id, p } = rec;
      if (!Array.isArray(p?.location)) continue;
      const pointId = String(id);
      if (pointId.startsWith(CFG.NEW_POINT_PREFIX) || ledger.points?.[pointId]?.created) continue;
      if (haversine(location, p.location) <= maxDistanceM) return true;
    }
    return false;
  }

  function placementBlockReason(location) {
    const map = api.utils.getMap?.();
    if (!map || !Array.isArray(location)) return null;
    const bounds = playableMapBounds(map);
    if (bounds && !locationInBounds(location, bounds)) return "Can't place a point outside the playable map.";
    if (!hasNativeDemandAnchorNearby(location)) return "New points must be within 5 km of an original demand point.";
    let point = null;
    try { point = map.project({ lng: location[0], lat: location[1] }); } catch {
      try { point = map.project(location); } catch { return null; }
    }
    const role = placementBlockAt(map, point);
    if (role === "water") return "Can't place a point on water.";
    if (role === "airport") return "Can't place a point on airport ground.";

    const place = locationHeaderParts(location);
    if (place?.title === "Area" && areaFallbackOutsideDemandFootprint(location)) {
      return "Can't place a point outside the mapped area.";
    }
    return null;
  }

  function developedSideForPoint(pointId, p = null) {
    const g = activeDevelopmentGroups().find((x) => String(x.pointId) === String(pointId));
    if (!g) return sideForPoint(p) || "residential";
    const addedResidents = Number(g.residents || 0);
    const addedWorkers = Number(g.workers || 0);
    if (addedResidents > addedWorkers) return "residential";
    if (addedWorkers > addedResidents) return "work";
    if (Number(p?.residents || 0) >= Number(p?.jobs || 0)) return "residential";
    return "work";
  }

  function openPointForImprovement(pointId) {
    const dd = api.gameState.getDemandData?.();
    const id = String(pointId);
    const p = dd?.points?.get(id);
    if (!p) {
      uiStore.set({ status: "This demand point is no longer available." });
      return false;
    }
    uiStore.set({
      infoOpen: false,
      infoMapVisible: false,
      mode: "normal",
      createSide: null,
      pendingLocation: null,
      existingSide: developedSideForPoint(id, p),
      selectedId: id,
      selectedAmount: CFG.STEP,
      status: "",
    });
    refreshOverlay();
    focusDemandPoint(id);
    return true;
  }

  function mapClickHandler(e) {
    const s = uiStore.get();
    if (!s.panelOpen) return;
    const map = api.utils.getMap();
    if (!map) return;
    const dd = api.gameState.getDemandData?.();
    const contextId = contextPointIdAt(map, e.point);

    if (s.infoOpen) {
      if (contextId && activeDevelopmentGroups().some((g) => String(g.pointId) === String(contextId))) {
        openPointForImprovement(contextId);
      }
      return;
    }

    if (s.mode === "create") {
      if (contextId && dd?.points?.has(contextId)) {
        uiStore.set({ previewExistingId: contextId, status: "" });
        refreshOverlay();
        return;
      }
      if (!s.createSide) {
        uiStore.set({ status: "" });
        refreshOverlay();
        return;
      }
      const pendingLocation = [e.lngLat.lng, e.lngLat.lat];
      const reason = placementBlockReason(pendingLocation);
      if (reason) {
        uiStore.set({ previewExistingId: null, pendingLocation: null, selectedId: null, selectedAmount: null, status: reason });
        refreshOverlay();
        return;
      }
      uiStore.set({
        pendingLocation,
        selectedId: null,
        previewExistingId: null,
        selectedAmount: CFG.STEP,
        status: "Location set.",
      });
      refreshOverlay();
      return;
    }

    if (contextId && dd?.points?.has(contextId)) {
      const p = dd.points.get(contextId);
      const side = s.existingSide || dominantLiveSide(p);
      uiStore.set({ existingSide: side, selectedId: contextId, previewExistingId: null, selectedAmount: CFG.STEP, status: "" });
    } else {
      uiStore.set({ selectedId: null, previewExistingId: null, selectedAmount: null, status: "" });
    }
    refreshOverlay();
  }

  let installedMap = null;
  function installMapClick(explicitMap = null) {
    const map = explicitMap || api.utils.getMap();
    if (!map) return;
    if (installedMap) {
      try { installedMap.off("click", mapClickHandler); } catch {}
    }
    try { map.off("click", mapClickHandler); } catch {}
    map.on("click", mapClickHandler);
    installedMap = map;
  }

  const existingPriceCache = new Map();
  function existingPriceKey(id) {
    return `${demandRevision}|${id}`;
  }
  function priceCurveForExisting(id) {
    const key = existingPriceKey(id);
    const cached = existingPriceCache.get(key);
    if (cached) return cached;
    const dd = api.gameState.getDemandData();
    const p = dd?.points.get(id);
    if (!dd || !p) return null;
    const q = quoteDevelopmentPrice(dd, p.location, MAX_DEVELOPMENT_AMOUNT, false);
    if (!q.ok) return null;
    const curve = Object.fromEntries(DEVELOPMENT_AMOUNTS.map((amount) => [amount, { ok: true, totalCost: q.cumulative[amount] }]));
    existingPriceCache.set(key, curve);
    if (existingPriceCache.size > 24) existingPriceCache.delete(existingPriceCache.keys().next().value);
    return curve;
  }
  function previewForExisting(id, side, amount) {
    return priceCurveForExisting(id)?.[amount] || null;
  }

  const createPriceCache = new Map();
  function createPriceKey(location) {
    return `${demandRevision}|${location?.[0]?.toFixed?.(5) || ""}|${location?.[1]?.toFixed?.(5) || ""}`;
  }
  function priceCurveForCreate(location) {
    if (!Array.isArray(location)) return null;
    const key = createPriceKey(location);
    const cached = createPriceCache.get(key);
    if (cached) return cached;
    const dd = api.gameState.getDemandData();
    if (!dd) return null;
    const q = quoteDevelopmentPrice(dd, location, MAX_DEVELOPMENT_AMOUNT, true);
    if (!q.ok) return null;
    const curve = Object.fromEntries(DEVELOPMENT_AMOUNTS.map((amount) => [amount, { ok: true, totalCost: q.cumulative[amount] }]));
    createPriceCache.set(key, curve);
    if (createPriceCache.size > 24) createPriceCache.delete(createPriceCache.keys().next().value);
    return curve;
  }
  function invalidatePreviews({ demand = false, ledgerState = false } = {}) {
    if (demand) {
      demandRevision++;
      clearDevelopmentSummaryCaches();
      spatialPricingCache.clear();
      demandHitIndexRevision = -1;
      demandHitIndexPoints = null;
      demandHitIndexGrid = null;
    }
    if (ledgerState) clearDevelopmentSummaryCaches();
    existingPriceCache.clear();
    createPriceCache.clear();
  }

  async function schedulePostBuildPriceRefresh(pointId, side, { focus = false } = {}) {
    const epoch = lifecycleEpoch;
    const delays = [0, 80, 250, 700];
    const startedAt = Date.now();
    for (const [index, delay] of delays.entries()) {
      const wait = Math.max(0, delay - (Date.now() - startedAt));
      if (wait) await new Promise((resolve) => setTimeout(resolve, wait));
      if (epoch !== lifecycleEpoch) continue;
      invalidatePreviews({ demand: true });
      const current = uiStore.get();
      const stillSelected = String(current.selectedId || "") === String(pointId);
      if (stillSelected) uiStore.set({ existingSide: side, selectedAmount: CFG.STEP });
      refreshOverlay();
      if (focus && stillSelected && index === delays.length - 1) focusDemandPoint(pointId);
    }
  }

  let buildLocked = false;

  async function runExisting(id, side, amount) {
    if (buildLocked || uiStore.get().busy) return;
    buildLocked = true;
    try {
    const dd = api.gameState.getDemandData();
    const p = dd?.points.get(id);
    if (!dd || !p) return;
    uiStore.set({ busy: true, status: "Preparing…" });
    const plan = planDevelopment(dd, p, side, amount, false);
    if (!plan.ok) { uiStore.set({ busy: false, status: plan.error }); return; }
    uiStore.set({ status: `Adding +${amount} ${side === "residential" ? "Residents" : "Workers"}…` });
    const result = await executePlan(plan);
    if (result.ok) {
      invalidatePreviews({ demand: true });
      uiStore.set({
        selectedId: String(id),
        mode: "normal",
        existingSide: side,
        createSide: null,
        selectedAmount: CFG.STEP,
        pendingLocation: null,
        status: "Recalculating…",
      });
      refreshOverlay();
      await schedulePostBuildPriceRefresh(id, side);
      uiStore.set({
        busy: false,
        status: `Added +${amount} ${side === "residential" ? "Residents" : "Workers"} for ${fmtMoney(plan.totalCost)}.`,
      });
    } else {
      uiStore.set({ busy: false, status: result.error });
      refreshOverlay();
    }
    } finally {
      buildLocked = false;
    }
  }

  async function runCreate(side, amount = 200) {
    if (buildLocked || uiStore.get().busy) return;
    buildLocked = true;
    try {
    const s = uiStore.get();
    const dd = api.gameState.getDemandData();
    if (!dd || !s.pendingLocation) return;

    const placementError = placementBlockReason(s.pendingLocation);
    if (placementError) {
      uiStore.set({ busy: false, pendingLocation: null, selectedAmount: null, status: placementError });
      refreshOverlay();
      return;
    }

    let overlappingId = null;
    let overlappingDistance = Infinity;
    for (const rec of demandGeoCandidates(s.pendingLocation, 15, dd)) {
      const { id, p } = rec;
      if (!Array.isArray(p?.location)) continue;
      const d = haversine(s.pendingLocation, p.location);
      if (d < overlappingDistance) { overlappingDistance = d; overlappingId = String(id); }
    }
    if (overlappingId && overlappingDistance <= 15) {
      uiStore.set({
        busy: false,
        previewExistingId: overlappingId,
        status: "There's already a demand point here. Use Develop or choose another location.",
      });
      refreshOverlay();
      return;
    }

    uiStore.set({ busy: true, status: "Preparing…" });
    const plan = planDevelopment(dd, { location: s.pendingLocation }, side, amount, true);
    if (!plan.ok) { uiStore.set({ busy: false, status: plan.error }); return; }
    uiStore.set({ status: "Creating point…" });
    const result = await executePlan(plan);
    if (result.ok) {
      invalidatePreviews({ demand: true });
      uiStore.set({
        status: "Recalculating…",
        mode: "normal",
        existingSide: side,
        createSide: null,
        selectedId: String(plan.pointId),
        pendingLocation: null,
        selectedAmount: CFG.STEP,
      });
      refreshOverlay();
      await schedulePostBuildPriceRefresh(plan.pointId, side, { focus: true });
      uiStore.set({
        busy: false,
        status: `Created point with ${amount} ${side === "residential" ? "Residents" : "Workers"} for ${fmtMoney(plan.totalCost)}.`,
      });
    } else {
      uiStore.set({
        busy: false,
        status: result.error,
        mode: s.mode,
        existingSide: s.existingSide,
        createSide: s.createSide,
        selectedId: null,
        pendingLocation: s.pendingLocation,
        selectedAmount: s.selectedAmount,
      });
      cleanupEmptyOwnedPoints();
      refreshOverlay();
    }
    } finally {
      buildLocked = false;
    }
  }

  let panelRegistered = false;

  function cleanupLegacyDomFallback() {
    if (typeof document === "undefined") return;
    try { document.getElementById("demand-developer-launcher")?.remove(); } catch {}
    try { document.getElementById("demand-developer-dom-panel")?.remove(); } catch {}
  }

  function registerPanel() {
    if (panelRegistered) return true;
    if (!api?.ui?.addToolbarPanel || !api?.utils?.React) {
      console.warn(`${TAG} UI API not ready yet; will retry`);
      return false;
    }
    const React = api.utils.React;
    const h = React.createElement;
    function Button({ children, onClick, disabled, active, style: extraStyle }) {
      return h("button", {
        type: "button",
        disabled: !!disabled,
        onClick,
        style: {
          padding: "6px 8px",
          maxWidth: "100%",
          minWidth: 0,
          borderRadius: 6,
          border: "1px solid rgba(255,255,255,.18)",
          background: active ? "rgba(96,165,250,.24)" : "rgba(255,255,255,.06)",
          color: "inherit",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? .55 : 1,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          boxSizing: "border-box",
          ...(extraStyle || {}),
        },
      }, children);
    }
    function Panel() {
      const [, force] = React.useReducer((x) => x + 1, 0);
      const rootRef = React.useRef(null);
      React.useEffect(() => uiStore.subscribe(force), []);
      React.useLayoutEffect(() => {
        const root = rootRef.current;
        if (!root || typeof window === "undefined") return;
        let popup = root.parentElement;
        for (let i = 0; popup && i < 8; i++, popup = popup.parentElement) {
          const cs = window.getComputedStyle(popup);
          const r = popup.getBoundingClientRect();
          if ((cs.position === "fixed" || cs.position === "absolute") && r.width >= 280 && r.width <= 460 && r.height >= 120) break;
        }
        if (!popup) return;
        const prev = { right: popup.style.right, left: popup.style.left, transform: popup.style.transform };
        popup.style.setProperty("right", "12px", "important");
        popup.style.setProperty("left", "auto", "important");
        const tr = window.getComputedStyle(popup).transform;
        if (tr && tr !== "none") popup.style.setProperty("transform", "none", "important");
        return () => { popup.style.right = prev.right; popup.style.left = prev.left; popup.style.transform = prev.transform; };
      }, []);
      React.useEffect(() => {
        uiStore.set({ panelOpen: true });
        if (pointsNeedRefresh || !demandReady) {
          setTimeout(() => reloadDemandPoints({ showStatus: false }), 0);
        } else {
          ensureOverlay();
          refreshOverlay();
        }
        return () => {
          uiStore.set({ panelOpen: false, selectedId: null, pendingLocation: null, infoOpen: false });
          clearOverlay();
        };
      }, []);
      const s = uiStore.get();
      const dd = api.gameState.getDemandData();
      const selected = s.selectedId ? dd?.points.get(s.selectedId) : null;
      const previewExisting = s.previewExistingId ? dd?.points.get(s.previewExistingId) : null;
      const createSide = s.mode === "create" ? s.createSide : null;
      const createCurve = createSide && s.pendingLocation ? priceCurveForCreate(s.pendingLocation) : null;
      const currentBudget = safeBudget();
      const row = (label, value) => h("div", { style: { display: "flex", justifyContent: "space-between", gap: 8, fontSize: 12 } }, h("span", { style: { opacity: .72 } }, label), h("span", null, value));
      const upgradeChoices = (side, isCreate = false, curve = null) => {
        const amount = DEVELOPMENT_AMOUNTS.includes(s.selectedAmount) ? s.selectedAmount : CFG.STEP;
        const q = isCreate ? curve?.[amount] : (selected ? previewForExisting(selected.id, side, amount) : null);
        const ok = !!q?.ok;
        const sideLabel = side === "residential" ? "Residents" : "Workers";
        const presetLabel = (preset) => preset.toLocaleString();
        return h("div", { style: { marginTop: 8, width: "100%", minWidth: 0 } },
          h("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 58, border: "1px solid rgba(255,255,255,.16)", borderRadius: 7, overflow: "hidden", background: "rgba(255,255,255,.035)" } },
            h("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px 12px", minWidth: 0 } },
              h("div", { style: { fontSize: 17, fontWeight: 750, lineHeight: 1.05 } }, `+${amount.toLocaleString()}`),
              h("div", { style: { marginTop: 4, fontSize: 9, opacity: .55, textTransform: "uppercase", letterSpacing: ".055em" } }, sideLabel)
            ),
            h("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px 12px", minWidth: 0, borderLeft: "1px solid rgba(255,255,255,.14)" } },
              h("div", { style: { fontSize: 17, fontWeight: 750, lineHeight: 1.05, whiteSpace: "nowrap" } }, ok ? fmtMoney(q.totalCost) : "—"),
              h("div", { style: { marginTop: 4, fontSize: 9, opacity: .55, textTransform: "uppercase", letterSpacing: ".055em" } }, "Price")
            )
          ),
          h("div", { style: { display: "grid", gridTemplateColumns: `repeat(${DEVELOPMENT_AMOUNTS.length}, minmax(0, 1fr))`, marginTop: 6, border: "1px solid rgba(255,255,255,.14)", borderRadius: 6, overflow: "hidden", minWidth: 0 } },
            ...DEVELOPMENT_AMOUNTS.map((preset, index) => {
              const pq = isCreate ? curve?.[preset] : (selected ? previewForExisting(selected.id, side, preset) : null);
              const active = amount === preset;
              return h("button", {
                key: `${isCreate ? "create" : side}-preset-${preset}`,
                type: "button",
                disabled: s.busy || !pq?.ok,
                onClick: () => { if (uiStore.get().busy || buildLocked) return; uiStore.set({ selectedAmount: preset, status: "" }); },
                style: {
                  minWidth: 0, minHeight: 28, padding: "4px 3px", border: 0,
                  borderLeft: index ? "1px solid rgba(255,255,255,.12)" : "none",
                  background: active ? "rgba(255,255,255,.14)" : "rgba(255,255,255,.035)",
                  color: "inherit", font: "inherit", fontSize: 10, fontWeight: active ? 750 : 600,
                  opacity: s.busy || !pq?.ok ? .38 : active ? 1 : .72, cursor: s.busy || !pq?.ok ? "default" : "pointer"
                }
              }, presetLabel(preset));
            })
          )
        );
      };
      const buildBar = (side, isCreate = false, curve = null) => {
        const amount = DEVELOPMENT_AMOUNTS.includes(s.selectedAmount) ? s.selectedAmount : CFG.STEP;
        const q = amount ? (isCreate ? curve?.[amount] : (selected ? previewForExisting(selected.id, side, amount) : null)) : null;
        const cost = q?.ok ? Number(q.totalCost) || 0 : 0;
        const shortfall = amount && q?.ok ? Math.max(0, cost - currentBudget) : 0;
        const hasFunds = !shortfall;
        const canBuild = !!amount && !!q?.ok && hasFunds && !s.busy;
        let expansionText = null;
        if (amount && q?.ok) {
          if (isCreate) {
            expansionText = `New point with ${amount.toLocaleString()} ${side === "residential" ? "Residents" : "Workers"}`;
          } else if (selected) {
            const base = Math.max(0, Number(side === "residential" ? selected.residents : selected.jobs) || 0);
            const pct = base > 0 ? Math.round((amount / base) * 100) : 0;
            expansionText = `Expands this point by ${pct}%`;
          }
        }
        return h("div", { style: { marginTop: 10, paddingTop: 9, borderTop: "1px solid rgba(255,255,255,.12)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 } },
          h("div", { style: { minWidth: 0, fontSize: 11, lineHeight: 1.35 } },
            amount && q?.ok
              ? h("div", null,
                  expansionText ? h("div", { style: { opacity: .72, marginBottom: 2 } }, expansionText) : null,
                  shortfall
                    ? h("div", { style: { color: "#f87171", fontWeight: 700 } }, `Need ${fmtMoney(shortfall)} more`)
                    : h("div", { style: { opacity: .88, fontWeight: 600 } }, `Balance after: ${fmtBalance(currentBudget - cost)}`)
                )
              : h("span", { style: { opacity: .55 } }, "Choose a size")
          ),
          h(Button, {
            disabled: !canBuild,
            onClick: () => { if (!canBuild) return; isCreate ? runCreate(side, amount) : runExisting(selected.id, side, amount); },
            style: { flex: "0 0 auto", minWidth: 88, minHeight: 36, padding: "7px 14px", fontWeight: 700, background: canBuild ? "rgba(34,197,94,.20)" : "rgba(255,255,255,.06)", borderColor: canBuild ? "rgba(74,222,128,.45)" : "rgba(255,255,255,.18)" }
          }, s.busy ? "Building…" : "Build")
        );
      };
      const sideButtons = (current, onPick) => h("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8, marginBottom: 10, width: "100%", minWidth: 0 } },
        h(Button, { active: current === "residential", disabled: s.busy, onClick: () => { if (uiStore.get().busy || buildLocked) return; onPick("residential"); }, style: { width: "100%" } }, "Residents"),
        h(Button, { active: current === "work", disabled: s.busy, onClick: () => { if (uiStore.get().busy || buildLocked) return; onPick("work"); }, style: { width: "100%" } }, "Workers")
      );
      const locationHeader = (location, pointId = null, planned = false) => {
        const parts = locationHeaderParts(location);
        return h("div", { style: { marginBottom: 8, minWidth: 0, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 } },
          h("div", { style: { minWidth: 0, flex: "1 1 auto" } },
            h("div", { style: { fontSize: 13, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, parts.title),
            parts.detail ? h("div", { style: { marginTop: 2, fontSize: 10, opacity: .58, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, parts.detail) : null
          ),
          pointId ? h("button", {
            type: "button",
            title: "Show on map",
            "aria-label": "Show on map",
            onClick: () => focusDemandPoint(pointId),
            style: { flex: "0 0 auto", padding: "4px 7px", borderRadius: 6, border: "1px solid rgba(255,255,255,.20)", background: "rgba(255,255,255,.06)", color: "inherit", cursor: "pointer", fontFamily: "inherit", fontSize: 10, fontWeight: 650 }
          }, "Show") : null
        );
      };
      const nearbyStationsBlock = (location) => {
        const rows = nearestStations(location, 3);
        if (!rows.length) return null;
        return h("div", { style: { marginTop: 9, paddingTop: 8, borderTop: "1px solid rgba(255,255,255,.10)" } },
          h("div", { style: { marginBottom: 5, fontSize: 10, fontWeight: 700, opacity: .58, textTransform: "uppercase", letterSpacing: ".05em" } }, "Nearest stations"),
          h("div", { style: { display: "flex", flexDirection: "column", gap: 3 } }, ...rows.map(({ station, meters }) => {
            const badges = stationRouteBadges(station);
            return h("div", {
              key: station.id,
              style: { width: "100%", padding: "4px 2px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, minWidth: 0 }
            },
              h("button", {
                type: "button",
                title: "Show station on map",
                onClick: () => focusStation(station),
                style: { minWidth: 0, padding: 0, border: "none", background: "transparent", color: "inherit", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5, textAlign: "left", fontFamily: "inherit" }
              },
                h("span", { style: { minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: 11, textDecoration: "underline", textUnderlineOffset: 2 } }, station.name || `Station ${stablePointRef(station.id)}`),
                badges.length ? h("span", { style: { display: "inline-flex", alignItems: "center", gap: 3, flex: "0 0 auto" } }, ...badges.map((badge) =>
                  h("span", {
                    key: String(badge.routeId),
                    title: badge.title || badge.label || undefined,
                    "aria-label": badge.label ? `Route ${badge.label}` : "Route",
                    style: badge.label ? {
                      minWidth: 14, height: 14, padding: "0 4px", borderRadius: 7, display: "inline-flex", alignItems: "center", justifyContent: "center",
                      background: badge.color || "rgba(255,255,255,.18)", border: "1px solid rgba(255,255,255,.34)", boxSizing: "border-box",
                      color: "#fff", fontSize: 8, fontWeight: 800, lineHeight: 1, textShadow: "0 1px 2px rgba(0,0,0,.72)"
                    } : {
                      width: 8, height: 8, borderRadius: "50%", display: "inline-block", background: badge.color || "rgba(255,255,255,.52)",
                      border: "1px solid rgba(255,255,255,.34)", boxSizing: "border-box"
                    }
                  }, badge.label || null)
                )) : null
              ),
              h("span", {
                style: { flex: "0 0 auto", padding: "2px 0 2px 6px", fontSize: 10, opacity: .62 }
              }, `${Math.round(meters).toLocaleString()} m · ${Math.max(1, Math.round(meters / 60)) > 90 ? "90+" : Math.max(1, Math.round(meters / 60))} min walk`)
            );
          }))
        );
      };
      const infoView = () => {
        const groups = activeDevelopmentGroups();
        const dd = api.gameState.getDemandData?.();
        const growthPercent = mapGrowthPercent(activeAddedDemand(), originalMapDemand(dd));
        const { totalSpent, improvements, activePeople } = developmentInfoStats();
        const stat = (label, value) => h("div", { style: { padding: "8px 9px", border: "1px solid rgba(255,255,255,.12)", borderRadius: 7, minWidth: 0 } },
          h("div", { style: { fontSize: 10, opacity: .58, textTransform: "uppercase", letterSpacing: ".05em" } }, label),
          h("div", { style: { marginTop: 2, fontSize: 15, fontWeight: 700 } }, value));
        return h("div", null,
          h("div", { style: { display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 7, marginBottom: 10 } },
            stat("Total spent", fmtMoney(totalSpent)),
            stat("Improvements", Math.round(improvements).toLocaleString()),
            stat("Demand added", Math.round(activePeople).toLocaleString()),
            stat("Map growth", `${growthPercent.toFixed(1)}%`)
          ),
          groups.length ? h("div", null,
            h("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 7 } },
              h("div", { style: { fontSize: 11, opacity: .68 } }, `${groups.length.toLocaleString()} developed ${groups.length === 1 ? "point" : "points"}`),
              h("button", { type: "button", onClick: () => {
                const nextVisible = !s.infoMapVisible;
                uiStore.set({ infoMapVisible: nextVisible, selectedId: null });
                refreshOverlay();
                if (nextVisible) focusDevelopmentGroups(groups);
              }, style: { padding: "4px 7px", borderRadius: 5, border: "1px solid rgba(255,255,255,.18)", background: s.infoMapVisible ? "rgba(255,255,255,.12)" : "rgba(255,255,255,.06)", color: "inherit", cursor: "pointer", fontSize: 10, fontWeight: 700 } }, s.infoMapVisible ? "Hide from map" : "Show all on map")
            ),
            h("div", { style: { display: "flex", flexDirection: "column", gap: 5, maxHeight: 280, overflowY: "auto", overscrollBehavior: "contain", paddingRight: 3 } }, ...groups.map((g) => h("div", {
              key: g.pointId,
              onClick: () => {
                if (s.busy) return;
                uiStore.set({ selectedId: g.pointId });
                refreshOverlay();
                focusDemandPoint(g.pointId);
              },
              title: "Show on map",
              style: {
                padding: "7px 8px",
                border: String(s.selectedId || "") === String(g.pointId) ? "1px solid rgba(255,255,255,.40)" : "1px solid rgba(255,255,255,.13)",
                borderRadius: 7,
                minWidth: 0,
                background: String(s.selectedId || "") === String(g.pointId) ? "rgba(255,255,255,.07)" : "transparent",
                cursor: s.busy ? "default" : "pointer"
              }
            },
              h("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 } },
                h("div", { style: { minWidth: 0, flex: "1 1 auto" } },
                  (() => {
                    const parts = locationHeaderParts(g.location);
                    return h("div", { style: { minWidth: 0 } },
                      h("div", { style: { fontSize: 12, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, parts.title),
                      parts.detail ? h("div", { style: { marginTop: 1, fontSize: 9, opacity: .52, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, parts.detail) : null
                    );
                  })()
                ),
                h("div", { style: { flex: "0 0 auto", display: "flex", alignItems: "center", gap: 4 } },
                  h("button", {
                    type: "button",
                    disabled: s.busy,
                    title: "Add more demand",
                    "aria-label": "Add more demand",
                    onClick: (ev) => { ev?.stopPropagation?.(); if (!s.busy) openPointForImprovement(g.pointId); },
                    onMouseEnter: (ev) => { if (!s.busy && ev?.currentTarget) ev.currentTarget.style.background = "rgba(255,255,255,.13)"; },
                    onMouseLeave: (ev) => { if (ev?.currentTarget) ev.currentTarget.style.background = "rgba(255,255,255,.05)"; },
                    style: { width: 27, height: 27, padding: 0, borderRadius: 5, border: "1px solid rgba(255,255,255,.16)", background: "rgba(255,255,255,.05)", color: "inherit", cursor: s.busy ? "not-allowed" : "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 600, lineHeight: 1 }
                  }, "+"),
                  h("button", {
                    type: "button",
                    disabled: s.busy,
                    title: "Remove development",
                    "aria-label": "Remove development",
                    onClick: (ev) => {
                      ev?.stopPropagation?.();
                      if (typeof window !== "undefined" && !window.confirm(`Remove development at ${friendlyLocationLabel(g.location) || g.pointId}? Money spent will not be refunded.`)) return;
                      const r = removeDevelopmentForPoint(g.pointId);
                      uiStore.set({ selectedId: null, status: r.ok ? "Development removed." : r.error });
                      refreshOverlay();
                    },
                    onMouseEnter: (ev) => { if (!s.busy && ev?.currentTarget) { ev.currentTarget.style.background = "rgba(248,113,113,.16)"; ev.currentTarget.style.borderColor = "rgba(248,113,113,.55)"; } },
                    onMouseLeave: (ev) => { if (ev?.currentTarget) { ev.currentTarget.style.background = "transparent"; ev.currentTarget.style.borderColor = "rgba(248,113,113,.28)"; } },
                    style: { width: 27, height: 27, padding: 0, borderRadius: 5, border: "1px solid rgba(248,113,113,.28)", background: "transparent", color: "#fca5a5", cursor: s.busy ? "not-allowed" : "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }
                  },
                    h("svg", { viewBox: "0 0 24 24", width: 14, height: 14, fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" },
                      h("path", { d: "M3 6h18" }),
                      h("path", { d: "M8 6V4h8v2" }),
                      h("path", { d: "M19 6l-1 14H6L5 6" }),
                      h("path", { d: "M10 11v5" }),
                      h("path", { d: "M14 11v5" })
                    )
                  )
                )
              ),
              h("div", { style: { marginTop: 6, display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr) minmax(0,1.15fr)", gap: 5 } },
                h("div", { style: { minWidth: 0 } },
                  h("div", { style: { fontSize: 8, opacity: .46, textTransform: "uppercase", letterSpacing: ".04em" } }, "Residents"),
                  h("div", { style: { marginTop: 1, fontSize: 10, fontWeight: 600, opacity: g.residents ? .84 : .38 } }, g.residents ? `+${Math.round(g.residents).toLocaleString()}` : "–")
                ),
                h("div", { style: { minWidth: 0 } },
                  h("div", { style: { fontSize: 8, opacity: .46, textTransform: "uppercase", letterSpacing: ".04em" } }, "Workers"),
                  h("div", { style: { marginTop: 1, fontSize: 10, fontWeight: 600, opacity: g.workers ? .84 : .38 } }, g.workers ? `+${Math.round(g.workers).toLocaleString()}` : "–")
                ),
                h("div", { style: { minWidth: 0, textAlign: "right" } },
                  h("div", { style: { fontSize: 8, opacity: .46, textTransform: "uppercase", letterSpacing: ".04em" } }, "Spent"),
                  h("div", { style: { marginTop: 1, fontSize: 11, fontWeight: 750 } }, fmtMoney(g.spent || 0))
                )
              )
            )))
          ) : h("div", { style: { fontSize: 12, opacity: .65, padding: "8px 0" } }, "No development yet."),
          (() => {
            const hasActiveDevelopment = activeOwnedPopCount() > 0;
            return h("button", { type: "button", disabled: s.busy || !hasActiveDevelopment, onClick: () => {
              if (typeof window !== "undefined" && !window.confirm("Remove all development? Money spent will not be refunded.")) return;
              const r = removeAllDevelopment();
              uiStore.set({ status: r.ok ? "All development removed." : r.error });
            }, style: { marginTop: 10, width: "100%", padding: "7px 9px", borderRadius: 6, border: "1px solid rgba(248,113,113,.35)", background: "rgba(248,113,113,.08)", color: hasActiveDevelopment ? "#fca5a5" : "rgba(255,255,255,.35)", cursor: hasActiveDevelopment ? "pointer" : "not-allowed" } }, "Remove all development");
          })()
        );
      };
      const infoButton = () => h("button", {
        type: "button",
        title: "Development history",
        "aria-label": "Development history",
        onClick: () => { uiStore.set({ infoOpen: true, infoMapVisible: false, selectedId: null, selectedAmount: null, pendingLocation: null, status: "" }); refreshOverlay(); },
        style: { width: 28, height: 28, padding: 0, borderRadius: 999, border: "1px solid rgba(255,255,255,.20)", background: "rgba(255,255,255,.06)", color: "inherit", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flex: "0 0 auto" }
      }, api.utils.icons?.Info ? h(api.utils.icons.Info, { size: 16, strokeWidth: 2 }) : h("span", { style: { fontWeight: 700, fontSize: 15 } }, "i"));
      const reloadPointsButton = () => h("button", {
        type: "button",
        title: "Refresh demand points",
        "aria-label": "Refresh demand points",
        disabled: s.busy,
        onClick: () => reloadDemandPoints({ showStatus: true }),
        style: { width: 28, height: 28, padding: 0, borderRadius: 6, border: "1px solid rgba(255,255,255,.20)", background: "rgba(255,255,255,.06)", color: "inherit", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: s.busy ? "not-allowed" : "pointer", opacity: s.busy ? .45 : 1, flex: "0 0 auto", fontSize: 17, lineHeight: 1 }
      }, "↻");
      const pointTypeHeader = () => h("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 4 } },
        h("div", { style: { display: "flex", alignItems: "center", gap: 6, minWidth: 0 } },
          h("div", { style: { fontSize: 12, fontWeight: 700 } }, "Demand type"),
          reloadPointsButton()
        ),
        infoButton()
      );
      const existingMiniPreview = () => {
        if (!previewExisting || !s.previewExistingId || s.mode !== "create") return null;
        const side = dominantLiveSide(previewExisting);
        const sideColor = side === "residential" ? "#60a5fa" : "#f59e0b";
        return h("div", { style: { marginBottom: 8, padding: "6px 8px", border: "1px solid rgba(255,255,255,.14)", borderLeft: `3px solid ${sideColor}`, borderRadius: 6, background: "rgba(255,255,255,.025)" } },
          locationHeader(previewExisting.location, null, false),
          h("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 } },
            h("div", { style: { minWidth: 0, fontSize: 9, lineHeight: 1.3, opacity: .72 } },
              `${Math.round(previewExisting.residents || 0).toLocaleString()} Residents · ${Math.round(previewExisting.jobs || 0).toLocaleString()} Workers`
            ),
            h("button", {
              type: "button",
              disabled: s.busy,
              onClick: () => {
                const id = String(s.previewExistingId);
                const p = api.gameState.getDemandData?.()?.points?.get(id);
                if (!p) return;
                uiStore.set({ mode: "normal", createSide: null, pendingLocation: null, previewExistingId: null, existingSide: dominantLiveSide(p), selectedId: id, selectedAmount: CFG.STEP, status: "" });
                refreshOverlay();
                focusDemandPoint(id);
              },
              style: { flex: "0 0 auto", padding: "3px 6px", borderRadius: 5, border: "1px solid rgba(255,255,255,.18)", background: "rgba(255,255,255,.06)", color: "inherit", cursor: s.busy ? "not-allowed" : "pointer", fontFamily: "inherit", fontSize: 9, fontWeight: 700 }
            }, "Develop")
          )
        );
      };

      return h("div", { ref: rootRef, style: { position: "relative", padding: 10, width: "100%", maxWidth: "100%", minWidth: 0, boxSizing: "border-box", overflowX: "hidden", fontFamily: "inherit", color: "inherit" } },
        s.infoOpen
          ? h("div", { style: { display: "grid", gridTemplateColumns: "1fr", marginBottom: 10 } },
              h(Button, { style: { width: "100%", minHeight: 38 }, onClick: () => { uiStore.set({ infoOpen: false, infoMapVisible: false, selectedId: null, status: "" }); refreshOverlay(); } }, "Back"))
          : h("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 6, marginBottom: 10, minWidth: 0 } },
              h(Button, { active: s.mode !== "create", style: { width: "100%", minHeight: 38 }, onClick: () => { uiStore.set({ mode: "normal", createSide: null, pendingLocation: null, selectedId: null, selectedAmount: null, status: "" }); refreshOverlay(); } }, "Existing point"),
              h(Button, { active: s.mode === "create", style: { width: "100%", minHeight: 38 }, onClick: () => { uiStore.set({ mode: "create", existingSide: null, createSide: null, selectedId: null, previewExistingId: null, selectedAmount: null, pendingLocation: null, status: "" }); refreshOverlay(); } }, "New point")),
        s.infoOpen ? infoView() : null,

        !s.infoOpen && s.mode !== "create" ? h("div", null,
          pointTypeHeader(),
          sideButtons(s.existingSide, (side) => {
            clearOverlay();
            const liveSelected = s.selectedId ? dd?.points?.get(s.selectedId) : null;
            const hasSide = liveSelected ? sideMass(liveSelected, side) > 0 : false;
            uiStore.set({
              existingSide: side,
              selectedId: liveSelected && hasSide ? s.selectedId : null,
              selectedAmount: liveSelected && hasSide ? CFG.STEP : null,
              status: liveSelected && !hasSide
                ? `This point has no ${side === "residential" ? "Residents" : "Workers"}.`
                : "",
            });
            refreshOverlay();
          }),
          !s.existingSide ? h("div", { style: { fontSize: 12, lineHeight: 1.45, opacity: .76, marginBottom: 8 } }, "Select a demand point on the map.") :
          !selected ? h("div", { style: { fontSize: 12, lineHeight: 1.45, opacity: .76, marginBottom: 8 } }, `Select a highlighted ${s.existingSide === "residential" ? "Residents" : "Workers"} point.`) : null,
          selected ? h("div", null,
            locationHeader(selected.location, selected.id, false),
            row("Residents", Math.round(selected.residents || 0).toLocaleString()),
            row("Workers", Math.round(selected.jobs || 0).toLocaleString()),
            nearbyStationsBlock(selected.location),
            h("div", { style: { marginTop: 10, fontSize: 12, fontWeight: 700 } }, s.existingSide === "residential" ? "Residents upgrade" : "Workers upgrade"),
            upgradeChoices(s.existingSide, false, null),
            buildBar(s.existingSide, false, null)
          ) : null
        ) : null,

        !s.infoOpen && s.mode === "create" ? h("div", { style: { marginTop: 2 } },
          existingMiniPreview(),
          pointTypeHeader(),
          sideButtons(createSide, (side) => {
            clearOverlay();
            uiStore.set({ createSide: side, selectedAmount: CFG.STEP, status: "" });
            refreshOverlay();
          }),
          h("div", { style: { fontSize: 12, lineHeight: 1.45, opacity: .76, marginBottom: 8 } }, s.previewExistingId
            ? (s.pendingLocation
                ? "Existing point selected. Planned location unchanged."
                : (createSide
                    ? "Existing point selected. Click empty land to place the new point."
                    : "Existing point selected."))
            : (createSide
                ? "Click the map to place the new point."
                : "Choose Residents or Workers, then click the map.")),
          s.pendingLocation ? h("div", null,
            h("div", { style: { marginBottom: 6, padding: "6px 8px", border: "1px solid rgba(255,255,255,.16)", borderRadius: 6 } },
              h("div", { style: { fontSize: 10, opacity: .55, textTransform: "uppercase", letterSpacing: ".06em" } }, "Planned point"),
              locationHeader(s.pendingLocation, null, true)
            ),
            nearbyStationsBlock(s.pendingLocation),
            createSide ? h("div", null,
              upgradeChoices(createSide, true, createCurve),
              buildBar(createSide, true, createCurve)
            ) : null
          ) : null
        ) : null,
        s.status ? h("div", { style: { marginTop: 8, fontSize: 12, lineHeight: 1.4, overflowWrap: "anywhere" } }, s.status) : null
      );
    }
    try {
      api.ui.addToolbarPanel({
        id: CFG.PANEL_ID,
        icon: "HousePlus",
        tooltip: "Demand Developer",
        title: "Demand Developer",
        width: 330,
        render: () => h(Panel),
      });
      panelRegistered = true;
      return true;
    } catch (e) {
      console.warn(`${TAG} toolbar panel registration deferred/failed`, e);
      return false;
    }
  }

  function reloadDemandPoints({ showStatus = true } = {}) {
    invalidatePreviews({ demand: true });
    const map = api.utils.getMap?.();
    try {
      if (map) {
        installMapClick(map);
        bindLocationIndex(map);
      }
      const dd = api.gameState.getDemandData?.();
      if (dd?.points) {
        if (!demandReady) {
          void initDemandReady();
        } else {
          pointsNeedRefresh = false;
          ensureOverlay();
          installMapClick(map);
          refreshUi();
        }
        if (showStatus) uiStore.set({ status: "Demand points refreshed." });
        return true;
      }
      pointsNeedRefresh = true;
      if (showStatus) uiStore.set({ status: "Waiting for demand…" });
      scheduleDemandReadyProbe(map || null);
      return false;
    } catch (e) {
      console.warn(`${TAG} demand reload failed`, e);
      pointsNeedRefresh = true;
      if (showStatus) uiStore.set({ status: "Refresh failed; retrying…" });
      scheduleDemandReadyProbe(map || null);
      return false;
    }
  }

  function cleanupEmptyOwnedPoints() {
    if (uiStore.get().busy) return;
    const dd = api.gameState.getDemandData?.();
    if (!dd?.points || !api.demand?.removeDemandPoint) return;
    for (const [id, p] of dd.points.entries()) {
      if (!String(id).startsWith(CFG.NEW_POINT_PREFIX)) continue;
      if ((p?.residents || 0) !== 0 || (p?.jobs || 0) !== 0 || (p?.popIds?.length || 0) !== 0) continue;
      try {
        const r = api.demand.removeDemandPoint(id);
        if (!r?.success) console.warn(`${TAG} could not clean empty owned point ${id}: ${r?.error || "unknown error"}`);
      } catch (e) { console.warn(`${TAG} cleanup failed for ${id}`, e); }
    }
  }

  let demandReadyProbeTimer = null;
  let demandIntegrityTimer = null;
  let demandProbeGeneration = 0;

  function clearDemandRestoreTimers() {
    if (demandReadyProbeTimer) clearTimeout(demandReadyProbeTimer);
    if (demandIntegrityTimer) clearTimeout(demandIntegrityTimer);
    demandReadyProbeTimer = null;
    demandIntegrityTimer = null;
  }

  function schedulePostRestoreIntegrityChecks(epoch = lifecycleEpoch, generation = demandProbeGeneration) {
    if (demandIntegrityTimer) clearTimeout(demandIntegrityTimer);
    const delays = [500, 1500, 3500];
    let index = 0;
    const verify = () => {
      if (epoch !== lifecycleEpoch || generation !== demandProbeGeneration) return;
      const dd = api.gameState.getDemandData?.();
      if (dd?.points && dd?.popsMap && ledgerNeedsLiveRestore(dd)) {
        demandReady = false;
        pointsNeedRefresh = true;
        scheduleDemandReadyProbe(null, 300);
        return;
      }
      index += 1;
      if (index < delays.length) demandIntegrityTimer = setTimeout(verify, delays[index]);
    };
    demandIntegrityTimer = setTimeout(verify, delays[index]);
  }

  function scheduleDemandReadyProbe(map = api.utils.getMap?.(), initialDelay = 300) {
    if (demandReadyProbeTimer) clearTimeout(demandReadyProbeTimer);
    const epoch = lifecycleEpoch;
    const expectedMap = map;
    const generation = ++demandProbeGeneration;
    let attempt = 0;
    const delays = [Math.max(0, initialDelay), 500, 1000, 2000, 4000, 6000];
    const run = async () => {
      if (epoch !== lifecycleEpoch || generation !== demandProbeGeneration) return;
      const liveMap = api.utils.getMap?.();
      if (expectedMap && liveMap && liveMap !== expectedMap) return;
      if (liveMap) ensureOverlay();
      try {
        const dd = api.gameState.getDemandData?.();
        if (dd?.points && dd?.popsMap) {
          const ok = await initDemandReady();
          if (ok && epoch === lifecycleEpoch && generation === demandProbeGeneration) {
            schedulePostRestoreIntegrityChecks(epoch, generation);
            return;
          }
        }
      } catch {}
      attempt += 1;
      if (attempt < delays.length && epoch === lifecycleEpoch && generation === demandProbeGeneration) {
        demandReadyProbeTimer = setTimeout(run, delays[attempt]);
      }
    };
    demandReadyProbeTimer = setTimeout(run, delays[0]);
  }

  async function initDemandReady() {
    const epoch = lifecycleEpoch;
    const token = ++ledgerLoadToken;
    pointsNeedRefresh = false;
    lifecycleCity = currentCity();
    const loadResult = await loadLedger(epoch, token);
    if (epoch !== lifecycleEpoch || token !== ledgerLoadToken) return false;

    const dd = api.gameState.getDemandData?.();
    if (!dd?.points || !dd?.popsMap) {
      pointsNeedRefresh = true;
      return false;
    }
    if (loadResult?.needsLegacyRepair) {
      const repaired = repairMigratedInactiveState(dd);
      if (repaired) await saveLedger();
    }

    const replay = await replayActiveLedgerDemand(dd);
    if (!replay.ok) {
      pointsNeedRefresh = true;
      demandReady = false;
      uiStore.set({ status: replay.error });
      console.warn(`${TAG} saved development replay failed: ${replay.error}`);
      ensureOverlay();
      installMapClick();
      refreshUi();
      return false;
    }
    restoreOwnedPointModeShares(api.gameState.getDemandData?.() || dd);
    cleanupEmptyOwnedPoints();
    demandReady = true;
    ensureOverlay();
    installMapClick();
    refreshUi();
    return true;
  }

  function handleMapReady(map) {
    nearestStationsCache.clear();
    installMapClick(map);
    bindLocationIndex(map);
    demandReady = false;
    pointsNeedRefresh = true;
    scheduleDemandReadyProbe(map || null, 300);
  }

  function handleCityLoad(cityCode) {
    nearestStationsCache.clear();
    lifecycleCity = cityCode || null;
    invalidatePreviews({ demand: true, ledgerState: true });
    resetUiForMapTransition("Loading demand…");
    scheduleDemandReadyProbe(null, 350);
  }

  function handleGameLoaded(saveName) {
    const nextName = typeof saveName === "string" && saveName.length > 0 ? saveName : readLiveSaveName();
    currentSaveName = nextName;
    resetUiForMapTransition("Loading demand…");
    pointsNeedRefresh = true;
    scheduleDemandReadyProbe(null, 350);
  }

  async function handleGameSaved(saveName) {
    const nextName = resolveSavedSlotName(saveName);
    if (nextName !== currentSaveName) {
      currentSaveName = nextName;
      loadedLedgerKey = ledgerKey();
    }
    captureOwnedPointModeShares();
    captureOwnedPopSnapshots();
    await saveLedger();
  }

  function handleDemandChange() {
    try {
      if (replayingLedgerDemand) return;
      invalidatePreviews({ demand: true });
      pointsNeedRefresh = true;
      const dd = api.gameState.getDemandData?.();
      if (dd?.points && dd?.popsMap) {
        if (loadedLedgerKey && ledgerNeedsLiveRestore(dd)) {
          demandReady = false;
          scheduleDemandReadyProbe(null, 300);
          return;
        }
        if (demandReady) {
          pointsNeedRefresh = false;
          if (uiStore.get().panelOpen) { ensureOverlay(); refreshUi(); }
          return;
        }
        scheduleDemandReadyProbe(null, 300);
        return;
      }
      scheduleDemandReadyProbe(null, 500);
    } catch (e) { console.warn(`${TAG} demand init failed`, e); }
  }

  function handleGameEnd() {
    nearestStationsCache.clear();
    invalidatePreviews({ demand: true, ledgerState: true });
    resetUiForMapTransition("");
    if (installedMap) {
      try { installedMap.off("click", mapClickHandler); } catch {}
    }
    if (locationIndexMap) {
      try { locationIndexMap.off("moveend", scheduleLocationIndexRefresh); } catch {}
      try { locationIndexMap.off("zoomend", scheduleLocationIndexRefresh); } catch {}
      try { locationIndexMap.off("idle", scheduleLocationIndexRefresh); } catch {}
      try { locationIndexMap.off("sourcedata", scheduleGeneralTileLocationRefresh); } catch {}
    }
    locationIndexMap = null;
    if (locationIndexTimer) clearTimeout(locationIndexTimer);
    locationIndexTimer = null;
    clearDemandRestoreTimers();
    demandProbeGeneration += 1;
    clearLocationIndexData();
    installedMap = null;
    lifecycleCity = null;
    currentSaveName = null;
    loadedLedgerKey = null;
  }

  const ensureUi = () => {
    try { registerPanel(); } catch (e) { console.error(`${TAG} panel init failed`, e); }
  };

  function unregisterToolbarPanel() {
    try {
      api.ui.unregisterComponent?.("top-bar", CFG.PANEL_ID);
    } catch (e) {
      console.warn(`${TAG} toolbar unregister failed`, e);
    }
    panelRegistered = false;
  }

  function rebindToolbarUi() {
    unregisterToolbarPanel();
    ensureUi();
  }

  cleanupLegacyDomFallback();

  try { setTimeout(() => { ensureUi(); }, 0); } catch {}
  try {
    api.hooks.onCityLoad?.((cityCode) => {
      handleCityLoad(cityCode);
      try { setTimeout(() => rebindToolbarUi(), 0); } catch {}
      try { setTimeout(() => rebindToolbarUi(), 250); } catch {}
    });
    api.hooks.onGameInit?.(() => {
      resetUiForMapTransition("Loading demand…");
      scheduleDemandReadyProbe(null, 350);
      try { setTimeout(() => rebindToolbarUi(), 0); } catch {}
      try { setTimeout(() => rebindToolbarUi(), 250); } catch {}
    });
    api.hooks.onGameLoaded((saveName) => {
      handleGameLoaded(saveName);
      rebindToolbarUi();
    });
    api.hooks.onDemandChange(() => {
      handleDemandChange();
      ensureUi();
    });
    api.hooks.onMapReady((map) => {
      handleMapReady(map);
      rebindToolbarUi();
    });
    api.hooks.onGameEnd?.(() => handleGameEnd());
    api.hooks.onGameSaved(async (saveName) => { await handleGameSaved(saveName); });
  } catch (e) { console.warn(`${TAG} hook registration failed`, e); }
  try {
    currentSaveName = readLiveSaveName();
    ensureUi();
    const map = api.utils.getMap?.();
    if (map) handleMapReady(map);
    if (api.gameState.getDemandData?.()) pointsNeedRefresh = true;
  } catch {}
})();
