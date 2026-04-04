/* ============================================================
   THE MAELSTROM — App Logic
   Renders all campaign data into the DOM
   ============================================================ */

(function () {
  'use strict';

  const D = CAMPAIGN_DATA;
  const fc = D.factionColors;

  const factionColor = f => fc[f]?.primary || '#888';

  const factionIcon = f => ({
    aeldari:          '⚔',
    votann:           '⛏',
    redcorsairs:      '☠',
    emperorschildren: '♛',
    huron:            '🗡',
    necrons:          '☢',
  }[f] || '⚔');

  /* ==========================================================
     FACTION CARDS
     ========================================================== */
  function renderFactionCards() {
    const el = document.getElementById('faction-cards');
    if (!el) return;
    el.innerHTML = D.players.map(p => `
      <div class="faction-card" style="--fc:${factionColor(p.faction)}">
        <div class="fc-icon">${factionIcon(p.faction)}</div>
        <div class="fc-name">${fc[p.faction]?.name || p.faction}</div>
        <div class="fc-handle">${p.handle}</div>
        <div class="fc-army">"${p.army}"</div>
      </div>
    `).join('');
  }

  /* ==========================================================
     ROSTERS
     ========================================================== */
  function renderRosters() {
    const el = document.getElementById('rosters-grid');
    if (!el) return;

    el.innerHTML = D.players.map(p => {
      const color = factionColor(p.faction);
      const total = p.units.reduce((s, u) => s + u.points, 0);
      return `
        <div class="roster-card" style="--fc:${color}">
          <div class="roster-head">
            <div class="rh-handle">${p.handle}</div>
            <div class="rh-army">${p.army}</div>
            <div class="rh-meta">
              <div class="rh-row"><span>Faction</span><span>${fc[p.faction]?.name}</span></div>
              <div class="rh-row"><span>Detachment</span><span>${p.detachment}</span></div>
              <div class="rh-row"><span>Points</span><span>${total}pts</span></div>
            </div>
          </div>
          <div class="roster-toggle">
            <button class="toggle-btn" data-roster="${p.id}">
              <span>View Units (${p.units.length})</span>
              <span class="toggle-icon">▼</span>
            </button>
          </div>
          <div class="roster-units" id="roster-${p.id}">
            <div class="champ-box">
              <div class="champ-label">Warlord Champion</div>
              <div class="champ-name">${p.champion}</div>
              <div class="champ-role">${p.championRole}</div>
            </div>
            ${p.units.map(u => `
              <div class="unit-row">
                <div>
                  <div class="unit-name">${u.name}</div>
                  ${u.gear ? `<div class="unit-gear">${u.gear}</div>` : ''}
                </div>
                <div class="unit-pts">${u.points}pts</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');

    el.querySelectorAll('.toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const units = document.getElementById('roster-' + btn.dataset.roster);
        const open = units.classList.toggle('show');
        btn.classList.toggle('open', open);
      });
    });
  }

  /* ==========================================================
     LEADERBOARD
     ========================================================== */
  function renderLeaderboard() {
    const el = document.getElementById('leaderboard');
    if (!el) return;

    const standings = calculateStandings();
    const medals = ['👑', '🥈', '🥉'];
    const NP_MAX = 35; // 7 conditions × 5 NP each

    // Fallback condition short-labels when no title has been earned yet
    const condLabels = ['Scourge', 'Vengeful', 'Opportunist', 'Cruel', 'Brash', 'Grasping', 'Shrewd'];

    el.innerHTML = `
      <div class="leaderboard-wrap">
        ${standings.map((p, i) => {
          const color = factionColor(p.faction);
          const pct = NP_MAX > 0 ? Math.round(p.notorietyNP / NP_MAX * 100) : 0;
          const rank = medals[i] || (i + 1);

          // Build 7 condition pips — label shows the player's CURRENT earned title
          const pips = (p.notoriety || [0,0,0,0,0,0,0]).map((tier, ci) => {
            const tierClass = tier === 0 ? 'pip-none' : tier === 1 ? 'pip-t1' : tier === 2 ? 'pip-t2' : 'pip-t3';
            const tierNP = [0,3,4,5][tier];
            const currentTitle = tier > 0 ? D.notorietyTitles[ci].tiers[tier - 1].name : null;
            const tooltip = currentTitle
              ? currentTitle + ' (' + tierNP + ' NP)'
              : condLabels[ci] + ' — not yet earned';
            return `<div class="pip ${tierClass}" title="${tooltip}">
              <span class="pip-label">${currentTitle || condLabels[ci]}</span>
              <span class="pip-val">${tier > 0 ? tierNP : '—'}</span>
            </div>`;
          }).join('');

          return `
            <div class="lb-card ${i === 0 ? 'lb-card--first' : ''}">
              <div class="lb-rank">${rank}</div>
              <div class="lb-main">
                <div class="lb-top">
                  <span class="lb-handle">${p.handle}</span>
                  <span class="lb-faction" style="color:${color}">${fc[p.faction]?.name}</span>
                  <span class="lb-army hide-sm">${p.army}</span>
                  <span class="lb-battles">${p.battlesPlayed} battle${p.battlesPlayed !== 1 ? 's' : ''}</span>
                </div>
                <div class="lb-pips">${pips}</div>
                <div class="lb-bar-wrap">
                  <div class="lb-bar" style="width:${pct}%;background:${color}"></div>
                </div>
              </div>
              <div class="lb-score-block">
                <div class="lb-score-total">${p.totalPoints}</div>
                <div class="lb-score-label">NP</div>
                ${p.bootyNP ? `<div class="lb-booty">+${p.bootyNP} booty</div>` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
      <p class="lb-note">Max possible NP from titles: ${NP_MAX} (7 conditions × 5). Plus Pirate Booty NP.</p>
    `;
  }

  /* ==========================================================
     PIRATE BOOTY ROLLS
     ========================================================== */
  function renderBootyRolls() {
    const el = document.getElementById('booty-rolls');
    if (!el) return;

    // Consolidate by player
    const byPlayer = {};
    D.bootyRolls.forEach(r => {
      if (!r.rolls.length) return;
      if (!byPlayer[r.player]) byPlayer[r.player] = [];
      byPlayer[r.player].push({ battle: r.battle, rolls: r.rolls });
    });

    const rows = Object.entries(byPlayer).map(([pid, entries]) => {
      const player = D.players.find(p => p.id === pid);
      if (!player) return '';
      const color = factionColor(player.faction);
      const allRolls = entries.flatMap(e => e.rolls);
      return `
        <tr>
          <td style="color:${color};font-weight:700">${player.handle}</td>
          <td style="color:var(--txt-dim);font-size:.82rem">${entries.map(e => e.battle).join(', ')}</td>
          <td>${allRolls.map(r => `<span class="booty-roll">${r}</span>`).join(' &nbsp; ')}</td>
        </tr>
      `;
    }).join('');

    el.innerHTML = `
      <table class="booty-table">
        <thead>
          <tr>
            <th>Warlord</th>
            <th>Battle</th>
            <th>D66 Rolls</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  }

  /* ==========================================================
     NOTORIETY SCORING TABLE
     ========================================================== */
  function renderScoringTable() {
    const el = document.getElementById('scoring-table-wrap');
    if (!el) return;

    const tierLabels = [
      { label: 'Tier I',   np: 3 },
      { label: 'Tier II',  np: 4 },
      { label: 'Tier III', np: 5 },
    ];

    const rowsHtml = D.notorietyTitles.map(row => `
      <tr>
        <td class="sc-condition">${row.condition}</td>
        ${row.tiers.map(t => `
          <td class="sc-title-cell">
            <span class="sc-title-name">${t.name}</span>
            <span class="sc-title-desc">${t.desc}</span>
          </td>
        `).join('')}
      </tr>
    `).join('');

    el.innerHTML = `
      <div class="scoring-intro">
        <p>Each time you fulfil a condition during a battle, you earn the next Notoriety Title in that column and the corresponding Notoriety Points (NP). Each title can only be claimed once — fulfil the condition again to advance to the next tier.</p>
      </div>
      <div class="scoring-table-scroll">
        <table class="scoring-table">
          <thead>
            <tr>
              <th class="sc-head-condition">Condition</th>
              ${tierLabels.map(t => `
                <th class="sc-head-tier">
                  <span class="sc-tier-label">${t.label}</span>
                  <span class="sc-tier-np">${t.np} <span class="sc-np-word">NP</span></span>
                </th>
              `).join('')}
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>
    `;
  }

  /* ==========================================================
     MISSIONS
     ========================================================== */
  function renderMissions() {
    const el = document.getElementById('missions-grid');
    if (!el) return;

    el.innerHTML = D.missions.map(m => {
      const rulesHtml = (m.rules || []).map(r => `
        <div class="mission-rule">
          <span class="mission-rule-heading">${r.heading}</span>
          <span class="mission-rule-text">${r.text}</span>
        </div>
      `).join('');

      return `
        <div class="mission-card">
          <div class="mission-header">
            <div class="mission-type">${m.type}</div>
            <div class="mission-name">${m.name}</div>
          </div>
          <div class="mission-body">
            ${m.flavor ? `<p class="mission-flavor">${m.flavor}</p>` : ''}
            <div class="mission-rules">${rulesHtml}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  /* ==========================================================
     STRATAGEMS
     ========================================================== */
  function renderStratagems() {
    const el = document.getElementById('strat-grid');
    if (!el) return;

    el.innerHTML = D.stratagems.map(s => `
      <div class="strat-card">
        <div class="strat-cost">${s.cost}</div>
        <div class="strat-name">${s.name}</div>
        <div class="strat-type">${s.type}</div>
        <div class="strat-desc">
          <strong style="color:var(--white)">When:</strong> ${s.when}<br><br>
          <strong style="color:var(--white)">Effect:</strong> ${s.effect}
        </div>
      </div>
    `).join('');
  }

  /* ==========================================================
     SPOILS OF WAR TABLE
     ========================================================== */
  function renderSpoilsTable() {
    const el = document.getElementById('spoils-table-wrap');
    if (!el) return;

    const categoryColors = {
      'Cursed':      '#7b2fa0',
      'Essential':   '#b57a1e',
      'Cartomantic': '#1e6db4',
      'Martial':     '#9b1a1a',
      'Plundered':   '#1e8a4a',
      'Exotic':      '#2a8a8a',
    };

    // Group into two columns of 18 for a side-by-side layout
    const entries = D.spoilsTable;
    const half = Math.ceil(entries.length / 2);
    const left  = entries.slice(0, half);
    const right = entries.slice(half);

    const renderCol = rows => rows.map(r => {
      const color = categoryColors[r.category] || 'var(--txt-dim)';
      return `
        <tr>
          <td class="sw-d66">${r.d66}</td>
          <td class="sw-cat" style="color:${color}">${r.category}</td>
          <td class="sw-item">${r.item}</td>
        </tr>`;
    }).join('');

    el.innerHTML = `
      <div class="sw-tables">
        <table class="sw-table">
          <thead><tr><th>D66</th><th>Category</th><th>Item</th></tr></thead>
          <tbody>${renderCol(left)}</tbody>
        </table>
        <table class="sw-table">
          <thead><tr><th>D66</th><th>Category</th><th>Item</th></tr></thead>
          <tbody>${renderCol(right)}</tbody>
        </table>
      </div>
    `;
  }

  /* ==========================================================
     INIT
     ========================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    renderFactionCards();
    renderRosters();
    renderLeaderboard();
    renderBootyRolls();
    renderScoringTable();
    renderMissions();
    renderStratagems();
    renderSpoilsTable();
  });
})();
