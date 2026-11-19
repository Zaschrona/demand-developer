(function () {
  "use strict";

  const TAG = "[Demand Developer]";
  const api = window.SubwayBuilderAPI;
  if (!api) {
    console.error(`${TAG} SubwayBuilderAPI not found.`);
    return;
  }

  const CFG = {
    STEP: 200,
    BASE_STEP_COST: 21000000,
    COST_ROUNDING: 1000000,
    NEW_POINT_PRICE_MULTIPLIER: 1.25,
    LAND_CONVERSION_PRICE_SURCHARGE: 0.25,
    UNIVERSITY_PRICE_SURCHARGE: 0.5,
    AIRPORT_PRICE_SURCHARGE: 1.5,
    INDEPENDENT_AIRPORT_PRICE_SURCHARGE: 1.0,
    STANDALONE_AIRPORT_CLEARANCE_M: 2000,
    MAP_GROWTH_PRICE_STRENGTH: 10,
    MIN_MAP_GROWTH_PRICE_MULTIPLIER: 1.0,
    DEMOLITION_PRICE_MULTIPLIER: 0.25,

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
    NEW_POINT_MIN_LINKS: 8,
    SCORE_RANDOMNESS: 0.10,
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

    REGIONAL_ZONE_CELL_M: 5000,
    REGIONAL_ZONE_NEIGHBOR_MASS_WEIGHT: 0.30,
    REGIONAL_ZONE_NEIGHBOR_MASS_CAP_MULT: 1.00,
    REGIONAL_ZONE_POPULATION_EXP: 0.50,
    REGIONAL_ZONE_REPEAT_STRENGTH: 0.20,
    REGIONAL_ZONE_NEIGHBOR_REPEAT_STRENGTH: 0.04,
    REGIONAL_ZONE_DISTANCE_SCALE_M: 140000,
    REGIONAL_ZONE_DISTANCE_EXP: 0.45,
    REGIONAL_ENDPOINT_SPREAD_SCALE_M: 4500,
    REGIONAL_ENDPOINT_SPREAD_EXP: 1.35,
    REGIONAL_ENDPOINT_SPREAD_FLOOR: 0.08,
    UNIVERSITY_REGIONAL_MASS_EXP: 0.58,
    AIRPORT_REGIONAL_MASS_EXP: 0.72,
    UNIVERSITY_REGION_SCALE_M: 6500,
    UNIVERSITY_REGION_EXP: 1.65,
    UNIVERSITY_REGION_RADIUS_M: 22000,
    AIRPORT_REGION_SCALE_M: 12000,
    AIRPORT_REGION_EXP: 1.20,
    AIRPORT_REGION_RADIUS_M: 26000,
    SPECIAL_REGION_GRID_CELL_M: 6000,
    AIRPORT_CATCHMENT_DISTANCE_SCALE_M: 120000,
    AIRPORT_CATCHMENT_DISTANCE_EXP: 0.72,
    AIRPORT_MAX_CATCHMENT_M: 200000,
    UNIVERSITY_CATCHMENT_DISTANCE_SCALE_M: 45000,
    UNIVERSITY_CATCHMENT_DISTANCE_EXP: 1.20,
    UNIVERSITY_MAX_CATCHMENT_M: 120000,
    SPECIAL_WORKER_PATTERN_ROUNDS: 8,
    UNIVERSITY_REGIONAL_SHARE: 0.50,
    SPECIAL_MATCH_SCORE_JITTER: 0.06,
    SPECIAL_REPEAT_USE_STRENGTH: 0.35,
    SPECIAL_FLOW_SATURATION_UNITS: 4.0,
    SPECIAL_FLOW_SATURATION_EXP: 0.45,
    SPECIAL_FLOW_SHARE_STRENGTH: 1.5,
    SPECIAL_FLOW_SHARE_BASE_FLOOR: 50,
    COUNTERPART_SIZE_MASS_EXP: 0.35,
    CONNECTION_MAX_SIZE: 200,
    NEW_POINT_PREFIX: "demand-dev-pt:",
    POP_PREFIX: "demand-dev-pop:",
    SOURCE_ID: "demand-developer-ui-points-v3",
    CONTEXT_LAYER_ID: "demand-developer-context-layer-v3",
    CONNECTION_LAYER_ID: "demand-developer-review-connections-v1",
    EXISTING_CONNECTION_LAYER_ID: "demand-developer-existing-connections-v1",
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
    if (v >= 1e9) return `$${(v / 1e9).toFixed(3)}B`;
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
      version: 7,
      seq: 1,
      pointSeq: 1,
      points: {},
      pops: {},
      adjustments: {},
      roadArchive: {},
      actions: [],
      originalMapDemand: null,
    };
  }

  function migrateLedger(raw) {
    const base = newLedger();
    const source = raw && typeof raw === "object" ? raw : {};
    const sourceVersion = Number(source.version || 1);
    const migrated = { ...base, ...Object.fromEntries(Object.entries(source).filter(([key]) => Object.prototype.hasOwnProperty.call(base, key))) };
    migrated.points = source.points && typeof source.points === "object" ? source.points : {};
    migrated.pops = source.pops && typeof source.pops === "object" ? source.pops : {};
    migrated.adjustments = source.adjustments && typeof source.adjustments === "object" ? source.adjustments : {};
    migrated.roadArchive = source.roadArchive && typeof source.roadArchive === "object" ? source.roadArchive : {};
    migrated.actions = Array.isArray(source.actions) ? source.actions.map((action) => {
      if (!action || typeof action !== "object") return action;
      const { flows, popIds, ...summary } = action;
      if (!(Number(summary.chargedCost) >= 0)) {
        const quoted = Math.max(0, Number(summary.cost) || 0);
        summary.chargedCost = sourceVersion >= 2 ? quoted * 2 : quoted;
        summary.chargeMethod = sourceVersion >= 2 ? "legacy-subtractMoney" : "legacy-setMoney";
      }
      if (!summary.kind) summary.kind = "build";
      if (Array.isArray(summary.removedPoints)) summary.removedPoints = summary.removedPoints.map((x) => x && typeof x === "object" ? cloneJsonSafe(x) : x).filter(Boolean);
      return summary;
    }).filter(Boolean) : [];
    for (const rec of Object.values(migrated.pops)) {
      if (!rec || typeof rec !== "object") continue;
      if (!("active" in rec)) rec.active = true;
      const legacyRuntime = {};
      if (Number.isFinite(Number(rec.homeDepartureTime))) legacyRuntime.homeDepartureTime = Number(rec.homeDepartureTime);
      if (Number.isFinite(Number(rec.workDepartureTime))) legacyRuntime.workDepartureTime = Number(rec.workDepartureTime);
      if (rec.lastCommute && typeof rec.lastCommute === "object") legacyRuntime.lastCommute = rec.lastCommute;
      if (!rec.runtimeSnapshot && Object.keys(legacyRuntime).length) rec.runtimeSnapshot = legacyRuntime;
      delete rec.homeDepartureTime;
      delete rec.workDepartureTime;
      delete rec.lastCommute;
      if (typeof rec.pathPolyline === "string" && !Array.isArray(rec.drivingPath)) {
        rec.drivingPath = unpackPath(rec.pathPolyline);
      }
      delete rec.pathPolyline;
    }
    for (const rec of Object.values(migrated.adjustments)) {
      if (!rec || typeof rec !== "object") continue;
      if (!("active" in rec)) rec.active = true;
      if (typeof rec.pathPolyline === "string" && !Array.isArray(rec.drivingPath)) {
        rec.drivingPath = unpackPath(rec.pathPolyline);
      }
      delete rec.pathPolyline;
    }
    for (const rec of Object.values(migrated.roadArchive)) {
      if (rec && typeof rec.pathPolyline === "string" && !Array.isArray(rec.drivingPath))
        rec.drivingPath = unpackPath(rec.pathPolyline);
      if (rec) delete rec.pathPolyline;
    }
    migrated.version = 7;
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
    return hookName ?? readLiveSaveName();
  }

  function cloneLedgerState(source = ledger) {
    const out = {
      version: Number(source?.version) || 7,
      seq: Number(source?.seq) || 1,
      pointSeq: Number(source?.pointSeq) || 1,
      points: {},
      pops: {},
      adjustments: {},
      roadArchive: {},
      actions: [],
      originalMapDemand: source?.originalMapDemand ?? null,
    };
    for (const [id, rec] of Object.entries(source?.points || {})) {
      if (!rec || typeof rec !== "object") continue;
      out.points[id] = {
        ...rec,
        location: Array.isArray(rec.location) ? [...rec.location] : rec.location,
        residentModeShare: rec.residentModeShare ? { ...rec.residentModeShare } : rec.residentModeShare,
        workerModeShare: rec.workerModeShare ? { ...rec.workerModeShare } : rec.workerModeShare,
      };
    }
    for (const [id, rec] of Object.entries(source?.pops || {})) {
      if (!rec || typeof rec !== "object") continue;
      const { homeDepartureTime, workDepartureTime, lastCommute, ...clean } = rec;
      out.pops[id] = {
        ...clean,
        drivingPath: rec.drivingPath,
        runtimeSnapshot: rec.runtimeSnapshot ? cloneJsonSafe(rec.runtimeSnapshot) : undefined,
      };
    }
    for (const [id, rec] of Object.entries(source?.adjustments || {})) {
      if (rec && typeof rec === "object") out.adjustments[id] = {
        ...rec,
        drivingPath: Array.isArray(rec.drivingPath) ? rec.drivingPath.map(p => [...p]) : rec.drivingPath,
      };
    }
    for (const [id, rec] of Object.entries(source?.roadArchive || {})) {
      if (rec && typeof rec === "object") out.roadArchive[id] = {
        ...rec, drivingPath: Array.isArray(rec.drivingPath) ? rec.drivingPath.map(p => [...p]) : rec.drivingPath,
      };
    }
    out.actions = (source?.actions || []).filter(Boolean).map((action) => cloneJsonSafe(action));
    return out;
  }

  function packPath(coords) {
    if (!Array.isArray(coords) || coords.length < 2) return null;
    let result = "", prevLat = 0, prevLon = 0;
    const append = (delta) => {
      let n = delta < 0 ? (-delta * 2 - 1) : delta * 2;
      do {
        const part = n % 32;
        n = Math.floor(n / 32);
        result += String.fromCharCode((n ? part + 32 : part) + 63);
      } while (n);
    };
    for (const coord of coords) {
      if (!Array.isArray(coord) || !Number.isFinite(Number(coord[0])) || !Number.isFinite(Number(coord[1]))) return null;
      const lon = Math.round(Number(coord[0]) * 1e5), lat = Math.round(Number(coord[1]) * 1e5);
      append(lat - prevLat); append(lon - prevLon);
      prevLat = lat; prevLon = lon;
    }
    return result;
  }
  function unpackPath(encoded) {
    if (typeof encoded !== "string" || !encoded.length) return null;
    const result = [];
    let i = 0, lat = 0, lon = 0;
    function next() {
      let value = 0, factor = 1, count = 0;
      while (i < encoded.length && count++ < 10) {
        const c = encoded.charCodeAt(i++) - 63;
        if (c < 0 || c > 63) return null;
        value += (c & 31) * factor;
        if (c < 32) return value & 1 ? -(value + 1) / 2 : value / 2;
        factor *= 32;
      }
      return null;
    }
    while (i < encoded.length) {
      const dy = next(), dx = next();
      if (dy == null || dx == null) return null;
      lat += dy; lon += dx;
      result.push([lon / 1e5, lat / 1e5]);
      if (result.length > 200000) return null;
    }
    return result.length >= 2 ? result : null;
  }
  function compactStoredLedger(source) {
    const snapshot = cloneLedgerState(source);
    for (const rec of [...Object.values(snapshot.pops), ...Object.values(snapshot.adjustments), ...Object.values(snapshot.roadArchive)]) {
      if (!rec || !Array.isArray(rec.drivingPath) || rec.drivingPath.length < 2) continue;
      const packed = packPath(rec.drivingPath);
      if (packed) { rec.pathPolyline = packed; delete rec.drivingPath; }
    }
    return snapshot;
  }

  let ledger = newLedger();
  let demandRevision = 0;
  let lastPlanningDemandSignature = null;

  function planningDemandSignature(dd) {
    if (!dd?.points || !dd?.popsMap) return null;
    let pointCount = 0, pointXor = 0, pointSum = 0;
    const hash32 = (value) => {
      const text = String(value);
      let h = 2166136261;
      for (let i = 0; i < text.length; i++) {
        h ^= text.charCodeAt(i);
        h = Math.imul(h, 16777619);
      }
      return h >>> 0;
    };
    for (const [id, point] of dd.points.entries()) {
      const lon = Math.round((Number(point?.location?.[0]) || 0) * 1e6);
      const lat = Math.round((Number(point?.location?.[1]) || 0) * 1e6);
      const residents = Math.round(Number(point?.residents) || 0);
      const jobs = Math.round(Number(point?.jobs) || 0);
      const popCount = point?.popIds && typeof point.popIds !== "string" && typeof point.popIds[Symbol.iterator] === "function"
        ? Array.from(point.popIds).length
        : 0;
      const h = hash32(`${id}|${lon}|${lat}|${residents}|${jobs}|${popCount}`);
      pointCount += 1;
      pointXor = (pointXor ^ h) >>> 0;
      pointSum = (pointSum + h) >>> 0;
    }
    let flowXor = 0, flowSum = 0;
    for (const [id, pop] of dd.popsMap.entries()) {
      const size = Math.round((Number(pop?.size) || 0) * 1000);
      const h = hash32(`${id}|${pop?.residenceId}|${pop?.jobId}|${size}`);
      flowXor = (flowXor ^ h) >>> 0;
      flowSum = (flowSum + h) >>> 0;
    }
    return `${pointCount}:${pointXor}:${pointSum}|pops:${dd.popsMap.size}:${flowXor}:${flowSum}`;
  }

  function rememberPlanningDemandSignature(dd) {
    lastPlanningDemandSignature = planningDemandSignature(dd);
    return lastPlanningDemandSignature;
  }

  const nearestStationsCache = new Map();
  let activeDevelopmentGroupsCache = null;
  let developmentInfoStatsCache = null;

  function clearDevelopmentSummaryCaches() {
    activeDevelopmentGroupsCache = null;
    developmentInfoStatsCache = null;
  }

  let loadedLedgerKey = null;
  let ledgerSaveChain = Promise.resolve();
  let ledgerSnapshotClock = 0;
  function nextLedgerTimestamp() {
    ledgerSnapshotClock = Math.max(Date.now(), ledgerSnapshotClock + 1);
    return ledgerSnapshotClock;
  }
  let ledgerLoadToken = 0;
  let currentSaveName = null;
  let sawGameLoadedHook = false;

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
    const base = sessionLedgerBaseKey();
    return base ? `${base}:working-v1` : null;
  }

  const CHECKPOINT_MATCH_TOLERANCE_SECONDS = 4;
  const CHECKPOINT_HISTORY_LIMIT = 256;
  let checkpointSerial = 0;
  let checkpointIndexCache = null;
  let checkpointIndexCacheKey = null;
  function gameElapsedForCheckpoint() {
    try {
      const n = Number(api.gameState.getElapsedSeconds?.());
      return Number.isFinite(n) && n >= 0 ? n : null;
    } catch { return null; }
  }
  function checkpointIndexKey() {
    const base = sessionLedgerBaseKey();
    return base ? `${base}:simulation-checkpoint-index-v1` : null;
  }
  function checkpointDataKey(id) {
    const base = sessionLedgerBaseKey();
    return base ? `${base}:simulation-checkpoint:${id}` : null;
  }
  function checkpointIndexRows(value) {
    const rows = value?.checkpointIndex;
    if (!Array.isArray(rows)) return [];
    return rows.filter((r) => r && typeof r.id === 'string'
      && Number.isFinite(Number(r.elapsed)) && Number(r.elapsed) >= 0
      && typeof r.savedAt === 'number');
  }
  async function readCheckpointIndex() {
    const key = checkpointIndexKey();
    if (checkpointIndexCacheKey !== key) { checkpointIndexCache = null; checkpointIndexCacheKey = key; }
    const stored = key ? await readBestStoredLedger(key) : null;
    const rows = checkpointIndexRows(stored?.state);
    if (!checkpointIndexCache || rows.length > checkpointIndexCache.length ||
      (rows.length && (rows.at(-1)?.savedAt || 0) > (checkpointIndexCache.at(-1)?.savedAt || 0)))
      checkpointIndexCache = rows;
    return checkpointIndexCache || rows;
  }
  function selectCheckpointAtGameTime(rows, elapsed, saveName = null, city = null) {
    if (elapsed == null) return { kind: 'time-unavailable', row: null };
    const near = rows.filter((r) => !r.city || !city || r.city === city)
      .map((r) => ({ row: r, distance: Math.abs(Number(r.elapsed) - elapsed) }))
      .filter((r) => r.distance <= CHECKPOINT_MATCH_TOLERANCE_SECONDS)
      .sort((a, b) => a.distance - b.distance || b.row.savedAt - a.row.savedAt);
    if (!near.length) return { kind: 'not-found', row: null };
    const named = saveName ? near.filter(({ row }) => row.saveName === saveName) : [];
    if (named.length) {
      const atSameTime = named.every(({ row }) => Math.abs(Number(row.elapsed) - Number(named[0].row.elapsed)) < 0.01);
      const sameState = named.every(({ row }) => row.signature === named[0].row.signature && row.actions === named[0].row.actions);
      if (named.length === 1 || atSameTime || sameState) {
        const best = named.slice().sort((a, b) => b.row.savedAt - a.row.savedAt || a.distance - b.distance)[0];
        return { kind: 'matched-save-slot', row: best.row, deltaSeconds: best.distance };
      }
      const exact = named.filter((r) => r.distance < 0.05);
      if (exact.length === 1) {
        return { kind: 'matched-save-slot-exact-time', row: exact[0].row, deltaSeconds: exact[0].distance };
      }
      return { kind: 'ambiguous-save-slot', row: null, candidates: named.length };
    }
    const best = near[0];
    const conflicting = near.some(({ row }) => row.id !== best.row.id
      && (row.signature !== best.row.signature || row.actions !== best.row.actions));
    if (conflicting) return { kind: 'ambiguous-paused-save', row: null, candidates: near.length };
    return { kind: 'matched-game-time', row: best.row, deltaSeconds: best.distance };
  }
  function ledgerSnapshotSignature(snapshot) {
    const entries = Object.entries(snapshot.pops || {}).sort(([a], [b]) => a.localeCompare(b))
      .map(([id, r]) => `${id}:${r?.active === false ? 0 : 1}:${r?.residenceId}:${r?.jobId}:${r?.size}`);
    const points = Object.entries(snapshot.points || {}).sort(([a], [b]) => a.localeCompare(b))
      .map(([id, r]) => `${id}:${r?.created ? 1 : 0}:${r?.addedResidents || 0}:${r?.addedJobs || 0}`);
    const adjustments = Object.entries(snapshot.adjustments || {}).sort(([a], [b]) => a.localeCompare(b))
      .map(([id, r]) => `${id}:${r?.popId}:${r?.active === false ? 0 : 1}:${r?.delta || 0}:${r?.baseSize ?? ""}`);
    const actions = (snapshot.actions || []).map(a =>
      `${a?.id}:${a?.kind}:${a?.active === false ? 0 : 1}:${a?.amount || 0}`).sort();
    let h = 2166136261;
    for (const char of `${points.join('|')}|${entries.join('|')}|${adjustments.join('|')}|${actions.join('|')}`) {
      h = Math.imul(h ^ char.charCodeAt(0), 16777619);
    }
    return String(h >>> 0);
  }
  async function writeSimulationCheckpoint(saveEventAt, snapshot, saveName = null, city = null) {
    const elapsed = gameElapsedForCheckpoint();
    if (elapsed == null) {
      return false;
    }
    const id = `${saveEventAt}-${++checkpointSerial}`;
    const key = checkpointDataKey(id), indexKey = checkpointIndexKey();
    if (!key || !indexKey) return false;
    const signature = ledgerSnapshotSignature(snapshot);
    const row = { id, elapsed, savedAt: saveEventAt,
      actions: snapshot.actions?.length || 0, signature,
      saveName: typeof saveName === "string" && saveName.length ? saveName : null,
      city: city || null };
    const savedSnapshot = { ...compactStoredLedger(snapshot),
      version: Number(snapshot.version) || 7, gameElapsed: elapsed,
      checkpointId: id, savedAt: nextLedgerTimestamp(), city: city || null };
    writeLocalLedgerNow(key, JSON.stringify(savedSnapshot));
    if (checkpointIndexCacheKey !== indexKey) { checkpointIndexCache = null; checkpointIndexCacheKey = indexKey; }
    let previous = checkpointIndexCache;
    if (!previous) {
      try { previous = checkpointIndexRows(parseLedgerCandidate(legacyStorage()?.getItem(indexKey))); } catch {}
    }
    if (!previous) previous = await readCheckpointIndex();
    const rows = [...previous.filter((r) => r.id !== id), row]
      .sort((a, b) => a.savedAt - b.savedAt).slice(-CHECKPOINT_HISTORY_LIMIT);
    const indexState = { version: 7, checkpointIndex: rows, savedAt: nextLedgerTimestamp() };
    checkpointIndexCache = rows;
    writeLocalLedgerNow(indexKey, JSON.stringify(indexState));
    const pending = ledgerSaveChain.catch(() => false).then(async () => {
      const snapshotOk = await writeVerifiedLedger(key, savedSnapshot, 'simulation checkpoint');
      if (!snapshotOk) return false;
      return writeVerifiedLedger(indexKey, indexState, 'simulation checkpoint index');
    });
    ledgerSaveChain = pending;
    const persisted = await pending;
    return persisted;
  }

  function autosaveSlotName(name) {
    if (typeof name !== "string") return false;
    return /^\[\s*auto(?:\s*save)?\s*\](?:\s|$)/i.test(name.trim()) ||
      /(?:^|[^a-z])auto[\s_-]*sav(?:e|ed|ing)(?=$|[^a-z0-9]|[0-9])/i.test(name.trim()) ||
      /^_auto(?:__|_)/i.test(name.trim());
  }

  function legacySessionLedgerKey() {
    return sessionLedgerBaseKey();
  }

  function slotMigrationMarkerKey() {
    const base = sessionLedgerBaseKey();
    return base ? `${base}:save-slots-v3-migrated` : null;
  }

  function parseLedgerCandidate(value) {
    for (let depth = 0; depth < 3; depth++) {
      if (value == null) return null;
      if (typeof value === "string") {
        try { value = JSON.parse(value); }
        catch { return null; }
        continue;
      }
      if (typeof value !== "object" || Array.isArray(value)) return null;
      if (typeof value.success === "boolean" && ("value" in value || !("version" in value))) {
        if (!value.success) return null;
        value = value.value;
        continue;
      }
      return ["version", "points", "pops", "actions", "adjustments"].some((k) => k in value) ? value : null;
    }
    return null;
  }

  function electronLedgerStorage() {
    try {
      const electron = window.electron;
      return electron?.getStorageItem && electron?.setStorageItem ? electron : null;
    } catch { return null; }
  }

  function electronLedgerKey(key) { return `demand-developer:state:${key}`; }

  async function readElectronLedger(key) {
    const electron = electronLedgerStorage();
    if (!electron) return null;
    try {
      const result = await electron.getStorageItem(electronLedgerKey(key));
      return result?.success ? parseLedgerCandidate(result.data ?? result.value) : null;
    } catch (e) {
      console.warn(`${TAG} failed to read Electron development storage`, e);
      return null;
    }
  }

  function ipcModStore() {
    try { return typeof window.electron?.invoke === "function" ? window.electron : null; }
    catch { return null; }
  }

  async function readIpcModLedger(key) {
    const electron = ipcModStore();
    if (!electron) return null;
    try {
      const result = await electron.invoke("mod-storage-get", "demand-developer", key);
      return result?.success ? parseLedgerCandidate(result.value ?? result.data) : null;
    } catch (e) {
      console.warn(`${TAG} mod-file ledger read failed`, e);
      return null;
    }
  }

  async function readBestStoredLedger(key) {
    const candidates = [];
    try {
      const local = parseLedgerCandidate(legacyStorage()?.getItem?.(key));
      if (local) candidates.push({ state: local, rank: 3, backend: "localStorage" });
    } catch (e) { console.warn(`${TAG} local development storage read failed`, e); }
    const file = await readIpcModLedger(key);
    if (file) candidates.push({ state: file, rank: 5, backend: "per-mod file" });
    const electron = await readElectronLedger(key);
    if (electron) candidates.push({ state: electron, rank: 2, backend: "Electron" });
    try {
      if (modStorage) {
        const apiValue = parseLedgerCandidate(await modStorage.get(key, null));
        if (apiValue) candidates.push({ state: apiValue, rank: 1, backend: "api.storage" });
      }
    } catch (e) { console.warn(`${TAG} game development storage read failed`, e); }
    candidates.sort((a, b) =>
      (Number(b.state.savedAt) || 0) - (Number(a.state.savedAt) || 0) ||
      (Number(b.state.seq) || 0) - (Number(a.state.seq) || 0) ||
      b.rank - a.rank);
    return candidates[0] || null;
  }

  function writeLocalLedgerNow(key, serialized) {
    try {
      const local = legacyStorage();
      if (local) {
        const existing = parseLedgerCandidate(local.getItem(key));
        const incoming = parseLedgerCandidate(serialized);
        if (existing && incoming && Number(existing.savedAt) > Number(incoming.savedAt)) return true;
        local.setItem(key, serialized);
        return local.getItem(key) === serialized;
      }
    } catch (e) { console.warn(`${TAG} local ledger write failed`, e); }
    return false;
  }

  async function writeVerifiedLedger(key, snapshot, label) {
    const serialized = JSON.stringify(snapshot);
    let backedUp = false;
    let fileSaved = false;

    const localSaved = writeLocalLedgerNow(key, serialized);
    backedUp = localSaved;
    const ipc = ipcModStore();
    if (ipc) {
      try {
        const r = await ipc.invoke("mod-storage-set", "demand-developer", key, snapshot);
        if (r?.success) {
          const readback = await readIpcModLedger(key);
          if (readback && JSON.stringify(readback) === serialized) {
            backedUp = true;
            fileSaved = true;
          }
        }
      } catch (e) { console.warn(`${TAG} ${label}: mod-file write failed`, e); }
    }

    if (!fileSaved) {
      const electron = electronLedgerStorage();
      if (electron) {
        try {
          const r = await electron.setStorageItem(electronLedgerKey(key), snapshot);
          if (r?.success) {
            const readback = await readElectronLedger(key);
            if (readback && JSON.stringify(readback) === serialized) {
              backedUp = true;
              fileSaved = true;
            }
          }
        } catch (e) { console.warn(`${TAG} ${label}: Electron settings write failed`, e); }
      }
    }
    if (!fileSaved && modStorage) {
      try {
        const result = await modStorage.set(key, snapshot);
        if (result?.success === false) throw new Error(result.error || "storage rejected write");
        const readback = parseLedgerCandidate(await modStorage.get(key, null));
        if (readback && JSON.stringify(readback) === serialized) {
          backedUp = true;
          fileSaved = true;
        }
      } catch (e) { console.warn(`${TAG} ${label}: api.storage write failed`, e); }
    }
    if (!backedUp) console.error(`${TAG} ${label}: no working development storage backend`);
    return backedUp;
  }

  function recoverCheckpointRoadPaths(checkpoint, working, dd) {
    if (!checkpoint?.pops || !working?.pops || !dd?.points) return 0;
    let recovered = 0;
    for (const [id, saved] of Object.entries(checkpoint.pops)) {
      const recent = working.pops[id];
      if (!saved || saved.active === false || !recent || recent.active === false ||
          String(saved.residenceId) !== String(recent.residenceId) ||
          String(saved.jobId) !== String(recent.jobId)) continue;
      const homeId = saved.residenceId, workId = saved.jobId;
      const home = looseMapGet(dd.points, homeId)?.location;
      const work = looseMapGet(dd.points, workId)?.location;
      if (!Array.isArray(home) || !Array.isArray(work)) continue;
      const sameLocation = (pointId, live) => {
        for (const record of [checkpoint.points?.[pointId], working.points?.[pointId]]) {
          if (Array.isArray(record?.location) && roadMeters(record.location, live) > 25) return false;
        }
        return true;
      };
      if (!sameLocation(homeId, home) || !sameLocation(workId, work)) continue;
      const savedPath = usefulRoadPath(saved.drivingPath, home, work) ||
        (saved.roadMetricsVerified && saved.straightRoadReviewed &&
          cleanOwnedRoadGeometry(saved.drivingPath, home, work));
      if (savedPath) continue;
      const recentPath = usefulRoadPath(recent.drivingPath, home, work) ||
        (recent.roadMetricsVerified && recent.straightRoadReviewed &&
          cleanOwnedRoadGeometry(recent.drivingPath, home, work));
      if (!recentPath) continue;
      saved.drivingPath = cloneJsonSafe(recentPath);
      if (recent.roadMetricsVerified && Number(recent.drivingDistance) > 0 &&
          Number(recent.drivingSeconds) > 0) {
        saved.drivingDistance = Number(recent.drivingDistance);
        saved.drivingSeconds = Number(recent.drivingSeconds);
        saved.roadMetricsVerified = true;
      }
      saved.straightRoadReviewed = !!recent.straightRoadReviewed;
      recovered++;
    }
    for (const [id, saved] of Object.entries(checkpoint.adjustments || {})) {
      const recent = working.adjustments?.[id];
      if (!saved?.demolition || saved.active !== false || !recent?.demolition ||
          recent.active !== false || String(saved.popId) !== String(recent.popId) ||
          String(saved.residenceId) !== String(recent.residenceId) ||
          String(saved.jobId) !== String(recent.jobId)) continue;
      const home = looseMapGet(dd.points, saved.residenceId)?.location;
      const work = looseMapGet(dd.points, saved.jobId)?.location;
      if (!Array.isArray(home) || !Array.isArray(work)) continue;
      const checkpointHome = checkpoint.points?.[saved.residenceId]?.location;
      const checkpointWork = checkpoint.points?.[saved.jobId]?.location;
      const workingHome = working.points?.[saved.residenceId]?.location;
      const workingWork = working.points?.[saved.jobId]?.location;
      if ([checkpointHome, workingHome].some(p => Array.isArray(p) && roadMeters(p, home) > 25) ||
          [checkpointWork, workingWork].some(p => Array.isArray(p) && roadMeters(p, work) > 25)) continue;
      if (usefulRoadPath(saved.drivingPath, home, work)) continue;
      const path = usefulRoadPath(recent.drivingPath, home, work);
      if (!path) continue;
      saved.drivingPath = cloneJsonSafe(path);
      if (Number(recent.drivingDistance) > 0) saved.drivingDistance = Number(recent.drivingDistance);
      if (Number(recent.drivingSeconds) > 0) saved.drivingSeconds = Number(recent.drivingSeconds);
      recovered++;
    }
    return recovered;
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

    await Promise.all([ledgerSaveChain, workingWriteDrain || Promise.resolve()]);
    if (expectedEpoch !== lifecycleEpoch || expectedToken !== ledgerLoadToken || ledgerKey() !== key) {
      return { found: false, migratedSessionLedger: false, needsLegacyRepair: false };
    }
    let stored = null;
    let checkpointSourceKey = null;
    const indexRows = sawGameLoadedHook ? await readCheckpointIndex() : [];
    const elapsed = gameElapsedForCheckpoint();
    const match = selectCheckpointAtGameTime(indexRows, elapsed, currentSaveName, currentCity());
    if (match.row) {
      const candidateKey = checkpointDataKey(match.row.id);
      const candidate = candidateKey ? await readBestStoredLedger(candidateKey) : null;
      if (candidate?.state?.checkpointId === match.row.id
        && (!candidate.state.city || candidate.state.city === currentCity())
        && candidate.state.gameElapsed != null
        && Math.abs(Number(candidate.state.gameElapsed) - elapsed) <= CHECKPOINT_MATCH_TOLERANCE_SECONDS) {
        stored = candidate;
        checkpointSourceKey = candidateKey;
      }
    }

    if (sawGameLoadedHook && autosaveSlotName(currentSaveName)) {
      const savedState = stored?.state;
      const checkpointIsEmpty = !savedState || (
        !(Array.isArray(savedState.actions) && savedState.actions.length) &&
        !Object.values(savedState.pops || {}).some((r) => r && r.active !== false)
      );
      if (checkpointIsEmpty) {
        const workingCopy = await readBestStoredLedger(key);
        const state = workingCopy?.state;
        const recordedActions = Array.isArray(state?.actions) ? state.actions.filter(Boolean) : [];
        const currentCode = currentCity();
        const cityMatches = recordedActions.length > 0 &&
          recordedActions.every((a) => !a.city || a.city === currentCode);
        const hasDevelopment = recordedActions.length > 0 ||
          Object.values(state?.pops || {}).some((r) => r && r.active !== false);
        if (state && cityMatches && hasDevelopment) {
          stored = workingCopy;
          checkpointSourceKey = null;

        }
      }
    }
    if (!stored && sawGameLoadedHook && !autosaveSlotName(currentSaveName) &&
      (match.kind === 'ambiguous-paused-save' || match.kind === 'ambiguous-save-slot')) {
      console.warn(`${TAG} Multiple saved development checkpoints match this game state; refusing to overwrite them.`);
      return { found: false, ambiguousCheckpoint: true, migratedSessionLedger: false, needsLegacyRepair: false };
    }
    if (!stored && !indexRows.length && currentSaveName != null && !autosaveSlotName(currentSaveName)) {
      const legacyKey = ledgerKeyForSaveName(currentSaveName);
      stored = legacyKey ? await readBestStoredLedger(legacyKey) : null;
      if (stored) checkpointSourceKey = legacyKey;
    }
    if (!stored && !sawGameLoadedHook) {
      stored = await readBestStoredLedger(key);
    }
    if (!stored && sawGameLoadedHook && indexRows.length) {
      console.warn(`${TAG} No matching saved development state was found. Unrelated changes were not restored.`);
    }
    let raw = stored?.state || null;
    const migratedFromLegacyLocalStorage = !!raw && stored.backend === "localStorage";
    let migratedSessionLedger = false;

    if (!raw && !sawGameLoadedHook && !indexRows.length) {
      const markerKey = slotMigrationMarkerKey();
      let alreadyMigrated = false;
      try {
        if (markerKey && modStorage) {
          let marker = await modStorage.get(markerKey, null);
          if (marker && typeof marker === "object" && typeof marker.success === "boolean")
            marker = marker.success ? marker.value : null;
          alreadyMigrated = !!marker;
        }
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
    const needsRuntimeCleanup = !!raw?.pops && Object.values(raw.pops).some((rec) =>
      rec && typeof rec === "object" && ("lastCommute" in rec || "homeDepartureTime" in rec || "workDepartureTime" in rec)
    );
    const workingRoutesCopy = stored?.state?.checkpointId && checkpointSourceKey
      ? await readBestStoredLedger(key) : null;
    if (expectedEpoch !== lifecycleEpoch || expectedToken !== ledgerLoadToken || ledgerKey() !== key) {
      return { found: false, migratedSessionLedger: false, needsLegacyRepair: false };
    }
    ledger = migrateLedger(raw);
    if (workingRoutesCopy?.state) {
      recoverCheckpointRoadPaths(ledger, migrateLedger(workingRoutesCopy.state),
        api.gameState.getDemandData?.());
    }
    loadedLedgerKey = key;
    if (raw) {
      if (checkpointSourceKey && stored?.backend !== "per-mod file") {
        await writeVerifiedLedger(checkpointSourceKey, stored.state, "legacy save checkpoint backup");
      }
      await saveLedger();
    }

    if (raw && (migratedSessionLedger || migratedFromLegacyLocalStorage || sourceVersion < 7 || needsRuntimeCleanup)) {
      if (migratedSessionLedger) {
        const markerKey = slotMigrationMarkerKey();
        const marker = { migratedAt: Date.now(), saveName: currentSaveName };
        try {
          if (markerKey && modStorage) await modStorage.set(markerKey, marker);
          else if (markerKey) legacyStorage()?.setItem?.(markerKey, JSON.stringify(marker));
        } catch {}
      }
    }
    return { found: !!raw, migratedSessionLedger, needsLegacyRepair: !!raw && sourceVersion < 3 };
  }

  let latestWorkingWrite = null;
  let workingWriteDrain = null;
  let unsavedWorkingLedger = false;
  function persistAppliedChange() {
    const epoch = lifecycleEpoch, key = loadedLedgerKey;
    void saveLedger().then(saved => {
      if (epoch !== lifecycleEpoch || key !== loadedLedgerKey) return;
      unsavedWorkingLedger = !saved;
      if (!saved) uiStore.set({ status: "Development applied, but could not be saved. Save again after checking storage." });
    });
  }
  function saveLedger() {
    clearDevelopmentSummaryCaches();
    const key = ledgerKey();
    if (!key || loadedLedgerKey !== key) return Promise.resolve(false);
    const state = { ...compactStoredLedger(cloneLedgerState()), savedAt: nextLedgerTimestamp() };
    writeLocalLedgerNow(key, JSON.stringify(state));
    latestWorkingWrite = { key, state };
    if (!workingWriteDrain) {
      const drain = async () => {
        let result = false;
        while (latestWorkingWrite) {
          const item = latestWorkingWrite;
          latestWorkingWrite = null;
          result = await writeVerifiedLedger(item.key, item.state, "working development");
        }
        return result;
      };
      workingWriteDrain = drain().catch((e) => {
        console.warn(`${TAG} working-state write failed`, e);
        return false;
      }).finally(() => { workingWriteDrain = null; });
    }
    return workingWriteDrain;
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

  const POP_CORE_FIELDS = new Set([
    "id", "size", "residenceId", "jobId",
    "drivingSeconds", "drivingDistance", "drivingPath"
  ]);

  function runtimeSnapshotForPop(live) {
    if (!live || typeof live !== "object") return null;
    const snapshot = {};
    for (const [key, value] of Object.entries(live)) {
      if (POP_CORE_FIELDS.has(key)) continue;
      const cloned = cloneJsonSafe(value);
      if (cloned !== undefined) snapshot[key] = cloned;
    }
    return Object.keys(snapshot).length ? snapshot : null;
  }

  function snapshotsEqual(a, b) {
    try { return JSON.stringify(a ?? null) === JSON.stringify(b ?? null); }
    catch { return false; }
  }

  function hasCalculatedCommute(value) {
    return !!value && typeof value === "object" && (
      value.modeChoice != null ||
      Array.isArray(value.transitPaths) ||
      value.walking != null
    );
  }

  function restorePopRuntimeFromRecord(live, rec) {
    if (!live || !rec?.runtimeSnapshot || typeof rec.runtimeSnapshot !== "object") return false;
    let changed = false;
    for (const [key, saved] of Object.entries(rec.runtimeSnapshot)) {
      if (POP_CORE_FIELDS.has(key)) continue;
      if (key === "lastCommute") {
        if (hasCalculatedCommute(saved) && !hasCalculatedCommute(live.lastCommute)) {
          live.lastCommute = cloneJsonSafe(saved);
          changed = true;
        }
        continue;
      }
      if (key === "homeDepartureTime" || key === "workDepartureTime") {
        if (Number.isFinite(Number(saved)) && Number(live[key]) !== Number(saved)) {
          live[key] = Number(saved);
          changed = true;
        }
        continue;
      }
      if (!snapshotsEqual(live[key], saved)) {
        live[key] = cloneJsonSafe(saved);
        changed = true;
      }
    }
    return changed;
  }

  function restoreOwnedPopRuntimeSnapshots(dd = api.gameState.getDemandData?.()) {
    if (!dd?.popsMap) return 0;
    let restored = 0;
    for (const [ledgerId, rec] of Object.entries(ledger.pops || {})) {
      if (!rec || rec.active === false || !rec.runtimeSnapshot) continue;
      const key = looseMapKey(dd.popsMap, ledgerId);
      if (key == null) continue;
      const live = dd.popsMap.get(key);
      if (!live) continue;
      if (String(live.residenceId ?? "") !== String(rec.residenceId ?? "") ||
          String(live.jobId ?? "") !== String(rec.jobId ?? "")) continue;
      if (restorePopRuntimeFromRecord(live, rec)) restored++;
    }
    return restored;
  }

  function capturePopRuntimeIntoRecord(rec, live, dd = api.gameState.getDemandData?.()) {
    if (!rec || !live) return false;
    let changed = false;
    const distance = Number(live.drivingDistance);
    const seconds = Number(live.drivingSeconds);
    if (!rec.roadMetricsVerified && Number.isFinite(distance) && distance > 0 && Number(rec.drivingDistance) !== distance) {
      rec.drivingDistance = distance;
      changed = true;
    }
    if (!rec.roadMetricsVerified && Number.isFinite(seconds) && seconds > 0 && Number(rec.drivingSeconds) !== seconds) {
      rec.drivingSeconds = seconds;
      changed = true;
    }
    const home = looseMapGet(dd?.points, rec.residenceId)?.location;
    const work = looseMapGet(dd?.points, rec.jobId)?.location;
    const savedRoad = usefulRoadPath(rec.drivingPath, home, work) ||
      (rec.roadMetricsVerified && rec.straightRoadReviewed &&
        cleanOwnedRoadGeometry(rec.drivingPath, home, work));
    const liveRoad = usefulRoadPath(live.drivingPath, home, work);
    if (!savedRoad && liveRoad) {
      rec.drivingPath = cloneJsonSafe(liveRoad);
      changed = true;
    }
    const runtimeSnapshot = runtimeSnapshotForPop(live);
    if (!snapshotsEqual(rec.runtimeSnapshot, runtimeSnapshot)) {
      if (runtimeSnapshot) rec.runtimeSnapshot = runtimeSnapshot;
      else delete rec.runtimeSnapshot;
      changed = true;
    }
    delete rec.homeDepartureTime;
    delete rec.workDepartureTime;
    delete rec.lastCommute;
    return changed;
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

  function liveOwnedPopBaseIsPresent(dd, popId, rec, indexed = null) {
    if (!dd?.points || !dd?.popsMap || !rec) return false;
    const key = looseMapKey(dd.popsMap, popId);
    if (key == null) return false;
    const live = dd.popsMap.get(key);
    const endpointsMatch = !!live &&
      String(live.residenceId ?? "") === String(rec.residenceId ?? "") &&
      String(live.jobId ?? "") === String(rec.jobId ?? "");
    const expected = Math.max(0, (Number(rec.size) || 0) + activeAdjustmentDeltaForPop(popId, indexed));
    const baseSizePresent = expected > 0 && !!live && Math.abs((Number(live.size) || 0) - expected) < 0.001;
    if (!endpointsMatch || !baseSizePresent) return false;
    const residence = looseMapGet(dd.points, rec.residenceId);
    const job = looseMapGet(dd.points, rec.jobId);
    if (!residence || !job) return false;
    return pointHasPopId(residence, key) && pointHasPopId(job, key);
  }

  function liveOwnedPopIsComplete(dd, popId, rec, indexed = null) {
    if (!liveOwnedPopBaseIsPresent(dd, popId, rec, indexed)) return false;
    const key = looseMapKey(dd.popsMap, popId);
    const live = key == null ? null : dd.popsMap.get(key);
    return popMatchesLedgerRecord(live, rec, popId, indexed);
  }

  function ledgerNeedsLiveRestore(dd = api.gameState.getDemandData?.()) {
    if (!dd?.points || !dd?.popsMap) return false;
    const indexed = new Map();
    for (const rec of Object.values(ledger.adjustments || {})) {
      if (!rec || rec.active === false || rec.popId == null) continue;
      const id = String(rec.popId);
      indexed.set(id, (indexed.get(id) || 0) + (Number(rec.delta) || 0));
    }
    for (const [popId, rec] of Object.entries(ledger.pops || {})) {
      if (!rec || rec.active === false) continue;
      const expected = Math.max(0, (Number(rec.size) || 0) + activeAdjustmentDeltaForPop(popId, indexed));
      const live = looseMapGet(dd.popsMap, popId);
      if (expected <= 0.001) { if (live) return true; continue; }
      if (!liveOwnedPopIsComplete(dd, popId, rec, indexed)) return true;
    }
    for (const g of activeAdjustmentGroups().values()) {
      const expected = Math.max(0, g.beforeSize + g.delta);
      const pop = looseMapGet(dd.popsMap, g.popId);
      if (expected <= 0.001) { if (pop) return true; continue; }
      if (!pop || String(pop.residenceId) !== String(g.residenceId) || String(pop.jobId) !== String(g.jobId)) return true;
      if (Math.abs((Number(pop.size) || 0) - expected) > 0.001) return true;
    }
    const activeEndpointIds = new Set();
    for (const [popId, pop] of Object.entries(ledger.pops || {})) {
      if (!pop || pop.active === false || !((Number(pop.size) || 0) + activeAdjustmentDeltaForPop(popId, indexed) > 0)) continue;
      activeEndpointIds.add(String(pop.residenceId));
      activeEndpointIds.add(String(pop.jobId));
    }
    for (const [pointId, rec] of Object.entries(ledger.points || {})) {
      if (!rec?.created || !activeEndpointIds.has(String(pointId))) continue;
      if (looseMapKey(dd.points, pointId) == null) return true;
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
      if (capturePopRuntimeIntoRecord(rec, live, dd)) changed++;
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
    const popsMap = new Map();
    for (const [id, pop] of dd.popsMap) {
      popsMap.set(id, { ...pop });
    }
    return { points, popsMap };
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
  let drivingDonorCacheRevision = -1;
  let drivingDonorCache = null;
  function drivingDonorsForPlanning(dd) {
    if (drivingDonorCacheRevision === demandRevision && drivingDonorCache) return drivingDonorCache;
    drivingDonorCache = buildDrivingDonors(dd);
    drivingDonorCacheRevision = demandRevision;
    return drivingDonorCache;
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

  function increasePlannedPop(dd, popId, amount) {
    const pop = looseMapGet(dd?.popsMap, popId);
    if (!pop || !(Number(amount) > 0)) return false;
    const res = looseMapGet(dd?.points, pop.residenceId);
    const job = looseMapGet(dd?.points, pop.jobId);
    if (!res || !job) return false;
    pop.size = (Number(pop.size) || 0) + amount;
    res.residents = (Number(res.residents) || 0) + amount;
    job.jobs = (Number(job.jobs) || 0) + amount;
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

  function collectSameSideDonorDescriptors(dd, location, side) {
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
    return { shares, count, maxShare };
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
      return CFG.STEP / CFG.DEFAULT_LINKS;
    }

    const median = weightedQuantile(samples, 0.5);
    const stepAlignedShare = totalWeight > 0 ? stepAlignedWeight / totalWeight : 0;
    return stepAlignedShare >= 0.70
      ? CFG.STEP
      : clamp(median || CFG.STEP / CFG.DEFAULT_LINKS, CFG.MIN_FLOW, CFG.STEP);
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
    for (const adj of Object.values(ledger.adjustments || {})) {
      if (!adj || adj.active === false || String(adj.primaryId || "") !== primary || adj.primarySide !== primarySide) continue;
      const other = primarySide === "residential" ? String(adj.jobId) : String(adj.residenceId);
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

  function buildSpecialNetworkRegionalContext(dd, kind) {
    const out = [];
    const seenPairs = new Set();
    for (const pop of dd?.popsMap?.values?.() || []) {
      if (!pop || !(Number(pop.size) > 0)) continue;
      const residenceId = String(pop.residenceId || "");
      const jobId = String(pop.jobId || "");
      if (!residenceId || !jobId || specialPointKind(jobId) !== kind) continue;
      const pairKey = `${residenceId}|${jobId}`;
      if (seenPairs.has(pairKey)) continue;
      const residence = looseMapGet(dd?.points, residenceId);
      if (!residence || !(Number(residence.residents) > 0) || !Array.isArray(residence.location)) continue;
      seenPairs.add(pairKey);
      out.push({ id: residenceId, jobId, location: residence.location });
    }
    return out;
  }

  function existingLinkMultiplier(ctx, counterpartId) {
    return ctx?.existingCounterparts?.has(String(counterpartId)) ? CFG.EXISTING_LINK_MULTIPLIER : 1;
  }

  function specialRegionalKernel(kind, distance) {
    const university = kind === "university";
    const scale = university ? CFG.UNIVERSITY_REGION_SCALE_M : CFG.AIRPORT_REGION_SCALE_M;
    const exp = university ? CFG.UNIVERSITY_REGION_EXP : CFG.AIRPORT_REGION_EXP;
    return 1 / Math.pow(1 + Math.max(0, distance) / scale, exp);
  }

  function buildSpecialRegionalPotentialIndex(dd, kind) {
    const residential = [];
    let latSum = 0;
    for (const point of dd?.points?.values?.() || []) {
      const residents = Math.max(0, Number(point?.residents) || 0);
      if (!(residents > 0) || !Array.isArray(point?.location)) continue;
      const lon = Number(point.location[0]);
      const lat = Number(point.location[1]);
      if (!Number.isFinite(lon) || !Number.isFinite(lat)) continue;
      residential.push({ id: String(point.id), residents, lon, lat });
      latSum += lat;
    }
    const out = new Map();
    if (!residential.length) return out;

    const refLat = toRad(latSum / residential.length);
    const metersPerDegLat = 111320;
    const metersPerDegLon = Math.max(1000, 111320 * Math.cos(refLat));
    const cellSize = CFG.SPECIAL_REGION_GRID_CELL_M;
    const radius = kind === "university" ? CFG.UNIVERSITY_REGION_RADIUS_M : CFG.AIRPORT_REGION_RADIUS_M;
    const reach = Math.ceil(radius / cellSize);
    const gridMass = new Map();
    const gridKey = (x, y) => `${x}:${y}`;

    for (const point of residential) {
      point.x = point.lon * metersPerDegLon;
      point.y = point.lat * metersPerDegLat;
      point.gx = Math.floor(point.x / cellSize);
      point.gy = Math.floor(point.y / cellSize);
      const key = gridKey(point.gx, point.gy);
      gridMass.set(key, (gridMass.get(key) || 0) + point.residents);
    }

    for (const candidate of residential) {
      let regionalMass = 0;
      for (let dx = -reach; dx <= reach; dx++) for (let dy = -reach; dy <= reach; dy++) {
        const mass = gridMass.get(gridKey(candidate.gx + dx, candidate.gy + dy));
        if (!(mass > 0)) continue;
        let distance = 0;
        if (dx !== 0 || dy !== 0) {
          const cx = (candidate.gx + dx + 0.5) * cellSize;
          const cy = (candidate.gy + dy + 0.5) * cellSize;
          distance = Math.hypot(cx - candidate.x, cy - candidate.y);
          if (distance > radius) continue;
        }
        regionalMass += mass * specialRegionalKernel(kind, distance);
      }
      const massExp = kind === "airport" ? CFG.AIRPORT_REGIONAL_MASS_EXP : CFG.UNIVERSITY_REGIONAL_MASS_EXP;
      out.set(candidate.id, Math.pow(Math.max(1, regionalMass), massExp));
    }
    return out;
  }

  const specialRegionalPotentialCache = new Map();
  function specialRegionalPotentialForPlanning(dd, kind) {
    const key = `${demandRevision}|${kind || "normal"}`;
    const cached = specialRegionalPotentialCache.get(key);
    if (cached) return cached;
    const value = buildSpecialRegionalPotentialIndex(dd, kind);
    specialRegionalPotentialCache.set(key, value);
    return value;
  }

  function specialExistingFlowStats(dd, targetId, residenceId) {
    return connectionExistingFlowStats(dd, targetId, "work", residenceId);
  }

  function specialConnectionDamping(dd, targetId, residenceId, residents, useIndex = null) {
    const existingFlow = specialExistingFlowStats(dd, targetId, residenceId).totalSize;
    const units = existingFlow / Math.max(1, CFG.STEP);
    const flowDamp = 1 / Math.pow(1 + units / CFG.SPECIAL_FLOW_SATURATION_UNITS, CFG.SPECIAL_FLOW_SATURATION_EXP);
    const share = existingFlow / Math.max(CFG.SPECIAL_FLOW_SHARE_BASE_FLOOR, Number(residents) || 0);
    const shareDamp = 1 / (1 + CFG.SPECIAL_FLOW_SHARE_STRENGTH * share);
    const uses = useIndex?.get(String(residenceId)) || 0;
    const repeatDamp = 1 / (1 + CFG.SPECIAL_REPEAT_USE_STRENGTH * uses);
    return flowDamp * shareDamp * repeatDamp;
  }

  function specialMaxCatchmentDistance(kind) {
    return kind === "airport" ? CFG.AIRPORT_MAX_CATCHMENT_M : CFG.UNIVERSITY_MAX_CATCHMENT_M;
  }

  function specialCatchmentDistanceWeight(kind, distance) {
    const maxDistance = specialMaxCatchmentDistance(kind);
    if (Math.max(0, distance) > maxDistance) return 0;
    const airport = kind === "airport";
    const scale = airport ? CFG.AIRPORT_CATCHMENT_DISTANCE_SCALE_M : CFG.UNIVERSITY_CATCHMENT_DISTANCE_SCALE_M;
    const exp = airport ? CFG.AIRPORT_CATCHMENT_DISTANCE_EXP : CFG.UNIVERSITY_CATCHMENT_DISTANCE_EXP;
    return 1 / Math.pow(1 + Math.max(0, distance) / scale, exp);
  }

  function regularPatternProfile(dd, location, targetId, seed, context = null) {
    const workerCtx = createSecondaryContext(dd, location, "work", targetId, {
      isCreate: !!context?.isCreate,
      specialKind: null,
    });
    return buildSecondaryProfile(dd, location, "work", targetId, `${seed}:regular-pattern-size`, workerCtx);
  }

  function regularPatternConnectionCount(profile) {
    if (profile?.ok && Array.isArray(profile.flows) && profile.flows.length) return profile.flows.length;
    return 1;
  }

  function naturalActionFlowCap(profile) {
    if (!profile?.ok || !Array.isArray(profile.flows) || !profile.flows.length) return CFG.CONNECTION_MAX_SIZE;
    const maxFlow = Math.max(...profile.flows.map((flow) => Math.max(0, Number(flow?.size) || 0)));
    return clamp(Math.ceil(maxFlow || CFG.CONNECTION_MAX_SIZE), CFG.MIN_FLOW, CFG.CONNECTION_MAX_SIZE);
  }

  function regionalZoneDistanceWeight(distance) {
    return 1 / Math.pow(
      1 + Math.max(0, distance) / CFG.REGIONAL_ZONE_DISTANCE_SCALE_M,
      CFG.REGIONAL_ZONE_DISTANCE_EXP
    );
  }

  function regionalEndpointSpreadWeight(row, alreadySelected) {
    if (!alreadySelected?.length) return 1;
    let minDistance = Infinity;
    for (const picked of alreadySelected) {
      if (!Array.isArray(picked?.location) || !Array.isArray(row?.location)) continue;
      minDistance = Math.min(minDistance, haversine(row.location, picked.location));
    }
    if (!Number.isFinite(minDistance)) return 1;
    const scaled = Math.max(0, minDistance) / Math.max(1, CFG.REGIONAL_ENDPOINT_SPREAD_SCALE_M);
    const spread = 1 - Math.exp(-Math.pow(scaled, CFG.REGIONAL_ENDPOINT_SPREAD_EXP));
    return CFG.REGIONAL_ENDPOINT_SPREAD_FLOOR
      + (1 - CFG.REGIONAL_ENDPOINT_SPREAD_FLOOR) * clamp(spread, 0, 1);
  }

  function regionalRankScore(row) {
    return Math.max(1e-12, Number(row?.regionalRankScore ?? row?.rankScore) || 0);
  }

  function pickRegionalSpreadCandidate(candidates, alreadySelected, seed, pickIndex = 0) {
    if (!candidates.length) return null;
    const maxResidents = Math.max(1, ...candidates.map((row) => Math.max(1, Number(row.residents) || 0)));
    const maxRank = Math.max(1e-12, ...candidates.map((row) => regionalRankScore(row)));
    let best = null;
    let bestScore = -Infinity;
    for (const row of candidates) {
      const residentQuality = Math.sqrt(Math.max(1, Number(row.residents) || 0) / maxResidents);
      const rankQuality = Math.pow(regionalRankScore(row) / maxRank, 0.35);
      const quality = 0.62 * residentQuality + 0.38 * rankQuality;
      const spread = regionalEndpointSpreadWeight(row, alreadySelected);
      const jitter = 0.995 + 0.01 * deterministicUnit(`${seed}:airport-spread:${pickIndex}:${row.id}`);
      const score = quality * spread * jitter;
      if (score > bestScore + 1e-12
        || (Math.abs(score - bestScore) <= 1e-12 && String(row.id).localeCompare(String(best?.id ?? "")) < 0)) {
        best = row;
        bestScore = score;
      }
    }
    return best;
  }

  function regionalZoneCell(location, refLatRad) {
    const lon = Number(location?.[0]) || 0;
    const lat = Number(location?.[1]) || 0;
    const metersPerDegreeLat = Math.PI * EARTH_RADIUS_M / 180;
    const metersPerDegreeLon = metersPerDegreeLat * Math.max(0.20, Math.cos(refLatRad));
    const x = lon * metersPerDegreeLon;
    const y = lat * metersPerDegreeLat;
    const size = Math.max(1000, CFG.REGIONAL_ZONE_CELL_M);
    return [Math.floor(x / size), Math.floor(y / size)];
  }

  function regionalZoneKey(ix, iy) {
    return `${ix}:${iy}`;
  }

  function regionalZoneNeighborKeys(ix, iy) {
    const keys = [];
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dx === 0 && dy === 0) continue;
        keys.push(regionalZoneKey(ix + dx, iy + dy));
      }
    }
    return keys;
  }

  function selectRegionalZonePool(rows, limit, seed = "", spreadContext = [], existingRegionalContext = [], options = {}) {
    if (!rows.length || !(limit > 0)) return [];

    const distanceWeight = typeof options.distanceWeight === "function" ? options.distanceWeight : regionalZoneDistanceWeight;
    const refLatRad = toRad(rows.reduce((sum, row) => sum + (Number(row?.location?.[1]) || 0), 0) / rows.length);
    const zones = new Map();

    for (const row of rows) {
      const [ix, iy] = regionalZoneCell(row.location, refLatRad);
      const key = regionalZoneKey(ix, iy);
      let zone = zones.get(key);
      if (!zone) {
        zone = { key, ix, iy, rows: [], mass: 0, weightedDistanceSum: 0 };
        zones.set(key, zone);
      }
      const mass = Math.max(1, Number(row.counterpartMass ?? row.residents) || 0);
      zone.rows.push(row);
      zone.mass += mass;
      zone.weightedDistanceSum += mass * Math.max(0, Number(row.distance) || 0);
    }

    const existingZoneHits = new Map();
    for (const existing of existingRegionalContext || []) {
      if (!Array.isArray(existing?.location)) continue;
      const [ix, iy] = regionalZoneCell(existing.location, refLatRad);
      const key = regionalZoneKey(ix, iy);
      existingZoneHits.set(key, (existingZoneHits.get(key) || 0) + 1);
    }

    for (const zone of zones.values()) {
      let neighborMass = 0;
      for (const key of regionalZoneNeighborKeys(zone.ix, zone.iy)) {
        neighborMass += (zones.get(key)?.mass || 0) * CFG.REGIONAL_ZONE_NEIGHBOR_MASS_WEIGHT;
      }
      const neighborCap = zone.mass * CFG.REGIONAL_ZONE_NEIGHBOR_MASS_CAP_MULT;
      zone.localMass = Math.max(1, zone.mass + Math.min(neighborMass, neighborCap));
      zone.distance = zone.mass > 0
        ? zone.weightedDistanceSum / zone.mass
        : Math.min(...zone.rows.map((row) => Math.max(0, Number(row.distance) || 0)));
      zone.baseScore = Math.pow(zone.localMass, CFG.REGIONAL_ZONE_POPULATION_EXP)
        * distanceWeight(zone.distance);
      zone.selectedHits = 0;
      zone.rows.sort((a, b) =>
        ((a.existingFlowSize > 0) ? 1 : 0) - ((b.existingFlowSize > 0) ? 1 : 0)
        || (Number(b.counterpartMass ?? b.residents) || 0) - (Number(a.counterpartMass ?? a.residents) || 0)
        || regionalRankScore(b) - regionalRankScore(a)
        || a.distance - b.distance
        || String(a.id).localeCompare(String(b.id))
      );
    }

    const selected = [];
    const selectedIds = new Set();
    const spreadSelected = Array.isArray(spreadContext) ? [...spreadContext] : [];
    let spreadPickIndex = 0;
    const targetCount = Math.min(Math.max(1, Math.floor(limit)), rows.length);

    const hitCount = (zone) => (existingZoneHits.get(zone.key) || 0) + zone.selectedHits;
    const neighborHitCount = (zone) => regionalZoneNeighborKeys(zone.ix, zone.iy)
      .reduce((sum, key) => {
        const neighbor = zones.get(key);
        return sum + (existingZoneHits.get(key) || 0) + (neighbor?.selectedHits || 0);
      }, 0);

    while (selected.length < targetCount) {
      let bestZone = null;
      let bestZoneScore = -Infinity;

      for (const zone of zones.values()) {
        const hasCandidate = zone.rows.some((row) => !row.blocked && !selectedIds.has(String(row.id)));
        if (!hasCandidate) continue;
        const repeatDenom = 1
          + CFG.REGIONAL_ZONE_REPEAT_STRENGTH * hitCount(zone)
          + CFG.REGIONAL_ZONE_NEIGHBOR_REPEAT_STRENGTH * neighborHitCount(zone);
        const jitter = 0.998 + 0.004 * deterministicUnit(`${seed}:regional-zone:${selected.length}:${zone.key}`);
        const score = (zone.baseScore / Math.max(1, repeatDenom)) * jitter;
        if (score > bestZoneScore + 1e-12
          || (Math.abs(score - bestZoneScore) <= 1e-12 && String(zone.key).localeCompare(String(bestZone?.key ?? "")) < 0)) {
          bestZone = zone;
          bestZoneScore = score;
        }
      }

      if (!bestZone) break;
      const candidates = bestZone.rows.filter((row) => !row.blocked && !selectedIds.has(String(row.id)));
      const row = pickRegionalSpreadCandidate(candidates, spreadSelected, `${seed}:zone:${bestZone.key}`, spreadPickIndex++);
      if (!row) break;
      selected.push(row);
      spreadSelected.push(row);
      selectedIds.add(String(row.id));
      bestZone.selectedHits += 1;
    }

    return selected;
  }

  function buildWorkerPatternScoreMap(dd, location, targetId, seed, context = null) {
    const workerCtx = createSecondaryContext(dd, location, "work", targetId, {
      isCreate: !!context?.isCreate,
      specialKind: null,
    });
    for (const id of context?.actionExcludedCounterparts || []) workerCtx.actionExcludedCounterparts.add(String(id));

    const scores = new Map();
    for (let round = 0; round < CFG.SPECIAL_WORKER_PATTERN_ROUNDS; round++) {
      const profile = buildSecondaryProfile(dd, location, "work", targetId, `${seed}:worker-pattern:${round}`, workerCtx);
      if (!profile?.ok || !Array.isArray(profile.flows) || !profile.flows.length) break;
      let added = 0;
      for (const flow of profile.flows) {
        const id = String(flow.id);
        if (workerCtx.actionExcludedCounterparts.has(id)) continue;
        const score = Math.max(1e-12, Number(flow.score) || 0);
        scores.set(id, Math.max(scores.get(id) || 0, score));
        workerCtx.actionExcludedCounterparts.add(id);
        added += 1;
      }
      if (!added) break;
    }
    return scores;
  }

  function buildSpecialHybridCandidateRows(dd, location, targetId, kind, seed, context = null) {
    const potential = context?.specialRegionalPotential || specialRegionalPotentialForPlanning(dd, kind);
    const workerScores = kind === "airport" ? new Map() : buildWorkerPatternScoreMap(dd, location, targetId, seed, context);
    const useIndex = buildCounterpartUseIndex(targetId, "work");
    const raw = [];
    let maxWorker = 0;
    let maxPopulation = 0;

    for (const p of dd.points.values()) {
      if (String(p.id) === String(targetId)) continue;
      const residents = Math.max(0, Number(p.residents) || 0);
      if (!(residents > 0) || !Array.isArray(p.location)) continue;
      if (!counterpartWithinLandscape(p.location) || !roadAccessibleForPlanning(p.location)) continue;

      const existing = specialExistingFlowStats(dd, targetId, p.id);
      const capacity = Math.max(0, CFG.CONNECTION_MAX_SIZE - existing.totalSize);
      if (!(capacity > 0)) continue;

      const distance = haversine(location, p.location);
      if (distance > specialMaxCatchmentDistance(kind)) continue;
      const regionalWeight = potential.get(String(p.id)) ?? 1;
      const distanceWeight = specialCatchmentDistanceWeight(kind, distance);
      const saturation = specialConnectionDamping(dd, targetId, p.id, residents, useIndex);
      const growthDamp = ledgerGrowthDamping(p.id, "residents", dd);
      const existingLink = existing.totalSize > 0 ? CFG.EXISTING_LINK_MULTIPLIER : 1;
      const populationScore = Math.max(1e-12, regionalWeight * distanceWeight * saturation * growthDamp * existingLink);
      const workerScore = Math.max(0, Number(workerScores.get(String(p.id))) || 0);
      maxWorker = Math.max(maxWorker, workerScore);
      maxPopulation = Math.max(maxPopulation, populationScore);
      raw.push({
        id: p.id,
        location: p.location,
        distance,
        existingPopId: existing.popId,
        existingFlowSize: existing.totalSize,
        capacity,
        residents,
        counterpartMass: residents,
        workerScore,
        populationScore,
      });
    }

    return raw.map((row) => {
      const workerSignal = maxWorker > 0 ? row.workerScore / maxWorker : 0;
      const populationSignal = maxPopulation > 0 ? row.populationScore / maxPopulation : 0;
      const workerBaseScore = Math.pow(Math.max(0, workerSignal), 0.78);
      const regionalBaseScore = Math.pow(Math.max(0, populationSignal), 0.82);
      let score = kind === "university"
        ? 0.5 * workerBaseScore + 0.5 * regionalBaseScore
        : regionalBaseScore;

      if (kind === "university" && workerSignal <= 0) score *= 0.34;
      const rankJitter = 1 + CFG.SPECIAL_MATCH_SCORE_JITTER * (2 * deterministicUnit(`${seed}:special-hybrid:${kind}:${targetId}:${row.id}`) - 1);
      const workerRankJitter = 1 + CFG.SPECIAL_MATCH_SCORE_JITTER * (2 * deterministicUnit(`${seed}:university-work:${targetId}:${row.id}`) - 1);
      const regionalRankJitter = 1 + CFG.SPECIAL_MATCH_SCORE_JITTER * (2 * deterministicUnit(`${seed}:university-regional:${targetId}:${row.id}`) - 1);
      return {
        ...row,
        workerSignal,
        populationSignal,
        workerBaseScore: Math.max(1e-12, workerBaseScore),
        workerRankScore: Math.max(1e-12, workerBaseScore * workerRankJitter),
        regionalBaseScore: Math.max(1e-12, regionalBaseScore),
        regionalRankScore: Math.max(1e-12, regionalBaseScore * regionalRankJitter),
        baseScore: Math.max(1e-12, score),
        rankScore: Math.max(1e-12, score * rankJitter),
      };
    }).sort((a, b) => b.rankScore - a.rankScore || b.baseScore - a.baseScore || a.distance - b.distance || String(a.id).localeCompare(String(b.id)));
  }

  function selectUniversityHybridPool(rows, limit, seed, spreadExistingContext = [], existingRegionalContext = []) {
    if (!rows.length || !(limit > 0)) return [];
    const target = Math.min(rows.length, Math.max(1, Math.floor(limit)));
    const regionalTarget = Math.floor(target * CFG.UNIVERSITY_REGIONAL_SHARE);
    const workTarget = target - regionalTarget;

    const workSorted = [...rows]
      .filter((row) => Number(row.workerScore) > 0)
      .sort((a, b) => b.workerRankScore - a.workerRankScore
        || b.workerBaseScore - a.workerBaseScore
        || a.distance - b.distance
        || String(a.id).localeCompare(String(b.id)));

    const selected = workSorted.slice(0, Math.min(workTarget, workSorted.length));
    const selectedIds = new Set(selected.map((row) => String(row.id)));

    const regionalCandidates = rows.filter((row) => !selectedIds.has(String(row.id)));
    const regional = selectRegionalZonePool(regionalCandidates, regionalTarget, `${seed}:university-regional-half`, [...spreadExistingContext, ...selected], existingRegionalContext);
    for (const row of regional) {
      if (selectedIds.has(String(row.id))) continue;
      selected.push(row);
      selectedIds.add(String(row.id));
    }

    if (selected.length < target) {
      for (const row of workSorted) {
        if (selected.length >= target) break;
        if (selectedIds.has(String(row.id))) continue;
        selected.push(row);
        selectedIds.add(String(row.id));
      }
    }
    if (selected.length < target) {
      const remaining = rows.filter((row) => !selectedIds.has(String(row.id)));
      const extraRegional = selectRegionalZonePool(remaining, target - selected.length, `${seed}:university-regional-fill`, [...spreadExistingContext, ...selected], existingRegionalContext);
      for (const row of extraRegional) {
        if (selected.length >= target) break;
        if (selectedIds.has(String(row.id))) continue;
        selected.push(row);
        selectedIds.add(String(row.id));
      }
    }
    return selected;
  }

  function selectSpecialHybridRows(rows, kind, amount, seed, desiredConnectionCount = null, spreadExistingContext = [], existingRegionalContext = []) {
    if (!rows.length || !(amount > 0)) return [];
    const minimumNeeded = Math.max(1, Math.ceil(amount / CFG.CONNECTION_MAX_SIZE));
    const candidateRows = rows;
    const localPatternCount = Number.isFinite(desiredConnectionCount) && desiredConnectionCount > 0
      ? Math.floor(desiredConnectionCount)
      : 1;
    const buildSteps = Math.max(1, Math.floor(amount / CFG.STEP));
    const maxByMinimumFlow = Math.max(1, Math.floor(amount / CFG.MIN_FLOW));
    const desired = Math.min(
      candidateRows.length,
      maxByMinimumFlow,
      Math.max(minimumNeeded, localPatternCount * buildSteps)
    );
    let selected = kind === "airport"
      ? selectRegionalZonePool(candidateRows, desired, seed, spreadExistingContext, existingRegionalContext)
      : selectUniversityHybridPool(candidateRows, desired, seed, spreadExistingContext, existingRegionalContext);

    const selectedIds = new Set(selected.map((row) => String(row.id)));
    let capacity = selected.reduce((sum, row) => sum + row.capacity, 0);
    if (capacity < amount) {
      if (kind === "airport") {
        let fillRound = 0;
        while (capacity < amount) {
          const remaining = rows.filter((row) => !selectedIds.has(String(row.id)));
          if (!remaining.length) break;
          const extra = selectRegionalZonePool(remaining, Math.min(remaining.length, Math.max(1, minimumNeeded)), `${seed}:capacity-fill:${fillRound++}`, [...spreadExistingContext, ...selected], existingRegionalContext);
          if (!extra.length) break;
          let added = 0;
          for (const row of extra) {
            const id = String(row.id);
            if (selectedIds.has(id)) continue;
            selected.push(row);
            selectedIds.add(id);
            capacity += row.capacity;
            added += 1;
            if (capacity >= amount) break;
          }
          if (!added) break;
        }
      } else {
        for (const row of rows) {
          if (capacity >= amount) break;
          if (selectedIds.has(String(row.id))) continue;
          selected.push(row);
          selectedIds.add(String(row.id));
          capacity += row.capacity;
        }
      }
    }
    return capacity >= amount ? selected : [];
  }

  function counterpartMassFactors(rows, getMass) {
    const masses = rows.map((row) => Math.max(1, Number(getMass(row)) || 0));
    const maxMass = Math.max(1, ...masses);
    return masses.map((mass) => Math.pow(mass / maxMass, CFG.COUNTERPART_SIZE_MASS_EXP));
  }

  function allocateSpecialHybridFlows(rows, amount) {
    if (!rows.length || !(amount > 0)) return [];
    let selected = [...rows];
    while (selected.length > 1) {
      const minimumTotal = selected.reduce((sum, row) => sum + Math.min(CFG.MIN_FLOW, row.capacity), 0);
      if (minimumTotal <= amount) break;
      selected.pop();
    }
    if (selected.reduce((sum, row) => sum + row.capacity, 0) < amount) return [];

    const minimums = selected.map((row) => Math.min(CFG.MIN_FLOW, row.capacity));
    const minimumTotal = minimums.reduce((a, b) => a + b, 0);
    const extraCaps = selected.map((row, i) => Math.max(0, row.capacity - minimums[i]));
    const massFactors = counterpartMassFactors(selected, (row) => row.counterpartMass ?? row.residents);
    const weights = selected.map((row, i) => {
      const base = Math.sqrt(Math.max(1e-9, row.baseScore));
      return Math.max(1e-9, base * massFactors[i]);
    });
    const extras = allocateInteger(weights, Math.max(0, amount - minimumTotal), extraCaps);
    return selected.map((row, i) => ({
      id: row.id,
      size: minimums[i] + extras[i],
      score: weights[i],
      existingPopId: row.existingPopId,
    })).filter((flow) => flow.size > 0);
  }

  function buildSpecialActionProfile(dd, location, targetId, kind, amount, seed, context = null) {
    const totalAmount = Math.max(0, Math.floor(Number(amount) || 0));
    if (!(totalAmount > 0) || totalAmount % CFG.STEP !== 0) return { ok: false, reason: "invalid-special-amount", flows: [] };

    const regularPattern = regularPatternProfile(dd, location, targetId, seed, context);
    const localPatternCount = regularPatternConnectionCount(regularPattern);
    const perConnectionAddCap = naturalActionFlowCap(regularPattern);
    const rows = buildSpecialHybridCandidateRows(dd, location, targetId, kind, seed, context)
      .map((row) => ({ ...row, capacity: Math.min(row.capacity, perConnectionAddCap) }))
      .filter((row) => row.capacity > 0);

    const maxCatchmentDistance = specialMaxCatchmentDistance(kind);
    const spreadExistingContext = [...buildExistingCounterpartSet(dd, targetId, "work")]
      .map((id) => looseMapGet(dd.points, id))
      .filter((point) => point && Array.isArray(point.location) && Number(point.residents) > 0)
      .filter((point) => haversine(location, point.location) <= maxCatchmentDistance)
      .map((point) => ({ id: point.id, location: point.location }));
    const existingRegionalContext = buildSpecialNetworkRegionalContext(dd, kind)
      .filter((row) => Array.isArray(row.location) && haversine(location, row.location) <= maxCatchmentDistance);
    const selected = selectSpecialHybridRows(rows, kind, totalAmount, seed, localPatternCount, spreadExistingContext, existingRegionalContext);
    if (!selected.length) return { ok: false, reason: "not-enough-special-capacity", flows: [] };
    const flows = allocateSpecialHybridFlows(selected, totalAmount);
    if (flows.reduce((sum, flow) => sum + flow.size, 0) !== totalAmount) {
      return { ok: false, reason: "special-allocation-failed", flows: [] };
    }

    const ids = new Set();
    for (const flow of flows) {
      const id = String(flow.id);
      if (ids.has(id)) return { ok: false, reason: "duplicate-special-counterpart", flows: [] };
      ids.add(id);
      const stats = specialExistingFlowStats(dd, targetId, flow.id);
      if (stats.totalSize + flow.size > CFG.CONNECTION_MAX_SIZE) {
        return { ok: false, reason: "special-connection-over-200", flows: [] };
      }
    }
    return {
      ok: flows.length > 0 && flows.reduce((sum, flow) => sum + flow.size, 0) === totalAmount,
      flows,
    };
  }

  function createSecondaryContext(dd, location, primarySide, targetId, options = {}) {
    const specialKind = options.specialKind || null;
    if (specialKind && primarySide === "work") {
      return {
        actionExcludedCounterparts: new Set(),
        isCreate: !!options.isCreate,
        specialKind,
        specialRegionalPotential: specialRegionalPotentialForPlanning(dd, specialKind),
      };
    }

    const donorDescriptors = collectSameSideDonorDescriptors(dd, location, primarySide);
    const donorProfiles = new Map();
    for (const d of donorDescriptors) {
      if (String(d.id) !== String(targetId)) donorProfiles.set(d.id, donorProfile(dd, d.id, primarySide));
    }
    const oppositeSideName = primarySide === "residential" ? "jobs" : "residents";
    const fallback = [];
    for (const p of dd.points.values()) {
      if (String(p.id) === String(targetId)) continue;
      const mass = oppositeSideName === "jobs" ? p.jobs : p.residents;
      if (!(mass > 0)) continue;
      if (!counterpartWithinLandscape(p.location) || !roadAccessibleForPlanning(p.location)) continue;
      const distance = haversine(location, p.location);
      fallback.push({ id: p.id, distWeight: 1 / Math.pow(1 + distance / CFG.FALLBACK_DISTANCE_SCALE_M, 1.25) });
    }
    return {
      donorDescriptors,
      donorProfiles,
      fallback,
      useIndex: buildCounterpartUseIndex(targetId, primarySide),
      actionExcludedCounterparts: new Set(),
      existingCounterparts: buildExistingCounterpartSet(dd, targetId, primarySide),
      isCreate: !!options.isCreate,
    };
  }

  function commuterPairKey(residenceId, jobId) {
    return `${String(residenceId)}\u0000${String(jobId)}`;
  }

  function activeCommuterPairCounts(dd) {
    const counts = new Map();
    for (const pop of dd?.popsMap?.values?.() || []) {
      if (!pop || !(Number(pop.size) > 0)) continue;
      const key = commuterPairKey(pop.residenceId, pop.jobId);
      counts.set(key, (counts.get(key) || 0) + 1);
    }
    return counts;
  }

  function connectionExistingFlowStats(dd, targetId, primarySide, counterpartId) {
    const target = looseMapGet(dd?.points, targetId);
    if (!target) return { totalSize: 0, popId: null };
    let totalSize = 0;
    let bestPopId = null;
    let bestSize = 0;
    for (const popId of target.popIds || []) {
      const pop = looseMapGet(dd?.popsMap, popId);
      if (!pop || !(Number(pop.size) > 0)) continue;
      const matches = primarySide === "residential"
        ? String(pop.residenceId) === String(targetId) && String(pop.jobId) === String(counterpartId)
        : String(pop.jobId) === String(targetId) && String(pop.residenceId) === String(counterpartId);
      if (!matches) continue;
      const size = Number(pop.size) || 0;
      totalSize += size;
      if (size > bestSize) {
        bestSize = size;
        bestPopId = pop.id ?? popId;
      }
    }
    return { totalSize, popId: bestPopId };
  }

  function buildRegularActionProfile(dd, location, primarySide, targetId, amount, seed, ctx) {
    if (!(amount > 0) || amount % CFG.STEP !== 0) return { ok: false, reason: "invalid-amount", flows: [] };
    const excluded = ctx.actionExcludedCounterparts || (ctx.actionExcludedCounterparts = new Set());
    const selected = new Map();
    let totalCapacity = 0;
    const buildSteps = Math.max(1, Math.floor(amount / CFG.STEP));
    const minimumNeeded = Math.max(1, Math.ceil(amount / CFG.CONNECTION_MAX_SIZE));
    const maxByMinimumFlow = Math.max(1, Math.floor(amount / CFG.MIN_FLOW));
    let desiredConnections = minimumNeeded;
    let patternCountResolved = false;
    let perConnectionAddCap = CFG.CONNECTION_MAX_SIZE;
    const rounds = Math.min(64, Math.max(8, buildSteps * 8));

    for (let round = 0; round < rounds && (selected.size < desiredConnections || totalCapacity < amount); round++) {
      const profile = buildSecondaryProfile(dd, location, primarySide, targetId, `${seed}:regular-action:${round}`, ctx);
      if (!profile.ok) break;
      if (!patternCountResolved) {
        const localPatternCount = Math.max(1, profile.flows.length);
        desiredConnections = Math.min(
          maxByMinimumFlow,
          Math.max(minimumNeeded, localPatternCount * buildSteps)
        );
        perConnectionAddCap = naturalActionFlowCap(profile);
        patternCountResolved = true;
      }
      let sawCandidate = false;
      for (const flow of profile.flows) {
        const id = String(flow.id);
        if (excluded.has(id)) continue;
        excluded.add(id);
        sawCandidate = true;
        const stats = connectionExistingFlowStats(dd, targetId, primarySide, id);
        const capacity = Math.min(
          Math.max(0, CFG.CONNECTION_MAX_SIZE - stats.totalSize),
          perConnectionAddCap
        );
        if (!(capacity > 0)) continue;
        const counterpart = looseMapGet(dd.points, id);
        const counterpartMass = primarySide === "residential"
          ? Math.max(0, Number(counterpart?.jobs) || 0)
          : Math.max(0, Number(counterpart?.residents) || 0);
        const row = {
          id,
          score: Math.max(1e-9, Number(flow.score) || 1),
          existingPopId: stats.popId,
          existingFlowSize: stats.totalSize,
          capacity,
          counterpartMass,
        };
        selected.set(id, row);
        totalCapacity += capacity;
        if (selected.size >= desiredConnections && totalCapacity >= amount) break;
      }
      if (!sawCandidate) break;
    }

    if (totalCapacity < amount || !selected.size) {
      return { ok: false, reason: "not-enough-connection-capacity", flows: [] };
    }

    const localRows = [...selected.values()].sort((a, b) => b.score - a.score || String(a.id).localeCompare(String(b.id)));
    let rows = localRows.slice(0, desiredConnections);
    let chosenCapacity = rows.reduce((sum, row) => sum + row.capacity, 0);
    if (chosenCapacity < amount) {
      const rowIds = new Set(rows.map((row) => String(row.id)));
      for (const row of localRows) {
        if (chosenCapacity >= amount) break;
        const id = String(row.id);
        if (rowIds.has(id)) continue;
        rows.push(row);
        rowIds.add(id);
        chosenCapacity += row.capacity;
      }
    }

    while (rows.length > 1 && CFG.MIN_FLOW * rows.length > amount) rows.pop();
    if (rows.reduce((sum, row) => sum + row.capacity, 0) < amount) {
      return { ok: false, reason: "not-enough-connection-capacity", flows: [] };
    }

    const minimums = rows.map((row) => Math.min(CFG.MIN_FLOW, row.capacity));
    let minimumTotal = minimums.reduce((a, b) => a + b, 0);
    while (rows.length > 1 && minimumTotal > amount) {
      rows.pop();
      minimums.pop();
      minimumTotal = minimums.reduce((a, b) => a + b, 0);
    }
    if (rows.reduce((sum, row) => sum + row.capacity, 0) < amount) {
      return { ok: false, reason: "not-enough-connection-capacity", flows: [] };
    }

    const remaining = amount - minimumTotal;
    const extraCaps = rows.map((row, i) => Math.max(0, row.capacity - minimums[i]));
    const massFactors = counterpartMassFactors(rows, (row) => row.counterpartMass);
    const weights = rows.map((row, i) => Math.max(
      1e-9,
      Math.sqrt(Math.max(1e-9, row.score)) * massFactors[i]
    ));
    const extras = allocateInteger(weights, remaining, extraCaps);
    const flows = rows.map((row, i) => ({
      id: row.id,
      size: minimums[i] + extras[i],
      score: row.score,
      existingPopId: row.existingPopId,
    })).filter((flow) => flow.size > 0);

    const total = flows.reduce((sum, flow) => sum + flow.size, 0);
    if (total !== amount || flows.some((flow) => flow.size > CFG.CONNECTION_MAX_SIZE)) {
      return { ok: false, reason: "allocation-failed", flows: [] };
    }
    return {
      ok: true,
      flows,
    };
  }

  // When a small map runs out of distinct commuter partners, create more
  // independent pops rather than increasing any existing pop beyond 200.
  function buildParallelCapacityProfile(dd, location, primarySide, targetId, amount, context) {
    const specialKind = context?.specialKind && primarySide === "work" ? context.specialKind : null;
    const oppositeField = primarySide === "residential" ? "jobs" : "residents";
    const candidates = [];
    for (const point of dd.points.values()) {
      if (String(point.id) === String(targetId) || !Array.isArray(point.location)) continue;
      const mass = Math.max(0, Number(point[oppositeField]) || 0);
      if (!(mass > 0) || !counterpartWithinLandscape(point.location)) continue;
      const distance = haversine(location, point.location);
      if (specialKind && distance > specialMaxCatchmentDistance(specialKind)) continue;
      const roadConnected = roadAccessibleForPlanning(point.location);
      const distanceScore = specialKind
        ? specialCatchmentDistanceWeight(specialKind, distance)
        : 1 / Math.pow(1 + distance / CFG.FALLBACK_DISTANCE_SCALE_M, 1.25);
      const repeat = repetitionMultiplierFromIndex(context?.useIndex, point.id);
      const massScore = Math.sqrt(mass);
      candidates.push({
        id: point.id,
        roadConnected,
        score: Math.max(1e-9, massScore * distanceScore * repeat),
      });
    }
    if (!candidates.length) return { ok: false, reason: "not-enough-counterpoints", flows: [] };
    const connected = candidates.filter((row) => row.roadConnected);
    const eligible = connected.length ? connected : candidates;
    eligible.sort((a, b) => b.score - a.score || String(a.id).localeCompare(String(b.id)));

    const desired = Math.min(eligible.length, Math.max(1, Math.ceil(amount / CFG.CONNECTION_MAX_SIZE)));
    const selected = eligible.slice(0, desired);
    const totals = allocateInteger(
      selected.map((row) => row.score),
      amount,
      selected.map(() => amount)
    );
    const flows = [];
    for (let i = 0; i < selected.length; i++) {
      const total = totals[i];
      if (!(total > 0)) continue;
      const count = Math.ceil(total / CFG.CONNECTION_MAX_SIZE);
      const base = Math.floor(total / count);
      let remainder = total % count;
      for (let j = 0; j < count; j++) {
        flows.push({
          id: selected[i].id,
          size: base + (remainder-- > 0 ? 1 : 0),
          score: selected[i].score,
          forceNew: true,
        });
      }
    }
    return {
      ok: flows.length > 0 && flows.reduce((sum, flow) => sum + flow.size, 0) === amount &&
        flows.every((flow) => flow.size > 0 && flow.size <= CFG.CONNECTION_MAX_SIZE),
      parallelFallback: true,
      flows,
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
        if (ctx.actionExcludedCounterparts?.has(String(flow.id))) continue;
        const oppositePoint = dd.points.get(flow.id);
        if (!oppositePoint || !counterpartWithinLandscape(oppositePoint.location) ||
            !roadAccessibleForPlanning(oppositePoint.location)) continue;
        const oppositeSide = primarySide === "residential" ? "jobs" : "residents";
        const existingOppositeMass = oppositeSide === "jobs" ? (oppositePoint.jobs || 0) : (oppositePoint.residents || 0);
        if (!(existingOppositeMass > 0)) continue;
        const damp = ledgerGrowthDamping(flow.id, oppositeSide, dd);
        const repeat = repetitionMultiplierFromIndex(ctx.useIndex, flow.id);
        const existingLink = existingLinkMultiplier(ctx, flow.id);
        const jitter = 1 + CFG.SCORE_RANDOMNESS * (2 * deterministicUnit(`${variationSeed}:${targetId}:${flow.id}`) - 1);
        const score = d.weight * flow.share * damp * repeat * existingLink * jitter;
        candidateScore.set(flow.id, (candidateScore.get(flow.id) || 0) + score);
        if (!seen.has(flow.id)) {
          candidateCoverage.set(flow.id, (candidateCoverage.get(flow.id) || 0) + d.weight);
          seen.add(flow.id);
        }
      }
    }

    let desiredLinks = profileWeightSum > 0 ? Math.round(linkCountWeighted / profileWeightSum) : CFG.DEFAULT_LINKS;
    const naturalMaxLinks = Math.max(CFG.MIN_LINKS, Math.floor(CFG.STEP / Math.max(1, CFG.MIN_FLOW)));
    desiredLinks = clamp(desiredLinks, CFG.MIN_LINKS, naturalMaxLinks);
    if (ctx.isCreate) desiredLinks = Math.min(naturalMaxLinks, Math.max(desiredLinks, CFG.NEW_POINT_MIN_LINKS));
    const localMaxShare = profileWeightSum > 0 ? maxShareWeighted / profileWeightSum : 0.20;
    const typicalPopSize = localPopSizeProfile(dd, ctx, primarySide, targetId);

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
      if (ctx.actionExcludedCounterparts?.has(String(f.id))) continue;
      if (existing.has(f.id)) continue;
      const p = dd.points.get(f.id);
      if (!p) continue;
      const mass = oppositeSideName === "jobs" ? p.jobs : p.residents;
      if (!(mass > 0)) continue;
      const damp = ledgerGrowthDamping(f.id, oppositeSideName, dd);
      const repeat = repetitionMultiplierFromIndex(ctx.useIndex, f.id);
      const existingLink = existingLinkMultiplier(ctx, f.id);
      const jitter = 1 + CFG.SCORE_RANDOMNESS * (2 * deterministicUnit(`${variationSeed}:fallback:${targetId}:${f.id}`) - 1);
      fallback.push({ id: f.id, score: CFG.FALLBACK_SCORE_SCALE * Math.sqrt(mass) * f.distWeight * damp * repeat * existingLink * jitter });
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
      return { ok: false, reason: "not-enough-counterpoints" };
    }

    const targetFlowCount = clamp(
      Math.round(CFG.STEP / Math.max(CFG.MIN_FLOW, typicalPopSize)),
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
        };
      }
      if (selected.length === minimumFlows) break;
      selected = selected.slice(0, -1);
    }

    return { ok: false, reason: "allocation-failed" };
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
      const amount = Math.max(0, Number(action.amount) || 0);
      total += action.kind === "demolish" ? -amount : amount;
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
    const scaled = ((Number(addedDemand) || 0) / baseDemand) * 1000;
    const rounded = scaled >= 0 ? Math.ceil(scaled - 1e-9) : Math.floor(scaled + 1e-9);
    return rounded / 10;
  }

  function mapGrowthPriceMultiplier(addedDemand, baseDemand) {
    const growthPercent = mapGrowthPercent(addedDemand, baseDemand);
    return Math.max(CFG.MIN_MAP_GROWTH_PRICE_MULTIPLIER, 1 + CFG.MAP_GROWTH_PRICE_STRENGTH * (growthPercent / 100));
  }

  function quoteDevelopmentPrice(dd, location, amount, isCreate = false, priceMultiplier = 1, followupMultiplier = null) {
    if (!dd || !Array.isArray(location) || !DEVELOPMENT_AMOUNTS.includes(amount)) {
      return { ok: false, totalCost: Infinity };
    }
    const firstMultiplier = Math.max(1, Number(priceMultiplier) || 1);
    const laterMultiplier = isCreate && followupMultiplier != null
      ? Math.max(1, Number(followupMultiplier) || 1)
      : firstMultiplier;
    const profile = locationMassProfile(dd, location);
    const baseDemand = originalMapDemand(dd);
    let addedDemand = activeAddedDemand();
    let totalCost = 0;
    const cumulative = {};
    const steps = amount / CFG.STEP;
    for (let step = 0; step < steps; step++) {
      const growth = mapGrowthPriceMultiplier(addedDemand, baseDemand);
      const multiplier = step === 0 ? firstMultiplier : laterMultiplier;
      totalCost += roundDevelopmentCost(effectiveStepCost(profile) * growth * multiplier);
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

  function quoteDemolitionPrice(dd, location, actualAmount, side, pointId = null) {
    const actual = Math.max(0, Math.floor(Number(actualAmount) || 0));
    if (!dd || !Array.isArray(location) || !(actual > 0)) return { ok: false, totalCost: Infinity, pricedAmount: 0 };

    const profile = locationMassProfile(dd, location);
    const baseDemand = originalMapDemand(dd);
    let netDemand = activeAddedDemand();
    const point = looseMapGet(dd.points, pointId);
    let pointMass = point
      ? Math.max(0, Number(point.residents) || 0) + Math.max(0, Number(point.jobs) || 0)
      : null;
    let blockCost = 0;
    let roundedTotal = 0;
    const cumulative = {};
    for (let removed = 1; removed <= actual; removed++) {
      const growth = mapGrowthPriceMultiplier(netDemand, baseDemand);
      blockCost += effectiveStepCost(profile) * growth * CFG.DEMOLITION_PRICE_MULTIPLIER / CFG.STEP;

      profile.local = Math.max(0, profile.local - 1);
      profile.ultra1250Mass = Math.max(0, profile.ultra1250Mass - 1);
      profile.cityMass = Math.max(0, profile.cityMass - 1);
      if (pointMass !== null) {
        const nextMass = Math.max(0, pointMass - 1);
        if (pointMass >= CFG.LOCAL_COUNT_MIN_MASS && nextMass < CFG.LOCAL_COUNT_MIN_MASS) {
          profile.localCount = Math.max(0, profile.localCount - 1);
        }
        if (pointMass >= CFG.CITY_COUNT_MIN_MASS && nextMass < CFG.CITY_COUNT_MIN_MASS) {
          profile.cityCount = Math.max(0, profile.cityCount - 1);
        }
        pointMass = nextMass;
      }
      netDemand--;
      if (removed % CFG.STEP === 0) {
        roundedTotal += roundDevelopmentCost(blockCost);
        blockCost = 0;
        cumulative[removed] = roundedTotal;
      } else if (removed === actual) {
        const partialCharge = Math.max(CFG.COST_ROUNDING, roundDevelopmentCost(blockCost));
        cumulative[removed] = roundedTotal + partialCharge;
      }
    }
    return { ok: true, totalCost: cumulative[actual], pricedAmount: actual, cumulative, profile };
  }

  const locationProfiles = new Map();
  const locationLabelSeen = new Set();
  const locationLabels = { city: [], district: [], street: [] };
  const locationGrids = { city: new Map(), district: new Map(), street: new Map() };
  const LOCATION_GRID_DEG = 0.02;
  const locationZoomThresholds = { district: 11, street: 14.5 };
  const locationStreetCache = new Map();
  let locationLabelRevision = 0;
  let locationIndexMap = null;
  let locationIndexTimer = null;
  let locationIndexPending = false;
  let locationQueryDescriptorMap = null;
  let locationQueryDescriptorsCache = null;

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
    const grid = locationGrids[kind];
    if (grid) {
      const cell = gridCell(rec.coords);
      const bucket = grid.get(cell) || [];
      bucket.push(rec);
      grid.set(cell, bucket);
    }
    locationLabelRevision += 1;
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
    const pool = nearbyGridLabels(kind, location, maxMeters);
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
    const cached = locationProfiles.get(key);
    if (cached?._revision === locationLabelRevision) return cached;
    const profile = cached || { city: null, district: null, street: null };
    for (const kind of ["city", "district", "street"]) {
      const candidate = nearestLocationLabel(kind, location);
      if (candidate && (!profile[kind] || candidate.meters < profile[kind].meters)) profile[kind] = candidate;
    }
    profile._revision = locationLabelRevision;
    locationProfiles.set(key, profile);
    return profile;
  }

  function locationQueryDescriptors(map) {
    if (locationQueryDescriptorMap === map && locationQueryDescriptorsCache) return locationQueryDescriptorsCache;
    const queries = new Map();
    try {
      const style = map?.getStyle?.() || {};
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
    } catch {}
    locationQueryDescriptorMap = map;
    locationQueryDescriptorsCache = [...queries.values()];
    return locationQueryDescriptorsCache;
  }

  function collectLoadedLocationLabels(map = api.utils.getMap?.()) {
    if (!map) return false;
    let added = false;
    try {
      const queries = locationQueryDescriptors(map);
      if (map.querySourceFeatures) {
        for (const { sourceId, sourceLayer, kind } of queries) {
          let fs = [];
          try { fs = map.querySourceFeatures(sourceId, { sourceLayer }) || []; } catch { continue; }
          for (const f of fs) {
            const props = f?.properties || {};
            const name = typeof props.name === "string" ? props.name.trim() : "";
            const coords = featureRepresentativeCoordinates(f);
            if (name && coords) added = addLocationLabel(kind, name, coords) || added;
          }
        }
      } else if (map.queryRenderedFeatures) {
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

  function refreshLocationIndex() {
    return collectLoadedLocationLabels();
  }

  function scheduleLocationIndexRefresh(delay = 350) {
    const wait = Number.isFinite(delay) ? Math.max(0, delay) : 350;
    if (!uiStore.get().panelOpen) {
      locationIndexPending = true;
      if (locationIndexTimer) clearTimeout(locationIndexTimer);
      locationIndexTimer = null;
      return;
    }
    locationIndexPending = false;
    if (locationIndexTimer) clearTimeout(locationIndexTimer);
    locationIndexTimer = setTimeout(() => {
      locationIndexTimer = null;
      const added = refreshLocationIndex();
      if (added && uiStore.get().panelOpen) refreshUi();
    }, wait);
  }

  function scheduleGeneralTileLocationRefresh(event) {
    if (event?.sourceId && event.sourceId !== "general-tiles") return;
    scheduleLocationIndexRefresh(650);
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
    scheduleLocationIndexRefresh(500);
  }

  function clearLocationIndexData() {
    locationProfiles.clear();
    locationStreetCache.clear();
    locationLabelSeen.clear();
    locationLabelRevision = 0;
    for (const kind of Object.keys(locationLabels)) locationLabels[kind].length = 0;
    for (const grid of Object.values(locationGrids)) grid.clear();
    locationQueryDescriptorMap = null;
    locationQueryDescriptorsCache = null;
    locationIndexPending = false;
    locationZoomThresholds.district = 11;
    locationZoomThresholds.street = 14.5;
  }

  function nearestStreetFromGameState(location, radiusMeters = 900) {
    if (!Array.isArray(location)) return null;
    const key = `${locationKey(location)}|${radiusMeters}`;
    if (locationStreetCache.has(key)) return locationStreetCache.get(key);
    let value = null;
    try {
      const streets = api.gameState.getStreetsAt?.(location, radiusMeters);
      if (Array.isArray(streets)) {
        let best = null;
        for (const rec of streets) {
          const props = rec?.properties || rec || {};
          const name = String(props?.name || "").trim();
          if (!name) continue;
          const meters = Number(props?.distanceMeters ?? rec?.distanceMeters);
          if (!Number.isFinite(meters) || meters > radiusMeters) continue;
          if (!best || meters < best.meters) best = { name, meters };
        }
        value = best?.name || null;
      }
    } catch (_) {}
    locationStreetCache.set(key, value);
    if (locationStreetCache.size > 512) locationStreetCache.delete(locationStreetCache.keys().next().value);
    return value;
  }

  function locationDisplayProfile(location) {
    if (!Array.isArray(location)) return { city: null, district: null, street: null };
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

  function specialPointKind(pointId) {
    const id = String(pointId || "");
    if (id.startsWith("AIR_")) return "airport";
    if (id.startsWith("UNI_")) return "university";
    return null;
  }

  function isDemandDeveloperPointId(pointId) {
    const id = String(pointId || "");
    return id.startsWith(CFG.NEW_POINT_PREFIX) || id.startsWith("AIR_DD_") || id.startsWith("UNI_DD_") || !!ledger.points?.[id]?.created;
  }

  function specialCreatePriceSurcharge(kind) {
    if (kind === "airport") return CFG.AIRPORT_PRICE_SURCHARGE;
    if (kind === "university") return CFG.UNIVERSITY_PRICE_SURCHARGE;
    return 0;
  }

  function specialExpansionPriceMultiplier(kind) {
    if (kind === "airport") return 2;
    if (kind === "university") return 1.5;
    return 1;
  }

  function existingPointType(point) {
    const workers = Math.max(0, Number(point?.jobs || 0));
    const special = workers > 0 ? specialPointKind(point?.id) : null;
    if (special) return special;
    const residents = Math.max(0, Number(point?.residents || 0));
    if (workers > 0 && residents <= 0) return "work";
    if (residents > 0 && workers <= 0) return "residential";
    return residents >= workers ? "residential" : "work";
  }

  function existingTypeSide(type) {
    return type === "residential" ? "residential" : "work";
  }

  function existingTypeLabel(type) {
    if (type === "university") return "University";
    if (type === "airport") return "Airport";
    if (type === "work") return "Workers";
    return "Residents";
  }

  function pointMatchesExistingType(point, type) {
    const residents = Math.max(0, Number(point?.residents || 0));
    const workers = Math.max(0, Number(point?.jobs || 0));
    const special = specialPointKind(point?.id);
    if (type === "residential") return residents > 0;
    if (type === "university") return workers > 0 && special === "university";
    if (type === "airport") return workers > 0 && special === "airport";
    if (type === "work") return workers > 0 && !special;
    return false;
  }

  function cleanAirportDisplayBase(value) {
    let name = String(value || "").trim().replace(/\s+/g, " ");
    if (!name) return null;
    name = name
      .replace(/^(?:airport|aerodrome|letiště|aéroport|aeropuerto|aeroporto)\s+/i, "")
      .replace(/\s+(?:(?:international|regional|municipal)\s+)?(?:airport|aerodrome)$/i, "")
      .replace(/\s+(?:letiště|aéroport|aeropuerto|aeroporto)$/i, "")
      .replace(/^[\s._:-]+|[\s._:-]+$/g, "")
      .trim();
    return name || null;
  }

  function nearestMappedAirportName(location, maxDistanceM = 3000) {
    const map = api.utils.getMap?.();
    if (!map || !Array.isArray(location)) return null;
    let layers = [];
    try { layers = map.getStyle?.()?.layers || []; } catch { return null; }
    const seen = new Set();
    let best = null;
    const consider = (feature) => {
      const props = feature?.properties || {};
      const raw = props.name || props.name_en || props["name:en"] || null;
      const name = cleanAirportDisplayBase(raw);
      if (!name) return;
      const d = geometryDistanceFromLocation(location, feature?.geometry);
      if (!Number.isFinite(d) || d > maxDistanceM) return;
      if (!best || d < best.distance) best = { name, distance: d };
    };

    if (map.querySourceFeatures) {
      for (const layer of layers) {
        if (placementLayerRole(layer?.id, layer?.["source-layer"], layer?.filter) !== "airport" || !layer?.source) continue;
        const sourceLayer = layer["source-layer"] || "";
        const filterKey = layer.filter ? JSON.stringify(layer.filter) : "";
        const key = `${layer.source}|${sourceLayer}|${filterKey}`;
        if (seen.has(key)) continue;
        seen.add(key);
        const options = {};
        if (sourceLayer) options.sourceLayer = sourceLayer;
        if (layer.filter) options.filter = layer.filter;
        let features = [];
        try { features = map.querySourceFeatures(layer.source, options) || []; } catch { continue; }
        for (const feature of features) consider(feature);
      }
    }

    if (!best && map.queryRenderedFeatures) {
      let center = null;
      try { center = map.project({ lng: location[0], lat: location[1] }); }
      catch { try { center = map.project(location); } catch {} }
      if (Number.isFinite(center?.x) && Number.isFinite(center?.y)) {
        let features = [];
        try { features = map.queryRenderedFeatures([[center.x - 160, center.y - 160], [center.x + 160, center.y + 160]]) || []; } catch {}
        for (const feature of features) {
          if (placementLayerRole(feature?.layer?.id, feature?.layer?.["source-layer"] || feature?.sourceLayer) === "airport") consider(feature);
        }
      }
    }
    return best?.name || null;
  }

  function airportPointBaseName(location) {
    const mapped = nearestMappedAirportName(location);
    if (mapped) return mapped;
    const city = cleanAirportDisplayBase(locationDisplayProfile(location)?.city);
    if (city) return city;
    const area = cleanAirportDisplayBase(nearestAreaLabel(location));
    return area || "Airport";
  }

  function uniqueAirportPointId(location, points) {
    const baseName = airportPointBaseName(location);
    const baseId = `AIR_${baseName}`;
    if (!points?.has?.(baseId)) return baseId;
    for (let n = 2; n < 1000; n++) {
      const id = `AIR_${baseName} ${n}`;
      if (!points?.has?.(id)) return id;
    }
    return `AIR_${baseName} ${ledger.pointSeq++}`;
  }

  function nextPointId(location, kind = null, points = null) {
    if (kind === "airport") return uniqueAirportPointId(location, points);
    const suffix = `${areaSlug(location)}:${ledger.pointSeq++}`;
    if (kind === "university") return `UNI_DD_${suffix}`;
    return `${CFG.NEW_POINT_PREFIX}${suffix}`;
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

  function planDevelopment(live, target, side, amount, isCreate, createKind = null) {
    if (!DEVELOPMENT_AMOUNTS.includes(amount)) return { ok: false, error: "Unsupported amount" };
    if (!isCreate) {
      const hasResidential = (target?.residents || 0) > 0;
      const hasWork = (target?.jobs || 0) > 0;
      if (side === "residential" && !hasResidential) return { ok: false, error: "This point has no residents." };
      if (side === "work" && !hasWork) return { ok: false, error: "This point has no work demand." };
    }
    const targetKind = isCreate ? createKind : specialPointKind(target?.id);
    if (isCreate && targetKind && side !== "work") return { ok: false, error: "Special demand points are workplace-only." };
    const landConversion = isCreate
      ? (target?.landConversion == null ? requiresLandConversion(target.location) : !!target.landConversion)
      : false;
    const airportCluster = isCreate && targetKind === "airport"
      ? (target?.airportCluster == null ? airportClusterStatus(target.location).cluster : !!target.airportCluster)
      : null;
    const priceMultiplier = isCreate
      ? newPointPriceMultiplier(target.location, side === "work" ? targetKind : null, landConversion, airportCluster)
      : (side === "work" ? specialExpansionPriceMultiplier(targetKind) : 1);
    const followupPriceMultiplier = isCreate
      ? (side === "work" ? specialExpansionPriceMultiplier(targetKind) : 1)
      : priceMultiplier;
    const priceQuote = quoteDevelopmentPrice(live, target.location, amount, isCreate, priceMultiplier, followupPriceMultiplier);
    if (!priceQuote.ok || !Number.isFinite(priceQuote.totalCost)) return { ok: false, error: "Could not price development." };
    const before = cloneDemandData(live);
    const planned = cloneDemandData(live);
    const ledgerBefore = cloneLedgerState();
    const donorBands = drivingDonorsForPlanning(planned);
    let pointId = target.id;
    if (isCreate) {
      do { pointId = nextPointId(target.location, targetKind, planned.points); }
      while (planned.points.has(pointId));
    }
    const stableTargetSeed = isCreate
      ? `new:${Number(target.location?.[0]).toFixed(6)},${Number(target.location?.[1]).toFixed(6)}:${targetKind || "normal"}`
      : String(pointId);
    const planSeed = `${stableTargetSeed}:${ledger.actions.length}:${side}:${amount}:${isCreate ? "create" : "existing"}:${targetKind || "normal"}`;
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
    const secondaryContext = createSecondaryContext(planned, target.location, side, pointId, {
      isCreate,
      specialKind: side === "work" ? targetKind : null,
    });

    const totalCost = priceQuote.totalCost;
    const allFlows = [];
    const updatedPopMap = new Map();
    let parallelFallback = false;
    try {
      const applyProfileFlows = (profile) => {
        for (const flow of profile.flows) {
          const residenceId = side === "residential" ? pointId : flow.id;
          const jobId = side === "residential" ? flow.id : pointId;
          const home = looseMapGet(planned.points, residenceId)?.location;
          const work = looseMapGet(planned.points, jobId)?.location;
          const counterpartPosition = looseMapGet(planned.points, flow.id)?.location;
          if (!counterpartWithinLandscape(counterpartPosition))
            throw new Error("Cannot create commuter connection: counterpart lies outside the playable landscape.");
          if (!parallelFallback && !roadAccessibleForPlanning(counterpartPosition))
            throw new Error("Cannot create commuter connection: counterpart is outside the available road network.");
          pointLedger(flow.id, planned.points.get(flow.id));
          const liveRelation = connectionExistingFlowStats(planned, pointId, side, flow.id);
          const reusablePopId = flow.forceNew ? null : (liveRelation.totalSize > 0 ? liveRelation.popId : flow.existingPopId);
          if (reusablePopId != null) {
            const existingId = String(reusablePopId);
            const existing = looseMapGet(planned.popsMap, existingId);
            if (!existing || String(existing.residenceId) !== String(residenceId) || String(existing.jobId) !== String(jobId)) {
              throw new Error(`Could not reuse existing commuter ${existingId}`);
            }
            const existedBeforePlan = looseMapGet(before.popsMap, existingId) != null;
            if (!increasePlannedPop(planned, existingId, flow.size)) throw new Error(`Failed to expand existing commuter ${existingId}`);

            if (existedBeforePlan) {
              let update = updatedPopMap.get(existingId);
              if (!update) {
                const original = looseMapGet(before.popsMap, existingId);
                update = {
                  id: original?.id ?? flow.existingPopId,
                  beforeSize: Number(original?.size) || 0,
                  afterSize: Number(original?.size) || 0,
                  residenceId, jobId, primaryId: pointId, primarySide: side, delta: 0,
                };
                updatedPopMap.set(existingId, update);
              }
              update.delta += flow.size;
              update.afterSize += flow.size;
              const adjKey = `${actionId}:${existingId}`;
              const adj = ledger.adjustments[adjKey] || {
                popId: existingId, residenceId, jobId, primaryId: pointId, primarySide: side, actionId, beforeSize: update.beforeSize, baseSize: adjustmentBaselineForPop(existingId, update.beforeSize), delta: 0, active: true,
              };
              adj.delta += flow.size;
              ledger.adjustments[adjKey] = adj;
            } else {
              const owned = ledger.pops[existingId];
              if (!owned || owned.active === false) throw new Error(`Missing planned commuter ledger record ${existingId}`);
              owned.size = (Number(owned.size) || 0) + flow.size;
            }
          } else {
            const popId = nextPopId();
            if (!addPlannedPop(planned, residenceId, jobId, popId, flow.size, donorBands)) {
              throw new Error(`Failed to create planned commuter ${residenceId} -> ${jobId}`);
            }
            const plannedPop = planned.popsMap.get(popId);
            ledger.pops[popId] = {
              residenceId, jobId, size: flow.size,
              drivingDistance: Number(plannedPop?.drivingDistance) || 0,
              drivingSeconds: Number(plannedPop?.drivingSeconds) || 0,
              actionId, primaryId: pointId, primarySide: side, active: true,
            };
          }
          updateLedgerForFlow(pointId, flow.id, side, flow.size, planned);
          allFlows.push({ residenceId, jobId, size: flow.size });
        }
      };

      let profile = secondaryContext.specialKind && side === "work"
        ? buildSpecialActionProfile(planned, target.location, pointId, secondaryContext.specialKind, amount, planSeed, secondaryContext)
        : buildRegularActionProfile(planned, target.location, side, pointId, amount, planSeed, secondaryContext);
      if (!profile.ok && ["not-enough-special-capacity", "not-enough-connection-capacity", "not-enough-counterpoints", "allocation-failed", "special-allocation-failed"].includes(profile.reason)) {
        profile = buildParallelCapacityProfile(planned, target.location, side, pointId, amount, secondaryContext);
      }
      parallelFallback = !!profile.ok && !!profile.parallelFallback;
      if (!profile.ok) {
        const reason = String(profile.reason || "");
        const label = secondaryContext.specialKind === "airport"
          ? "Airport"
          : secondaryContext.specialKind === "university"
            ? "University"
            : side === "residential" ? "residential" : "worker";
        if (reason === "not-enough-counterpoints") {
          throw new Error(`No eligible ${side === "residential" ? "workplace" : "residential"} demand point is available for this ${label} development.`);
        }
        if (reason === "not-enough-special-capacity" || reason === "not-enough-connection-capacity") {
          throw new Error(`Could not allocate commuter groups for this ${label} development.`);
        }
        if (reason === "special-connection-over-200") {
          throw new Error("A planned connection would exceed 200 commuters.");
        }
        if (reason === "duplicate-special-counterpart") {
          throw new Error("Could not create a unique set of commuter connections for this development.");
        }
        throw new Error(`Could not create a valid road-connected plan for this ${label} development.`);
      }
      applyProfileFlows(profile);

    } catch (e) {
      ledger = ledgerBefore;
      return { ok: false, error: e instanceof Error ? e.message : String(e) };
    }

    {
      const byCounterpart = new Set();
      for (const flow of allFlows) {
        const counterpart = side === "residential" ? String(flow.jobId) : String(flow.residenceId);
        if (!parallelFallback && byCounterpart.has(counterpart)) {
          ledger = ledgerBefore;
          return { ok: false, error: "Development plan touched the same connection more than once." };
        }
        byCounterpart.add(counterpart);
        if (!parallelFallback) {
          const stats = connectionExistingFlowStats(planned, pointId, side, counterpart);
          if (stats.totalSize > CFG.CONNECTION_MAX_SIZE) {
            ledger = ledgerBefore;
            return { ok: false, error: `Connection ${counterpart} exceeds ${CFG.CONNECTION_MAX_SIZE} commuters.` };
          }
        } else if (flow.size > CFG.CONNECTION_MAX_SIZE) {
          ledger = ledgerBefore;
          return { ok: false, error: "Planned commuter exceeds 200 people." };
        }
      }
    }

    {
      const beforePairs = activeCommuterPairCounts(before);
      const plannedPairs = activeCommuterPairCounts(planned);
      const addedPairCounts = new Map();
      if (parallelFallback) {
        for (const pop of planned.popsMap.values()) {
          if (before.popsMap.has(pop.id)) continue;
          const key = commuterPairKey(pop.residenceId, pop.jobId);
          addedPairCounts.set(key, (addedPairCounts.get(key) || 0) + 1);
          if (!(pop.size > 0) || pop.size > CFG.CONNECTION_MAX_SIZE) {
            ledger = ledgerBefore;
            return { ok: false, error: "Planned commuter exceeds 200 people." };
          }
        }
      }
      for (const [key, afterCount] of plannedPairs) {
        const beforeCount = beforePairs.get(key) || 0;
        const allowedCount = parallelFallback
          ? beforeCount + (addedPairCounts.get(key) || 0)
          : beforeCount > 0 ? beforeCount : 1;
        if (afterCount > allowedCount) {
          ledger = ledgerBefore;
          return { ok: false, error: "Development plan would create an unexpected parallel connection." };
        }
      }
    }

    const addedPoints = [...planned.points.values()].filter((p) => !before.points.has(p.id));
    const addedPops = [...planned.popsMap.values()].filter((p) => !before.popsMap.has(p.id));
    const updatedPops = [...updatedPopMap.values()];
    const totalFlow = allFlows.reduce((sum, f) => sum + (Number(f.size) || 0), 0);
    if (!allFlows.length || totalFlow !== amount || (addedPops.length === 0 && updatedPops.length === 0)) {
      ledger = ledgerBefore;
      return { ok: false, error: `Invalid development plan: expected ${amount} commuters, planned ${totalFlow}.` };
    }
    const ledgerAfter = cloneLedgerState();
    ledger = ledgerBefore;
    return {
      ok: true, before, planned, addedPoints, addedPops, updatedPops, ledgerAfter, pointId, totalCost,
      flows: allFlows, side, amount, isCreate, actionId, createKind: targetKind,
    };
  }

  function relevantPopsForSide(dd, pointId, side) {
    const id = String(pointId);
    const point = looseMapGet(dd?.points, id);
    if (!point) return [];
    const rows = [];
    const seen = new Set();
    for (const popId of point.popIds || []) {
      const pop = looseMapGet(dd?.popsMap, popId);
      if (!pop || !(Number(pop.size) > 0)) continue;
      if (side === "residential" && String(pop.residenceId) !== id) continue;
      if (side === "work" && String(pop.jobId) !== id) continue;
      const key = String(pop.id ?? popId);
      if (seen.has(key)) continue;
      seen.add(key);
      rows.push({ id: pop.id ?? popId, pop, size: Math.max(0, Math.round(Number(pop.size) || 0)) });
    }
    return rows.filter((row) => row.size > 0).sort((a, b) => String(a.id).localeCompare(String(b.id)));
  }

  function availableDemandForDemolition(dd, pointId, side) {
    return relevantPopsForSide(dd, pointId, side).reduce((sum, row) => sum + row.size, 0);
  }

  function demolitionAmountsForPoint(point, side) {
    const dd = api.gameState.getDemandData?.();
    const available = point?.id != null
      ? availableDemandForDemolition(dd, point.id, side)
      : Math.max(0, Math.round(Number(side === "residential" ? point?.residents : point?.jobs) || 0));
    if (!(available > 0)) return [];
    const rows = DEVELOPMENT_AMOUNTS.filter((amount) => amount <= available);
    if (!DEVELOPMENT_AMOUNTS.includes(available)) rows.push(available);
    return [...new Set(rows)].sort((a, b) => a - b);
  }

  function reducePlannedPop(dd, popId, amount) {
    const pop = looseMapGet(dd?.popsMap, popId);
    const remove = Math.max(0, Math.round(Number(amount) || 0));
    if (!pop || !(remove > 0) || remove > (Number(pop.size) || 0) + 0.001) return false;
    const res = looseMapGet(dd.points, pop.residenceId);
    const job = looseMapGet(dd.points, pop.jobId);
    if (!res || !job) return false;
    const next = Math.max(0, (Number(pop.size) || 0) - remove);
    res.residents = Math.max(0, (Number(res.residents) || 0) - remove);
    job.jobs = Math.max(0, (Number(job.jobs) || 0) - remove);
    if (next <= 0.001) {
      const key = looseMapKey(dd.popsMap, popId);
      if (key != null) dd.popsMap.delete(key);
      removePointPopId(res, key ?? popId);
      removePointPopId(job, key ?? popId);
    } else {
      pop.size = next;
    }
    return true;
  }

  function planDemolition(live, target, side, requestedAmount) {
    if (!live?.points || !live?.popsMap || !target?.id || !["residential", "work"].includes(side)) {
      return { ok: false, error: "Demand data is unavailable." };
    }
    const available = availableDemandForDemolition(live, target.id, side);
    const amount = Math.max(0, Math.round(Number(requestedAmount) || 0));
    if (!(amount > 0)) return { ok: false, error: "Choose an amount to demolish." };
    if (amount > available) return { ok: false, error: `This point only has ${available.toLocaleString()} ${side === "residential" ? "Residents" : "Workers"}.` };

    const quote = quoteDemolitionPrice(live, target.location, amount, side, target.id);
    if (!quote.ok || !Number.isFinite(quote.totalCost)) return { ok: false, error: "Could not price demolition." };

    const before = cloneDemandData(live);
    const planned = cloneDemandData(live);
    const ledgerBefore = cloneLedgerState();
    const actionId = `act:${Date.now().toString(36)}:${ledger.seq++}`;
    const candidates = relevantPopsForSide(planned, target.id, side);
    const removals = allocateInteger(candidates.map((row) => row.size), amount, candidates.map((row) => row.size));
    if (removals.reduce((a, b) => a + b, 0) !== amount) {
      ledger = ledgerBefore;
      return { ok: false, error: `Could not allocate exactly ${amount.toLocaleString()} commuters for demolition.` };
    }

    const changes = [];
    const flows = [];
    try {
      pointLedger(target.id, looseMapGet(planned.points, target.id));
      for (let i = 0; i < candidates.length; i++) {
        const remove = removals[i];
        if (!(remove > 0)) continue;
        const { id: popId } = candidates[i];
        const pop = looseMapGet(planned.popsMap, popId);
        if (!pop) throw new Error(`Commuter ${popId} disappeared while planning demolition.`);
        const beforeSize = Math.max(0, Math.round(Number(pop.size) || 0));
        const afterSize = beforeSize - remove;
        const residenceId = pop.residenceId;
        const jobId = pop.jobId;
        pointLedger(residenceId, looseMapGet(planned.points, residenceId));
        pointLedger(jobId, looseMapGet(planned.points, jobId));
        const baseSize = adjustmentBaselineForPop(popId, beforeSize);
        ledger.adjustments[`${actionId}:${String(popId)}`] = {
          popId: String(popId), residenceId, jobId, primaryId: String(target.id), primarySide: side,
          actionId, beforeSize, baseSize: baseSize == null ? beforeSize : baseSize,
          delta: -remove, active: true, demolition: true,
          drivingDistance: Number(pop.drivingDistance) || 0,
          drivingSeconds: Number(pop.drivingSeconds) || 0,
          drivingPath: cloneJsonSafe((() => {
            const home = looseMapGet(planned.points, residenceId)?.location;
            const work = looseMapGet(planned.points, jobId)?.location;
            return archivedRoadPath(popId, residenceId, jobId, home, work) ||
              usefulRoadPath(pop.drivingPath, home, work) ||
              usefulRoadPath(ledger.pops?.[String(popId)]?.drivingPath, home, work);
          })()) || null,
          runtimeSnapshot: runtimeSnapshotForPop(pop),
        };
        const captured = ledger.adjustments[`${actionId}:${String(popId)}`].drivingPath;
        if (captured) archiveRoadPath(popId, residenceId, jobId, captured,
          looseMapGet(planned.points, residenceId)?.location,
          looseMapGet(planned.points, jobId)?.location);
        if (!reducePlannedPop(planned, popId, remove)) throw new Error(`Could not reduce commuter ${popId}.`);
        changes.push({ id: popId, residenceId, jobId, beforeSize, afterSize, remove });
        flows.push({ residenceId, jobId, size: remove });
      }
    } catch (e) {
      ledger = ledgerBefore;
      return { ok: false, error: String(e?.message || e) };
    }

    const totalRemoved = changes.reduce((sum, row) => sum + row.remove, 0);
    if (totalRemoved !== amount) {
      ledger = ledgerBefore;
      return { ok: false, error: `Invalid demolition plan: expected ${amount}, planned ${totalRemoved}.` };
    }
    const ledgerAfter = cloneLedgerState();
    ledger = ledgerBefore;
    return {
      ok: true, kind: "demolish", before, planned, ledgerAfter, pointId: String(target.id), side, amount,
      pricedAmount: quote.pricedAmount, totalCost: quote.totalCost, actionId, changes, flows,
    };
  }

  function pointSnapshotForRestore(point) {
    if (!point?.id || !Array.isArray(point.location)) return null;
    return {
      id: String(point.id), location: [Number(point.location[0]), Number(point.location[1])],
      residentModeShare: point.residentModeShare ? cloneJsonSafe(point.residentModeShare) : null,
      workerModeShare: point.workerModeShare ? cloneJsonSafe(point.workerModeShare) : null,
    };
  }

  function removeEmptyTouchedPoints(before, endpointIds) {
    const removedPoints = [];
    const errors = [];
    let dd = api.gameState.getDemandData?.();
    for (const pointId of [...new Set([...endpointIds].map(String))]) {
      const live = looseMapGet(dd?.points, pointId);
      if (!live) continue;
      const popCount = live?.popIds && typeof live.popIds !== "string" && typeof live.popIds[Symbol.iterator] === "function" ? [...live.popIds].length : 0;
      if ((Number(live.residents) || 0) > 0 || (Number(live.jobs) || 0) > 0 || popCount > 0) continue;
      const snapshot = pointSnapshotForRestore(looseMapGet(before?.points, pointId) || live);
      try {
        const r = api.demand?.removeDemandPoint?.(live.id ?? pointId);
        if (r?.success === false) errors.push(r.error || `Could not remove empty point ${pointId}.`);
        else if (snapshot) removedPoints.push(snapshot);
      } catch (e) { errors.push(String(e?.message || e)); }
      dd = api.gameState.getDemandData?.() || dd;
    }
    return { removedPoints, errors };
  }

  function applyDemolition(plan) {
    if (!plan?.ok || !api.demand) return { ok: false, error: "Invalid demolition plan." };
    const updates = plan.changes.filter((row) => row.afterSize > 0).map((row) => ({ id: row.id, size: row.afterSize }));
    const removals = plan.changes.filter((row) => row.afterSize <= 0).map((row) => row.id);
    const baseline = cloneLedgerState();
    const failed = (message) => {
      const rb = rollbackDemandSnapshot(plan.before, baseline);
      return { ok: false, rollbackOk: rb.ok,
        error: message + (rb.ok ? "" : `; rollback incomplete: ${rb.errors.join("; ")}`) };
    };
    if (updates.length) {
      let r = null;
      try { r = api.demand.updatePops(updates); } catch (e) { r = { success: false, error: String(e) }; }
      if (!r?.success) return failed(r?.error || "Could not reduce commuter connections.");
    }
    if (removals.length) {
      let r = null;
      try { r = api.demand.removePops(removals); } catch (e) { r = { success: false, error: String(e) }; }
      if (!r?.success) return failed(r?.error || "Could not remove emptied commuter connections.");
    }

    let live = api.gameState.getDemandData?.();
    const target = looseMapGet(live?.points, plan.pointId);
    const beforeTarget = looseMapGet(plan.before?.points, plan.pointId);
    const beforePrimary = Math.max(0, Number(plan.side === "residential" ? beforeTarget?.residents : beforeTarget?.jobs) || 0);
    const actualPrimary = Math.max(0, Number(plan.side === "residential" ? target?.residents : target?.jobs) || 0);
    const expectedPrimary = Math.max(0, beforePrimary - plan.amount);
    if (target && Math.abs(actualPrimary - expectedPrimary) > 0.001) {
      return failed(`Could not verify demolition: expected ${expectedPrimary}, got ${actualPrimary}.`);
    }
    for (const row of plan.changes) {
      const pop = looseMapGet(live?.popsMap, row.id);
      if (row.afterSize > 0) {
        if (!pop || Math.abs((Number(pop.size) || 0) - row.afterSize) > 0.001) return failed(`Could not verify demolition for commuter ${row.id}.`);
      } else if (pop) {
        return failed(`Could not verify demolition: commuter ${row.id} should have been removed.`);
      }
    }

    const endpoints = new Set();
    for (const row of plan.changes) { endpoints.add(String(row.residenceId)); endpoints.add(String(row.jobId)); }
    const cleanup = removeEmptyTouchedPoints(plan.before, endpoints);
    return { ok: true, removedPoints: cleanup.removedPoints, cleanupErrors: cleanup.errors };
  }

  function cacheMissingDemolitionRoutes(plan) {
    const city = currentCity(), epoch = lifecycleEpoch, saveKey = loadedLedgerKey;
    const missing = (plan.changes || []).filter(row => {
      const home = looseMapGet(plan.before?.points, row.residenceId)?.location;
      const work = looseMapGet(plan.before?.points, row.jobId)?.location;
      return !archivedRoadPath(row.id, row.residenceId, row.jobId, home, work);
    });
    if (!missing.length) return;
    setTimeout(() => {
      void (async () => {
        for (const row of missing.slice(0, 80)) {
          if (city !== currentCity() || epoch !== lifecycleEpoch || saveKey !== loadedLedgerKey) return;
          const liveRec = Object.values(ledger.adjustments || {}).find(rec =>
            rec?.demolition && rec.active !== false && String(rec.actionId) === String(plan.actionId) &&
            String(rec.popId) === String(row.id));
          if (!liveRec) continue;
          let route = null;
          try { route = await queryDrivingRoute(plan.before, row.residenceId, row.jobId); } catch {}
          if (city !== currentCity() || epoch !== lifecycleEpoch || saveKey !== loadedLedgerKey) return;
          if (liveRec.active === false) continue;
          const home = looseMapGet(plan.before?.points, row.residenceId)?.location;
          const work = looseMapGet(plan.before?.points, row.jobId)?.location;
          const good = usefulRoadPath(route?.drivingPath, home, work);
          if (good && archiveRoadPath(row.id, row.residenceId, row.jobId, good, home, work)) {
            liveRec.drivingPath = cloneJsonSafe(good);
            scheduleRoadLedgerSave();
          }
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      })();
    }, 600);
  }

  async function executeDemolition(plan) {
    const epoch = lifecycleEpoch, city = currentCity();
    if (!plan?.before || planningDemandSignature(plan.before) !== planningDemandSignature(api.gameState.getDemandData?.()))
      return { ok: false, error: "Demand changed since Review. Review again before demolition." };
    const c = await charge(plan.totalCost);
    if (!c.ok) return c;
    if (epoch !== lifecycleEpoch || city !== currentCity())
      return { ok: false, error: "Game changed before demolition could be applied." };
    if (planningDemandSignature(plan.before) !== planningDemandSignature(api.gameState.getDemandData?.())) {
      refund(c.charged);
      return { ok: false, error: "Demand changed during payment. Review again before demolition." };
    }
    let applied;
    beginInternalDemandMutation();
    try { applied = applyDemolition(plan); }
    finally { endInternalDemandMutation(); }
    if (!applied.ok) {
      if (applied.rollbackOk !== false) refund(plan.totalCost);
      invalidatePreviews({ demand: true });
      return applied;
    }
    ledger = plan.ledgerAfter;
    ledger.actions.push({
      id: plan.actionId, at: Date.now(), city: currentCity(), pointId: plan.pointId, side: plan.side,
      amount: plan.amount, pricedAmount: plan.pricedAmount, cost: plan.totalCost, chargedCost: c.charged,
      chargeMethod: "setMoney-verified", kind: "demolish", create: false, active: true,
      removedPoints: applied.removedPoints || [],
    });
    rebuildLedgerPointAdditions();
    rememberPlanningDemandSignature(api.gameState.getDemandData?.());
    persistAppliedChange();
    cacheMissingDemolitionRoutes(plan);
    return { ok: true, cleanupErrors: applied.cleanupErrors || [] };
  }

  async function charge(cost) {
    const epoch = lifecycleEpoch, city = currentCity(), saveKey = loadedLedgerKey;
    const sameGame = () => epoch === lifecycleEpoch && city === currentCity() && saveKey === loadedLedgerKey;
    const before = safeBudget();
    if (!Number.isFinite(cost) || cost < 0)
      return { ok: false, error: "Invalid development cost." };
    if (!Number.isFinite(before))
      return { ok: false, error: "The current budget is unavailable." };
    if (before < cost) return { ok: false, error: `Costs ${fmtMoney(cost)}; budget is ${fmtMoney(before)}.` };
    const expected = before - cost;
    const confirmed = () => Math.abs(safeBudget() - expected) <= 1;
    try {
      api.actions.setMoney(expected);
    } catch (e) {
      return { ok: false, error: `Could not charge development cost: ${String(e)}` };
    }
    // Game actions can commit in a later microtask, not during setMoney().
    if (!confirmed()) {
      await Promise.resolve();
      if (!sameGame()) return { ok: false, error: "Game changed while payment was pending. Check the previous game's balance." };
    }
    for (const delay of [0, 20, 40]) {
      if (confirmed()) break;
      await new Promise(resolve => setTimeout(resolve, delay));
      if (!sameGame()) return { ok: false, error: "Game changed while payment was pending. Check the previous game's balance." };
    }
    if (!sameGame()) return { ok: false, error: "Game changed while payment was pending. Check the previous game's balance." };
    if (!confirmed()) {
      try { api.actions.setMoney(before); }
      catch (e) { console.warn(`${TAG} could not restore unverified development charge`, e); }
      return { ok: false, error: "Development charge could not be verified. The previous balance was requested; check the budget." };
    }
    return { ok: true, before, after: safeBudget(), charged: Math.max(0, before - expected) };
  }

  function refund(cost) {
    try { api.actions.addMoney(cost, "Demand Developer refund"); }
    catch (e) { console.error(`${TAG} refund failed`, e); }
  }

  function rollbackApplied(addedPointIds, addedPopIds, reverseUpdates = []) {
    const errors = [];
    if (reverseUpdates.length) {
      try {
        const r = api.demand?.updatePops?.(reverseUpdates);
        if (!r?.success) errors.push(r?.error || "updatePops rollback failed");
      } catch (e) { errors.push(String(e)); }
    }
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

  function validRoutePath(value) {
    return Array.isArray(value) && value.length >= 2 && value.every((coord) =>
      Array.isArray(coord) && coord.length >= 2 && Number.isFinite(Number(coord[0])) && Number.isFinite(Number(coord[1]))
    );
  }

  function roadMeters(a, b) {
    const lat = (Number(a[1]) + Number(b[1])) * Math.PI / 360;
    return Math.hypot((Number(a[0]) - Number(b[0])) * Math.cos(lat) * 111320,
      (Number(a[1]) - Number(b[1])) * 111132);
  }
  function cleanOwnedRoadGeometry(path, home, work) {
    if (!validRoutePath(path) || path.length < 3 || !Array.isArray(home) || !Array.isArray(work) ||
        !validRoutePath([home, work])) return null;
    const coords = path.map(p => [Number(p[0]), Number(p[1])]);
    const inWorld = p => Math.abs(p[0]) <= 180 && Math.abs(p[1]) <= 90;
    if (!coords.every(inWorld)) return null;
    const variants = [
      coords, coords.slice().reverse(),
      coords.map(([lon, lat]) => [lat, lon]),
      coords.slice().reverse().map(([lon, lat]) => [lat, lon]),
    ];
    let best = null, bestScore = Infinity;
    for (const variant of variants) {
      if (!variant.every(inWorld)) continue;
      const from = roadMeters(variant[0], home);
      const to = roadMeters(variant[variant.length - 1], work);
      if (from + to < bestScore) { best = variant; bestScore = from + to; }
    }
    if (!best) return null;
    if (roadMeters(best[0], home) > 1200 ||
        roadMeters(best[best.length - 1], work) > 1200) return null;
    const direct = roadMeters(home, work);
    const maxSegment = Math.max(3500, Math.min(30000, direct * 2.1));
    const maxDetour = Math.max(25000, direct * 12);
    let length = 0;
    for (let i = 1; i < best.length; i++) {
      const segment = roadMeters(best[i - 1], best[i]);
      if (!Number.isFinite(segment) || segment > maxSegment) return null;
      length += segment;
      if (length > maxDetour) return null;
    }
    if (length <= 1) return null;
    return best;
  }
  function checkedPopRoadPath(dd, rec, path) {
    const home = looseMapGet(dd?.points, rec?.residenceId)?.location;
    const work = looseMapGet(dd?.points, rec?.jobId)?.location;
    return cleanOwnedRoadGeometry(path, home, work);
  }

  function suspiciouslyStraightRoad(path, home, work) {
    if (!validRoutePath(path) || path.length < 3 || !Array.isArray(home) || !Array.isArray(work)) return false;
    const straight = roadMeters(home, work);
    if (straight < 180) return false;
    const lat = ((Number(home[1]) + Number(work[1])) / 2) * Math.PI / 180;
    const mx = 111320 * Math.cos(lat), my = 111132;
    const dx = (Number(work[0]) - Number(home[0])) * mx;
    const dy = (Number(work[1]) - Number(home[1])) * my;
    const distance2 = dx * dx + dy * dy;
    if (distance2 < 1) return false;
    let maxDeviation = 0, length = 0;
    for (let i = 0; i < path.length; i++) {
      const x = (Number(path[i][0]) - Number(home[0])) * mx;
      const y = (Number(path[i][1]) - Number(home[1])) * my;
      const t = Math.max(0, Math.min(1, (x * dx + y * dy) / distance2));
      maxDeviation = Math.max(maxDeviation, Math.hypot(x - t * dx, y - t * dy));
      if (i) length += roadMeters(path[i - 1], path[i]);
    }
    return maxDeviation < Math.max(12, Math.min(45, straight * 0.018)) &&
      length < straight * 1.045;
  }

  const observedNativeRoads = new Map();
  function usefulRoadPath(path, home, work) {
    const checked = cleanOwnedRoadGeometry(path, home, work);
    return checked && !suspiciouslyStraightRoad(checked, home, work) ? checked : null;
  }
  function observeNativeRoadPath(popId, path) {
    const dd = api.gameState.getDemandData?.();
    const pop = looseMapGet(dd?.popsMap, popId);
    if (!pop || ledger.pops?.[String(popId)]?.active !== false && ledger.pops?.[String(popId)]) return;
    const home = looseMapGet(dd?.points, pop.residenceId)?.location;
    const work = looseMapGet(dd?.points, pop.jobId)?.location;
    const checked = usefulRoadPath(path, home, work);
    if (!checked) return;
    observedNativeRoads.delete(String(popId));
    observedNativeRoads.set(String(popId), { residenceId: String(pop.residenceId), jobId: String(pop.jobId),
      city: currentCity(), drivingPath: checked });
    if (observedNativeRoads.size > 350) observedNativeRoads.delete(observedNativeRoads.keys().next().value);
  }
  function archivedRoadPath(popId, residenceId, jobId, home, work) {
    const archived = ledger.roadArchive?.[String(popId)];
    const observed = observedNativeRoads.get(String(popId));
    for (const rec of [archived, observed]) {
      if (!rec || rec.city !== currentCity() ||
          String(rec.residenceId) !== String(residenceId) || String(rec.jobId) !== String(jobId)) continue;
      const checked = usefulRoadPath(rec.drivingPath, home, work);
      if (checked) return checked;
    }
    return null;
  }
  function archiveRoadPath(popId, residenceId, jobId, path, home, work) {
    const checked = usefulRoadPath(path, home, work);
    if (!checked) return false;
    if (!ledger.roadArchive) ledger.roadArchive = {};
    ledger.roadArchive[String(popId)] = { city: currentCity(),
      residenceId: String(residenceId), jobId: String(jobId), drivingPath: cloneJsonSafe(checked) };
    const keys = Object.keys(ledger.roadArchive);
    if (keys.length > 1200) delete ledger.roadArchive[keys[0]];
    return true;
  }

  function attachLiveRoadPath(dd, popId, residenceId, jobId, path) {
    if (!dd?.popsMap) return false;
    const safePath = cleanOwnedRoadGeometry(path,
      looseMapGet(dd.points, residenceId)?.location,
      looseMapGet(dd.points, jobId)?.location);
    if (!safePath) return false;
    const live = looseMapGet(dd.popsMap, popId);
    if (!live || String(live.residenceId) !== String(residenceId) ||
        String(live.jobId) !== String(jobId)) return false;
    if (validRoutePath(live.drivingPath) && live.drivingPath.length > 2 &&
        JSON.stringify(live.drivingPath) === JSON.stringify(safePath)) return true;
    try {
      live.drivingPath = safePath.map((coord) => [coord[0], coord[1]]);
      return validRoutePath(live.drivingPath) && live.drivingPath.length > 2;
    } catch (e) {
      console.warn(`${TAG} could not attach road geometry for commuter ${popId}`, e);
      return false;
    }
  }

  function attachOwnedRoadPaths(dd = api.gameState.getDemandData?.()) {
    if (!dd?.popsMap) return 0;
    let attached = 0;
    for (const [id, rec] of Object.entries(ledger.pops || {})) {
      if (!rec || rec.active === false || !validRoutePath(rec.drivingPath) || rec.drivingPath.length < 3) continue;
      if (checkedPopRoadPath(dd, rec, rec.drivingPath) &&
          attachLiveRoadPath(dd, id, rec.residenceId, rec.jobId, rec.drivingPath)) {
        attached++;
        if (rec.roadMetricsVerified) applyRoadMetricsWithoutRebuildingPops(dd, id, rec, rec);
      }
    }
    return attached;
  }

  function restoredNativeAdjustment(popId, dd = api.gameState.getDemandData?.()) {
    const live = looseMapGet(dd?.popsMap, popId);
    if (!live) return null;
    let fallback = null;
    for (const rec of Object.values(ledger.adjustments || {})) {
      if (!rec?.demolition || rec.active !== false || String(rec.popId) !== String(popId) ||
          String(rec.residenceId) !== String(live.residenceId) ||
          String(rec.jobId) !== String(live.jobId)) continue;
      if (!fallback) fallback = rec;
      if (usefulRoadPath(rec.drivingPath,
        looseMapGet(dd?.points, rec.residenceId)?.location,
        looseMapGet(dd?.points, rec.jobId)?.location)) return rec;
    }
    return fallback;
  }

  function attachRestoredNativeRoadPaths(dd = api.gameState.getDemandData?.()) {
    if (!dd?.popsMap) return 0;
    let attached = 0;
    const done = new Set();
    for (const rec of Object.values(ledger.adjustments || {})) {
      if (!rec?.demolition || rec.active !== false || done.has(String(rec.popId))) continue;
      done.add(String(rec.popId));
      const best = restoredNativeAdjustment(rec.popId, dd);
      if (!best) continue;
      const home = looseMapGet(dd.points, best.residenceId)?.location;
      const work = looseMapGet(dd.points, best.jobId)?.location;
      const path = archivedRoadPath(best.popId, best.residenceId, best.jobId, home, work) ||
        usefulRoadPath(best.drivingPath, home, work);
      if (path && attachLiveRoadPath(dd, best.popId, best.residenceId, best.jobId, path)) attached++;
    }
    return attached;
  }

  const pendingNativeRestorationRoutes = new Map();
  async function ensureRestoredNativeRoadPath(city, popId) {
    if (city !== currentCity()) return null;
    const dd = api.gameState.getDemandData?.();
    const rec = restoredNativeAdjustment(popId, dd);
    if (!rec) return null;
    const home = looseMapGet(dd?.points, rec.residenceId)?.location;
    const work = looseMapGet(dd?.points, rec.jobId)?.location;
    const existing = archivedRoadPath(popId, rec.residenceId, rec.jobId, home, work) ||
      usefulRoadPath(rec.drivingPath, home, work);
    if (existing) {
      attachLiveRoadPath(dd, popId, rec.residenceId, rec.jobId, existing);
      return existing;
    }
    const key = `${city}/${popId}`;
    if (pendingNativeRestorationRoutes.has(key)) return pendingNativeRestorationRoutes.get(key);
    const saveKey = loadedLedgerKey, epoch = lifecycleEpoch;
    const homeId = rec.residenceId, workId = rec.jobId;
    const job = (async () => {
      const route = await queryDrivingRoute(api.gameState.getDemandData?.(), homeId, workId);
      if (city !== currentCity() || saveKey !== loadedLedgerKey || epoch !== lifecycleEpoch) return null;
      const fresh = api.gameState.getDemandData?.();
      const current = restoredNativeAdjustment(popId, fresh);
      if (!current || String(current.residenceId) !== String(homeId) ||
          String(current.jobId) !== String(workId)) return null;
      const path = usefulRoadPath(route?.drivingPath,
        looseMapGet(fresh?.points, homeId)?.location,
        looseMapGet(fresh?.points, workId)?.location);
      if (!path) return null;
      archiveRoadPath(popId, homeId, workId, path,
        looseMapGet(fresh?.points, homeId)?.location,
        looseMapGet(fresh?.points, workId)?.location);
      for (const item of Object.values(ledger.adjustments || {})) {
        if (item?.demolition && item.active === false && String(item.popId) === String(popId) &&
            String(item.residenceId) === String(homeId) && String(item.jobId) === String(workId)) {
          item.drivingPath = cloneJsonSafe(path);
          if (Number(route?.drivingDistance) > 0) item.drivingDistance = Number(route.drivingDistance);
          if (Number(route?.drivingSeconds) > 0) item.drivingSeconds = Number(route.drivingSeconds);
        }
      }
      attachLiveRoadPath(fresh, popId, homeId, workId, path);
      scheduleRoadLedgerSave();
      return path;
    })().catch(() => null).finally(() => {
      if (pendingNativeRestorationRoutes.get(key) === job) pendingNativeRestorationRoutes.delete(key);
    });
    pendingNativeRestorationRoutes.set(key, job);
    return job;
  }

  const nativeRoadRechecks = new Map();
  function scheduleNativeRoadRecheck(popId) {
    const id = String(popId);
    if (nativeRoadRechecks.has(id)) return;
    const city = currentCity(), epoch = lifecycleEpoch, saveKey = loadedLedgerKey;
    let attempt = 0;
    const delays = [0, 400, 1600, 5000];
    const check = async () => {
      if (city !== currentCity() || epoch !== lifecycleEpoch || saveKey !== loadedLedgerKey) {
        nativeRoadRechecks.delete(id); return;
      }
      const dd = api.gameState.getDemandData?.();
      const rec = restoredNativeAdjustment(id, dd);
      const live = looseMapGet(dd?.popsMap, id);
      if (!rec || !live) { nativeRoadRechecks.delete(id); return; }
      const home = looseMapGet(dd.points, rec.residenceId)?.location;
      const work = looseMapGet(dd.points, rec.jobId)?.location;
      const path = archivedRoadPath(id, rec.residenceId, rec.jobId, home, work) ||
        usefulRoadPath(rec.drivingPath, home, work);
      if (path) {
        const liveRoad = usefulRoadPath(live.drivingPath, home, work);
        if (!liveRoad || JSON.stringify(liveRoad) !== JSON.stringify(path))
          attachLiveRoadPath(dd, id, rec.residenceId, rec.jobId, path);
      } else {
        await ensureRestoredNativeRoadPath(city, id);
      }
      try { api.utils.getMap?.()?.triggerRepaint?.(); } catch {}
      attempt++;
      if (attempt < delays.length) nativeRoadRechecks.set(id, setTimeout(() => { void check(); }, delays[attempt]));
      else nativeRoadRechecks.delete(id);
    };
    nativeRoadRechecks.set(id, setTimeout(() => { void check(); }, delays[0]));
  }

  function createStreetRoutingEngine() {
    const GRID_M = 600;
    const MAX_SNAP_M = 1600;
    const MAX_TERMINAL_SPUR_M = 1100;
    const PLANNING_ACCESS_M = 1000;
    const MAX_SEARCH_NODES = 700000;
    const SEARCH_TIME_BUDGET_MS = 16000;
    const speedFor = (props = {}) => {
      const kind = String(props.highway || props.roadType || props.road_type ||
        props.class || props.type || "").toLowerCase();
      if (/^(motorway|freeway)/.test(kind)) return 100;
      if (/^(trunk)/.test(kind)) return 85;
      if (/^(primary)/.test(kind)) return 65;
      if (/^(secondary)/.test(kind)) return 55;
      if (/^(tertiary)/.test(kind)) return 45;
      if (/^(living_street|service|track)/.test(kind)) return 23;
      return 36;
    };
    const walkOnly = (props = {}) => /^(footway|path|cycleway|pedestrian|steps|bridleway)/.test(
      String(props.highway || props.roadType || props.road_type || props.class || props.type || "").toLowerCase()
    );
    const rad = Math.PI / 180;
    const validPosition = (p) => Array.isArray(p) && p.length >= 2 &&
      Number.isFinite(p[0]) && Number.isFinite(p[1]) &&
      Math.abs(p[0]) <= 180 && Math.abs(p[1]) <= 90;
    const dMeters = (a, b) => {
      const y = (a[1] + b[1]) * 0.5 * rad;
      return Math.hypot((a[0] - b[0]) * Math.cos(y) * 111320, (a[1] - b[1]) * 111132);
    };
    const heapPush = (a, item) => {
      a.push(item);
      let i = a.length - 1;
      while (i) {
        const parent = (i - 1) >> 1;
        if (a[parent][0] <= item[0]) break;
        a[i] = a[parent]; i = parent;
      }
      a[i] = item;
    };
    const heapPop = (a) => {
      const root = a[0];
      const tail = a.pop();
      if (!a.length) return root;
      let i = 0;
      while ((i * 2 + 1) < a.length) {
        let child = i * 2 + 1;
        if (child + 1 < a.length && a[child + 1][0] < a[child][0]) child++;
        if (a[child][0] >= tail[0]) break;
        a[i] = a[child]; i = child;
      }
      a[i] = tail;
      return root;
    };

    let loadedCity = "";
    let networkPromise = null;
    let networkRetryAfter = 0;
    let readyNetwork = null;
    const pointAccessCache = new Map();
    const routed = new Map();
    async function getRoadFeatures(city) {
      const path = `/data/${city}/roads.geojson`;
      if (typeof api.utils?.loadCityData === "function") {
        for (const name of [path, `${path}.gz`]) {
          try {
            const raw = await api.utils.loadCityData(name);
            const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
            if (Array.isArray(parsed?.features)) return { data: parsed };
            if (Array.isArray(parsed?.data?.features)) return { data: parsed.data };
          } catch {}
        }
      }
      let port;
      try { port = await window.electronAPI?.getDataServerPort?.(); }
      catch {}
      if (!(Number(port) > 0 && Number(port) < 65536)) return null;
      const base = `http://127.0.0.1:${Number(port)}${path}`;
      for (const candidate of [base + ".gz?useDownloaded=true", base + "?useDownloaded=true"]) {
        try {
          const response = await window.fetch(candidate);
          if (!response.ok) continue;
          let data;
          if (candidate.includes(".gz?")) {
            if (typeof DecompressionStream !== "function") continue;
            const body = new Response(await response.arrayBuffer()).body;
            if (!body) continue;
            data = JSON.parse(await new Response(body.pipeThrough(new DecompressionStream("gzip"))).text());
          } else {
            data = await response.json();
          }
          if (Array.isArray(data?.features)) return { data };
        } catch {}
      }
      return null;
    }
    async function buildNetwork(city) {
      const loaded = await getRoadFeatures(city);
      const geojson = loaded?.data;
      if (!Array.isArray(geojson?.features)) return null;
      const latitudes = geojson.features.slice(0, 150).flatMap((feature) => {
        const coords = feature?.geometry?.coordinates;
        if (!Array.isArray(coords)) return [];
        const p = feature.geometry.type === "MultiLineString" ? coords[0]?.[0] : coords[0];
        return validPosition(p) ? [p[1]] : [];
      });
      const centerLat = latitudes.length ? latitudes.reduce((a, b) => a + b, 0) / latitudes.length : 0;
      const scaleX = Math.max(10000, Math.cos(centerLat * rad) * 111320);
      const xy = (p) => [p[0] * scaleX, p[1] * 111132];
      const nodes = [];
      const parent = [];
      const rank = [];
      const rootOf = (i) => {
        while (parent[i] !== i) { parent[i] = parent[parent[i]]; i = parent[i]; }
        return i;
      };
      const connect = (a, b) => {
        let x = rootOf(a), y = rootOf(b);
        if (x === y) return;
        if (rank[x] < rank[y]) [x, y] = [y, x];
        parent[y] = x;
        if (rank[x] === rank[y]) rank[x]++;
      };
      const known = new Map();
      const cells = new Map();
      function addVertex(p) {
        const key = `${Math.round(p[0] * 1e7)}:${Math.round(p[1] * 1e7)}`;
        const existing = known.get(key);
        if (existing !== undefined) return existing;
        const id = nodes.length;
        const [x, y] = xy(p);
        nodes.push({ coord: [p[0], p[1]], x, y, edges: [], hasRoad: false, hasIncoming: false });
        parent.push(id);
        rank.push(0);
        known.set(key, id);
        const index = `${Math.floor(x / GRID_M)}:${Math.floor(y / GRID_M)}`;
        if (!cells.has(index)) cells.set(index, []);
        cells.get(index).push(id);
        return id;
      }
      for (let fi = 0; fi < geojson.features.length; fi++) {
        const feature = geojson.features[fi];
        if (walkOnly(feature?.properties)) continue;
        const geometry = feature?.geometry;
        if (!geometry || !Array.isArray(geometry.coordinates)) continue;
        const paths = geometry.type === "LineString" ? [geometry.coordinates] :
          geometry.type === "MultiLineString" ? geometry.coordinates : [];
        const speed = speedFor(feature.properties) / 3.6;
        const oneWay = String(feature.properties?.oneway ?? "").toLowerCase();
        const forward = oneWay !== "-1";
        const backward = !["yes", "true", "1"].includes(oneWay);
        for (const path of paths) {
          let previous = -1;
          for (const p of path) {
            if (!validPosition(p)) { previous = -1; continue; }
            const id = addVertex(p);
            if (previous !== -1 && previous !== id) {
              const length = dMeters(nodes[previous].coord, nodes[id].coord);
              if (length > 0.01 && length < 30000) {
                const from = nodes[previous].coord;
                const pieces = length > 1800 ? Math.ceil(length / 1100) : 1;
                let last = previous;
                for (let part = 1; part <= pieces; part++) {
                  const ratio = part / pieces;
                  const next = part === pieces ? id : addVertex([
                    from[0] + (p[0] - from[0]) * ratio,
                    from[1] + (p[1] - from[1]) * ratio
                  ]);
                  const segment = dMeters(nodes[last].coord, nodes[next].coord);
                  connect(last, next);
                  nodes[last].hasRoad = true;
                  nodes[next].hasRoad = true;
                  const edge = { meters: segment, seconds: segment / speed };
                  if (forward) {
                    nodes[last].edges.push({ ...edge, to: next });
                    nodes[next].hasIncoming = true;
                  }
                  if (backward) {
                    nodes[next].edges.push({ ...edge, to: last });
                    nodes[last].hasIncoming = true;
                  }
                  last = next;
                }
              }
            }
            previous = id;
          }
        }
        if (fi && fi % 3000 === 0) await new Promise((resolve) => setTimeout(resolve, 0));
      }
      if (!nodes.length) return null;

      function snapOptions(coord, direction = "either") {
        const [x, y] = xy(coord);
        const gx = Math.floor(x / GRID_M), gy = Math.floor(y / GRID_M);
        const byComponent = new Map();
        const max2 = MAX_SNAP_M * MAX_SNAP_M;
        for (let dx = -3; dx <= 3; dx++) for (let dy = -3; dy <= 3; dy++) {
          for (const id of cells.get(`${gx + dx}:${gy + dy}`) || []) {
            const node = nodes[id];
            if (!node.hasRoad || (direction === "start" && !node.edges.length) ||
                (direction === "target" && !node.hasIncoming)) continue;
            const d2 = (node.x - x) ** 2 + (node.y - y) ** 2;
            if (d2 >= max2) continue;
            const component = rootOf(id);
            const choices = byComponent.get(component) || [];
            const choice = { id, component, d2 };
            if (choices.length < 2) {
              choices.push(choice);
              choices.sort((a, b) => a.d2 - b.d2);
              byComponent.set(component, choices);
            } else if (d2 < choices[1].d2) {
              choices[1] = choice;
              choices.sort((a, b) => a.d2 - b.d2);
            }
          }
        }
        return [...byComponent.values()]
          .sort((a, b) => a[0].d2 - b[0].d2)
          .slice(0, 24).flat();
      }
      return { nodes, snapOptions, xy };
    }
    async function network(city) {
      if (city !== loadedCity) {
        loadedCity = city;
        networkPromise = null;
        networkRetryAfter = 0;
        readyNetwork = null;
        pointAccessCache.clear();
        routed.clear();
      }
      if (!networkPromise && Date.now() >= networkRetryAfter) {
        networkPromise = buildNetwork(city).catch(() => null).then((g) => {
          if (city === loadedCity) {
            readyNetwork = g;
            if (!g) {
              networkRetryAfter = Date.now() + 5000;
              networkPromise = null;
            }
          }
          return g;
        });
      }
      return networkPromise || Promise.resolve(null);
    }
    function planningReady(city) {
      return city === loadedCity && !!readyNetwork;
    }
    async function preparePlanning(city) {
      return !!(await network(city)) && planningReady(city);
    }
    function accessComponents(city, coord) {
      if (!planningReady(city) || !validPosition(coord)) return new Set();
      const key = `${Number(coord[0]).toFixed(7)}:${Number(coord[1]).toFixed(7)}`;
      if (pointAccessCache.has(key)) return pointAccessCache.get(key);
      const valid = new Set();
      for (const snap of readyNetwork.snapOptions(coord)) {
        if (snap.d2 <= PLANNING_ACCESS_M ** 2) valid.add(snap.component);
      }
      if (pointAccessCache.size > 50000) pointAccessCache.clear();
      pointAccessCache.set(key, valid);
      return valid;
    }
    function pointAccessible(city, coord) {
      return accessComponents(city, coord).size > 0;
    }
    function pairAccessible(city, origin, destination) {
      const from = accessComponents(city, origin);
      const to = accessComponents(city, destination);
      if (!from.size || !to.size) return false;
      for (const component of from) if (to.has(component)) return true;
      return false;
    }
    async function route(city, origin, destination) {
      if (!validPosition(origin) || !validPosition(destination)) return null;
      const cacheKey = `${city}/${origin.join(",")}/${destination.join(",")}`;
      if (routed.has(cacheKey)) return routed.get(cacheKey);
      const g = await network(city);
      if (!g) return null;
      const starts = g.snapOptions(origin, "start"), targets = g.snapOptions(destination, "target");
      if (!starts.length || !targets.length) return null;
      const nearbyStarts = starts.filter(start =>
        start.d2 <= MAX_TERMINAL_SPUR_M ** 2 &&
        targets.some(target => target.component === start.component &&
          target.d2 <= MAX_TERMINAL_SPUR_M ** 2));
      const nearbyTargets = targets.filter(target =>
        target.d2 <= MAX_TERMINAL_SPUR_M ** 2 &&
        nearbyStarts.some(start => start.component === target.component));
      if (!nearbyStarts.length || !nearbyTargets.length) return null;
      const { nodes } = g;
      const destinations = new Map();
      for (const target of nearbyTargets) {
        const existing = destinations.get(target.id);
        if (existing === undefined || target.d2 < existing) destinations.set(target.id, target.d2);
      }
      const [endX, endY] = g.xy(destination);
      const straightSeconds = id => {
        const node = nodes[id];
        return Math.max(0, Math.hypot(node.x - endX, node.y - endY) - MAX_TERMINAL_SPUR_M) / (110 / 3.6);
      };
      const best = new Map();
      const previous = new Map();
      const queue = [];
      for (const start of nearbyStarts) {
        const accessCost = Math.sqrt(start.d2) / 8;
        if (accessCost >= (best.get(start.id) ?? Infinity)) continue;
        best.set(start.id, accessCost);
        heapPush(queue, [accessCost + straightSeconds(start.id), accessCost, start.id]);
      }
      // Longer routes can require substantially more exploration; yield regularly
      // so this work does not block map interactions.
      const directDistance = dMeters(origin, destination);
      const budgetMs = Math.min(SEARCH_TIME_BUDGET_MS, Math.max(3000, directDistance / 2.5));
      const visitLimit = Math.min(MAX_SEARCH_NODES, Math.max(250000, 250000 + Math.round(directDistance * 6)));
      const deadline = Date.now() + budgetMs;
      let visited = 0;
      while (queue.length && visited++ < visitLimit) {
        if (visited % 512 === 0) {
          if (Date.now() > deadline) break;
          await new Promise(resolve => setTimeout(resolve, 0));
        }
        const [, cost, id] = heapPop(queue);
        if (cost > (best.get(id) ?? Infinity) + 0.0001) continue;
        if (destinations.has(id)) {
          const chain = [id];
          let node = id;
          while (previous.has(node)) {
            node = previous.get(node);
            if (chain.length > nodes.length) return null;
            chain.push(node);
          }
          chain.reverse();
          if (chain.length < 2) continue;
          const geometry = [origin, ...chain.map(j => nodes[j].coord), destination];
          const compact = geometry.filter((point, i) => !i || dMeters(point, geometry[i - 1]) > 0.4);
          if (compact.length < 3) continue;
          const checked = cleanOwnedRoadGeometry(compact, origin, destination);
          if (!checked) continue;
          const access = dMeters(origin, nodes[chain[0]].coord) + dMeters(nodes[id].coord, destination);
          let length = access;
          for (let i = 1; i < chain.length; i++)
            length += dMeters(nodes[chain[i - 1]].coord, nodes[chain[i]].coord);
          const result = {
            drivingPath: checked,
            drivingDistance: Math.round(length),
            drivingSeconds: Math.round(cost + dMeters(nodes[id].coord, destination) / 8),
          };
          if (routed.size > 500) routed.clear();
          routed.set(cacheKey, result);
          return result;
        }
        for (const edge of nodes[id].edges) {
          const next = cost + edge.seconds;
          if (next + 0.0001 >= (best.get(edge.to) ?? Infinity)) continue;
          best.set(edge.to, next);
          previous.set(edge.to, id);
          heapPush(queue, [next + straightSeconds(edge.to), next, edge.to]);
        }
      }
      return null;
    }
    return { route, preparePlanning, planningReady, pointAccessible, pairAccessible };
  }
  const streetRoutes = createStreetRoutingEngine();
  function roadAccessibleForPlanning(location) {
    return !streetRoutes.planningReady(currentCity()) || streetRoutes.pointAccessible(currentCity(), location);
  }

  async function queryDrivingRoute(dd, residenceId, jobId) {
    const residence = looseMapGet(dd?.points, residenceId);
    const job = looseMapGet(dd?.points, jobId);
    const home = residence?.location, work = job?.location;
    if (!Array.isArray(home) || !Array.isArray(work)) return null;
    const city = currentCity();
    const key = `${lifecycleEpoch}/${city}/${home.join(",")}/${work.join(",")}`;
    const cached = roadPairQueries.get(key);
    if (cached) return cached;
    const task = (async () => {
      const local = await streetRoutes.route(city, home, work);
      const checkedLocal = cleanOwnedRoadGeometry(local?.drivingPath, home, work);
      const localResult = checkedLocal && Number(local?.drivingSeconds) > 0 && Number(local?.drivingDistance) > 0
        ? { ...local, drivingPath: checkedLocal, roadGraphVerified: true } : null;
      if (!localResult || suspiciouslyStraightRoad(checkedLocal, home, work)) {
        if (typeof api.map?.queryRoute === "function") {
          try {
            const raw = await api.map.queryRoute(city, home, work);
            const checked = usefulRoadPath(raw?.drivingPath, home, work);
            if (checked && Number(raw?.drivingSeconds) > 0 && Number(raw?.drivingDistance) > 0)
              return { drivingSeconds: Number(raw.drivingSeconds), drivingDistance: Number(raw.drivingDistance), drivingPath: checked };
          } catch {}
        }
      }
      return localResult;

    })();
    roadPairQueries.set(key, task);
    if (roadPairQueries.size > 400) roadPairQueries.delete(roadPairQueries.keys().next().value);
    void task.then(result => {
      if (!result && roadPairQueries.get(key) === task) roadPairQueries.delete(key);
    }).catch(() => {
      if (roadPairQueries.get(key) === task) roadPairQueries.delete(key);
    });
    return task;
  }

  const roadPairQueries = new Map();
  const reviewedRoadRoutes = new Map();
  function reviewedRouteKey(city, dd, residenceId, jobId) {
    const home = looseMapGet(dd?.points, residenceId)?.location;
    const work = looseMapGet(dd?.points, jobId)?.location;
    return Array.isArray(home) && Array.isArray(work) ? `${lifecycleEpoch}/${city}/${home.join(",")}/${work.join(",")}` : null;
  }
  function warmReviewedRoadRoutes(plan) {
    if (!plan?.ok || !plan.addedPops?.length) return;
    const city = currentCity(), epoch = lifecycleEpoch;
    const pairs = [...new Map(plan.addedPops.map(pop =>
      [reviewedRouteKey(city, plan.planned, pop.residenceId, pop.jobId), pop]
    ).filter(([key]) => key)).values()];
    let next = 0;
    const worker = async () => {
      while (next < pairs.length && epoch === lifecycleEpoch && city === currentCity()) {
        const pop = pairs[next++];
        const key = reviewedRouteKey(city, plan.planned, pop.residenceId, pop.jobId);
        try {
          const route = await queryDrivingRoute(plan.planned, pop.residenceId, pop.jobId);
          if (route?.drivingPath && epoch === lifecycleEpoch && city === currentCity()) {
            reviewedRoadRoutes.set(key, route);
            if (reviewedRoadRoutes.size > 400)
              reviewedRoadRoutes.delete(reviewedRoadRoutes.keys().next().value);
          }
        } catch {}
      }
    };
    for (let i = 0; i < Math.min(2, pairs.length); i++) void worker();
  }

  function preparePopAdditions(plan) {
    const city = currentCity();
    return plan.addedPops.map((pop) => {
      const planned = looseMapGet(plan.planned?.popsMap, pop.id) || pop;
      const addition = { residenceId: pop.residenceId, jobId: pop.jobId, size: pop.size };
      const route = reviewedRoadRoutes.get(reviewedRouteKey(city, plan.planned, pop.residenceId, pop.jobId)) || null;
      const seconds = Number(route?.drivingSeconds || planned.drivingSeconds);
      const distance = Number(route?.drivingDistance || planned.drivingDistance);
      if (seconds > 0 && distance > 0) {
        addition.drivingSeconds = seconds;
        addition.drivingDistance = distance;
      }
      return { addition, route };
    });
  }

  const pendingPopRoads = new Map();
  let roadSaveTimer = null;
  function scheduleRoadLedgerSave() {
    if (roadSaveTimer !== null) clearTimeout(roadSaveTimer);
    roadSaveTimer = setTimeout(() => {
      roadSaveTimer = null;
      void saveLedger();
    }, 300);
  }
  function applyRoadMetricsWithoutRebuildingPops(dd, id, rec, route) {
    const seconds = Math.round(Number(route?.drivingSeconds));
    const meters = Math.round(Number(route?.drivingDistance));
    if (!(seconds > 0 && meters > 0)) return;
    rec.drivingSeconds = seconds;
    rec.drivingDistance = meters;
    rec.roadMetricsVerified = true;
    const live = looseMapGet(dd?.popsMap, id);
    if (!live || String(live.residenceId) !== String(rec.residenceId) ||
        String(live.jobId) !== String(rec.jobId)) return;
    live.drivingSeconds = seconds;
    live.drivingDistance = meters;
  }

  function needsOwnedRoadRoute(id) {
    const rec = ledger.pops?.[String(id)];
    if (!rec || rec.active === false) return false;
    const dd = api.gameState.getDemandData?.();
    const path = checkedPopRoadPath(dd, rec, rec.drivingPath);
    if (!path || !rec.roadMetricsVerified) return true;
    const home = looseMapGet(dd?.points, rec.residenceId)?.location;
    const work = looseMapGet(dd?.points, rec.jobId)?.location;
    return !rec.straightRoadReviewed && suspiciouslyStraightRoad(path, home, work);
  }

  function ensureOwnedRoadPath(city, popId) {
    if (city !== currentCity()) return Promise.resolve(null);
    const rec = ledger.pops?.[popId];
    if (!rec || rec.active === false) return Promise.resolve(null);
    const demand = api.gameState.getDemandData?.();
    const previous = checkedPopRoadPath(demand, rec, rec.drivingPath);
    const home = looseMapGet(demand?.points, rec.residenceId)?.location;
    const work = looseMapGet(demand?.points, rec.jobId)?.location;
    const questionable = !!previous && !rec.straightRoadReviewed && suspiciouslyStraightRoad(previous, home, work);
    if (previous && !questionable && rec.roadMetricsVerified) {
      attachLiveRoadPath(demand, popId, rec.residenceId, rec.jobId, previous);
      applyRoadMetricsWithoutRebuildingPops(demand, popId, rec, rec);
      return Promise.resolve(previous);
    }
    const key = `${city}/${popId}`;
    if (pendingPopRoads.has(key)) return pendingPopRoads.get(key);
    const saveKey = loadedLedgerKey;
    const epoch = lifecycleEpoch;
    const residenceId = rec.residenceId, jobId = rec.jobId;
    const job = (async () => {
      const route = await queryDrivingRoute(api.gameState.getDemandData?.(), residenceId, jobId);
      if (city !== currentCity() || loadedLedgerKey !== saveKey || lifecycleEpoch !== epoch) return null;
      const current = ledger.pops?.[popId];
      if (!current || current.active === false || String(current.residenceId) !== String(residenceId) ||
          String(current.jobId) !== String(jobId)) return null;
      const freshDemand = api.gameState.getDemandData?.();
      const path = checkedPopRoadPath(freshDemand, current, route?.drivingPath);
      const straight = path && suspiciouslyStraightRoad(path,
        looseMapGet(freshDemand?.points, residenceId)?.location,
        looseMapGet(freshDemand?.points, jobId)?.location);
      if (straight && !route?.roadGraphVerified) return null;
      if (!path) {
        if (previous && !questionable) return previous;
        return null;
      }
      current.drivingPath = cloneJsonSafe(path);
      current.straightRoadReviewed = !!route?.roadGraphVerified;
      attachLiveRoadPath(freshDemand, popId, residenceId, jobId, path);
      pendingRouteVisuals.done(popId);
      applyRoadMetricsWithoutRebuildingPops(freshDemand, popId, current, route);
      scheduleRoadLedgerSave();
      return path;
    })().catch(() => previous && !questionable ? previous : null)
      .finally(() => { if (pendingPopRoads.get(key) === job) pendingPopRoads.delete(key); });
    pendingPopRoads.set(key, job);
    return job;
  }

  const managedLineDisplay = (() => {
    const SOURCE = "demand-developer-road-repair-source";
    const LAYER = "demand-developer-road-repair-lines";
    const IDENTIFIERS = ["popId", "popID", "pop_id", "popid", "commuterId", "commuter_id",
      "tripId", "trip_id", "commuteId", "commute_id", "connectionId", "connection_id", "id"];
    const visible = new Map();
    const managed = new Map();
    const guarded = new Map();
    const failedNativeAttempts = new Map();
    let map = null, timer = null, listening = false;
    const clone = value => value == null ? null : JSON.parse(JSON.stringify(value));
    const equals = (a, b) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
    const routeLayers = m => (m.getStyle?.()?.layers || []).filter(layer => layer.type === "line" &&
      /(demand|commut|pop|trip|driving|connection|journey|path|flow)/i.test(
        `${layer.id || ""} ${layer.source || ""}`) && !/^demand-developer-/i.test(layer.id || ""));
    function restoreFilter(layerId, state) {
      if (!state?.map?.getLayer?.(layerId)) return;
      try {
        if (equals(state.map.getFilter?.(layerId), state.applied))
          state.map.setFilter(layerId, state.original);
      } catch {}
    }
    function detach() {
      if (listening && map) for (const event of ["styledata", "moveend"]) {
        try { map.off?.(event, onMapUpdate); } catch {}
      }
      listening = false;
    }
    function clearMap() {
      detach();
      for (const [id, state] of guarded) restoreFilter(id, state);
      guarded.clear();
      if (map) {
        try { if (map.getLayer?.(LAYER)) map.removeLayer(LAYER); } catch {}
        try { if (map.getSource?.(SOURCE)) map.removeSource(SOURCE); } catch {}
      }
      visible.clear();
    }
    function stop() {
      if (timer !== null) clearTimeout(timer);
      timer = null;
      clearMap();
      map = null;
      managed.clear();
      failedNativeAttempts.clear();
    }
    function ensureMap() {
      const next = api.utils.getMap?.();
      if (next !== map) { clearMap(); map = next || null; }
      if (map && !listening) {
        try { for (const event of ["styledata", "moveend"]) map.on?.(event, onMapUpdate); listening = true; }
        catch {}
      }
      return map;
    }
    function schedule(ms = 180) {
      if (timer != null || !managed.size) return;
      timer = setTimeout(() => { timer = null; audit([...managed.keys()].slice(0, 64)); }, ms);
    }
    function onMapUpdate() { schedule(180); }
    function managedRecord(dd, id) {
      const owned = ledger.pops?.[id];
      if (owned?.active !== false && owned) return owned;
      return restoredNativeAdjustment(id, dd);
    }
    function validManaged(dd, id) {
      const rec = managedRecord(dd, id);
      const live = looseMapGet(dd?.popsMap, id);
      return rec && live && String(rec.residenceId) === String(live.residenceId) &&
        String(rec.jobId) === String(live.jobId) ? rec : null;
    }
    function road(dd, id, rec) {
      const home = looseMapGet(dd?.points, rec.residenceId)?.location;
      const work = looseMapGet(dd?.points, rec.jobId)?.location;
      return archivedRoadPath(id, rec.residenceId, rec.jobId, home, work) ||
        (rec.straightRoadReviewed && rec.roadMetricsVerified
          ? cleanOwnedRoadGeometry(rec.drivingPath, home, work) : null) ||
        usefulRoadPath(rec.drivingPath, home, work);
    }
    function pathOverlay(m) {
      if (!m?.addSource || !m?.addLayer || !m?.getSource || !m?.getLayer) return false;
      try {
        if (!m.getSource(SOURCE)) m.addSource(SOURCE, {
          type: "geojson", data: {type: "FeatureCollection", features: []}
        });
        if (!m.getLayer(LAYER)) {
          const sample = [...guarded.keys()].find(id => m.getLayer?.(id));
          const paint = {};
          for (const key of ["line-color", "line-width", "line-opacity", "line-dasharray"]) {
            try { const val = sample && m.getPaintProperty?.(sample, key); if (val != null) paint[key] = clone(val); }
            catch {}
          }
          if (!paint["line-color"]) paint["line-color"] = "#7894a8";
          if (!paint["line-width"]) paint["line-width"] = 2;
          m.addLayer({id: LAYER, type: "line", source: SOURCE, paint});
        }
        return true;
      } catch { return false; }
    }
    function syncOverlay(m) {
      if (!visible.size && !m?.getSource?.(SOURCE)) return;
      if (!pathOverlay(m)) return;
      try {
        m.getSource(SOURCE).setData({type: "FeatureCollection", features: [...visible].map(([id, rec]) => ({
          type: "Feature", id, properties: {...rec.properties, popId: id},
          geometry: {type: "LineString", coordinates: rec.path}
        }))});
        syncOverlayVisibility(m);
        m.triggerRepaint?.();
      } catch {}
    }
    function syncOverlayVisibility(m) {
      if (!m?.getLayer?.(LAYER) || !m?.setLayoutProperty) return;
      const show = [...guarded.keys()].some(id => m.getLayer?.(id) &&
        m.getLayoutProperty?.(id, "visibility") !== "none");
      const desired = show ? "visible" : "none";
      try {
        if (m.getLayoutProperty?.(LAYER, "visibility") !== desired)
          m.setLayoutProperty(LAYER, "visibility", desired);
      } catch {}
    }
    function guardFilter(base, ids) {
      if (!ids.length) return base;
      const exclusions = [...IDENTIFIERS, "@feature"].map(key => ["!", ["in", ["to-string",
        key === "@feature" ? ["id"] : ["get", key]], ["var", "dd_hidden"]]]);
      return ["all", ...(base ? [base] : []), ["let", "dd_hidden", ["literal", ids],
        ["all", ...exclusions]]];
    }
    function protect(m, layers) {
      const ids = [...managed.keys()];
      const present = new Set(layers.map(layer => layer.id));
      for (const [id, state] of [...guarded]) if (!present.has(id) || state.map !== m) {
        restoreFilter(id, state); guarded.delete(id);
      }
      for (const layer of layers) {
        let state = guarded.get(layer.id);
        const current = clone(m.getFilter?.(layer.id) ?? null);
        if (!state) {
          state = {map: m, original: current, applied: current};
          guarded.set(layer.id, state);
        } else if (!equals(current, state.applied)) {
          state.original = current;
          state.applied = current;
        }
        const next = guardFilter(state.original, ids);
        if (!equals(next, state.applied)) {
          try { m.setFilter(layer.id, next); state.applied = clone(next); }
          catch { guarded.delete(layer.id); }
        }
      }
    }
    function refreshVisible(dd) {
      let changed = false;
      for (const [id, city] of managed) {
        const rec = validManaged(dd, id);
        const path = rec && road(dd, id, rec);
        const previous = visible.get(id);
        if (!path || city !== currentCity()) {
          if (visible.delete(id)) changed = true;
          continue;
        }
        const live = looseMapGet(dd.popsMap, id);
        const properties = {popId: id, id, kind: "road", size: Number(live?.size) || 0,
          residenceId: String(rec.residenceId), jobId: String(rec.jobId)};
        if (!previous || !equals(previous.path, path) || !equals(previous.properties, properties)) {
          visible.set(id, {path: clone(path), properties});
          changed = true;
        }
      }
      for (const id of [...visible.keys()]) {
        if (!managed.has(id)) {visible.delete(id); changed = true;}
      }
      return changed;
    }
    function audit(ids) {
      const dd = api.gameState.getDemandData?.();
      if (!dd?.popsMap || !dd.points) return;
      const city = currentCity();
      for (const id of ids.map(String)) {
        if (validManaged(dd, id)) managed.set(id, city);
      }
      let changed = false;
      for (const [id, tag] of [...managed]) {
        const rec = validManaged(dd, id);
        if (tag !== city || !rec) {
          managed.delete(id);
          if (visible.delete(id)) changed = true;
          failedNativeAttempts.delete(id);
        }
      }
      for (const id of ids.map(String)) {
        const rec = validManaged(dd, id);
        if (!rec) continue;
        const path = road(dd, id, rec);
        const live = looseMapGet(dd.popsMap, id);
        const home = looseMapGet(dd.points, rec.residenceId)?.location;
        const work = looseMapGet(dd.points, rec.jobId)?.location;
        if (path && !equals(usefulRoadPath(live?.drivingPath, home, work), path))
          attachLiveRoadPath(dd, id, rec.residenceId, rec.jobId, path);
        else if (!path) {
          const owned = ledger.pops?.[id];
          if (owned?.active !== false && owned) {
            if ((routeFailures.get(id) || 0) <= 2) queueRoadWork([id]);
          } else {
            const failure = failedNativeAttempts.get(id);
            if (!failure || (failure.count < 3 && Date.now() - failure.at > 15000)) {
              failedNativeAttempts.set(id, {count: (failure?.count || 0) + 1, at: Date.now()});
              void ensureRestoredNativeRoadPath(city, id).then(result => {
                if (result) {failedNativeAttempts.delete(id); audit([id]);}
              });
            }
          }
        }
      }
      const m = ensureMap();
      if (!m?.getStyle || !m?.setFilter) return;
      let layers = [];
      try { layers = routeLayers(m); } catch { return; }
      if (!layers.length) return;
      protect(m, layers);
      if (refreshVisible(dd) || changed || (visible.size && (!m.getLayer?.(LAYER) || !m.getSource?.(SOURCE))))
        syncOverlay(m);
      else if (visible.size) syncOverlayVisibility(m);
    }
    function mark(ids) {
      const city = currentCity();
      for (const raw of ids || []) managed.set(String(raw), city);
      const m = ensureMap();
      if (m?.getStyle && m?.setFilter) {
        try { protect(m, routeLayers(m)); } catch {}
      }
      schedule(0);
    }
    function done(id) {
      if (!managed.has(String(id))) return;
      audit([String(id)]);
    }
    return {pending: {mark, done, stop}, visuals: {audit, stop}};
  })();
  const pendingRouteVisuals = managedLineDisplay.pending;
  const straightRouteVisuals = managedLineDisplay.visuals;
  try { window.__demandDeveloperStopPendingVisuals?.(); } catch {}
  try { window.__demandDeveloperStopStraightRouteVisuals?.(); } catch {}
  try { window.__demandDeveloperStopPendingVisuals = pendingRouteVisuals.stop; } catch {}
  try { window.__demandDeveloperStopStraightRouteVisuals = straightRouteVisuals.stop; } catch {}

  let managedRoadAuditCursor=0;
  function auditStraightManagedRoutes(prioritized=null) {
    if (!demandReady || !loadedLedgerKey || uiStore.get().busy || internalDemandMutationDepth>0) return;
    const ids=prioritized?.length ? [...new Set(prioritized.map(String))] : (()=>{
      const all=new Set(Object.entries(ledger.pops || {}).filter(([,rec])=>rec?.active!==false).map(([id])=>id));
      for (const rec of Object.values(ledger.adjustments || {}))
        if (rec?.demolition && rec.active===false) all.add(String(rec.popId));
      const keys=[...all];
      if (!keys.length) return [];
      const sample=[];
      for (let i=0;i<12 && i<keys.length;i++) sample.push(keys[(managedRoadAuditCursor+i)%keys.length]);
      managedRoadAuditCursor=(managedRoadAuditCursor+sample.length)%keys.length;
      return sample;
    })();
    if (ids.length) straightRouteVisuals.audit(ids);
  }

  let roadWorkGeneration = 0;
  let roadWorkTimer = null;
  let roadWorkActive = 0;
  const MAX_PARALLEL_ROAD_WORK = 2;
  const roadWorkIds = [];
  const roadWorkQueued = new Set();
  const roadWorkRunning = new Set();
  const routeFailures = new Map();

  function stopRoadWork() {
    roadWorkGeneration++;
    pendingPopRoads.clear();
    pendingNativeRestorationRoutes.clear();
    roadPairQueries.clear();
    reviewedRoadRoutes.clear();
    if (roadWorkTimer !== null) clearTimeout(roadWorkTimer);
    roadWorkTimer = null;
    roadWorkIds.length = 0;
    roadWorkQueued.clear();
    roadWorkRunning.clear();
    routeFailures.clear();
    pendingRouteVisuals.stop();
    roadWorkActive = 0;
  }
  function queueRoadWork(ids) {
    if (!Array.isArray(ids)) return;
    for (const raw of ids) {
      const id = String(raw);
      if (roadWorkQueued.has(id) || roadWorkRunning.has(id) || !needsOwnedRoadRoute(id)) continue;
      roadWorkIds.push(id);
      roadWorkQueued.add(id);
    }
    scheduleRoadWork();
  }
  function scheduleRoadWork(delay = 750) {
    if (roadWorkTimer !== null || roadWorkActive >= MAX_PARALLEL_ROAD_WORK || !roadWorkIds.length) return;
    const generation = roadWorkGeneration;
    roadWorkTimer = setTimeout(() => {
      roadWorkTimer = null;
      if (generation === roadWorkGeneration) void processRoadWork(generation);
    }, delay);
  }
  function retryRoadWork(id, generation, city, saveKey) {
    const attempts = (routeFailures.get(id) || 0) + 1;
    routeFailures.set(id, attempts);
    if (attempts <= 5) {
      const delays = [5000, 20000, 60000, 120000, 240000];
      setTimeout(() => {
        if (generation === roadWorkGeneration && city === currentCity() && saveKey === loadedLedgerKey)
          queueRoadWork([id]);
      }, delays[attempts - 1]);
    } else {
      pendingRouteVisuals.done(id);
    }
  }

  async function processRoadWork(generation) {
    if (generation !== roadWorkGeneration || roadWorkActive >= MAX_PARALLEL_ROAD_WORK || !roadWorkIds.length) return;
    if (!demandReady || !loadedLedgerKey || uiStore.get().busy) {
      scheduleRoadWork(1100); return;
    }
    const id = roadWorkIds.shift();
    roadWorkQueued.delete(id);
    if (!needsOwnedRoadRoute(id)) { scheduleRoadWork(250); return; }
    roadWorkActive++;
    roadWorkRunning.add(id);
    scheduleRoadWork(0);
    const city = currentCity(), saveKey = loadedLedgerKey, epoch = lifecycleEpoch;
    try {
      const path = await ensureOwnedRoadPath(city, id);
      if (generation !== roadWorkGeneration || city !== currentCity() ||
          saveKey !== loadedLedgerKey || epoch !== lifecycleEpoch) return;
      if (path && !needsOwnedRoadRoute(id)) {
        void saveLedger();
        routeFailures.delete(id);
      } else {
        retryRoadWork(id, generation, city, saveKey);
      }
    } catch {
      if (generation === roadWorkGeneration && city === currentCity() && saveKey === loadedLedgerKey)
        retryRoadWork(id, generation, city, saveKey);
    } finally {
      if (generation === roadWorkGeneration) {
        roadWorkActive--;
        roadWorkRunning.delete(id);
        scheduleRoadWork(100);
      }
    }
  }

  function resumeRoadWork() {
    queueRoadWork(Object.keys(ledger.pops || {}));
  }
  try { window.__demandDeveloperStopRoadWork?.(); } catch {}
  try { window.__demandDeveloperStopRoadWork = stopRoadWork; } catch {}

  function installOwnedPopPathProvider() {
    if (typeof window.fetch !== "function") return;
    const provider = async (city, popId) => {
      if (city !== currentCity()) return null;
      const rec = ledger.pops?.[popId];
      if (rec?.active !== false && rec) return ensureOwnedRoadPath(city, popId);
      return ensureRestoredNativeRoadPath(city, popId);
    };

    const bridgeKey = "__demandDeveloperRouteBridge";
    const existing = window[bridgeKey];
    const bridge = existing?.installed ? existing : { installed: true };
    bridge.provider = provider;
    bridge.isOwned = (city, popId) => city === currentCity() && (
      (!!ledger.pops?.[popId] && ledger.pops[popId].active !== false) ||
      !!restoredNativeAdjustment(popId));
    if (window.fetch === bridge.fetchWrapper) return;
    const originalFetch = window.fetch.bind(window);

    function parseCommuterPathRequest(input) {
      const url = typeof input === "string" ? input :
        (typeof URL !== "undefined" && input instanceof URL) ? input.href : input?.url || "";
      if (!url || typeof url !== "string") return null;
      const match = /^map:\/\/paths\/([^/?#]+)\/([^/?#]+)(?:[?#].*)?$/i.exec(url);
      if (match) {
        try { return { city: decodeURIComponent(match[1]), popId: decodeURIComponent(match[2]) }; }
        catch { return null; }
      }
      try {
        const parsed = new URL(url);
        const isLocal = /^(127\.0\.0\.1|localhost|\[::1\])$/i.test(parsed.hostname);
        if (!isLocal || !/^\/path\/?$/i.test(parsed.pathname)) return null;
        const city = parsed.searchParams.get("cityCode");
        const popId = parsed.searchParams.get("popId");
        return city && popId ? { city, popId } : null;
      } catch { return null; }
    }

    const patchedFetch = async (input, init) => {
      const request = parseCommuterPathRequest(input);
      if (!request) return originalFetch(input, init);
      if (!request.popId.startsWith("mod-pop-") && !restoredNativeAdjustment(request.popId)) {
        const response = await originalFetch(input, init);
        if (response?.ok) {
          void response.clone().json().then(payload => {
            const coordinates = payload?.coordinates || payload?.drivingPath;
            if (Array.isArray(coordinates)) observeNativeRoadPath(request.popId, coordinates);
          }).catch(() => {});
        }
        return response;
      }
      if (!bridge.isOwned?.(request.city, request.popId)) {
        return originalFetch(input, init);
      }
      let path = null;
      try { path = await bridge.provider?.(request.city, request.popId); }
      catch {}
      if (validRoutePath(path) && path.length > 2) {
        return new Response(JSON.stringify({ coordinates: path }), {
          status: 200,
          headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
        });
      }
      // A built-in path may still be available even when routing is offline.
      // Accept it only after checking the actual endpoints and road geometry.
      let nativeResponse = null;
      try { nativeResponse = await originalFetch(input, init); } catch {}
      if (nativeResponse?.ok) {
        let payload = null;
        try { payload = await nativeResponse.clone().json(); } catch {}
        const nativePath = payload?.coordinates || payload?.drivingPath;
        const dd = api.gameState.getDemandData?.();
        const rec = ledger.pops?.[request.popId] || restoredNativeAdjustment(request.popId, dd);
        const home = looseMapGet(dd?.points, rec?.residenceId)?.location;
        const work = looseMapGet(dd?.points, rec?.jobId)?.location;
        const checked = usefulRoadPath(nativePath, home, work);
        if (checked && rec) {
          archiveRoadPath(request.popId, rec.residenceId, rec.jobId, checked, home, work);
          rec.drivingPath = cloneJsonSafe(checked);
          attachLiveRoadPath(dd, request.popId, rec.residenceId, rec.jobId, checked);
          scheduleRoadLedgerSave();
          straightRouteVisuals.audit([request.popId]);
          return new Response(JSON.stringify({ coordinates: checked }), {
            status: 200, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
          });
        }
      }
      // Never pass an unresolved, two-point fallback through as a road route.
      return new Response(null, { status: 503, headers: { "Cache-Control": "no-store" } });
    };
    bridge.fetchWrapper = patchedFetch;
    window[bridgeKey] = bridge;
    window.fetch = patchedFetch;
  }

  const routeWatchToken = {};
  try { window.__demandDeveloperRouteWatchToken = routeWatchToken; } catch {}
  const routeWatch = setInterval(() => {
    if (window.__demandDeveloperRouteWatchToken !== routeWatchToken) {
      clearInterval(routeWatch);
      straightRouteVisuals.stop();
      return;
    }
    auditStraightManagedRoutes();
    const bridge = window.__demandDeveloperRouteBridge;
    if (typeof window.fetch === "function" && window.fetch !== bridge?.fetchWrapper)
      installOwnedPopPathProvider();
  }, 2500);

  function applyPlan(plan) {
    if (!api.demand) return { ok: false, error: "Subway Builder demand editor API is unavailable." };
    const ledgerBefore = cloneLedgerState();
    const addedPointIds = [];
    const addedPopIds = [];
    for (const p of plan.addedPoints) {
      const r = api.demand.addDemandPoint({ id: p.id, location: p.location });
      if (!r.success) {
        const rb = rollbackDemandSnapshot(plan.before, ledgerBefore);
        return { ok: false, rollbackOk: rb.ok, error: (r.error || "addDemandPoint failed") + (rb.ok ? "" : `; rollback failed: ${rb.errors.join("; ")}`) };
      }
      if (r.pointId !== p.id) {
        const rb = rollbackDemandSnapshot(plan.before, ledgerBefore);
        return { ok: false, rollbackOk: rb.ok, error: `Demand API changed requested point id (${p.id} -> ${r.pointId}); refusing unsafe apply.` + (rb.ok ? "" : ` Rollback failed: ${rb.errors.join("; ")}`) };
      }
      addedPointIds.push(r.pointId);
    }
    if (plan.addedPops.length) {
      const prepared = preparePopAdditions(plan);
      const additions = prepared.map((item) => item.addition);
      const r = api.demand.addPops(additions);
      if (!r.success) {
        const rb = rollbackDemandSnapshot(plan.before, ledgerBefore);
        return { ok: false, rollbackOk: rb.ok, error: (r.error || "addPops failed") + (rb.ok ? "" : `; rollback failed: ${rb.errors.join("; ")}`) };
      }
      if (!Array.isArray(r.popIds) || r.popIds.length !== additions.length) {
        const actualIds = Array.isArray(r.popIds) ? r.popIds : [];
        const rb = rollbackDemandSnapshot(plan.before, ledgerBefore);
        return { ok: false, rollbackOk: rb.ok, error: `Demand API returned ${actualIds.length} pop ids for ${additions.length} additions.` + (rb.ok ? "" : ` Rollback failed: ${rb.errors.join("; ")}`) };
      }
      addedPopIds.push(...r.popIds);
      pendingRouteVisuals.mark(r.popIds);
      const addedLiveDemand = api.gameState.getDemandData?.();
      for (let i = 0; i < r.popIds.length; i++) {
        const route = prepared[i]?.route;
        const addition = additions[i];
        if (route?.drivingPath) {
          attachLiveRoadPath(addedLiveDemand, r.popIds[i], addition.residenceId, addition.jobId, route.drivingPath);
        }
      }
      const provisional = plan.addedPops.map((p) => p.id);
      for (let i = 0; i < provisional.length; i++) {
        const rec = plan.ledgerAfter.pops[provisional[i]];
        if (!rec) continue;
        const route = prepared[i]?.route;
        if (route) {
          rec.drivingSeconds = route.drivingSeconds;
          rec.drivingDistance = route.drivingDistance;
          if (route.drivingPath) {
            rec.drivingPath = cloneJsonSafe(route.drivingPath);
            rec.roadMetricsVerified = true;
            rec.straightRoadReviewed = true;
          }
        }
        delete plan.ledgerAfter.pops[provisional[i]];
        plan.ledgerAfter.pops[addedPopIds[i]] = rec;
      }
    }
    const reverseUpdates = [];
    if (plan.updatedPops?.length) {
      const updates = plan.updatedPops.map((item) => ({ id: item.id, size: item.afterSize }));
      reverseUpdates.push(...plan.updatedPops.map((item) => ({ id: item.id, size: item.beforeSize })));
      let r = null;
      try { r = api.demand.updatePops(updates); } catch (e) { r = { success: false, error: String(e) }; }
      if (!r?.success) {
        const rb = rollbackDemandSnapshot(plan.before, ledgerBefore);
        return { ok: false, rollbackOk: rb.ok, error: (r?.error || "updatePops failed") + (rb.ok ? "" : `; rollback failed: ${rb.errors.join("; ")}`) };
      }
    }

    const liveAfter = api.gameState.getDemandData();
    for (const id of addedPopIds) {
      const rec = plan.ledgerAfter.pops?.[String(id)];
      if (rec?.drivingPath) attachLiveRoadPath(liveAfter, id, rec.residenceId, rec.jobId, rec.drivingPath);
    }
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
        const ledgerRec = plan.ledgerAfter.pops?.[String(id)] ?? plan.ledgerAfter.pops?.[id];
        if (ledgerRec && livePop) capturePopRuntimeIntoRecord(ledgerRec, livePop);
        if (!endpointsMatch || !sizeMatch || !attached) {
          popAuditError = `commuter ${id} is missing, detached, or does not match the requested flow`;
          break;
        }
      }
    }
    let updateAuditError = null;
    if (!popAuditError && liveAfter?.popsMap) {
      for (const item of plan.updatedPops || []) {
        const livePop = looseMapGet(liveAfter.popsMap, item.id);
        const endpointsMatch = !!livePop &&
          String(livePop.residenceId || "") === String(item.residenceId || "") &&
          String(livePop.jobId || "") === String(item.jobId || "");
        const sizeMatch = !!livePop && Math.abs((Number(livePop.size) || 0) - (Number(item.afterSize) || 0)) < 0.001;
        const residencePoint = looseMapGet(liveAfter?.points, item.residenceId);
        const jobPoint = looseMapGet(liveAfter?.points, item.jobId);
        const attached = !!livePop && pointHasPopId(residencePoint, livePop.id ?? item.id) && pointHasPopId(jobPoint, livePop.id ?? item.id);
        if (!endpointsMatch || !sizeMatch || !attached) {
          updateAuditError = `updated commuter ${item.id} is missing, detached, or has the wrong size`;
          break;
        }
      }
    }
    let endpointAuditError = null;
    if (!popAuditError && !updateAuditError && liveAfter?.points) {
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
      for (const item of plan.updatedPops || []) {
        const delta = Math.max(0, (Number(item.afterSize) || 0) - (Number(item.beforeSize) || 0));
        addExpected(item.residenceId, "residents", delta);
        addExpected(item.jobId, "jobs", delta);
      }
      for (const rec of expectedByPoint.values()) {
        const beforePoint = looseMapGet(plan.before?.points, rec.id);
        const afterPoint = looseMapGet(liveAfter.points, rec.id);
        if (!afterPoint) { endpointAuditError = `counterpart point ${rec.id} is missing after demand update`; break; }
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
    if (!targetAfter || !Number.isFinite(actualPrimary) || actualPrimary + 0.001 < expectedPrimary || popAuditError || updateAuditError || endpointAuditError) {
      const rb = rollbackDemandSnapshot(plan.before, ledgerBefore);
      const detail = popAuditError || updateAuditError || endpointAuditError || `expected at least ${expectedPrimary} ${plan.side === "residential" ? "residents" : "jobs"}, got ${Number.isFinite(actualPrimary) ? actualPrimary : "missing"}`;
      return {
        ok: false,
        rollbackOk: rb.ok,
        error: `Could not verify development for ${plan.pointId}: ${detail}.` +
          (rb.ok ? " Changes were rolled back." : ` Rollback failed: ${rb.errors.join("; ")}`),
      };
    }

    for (const id of addedPopIds) {
      const rec = plan.ledgerAfter.pops[String(id)] ?? plan.ledgerAfter.pops[id];
      const livePop = looseMapGet(liveAfter?.popsMap, id);
      if (rec && livePop) capturePopRuntimeIntoRecord(rec, livePop);
    }

    return { ok: true, addedPopIds };
  }

  async function executePlan(plan) {
    const epoch = lifecycleEpoch, city = currentCity();
    if (!plan?.before || planningDemandSignature(plan.before) !== planningDemandSignature(api.gameState.getDemandData?.()))
      return { ok: false, error: "Demand changed since Review. Review again before building." };
    const c = await charge(plan.totalCost);
    if (!c.ok) return c;
    if (epoch !== lifecycleEpoch || city !== currentCity())
      return { ok: false, error: "Game changed before development could be applied." };
    if (planningDemandSignature(plan.before) !== planningDemandSignature(api.gameState.getDemandData?.())) {
      refund(c.charged);
      return { ok: false, error: "Demand changed during payment. Review again before building." };
    }
    let applied;
    beginInternalDemandMutation();
    try {
      applied = applyPlan(plan);
    } catch (e) {
      const rb = rollbackDemandSnapshot(plan.before, cloneLedgerState());
      applied = { ok: false, rollbackOk: rb.ok, error: String(e?.message || e) +
        (rb.ok ? "" : `; rollback incomplete: ${rb.errors.join("; ")}`) };
    } finally {
      endInternalDemandMutation();
    }
    if (!applied.ok) {
      if (applied.rollbackOk !== false) refund(plan.totalCost);
      invalidatePreviews({ demand: true });
      return applied;
    }
    ledger = plan.ledgerAfter;
    rememberPlanningDemandSignature(api.gameState.getDemandData?.());
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
      createKind: plan.createKind || null,
      kind: "build",
      active: true,
    });
    persistAppliedChange();
    pendingRouteVisuals.mark(applied.addedPopIds || []);
    const remainingRoutes = (applied.addedPopIds || []).filter(id => needsOwnedRoadRoute(id));
    queueRoadWork(remainingRoutes);
    return { ok: true };
  }

  function demandBubbleRadius(point, side) {
    if (!point) return 6;
    const value = Math.max(0, Number(side === "residential" ? point.residents : point.jobs) || 0);
    return clamp(1.8 + 0.57 * Math.sqrt(value), 3.0, 39);
  }

  function flowBubbleRadius(size) {
    const value = clamp(Number(size) || 0, 0, CFG.CONNECTION_MAX_SIZE);
    if (value <= 0) return 2.5;
    const minFlow = 1;
    const minRadius = 2.5;
    const maxRadius = 24;
    const normalized = (value - minFlow) / Math.max(1, CFG.CONNECTION_MAX_SIZE - minFlow);
    return clamp(minRadius + (maxRadius - minRadius) * normalized, minRadius, maxRadius);
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
      const demand = Math.abs(Number(row.residents || 0)) + Math.abs(Number(row.workers || 0));
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
        const removedSnapshot = (action.removedPoints || []).find((row) => String(row?.id) === id);
        g = { pointId: id, location: live?.location || ledger.points?.[id]?.location || removedSnapshot?.location || null, created: !!ledger.points?.[id]?.created, residents: 0, workers: 0, counterpartResidents: 0, counterpartWorkers: 0, counterpartPointIds: new Set(), popIds: [], spent: 0, actions: 0 };
        groups.set(id, g);
      }
      const amount = Number(action.amount) || 0;
      const signedAmount = action.kind === "demolish" ? -amount : amount;
      if (action.side === "residential") g.residents += signedAmount;
      if (action.side === "work") g.workers += signedAmount;
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

    for (const rec of Object.values(ledger.adjustments || {})) {
      if (!rec || rec.active === false || rec.primaryId == null) continue;
      const g = groups.get(String(rec.primaryId));
      if (!g) continue;
      const size = Number(rec.delta) || 0;
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
      improvements += Math.max(0, (Number(a?.pricedAmount ?? a?.amount) || 0) / CFG.STEP);
      if (a?.active !== false) {
        const amount = Math.max(0, Number(a?.amount) || 0);
        activePeople += a?.kind === "demolish" ? -amount : amount;
      }
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
    for (const rec of Object.values(ledger.adjustments || {})) {
      if (!rec || rec.active === false) continue;
      const size = Number(rec.delta) || 0;
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
        if (popMatchesLedgerRecord(exact, rec, ledgerId) && !used.has(String(exact?.id ?? exactKey))) {
          actualId = exact?.id ?? exactKey;
        } else {
          for (const candidateId of candidatePopIdsForLedgerRecord(dd, rec)) {
            const candidateKey = String(candidateId);
            if (used.has(candidateKey)) continue;
            const live = looseMapGet(dd.popsMap, candidateId);
            if (!popMatchesLedgerRecord(live, rec, ledgerId)) continue;
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

  function activeAdjustmentDeltaForPop(popId, indexed = null) {
    const wanted = String(popId);
    if (indexed) return indexed.get(wanted) || 0;
    let total = 0;
    for (const rec of Object.values(ledger.adjustments || {})) {
      if (!rec || rec.active === false || String(rec.popId) !== wanted) continue;
      total += Number(rec.delta) || 0;
    }
    return total;
  }

  function adjustmentBaselineForPop(popId, currentSize = null) {
    const wanted = String(popId);
    let explicit = null;
    let legacyMin = Infinity;
    let activeDelta = 0;
    for (const rec of Object.values(ledger.adjustments || {})) {
      if (!rec || String(rec.popId) !== wanted) continue;
      const base = Number(rec.baseSize);
      if (Number.isFinite(base)) explicit = explicit == null ? base : Math.min(explicit, base);
      const before = Number(rec.beforeSize);
      if (Number.isFinite(before)) legacyMin = Math.min(legacyMin, before);
      if (rec.active !== false) activeDelta += Number(rec.delta) || 0;
    }
    if (explicit != null) return explicit;
    if (Number.isFinite(Number(currentSize))) return Math.max(0, Number(currentSize) - activeDelta);
    return Number.isFinite(legacyMin) ? legacyMin : null;
  }

  function popMatchesLedgerRecord(live, rec, ledgerId = null, indexed = null) {
    const expected = Math.max(0, (Number(rec?.size) || 0) + activeAdjustmentDeltaForPop(ledgerId ?? live?.id ?? rec?.id ?? "", indexed));
    return !!live && !!rec && expected > 0 &&
      String(live.residenceId ?? "") === String(rec.residenceId ?? "") &&
      String(live.jobId ?? "") === String(rec.jobId ?? "") &&
      Math.abs((Number(live.size) || 0) - expected) < 0.001;
  }

  function activeAdjustmentGroups() {
    const groups = new Map();
    for (const rec of Object.values(ledger.adjustments || {})) {
      if (!rec || rec.popId == null) continue;
      const key = String(rec.popId);
      let g = groups.get(key);
      if (!g) {
        g = { popId: rec.popId, beforeSize: null, legacyMin: Infinity, delta: 0, residenceId: rec.residenceId, jobId: rec.jobId };
        groups.set(key, g);
      }
      const base = Number(rec.baseSize);
      if (Number.isFinite(base)) g.beforeSize = g.beforeSize == null ? base : Math.min(g.beforeSize, base);
      const before = Number(rec.beforeSize);
      if (Number.isFinite(before)) g.legacyMin = Math.min(g.legacyMin, before);
      if (rec.active !== false) g.delta += Number(rec.delta) || 0;
    }
    for (const [key, g] of groups) {
      if (g.beforeSize == null) g.beforeSize = Number.isFinite(g.legacyMin) ? g.legacyMin : null;
      delete g.legacyMin;
      if (g.beforeSize == null || Math.abs(g.delta) < 0.001) groups.delete(key);
    }
    return groups;
  }

  function expectedAdjustedPopSize(popId, ownedRec = null) {
    if (ownedRec) return Math.max(0, (Number(ownedRec.size) || 0) + activeAdjustmentDeltaForPop(popId));
    const g = activeAdjustmentGroups().get(String(popId));
    return g && Number.isFinite(g.beforeSize) ? Math.max(0, g.beforeSize + g.delta) : null;
  }

  function restoreMissingAdjustmentGrowth(dd) {
    if (!dd?.popsMap || typeof api.demand?.updatePops !== "function") return { ok: true, updatedCount: 0, removedCount: 0, reverseUpdates: [] };
    const updates = [];
    const reverseUpdates = [];
    const removals = [];
    const removedEndpointIds = new Set();
    for (const g of activeAdjustmentGroups().values()) {
      const expected = Math.max(0, g.beforeSize + g.delta);
      const pop = looseMapGet(dd.popsMap, g.popId);
      if (!pop) {
        if (expected <= 0.001) continue;
        return { ok: false, error: `Could not restore adjusted commuter ${g.popId}: commuter is missing.`, reverseUpdates: [] };
      }
      if (String(pop.residenceId) !== String(g.residenceId) || String(pop.jobId) !== String(g.jobId)) {
        return { ok: false, error: `Could not restore adjusted commuter ${g.popId}: endpoints no longer match.`, reverseUpdates: [] };
      }
      const id = pop.id ?? g.popId;
      const current = Number(pop.size) || 0;
      if (expected <= 0.001) {
        removals.push(id);
        removedEndpointIds.add(String(g.residenceId));
        removedEndpointIds.add(String(g.jobId));
      } else if (Math.abs(current - expected) > 0.001) {
        updates.push({ id, size: expected });
        reverseUpdates.push({ id, size: current });
      }
    }
    if (updates.length) {
      let r = null;
      try { r = api.demand.updatePops(updates); } catch (e) { r = { success: false, error: String(e) }; }
      if (!r?.success) return { ok: false, error: r?.error || "Could not restore adjusted commuter connections.", reverseUpdates: [] };
    }
    if (removals.length) {
      let r = null;
      try { r = api.demand.removePops?.(removals); } catch (e) { r = { success: false, error: String(e) }; }
      if (!r?.success) {
        if (reverseUpdates.length) {
          try { api.demand.updatePops(reverseUpdates); } catch {}
        }
        return { ok: false, error: r?.error || "Could not restore fully demolished commuter connections.", reverseUpdates: [] };
      }
      removeEmptyTouchedPoints(null, removedEndpointIds);
    }
    return { ok: true, updatedCount: updates.length, removedCount: removals.length, reverseUpdates };
  }

  let replayingLedgerDemand = false;
  let replayingLedgerDemandCount = 0;
  let internalDemandMutationDepth = 0;

  function beginInternalDemandMutation() { internalDemandMutationDepth += 1; }
  function endInternalDemandMutation() { internalDemandMutationDepth = Math.max(0, internalDemandMutationDepth - 1); }

  async function replayActiveLedgerDemand(dd) {
    if (!dd?.points || !dd?.popsMap) return { ok: false, error: "Live demand data is unavailable." };
    if (!api.demand) return { ok: false, error: "Subway Builder demand editor API is unavailable." };

    const activeEntries = Object.entries(ledger.pops || {}).filter(([id, rec]) => rec && rec.active !== false && expectedAdjustedPopSize(id, rec) > 0);
    const hasActiveAdjustments = activeAdjustmentGroups().size > 0;
    if (!activeEntries.length && !hasActiveAdjustments) {
      return { ok: true, restoredPops: 0, recreatedPoints: 0, rekeyed: 0 };
    }

    const ledgerBeforeReplay = cloneLedgerState();
    const demandBeforeReplay = cloneDemandData(dd);
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
        ledger = ledgerBeforeReplay;
        return { ok: false, error: `Cannot safely restore Demand Developer because demand point ${id} is missing${rec?.created ? " and its older ledger has no saved location" : ""}.` };
      }
      pointsToCreate.push({ id, location: [Number(loc[0]), Number(loc[1])] });
    }

    const missing = [];
    const baseResizeRestores = [];
    for (const [ledgerId, rec] of activeEntries) {
      const exactKey = looseMapKey(dd.popsMap, ledgerId);
      if (exactKey != null) {
        const livePop = dd.popsMap.get(exactKey);
        const residence = looseMapGet(dd.points, rec.residenceId);
        const job = looseMapGet(dd.points, rec.jobId);
        const endpointsMatch = !!livePop &&
          String(livePop.residenceId ?? "") === String(rec.residenceId ?? "") &&
          String(livePop.jobId ?? "") === String(rec.jobId ?? "");
        const attached = endpointsMatch && pointHasPopId(residence, exactKey) && pointHasPopId(job, exactKey);
        const currentSize = Number(livePop?.size) || 0;
        const expectedBaseSize = expectedAdjustedPopSize(ledgerId, rec);
        if (endpointsMatch && attached) {
          if (Math.abs(currentSize - expectedBaseSize) < 0.001) continue;
          baseResizeRestores.push({ id: livePop.id ?? exactKey, beforeSize: currentSize, afterSize: expectedBaseSize });
          continue;
        }
      }
      missing.push({ ledgerId: String(ledgerId), rec });
    }

    if (!pointsToCreate.length && !missing.length && !baseResizeRestores.length && !hasActiveAdjustments) {
      if (ledgerChanged) await saveLedger();
      return { ok: true, restoredPops: 0, recreatedPoints: 0, rekeyed: 0 };
    }

    const createdPointIds = [];
    const addedPopIds = [];
    let reverseAdjustmentUpdates = [];
    const detached = [];
    const rollbackReplay = (message, extraPointIds = [], extraPopIds = [], extraReverseUpdates = []) => {
      const pointIds = [...new Set([...createdPointIds, ...extraPointIds].filter(Boolean).map(String))];
      const popIds = [...new Set([...addedPopIds, ...extraPopIds].filter((id) => id != null).map((id) => id))];
      const reverseUpdates = [...reverseAdjustmentUpdates, ...extraReverseUpdates];
      const rb = rollbackApplied(pointIds, popIds, reverseUpdates);
      const live = api.gameState.getDemandData?.() || dd;
      for (const item of detached) {
        if (!live?.popsMap || looseMapKey(live.popsMap, item.id) != null) continue;
        live.popsMap.set(item.key, item.pop);
        for (const endpoint of [item.pop.residenceId, item.pop.jobId]) {
          const point = looseMapGet(live.points, endpoint);
          if (!point?.popIds || pointHasPopId(point, item.key)) continue;
          if (Array.isArray(point.popIds)) point.popIds.push(item.key);
          else if (typeof point.popIds.add === "function") point.popIds.add(item.key);
        }
      }
      const verified = rollbackDemandSnapshot(demandBeforeReplay, ledgerBeforeReplay);
      clearDevelopmentSummaryCaches();
      const failures = [...rb.errors, ...verified.errors];
      return { ok: false, error: message + (failures.length ? `; rollback incomplete: ${failures.join("; ")}` : "") };
    };

    replayingLedgerDemandCount += 1;
    replayingLedgerDemand = true;
    try {
      for (const item of missing) {
        const key = looseMapKey(dd.popsMap, item.ledgerId);
        if (key != null) detached.push({ id: item.ledgerId, key, pop: dd.popsMap.get(key) });
        detachLedgerPopObject(dd, item.ledgerId, item.rec);
      }

      for (const point of pointsToCreate) {
        const r = api.demand.addDemandPoint?.({ id: point.id, location: point.location });
        if (!r?.success || String(r.pointId ?? point.id) !== String(point.id)) {
          return rollbackReplay(
            `Could not recreate Demand Developer point ${point.id}: ${r?.error || "unexpected point id"}`,
            r?.pointId && String(r.pointId) !== String(point.id) ? [r.pointId] : []
          );
        }
        createdPointIds.push(r.pointId ?? point.id);
      }

      let live = api.gameState.getDemandData?.() || dd;
      if (!live?.points || !live?.popsMap) {
        return rollbackReplay("Live demand disappeared while restoring Demand Developer.");
      }

      if (baseResizeRestores.length) {
        let baseResizeResult = null;
        try {
          baseResizeResult = api.demand.updatePops?.(baseResizeRestores.map((item) => ({ id: item.id, size: item.afterSize })));
        } catch (e) {
          baseResizeResult = { success: false, error: String(e) };
        }
        if (!baseResizeResult?.success) {
          return rollbackReplay(baseResizeResult?.error || "Could not restore saved commuter sizes.");
        }
        reverseAdjustmentUpdates.push(...baseResizeRestores.map((item) => ({ id: item.id, size: item.beforeSize })));
        live = api.gameState.getDemandData?.() || live;
      }

      if (missing.length) {
        const replayPrepared = missing.map((item) => {
          const res = looseMapGet(live.points, item.rec.residenceId);
          const job = looseMapGet(live.points, item.rec.jobId);
          if (!res || !job) return { item, error: `endpoint missing for ${item.rec.residenceId} -> ${item.rec.jobId}` };
          const addition = { residenceId: item.rec.residenceId, jobId: item.rec.jobId, size: expectedAdjustedPopSize(item.ledgerId, item.rec) };
          const savedSeconds = Number(item.rec.drivingSeconds);
          const savedDistance = Number(item.rec.drivingDistance);
          if (savedSeconds > 0 && savedDistance > 0) {
            addition.drivingSeconds = savedSeconds;
            addition.drivingDistance = savedDistance;
          } else {
            const fallback = estimateDriving(live, item.ledgerId, item.rec.residenceId,
              item.rec.jobId, drivingDonorsForPlanning(live));
            addition.drivingSeconds = Math.max(1, Math.round(fallback.seconds));
            addition.drivingDistance = Math.max(1, Math.round(fallback.distance));
          }
          return { item, addition, route: null };
        });
        const bad = replayPrepared.find((entry) => entry.error);
        if (bad) return rollbackReplay(`Could not restore commuter: ${bad.error}.`);

        const replayResult = api.demand.addPops(replayPrepared.map((entry) => entry.addition));
        if (!replayResult?.success || !Array.isArray(replayResult.popIds) || replayResult.popIds.length !== replayPrepared.length) {
          const returned = Array.isArray(replayResult?.popIds) ? replayResult.popIds : [];
          return rollbackReplay(`Could not restore saved commuters: ${replayResult?.error || "addPops failed"}.`, [], returned);
        }
        for (let i = 0; i < replayPrepared.length; i++) {
          const { item, route } = replayPrepared[i];
          const newId = String(replayResult.popIds[i]);
          const rec = item.rec;
          if (route) {
            rec.drivingSeconds = route.drivingSeconds;
            rec.drivingDistance = route.drivingDistance;
            if (route.drivingPath) rec.drivingPath = cloneJsonSafe(route.drivingPath);
          }
          if (newId !== item.ledgerId) {
            delete ledger.pops[item.ledgerId];
            ledger.pops[newId] = rec;
            for (const adj of Object.values(ledger.adjustments || {})) {
              if (adj && String(adj.popId) === String(item.ledgerId)) adj.popId = newId;
            }
          }
          addedPopIds.push(newId);
        }
        live = api.gameState.getDemandData?.() || live;
        attachOwnedRoadPaths(live);
        ledgerChanged = true;
      }

      const adjustmentRestore = restoreMissingAdjustmentGrowth(live);
      if (!adjustmentRestore.ok) {
        return rollbackReplay(adjustmentRestore.error, [], [], adjustmentRestore.reverseUpdates || []);
      }
      reverseAdjustmentUpdates.push(...(adjustmentRestore.reverseUpdates || []));
      if (adjustmentRestore.updatedCount) {
        live = api.gameState.getDemandData?.() || live;
        ledgerChanged = true;
      }

      reconcilePointTotalsFromLedger(live);

      for (const [id, rec] of Object.entries(ledger.pops || {})) {
        if (!rec || rec.active === false || !(expectedAdjustedPopSize(id, rec) > 0)) continue;
        if (!liveOwnedPopIsComplete(live, id, rec)) {
          return rollbackReplay(`Restored commuter ${id} failed verification.`);
        }
      }
      if (missing.length) ledgerChanged = true;
      rebuildLedgerPointAdditions();
      clearDevelopmentSummaryCaches();
      if (ledgerChanged || createdPointIds.length || addedPopIds.length) await saveLedger();
      return { ok: true, restoredPops: addedPopIds.length, recreatedPoints: createdPointIds.length, rekeyed: 0 };
    } catch (e) {
      return rollbackReplay(`Demand Developer replay failed: ${String(e?.message || e)}`);
    } finally {
      replayingLedgerDemandCount = Math.max(0, replayingLedgerDemandCount - 1);
      replayingLedgerDemand = replayingLedgerDemandCount > 0;
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
      if (!popMatchesLedgerRecord(live, item.rec, item.ledgerId)) continue;
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
          if (!popMatchesLedgerRecord(live, item.rec, item.ledgerId)) continue;
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

  function hasAnyActiveDevelopment() {
    if (Object.values(ledger.pops || {}).some((rec) => rec && rec.active !== false)) return true;
    if (Object.values(ledger.adjustments || {}).some((rec) => rec && rec.active !== false)) return true;
    return (ledger.actions || []).some((action) => action && action.active !== false);
  }

  function cleanupEmptyCreatedPoints(dd = api.gameState.getDemandData?.()) {
    if (!dd?.points || typeof api.demand?.removeDemandPoint !== "function") return { removedCount: 0, errors: [] };
    let removedCount = 0;
    const errors = [];
    for (const [pointId, live] of dd.points.entries()) {
      if (!isDemandDeveloperPointId(pointId)) continue;
      const popCount = live?.popIds && typeof live.popIds !== "string" && typeof live.popIds[Symbol.iterator] === "function"
        ? [...live.popIds].length
        : 0;
      if ((Number(live?.residents) || 0) > 0 || (Number(live?.jobs) || 0) > 0 || popCount > 0) continue;
      try {
        const r = api.demand.removeDemandPoint(pointId);
        if (r?.success === false) errors.push(r.error || `removeDemandPoint failed for ${pointId}`);
        else removedCount++;
      } catch (e) {
        errors.push(String(e?.message || e));
      }
    }
    return { removedCount, errors };
  }

  function rollbackDemandSnapshot(before, baselineLedger) {
    const errors = [];
    const remapped = [];
    const getLive = () => api.gameState.getDemandData?.();
    let live = getLive();
    if (!before?.points || !before?.popsMap || !live?.points || !live?.popsMap)
      return { ok: false, errors: ["Live demand data is unavailable for rollback."] };

    for (const [id, point] of before.points) {
      if (looseMapKey(live.points, id) != null) continue;
      try {
        const result = api.demand?.addDemandPoint?.({ id: String(id), location: [...point.location] });
        if (!result?.success || String(result.pointId ?? id) !== String(id))
          errors.push(result?.error || `Could not restore point ${id}.`);
      } catch (e) { errors.push(String(e?.message || e)); }
    }

    live = getLive() || live;
    const addedIds = [...live.popsMap.keys()].filter(id => looseMapKey(before.popsMap, id) == null);
    if (addedIds.length) {
      try {
        const result = api.demand?.removePops?.(addedIds);
        if (!result?.success) errors.push(result?.error || "Could not remove partially restored commuters.");
      } catch (e) { errors.push(String(e?.message || e)); }
    }

    live = getLive() || live;
    const missing = [...before.popsMap.entries()].filter(([id]) => looseMapKey(live.popsMap, id) == null);
    if (missing.length) {
      const additions = missing.map(([, pop]) => {
        const row = { residenceId: pop.residenceId, jobId: pop.jobId, size: pop.size };
        if (Number(pop.drivingDistance) > 0 && Number(pop.drivingSeconds) > 0) {
          row.drivingDistance = pop.drivingDistance;
          row.drivingSeconds = pop.drivingSeconds;
        }
        return row;
      });
      try {
        const result = api.demand?.addPops?.(additions);
        if (!result?.success || !Array.isArray(result.popIds) || result.popIds.length !== missing.length) {
          errors.push(result?.error || "Could not restore removed commuters.");
        } else {
          for (let i = 0; i < missing.length; i++) {
            const [oldId, rec] = missing[i];
            remapped.push({ oldId: String(oldId), newId: String(result.popIds[i]), rec });
          }
        }
      } catch (e) { errors.push(String(e?.message || e)); }
    }

    live = getLive() || live;
    const updates = [];
    for (const [id, pop] of before.popsMap) {
      const current = looseMapGet(live.popsMap, id);
      if (current && (String(current.residenceId) !== String(pop.residenceId) ||
          String(current.jobId) !== String(pop.jobId))) {
        errors.push(`Commuter ${id} has unexpected endpoints after rollback.`);
      } else if (current && Math.abs((Number(current.size) || 0) - (Number(pop.size) || 0)) > 0.001)
        updates.push({ id: current.id ?? id, size: pop.size });
    }
    if (updates.length) {
      try {
        const result = api.demand?.updatePops?.(updates);
        if (!result?.success) errors.push(result?.error || "Could not restore original commuter sizes.");
      } catch (e) { errors.push(String(e?.message || e)); }
    }

    live = getLive() || live;
    for (const [id] of live.points) {
      if (looseMapKey(before.points, id) != null) continue;
      const point = looseMapGet(live.points, id);
      if ((Number(point?.residents) || 0) > 0 || (Number(point?.jobs) || 0) > 0 ||
          [...(point?.popIds || [])].length > 0) continue;
      try {
        const result = api.demand?.removeDemandPoint?.(id);
        if (!result?.success) errors.push(result?.error || `Could not remove newly created point ${id}.`);
      } catch (e) { errors.push(String(e?.message || e)); }
    }

    live = getLive() || live;
    const idChanges = new Map(remapped.map(item => [item.oldId, item.newId]));
    for (const [id, pointBefore] of before.points) {
      const current = looseMapGet(live.points, id);
      if (!current) { errors.push(`Point ${id} is still missing after rollback.`); continue; }
      const wanted = (pointBefore.popIds || []).map(popId => idChanges.get(String(popId)) || popId);
      if (Array.isArray(current.popIds)) current.popIds.splice(0, current.popIds.length, ...wanted);
      else if (current.popIds && typeof current.popIds.clear === "function" && typeof current.popIds.add === "function") {
        current.popIds.clear();
        for (const popId of wanted) current.popIds.add(popId);
      }
      for (const field of ["residents", "jobs"]) {
        if (Number.isFinite(Number(pointBefore[field]))) current[field] = Number(pointBefore[field]);
      }
    }
    for (const [id, pop] of before.popsMap) {
      const newId = idChanges.get(String(id)) || id;
      const current = looseMapGet(live.popsMap, newId);
      if (!current || String(current.residenceId) !== String(pop.residenceId) ||
          String(current.jobId) !== String(pop.jobId) ||
          Math.abs((Number(current.size) || 0) - (Number(pop.size) || 0)) > 0.001)
        errors.push(`Commuter ${id} did not return to its previous state.`);
    }

    if (baselineLedger) {
      ledger = baselineLedger;
      for (const item of remapped) {
        if (item.oldId !== item.newId) rekeyPopReferences(item.oldId, item.newId);
        const home = looseMapGet(getLive()?.points, item.rec.residenceId)?.location;
        const work = looseMapGet(getLive()?.points, item.rec.jobId)?.location;
        const safe = usefulRoadPath(item.rec.drivingPath, home, work);
        if (safe) {
          archiveRoadPath(item.newId, item.rec.residenceId, item.rec.jobId, safe, home, work);
          attachLiveRoadPath(getLive(), item.newId, item.rec.residenceId, item.rec.jobId, safe);
        }
      }
      rebuildLedgerPointAdditions();
      clearDevelopmentSummaryCaches();
    }
    return { ok: errors.length === 0, errors, remappedCount: remapped.length };
  }

  function failedUndoRollback(error, snapshot, baselineLedger) {
    const rb = rollbackDemandSnapshot(snapshot, baselineLedger);
    return { ok: false, error: String(error) + (rb.ok ? "" : `; rollback incomplete: ${rb.errors.join("; ")}`) };
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
      return { ok: true, removedCount: Number(r.removedCount ?? ids.length) };
    } catch (e) { return { ok: false, error: String(e?.message || e) }; }
  }

  function revertAdjustments(records) {
    const dd = api.gameState.getDemandData?.();
    if (!records.length) return { ok: true, revertedCount: 0 };
    const grouped = new Map();
    for (const item of records) {
      const rec = item.rec;
      if (!rec || rec.active === false) continue;
      const pop = looseMapGet(dd?.popsMap, rec.popId);
      if (!pop) return { ok: false, error: `Could not find adjusted commuter ${rec.popId}.` };
      const key = String(pop.id ?? rec.popId);
      let g = grouped.get(key);
      if (!g) { g = { id: pop.id ?? rec.popId, current: Number(pop.size) || 0, delta: 0, entries: [] }; grouped.set(key, g); }
      g.delta += Number(rec.delta) || 0;
      g.entries.push(item);
    }
    const updates = [...grouped.values()].map((g) => ({ id: g.id, size: Math.max(1, g.current - g.delta) }));
    let r = null;
    try { r = api.demand?.updatePops?.(updates); } catch (e) { r = { success: false, error: String(e) }; }
    if (!r?.success) return { ok: false, error: r?.error || "Could not revert expanded commuter connections." };
    const live = api.gameState.getDemandData?.();
    for (const update of updates) {
      const current = looseMapGet(live?.popsMap, update.id);
      if (!current || Math.abs((Number(current.size) || 0) - update.size) > 0.001)
        return { ok: false, error: `Could not verify reverted commuter ${update.id}.` };
    }
    const revertedEntries = [...grouped.values()].flatMap((g) => g.entries);
    const now = Date.now();
    for (const item of revertedEntries) { item.rec.active = false; item.rec.removedAt = now; }
    rebuildLedgerPointAdditions();
    return { ok: true, revertedCount: revertedEntries.length };
  }

  function deactivateAdjustmentsForRemovedPops(removedPopIds, removedPrimaryId = null) {
    if (!removedPopIds?.size) return 0;
    const now = Date.now();
    const actionById = new Map((ledger.actions || []).filter(Boolean).map((action) => [String(action.id), action]));
    let count = 0;
    for (const rec of Object.values(ledger.adjustments || {})) {
      if (!rec || rec.active === false || !removedPopIds.has(String(rec.popId))) continue;
      rec.active = false;
      rec.removedAt = now;
      count++;

      if (removedPrimaryId != null && String(rec.primaryId || "") !== String(removedPrimaryId)) {
        const action = actionById.get(String(rec.actionId || ""));
        if (action && action.active !== false) {
          const contribution = rec.demolition ? Math.abs(Number(rec.delta) || 0) : Math.max(0, Number(rec.delta) || 0);
          action.amount = Math.max(0, (Number(action.amount) || 0) - contribution);
          if (!(action.amount > 0)) {
            action.active = false;
            action.removedAt = now;
          }
        }
      }
    }
    return count;
  }

  function rekeyPopReferences(oldId, newId) {
    const oldKey = String(oldId), newKey = String(newId);
    if (oldKey === newKey) return;
    if (ledger.pops?.[oldKey]) {
      const rec = ledger.pops[oldKey];
      delete ledger.pops[oldKey];
      ledger.pops[newKey] = rec;
    }
    for (const rec of Object.values(ledger.adjustments || {})) {
      if (rec && String(rec.popId) === oldKey) rec.popId = newKey;
    }
  }

  function restoreMissingPointForUndo(pointId, actionRows) {
    const dd = api.gameState.getDemandData?.();
    if (looseMapGet(dd?.points, pointId)) return { ok: true };
    let snapshot = null;
    for (const action of actionRows) {
      snapshot = (action.removedPoints || []).find((row) => String(row?.id) === String(pointId));
      if (snapshot) break;
    }
    const rec = ledger.points?.[String(pointId)];
    const location = snapshot?.location || rec?.location;
    if (!Array.isArray(location)) return { ok: false, error: `Could not restore removed point ${pointId}: location is unavailable.` };
    try {
      const r = api.demand?.addDemandPoint?.({ id: String(pointId), location: [Number(location[0]), Number(location[1])] });
      if (!r?.success || String(r.pointId ?? pointId) !== String(pointId)) return { ok: false, error: r?.error || `Could not restore point ${pointId}.` };
      return { ok: true };
    } catch (e) { return { ok: false, error: String(e?.message || e) }; }
  }

  async function prepareUndoRoadPaths(actions) {
    const rows = (actions || []).filter(a => a?.kind === "demolish" && a.active !== false);
    const actionIds = new Set(rows.map(a => String(a.id)));
    const dd = api.gameState.getDemandData?.();
    if (!rows.length) return { ok: true, routes: new Map() };
    if (!dd?.points || !dd?.popsMap) return { ok: false, error: "Demand data is unavailable." };
    const points = new Map(dd.points);
    for (const action of rows) {
      for (const point of action.removedPoints || []) {
        if (!point?.id || !Array.isArray(point.location) || points.has(point.id)) continue;
        points.set(point.id, { id: point.id, location: [...point.location] });
      }
    }
    const needed = new Map();
    for (const rec of Object.values(ledger.adjustments || {})) {
      if (!rec?.demolition || rec.active === false || !actionIds.has(String(rec.actionId))) continue;
      const id = String(rec.popId);
      if (needed.has(id)) continue;
      const home = points.get(rec.residenceId) || ledger.points?.[String(rec.residenceId)];
      const work = points.get(rec.jobId) || ledger.points?.[String(rec.jobId)];
      if (!Array.isArray(home?.location) || !Array.isArray(work?.location)) {
        return { ok: false, error: `Cannot restore commuter ${id}: endpoint location is missing.` };
      }
      const owned = ledger.pops?.[id];
      const records = Object.values(ledger.adjustments || {}).filter(x =>
        x?.demolition && String(x.popId) === id &&
        String(x.residenceId) === String(rec.residenceId) &&
        String(x.jobId) === String(rec.jobId));
      const live = looseMapGet(dd.popsMap, id);
      const candidates = [
        archivedRoadPath(id, rec.residenceId, rec.jobId, home.location, work.location),
        ...records.map(x => x.drivingPath), owned?.drivingPath, live?.drivingPath,
      ];
      let best = null;
      for (const path of candidates) {
        const checked = usefulRoadPath(path, home.location, work.location);
        if (!checked) continue;
        if (!best) best = checked;
      }
      needed.set(id, { rec, best });
    }
    const routes = new Map();
    for (const [id, item] of needed) {
      if (item.best) routes.set(id, item.best);
    }
    return { ok: true, routes };
  }

  function undoDemolitionActions(actions, preparedRoutes = new Map()) {
    const rows = (actions || []).filter((a) => a?.kind === "demolish" && a.active !== false);
    if (!rows.length) return { ok: true, restoredCount: 0 };
    const actionIds = new Set(rows.map((a) => String(a.id)));
    const ledgerBefore = cloneLedgerState();
    const adjustments = Object.entries(ledger.adjustments || {}).filter(([, rec]) => rec && rec.active !== false && rec.demolition && actionIds.has(String(rec.actionId)));
    const affectedPopIds = new Set(adjustments.map(([, rec]) => String(rec.popId)));
    const endpointIds = new Set();
    for (const [, rec] of adjustments) { endpointIds.add(String(rec.residenceId)); endpointIds.add(String(rec.jobId)); }

    for (const [, rec] of adjustments) rec.active = false;
    for (const pointId of endpointIds) {
      const need = [...affectedPopIds].some((popId) => {
        const owned = ledger.pops?.[popId];
        const g = activeAdjustmentGroups().get(popId);
        const desired = owned ? expectedAdjustedPopSize(popId, owned) : (g ? Math.max(0, g.beforeSize + g.delta) : adjustmentBaselineForPop(popId));
        if (!(desired > 0)) return false;
        const sample = adjustments.find(([, rec]) => String(rec.popId) === popId)?.[1];
        return sample && (String(sample.residenceId) === pointId || String(sample.jobId) === pointId);
      });
      if (!need) continue;
      const restored = restoreMissingPointForUndo(pointId, rows);
      if (!restored.ok) { ledger = ledgerBefore; return restored; }
    }

    let dd = api.gameState.getDemandData?.();
    const updates = [];
    const toAdd = [];
    const createdNative = [];
    for (const oldId of affectedPopIds) {
      const owned = ledger.pops?.[oldId];
      const allRecs = Object.values(ledger.adjustments || {}).filter((rec) => rec && String(rec.popId) === oldId);
      const sample = allRecs[0];
      if (!sample) continue;
      const group = activeAdjustmentGroups().get(oldId);
      const baseline = adjustmentBaselineForPop(oldId);
      const desired = owned
        ? expectedAdjustedPopSize(oldId, owned)
        : Math.max(0, (group?.beforeSize ?? baseline ?? 0) + (group?.delta ?? 0));
      const live = looseMapGet(dd?.popsMap, oldId);
      if (desired <= 0.001) continue;
      if (live) {
        if (Math.abs((Number(live.size) || 0) - desired) > 0.001) updates.push({ id: live.id ?? oldId, size: desired });
      } else {
        const addition = { residenceId: sample.residenceId, jobId: sample.jobId, size: desired };
        const seconds = Number(sample.drivingSeconds || owned?.drivingSeconds);
        const distance = Number(sample.drivingDistance || owned?.drivingDistance);
        if (seconds > 0 && distance > 0) { addition.drivingSeconds = seconds; addition.drivingDistance = distance; }
        const savedGeometry = preparedRoutes.get(oldId) ||
          allRecs.find(rec => validRoutePath(rec?.drivingPath))?.drivingPath || owned?.drivingPath;
        const home = looseMapGet(dd?.points, sample.residenceId)?.location || ledger.points?.[String(sample.residenceId)]?.location;
        const work = looseMapGet(dd?.points, sample.jobId)?.location || ledger.points?.[String(sample.jobId)]?.location;
        const safePath = cleanOwnedRoadGeometry(savedGeometry, home, work);
        toAdd.push({ oldId, addition, roadPath: safePath || null });
      }
    }
    if (updates.length) {
      let r = null;
      try { r = api.demand.updatePops(updates); } catch (e) { r = { success: false, error: String(e) }; }
      if (!r?.success) { ledger = ledgerBefore; return { ok: false, error: r?.error || "Could not restore demolished commuter sizes." }; }
      pendingRouteVisuals.mark(updates.map(item => item.id));
    }
    if (toAdd.length) {
      let r = null;
      try { r = api.demand.addPops(toAdd.map((row) => row.addition)); } catch (e) { r = { success: false, error: String(e) }; }
      if (!r?.success || !Array.isArray(r.popIds) || r.popIds.length !== toAdd.length) { ledger = ledgerBefore; return { ok: false, error: r?.error || "Could not restore demolished commuter connections." }; }
      pendingRouteVisuals.mark(r.popIds);
      const restoredLive = api.gameState.getDemandData?.();
      for (let i = 0; i < toAdd.length; i++) {
        const { oldId, addition, roadPath } = toAdd[i];
        const newId = r.popIds[i];
        createdNative.push({ oldId: String(oldId), newId: String(newId), roadPath: !!roadPath });
        rekeyPopReferences(oldId, newId);
        if (roadPath) {
          for (const rec of Object.values(ledger.adjustments || {})) {
            if (rec?.demolition && String(rec.popId) === String(newId) &&
                String(rec.residenceId) === String(addition.residenceId) &&
                String(rec.jobId) === String(addition.jobId)) rec.drivingPath = cloneJsonSafe(roadPath);
          }
          archiveRoadPath(newId, addition.residenceId, addition.jobId, roadPath,
            looseMapGet(restoredLive?.points, addition.residenceId)?.location,
            looseMapGet(restoredLive?.points, addition.jobId)?.location);
          attachLiveRoadPath(restoredLive, newId, addition.residenceId, addition.jobId, roadPath);
        }
      }
    }

    const afterDemand = api.gameState.getDemandData?.();
    for (const [oldId, path] of preparedRoutes) {
      if (affectedPopIds.has(oldId) && !toAdd.some(row => row.oldId === oldId)) {
        const live = looseMapGet(afterDemand?.popsMap, oldId);
        const row = adjustments.find(([, rec]) => String(rec.popId) === oldId)?.[1];
        if (live && row) {
          archiveRoadPath(oldId, row.residenceId, row.jobId, path,
            looseMapGet(afterDemand?.points, row.residenceId)?.location,
            looseMapGet(afterDemand?.points, row.jobId)?.location);
          attachLiveRoadPath(afterDemand, oldId, row.residenceId, row.jobId, path);
        }
      }
      for (const rec of Object.values(ledger.adjustments || {})) {
        if (rec?.demolition && String(rec.popId) === oldId) rec.drivingPath = cloneJsonSafe(path);
      }
    }
    const now = Date.now();
    for (const action of rows) { action.active = false; action.removedAt = now; }
    rebuildLedgerPointAdditions();
    const afterUndo = api.gameState.getDemandData?.();
    attachRestoredNativeRoadPaths(afterUndo);
    for (const id of affectedPopIds) {
      const newlyCreated = createdNative.find(item => String(item.oldId) === String(id));
      const wantedId = newlyCreated?.newId ?? id;
      scheduleNativeRoadRecheck(wantedId);
    }
    clearDevelopmentSummaryCaches();
    return { ok: true, restoredCount: adjustments.length,
      restoredPopIds: [...affectedPopIds].map((id) => createdNative.find((item) => item.oldId === id)?.newId ?? id) };
  }

  function resyncUndoRoadPaths(restoredPopIds) {
    if (!restoredPopIds?.length) return;
    const dd = api.gameState.getDemandData?.();
    if (!dd?.popsMap) return;
    pendingRouteVisuals.mark(restoredPopIds);
    for (const id of new Set(restoredPopIds.map(String))) {
      const rec = restoredNativeAdjustment(id, dd);
      if (!rec) continue;
      const home = looseMapGet(dd.points, rec.residenceId)?.location;
      const work = looseMapGet(dd.points, rec.jobId)?.location;
      const path = archivedRoadPath(id, rec.residenceId, rec.jobId, home, work) ||
        usefulRoadPath(rec.drivingPath, home, work);
      if (path) attachLiveRoadPath(dd, id, rec.residenceId, rec.jobId, path);
      else void ensureRestoredNativeRoadPath(currentCity(), id).then(result => {
        if (result) straightRouteVisuals.audit([id]);
      });
      scheduleNativeRoadRecheck(id);
    }
  }

  let undoLocked = false;
  function undoContext() {
    return { epoch: lifecycleEpoch, city: currentCity(), key: loadedLedgerKey,
      ledgerRef: ledger, signature: ledgerSnapshotSignature(ledger),
      demand: planningDemandSignature(api.gameState.getDemandData?.()) };
  }
  function sameUndoContext(context) {
    return context.epoch === lifecycleEpoch && context.city === currentCity() &&
      context.key === loadedLedgerKey && context.ledgerRef === ledger &&
      context.signature === ledgerSnapshotSignature(ledger) &&
      context.demand === planningDemandSignature(api.gameState.getDemandData?.());
  }
  async function removeDevelopmentTransaction(pointId = null) {
    if (undoLocked || buildLocked || internalDemandMutationDepth > 0 || replayingLedgerDemand)
      return { ok: false, error: "Another development operation is in progress." };
    undoLocked = true;
    const context = undoContext();
    try {
    const isAll = pointId == null;
    const selectedActions = isAll ? ledger.actions || [] :
      (ledger.actions || []).filter(a => String(a?.pointId || "") === String(pointId));
    const preflight = await prepareUndoRoadPaths(selectedActions);
    if (!preflight.ok) return preflight;
    if (!sameUndoContext(context))
      return { ok: false, error: "Game or demand changed while preparing Undo. No changes were removed." };
    const liveBefore = api.gameState.getDemandData?.();
    if (!liveBefore?.points || !liveBefore?.popsMap) return { ok: false, error: "Demand data is unavailable." };
    const snapshot = cloneDemandData(liveBefore);
    const baselineLedger = cloneLedgerState();
    let restoredPopIds = [];
    let completed = false;
    beginInternalDemandMutation();
    try {
      const undone = undoDemolitionActions(selectedActions, preflight.routes);
      if (!undone.ok) return failedUndoRollback(undone.error, snapshot, baselineLedger);
      restoredPopIds = undone.restoredPopIds || [];

      const ids = Object.entries(ledger.pops || {})
        .filter(([, rec]) => rec?.active !== false && (isAll || String(rec?.primaryId || "") === String(pointId)))
        .map(([id]) => id);
      const ownedIds = new Set(ids.map(String));
      const externalAdjustments = Object.entries(ledger.adjustments || {})
        .filter(([, rec]) => rec?.active !== false && !rec?.demolition && (Number(rec?.delta) || 0) > 0 &&
          (isAll || String(rec?.primaryId || "") === String(pointId)) && !ownedIds.has(String(rec.popId)))
        .map(([key, rec]) => ({ key, rec }));

      const reverted = revertAdjustments(externalAdjustments);
      if (!reverted.ok) return failedUndoRollback(reverted.error, snapshot, baselineLedger);
      const removed = ids.length ? removeOwnedPops(ids) : { ok: true, removedCount: 0 };
      if (!removed.ok) return failedUndoRollback(removed.error, snapshot, baselineLedger);
      const afterRemoval = api.gameState.getDemandData?.();
      if (!afterRemoval?.popsMap || ids.some(id => looseMapKey(afterRemoval.popsMap, id) != null))
        return failedUndoRollback("Could not verify removed development commuters.", snapshot, baselineLedger);
      const deactivated = deactivateAdjustmentsForRemovedPops(ownedIds, isAll ? null : pointId);
      const now = Date.now();
      for (const action of ledger.actions || []) {
        if (!action || action.active === false || (!isAll && String(action.pointId || "") !== String(pointId))) continue;
        action.active = false;
        action.removedAt = now;
      }
      rebuildLedgerPointAdditions();
      const cleanup = cleanupEmptyCreatedPoints(api.gameState.getDemandData?.());
      completed = true;
      const saved = await saveLedger();
      if (context.epoch !== lifecycleEpoch || context.city !== currentCity() || context.key !== loadedLedgerKey)
        return { ok: false, error: "Undo completed in the previous game while another game loaded. Check that game's save." };
      unsavedWorkingLedger = !saved;
      invalidatePreviews({ demand: true, ledgerState: true });
      refreshUi();
      if (!saved) uiStore.set({ status: "Undo applied, but could not be saved. Save again after checking storage." });
      return { ok: true, saved, warning: saved ? null : "Changes were removed but not saved. Save again before leaving the game.",
        removedCount: Number(removed.removedCount || 0),
        revertedCount: Number(reverted.revertedCount || 0) + deactivated,
        removedPointCount: cleanup.removedCount, cleanupErrors: cleanup.errors };
    } catch (e) {
      return failedUndoRollback(String(e?.message || e), snapshot, baselineLedger);
    } finally {
      endInternalDemandMutation();
      if (completed && context.epoch === lifecycleEpoch && context.city === currentCity() && context.key === loadedLedgerKey) {
        resyncUndoRoadPaths(restoredPopIds);
        auditStraightManagedRoutes(restoredPopIds);
      }
    }
    } finally { undoLocked = false; }
  }

  async function removeDevelopmentForPoint(pointId) {
    return removeDevelopmentTransaction(pointId);
  }

  async function removeAllDevelopment() {
    return removeDevelopmentTransaction();
  }

  let lastOverlaySource = null;
  let lastOverlayKey = null;

  function existingConnectionsForPoint(dd, pointId) {
    const id = String(pointId || "");
    const point = looseMapGet(dd?.points, id);
    if (!point) return [];
    const totals = new Map();
    for (const popId of point.popIds || []) {
      const pop = looseMapGet(dd?.popsMap, popId);
      const size = Math.max(0, Number(pop?.size) || 0);
      if (!pop || !(size > 0)) continue;

      let counterpartId = null;
      let side = null;
      if (String(pop.residenceId) === id) {
        counterpartId = String(pop.jobId);
        side = "work";
      } else if (String(pop.jobId) === id) {
        counterpartId = String(pop.residenceId);
        side = "residential";
      } else {
        continue;
      }
      if (!counterpartId || counterpartId === id) continue;
      const counterpart = looseMapGet(dd?.points, counterpartId);
      if (!Array.isArray(counterpart?.location)) continue;
      const type = side === "work" ? (specialPointKind(counterpartId) || "work") : "residential";
      const key = `${side}:${counterpartId}`;
      const rec = totals.get(key) || {
        id: counterpartId,
        size: 0,
        side,
        type,
        location: [Number(counterpart.location[0]), Number(counterpart.location[1])],
      };
      rec.size += size;
      totals.set(key, rec);
    }
    return [...totals.values()].sort((a, b) => b.size - a.size || a.id.localeCompare(b.id));
  }

  function overlayRenderKey(s = uiStore.get()) {
    const pending = Array.isArray(s.pendingLocation) ? `${Number(s.pendingLocation[0])},${Number(s.pendingLocation[1])}` : "";
    return [
      demandRevision,
      s.panelOpen ? 1 : 0,
      s.infoOpen ? 1 : 0,
      s.infoMapVisible ? 1 : 0,
      s.mode || "",
      s.existingSide || "",
      s.createSide || "",
      s.createKind || "",
      s.selectedId || "",
      s.previewExistingId || "",
      s.createReviewed ? 1 : 0,
      s.reviewKey || "",
      s.showExistingConnections ? 1 : 0,
      pending,
    ].join("|");
  }

  function overlayPointType(pointId, fallback, revealSpecial = false) {
    if (revealSpecial) {
      const kind = specialPointKind(pointId);
      if (kind === "airport") return "airport";
      if (kind === "university") return "university";
    }
    return fallback;
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
          const addedResidents = Math.abs(Number(improved.residents || 0));
          const addedWorkers = Math.abs(Number(improved.workers || 0));
          let radiusSide;
          if (addedResidents > addedWorkers) radiusSide = "residential";
          else if (addedWorkers > addedResidents) radiusSide = "work";
          else radiusSide = Number(p?.residents || 0) >= Number(p?.jobs || 0) ? "residential" : "work";
          features.push({
            type: "Feature",
            properties: {
              kind: "existing",
              pointId: sid,
              pointType: overlayPointType(sid, radiusSide, true),
              bubbleRadius: demandBubbleRadius(p, radiusSide),
              selected: sid === String(s.selectedId || "") ? 1 : 0,
            },
            geometry: { type: "Point", coordinates: p.location },
          });
        }
      }
      return { type: "FeatureCollection", features };
    }

    const createReviewActive = s.mode === "create" && isCurrentCreateReview(s);
    const existingReviewActive = s.mode !== "create" && isCurrentExistingReview(s);
    const reviewActive = createReviewActive || existingReviewActive;
    const reviewById = reviewActive
      ? new Map((s.reviewConnections || []).map((connection) => [String(connection.id), connection]))
      : null;
    const existingConnectionsActive = !reviewActive && s.mode !== "create" && !!s.showExistingConnections && !!s.selectedId;
    const existingConnections = existingConnectionsActive ? existingConnectionsForPoint(dd, s.selectedId) : [];
    const existingConnectionById = new Map();
    if (existingConnectionsActive) {
      for (const connection of existingConnections) {
        const sid = String(connection.id);
        if (!existingConnectionById.has(sid)) existingConnectionById.set(sid, connection);
      }
    }

    if (dd?.points) {
      for (const [id, p] of dd.points.entries()) {
        if (!Array.isArray(p?.location)) continue;
        const sid = String(id);
        const residents = Number(p.residents || 0);
        const workers = Number(p.jobs || 0);
        let include = false;
        let radiusSide = residents >= workers ? "residential" : "work";
        let pointType = radiusSide;
        let revealSpecial = false;

        if (existingConnectionsActive) {
          const connection = existingConnectionById.get(sid);
          const isOrigin = sid === String(s.selectedId || "");
          include = !!connection || isOrigin;
          if (!include) continue;
          if (connection) {
            radiusSide = connection.side === "residential" ? "residential" : "work";
            pointType = connection.type || radiusSide;
            revealSpecial = connection.type === "university" || connection.type === "airport";
          } else {
            const selectedType = s.existingSide || existingPointType(p);
            radiusSide = existingTypeSide(selectedType);
            pointType = selectedType;
            revealSpecial = selectedType === "university" || selectedType === "airport";
          }
        } else if (reviewActive) {
          const connection = reviewById.get(sid);
          const isOrigin = existingReviewActive && sid === String(s.selectedId || "");
          include = !!connection || isOrigin;
          if (!include) continue;

          if (connection) {
            radiusSide = connection.side === "residential" ? "residential" : "work";
            const special = radiusSide === "work" ? specialPointKind(sid) : null;
            pointType = special || radiusSide;
            revealSpecial = !!special;
          } else {
            const selectedType = s.existingSide || existingPointType(p);
            radiusSide = existingTypeSide(selectedType);
            pointType = selectedType;
            revealSpecial = selectedType === "university" || selectedType === "airport";
          }
        } else if (s.mode === "create") {
          include = residents > 0 || workers > 0;
          pointType = "neutral";
          if (s.createSide === "residential" && !s.createKind && residents > 0) {
            pointType = "residential";
            radiusSide = "residential";
          } else if (s.createSide === "work" && !s.createKind && workers > 0 && !specialPointKind(id)) {
            pointType = "work";
            radiusSide = "work";
          } else if (s.createKind === "university" && workers > 0 && specialPointKind(id) === "university") {
            pointType = "university";
            radiusSide = "work";
          } else if (s.createKind === "airport" && workers > 0 && specialPointKind(id) === "airport") {
            pointType = "airport";
            radiusSide = "work";
          }
        } else if (!s.existingSide && s.mode === "normal") {
          include = residents > 0 || workers > 0;
          pointType = "neutral";
        } else if (s.existingSide === "residential") {
          include = residents > 0;
          pointType = "residential";
          radiusSide = "residential";
        } else if (s.existingSide === "work") {
          include = workers > 0 && !specialPointKind(id);
          pointType = "work";
          radiusSide = "work";
        } else if (s.existingSide === "university") {
          include = workers > 0 && specialPointKind(id) === "university";
          pointType = "university";
          radiusSide = "work";
        } else if (s.existingSide === "airport") {
          include = workers > 0 && specialPointKind(id) === "airport";
          pointType = "airport";
          radiusSide = "work";
        }
        if (!include) continue;
        if (!reviewActive) revealSpecial = s.mode === "normal" ? (s.existingSide === "university" || s.existingSide === "airport") : false;
        features.push({
          type: "Feature",
          properties: {
            kind: "existing",
            pointId: sid,
            pointType: overlayPointType(id, pointType, revealSpecial),
            bubbleRadius: existingConnectionsActive && existingConnectionById.has(sid)
              ? flowBubbleRadius(existingConnectionById.get(sid).size)
              : reviewActive && reviewById?.has(sid)
                ? flowBubbleRadius(reviewById.get(sid).size)
                : demandBubbleRadius(p, radiusSide),
            selected: (sid === String(s.selectedId || "") || (s.mode === "create" && sid === String(s.previewExistingId || ""))) ? 1 : 0,
          },
          geometry: { type: "Point", coordinates: p.location },
        });
      }
    }

    if (existingConnectionsActive) {
      const origin = looseMapGet(dd?.points, s.selectedId)?.location;
      if (Array.isArray(origin)) {
        for (const connection of existingConnections) {
          if (!Array.isArray(connection?.location)) continue;
          features.push({
            type: "Feature",
            properties: {
              kind: "existing-connection",
              connectionSide: connection.side,
              connectionType: connection.type || connection.side,
              flowSize: Math.max(1, Number(connection.size) || 1),
            },
            geometry: { type: "LineString", coordinates: [origin, connection.location] },
          });
        }
      }
    }

    const reviewOrigin = createReviewActive
      ? s.pendingLocation
      : (existingReviewActive ? dd?.points?.get(String(s.selectedId))?.location : null);
    if (Array.isArray(reviewOrigin)) {
      for (const connection of s.reviewConnections || []) {
        if (!Array.isArray(connection?.location)) continue;
        features.push({
          type: "Feature",
          properties: {
            kind: "review-connection",
            connectionSide: connection.side,
            connectionType: connection.type || connection.side,
            flowSize: Math.max(1, Number(connection.size) || 1),
          },
          geometry: { type: "LineString", coordinates: [reviewOrigin, connection.location] },
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
        id: CFG.EXISTING_CONNECTION_LAYER_ID,
        type: "line",
        source: CFG.SOURCE_ID,
        filter: ["==", ["get", "kind"], "existing-connection"],
        paint: {
          "line-color": ["match", ["get", "connectionType"], "residential", "#60a5fa", "work", "#f59e0b", "university", "#4ade80", "airport", "#c084fc", "#d1d5db"],
          "line-opacity": 0.58,
          "line-width": ["interpolate", ["linear"], ["get", "flowSize"], 25, 1.1, 100, 1.8, 500, 3.2, 1000, 4.5],
        },
      },
      {
        id: CFG.CONNECTION_LAYER_ID,
        type: "line",
        source: CFG.SOURCE_ID,
        filter: ["==", ["get", "kind"], "review-connection"],
        paint: {
          "line-color": ["match", ["get", "connectionType"], "residential", "#60a5fa", "work", "#f59e0b", "university", "#4ade80", "airport", "#c084fc", "#d1d5db"],
          "line-opacity": 0.78,
          "line-width": ["interpolate", ["linear"], ["get", "flowSize"], 25, 1.5, 100, 2.5, 500, 4.5, 1000, 6],
          "line-dasharray": [2, 2],
        },
      },
      {
        id: CFG.CONTEXT_LAYER_ID,
        type: "circle",
        source: CFG.SOURCE_ID,
        filter: ["==", ["get", "kind"], "existing"],
        paint: {
          "circle-radius": ["+", ["get", "bubbleRadius"], ["case", ["==", ["get", "selected"], 1], 7.5, 0]],
          "circle-color": ["match", ["get", "pointType"], "residential", "#3b82f6", "work", "#f59e0b", "university", "#22c55e", "airport", "#a855f7", "#6b7280"],
          "circle-opacity": ["case", ["==", ["get", "selected"], 1], 0.60, 0.32],
          "circle-stroke-width": ["case", ["==", ["get", "selected"], 1], 4, 2],
          "circle-stroke-color": ["case", ["==", ["get", "selected"], 1], "#ef4444", ["match", ["get", "pointType"], "residential", "#60a5fa", "work", "#f59e0b", "university", "#4ade80", "airport", "#c084fc", "#9ca3af"]],
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
      !!map.getLayer?.(CFG.EXISTING_CONNECTION_LAYER_ID) &&
      !!map.getLayer?.(CFG.CONNECTION_LAYER_ID) &&
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
    stopRoadWork();
    lifecycleEpoch += 1;
    demandReady = false;
    ledger = newLedger();
    loadedLedgerKey = null;
    lastPlanningDemandSignature = null;
    unsavedWorkingLedger = false;
    uiStore.set({ mode: "normal", existingSide: null, demolitionMode: false, createSide: null, createKind: null, createReviewed: false, reviewKey: null, reviewConnections: [], showExistingConnections: false, selectedId: null, previewExistingId: null, selectedAmount: null, pendingLocation: null, pendingLandConversion: null, pendingAirportCluster: null, infoOpen: false, status, busy: false });
    clearOverlay();
    lastOverlaySource = null;
    lastOverlayKey = null;
    clearLocationIndexData();
  }

  const uiStore = (() => {
    let state = { mode: "normal", existingSide: null, demolitionMode: false, createSide: null, createKind: null, createReviewed: false, reviewKey: null, reviewConnections: [], showExistingConnections: false, selectedId: null, previewExistingId: null, selectedAmount: null, pendingLocation: null, pendingLandConversion: null, pendingAirportCluster: null, panelOpen: false, infoOpen: false, infoMapVisible: false, status: "", busy: false, revision: 0 };
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

  function placementLayerRole(layerId, sourceLayer, filter = null) {
    const sl = String(sourceLayer || "").toLowerCase();
    if (sl === "water" || sl === "ocean_foundations") return "water";
    if (sl === "parks" || sl === "park") return "green";
    if (sl === "airports" || sl === "aeroway") return "airport";
    const id = String(layerId || "").toLowerCase();
    if (/water|ocean|lake|river/.test(id)) return "water";
    if (/airport|aerodrome|aero/.test(id)) return "airport";
    if (/park|green|forest|wood|grass/.test(id)) return "green";
    let filterText = "";
    try { filterText = JSON.stringify(filter || "").toLowerCase(); } catch {}
    if (/airport|aerodrome|aeroway/.test(filterText)) return "airport";
    if (/park|forest|wood|grass|green/.test(filterText)) return "green";
    if (/water|ocean|lake|river/.test(filterText)) return "water";
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
    const priority = { water: 3, airport: 2, green: 1 };
    for (const f of features) {
      const layerType = String(f?.layer?.type || "").toLowerCase();
      const geomType = String(f?.geometry?.type || "").toLowerCase();
      const physical = layerType === "fill" || layerType === "fill-extrusion" ||
        geomType === "polygon" || geomType === "multipolygon" ||
        (layerType === "line" && geomType.includes("line"));
      if (!physical) continue;
      const role = placementLayerRole(f?.layer?.id, f?.layer?.["source-layer"] || f?.sourceLayer);
      if (role !== "water" && role !== "airport" && role !== "green") continue;
      if (!best || priority[role] > priority[best]) best = role;
    }
    return best;
  }

  function placementRoleForLocation(location) {
    const map = api.utils.getMap?.();
    if (!map || !Array.isArray(location)) return null;
    let point = null;
    try { point = map.project({ lng: location[0], lat: location[1] }); }
    catch { try { point = map.project(location); } catch { return null; } }
    return placementBlockAt(map, point);
  }

  function sourceLayerContainsLocation(map, layerId, location) {
    if (!map?.queryRenderedFeatures || !map?.getLayer || !Array.isArray(location)) return null;
    let layer = null;
    try { layer = map.getLayer(layerId); } catch {}
    if (!layer) return null;
    let pixel;
    try { pixel = map.project({ lng: location[0], lat: location[1] }); }
    catch { return null; }
    if (!Number.isFinite(pixel?.x) || !Number.isFinite(pixel?.y)) return null;
    try { return (map.queryRenderedFeatures(pixel, { layers: [layerId] }) || []).length > 0; }
    catch { return null; }
  }

  function detectLandConversion(location) {
    const map = api.utils.getMap?.();
    if (!map || !Array.isArray(location)) return false;
    for (const layerId of ["parks-large", "parks-small"]) {
      if (sourceLayerContainsLocation(map, layerId, location) === true) return true;
    }
    return placementRoleForLocation(location) === "green";
  }

  function requiresLandConversion(location) {
    return detectLandConversion(location);
  }

  function newPointPriceMultiplier(location, kind = null, landConversion = null, airportCluster = null) {
    const converted = landConversion == null ? requiresLandConversion(location) : !!landConversion;
    const inAirportCluster = kind === "airport"
      ? (airportCluster == null ? airportClusterStatus(location).cluster : !!airportCluster)
      : null;
    let multiplier = CFG.NEW_POINT_PRICE_MULTIPLIER;
    if (converted) multiplier += CFG.LAND_CONVERSION_PRICE_SURCHARGE;
    multiplier += specialCreatePriceSurcharge(kind);
    if (kind === "airport" && !inAirportCluster) multiplier += CFG.INDEPENDENT_AIRPORT_PRICE_SURCHARGE;
    return multiplier;
  }

  function newPointPriceParts(kind = null, landConversion = false, airportCluster = null) {
    const parts = [{ label: "New point", surcharge: CFG.NEW_POINT_PRICE_MULTIPLIER - 1 }];
    if (landConversion) parts.push({ label: "Land conversion", surcharge: CFG.LAND_CONVERSION_PRICE_SURCHARGE });
    const special = specialCreatePriceSurcharge(kind);
    if (special > 0) parts.push({ label: kind === "airport" ? "Airport" : "University", surcharge: special });
    if (kind === "airport" && airportCluster === false) parts.push({ label: "Independent airport location", surcharge: CFG.INDEPENDENT_AIRPORT_PRICE_SURCHARGE });
    return parts.filter((part) => part.surcharge > 0);
  }

  function existingPriceParts(pointId, side) {
    if (side !== "work") return [];
    const kind = specialPointKind(pointId);
    const multiplier = specialExpansionPriceMultiplier(kind);
    if (!kind || multiplier <= 1) return [];
    return [{ label: kind === "airport" ? "Airport" : "University", surcharge: multiplier - 1 }];
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
      if (isDemandDeveloperPointId(pointId)) continue;
      if (haversine(location, p.location) <= maxDistanceM) return true;
    }
    return false;
  }

  function nearestDemandPointDistance(location, maxDistanceM = Infinity, predicate = null) {
    const dd = api.gameState.getDemandData?.();
    if (!dd?.points?.size || !Array.isArray(location)) return Infinity;
    const searchRadius = Number.isFinite(maxDistanceM) ? maxDistanceM : 200000;
    let best = Infinity;
    for (const rec of demandGeoCandidates(location, searchRadius, dd)) {
      if (!Array.isArray(rec?.p?.location)) continue;
      if (predicate && !predicate(rec.id, rec.p)) continue;
      const d = haversine(location, rec.p.location);
      if (d < best) best = d;
    }
    return best;
  }

  function anyDemandPointWithin(location, maxDistanceM) {
    return nearestDemandPointDistance(location, maxDistanceM) < maxDistanceM;
  }

  function localMeters(location, coord) {
    if (!Array.isArray(location) || !Array.isArray(coord)) return null;
    const lon0 = Number(location[0]), lat0 = Number(location[1]);
    const lon = Number(coord[0]), lat = Number(coord[1]);
    if (![lon0, lat0, lon, lat].every(Number.isFinite)) return null;
    const cos = Math.max(0.01, Math.cos(lat0 * Math.PI / 180));
    return [(lon - lon0) * 111320 * cos, (lat - lat0) * 111320];
  }

  function segmentDistanceFromLocation(location, a, b) {
    const pa = localMeters(location, a), pb = localMeters(location, b);
    if (!pa || !pb) return Infinity;
    const vx = pb[0] - pa[0], vy = pb[1] - pa[1];
    const len2 = vx * vx + vy * vy;
    if (len2 <= 1e-9) return Math.hypot(pa[0], pa[1]);
    const t = Math.max(0, Math.min(1, -(pa[0] * vx + pa[1] * vy) / len2));
    return Math.hypot(pa[0] + t * vx, pa[1] + t * vy);
  }

  function ringContainsLocation(location, ring) {
    if (!Array.isArray(ring) || ring.length < 3 || !Array.isArray(location)) return false;
    const x = Number(location[0]), y = Number(location[1]);
    if (!Number.isFinite(x) || !Number.isFinite(y)) return false;
    let inside = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const xi = Number(ring[i]?.[0]), yi = Number(ring[i]?.[1]);
      const xj = Number(ring[j]?.[0]), yj = Number(ring[j]?.[1]);
      if (![xi, yi, xj, yj].every(Number.isFinite)) continue;
      const crosses = (yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / ((yj - yi) || 1e-12) + xi;
      if (crosses) inside = !inside;
    }
    return inside;
  }

  function lineDistanceFromLocation(location, coords) {
    if (!Array.isArray(coords) || coords.length === 0) return Infinity;
    if (coords.length === 1) return haversine(location, coords[0]);
    let best = Infinity;
    for (let i = 1; i < coords.length; i++) best = Math.min(best, segmentDistanceFromLocation(location, coords[i - 1], coords[i]));
    return best;
  }

  function polygonDistanceFromLocation(location, rings) {
    if (!Array.isArray(rings) || !rings.length) return Infinity;
    const insideOuter = ringContainsLocation(location, rings[0]);
    const insideHole = insideOuter && rings.slice(1).some((ring) => ringContainsLocation(location, ring));
    if (insideOuter && !insideHole) return 0;
    let best = Infinity;
    for (const ring of rings) best = Math.min(best, lineDistanceFromLocation(location, ring));
    return best;
  }

  function geometryDistanceFromLocation(location, geometry) {
    const type = String(geometry?.type || "");
    const c = geometry?.coordinates;
    if (type === "Point") return Array.isArray(c) ? haversine(location, c) : Infinity;
    if (type === "MultiPoint") return Math.min(Infinity, ...(c || []).map((point) => haversine(location, point)));
    if (type === "LineString") return lineDistanceFromLocation(location, c);
    if (type === "MultiLineString") return Math.min(Infinity, ...(c || []).map((line) => lineDistanceFromLocation(location, line)));
    if (type === "Polygon") return polygonDistanceFromLocation(location, c);
    if (type === "MultiPolygon") return Math.min(Infinity, ...(c || []).map((poly) => polygonDistanceFromLocation(location, poly)));
    if (type === "GeometryCollection") return Math.min(Infinity, ...(geometry?.geometries || []).map((g) => geometryDistanceFromLocation(location, g)));
    return Infinity;
  }

  function hasMappedAirportGeometryLayer(map) {
    if (!map) return false;
    let layers = [];
    try { layers = map.getStyle?.()?.layers || []; } catch { return false; }
    for (const layer of layers) {
      if (placementLayerRole(layer?.id, layer?.["source-layer"], layer?.filter) !== "airport") continue;
      const type = String(layer?.type || "").toLowerCase();
      if (type === "fill" || type === "fill-extrusion" || type === "line") return true;
    }
    return false;
  }

  function sourceAirportDistance(map, location, maxDistanceM = 500) {
    if (!map?.querySourceFeatures || !Array.isArray(location)) return Infinity;
    let layers = [];
    try { layers = map.getStyle?.()?.layers || []; } catch { return Infinity; }
    const seen = new Set();
    let best = Infinity;
    for (const layer of layers) {
      if (placementLayerRole(layer?.id, layer?.["source-layer"], layer?.filter) !== "airport" || !layer?.source) continue;
      const sourceLayer = layer["source-layer"] || "";
      const filterKey = layer.filter ? JSON.stringify(layer.filter) : "";
      const key = `${layer.source}|${sourceLayer}|${filterKey}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const options = {};
      if (sourceLayer) options.sourceLayer = sourceLayer;
      if (layer.filter) options.filter = layer.filter;
      let features = [];
      try { features = map.querySourceFeatures(layer.source, options) || []; } catch { continue; }
      for (const feature of features) {
        const d = geometryDistanceFromLocation(location, feature?.geometry);
        if (Number.isFinite(d)) best = Math.min(best, d);
      }
    }
    return best <= maxDistanceM ? best : Infinity;
  }

  function renderedAirportDistance(map, location, maxDistanceM = 500) {
    if (!map || !Array.isArray(location)) return Infinity;
    let center;
    try { center = map.project({ lng: location[0], lat: location[1] }); }
    catch { try { center = map.project(location); } catch { return Infinity; } }
    if (!Number.isFinite(center?.x) || !Number.isFinite(center?.y)) return Infinity;

    const lat = Number(location[1]);
    const lon = Number(location[0]);
    const dLat = maxDistanceM / 111320;
    const dLon = maxDistanceM / Math.max(20000, 111320 * Math.cos(lat * Math.PI / 180));
    const samples = [[lon + dLon, lat], [lon - dLon, lat], [lon, lat + dLat], [lon, lat - dLat]];
    let radiusPx = 4;
    for (const sample of samples) {
      try {
        const sp = map.project({ lng: sample[0], lat: sample[1] });
        const dx = Number(sp?.x) - Number(center.x);
        const dy = Number(sp?.y) - Number(center.y);
        if (Number.isFinite(dx) && Number.isFinite(dy)) radiusPx = Math.max(radiusPx, Math.hypot(dx, dy));
      } catch {}
    }
    radiusPx = Math.max(4, Math.min(1200, radiusPx + 3));

    let features = [];
    try {
      features = map.queryRenderedFeatures([
        [center.x - radiusPx, center.y - radiusPx],
        [center.x + radiusPx, center.y + radiusPx],
      ]) || [];
    } catch { return Infinity; }

    let best = Infinity;
    for (const f of features) {
      if (placementLayerRole(f?.layer?.id, f?.layer?.["source-layer"] || f?.sourceLayer) !== "airport") continue;
      const d = geometryDistanceFromLocation(location, f?.geometry);
      if (Number.isFinite(d)) best = Math.min(best, d);
    }
    return best <= maxDistanceM ? best : Infinity;
  }

  function airportClusterStatus(location) {
    const map = api.utils.getMap?.();
    if (!map || !Array.isArray(location)) return { cluster: false, airportDistance: Infinity, nearestOtherDemand: Infinity };

    const mappedAirportDistance = Math.min(
      sourceAirportDistance(map, location, 500),
      renderedAirportDistance(map, location, 500)
    );
    const mapHasAirportGeometry = hasMappedAirportGeometryLayer(map);
    const nativeAirPointDistance = mapHasAirportGeometry
      ? Infinity
      : nearestDemandPointDistance(location, 500, (id) =>
          specialPointKind(id) === "airport" && !isDemandDeveloperPointId(String(id))
        );
    const airportDistance = Number.isFinite(mappedAirportDistance)
      ? mappedAirportDistance
      : nativeAirPointDistance;

    if (!Number.isFinite(airportDistance)) {
      return { cluster: false, airportDistance: Infinity, nearestOtherDemand: Infinity };
    }

    const nearestOtherDemand = nearestDemandPointDistance(
      location,
      500,
      (id) => specialPointKind(id) !== "airport"
    );
    return { cluster: nearestOtherDemand >= airportDistance, airportDistance, nearestOtherDemand };
  }

  let landscapeSnapshot = null;
  function clearLandscapeSnapshot() { landscapeSnapshot = null; }

  function landscapeCoverageSnapshot() {
    const city = currentCity();
    const map = api.utils.getMap?.();
    if (landscapeSnapshot && landscapeSnapshot.city === city &&
        landscapeSnapshot.revision === demandRevision &&
        landscapeSnapshot.map === map) return landscapeSnapshot;
    const dd = api.gameState.getDemandData?.();
    const native = [];
    for (const [id, point] of dd?.points?.entries?.() || []) {
      if (isDemandDeveloperPointId(String(id)) || !Array.isArray(point?.location)) continue;
      const lon = Number(point.location[0]), lat = Number(point.location[1]);
      if (!Number.isFinite(lon) || !Number.isFinite(lat) || Math.abs(lon) > 180 || Math.abs(lat) > 90) continue;
      native.push([lon, lat]);
    }
    let reliableBounds = null;
    const candidateBounds = playableMapBounds(map);
    if (candidateBounds) {
      const lonSpan = candidateBounds[0] <= candidateBounds[2]
        ? candidateBounds[2] - candidateBounds[0] : 360 - candidateBounds[0] + candidateBounds[2];
      const latSpan = candidateBounds[3] - candidateBounds[1];
      if (lonSpan <= 45 && latSpan <= 35) {
        const step = Math.max(1, Math.floor(native.length / 64));
        let sampled = 0, contained = 0;
        for (let i = 0; i < native.length && sampled < 64; i += step) {
          sampled++;
          if (locationInBounds(native[i], candidateBounds)) contained++;
        }
        if (sampled >= 4 && contained / sampled >= 0.70) reliableBounds = candidateBounds;
      }
    }

    let outerFootprint = null;
    if (!reliableBounds && native.length >= 40) {
      const lons = native.map(p => p[0]).sort((a, b) => a - b);
      const lats = native.map(p => p[1]).sort((a, b) => a - b);
      const trim = Math.max(1, Math.floor(native.length * 0.005));
      const w = lons[trim], e = lons[lons.length - 1 - trim];
      const south = lats[trim], north = lats[lats.length - 1 - trim];
      const midLat = (south + north) / 2;
      const marginLat = Math.max(0.18, (north - south) * 0.15);
      const marginLon = Math.max(0.18 / Math.max(0.25, Math.abs(Math.cos(midLat * Math.PI / 180))), (e - w) * 0.15);
      if (e - w < 120 && north - south < 60) {
        outerFootprint = [Math.max(-180, w - marginLon), Math.max(-90, south - marginLat),
          Math.min(180, e + marginLon), Math.min(90, north + marginLat)];
      }
    }
    landscapeSnapshot = { city, revision: demandRevision, map,
      reliableBounds, outerFootprint };
    return landscapeSnapshot;
  }

  function counterpartWithinLandscape(location) {
    if (!Array.isArray(location) || location.length < 2) return false;
    const lng = Number(location[0]), lat = Number(location[1]);
    if (!Number.isFinite(lng) || !Number.isFinite(lat) || Math.abs(lng) > 180 || Math.abs(lat) > 90) return false;
    const { reliableBounds, outerFootprint } = landscapeCoverageSnapshot();
    if (reliableBounds) return locationInBounds([lng, lat], reliableBounds);
    if (outerFootprint) return locationInBounds([lng, lat], outerFootprint);
    return true;
  }

  function quickPlacementOutsideLandscape(location) {
    if (!Array.isArray(location) || location.length < 2 ||
        !Number.isFinite(Number(location[0])) || !Number.isFinite(Number(location[1])) ||
        Math.abs(Number(location[0])) > 180 || Math.abs(Number(location[1])) > 90)
      return "Invalid map location.";
    if (!counterpartWithinLandscape(location))
      return "Can't place a point outside the mapped area.";
    return null;
  }

  function placementBlockReason(location, createKind = null) {
    const map = api.utils.getMap?.();
    if (!map || !Array.isArray(location)) return null;
    const outside = quickPlacementOutsideLandscape(location);
    if (outside) return outside;
    if (createKind !== "airport" && !hasNativeDemandAnchorNearby(location))
      return "New points must be within 5 km of an original demand point.";

    let point = null;
    try { point = map.project({ lng: location[0], lat: location[1] }); } catch {
      try { point = map.project(location); } catch { return null; }
    }
    const role = placementBlockAt(map, point);
    if (role === "water") return "Can't place a point on water.";
    if (role === "airport" && createKind !== "airport") return "Can't place this point on airport ground.";

    if (createKind === "airport") {
      const airport = airportClusterStatus(location);
      if (Number.isFinite(airport.airportDistance)) {
        if (!airport.cluster) return "Airport expansion can't cross a closer demand point.";
      } else if (anyDemandPointWithin(location, CFG.STANDALONE_AIRPORT_CLEARANCE_M)) {
        return "A standalone Airport point must be at least 2 km from every demand point.";
      }
    }

    const place = locationHeaderParts(location);
    if (createKind !== "airport" && place?.title === "Area" && areaFallbackOutsideDemandFootprint(location)) {
      return "Can't place a point outside the mapped area.";
    }
    return null;
  }

  function developedSideForPoint(pointId, p = null) {
    const special = specialPointKind(pointId);
    if (special && Number(p?.jobs || 0) > 0) return special;
    const g = activeDevelopmentGroups().find((x) => String(x.pointId) === String(pointId));
    if (!g) return existingPointType(p);
    const addedResidents = Math.abs(Number(g.residents || 0));
    const addedWorkers = Math.abs(Number(g.workers || 0));
    if (addedResidents > addedWorkers) return "residential";
    if (addedWorkers > addedResidents) return "work";
    return existingPointType(p);
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
      ...clearCreateReviewState(),
      infoOpen: false,
      infoMapVisible: false,
      mode: "normal",
      createSide: null,
      pendingLocation: null,
      existingSide: developedSideForPoint(id, p),
      demolitionMode: false,
      showExistingConnections: false,
      selectedId: id,
      selectedAmount: CFG.STEP,
      status: "",
    });
    refreshOverlay();
    focusDemandPoint(id);
    return true;
  }

  let reviewedPlanCache = null;
  function rememberReviewedPlan(key, plan) {
    reviewedPlanCache = key && plan?.ok ? { key, demandRevision, plan } : null;
    if (reviewedPlanCache) warmReviewedRoadRoutes(plan);
  }
  function reviewedPlanForKey(key) {
    if (!key || !reviewedPlanCache || reviewedPlanCache.key !== key || reviewedPlanCache.demandRevision !== demandRevision) return null;
    return reviewedPlanCache.plan;
  }
  function clearReviewedPlanCache() { reviewedPlanCache = null; }

  function clearCreateReviewState() {
    return { createReviewed: false, reviewKey: null, reviewConnections: [] };
  }

  function createReviewKey(location, side, amount, createKind = null, landConversion = null, airportCluster = null) {
    if (!Array.isArray(location) || !side || !DEVELOPMENT_AMOUNTS.includes(amount)) return null;
    return [
      demandRevision,
      Number(location[0]).toFixed(6),
      Number(location[1]).toFixed(6),
      side,
      createKind || "normal",
      landConversion == null ? "land:?" : `land:${landConversion ? 1 : 0}`,
      airportCluster == null ? "airport:?" : `airport:${airportCluster ? 1 : 0}`,
      amount,
    ].join("|");
  }

  function currentCreateReviewKey(s = uiStore.get()) {
    return s.mode === "create"
      ? createReviewKey(s.pendingLocation, s.createSide, s.selectedAmount, s.createKind, s.pendingLandConversion, s.pendingAirportCluster)
      : null;
  }

  function isCurrentCreateReview(s = uiStore.get()) {
    const key = currentCreateReviewKey(s);
    return !!key && s.createReviewed === true && s.reviewKey === key;
  }

  function existingReviewKey(pointId, side, amount, demolitionMode = false) {
    if (!pointId || !side || !(Number(amount) > 0)) return null;
    if (!demolitionMode && !DEVELOPMENT_AMOUNTS.includes(amount)) return null;
    return [demandRevision, demolitionMode ? "demolish" : "existing", String(pointId), side, amount].join("|");
  }

  function currentExistingReviewKey(s = uiStore.get()) {
    if (s.mode === "create" || !s.selectedId || !s.existingSide) return null;
    const side = existingTypeSide(s.existingSide);
    let amount = Number(s.selectedAmount);
    if (s.demolitionMode) {
      const point = looseMapGet(api.gameState.getDemandData?.()?.points, s.selectedId);
      const options = demolitionAmountsForPoint(point, side);
      if (!options.includes(amount)) amount = options[0];
    }
    return existingReviewKey(s.selectedId, side, amount, !!s.demolitionMode);
  }

  function isCurrentExistingReview(s = uiStore.get()) {
    const key = currentExistingReviewKey(s);
    return !!key && s.createReviewed === true && s.reviewKey === key;
  }

  function overlappingDemandPoint(location, dd) {
    let nearest = null;
    let distance = Infinity;
    for (const rec of demandGeoCandidates(location, 15, dd)) {
      const p = rec?.p;
      if (!Array.isArray(p?.location)) continue;
      const d = haversine(location, p.location);
      if (d < distance) {
        distance = d;
        nearest = { id: String(rec.id), distance };
      }
    }
    return nearest && nearest.distance <= 15 ? nearest : null;
  }

  function reviewConnectionsForPlan(plan) {
    const totals = new Map();
    const counterpartSide = plan.side === "residential" ? "work" : "residential";
    for (const flow of plan.flows || []) {
      const id = String(plan.side === "residential" ? flow.jobId : flow.residenceId);
      totals.set(id, (totals.get(id) || 0) + (Number(flow.size) || 0));
    }
    const connections = [];
    for (const [id, size] of totals.entries()) {
      const point = plan.before?.points?.get(id) || plan.planned?.points?.get(id);
      if (!Array.isArray(point?.location)) continue;
      const connectionType = counterpartSide === "work" ? (specialPointKind(id) || "work") : "residential";
      connections.push({ id, size, side: counterpartSide, type: connectionType, location: [Number(point.location[0]), Number(point.location[1])] });
    }
    connections.sort((a, b) => b.size - a.size || a.id.localeCompare(b.id));
    return connections;
  }

  async function prepareCreateReview(side, amount, createKind = null) {
    if (uiStore.get().busy) return;
    const s = uiStore.get();
    const dd = api.gameState.getDemandData?.();
    if (!dd || !Array.isArray(s.pendingLocation)) return;

    const placementError = placementBlockReason(s.pendingLocation, createKind);
    if (placementError) {
      uiStore.set({ ...clearCreateReviewState(), pendingLocation: null, pendingLandConversion: null, pendingAirportCluster: null, selectedAmount: null, status: placementError });
      refreshOverlay();
      return;
    }

    const overlap = overlappingDemandPoint(s.pendingLocation, dd);
    if (overlap) {
      uiStore.set({ ...clearCreateReviewState(), previewExistingId: overlap.id, status: "There's already a demand point here. Use Develop or choose another location." });
      refreshOverlay();
      return;
    }

    const epoch = lifecycleEpoch, city = currentCity();
    uiStore.set({ status: "Checking road access…" });
    if (!(await streetRoutes.preparePlanning(city))) {
      if (epoch === lifecycleEpoch && city === currentCity())
        uiStore.set({ ...clearCreateReviewState(), status: "Road network is unavailable. Try Review again." });
      return;
    }
    if (epoch !== lifecycleEpoch || city !== currentCity() ||
        !Array.isArray(uiStore.get().pendingLocation) ||
        uiStore.get().pendingLocation.join(",") !== s.pendingLocation.join(",")) return;
    const fresh = api.gameState.getDemandData?.();
    const plan = planDevelopment(fresh, { location: s.pendingLocation, landConversion: s.pendingLandConversion, airportCluster: s.pendingAirportCluster }, side, amount, true, createKind);
    if (!plan.ok) {
      uiStore.set({ ...clearCreateReviewState(), status: plan.error });
      refreshOverlay();
      return;
    }

    const connections = reviewConnectionsForPlan(plan);
    const key = createReviewKey(s.pendingLocation, side, amount, createKind, s.pendingLandConversion, s.pendingAirportCluster);
    rememberReviewedPlan(key, plan);
    const commuterCount = connections.reduce((sum, connection) => sum + connection.size, 0);
    uiStore.set({
      createReviewed: true,
      reviewKey: key,
      reviewConnections: connections,
      showExistingConnections: false,
      status: connections.length
        ? `Reviewing ${connections.length} planned connection${connections.length === 1 ? "" : "s"} for ${Math.round(commuterCount).toLocaleString()} commuters. Confirm Build to create the point.`
        : "Plan reviewed. Confirm Build to create the point.",
    });
    refreshOverlay();
  }

  async function prepareExistingReview(id, side, amount) {
    if (uiStore.get().busy) return;
    const dd = api.gameState.getDemandData?.();
    const point = dd?.points?.get(String(id));
    if (!dd || !point) return;
    const demolitionMode = !!uiStore.get().demolitionMode;
    const epoch = lifecycleEpoch, city = currentCity();
    if (!demolitionMode) {
      uiStore.set({ status: "Checking road access…" });
      if (!(await streetRoutes.preparePlanning(city))) {
        if (epoch === lifecycleEpoch && city === currentCity())
          uiStore.set({ ...clearCreateReviewState(), status: "Road network is unavailable. Try Review again." });
        return;
      }
      if (epoch !== lifecycleEpoch || city !== currentCity() ||
          String(uiStore.get().selectedId) !== String(id) ||
          !!uiStore.get().demolitionMode !== demolitionMode) return;
    }
    const fresh = api.gameState.getDemandData?.();
    const freshPoint = looseMapGet(fresh?.points, id);
    if (!freshPoint) return;
    const plan = demolitionMode ? planDemolition(fresh, freshPoint, side, amount) : planDevelopment(fresh, freshPoint, side, amount, false);
    if (!plan.ok) {
      uiStore.set({ ...clearCreateReviewState(), status: plan.error });
      refreshOverlay();
      return;
    }
    const connections = reviewConnectionsForPlan(plan);
    const key = existingReviewKey(id, side, amount, demolitionMode);
    rememberReviewedPlan(key, plan);
    const commuterCount = connections.reduce((sum, connection) => sum + connection.size, 0);
    uiStore.set({
      createReviewed: true,
      reviewKey: key,
      reviewConnections: connections,
      showExistingConnections: false,
      status: connections.length
        ? `Reviewing ${connections.length} connection${connections.length === 1 ? "" : "s"} affecting ${Math.round(commuterCount).toLocaleString()} commuters.${demolitionMode ? " Confirm Demolish to apply the reduction." : ""}`
        : demolitionMode ? "Demolition reviewed. Confirm Demolish to apply it." : "Plan reviewed.",
    });
    refreshOverlay();
  }

  function mapClickHandler(e) {
    const s = uiStore.get();
    if (!s.panelOpen) return;
    const map = api.utils.getMap();
    if (!map) return;
    const dd = api.gameState.getDemandData?.();
    if (s.mode === "create" && s.createSide && !s.infoOpen) {
      const location = [e.lngLat?.lng, e.lngLat?.lat];
      const reason = quickPlacementOutsideLandscape(location);
      if (reason) {
        uiStore.set({ ...clearCreateReviewState(), pendingLocation: null,
          pendingLandConversion: null, pendingAirportCluster: null,
          previewExistingId: null, status: reason });
        refreshOverlay();
        return;
      }
    }
    const contextId = contextPointIdAt(map, e.point);

    if (s.infoOpen) {
      if (contextId && activeDevelopmentGroups().some((g) => String(g.pointId) === String(contextId))) {
        openPointForImprovement(contextId);
      }
      return;
    }

    if (s.mode === "create") {
      if (contextId && dd?.points?.has(contextId)) {
        uiStore.set({ ...clearCreateReviewState(), previewExistingId: contextId, status: "" });
        refreshOverlay();
        return;
      }
      if (!s.createSide) {
        uiStore.set({ ...clearCreateReviewState(), status: "" });
        refreshOverlay();
        return;
      }
      const pendingLocation = [e.lngLat.lng, e.lngLat.lat];
      const reason = placementBlockReason(pendingLocation, s.createKind);
      if (reason) {
        uiStore.set({ ...clearCreateReviewState(), previewExistingId: null, pendingLocation: null, pendingLandConversion: null, pendingAirportCluster: null, selectedId: null, selectedAmount: null, status: reason });
        refreshOverlay();
        return;
      }
      const pendingLandConversion = detectLandConversion(pendingLocation);
      const pendingAirportCluster = s.createKind === "airport" ? airportClusterStatus(pendingLocation).cluster : null;
      uiStore.set({
        ...clearCreateReviewState(),
        pendingLocation,
        pendingLandConversion,
        pendingAirportCluster,
        selectedId: null,
        previewExistingId: null,
        selectedAmount: CFG.STEP,
        status: "",
      });
      refreshOverlay();
      return;
    }

    if (contextId && dd?.points?.has(contextId)) {
      const p = dd.points.get(contextId);
      const type = s.existingSide || existingPointType(p);
      if (pointMatchesExistingType(p, type)) {
        uiStore.set({ ...clearCreateReviewState(), existingSide: type, demolitionMode: false, showExistingConnections: false, selectedId: contextId, previewExistingId: null, selectedAmount: CFG.STEP, status: "" });
      } else {
        uiStore.set({ showExistingConnections: false, selectedId: null, previewExistingId: null, selectedAmount: null, status: "" });
      }
    } else {
      uiStore.set({ showExistingConnections: false, selectedId: null, previewExistingId: null, selectedAmount: null, status: "" });
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
  function existingPriceKey(id, side, multiplier) {
    return `${demandRevision}|${id}|${side || ""}|${multiplier}`;
  }
  function priceCurveForExisting(id, side) {
    const multiplier = side === "work" ? specialExpansionPriceMultiplier(specialPointKind(id)) : 1;
    const key = existingPriceKey(id, side, multiplier);
    const cached = existingPriceCache.get(key);
    if (cached) return cached;
    const dd = api.gameState.getDemandData();
    const p = dd?.points.get(id);
    if (!dd || !p) return null;
    const q = quoteDevelopmentPrice(dd, p.location, MAX_DEVELOPMENT_AMOUNT, false, multiplier);
    if (!q.ok) return null;
    const curve = Object.fromEntries(DEVELOPMENT_AMOUNTS.map((amount) => [amount, { ok: true, totalCost: q.cumulative[amount] }]));
    existingPriceCache.set(key, curve);
    if (existingPriceCache.size > 24) existingPriceCache.delete(existingPriceCache.keys().next().value);
    return curve;
  }
  function previewForExisting(id, side, amount) {
    return priceCurveForExisting(id, side)?.[amount] || null;
  }
  const demolitionPriceCache = new Map();
  function previewForDemolition(id, side, amount) {
    const dd = api.gameState.getDemandData?.();
    const p = looseMapGet(dd?.points, id);
    const actual = Math.max(0, Math.round(Number(amount) || 0));
    if (!dd || !p || !(actual > 0)) return null;
    const available = availableDemandForDemolition(dd, id, side);
    if (actual > available) return null;
    const key = `${demandRevision}|${String(id)}|${side}|${activeAddedDemand()}`;
    let curve = demolitionPriceCache.get(key);
    if (!curve || curve.available !== available) {
      const q = quoteDemolitionPrice(dd, p.location, available, side, id);
      if (!q.ok) return null;
      curve = { available, cumulative: q.cumulative };
      demolitionPriceCache.set(key, curve);
      if (demolitionPriceCache.size > 12) demolitionPriceCache.delete(demolitionPriceCache.keys().next().value);
    }
    const totalCost = curve.cumulative[actual];
    return Number.isFinite(totalCost) ? { ok: true, totalCost, pricedAmount: actual } : null;
  }

  const createPriceCache = new Map();
  function createPriceKey(location, createKind = null, landConversion = null, airportCluster = null) {
    const land = landConversion == null ? (requiresLandConversion(location) ? 1 : 0) : (landConversion ? 1 : 0);
    return `${demandRevision}|${location?.[0]?.toFixed?.(5) || ""}|${location?.[1]?.toFixed?.(5) || ""}|${createKind || "normal"}|land:${land}|airport:${airportCluster == null ? "?" : airportCluster ? 1 : 0}`;
  }
  function priceCurveForCreate(location, createKind = null, landConversion = null, airportCluster = null) {
    if (!Array.isArray(location)) return null;
    const key = createPriceKey(location, createKind, landConversion, airportCluster);
    const cached = createPriceCache.get(key);
    if (cached) return cached;
    const dd = api.gameState.getDemandData();
    if (!dd) return null;
    const multiplier = newPointPriceMultiplier(location, createKind, landConversion, airportCluster);
    const followupMultiplier = specialExpansionPriceMultiplier(createKind);
    const q = quoteDevelopmentPrice(dd, location, MAX_DEVELOPMENT_AMOUNT, true, multiplier, followupMultiplier);
    if (!q.ok) return null;
    const curve = Object.fromEntries(DEVELOPMENT_AMOUNTS.map((amount) => [amount, { ok: true, totalCost: q.cumulative[amount] }]));
    createPriceCache.set(key, curve);
    if (createPriceCache.size > 24) createPriceCache.delete(createPriceCache.keys().next().value);
    return curve;
  }
  function invalidatePreviews({ demand = false, ledgerState = false } = {}) {
    if (demand || ledgerState) clearReviewedPlanCache();
    if (demand) {
      demandRevision++;
      clearLandscapeSnapshot();
      clearDevelopmentSummaryCaches();
      spatialPricingCache.clear();
      demandHitIndexRevision = -1;
      demandHitIndexPoints = null;
      demandHitIndexGrid = null;
      drivingDonorCacheRevision = -1;
      drivingDonorCache = null;
      specialRegionalPotentialCache.clear();
    }
    if (ledgerState) clearDevelopmentSummaryCaches();
    existingPriceCache.clear();
    demolitionPriceCache.clear();
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
      if (stillSelected) {
        const livePoint = looseMapGet(api.gameState.getDemandData?.()?.points, pointId);
        const currentState = uiStore.get();
        const available = currentState.demolitionMode && livePoint ? availableDemandForDemolition(api.gameState.getDemandData?.(), pointId, side) : 0;
        uiStore.set({ existingSide: side === "work" ? (specialPointKind(pointId) || "work") : side, selectedAmount: currentState.demolitionMode ? Math.min(CFG.STEP, available) : CFG.STEP });
      }
      refreshOverlay();
      if (focus && stillSelected && index === delays.length - 1) focusDemandPoint(pointId);
    }
  }

  let buildLocked = false;

  async function runExisting(id, side, amount) {
    if (buildLocked || undoLocked || uiStore.get().busy) return;
    buildLocked = true;
    const epoch = lifecycleEpoch, city = currentCity();
    try {
      const revision = demandRevision;
      const dd = api.gameState.getDemandData();
      const p = dd?.points.get(id);
      if (!dd || !p) return;
      const s = uiStore.get();
      const demolitionMode = !!s.demolitionMode;
      if (!isCurrentExistingReview(s)) {
        uiStore.set({ busy: false, status: `Review the planned ${demolitionMode ? "demolition" : "connections"} before continuing.` });
        refreshOverlay();
        return;
      }
      uiStore.set({ busy: true, status: "Preparing…" });
      const reviewKey = existingReviewKey(id, side, amount, demolitionMode);
      if (!demolitionMode && !(await streetRoutes.preparePlanning(currentCity()))) {
        uiStore.set({ busy: false, status: "Road access is unavailable. Review again before building." });
        return;
      }
      if (epoch !== lifecycleEpoch || city !== currentCity() || revision !== demandRevision ||
          !isCurrentExistingReview(uiStore.get())) {
        uiStore.set({ busy: false, status: "Map or demand changed. Review again before building." });
        return;
      }
      const plan = reviewedPlanForKey(reviewKey) || (demolitionMode ? planDemolition(dd, p, side, amount) : planDevelopment(dd, p, side, amount, false));
      clearReviewedPlanCache();
      if (!plan.ok) { uiStore.set({ busy: false, status: plan.error }); return; }
      uiStore.set({ status: demolitionMode ? `Demolishing ${amount.toLocaleString()} ${side === "residential" ? "Residents" : "Workers"}…` : `Adding +${amount} ${side === "residential" ? "Residents" : "Workers"}…` });
      const result = demolitionMode ? await executeDemolition(plan) : await executePlan(plan);
      if (epoch !== lifecycleEpoch || city !== currentCity()) return;
      if (result.ok) {
        invalidatePreviews({ demand: true, ledgerState: true });
        const livePoint = looseMapGet(api.gameState.getDemandData?.()?.points, id);
        uiStore.set({
          ...clearCreateReviewState(),
          selectedId: livePoint ? String(id) : null,
          mode: "normal",
          existingSide: side === "work" ? (specialPointKind(id) || "work") : side,
          demolitionMode: false,
          createSide: null,
          selectedAmount: CFG.STEP,
          pendingLocation: null,
          status: "Recalculating…",
        });
        refreshOverlay();
        await schedulePostBuildPriceRefresh(id, side);
        if (epoch !== lifecycleEpoch || city !== currentCity()) return;
        uiStore.set({
          busy: false,
          status: unsavedWorkingLedger ? "Development applied, but could not be saved. Save again after checking storage." : demolitionMode
            ? `Demolished ${amount.toLocaleString()} ${side === "residential" ? "Residents" : "Workers"} for ${fmtMoney(plan.totalCost)}.${result.cleanupErrors?.length ? " Some empty points could not be removed." : ""}`
            : `Added +${amount} ${side === "residential" ? "Residents" : "Workers"} for ${fmtMoney(plan.totalCost)}.`,
        });
      } else {
        uiStore.set({ busy: false, status: result.error });
        refreshOverlay();
      }
    } catch (e) {
      console.warn(`${TAG} development failed`, e);
      if (epoch === lifecycleEpoch && city === currentCity())
        uiStore.set({ busy: false, status: `Development failed: ${String(e?.message || e)}` });
    } finally {
      buildLocked = false;
    }
  }

  async function runCreate(side, amount = 200, createKind = null) {
    if (buildLocked || undoLocked || uiStore.get().busy) return;
    buildLocked = true;
    const epoch = lifecycleEpoch, city = currentCity();
    try {
      const revision = demandRevision;
      const s = uiStore.get();
      const dd = api.gameState.getDemandData();
      if (!dd || !s.pendingLocation) return;

      const placementError = placementBlockReason(s.pendingLocation, createKind);
      if (placementError) {
        uiStore.set({ busy: false, pendingLocation: null, pendingLandConversion: null, pendingAirportCluster: null, selectedAmount: null, status: placementError });
        refreshOverlay();
        return;
      }

      const overlap = overlappingDemandPoint(s.pendingLocation, dd);
      if (overlap) {
        uiStore.set({
          ...clearCreateReviewState(),
          busy: false,
          previewExistingId: overlap.id,
          status: "There's already a demand point here. Use Develop or choose another location.",
        });
        refreshOverlay();
        return;
      }

      if (!isCurrentCreateReview(s)) {
        uiStore.set({ busy: false, status: "Review the planned connections before building." });
        refreshOverlay();
        return;
      }

      uiStore.set({ busy: true, status: "Preparing…" });
      const reviewKey = createReviewKey(s.pendingLocation, side, amount, createKind, s.pendingLandConversion, s.pendingAirportCluster);
      if (!(await streetRoutes.preparePlanning(currentCity()))) {
        uiStore.set({ busy: false, status: "Road access is unavailable. Review again before building." });
        return;
      }
      if (epoch !== lifecycleEpoch || city !== currentCity() || revision !== demandRevision ||
          !isCurrentCreateReview(uiStore.get())) {
        uiStore.set({ busy: false, status: "Map or demand changed. Review again before building." });
        return;
      }
      const plan = reviewedPlanForKey(reviewKey) || planDevelopment(dd, { location: s.pendingLocation, landConversion: s.pendingLandConversion, airportCluster: s.pendingAirportCluster }, side, amount, true, createKind);
      clearReviewedPlanCache();
      if (!plan.ok) { uiStore.set({ busy: false, status: plan.error }); return; }
      uiStore.set({ status: "Creating point…" });
      const result = await executePlan(plan);
      if (epoch !== lifecycleEpoch || city !== currentCity()) return;
      if (result.ok) {
        invalidatePreviews({ demand: true });
        uiStore.set({
          status: "Recalculating…",
          mode: "normal",
          existingSide: side === "work" ? (specialPointKind(plan.pointId) || "work") : side,
          createSide: null,
          createKind: null,
          ...clearCreateReviewState(),
          selectedId: String(plan.pointId),
          pendingLocation: null,
          pendingLandConversion: null, pendingAirportCluster: null,
          selectedAmount: CFG.STEP,
        });
        refreshOverlay();
        await schedulePostBuildPriceRefresh(plan.pointId, side, { focus: true });
        if (epoch !== lifecycleEpoch || city !== currentCity()) return;
        uiStore.set({
          busy: false,
          status: unsavedWorkingLedger ? "Development applied, but could not be saved. Save again after checking storage." : `Created ${plan.createKind === "airport" ? "Airport workplace" : plan.createKind === "university" ? "University workplace" : "point"} with ${amount} ${side === "residential" ? "Residents" : "Workers"} for ${fmtMoney(plan.totalCost)}.`,
        });
      } else {
        uiStore.set({
          busy: false,
          status: result.error,
          mode: s.mode,
          existingSide: s.existingSide,
          createSide: s.createSide,
          createKind: s.createKind,
          createReviewed: s.createReviewed,
          reviewKey: s.reviewKey,
          reviewConnections: s.reviewConnections,
          selectedId: null,
          pendingLocation: s.pendingLocation,
          selectedAmount: s.selectedAmount,
        });
        cleanupEmptyOwnedPoints();
        refreshOverlay();
      }
    } catch (e) {
      console.warn(`${TAG} development failed`, e);
      if (epoch === lifecycleEpoch && city === currentCity())
        uiStore.set({ busy: false, status: `Development failed: ${String(e?.message || e)}` });
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
        scheduleLocationIndexRefresh(locationIndexPending ? 0 : 80);
        if (!demandReady) {
          scheduleDemandReadyProbe(null, 0);
        } else {
          ensureOverlay();
          refreshOverlay();
        }
        return () => {
          uiStore.set({ panelOpen: false, selectedId: null, pendingLocation: null, pendingLandConversion: null, pendingAirportCluster: null, infoOpen: false });
          clearOverlay();
        };
      }, []);
      const s = uiStore.get();
      const dd = api.gameState.getDemandData();
      const selected = s.selectedId ? dd?.points.get(s.selectedId) : null;
      const previewExisting = s.previewExistingId ? dd?.points.get(s.previewExistingId) : null;
      const createSide = s.mode === "create" ? s.createSide : null;
      const createCurve = createSide && s.pendingLocation ? priceCurveForCreate(s.pendingLocation, s.createKind, s.pendingLandConversion, s.pendingAirportCluster) : null;
      const currentBudget = safeBudget();
      const row = (label, value) => h("div", { style: { display: "flex", justifyContent: "space-between", gap: 8, fontSize: 12 } }, h("span", { style: { opacity: .72 } }, label), h("span", null, value));
      const buildChoices = (side, isCreate = false, curve = null, displayLabel = null) => {
        const demolitionMode = !isCreate && !!s.demolitionMode;
        const demolitionPresets = demolitionMode && selected ? demolitionAmountsForPoint(selected, side) : [];
        const validSelected = demolitionMode ? demolitionPresets.includes(Number(s.selectedAmount)) : DEVELOPMENT_AMOUNTS.includes(s.selectedAmount);
        const amount = validSelected ? Number(s.selectedAmount) : (demolitionMode ? demolitionPresets[0] : CFG.STEP);
        const q = isCreate
          ? curve?.[amount]
          : demolitionMode
            ? (selected ? previewForDemolition(selected.id, side, amount) : null)
            : (selected ? previewForExisting(selected.id, side, amount) : null);
        const ok = !!q?.ok;
        const sideLabel = displayLabel || (side === "residential" ? "Residents" : "Workers");
        const presets = demolitionMode ? demolitionPresets : DEVELOPMENT_AMOUNTS;
        const presetLabel = (preset) => {
          if (demolitionMode && !DEVELOPMENT_AMOUNTS.includes(preset)) return "All";
          return `${demolitionMode ? "−" : ""}${preset.toLocaleString()}`;
        };
        return h("div", { style: { marginTop: 8, width: "100%", minWidth: 0 } },
          h("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 58, border: "1px solid rgba(255,255,255,.16)", borderRadius: 7, overflow: "hidden", background: "rgba(255,255,255,.035)" } },
            h("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px 12px", minWidth: 0 } },
              h("div", { style: { fontSize: 17, fontWeight: 750, lineHeight: 1.05 } }, `${demolitionMode ? "−" : "+"}${(amount || 0).toLocaleString()}`),
              h("div", { style: { marginTop: 4, fontSize: 9, opacity: .55, textTransform: "uppercase", letterSpacing: ".055em" } }, sideLabel)
            ),
            h("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px 12px", minWidth: 0, borderLeft: "1px solid rgba(255,255,255,.14)" } },
              h("div", { style: { fontSize: 17, fontWeight: 750, lineHeight: 1.05, whiteSpace: "nowrap" } }, ok ? fmtMoney(q.totalCost) : "—"),
              h("div", { style: { marginTop: 4, fontSize: 9, opacity: .55, textTransform: "uppercase", letterSpacing: ".055em" } }, demolitionMode ? "Demolition price" : "Price")
            )
          ),
          presets.length ? h("div", { style: { display: "grid", gridTemplateColumns: `repeat(${presets.length}, minmax(0, 1fr))`, marginTop: 6, border: "1px solid rgba(255,255,255,.14)", borderRadius: 6, overflow: "hidden", minWidth: 0 } },
            ...presets.map((preset, index) => {
              const pq = isCreate ? curve?.[preset] : demolitionMode ? previewForDemolition(selected.id, side, preset) : previewForExisting(selected.id, side, preset);
              const active = amount === preset;
              return h("button", {
                key: `${isCreate ? "create" : side}-${demolitionMode ? "demolish" : "build"}-preset-${preset}`,
                type: "button",
                disabled: s.busy || !pq?.ok,
                onClick: () => {
                  if (uiStore.get().busy || buildLocked) return;
                  clearReviewedPlanCache();
                  uiStore.set({ ...clearCreateReviewState(), selectedAmount: preset, status: "" });
                  refreshOverlay();
                },
                style: {
                  minWidth: 0, minHeight: 28, padding: "4px 3px", border: 0,
                  borderLeft: index ? "1px solid rgba(255,255,255,.12)" : "none",
                  background: active ? (demolitionMode ? "rgba(248,113,113,.14)" : "rgba(255,255,255,.14)") : "rgba(255,255,255,.035)",
                  color: "inherit", font: "inherit", fontSize: presets.length > 5 ? 9 : 10, fontWeight: active ? 750 : 600,
                  opacity: s.busy || !pq?.ok ? .38 : active ? 1 : .72, cursor: s.busy || !pq?.ok ? "default" : "pointer"
                }
              }, presetLabel(preset));
            })
          ) : h("div", { style: { marginTop: 6, fontSize: 11, opacity: .55 } }, "Nothing to demolish on this side.")
        );
      };
      const buildBar = (side, isCreate = false, curve = null) => {
        const demolitionMode = !isCreate && !!s.demolitionMode;
        const demolitionPresets = demolitionMode && selected ? demolitionAmountsForPoint(selected, side) : [];
        const validSelected = demolitionMode ? demolitionPresets.includes(Number(s.selectedAmount)) : DEVELOPMENT_AMOUNTS.includes(s.selectedAmount);
        const amount = validSelected ? Number(s.selectedAmount) : (demolitionMode ? demolitionPresets[0] : CFG.STEP);
        const q = amount ? (isCreate ? curve?.[amount] : demolitionMode ? previewForDemolition(selected.id, side, amount) : previewForExisting(selected.id, side, amount)) : null;
        const cost = q?.ok ? Number(q.totalCost) || 0 : 0;
        const shortfall = amount && q?.ok ? Math.max(0, cost - currentBudget) : 0;
        const hasFunds = !shortfall;
        const reviewed = isCreate ? isCurrentCreateReview(s) : isCurrentExistingReview(s);
        const canReview = !!amount && !!q?.ok && !s.busy;
        const canBuild = canReview && hasFunds;
        const canAct = !reviewed ? canReview : canBuild;
        let expansionText = null;
        if (amount && q?.ok) {
          if (isCreate) {
            expansionText = `New ${s.createKind === "airport" ? "Airport" : s.createKind === "university" ? "University" : "point"} with ${amount.toLocaleString()} ${side === "residential" ? "Residents" : "Workers"}`;
          } else if (selected) {
            const base = Math.max(0, Number(side === "residential" ? selected.residents : selected.jobs) || 0);
            const pct = base > 0 ? Math.round((amount / base) * 100) : 0;
            const who = side === "residential" ? "Residents" : "Workers";
            expansionText = demolitionMode
              ? (amount >= base ? `Removes all ${who}` : `Reduces this point by ${pct}%`)
              : `Expands this point by ${pct}%`;
          }
        }
        return h("div", { style: { marginTop: 10, paddingTop: 9, borderTop: "1px solid rgba(255,255,255,.12)", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 } },
          h("div", { style: { minWidth: 0, fontSize: 11, lineHeight: 1.35 } },
            amount && q?.ok
              ? h("div", null,
                  expansionText ? h("div", { style: { opacity: .72, marginBottom: 2, whiteSpace: "nowrap", fontSize: 10 } }, expansionText) : null,
                  demolitionMode
                    ? null
                    : (() => {
                        const parts = isCreate
                          ? newPointPriceParts(s.createKind, !!s.pendingLandConversion, s.pendingAirportCluster)
                          : (selected ? existingPriceParts(selected.id, side) : []);
                        if (!parts.length) return null;
                        return h("div", { style: { margin: "5px 0 4px", paddingTop: 5, borderTop: "1px solid rgba(255,255,255,.08)", fontSize: 10, lineHeight: 1.35 } },
                          h("div", { style: { marginBottom: 3, opacity: .46, fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".045em" } }, isCreate ? "First +200 adjustments" : "Price adjustments"),
                          ...parts.map((part) => h("div", {
                            key: part.label,
                            style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, opacity: .66, padding: "1px 0" }
                          },
                            h("span", null, part.label),
                            h("span", { style: { flex: "0 0 auto", fontVariantNumeric: "tabular-nums" } }, `+${Math.round(part.surcharge * 100)}%`)
                          ))
                        );
                      })(),
                  shortfall
                    ? h("div", { style: { color: "#f87171", fontWeight: 700 } }, `Need ${fmtMoney(shortfall)} more`)
                    : h("div", { style: { opacity: .88, fontWeight: 600 } }, `Balance after: ${fmtBalance(currentBudget - cost)}`)
                )
              : h("span", { style: { opacity: .55 } }, demolitionMode ? "Nothing to demolish" : "Choose a size")
          ),
          h("div", { style: { flex: "0 0 auto", display: "flex", alignItems: "center", gap: 5 } },
            reviewed ? h("button", {
              type: "button",
              disabled: s.busy,
              title: "Cancel review",
              "aria-label": "Cancel review",
              onClick: () => {
                if (uiStore.get().busy) return;
                clearReviewedPlanCache();
                uiStore.set({ ...clearCreateReviewState(), status: "" });
                refreshOverlay();
              },
              style: {
                width: 32, height: 36, padding: 0, borderRadius: 6, border: "1px solid rgba(248,113,113,.28)",
                background: "transparent", color: "#fca5a5", cursor: s.busy ? "not-allowed" : "pointer",
                display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit", fontSize: 18, lineHeight: 1, opacity: s.busy ? .45 : 1
              }
            }, "×") : null,
            h(Button, {
              disabled: !canAct,
              onClick: () => {
                if (!canAct) return;
                if (!reviewed) {
                  if (!isCreate && demolitionMode && Number(uiStore.get().selectedAmount) !== Number(amount)) uiStore.set({ selectedAmount: amount });
                  if (isCreate) prepareCreateReview(side, amount, s.createKind);
                  else prepareExistingReview(selected.id, side, amount);
                  return;
                }
                isCreate ? runCreate(side, amount, s.createKind) : runExisting(selected.id, side, amount);
              },
              style: {
                flex: "0 0 auto", minWidth: 88, minHeight: 36, padding: "7px 14px", fontWeight: 700,
                background: canAct ? (!reviewed ? (demolitionMode ? "rgba(248,113,113,.16)" : "rgba(59,130,246,.18)") : (demolitionMode ? "rgba(248,113,113,.22)" : "rgba(34,197,94,.20)")) : "rgba(255,255,255,.06)",
                borderColor: canAct ? (!reviewed ? (demolitionMode ? "rgba(248,113,113,.40)" : "rgba(96,165,250,.45)") : (demolitionMode ? "rgba(248,113,113,.55)" : "rgba(74,222,128,.45)")) : "rgba(255,255,255,.18)"
              }
            }, s.busy ? (demolitionMode ? "Demolishing…" : "Building…") : (!reviewed ? "Review" : demolitionMode ? "Demolish" : "Build"))
          )
        );
      };
      const existingTypeButtons = (current, onPick) => h("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8, marginBottom: 10, width: "100%", minWidth: 0 } },
        h(Button, { active: current === "residential", disabled: s.busy, onClick: () => { if (uiStore.get().busy || buildLocked) return; onPick("residential"); }, style: { width: "100%" } }, "Residents"),
        h(Button, { active: current === "work", disabled: s.busy, onClick: () => { if (uiStore.get().busy || buildLocked) return; onPick("work"); }, style: { width: "100%" } }, "Workers"),
        h(Button, { active: current === "university", disabled: s.busy, onClick: () => { if (uiStore.get().busy || buildLocked) return; onPick("university"); }, style: { width: "100%" } }, "University"),
        h(Button, { active: current === "airport", disabled: s.busy, onClick: () => { if (uiStore.get().busy || buildLocked) return; onPick("airport"); }, style: { width: "100%" } }, "Airport")
      );
      const locationHeader = (location, pointId = null, planned = false, actions = null) => {
        const parts = locationHeaderParts(location);
        const titleContent = h("div", { style: { minWidth: 0 } },
          h("div", { style: { fontSize: 13, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, parts.title),
          parts.detail ? h("div", { style: { marginTop: 2, fontSize: 10, opacity: .58, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, parts.detail) : null
        );
        return h("div", { style: { marginBottom: 8, minWidth: 0, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 } },
          pointId ? h("button", {
            type: "button",
            title: "Show on map",
            "aria-label": `Show ${parts.title} on map`,
            onClick: () => focusDemandPoint(pointId),
            style: { minWidth: 0, flex: "1 1 auto", padding: 0, border: "none", background: "transparent", color: "inherit", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }
          }, titleContent) : h("div", { style: { minWidth: 0, flex: "1 1 auto" } }, titleContent),
          actions ? h("div", { style: { flex: "0 0 auto", display: "flex", alignItems: "center", gap: 5 } }, actions) : null
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
        const stat = (label, value, title = null) => h("div", { title: title || undefined, style: { padding: "8px 9px", border: "1px solid rgba(255,255,255,.12)", borderRadius: 7, minWidth: 0 } },
          h("div", { style: { fontSize: 10, opacity: .58, textTransform: "uppercase", letterSpacing: ".05em" } }, label),
          h("div", { style: { marginTop: 2, fontSize: 15, fontWeight: 700 } }, value));
        return h("div", null,
          h("div", { style: { display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 7, marginBottom: 10 } },
            stat("Total spent", fmtMoney(totalSpent)),
            stat("Changes", Math.round(improvements).toLocaleString()),
            stat("Net demand", Math.round(activePeople).toLocaleString()),
            stat("Map growth", `${growthPercent.toFixed(1)}%`, "Net active demand changed by Demand Developer compared with the original map. Each +0.1% of positive growth adds 1% to the development price; demolition can reduce the multiplier back to 1.00 but never below it.")
          ),
          groups.length ? h("div", null,
            h("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 7 } },
              h("div", { style: { fontSize: 11, opacity: .68 } }, `${groups.length.toLocaleString()} changed ${groups.length === 1 ? "point" : "points"}`),
              h("button", { type: "button", onClick: () => {
                const nextVisible = !s.infoMapVisible;
                uiStore.set({ infoMapVisible: nextVisible, selectedId: null });
                refreshOverlay();
                if (nextVisible) focusDevelopmentGroups(groups);
              }, style: { padding: "4px 7px", borderRadius: 5, border: "1px solid rgba(255,255,255,.18)", background: s.infoMapVisible ? "rgba(255,255,255,.12)" : "rgba(255,255,255,.06)", color: "inherit", cursor: "pointer", fontSize: 10, fontWeight: 700 } }, s.infoMapVisible ? "Hide from map" : "Show all on map")
            ),
            h("div", { style: { display: "flex", flexDirection: "column", gap: 5, maxHeight: 280, overflowY: "auto", overscrollBehavior: "contain", paddingRight: 3 } }, ...groups.map((g) => {
              const point = dd?.points?.get(g.pointId) || null;
              const visualType = developedSideForPoint(g.pointId, point);
              const accentColor = visualType === "residential" ? "#60a5fa"
                : visualType === "university" ? "#4ade80"
                : visualType === "airport" ? "#c084fc"
                : "#f59e0b";
              return h("div", {
              key: g.pointId,
              onClick: () => {
                if (s.busy) return;
                uiStore.set({ selectedId: point ? g.pointId : null });
                refreshOverlay();
                if (point) focusDemandPoint(g.pointId);
                else if (Array.isArray(g.location)) {
                  try { api.utils.getMap?.()?.easeTo?.({ center: g.location, zoom: Math.max(Number(api.utils.getMap?.()?.getZoom?.()) || 0, 13), duration: 350 }); } catch {}
                }
              },
              title: "Show on map",
              style: {
                padding: "7px 8px",
                border: "1px solid rgba(255,255,255,.13)",
                borderLeft: `3px solid ${accentColor}`,
                borderRadius: 7,
                boxShadow: String(s.selectedId || "") === String(g.pointId) ? "0 0 0 1px rgba(255,255,255,.40)" : "none",
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
                    disabled: s.busy || !point,
                    title: point ? "Add more demand" : "This point was removed by demolition",
                    "aria-label": "Add more demand",
                    onClick: (ev) => { ev?.stopPropagation?.(); if (!s.busy && point) openPointForImprovement(g.pointId); },
                    onMouseEnter: (ev) => { if (!s.busy && ev?.currentTarget) ev.currentTarget.style.background = "rgba(255,255,255,.13)"; },
                    onMouseLeave: (ev) => { if (ev?.currentTarget) ev.currentTarget.style.background = "rgba(255,255,255,.05)"; },
                    style: { width: 27, height: 27, padding: 0, borderRadius: 5, border: "1px solid rgba(255,255,255,.16)", background: "rgba(255,255,255,.05)", color: "inherit", cursor: s.busy ? "not-allowed" : "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 600, lineHeight: 1 }
                  }, "+"),
                  h("button", {
                    type: "button",
                    disabled: s.busy,
                    title: "Remove changes",
                    "aria-label": "Remove changes",
                    onClick: async (ev) => {
                      ev?.stopPropagation?.();
                      if (uiStore.get().busy) return;
                      if (typeof window !== "undefined" && !window.confirm(`Remove all Demand Developer changes at ${(() => { const p = locationHeaderParts(g.location); return p.detail ? `${p.title} · ${p.detail}` : p.title; })() || g.pointId}? Demolished demand will be restored, added demand will be removed, and money spent will not be refunded.`)) return;
                      uiStore.set({ busy: true, status: "Restoring road routes…" });
                      refreshOverlay();
                      try {
                        const r = await removeDevelopmentForPoint(g.pointId);
                        uiStore.set({ selectedId: null, status: r.ok ? (r.warning || "Changes removed.") : r.error });
                      } catch(e) { uiStore.set({ status: String(e) }); }
                      finally { uiStore.set({ busy: false }); refreshOverlay(); }
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
                  h("div", { style: { marginTop: 1, fontSize: 10, fontWeight: 600, opacity: g.residents ? .84 : .38 } }, g.residents ? `${g.residents > 0 ? "+" : "−"}${Math.abs(Math.round(g.residents)).toLocaleString()}` : "–")
                ),
                h("div", { style: { minWidth: 0 } },
                  h("div", { style: { fontSize: 8, opacity: .46, textTransform: "uppercase", letterSpacing: ".04em" } }, "Workers"),
                  h("div", { style: { marginTop: 1, fontSize: 10, fontWeight: 600, opacity: g.workers ? .84 : .38 } }, g.workers ? `${g.workers > 0 ? "+" : "−"}${Math.abs(Math.round(g.workers)).toLocaleString()}` : "–")
                ),
                h("div", { style: { minWidth: 0, textAlign: "right" } },
                  h("div", { style: { fontSize: 8, opacity: .46, textTransform: "uppercase", letterSpacing: ".04em" } }, "Spent"),
                  h("div", { style: { marginTop: 1, fontSize: 11, fontWeight: 750 } }, fmtMoney(g.spent || 0))
                )
              )
            );
            }))
          ) : h("div", { style: { fontSize: 12, opacity: .65, padding: "8px 0" } }, "No changes yet."),
          (() => {
            const hasActiveDevelopment = hasAnyActiveDevelopment();
            return h("button", { type: "button", disabled: s.busy || !hasActiveDevelopment, onClick: async () => {
              if (uiStore.get().busy) return;
              if (typeof window !== "undefined" && !window.confirm("Remove all Demand Developer changes? Demolished demand will be restored, added demand will be removed, and money spent will not be refunded.")) return;
              uiStore.set({ busy: true, status: "Restoring road routes…" });
              refreshOverlay();
              try {
                const r = await removeAllDevelopment();
                uiStore.set({ status: r.ok ? (r.warning || "All changes removed.") : r.error });
              } catch(e) { uiStore.set({ status: String(e) }); }
              finally { uiStore.set({ busy: false }); refreshOverlay(); }
            }, style: { marginTop: 10, width: "100%", padding: "7px 9px", borderRadius: 6, border: "1px solid rgba(248,113,113,.35)", background: "rgba(248,113,113,.08)", color: hasActiveDevelopment ? "#fca5a5" : "rgba(255,255,255,.35)", cursor: hasActiveDevelopment ? "pointer" : "not-allowed" } }, "Remove all changes");
          })()
        );
      };
      const infoButton = () => h("button", {
        type: "button",
        title: "Development overview",
        "aria-label": "Development overview",
        onClick: () => { uiStore.set({ infoOpen: true, infoMapVisible: false, selectedId: null, selectedAmount: null, pendingLocation: null, pendingLandConversion: null, pendingAirportCluster: null, status: "" }); refreshOverlay(); },
        style: { width: 28, height: 28, padding: 0, borderRadius: 999, border: "1px solid rgba(255,255,255,.20)", background: "rgba(255,255,255,.06)", color: "inherit", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flex: "0 0 auto" }
      }, api.utils.icons?.Info ? h(api.utils.icons.Info, { size: 16, strokeWidth: 2 }) : h("span", { style: { fontWeight: 700, fontSize: 15 } }, "i"));
      const pointTypeHeader = () => h("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 4 } },
        h("div", { style: { fontSize: 12, fontWeight: 700 } }, "Demand type"),
        infoButton()
      );
      const existingMiniPreview = () => {
        if (!previewExisting || !s.previewExistingId || s.mode !== "create") return null;
        const residents = Math.round(previewExisting.residents || 0);
        const workers = Math.round(previewExisting.jobs || 0);
        const special = specialPointKind(s.previewExistingId);
        const visualType = existingPointType(previewExisting);
        const sideColor = visualType === "residential" ? "#60a5fa"
          : visualType === "university" ? "#4ade80"
          : visualType === "airport" ? "#c084fc"
          : "#f59e0b";
        const typeLabel = special === "airport" ? "Airport" : special === "university" ? "University" : null;
        return h("div", { style: { marginBottom: 8, padding: "7px 8px", border: "1px solid rgba(255,255,255,.14)", borderLeft: `3px solid ${sideColor}`, borderRadius: 6, background: "rgba(255,255,255,.025)" } },
          h("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 2 } },
            h("div", { style: { minWidth: 0 } }, locationHeader(previewExisting.location, s.previewExistingId, false)),
            typeLabel ? h("div", { style: { flex: "0 0 auto", fontSize: 9, fontWeight: 800, opacity: .82 } }, typeLabel) : null
          ),
          h("div", { style: { fontSize: 9, lineHeight: 1.35, opacity: .72, marginBottom: 5 } },
            `${residents.toLocaleString()} Residents · ${workers.toLocaleString()} Workers`
          ),
          h("div", { style: { display: "flex", justifyContent: "flex-end" } },
            h("button", {
              type: "button",
              disabled: s.busy,
              onClick: () => {
                const id = String(s.previewExistingId);
                const p = api.gameState.getDemandData?.()?.points?.get(id);
                if (!p) return;
                uiStore.set({ ...clearCreateReviewState(), mode: "normal", createSide: null, createKind: null, pendingLocation: null, pendingLandConversion: null, pendingAirportCluster: null, previewExistingId: null, existingSide: existingPointType(p), showExistingConnections: false, selectedId: id, selectedAmount: CFG.STEP, status: "" });
                refreshOverlay();
                focusDemandPoint(id);
              },
              style: { padding: "3px 6px", borderRadius: 5, border: "1px solid rgba(255,255,255,.18)", background: "rgba(255,255,255,.06)", color: "inherit", cursor: s.busy ? "not-allowed" : "pointer", fontFamily: "inherit", fontSize: 9, fontWeight: 700 }
            }, "Develop")
          )
        );
      };

      return h("div", { ref: rootRef, style: { position: "relative", padding: 10, width: "100%", maxWidth: "100%", minWidth: 0, boxSizing: "border-box", overflowX: "hidden", fontFamily: "inherit", color: "inherit" } },
        s.infoOpen
          ? h("div", { style: { display: "grid", gridTemplateColumns: "1fr", marginBottom: 10 } },
              h(Button, { style: { width: "100%", minHeight: 38 }, onClick: () => { uiStore.set({ infoOpen: false, infoMapVisible: false, selectedId: null, status: "" }); refreshOverlay(); } }, "Back"))
          : h("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 6, marginBottom: 10, minWidth: 0 } },
              h(Button, { active: s.mode !== "create", style: { width: "100%", minHeight: 38 }, onClick: () => { uiStore.set({ mode: "normal", demolitionMode: false, createSide: null, createKind: null, ...clearCreateReviewState(), pendingLocation: null, showExistingConnections: false, selectedId: null, selectedAmount: null, status: "" }); refreshOverlay(); } }, "Existing point"),
              h(Button, { active: s.mode === "create", style: { width: "100%", minHeight: 38 }, onClick: () => { uiStore.set({ mode: "create", existingSide: null, demolitionMode: false, createSide: null, createKind: null, createReviewed: false, reviewKey: null, reviewConnections: [], showExistingConnections: false, selectedId: null, previewExistingId: null, selectedAmount: null, pendingLocation: null, pendingLandConversion: null, pendingAirportCluster: null, status: "" }); refreshOverlay(); } }, "New point")),
        s.infoOpen ? infoView() : null,

        !s.infoOpen && s.mode !== "create" ? h("div", null,
          pointTypeHeader(),
          existingTypeButtons(s.existingSide, (type) => {
            clearOverlay();
            const liveSelected = s.selectedId ? dd?.points?.get(s.selectedId) : null;
            const keepSelected = liveSelected && pointMatchesExistingType(liveSelected, type);
            uiStore.set({
              ...clearCreateReviewState(),
              existingSide: type,
              demolitionMode: false,
              showExistingConnections: false,
              selectedId: keepSelected ? s.selectedId : null,
              selectedAmount: keepSelected ? CFG.STEP : null,
              status: "",
            });
            refreshOverlay();
          }),
          !s.existingSide ? h("div", { style: { fontSize: 12, lineHeight: 1.45, opacity: .76, marginBottom: 8 } }, "Choose a point type, then select a demand point on the map.") :
          !selected ? h("div", { style: { fontSize: 12, lineHeight: 1.45, opacity: .76, marginBottom: 8 } }, `Select a highlighted ${existingTypeLabel(s.existingSide)} point.`) : null,
          selected ? h("div", null,
            locationHeader(selected.location, selected.id),
            row("Residents", Math.round(selected.residents || 0).toLocaleString()),
            row("Workers", Math.round(selected.jobs || 0).toLocaleString()),
            nearbyStationsBlock(selected.location),
            (() => {
              const existingConnections = existingConnectionsForPoint(dd, s.selectedId);
              const count = existingConnections.length;
              const showing = !!s.showExistingConnections;
              const modeButton = (demolish) => {
                const active = !!s.demolitionMode === demolish;
                return h("button", {
                  type: "button", key: demolish ? "demolish-mode" : "build-mode",
                  disabled: s.busy,
                  title: demolish ? "Switch to demolish" : "Switch to build",
                  "aria-pressed": active,
                  onClick: () => {
                    if (uiStore.get().busy || buildLocked || !!uiStore.get().demolitionMode === demolish) return;
                    clearReviewedPlanCache();
                    const side = existingTypeSide(s.existingSide);
                    const livePoint = uiStore.get().selectedId ? api.gameState.getDemandData?.()?.points?.get(uiStore.get().selectedId) : null;
                    const available = livePoint ? availableDemandForDemolition(api.gameState.getDemandData?.(), livePoint.id, side) : 0;
                    uiStore.set({ ...clearCreateReviewState(), demolitionMode: demolish, selectedAmount: demolish ? Math.min(CFG.STEP, available) : CFG.STEP, status: "" });
                    refreshOverlay();
                  },
                  style: {
                    flex: "1 1 0", minWidth: 0, minHeight: 28, padding: "5px 3px", borderRadius: 0,
                    border: "none", borderLeft: demolish ? "1px solid rgba(255,255,255,.12)" : "none",
                    background: active ? (demolish ? "rgba(248,113,113,.18)" : "rgba(96,165,250,.24)") : "transparent",
                    color: "inherit", font: "inherit", fontSize: 11, fontWeight: active ? 750 : 600,
                    cursor: s.busy ? "not-allowed" : "pointer", opacity: s.busy ? .5 : active ? 1 : .72,
                  }
                }, demolish ? "Demolish" : "Build");
              };
              return h("div", { style: { display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 8, marginTop: 10, alignItems: "center" } },
                h("div", { role: "group", "aria-label": "Development mode", style: { display: "flex", minWidth: 0, border: "1px solid rgba(255,255,255,.18)", borderRadius: 6, overflow: "hidden", background: "rgba(255,255,255,.035)" } },
                  modeButton(false), modeButton(true)
                ),
                h("button", {
                  type: "button", disabled: s.busy || count === 0,
                  title: count ? `${showing ? "Hide" : "Show"} all ${count.toLocaleString()} connections` : "No connections",
                  onClick: () => {
                    if (uiStore.get().busy || count === 0) return;
                    clearReviewedPlanCache();
                    uiStore.set({
                      ...clearCreateReviewState(),
                      showExistingConnections: !uiStore.get().showExistingConnections,
                      status: !showing ? `Showing all ${count.toLocaleString()} connection${count === 1 ? "" : "s"} for this point.` : "",
                    });
                    refreshOverlay();
                  },
                  style: {
                    width: "100%", minWidth: 0, minHeight: 30, padding: "5px 4px", borderRadius: 6,
                    border: showing ? "1px solid rgba(96,165,250,.55)" : "1px solid rgba(255,255,255,.18)",
                    background: showing ? "rgba(59,130,246,.16)" : "rgba(255,255,255,.05)",
                    color: "inherit", font: "inherit", fontSize: 10, fontWeight: 700,
                    cursor: s.busy || count === 0 ? "default" : "pointer", opacity: s.busy || count === 0 ? .4 : 1,
                  },
                }, `${showing ? "Hide" : "Show"} connections (${count.toLocaleString()})`)
              );
            })(),
            buildChoices(existingTypeSide(s.existingSide), false, null, existingTypeLabel(s.existingSide)),
            buildBar(existingTypeSide(s.existingSide), false, null)
          ) : null
        ) : null,

        !s.infoOpen && s.mode === "create" ? h("div", { style: { marginTop: 2 } },
          existingMiniPreview(),
          pointTypeHeader(),
          h("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8, marginBottom: 10, width: "100%", minWidth: 0 } },
            h(Button, { active: createSide === "residential" && !s.createKind, disabled: s.busy, onClick: () => {
              if (uiStore.get().busy || buildLocked) return;
              clearOverlay();
              uiStore.set({ ...clearCreateReviewState(), createSide: "residential", createKind: null, pendingAirportCluster: null, selectedAmount: CFG.STEP, status: "" });
              refreshOverlay();
            }, style: { width: "100%" } }, "Residents"),
            h(Button, { active: createSide === "work" && !s.createKind, disabled: s.busy, onClick: () => {
              if (uiStore.get().busy || buildLocked) return;
              clearOverlay();
              uiStore.set({ ...clearCreateReviewState(), createSide: "work", createKind: null, pendingAirportCluster: null, selectedAmount: CFG.STEP, status: "" });
              refreshOverlay();
            }, style: { width: "100%" } }, "Workers"),
            h(Button, { active: s.createKind === "university", disabled: s.busy, onClick: () => {
              if (uiStore.get().busy || buildLocked) return;
              clearOverlay();
              uiStore.set({ ...clearCreateReviewState(), createSide: "work", createKind: "university", pendingAirportCluster: null, selectedAmount: CFG.STEP, status: "" });
              refreshOverlay();
            }, style: { width: "100%" } }, "University"),
            h(Button, { active: s.createKind === "airport", disabled: s.busy, onClick: () => {
              if (uiStore.get().busy || buildLocked) return;
              clearOverlay();
              uiStore.set({ ...clearCreateReviewState(), createSide: "work", createKind: "airport", pendingAirportCluster: Array.isArray(uiStore.get().pendingLocation) ? airportClusterStatus(uiStore.get().pendingLocation).cluster : null, selectedAmount: CFG.STEP, status: "" });
              refreshOverlay();
            }, style: { width: "100%" } }, "Airport")
          ),
          !s.pendingLocation ? h("div", { style: { fontSize: 12, lineHeight: 1.45, opacity: .76, marginBottom: 8 } }, createSide
            ? "Click the map to place the new point."
            : "Choose a demand type, then click the map.") : null,
          s.pendingLocation ? h("div", null,
            h("div", { style: { marginBottom: 6, padding: "6px 8px", border: "1px solid rgba(255,255,255,.16)", borderRadius: 6 } },
              h("div", { style: { fontSize: 10, opacity: .55, textTransform: "uppercase", letterSpacing: ".06em" } }, "Planned point"),
              locationHeader(s.pendingLocation, null, true)
            ),
            nearbyStationsBlock(s.pendingLocation),
            createSide ? h("div", null,
              buildChoices(createSide, true, createCurve),
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

  function cleanupEmptyOwnedPoints() {
    if (uiStore.get().busy) return;
    beginInternalDemandMutation();
    try {
      const result = cleanupEmptyCreatedPoints(api.gameState.getDemandData?.());
      for (const error of result.errors || []) console.warn(`${TAG} empty-point cleanup failed: ${error}`);
    } finally {
      endInternalDemandMutation();
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
    if (replayingLedgerDemand || internalDemandMutationDepth > 0 || undoLocked || buildLocked) return false;
    const epoch = lifecycleEpoch, city = currentCity();
    const token = ++ledgerLoadToken;
    lifecycleCity = city;
    const loadResult = await loadLedger(epoch, token);
    if (epoch !== lifecycleEpoch || city !== currentCity() || token !== ledgerLoadToken) {
      return false;
    }

    if (loadResult?.ambiguousCheckpoint) {
      demandReady = false;
      uiStore.set({ status: "Multiple development checkpoints match this save. No changes were restored; keep your existing saves and try loading a different checkpoint." });
      return false;
    }
    const dd = api.gameState.getDemandData?.();
    if (!dd?.points || !dd?.popsMap) {
      return false;
    }
    if (loadResult?.needsLegacyRepair) {
      const repaired = repairMigratedInactiveState(dd);
      if (repaired) await saveLedger();
    }
    if (epoch !== lifecycleEpoch || city !== currentCity() || token !== ledgerLoadToken) return false;

    const replay = await replayActiveLedgerDemand(dd);
    if (epoch !== lifecycleEpoch || city !== currentCity() || token !== ledgerLoadToken) return false;
    if (!replay.ok) {
      demandReady = false;
      uiStore.set({ status: replay.error });
      console.warn(`${TAG} saved development replay failed: ${replay.error}`);
      ensureOverlay();
      installMapClick();
      refreshUi();
      return false;
    }
    const liveAfterReplay = api.gameState.getDemandData?.() || dd;
    restoreOwnedPopRuntimeSnapshots(liveAfterReplay);
    attachOwnedRoadPaths(liveAfterReplay);
    attachRestoredNativeRoadPaths(liveAfterReplay);
    for (const rec of Object.values(ledger.adjustments || {}).filter(x => x?.demolition && x.active === false).slice(-150)) {
      if (looseMapGet(liveAfterReplay.popsMap, rec.popId)) scheduleNativeRoadRecheck(rec.popId);
    }
    restoreOwnedPointModeShares(liveAfterReplay);
    cleanupEmptyOwnedPoints();
    rememberPlanningDemandSignature(api.gameState.getDemandData?.() || dd);
    demandReady = true;
    resumeRoadWork();
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
    scheduleDemandReadyProbe(map || null, 300);
  }

  function handleCityLoad(cityCode) {
    straightRouteVisuals.stop();
    stopRoadWork();

    nearestStationsCache.clear();
    clearLandscapeSnapshot();
    lifecycleCity = cityCode || null;
    invalidatePreviews({ demand: true, ledgerState: true });
    resetUiForMapTransition("Loading demand…");
    scheduleDemandReadyProbe(null, 350);
  }

  function handleGameLoaded(saveName) {
    straightRouteVisuals.stop();
    sawGameLoadedHook = true;
    const nextName = typeof saveName === "string" && saveName.length > 0 ? saveName : readLiveSaveName();
    currentSaveName = nextName;
    clearLandscapeSnapshot();
    resetUiForMapTransition("Loading demand…");
    scheduleDemandReadyProbe(null, 350);
  }

  async function handleGameSaved(saveName) {
    if (internalDemandMutationDepth > 0 || replayingLedgerDemand || undoLocked) {
      console.warn(`${TAG} skipped development checkpoint during an unfinished operation.`);
      uiStore.set({ status: "Game saved during a development change. Save again after the operation finishes." });
      return false;
    }
    const epoch = lifecycleEpoch, city = currentCity(), key = loadedLedgerKey;
    const hookName = typeof saveName === "string" && saveName.length > 0 ? saveName : null;
    const savedSlotName = resolveSavedSlotName(saveName);
    const isAutosave = autosaveSlotName(hookName) || autosaveSlotName(savedSlotName);
    const saveEventAt = Date.now();

    if (!demandReady && !loadedLedgerKey) {
      console.warn(`${TAG} game saved before any development ledger was loaded; refusing to write an empty checkpoint.`);
      return false;
    }
    if (!demandReady) console.warn(`${TAG} checkpointing previously loaded development while demand replay is pending.`);
    captureOwnedPointModeShares();
    captureOwnedPopSnapshots();

    if (!savedSlotName) {
      console.warn(`${TAG} game save has no identifiable name; checkpointing by session instead.`);
    }
    const snapshot = cloneLedgerState();
    const saved = await writeSimulationCheckpoint(saveEventAt, snapshot, savedSlotName, city);
    if (!saved) {
      console.warn(`${TAG} Failed to persist development changes.`);
      if (epoch === lifecycleEpoch && city === currentCity() && key === loadedLedgerKey)
        uiStore.set({ status: "Demand Developer: your development could not be saved. Check the console." });
      return false;
    }

    if (epoch !== lifecycleEpoch || city !== currentCity() || key !== loadedLedgerKey)
      return false;
    unsavedWorkingLedger = false;
    if (!isAutosave && savedSlotName) {
      currentSaveName = savedSlotName;
      loadedLedgerKey = ledgerKey();
    }

    return true;
  }

  function handleDemandChange() {
    try {
      if (replayingLedgerDemand || internalDemandMutationDepth > 0) return;
      const dd = api.gameState.getDemandData?.();
      if (dd?.points && dd?.popsMap) {
        if (loadedLedgerKey && ledgerNeedsLiveRestore(dd)) {
          demandReady = false;
          scheduleDemandReadyProbe(null, 300);
          return;
        }

        const nextSignature = uiStore.get().panelOpen ? planningDemandSignature(dd) : null;
        const structuralChange = lastPlanningDemandSignature != null
          && nextSignature != null
          && nextSignature !== lastPlanningDemandSignature;
        lastPlanningDemandSignature = nextSignature;

        if (structuralChange) {
          invalidatePreviews({ demand: true });
          if (uiStore.get().createReviewed) uiStore.set(clearCreateReviewState());
        }

        if (demandReady) {
          if (Object.values(ledger.adjustments || {}).some((rec) => rec?.demolition && rec.active === false))
            attachRestoredNativeRoadPaths(dd);
          if (uiStore.get().panelOpen && structuralChange) { ensureOverlay(); refreshUi(); }
          return;
        }
        scheduleDemandReadyProbe(null, 300);
        return;
      }
      scheduleDemandReadyProbe(null, 500);
    } catch (e) { console.warn(`${TAG} demand init failed`, e); }
  }

  function handleGameEnd() {
    sawGameLoadedHook = false;
    straightRouteVisuals.stop();
    stopRoadWork();
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
    checkpointIndexCache = null;
    checkpointIndexCacheKey = null;
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
  installOwnedPopPathProvider();

  try { setTimeout(() => { ensureUi(); }, 0); } catch {}
  try {
    api.hooks.onCityLoad?.((cityCode) => {
      handleCityLoad(cityCode);
      try { setTimeout(() => rebindToolbarUi(), 0); } catch {}
      try { setTimeout(() => rebindToolbarUi(), 250); } catch {}
    });
    api.hooks.onGameInit?.(() => {
      sawGameLoadedHook = false;
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
  } catch {}
})();
