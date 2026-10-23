# Demand Developer

**Author:** Zaschrona

Demand Developer lets you create, expand and demolish demand points directly on the Subway Builder map. It supports Residents, Workers, University and Airport demand and updates the commuter connections between them.

## Features

- Create new demand points or expand existing ones by +200, +400, +600, +800 or +1000.
- Reduce existing demand in **Demolish** mode, or use **All** to remove the remaining demand of the selected type.
- Review planned changes and show the existing commuter connections of a selected point.
- Spread new demand across suitable connections, adding separate commuter groups when needed.
- Calculate road-following commuter routes in the background where map data allows it.
- Track spending and map growth, and undo changes in **Development overview**.

## Installation

Install **Demand Developer** through Railyard, or extract the ZIP into the Subway Builder `mods` directory. Enable it in **Settings > Mods** and restart the game.

The **Demand Developer** button appears in the top-right toolbar after a city is loaded.

## Use

Choose **New point** to create a demand point, or **Existing point** to change one already on the map. Select Residents, Workers, University or Airport, choose an amount and use **Review** before confirming.

For existing points, switch to **Demolish** to reduce demand. **All** removes the exact amount remaining for the selected type. Use **Development overview** to inspect or undo changes. Development costs are not refunded.

Review and **Show connections** display straight preview lines. Actual road routes are calculated separately and may take a few seconds to appear. On maps with incomplete or disconnected road data, some routes may remain straight. You can place a new demand point beyond the mapped roads; automatic commuter planning prefers points near roads where possible.

Older Autosaves without a matching development checkpoint may restore more recent changes from the same play session.

## Development costs

Build prices depend on local demand, demand type and map growth. Demolition costs 25% of the standard Residents build rate for all demand types. Prices are rounded to $1 million increments, and the overall price multiplier cannot fall below 1.00.

## License

MIT
