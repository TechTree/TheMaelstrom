/* ============================================================
   THE MAELSTROM: LAIR OF THE TYRANT
   Campaign Data — All players, battles, rules, missions
   ============================================================ */

const CAMPAIGN_DATA = {

  title:   "THE MAELSTROM: LAIR OF THE TYRANT",
  subtitle:"Into the Nightmare Realm",
  flavor:  "From the heart of the Maelstrom, Huron Blackheart's Red Corsairs surge forth alongside the newly revealed Aeldari Corsairs. In this crucible of war, six warlords clash for supremacy in the lawless void between realspace and the warp.",

  /* ----------------------------------------------------------
     FACTION COLOURS
  ---------------------------------------------------------- */
  factionColors: {
    aeldari:        { primary: '#2e6db4', name: 'Aeldari' },
    votann:         { primary: '#c97e1c', name: 'Leagues of Votann' },
    redcorsairs:    { primary: '#b52b1e', name: 'Red Corsairs CSM' },
    emperorschildren:{ primary: '#7b3fa0', name: "Emperor's Children" },
    huron:          { primary: '#993322', name: "Huron's Marauders" },
    necrons:        { primary: '#1e8a4a', name: 'Necrons' },
  },

  /* ----------------------------------------------------------
     PLAYERS & ROSTERS
  ---------------------------------------------------------- */
  players: [
    {
      id: 'ocean',
      handle: 'Ocean',
      faction: 'aeldari',
      army: 'Starfall Reavers',
      points: 995,
      detachment: 'Aspect Host',
      champion: 'Anakhin Skyrunner',
      championRole: 'Autarch on Skyrunner (Warlord)',
      // notoriety[i] = tier earned for condition i (0=none,1=3NP,2=4NP,3=5NP)
      notoriety: [2, 2, 0, 2, 1, 2, 0],
      bootyNP: 1,
      units: [
        { name: 'Autarch',                  points: 85,  gear: 'Star Glaive, Dragon Fusion Gun' },
        { name: 'Anakhin Skyrunner (Warlord)',points: 80, gear: 'Winds of War, Superlative Strategist, Star Lance, Dragon Fusion Gun, 2x Dragon Fusion Pistol' },
        { name: '5× Corsair Voidreavers',   points: 65  },
        { name: '5× Corsair Skyreavers',    points: 75  },
        { name: '5× Fire Dragons',          points: 120 },
        { name: '5× Fire Dragons',          points: 120 },
        { name: '5× Howling Banshees',      points: 95  },
        { name: '5× Rangers',               points: 55  },
        { name: '3× Shining Spears',        points: 110 },
        { name: '3× Shining Spears',        points: 110 },
        { name: '3× Shroud Runners',        points: 80  },
      ]
    },
    {
      id: 'baldee',
      handle: 'Baldee',
      notoriety: [2, 2, 1, 1, 1, 1, 0],
      bootyNP: 0,
      faction: 'votann',
      army: 'Crucible',
      points: 1000,
      detachment: 'Hearthband',
      champion: 'Kinhost Commander',
      championRole: 'Einhyr Champion (Warlord)',
      units: [
        { name: 'Kinhost Commander (Warlord)', points: 65,  gear: 'EtaCarn Plasma Gun, Mass Hammer, Weavefield Crest — Specialism: Exoarmour, Ability: Kindred Hero' },
        { name: 'Kâhl',                       points: 80,  gear: 'Autoch-pattern combi-bolter, Mass Gauntlet, Rampart Crest — Enhancement: Quake Multigenerator' },
        { name: 'Memnyr Strategist',           points: 45  },
        { name: '10× Hearthkyn Warriors',      points: 100 },
        { name: 'Kapricus Carrier',            points: 75  },
        { name: 'Sagitaur',                    points: 90  },
        { name: '5× Einhyr Hearthguard',       points: 135 },
        { name: 'Hekaton Land Fortress',        points: 240 },
        { name: '3× Hernkyn Pioneers',         points: 80  },
        { name: '10× Hernkyn Yaegirs',         points: 90  },
      ]
    },
    {
      id: 'pharaohwolf',
      handle: 'Pharaoh Wolf',
      notoriety: [1, 0, 0, 0, 0, 0, 0],
      bootyNP: 0,
      faction: 'redcorsairs',
      army: 'Renegade Raiders',
      points: 1000,
      detachment: 'Raiders and Reavers',
      champion: 'Exalted Champion',
      championRole: 'Exalted Champion (Warlord)',
      units: [
        { name: 'Exalted Champion (Warlord)',  points: 100, gear: 'Sigil of Corruption, Dark Zealotry, Heavy Flamer, Melta Tendril, Plasma Pistol, Axe of Dismemberment' },
        { name: 'Chaos Lord with Jump Pack',   points: 130, gear: 'Twin Lightning Claws — Enhancement: Mark of the Hound' },
        { name: '5× Dark Commune',             points: 90  },
        { name: 'Red Corsairs Reave-Captain',  points: 75  },
        { name: '10× Cultist Mob',             points: 50  },
        { name: '5× Legionaries',              points: 90  },
        { name: '3× Chaos Bikers',             points: 70  },
        { name: 'Chaos Rhino',                 points: 75  },
        { name: '5× Raptors',                  points: 110 },
        { name: '5× Red Corsairs Raiders',     points: 110 },
        { name: '5× Warp Talons',              points: 125 },
      ]
    },
    {
      id: 'hahnzo',
      handle: 'Hahnzo',
      notoriety: [1, 0, 0, 0, 0, 0, 0],
      bootyNP: 0,
      faction: 'emperorschildren',
      army: 'Court Ball',
      points: 990,
      detachment: 'Court of the Phoenician',
      champion: 'Daemon Prince of Slaanesh',
      championRole: 'Daemon Prince with Wings',
      units: [
        { name: 'Daemon Prince of Slaanesh with Wings', points: 215 },
        { name: 'Champion of Excess',   points: 100, gear: '2× Screamer Pistol, Rapture Lash, Phoenix Power Spear, Blastmaster' },
        { name: 'Lord Exultant',        points: 80,  gear: 'Phoenix Power Spear, Rapture Lash' },
        { name: '5× Infractors',        points: 85  },
        { name: '5× Infractors',        points: 85  },
        { name: 'Chaos Rhino',          points: 80  },
        { name: '2× Chaos Spawn',       points: 70  },
        { name: 'Maulerfiend',          points: 130 },
        { name: '6× Noise Marines',     points: 145 },
      ]
    },
    {
      id: 'eli',
      handle: 'hellothisiseli',
      notoriety: [0, 0, 0, 0, 0, 0, 0],
      bootyNP: 0,
      faction: 'huron',
      army: "The Hand of Death's Door",
      points: 1000,
      detachment: "Huron's Marauders",
      champion: 'Soul Forge Tyrant',
      championRole: 'Soul Forge Tyrant (Warlord)',
      units: [
        { name: 'Soul Forge Tyrant (Warlord)', points: 170, gear: 'Sigil of Corruption, Dark Zealotry, Baleflamer, Heavy Flamer, Daemon Hammer, Bladed Limbs, Technovirus Injector' },
        { name: 'Chaos Lord',                  points: 90,  gear: 'Daemon Hammer, Plasma Pistol' },
        { name: '5× Dark Commune',             points: 90  },
        { name: 'Red Corsairs Reave-Captain',  points: 75  },
        { name: '16× Accursed Cultists',        points: 195 },
        { name: '5× Chosen',                   points: 125 },
        { name: '5× Havocs',                   points: 125 },
        { name: '5× Warp Talons',              points: 125 },
      ]
    },
    {
      id: 'brian',
      handle: 'Brian',
      notoriety: [0, 0, 0, 0, 0, 0, 0],
      bootyNP: 0,
      faction: 'necrons',
      army: 'Crust of the Cursed Legion',
      points: 1000,
      detachment: 'Cursed Legion',
      champion: 'Dynastic Conqueror',
      championRole: 'Dynastic Conqueror (Warlord)',
      units: [
        { name: 'Dynastic Conqueror (Warlord)', points: 95,  gear: 'Specialism: Ophydian Lord, My Will Be Done, Gauss Destructor, Flensing Claw, Ophydian Hyperphase Weapons' },
        { name: 'Plasmancer',                   points: 70,  gear: 'Enhancement: Murdermind' },
        { name: 'Skorpekh Lord',                points: 110, gear: 'Enhancement: Mask of the Nekrosor' },
        { name: '5× Flayed Ones',               points: 60  },
        { name: '5× Flayed Ones',               points: 60  },
        { name: '3× Lokhust Heavy Destroyers',  points: 165 },
        { name: '3× Ophydian Destroyers',       points: 80  },
        { name: '6× Skorpekh Destroyers',       points: 180 },
        { name: '6× Skorpekh Destroyers',       points: 180 },
      ]
    },
  ],

  /* ----------------------------------------------------------
     BATTLES
  ---------------------------------------------------------- */
  battles: [
    {
      id: 1,
      date: '2026-03-13',
      mission: 'Heist',
      attacker: 'ocean',
      defender: 'pharaohwolf',
      attackerScore: 15,
      defenderScore: 3,
      notes: 'Ocean dominated the objective race, destroying the Warlord in melee combat.',
      scoreBreakdown: {
        ocean: [
          { desc: "Warlord's unit killed in melee", points: 3 },
          { desc: 'Enemy Warlord destroyed',         points: 3 },
          { desc: 'All enemy units destroyed',        points: 3 },
          { desc: 'Warlord in deployment zone',       points: 3 },
          { desc: 'Control more objectives',          points: 3 },
        ],
        pharaohwolf: [
          { desc: 'Warlord killed in melee',          points: 3 },
        ],
      }
    },
    {
      id: 2,
      date: '2026-03-28',
      mission: 'Heist',
      attacker: 'ocean',
      defender: 'baldee',
      attackerScore: 17,
      defenderScore: 6,
      notes: 'A stunning victory for the Starfall Reavers — Ocean outmaneuvered Baldee across every objective.',
      scoreBreakdown: {
        ocean: [
          { desc: 'Scourge (4 kill objectives)',       points: 4 },
          { desc: 'Vengeful (4 enemy units)',          points: 4 },
          { desc: 'Bloodthirsty (4 models in melee)', points: 4 },
          { desc: 'Profiteers (4 objectives held)',   points: 4 },
          { desc: 'NP — First roll bonus',            points: 1 },
        ],
        baldee: [
          { desc: 'Scourge (3 kill objectives)',       points: 3 },
          { desc: 'Vengeful (3 enemy units)',          points: 3 },
        ],
      }
    },
    {
      id: 3,
      date: '2026-04-04',
      mission: 'Extraction',
      attacker: 'hahnzo',
      defender: 'baldee',
      attackerScore: null,
      defenderScore: null,
      notes: 'Played — Awaiting Score Submission',
      scoreBreakdown: {},
    },
  ],

  /* ----------------------------------------------------------
     SPOILS OF WAR — D66 reference table (from rulebook)
     Categories: Cursed, Essential, Cartomantic, Martial, Plundered, Exotic
  ---------------------------------------------------------- */
  spoilsTable: [
    { d66: 11, category: 'Cursed',      item: 'Warp-bound Pendant' },
    { d66: 12, category: 'Cursed',      item: 'Thirsting Chalice' },
    { d66: 13, category: 'Cursed',      item: 'Witch-haunt Casket' },
    { d66: 14, category: 'Cursed',      item: 'Abominable Dataslate' },
    { d66: 15, category: 'Cursed',      item: 'Harrowing Soul Contract' },
    { d66: 16, category: 'Cursed',      item: 'Corrupted Pelorus' },
    { d66: 21, category: 'Essential',   item: 'Abundant Munitions' },
    { d66: 22, category: 'Essential',   item: 'Racks of Blades' },
    { d66: 23, category: 'Essential',   item: 'Scavenged Victuals' },
    { d66: 24, category: 'Essential',   item: 'Unidentified Stimms' },
    { d66: 25, category: 'Essential',   item: 'Fuel Cells' },
    { d66: 26, category: 'Essential',   item: 'Neurocrickets' },
    { d66: 31, category: 'Cartomantic', item: 'Chart of Shadows' },
    { d66: 32, category: 'Cartomantic', item: 'Salvaged Intelligence' },
    { d66: 33, category: 'Cartomantic', item: 'Pilfered Master Plan' },
    { d66: 34, category: 'Cartomantic', item: 'Oracular Schemata' },
    { d66: 35, category: 'Cartomantic', item: 'Gyre Beacon' },
    { d66: 36, category: 'Cartomantic', item: 'Gyra Beacons' },
    { d66: 41, category: 'Martial',     item: 'Wasp Sabre' },
    { d66: 42, category: 'Martial',     item: 'Doom Sphere' },
    { d66: 43, category: 'Martial',     item: "Cutthroat's Dagger" },
    { d66: 44, category: 'Martial',     item: "Narwhal's Tooth" },
    { d66: 45, category: 'Martial',     item: 'Soulrender' },
    { d66: 46, category: 'Martial',     item: 'Tarelian Handgonne' },
    { d66: 51, category: 'Plundered',   item: 'Leviathan Scale' },
    { d66: 52, category: 'Plundered',   item: 'Restless Idol' },
    { d66: 53, category: 'Plundered',   item: "Rival's Skull" },
    { d66: 54, category: 'Plundered',   item: "Psyker's Knucklebones" },
    { d66: 55, category: 'Plundered',   item: 'Defaced Ensign' },
    { d66: 56, category: 'Plundered',   item: 'Waystone Ring' },
    { d66: 61, category: 'Exotic',      item: "Reaver's Mask" },
    { d66: 62, category: 'Exotic',      item: 'Gyre-spawned Familiar' },
    { d66: 63, category: 'Exotic',      item: 'Mirage Generators' },
    { d66: 64, category: 'Exotic',      item: 'Soulsnare Casket' },
    { d66: 65, category: 'Exotic',      item: 'Warplight Lantern' },
    { d66: 66, category: 'Exotic',      item: "Tyrant's Sceptre" },
  ],

  /* ----------------------------------------------------------
     PIRATE BOOTY ROLLS (Spoils of War D66 rolls)
     From the handwritten sheet
  ---------------------------------------------------------- */
  bootyRolls: [
    // Vlad vs Ian (Previews)
    { player: 'ocean',      battle: 'Ocean vs Pharaoh Wolf', rolls: [32, 16, 41, 42, 15] },
    { player: 'pharaohwolf',battle: 'Ocean vs Pharaoh Wolf', rolls: [25] },
    // Vlad vs Justin
    { player: 'ocean',      battle: 'Ocean vs Baldee',       rolls: [] }, // included in above
    { player: 'baldee',     battle: 'Ocean vs Baldee',       rolls: [51] },
    // Brian vs Justin
    { player: 'hahnzo',     battle: 'Baldee vs Hahnzo',      rolls: [34] },
    { player: 'baldee',     battle: 'Baldee vs Hahnzo',      rolls: [61, 64, 32, 53, 44] },
  ],

  /* ----------------------------------------------------------
     NOTORIETY TITLES — Campaign Scoring
     7 conditions × 3 tiers. Each condition earns the next title.
     Tier I = 3 NP, Tier II = 4 NP, Tier III = 5 NP
  ---------------------------------------------------------- */
  notorietyTitles: [
    {
      condition: "Your WARLORD's unit destroys one or more enemy units in the Fight phase.",
      tiers: [
        { name: 'Scourge',      np: 3, desc: 'Your name is a savage curse, spat or roared by your chosen lieutenants as they reap bloody tallies in your name. You and your commanders are feared and hated by the foe, while hailed by your underlings as vicious figureheads.' },
        { name: 'Executioner',  np: 4, desc: 'Your commanders may covet your position, but until they make their move they are your tools of execution. Through savagery, your vicious will is enacted amidst the most lethal raids and a fell lesson taught to all who defy you.' },
        { name: "Gyre's Blade", np: 5, desc: 'You have carved out a dread reputation as a notorious death dealer. It is one sliced into the flesh of pirate kings, the hulls of their ships and the ruins of their kingdoms, which stand as testimonies to your personal strength.' },
      ],
    },
    {
      condition: 'The enemy WARLORD is destroyed.',
      tiers: [
        { name: 'Vengeful',    np: 3, desc: 'In the race for power and influence, many are the shady alliances that must be struck. Yet of greater importance is the repaying of betrayal — real or imagined — by those who would rival your rise amongst the Maelstrom\'s reavers.' },
        { name: 'Unrivalled',  np: 4, desc: 'Upstart corsairs and opposing cutthroats lie bloodied and broken in the path you have trodden to power. Others remain, yet they circle warily as your reputation for humbling would-be rivals spreads through the gyre.' },
        { name: 'Imperious',   np: 5, desc: 'With every competing corsair ground beneath the juggernaut of your ambition, the reavers of the Maelstrom fear your tyranny more. Only the pitiful would hide such strength, so you display your gory trophies for all to see.' },
      ],
    },
    {
      condition: 'You are the victor of a mission, and that was neither your first victory nor a mission you have already won in this campaign.',
      tiers: [
        { name: 'Opportunist', np: 3, desc: 'Unforeseen circumstances abound in the Maelstrom, whether infernal effects of the gyre or the sudden actions of other reavers. You have survived thus far by being an astute strategist and exploiting such unexpected situations.' },
        { name: 'Raidmaster',  np: 4, desc: 'Your reputation for seizing victory amidst the most unfavourable conditions is spreading. Your mastery of raiding tactics is vaunted and cursed in equal measure, and your tally of acquisitions is a testament to your skill.' },
        { name: 'Despot',      np: 5, desc: 'You are renowned for imposing your will upon the battlefield, dictating terms amidst your ruthless raids. Capable of controlling the fortunes of war, you have added your infamy to the annals of the Maelstrom\'s greatest reavers.' },
      ],
    },
    {
      condition: 'At the end of the battle, each enemy unit is either Below Half-strength or not on the battlefield.',
      tiers: [
        { name: 'Cruel',         np: 3, desc: 'If your competitors dare claim a share of the plunder, you ensure they also take their deserved share of pain, terror and death. None will be denied these worthy gifts; you direct your warriors to be generous.' },
        { name: 'Bloodthirsty',  np: 4, desc: 'Some of your servants paint your deeds as punitive, zealous or courageous. The pirate lords of the Maelstrom see your acts as bloodthirsty and warily respect your strength while seeking to outdo you in vicious savagery.' },
        { name: 'Reaper',        np: 5, desc: 'Your name is synonymous with death, and some corsairs fear your reavers as agents of extinction. With every raid, large or small, you leave more gory footprints on your charnel path to greatness amidst the gyre\'s murderers.' },
      ],
    },
    {
      condition: "At the end of the battle, your WARLORD is within your opponent's deployment zone.",
      tiers: [
        { name: 'Brash',         np: 3, desc: 'Forthright and daring, you have gained a name for testing your foes\' defences. Whether in person or via a powerful proxy, you have claimed the territories of a rival by right of both your conquest and their weakness.' },
        { name: 'Audacious',     np: 4, desc: 'Your brazen strikes into the heartlands of your enemies have grown more dauntless. They are as much theatre as strategy; your bold plays mocking your foes\' security and simultaneously strengthening your renown.' },
        { name: 'Unstoppable',   np: 5, desc: 'You have shown that nothing and no one can stand in the way of your might. Through artifice and guile, or butchery and brute force, you and your chosen lieutenants bestride the tortured worlds of the Maelstrom as you please.' },
      ],
    },
    {
      condition: 'At the end of the battle, you control more objective markers than your opponent.',
      tiers: [
        { name: 'Grasping',   np: 3, desc: 'Survival in the Maelstrom is hard-earned. Through strength, avarice or desperation, you have hung on to a clutch of valuable caches, leaving your foes only with the meagre scraps deserving of the defeated.' },
        { name: 'Profiteer',  np: 4, desc: 'Your growing wealth is fed with plunder and prizes seized from your rivals. Built as it is upon the misery and suffering of others, your swelling power must be guarded, both from covetous foes and ambitious underlings.' },
        { name: 'Gilded',     np: 5, desc: 'A pillager and marauder of exceptional skill, you flaunt your plundered resources with the earned arrogance of the greatest corsairs. Yet amidst revelling in your trophies, beware the hunger of your rivals as it curdles into bitter greed.' },
      ],
    },
    {
      condition: "Your WARLORD's unit Secured the Plunder this battle.",
      tiers: [
        { name: 'Shrewd',        np: 3, desc: 'Seizing a prize means nothing if it subsequently slips into the foe\'s coffers, but your astute urgency has secured at least one share. To some of your reavers, it is an inspirational spur to do likewise. To others, it is an act of self-serving greed.' },
        { name: 'Evasive',       np: 4, desc: 'You have paired an instinct for survival with an exceptional talent for looting. Whatever ends your plunder will be put to, you and your commanders are swiftly becoming infamous for safely spiriting away the greatest treasures.' },
        { name: 'Shadow Thief',  np: 5, desc: 'Feral tribes amidst the Maelstrom — and no few rival pirates — have ascribed your victory to supernatural intervention. Your notorious myth is as a phantasmal plunderer capable of slipping past encircling hunters.' },
      ],
    },
  ],

  /* ----------------------------------------------------------
     MISSIONS
  ---------------------------------------------------------- */
  missions: [
    {
      name: 'Risk and Reward',
      type: 'Raid and Ruin Mission',
      flavor: 'Raiders and buccaneers battle to seize worthy trophies from the twisted and decaying remains of a drifting derelict. Attempts to extract these prizes are fraught with danger. The combatants must judge whether the risk is worth the potential reward.',
      rules: [
        { heading: 'Attacker and Defender', text: 'Look at the deployment map and agree which edges of your battlefield are the Attacker\'s and Defender\'s battlefield edges. Players roll off and the winner decides who will be the Attacker and who will be the Defender.' },
        { heading: 'Deploy Armies', text: 'Players take it in turns to set up their remaining units one at a time, starting with the Defender. A player\'s models must be set up wholly within their deployment zone. If one player finishes deploying all of their units, their opponent then deploys the remainder of their units.' },
        { heading: 'First Turn', text: 'Players roll off and the winner takes the first turn.' },
        { heading: 'Volatile Cargo', text: 'Each objective marker is volatile at the start of the battle. The first time a unit ends a move within range of a volatile objective marker, the player who controls that unit rolls one Die. On a 1, that unit suffers 1 mortal wound. Regardless of the result rolled, that objective marker is no longer volatile.' },
        { heading: 'Victor', text: 'The battle ends after five battle rounds have been completed. Even if one or more players have no models remaining in their army at the start of their turn, players continue to play out their turns until the battle ends. At the end of the battle, the player who controls the most objective markers wins.' },
      ],
    },
    {
      name: 'Trapped',
      type: 'Raid and Ruin Mission',
      flavor: 'Caught in an ambush by a rival warband, a raiding party faces the prospect of annihilation. As the attackers close in, the defending combatants must close ranks, fight their opponents off and defend the territory they have settled.',
      rules: [
        { heading: 'Attacker and Defender', text: 'Look at the deployment map and agree which edges of your battlefield are the Attacker\'s and Defender\'s battlefield edges. The Maelstrom mission matrix tells you which player is the Attacker and which is the Defender.' },
        { heading: 'Deploy Armies', text: 'Starting with the Attacker, each player sets up all of their models wholly within their deployment zone.' },
        { heading: 'First Turn', text: 'The Attacker takes the first turn.' },
        { heading: 'Victor', text: 'The battle ends after five battle rounds have been completed. Even if one or more players have no models remaining in their army at the start of their turn, players continue to play out their turns until the battle ends. At the end of the battle, the player who controls the most objective markers wins.' },
      ],
    },
    {
      name: 'Extraction',
      type: 'Raid and Ruin Mission',
      flavor: 'Armed with a veritable bounty of plunder, a band of raiders need to get out. First, however, they must fight their way through their opportunistic rivals. When thirst for blood-soaked trophies shows no bounds.',
      rules: [
        { heading: 'Attacker and Defender', text: 'Look at the deployment map and agree which edges of your battlefield are the Attacker\'s and Defender\'s battlefield edges. The Maelstrom mission matrix tells you which player is the Attacker and which is the Defender.' },
        { heading: 'Deploy Armies', text: 'Starting with the Attacker, each player sets up all of their models wholly within their deployment zone.' },
        { heading: 'Loot Bearers', text: 'Once armies are deployed, the Defender secretly selects one to five units from their army on the battlefield. The Defender makes a note of each of these units. Each of the selected units is secretly carrying an objective marker. Designer\'s Note: The Attacker doesn\'t know which, or even how many of the Defender\'s units are carrying objective markers. These units are still affected by all the rules shown on page 26, meaning if they are destroyed those objective markers will be dropped.' },
        { heading: 'First Turn', text: 'The Attacker takes the first turn.' },
        { heading: 'Escape Route', text: 'The Defender\'s units can only leave the battlefield (see Secured the Plunder, page 26) via the Attacker\'s battlefield edge (see the deployment map).' },
        { heading: 'Victor', text: 'The battle ends after five battle rounds have been completed. Even if one or more players have no models remaining in their army at the start of their turn, players continue to play out their turns until the battle ends. At the end of the battle, the Defender reveals their note of which units were carrying objective markers; then the player who controls the most objective markers wins.' },
      ],
    },
    {
      name: 'High Stakes',
      type: 'Raid and Ruin Mission',
      flavor: 'A rivalry between two of the Maelstrom\'s notorious warlords has reached boiling point. In their attempts to ambush one another, the two have become embroiled in a bitter battle. Perhaps this enmity will finally be settled in blood.',
      rules: [
        { heading: 'Attacker and Defender', text: 'Look at the deployment map and agree which edges of your battlefield are the Attacker\'s and Defender\'s battlefield edges. Players roll off and the winner decides who will be the Attacker and who will be the Defender.' },
        { heading: 'Deploy Armies', text: 'Players take it in turns to set up their units one at a time, starting with the Defender. A player\'s models must be set up wholly within their deployment zone. Each player\'s first unit must be their WARLORD unit and it must be set up in their Warlord deployment zone. A maximum of two units can simultaneously occupy the Warlord deployment zone. Any remaining units are set up normally. If one player finishes deploying all of their units, their opponent then deploys the remainder of their units.' },
        { heading: 'First Turn', text: 'Players roll off and the winner takes the first turn.' },
        { heading: 'Bring Me Their Head', text: 'A player\'s WARLORD unit is not visible to an enemy model unless that model is within 12″ of that unit, and it cannot be the target of an attack unless the attacking model is within 12″ of that unit.' },
        { heading: 'Victor', text: 'The battle ends after five battle rounds have been completed. Even if one or more players have no models remaining in their army at the start of their turn, players continue to play out their turns until the battle ends. At the end of the battle, the player who controls the most objective markers wins.' },
      ],
    },
    {
      name: 'Reavers at Bay',
      type: 'Raid and Ruin Mission',
      flavor: 'After a long pursuit, a band of reavers laden with plunder find themselves cornered and are now forced to make a final stand. Their pursuers — the very same foes from whom these prizes were stolen — now surge forward to retake their due.',
      rules: [
        { heading: 'Attacker and Defender', text: 'Look at the deployment map and agree which edges of your battlefield are the Attacker\'s and Defender\'s battlefield edges. The Maelstrom mission matrix tells you which player is the Attacker and which is the Defender.' },
        { heading: 'Deploy Armies', text: 'Starting with the Attacker, each player sets up all of their units wholly within their deployment zone.' },
        { heading: 'First Turn', text: 'The Attacker takes the first turn.' },
        { heading: 'Laden Down', text: 'The Defender\'s units cannot leave the battlefield while carrying an objective marker (or via Secured the Plunder, see page 26).' },
        { heading: 'Victor', text: 'The battle ends after five battle rounds have been completed. Even if one or more players have no models remaining in their army at the start of their turn, players continue to play out their turns until the battle ends. At the end of the battle, the player who controls the most objective markers wins.' },
      ],
    },
    {
      name: 'Dawn Raid',
      type: 'Raid and Ruin Mission',
      flavor: 'Having undertaken a night raid, one pirate warband awaits extraction. As one of the Maelstrom\'s eldritch and unexpected dawns rises, foes appear on the horizon. With no time to evade — the exhausted raiders must fight or die.',
      rules: [
        { heading: 'Attacker and Defender', text: 'Look at the deployment map and agree which edges of your battlefield are the Attacker\'s and Defender\'s battlefield edges. The Maelstrom mission matrix tells you which player is the Attacker and which is the Defender.' },
        { heading: 'Deploy Armies', text: 'Starting with the Attacker, each player sets up all of their units wholly within their deployment zone.' },
        { heading: 'First Turn', text: 'The Attacker takes the first turn.' },
        { heading: 'Laden Down', text: 'The Defender\'s units cannot leave the battlefield while carrying an objective marker (or via Secured the Plunder, see page 26).' },
        { heading: 'Victor', text: 'The battle ends after five battle rounds have been completed. Even if one or more players have no models remaining in their army at the start of their turn, players continue to play out their turns until the battle ends. At the end of the battle, the player who controls the most objective markers wins.' },
      ],
    },
    {
      name: 'Heist',
      type: 'Raid and Ruin Mission',
      flavor: 'Pirate raiders have surveilled their rivals\' operations and have located their base of operations. Now they launch a swift assault upon this stronghold in hopes of slaughtering their foes and seizing their accumulated wealth.',
      rules: [
        { heading: 'Attacker and Defender', text: 'Look at the deployment map and agree which edges of your battlefield are the Attacker\'s and Defender\'s battlefield edges. The Maelstrom mission matrix tells you which player is the Attacker and which is the Defender.' },
        { heading: 'Deploy Armies', text: 'Starting with the Attacker, each player sets up all of their units wholly within their deployment zone.' },
        { heading: 'Sentries', text: 'At the start of the first battle round, the Defender selects five units from their army on the battlefield to be Guard units (or as many as they can if fewer than five are available). Guard units automatically pass Battle-shock tests they take. Once per battle round, the Defender can target one Guard unit with the Fire Overwatch or Heroic Intervention Stratagems for 0CP, even if they have already targeted another unit with that Stratagem that turn. Designer\'s Note: These units are still affected by all the rules shown on page 26, meaning if they are destroyed those objective markers will be dropped.' },
        { heading: 'First Turn', text: 'The Attacker takes the first turn.' },
        { heading: 'Laden Down', text: 'The Defender\'s units cannot leave the battlefield while carrying an objective marker (or via Secured the Plunder, see page 26).' },
        { heading: 'Victor', text: 'The battle ends after five battle rounds have been completed. Even if one or more players have no models remaining in their army at the start of their turn, players continue to play out their turns until the battle ends. At the end of the battle, the player who controls the most objective markers wins.' },
      ],
    },
    {
      name: 'Chance Engagement',
      type: 'Raid and Ruin Mission',
      flavor: 'Lost in a maze of phantasms, two resource-hunting armies blunder past each other, until — in the blink of an eye — the illusions disperse, leaving warriors face to face with their enemies and with the prizes they seek at their feet.',
      rules: [
        { heading: 'Attacker and Defender', text: 'Look at the deployment map and agree which edges of your battlefield are the Attacker\'s and Defender\'s battlefield edges. Players roll off and the winner decides who will be the Attacker and who will be the Defender.' },
        { heading: 'Deploy Armies', text: 'Players take it in turns to set up their units one at a time, starting with the Defender, anywhere on the battlefield more than 9″ away from each enemy model. Each model in a unit must be set up within 2″ of each other model in that unit. If one player finishes deploying all of their units, their opponent then deploys the remainder. Once a player has finished setting up units, any units that could not be placed start the battle in Reserves. If a unit cannot be set up or placed in Reserves, it is destroyed.' },
        { heading: 'First Turn', text: 'Players roll off and the winner takes the first turn.' },
        { heading: 'Larceny', text: 'At the start of the first battle round, for each objective marker, the player going second can select one unit from their army within range of that objective marker, excluding VEHICLES (other than WALKERS), and excluding units in which each model has an Objective Control characteristic of 0. If that unit is not already carrying an objective marker, that unit is now carrying that objective marker.' },
        { heading: 'Victor', text: 'The battle ends after five battle rounds have been completed. Even if one or more players have no models remaining in their army at the start of their turn, players continue to play out their turns until the battle ends. At the end of the battle, the player who controls the most objective markers wins.' },
      ],
    },
  ],

  /* ----------------------------------------------------------
     STRATAGEMS
  ---------------------------------------------------------- */
  stratagems: [
    {
      name: 'Warp Revenants',
      type: 'Raid and Ruin — Strategic Ploy',
      cost: '1CP',
      when: 'Any phase in the first battle round.',
      effect: 'Add a new unit to your army identical to your destroyed unit, in Strategic Reserves at its Starting Strength and with all of its wounds remaining. Cannot be used to return destroyed Character units to Attached units.',
    },
    {
      name: 'Larceny',
      type: 'Raid and Ruin — Strategic Ploy',
      cost: '1CP',
      when: 'Your Command phase.',
      effect: 'Select one enemy unit (not Vehicles or Walkers, not carrying an objective, with Objective Control 0). One unit from your army in Engagement Range is now carrying that objective marker instead.',
    },
    {
      name: 'Fortune Favours the Bold',
      type: 'Raid and Ruin — Strategic Ploy',
      cost: '1CP',
      when: 'Your Movement phase, when one unit is selected to move.',
      effect: 'That unit takes a Desperate Escape test. Until the end of the phase, each time a model in your unit makes a move, it can move within Engagement Range of enemy models it cannot end that move within Engagement Range of.',
    },
    {
      name: 'Hasty Retreat',
      type: 'Raid and Ruin — Strategic Ploy',
      cost: '1CP',
      when: 'Your Movement phase, just after you have selected a unit to Fall Back.',
      effect: "Until the end of the phase, add 6\" to the Move characteristic of models in your unit.",
    },
  ],

};

/* ----------------------------------------------------------
   Calculate standings — progressive notoriety NP + booty NP
   notoriety[i] = tier achieved for condition i (0=none, 1,2,3)
   Tier NP values: tier1=3, tier2=4, tier3=5
   Total NP = sum of current tier NP per condition + bootyNP
---------------------------------------------------------- */
function calculateStandings() {
  const NP_BY_TIER = [0, 3, 4, 5];
  const battles = CAMPAIGN_DATA.battles;

  return CAMPAIGN_DATA.players.map(p => {
    // Sum the NP for each condition's current tier
    const notorietyNP = (p.notoriety || [0,0,0,0,0,0,0])
      .reduce((sum, tier) => sum + NP_BY_TIER[tier], 0);

    // Earned titles: list of title names currently held
    const titlesHeld = (p.notoriety || []).map((tier, i) => {
      if (tier === 0) return null;
      return CAMPAIGN_DATA.notorietyTitles[i].tiers[tier - 1].name;
    }).filter(Boolean);

    // Battles played
    const battlesPlayed = battles.filter(b =>
      (b.attacker === p.id || b.defender === p.id) &&
      b.attackerScore !== null
    ).length;

    const totalPoints = notorietyNP + (p.bootyNP || 0);

    return {
      ...p,
      notorietyNP,
      bootyNP: p.bootyNP || 0,
      totalPoints,
      titlesHeld,
      battlesPlayed,
    };
  }).sort((a, b) => b.totalPoints - a.totalPoints || b.battlesPlayed - a.battlesPlayed);
}
