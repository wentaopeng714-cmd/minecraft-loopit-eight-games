My Track, My Ride

Minecraft-themed 3D route-building and minecart ride.

Play: drag a connected railway from the cart to Oakvale Station, then ride. Hold Go (or Space) to move. Release to brake. You have three hearts; bumps retain your route and progress. Emeralds are optional.

Desktop: mouse drawing, or arrow keys to extend the route; Backspace undo; Enter ride; hold Space to go; release to stop.
Phone: drag the map to lay track; hold the Go button to move, release to stop.

Local preview: npm install, npm run dev.
Production: npm run build, then serve dist with a static HTTP server. Do not open index.html directly with file://.

Checks: npm test validates route constraints, bridges, backtracking, braking and Creeper fuse/patrol behavior. Desktop and phone-sized interactive browser checks are recorded in validation.json.

Art sources and licenses: public/THIRD_PARTY_NOTICES.txt and public/assets/sources.json. Code licenses do not relicense Minecraft artwork.

Revision 1.1: visible start/station markers, suggested dotted route, highlighted legal tiles, automatic gap snapping, hold-to-go controls, large red/green crossing messages, and three-heart damage recovery.

Revision 1.2: visible track/cargo/station goals; planned cargo versus collected cargo; +100 feedback per emerald; arrival +500 and +100 per remaining heart. Result breakdown, three delivery stamps, persistent routebook and best score. Next target progresses from arrival to full cargo, clean delivery and unique completed routes. Replay the same railway or build a new delivery.
