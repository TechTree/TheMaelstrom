# The Maelstrom: Lair of the Tyrant
## A Narrative Warhammer 40K Campaign Portal

**To open the campaign portal:** Simply open `index.html` in your web browser (no build tools needed).

### Project Structure
- `index.html` - Main campaign portal
- `css/styles.css` - All visual styling and animations
- `js/data.js` - Campaign data (players, armies, battles, scores)
- `js/app.js` - Interactive functionality (navigation, expand/collapse, rendering)
- `js/particles.js` - Visual effects (parallax, particles, SVG ship renderer)

### Features
- Immersive three-zone scrolling experience (space battle → atmosphere → ground battle)
- Complete army roster listing for all 6 warlords with points costing
- Battle log with score breakdowns and details
- Campaign standings leaderboard
- Interactive score matrix showing all matchups
- Responsive design for mobile and desktop
- Pure HTML/CSS/JavaScript - no dependencies or build tools

### To Update Campaign Data
Edit `js/data.js` to:
- Add new battles to the `CAMPAIGN_DATA.battles` array
- Update player rosters
- Modify faction colors and army information

Changes will automatically be reflected in the campaign portal.

### Browsers
Works in all modern browsers (Chrome, Firefox, Safari, Edge). Best viewed on desktop for full visual impact.

---
*A fan project for private use by a group of friends.*
