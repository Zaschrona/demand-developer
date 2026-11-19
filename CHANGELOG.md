# Changelog

## 1.2.1

- Fixed development changes sometimes not being restored from saves made at the same in-game time.
- Improved save recovery when switching between cities.

## 1.2

Compared with 1.1:

- Added Demolish mode for Residents, Workers, University and Airport demand, including **All** to remove the remaining demand.
- Added road-following commuter routes where the map provides usable road data.
- Updated Review and Development overview to support demolition and undo.
- Improved commuter planning on smaller maps and maps with incomplete roads, including additional connections between the same points when needed.
- Updated development costs and map growth to account for removed demand.
- Improved reliability of new-point creation, routing and Undo.
- Fixed restoration of development changes and commuter routes after loading saves and Autosaves.

## 1.1.1

- Fixed Demand Developer metadata not being restored correctly when loading an Autosave.
- Autosaves now keep their own ledger snapshot without changing the active manual save slot.

## 1.1

Compared with 1.0:

- Added University and Airport demand for new and existing points.
- Added Review before Build and Show existing for viewing commuter connections on the map.
- Improved commuter planning so larger developments use a more natural number and size of connections based on the map around them.
- Improved regional connection handling for University and Airport demand.
- Fixed mod-created commuters losing calculated commute and route information after reloading a save.
- Fixed Review stability and several connection-planning issues.
