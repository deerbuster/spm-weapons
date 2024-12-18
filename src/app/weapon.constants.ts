export interface Weapon {
  base: string;       // The base category of the weapon (e.g., "Pistol").
  class: string;      // The specific class of the weapon (e.g., "Pistol, Hold-Out").
  template: string;   // The weapon's template name (e.g., "Light Pistol (Holdout)").
  pb: number;         // The point-blank range.
  sh: number;         // The short range.
  me: number;         // The medium range.
  lo: number;         // The long range.
  ex: number;         // The extreme range.
  cost: number;       // The cost of the weapon.
  weight: number;     // The weight of the weapon in kilograms.
}

export interface TechLevel {
  name: string;
  level: number;
  powerCellCapacity: number;
}

export const WeaponConstants = {
  weaponData: [
    { base: 'Pistol', class: 'Pistol, Hold-Out', template: 'Light Pistol (Holdout)', pb: 1, sh: 3, me: 4, lo: 7, ex: 18, cost: 700, weight: 0.1 },
    { base: 'Pistol', class: 'Pistol, Light', template: 'Light Pistol', pb: 3, sh: 5, me: 8, lo: 13, ex: 35, cost: 350, weight: 0.2 },
    { base: 'Pistol', class: 'Pistol, Medium', template: 'Medium Pistol', pb: 3, sh: 5, me: 8, lo: 13, ex: 35, cost: 400, weight: 0.4 },
    { base: 'Pistol', class: 'Pistol, Heavy', template: 'Heavy Pistol', pb: 3, sh: 5, me: 8, lo: 13, ex: 35, cost: 550, weight: 0.6 },
    { base: 'Subassault', class: 'Subassault, Light', template: 'Light Subassault', pb: 1, sh: 10, me: 20, lo: 50, ex: 100, cost: 500, weight: 2.5 },
    { base: 'Subassault', class: 'Subassault, Medium', template: 'Medium Subassault', pb: 1, sh: 10, me: 20, lo: 50, ex: 100, cost: 800, weight: 3.0 },
    { base: 'Subassault', class: 'Subassault, Heavy', template: 'Heavy Subassault', pb: 1, sh: 10, me: 20, lo: 50, ex: 100, cost: 1100, weight: 3.5 },
    { base: 'Hunting', class: 'Hunting, Light', template: 'Light Assault', pb: 1, sh: 15, me: 30, lo: 150, ex: 300, cost: 400, weight: 3.0 },
    { base: 'Hunting', class: 'Hunting, Medium', template: 'Medium Assault', pb: 1, sh: 15, me: 30, lo: 150, ex: 300, cost: 500, weight: 3.5 },
    { base: 'Hunting', class: 'Hunting, Heavy', template: 'Heavy Assault', pb: 1, sh: 15, me: 30, lo: 150, ex: 300, cost: 700, weight: 4.0 },
    { base: 'Assault', class: 'Assault, Light', template: 'Light Assault', pb: 1, sh: 10, me: 20, lo: 100, ex: 200, cost: 400, weight: 3.0 },
    { base: 'Assault', class: 'Assault, Medium', template: 'Medium Assault', pb: 1, sh: 10, me: 20, lo: 100, ex: 200, cost: 500, weight: 3.5 },
    { base: 'Assault', class: 'Assault, Heavy', template: 'Heavy Assault', pb: 1, sh: 10, me: 20, lo: 100, ex: 200, cost: 700, weight: 4.0 },
    { base: 'Sniping', class: 'Sniping, Light', template: 'Light Assault', pb: 1, sh: 15, me: 30, lo: 150, ex: 300, cost: 400, weight: 3.0 },
    { base: 'Sniping', class: 'Sniping, Light', template: 'Medium Assault', pb: 1, sh: 15, me: 30, lo: 150, ex: 300, cost: 500, weight: 3.5 },
    { base: 'Sniping', class: 'Sniping, Medium', template: 'Heavy Assault', pb: 1, sh: 15, me: 30, lo: 150, ex: 300, cost: 700, weight: 4.0 },
    { base: 'Sniping', class: 'Sniping, Medium', template: 'Light Support', pb: 1, sh: 15, me: 30, lo: 150, ex: 300, cost: 1200, weight: 6.0 },
    { base: 'Sniping', class: 'Sniping, Heavy', template: 'Medium Support', pb: 1, sh: 15, me: 30, lo: 150, ex: 300, cost: 2000, weight: 12.0 },
    { base: 'Sniping', class: 'Sniping, Heavy', template: 'Heavy Support', pb: 1, sh: 15, me: 30, lo: 150, ex: 300, cost: 5000, weight: 18.0 },
    { base: 'Support', class: 'Support, Light', template: 'Light Support', pb: 1, sh: 15, me: 30, lo: 150, ex: 300, cost: 1200, weight: 6.0 },
    { base: 'Support', class: 'Support, Medium', template: 'Medium Support', pb: 1, sh: 15, me: 30, lo: 150, ex: 300, cost: 2000, weight: 12.0 },
    { base: 'Support', class: 'Support, Heavy', template: 'Heavy Support', pb: 1, sh: 15, me: 30, lo: 150, ex: 300, cost: 5000, weight: 18.0 },
    { base: 'Sonic Stunner', class: 'Sonic Stunner', template: 'Sonic Stunner', pb: 1, sh: 5, me: 10, lo: 20, ex: 50, cost: 300, weight: 0.01 }
  ],
  techLevels: [
    { name: 'Middle Industrial Civilization', level: 17, powerCellCapacity: 1 },
    { name: 'High Industrial Civilization', level: 18, powerCellCapacity: 2 },
    { name: 'Low Cyber Age', level: 19, powerCellCapacity: 4 },
    { name: 'High Cyber Age', level: 20, powerCellCapacity: 8 },
    { name: 'Spacefaring Age', level: 21, powerCellCapacity: 16 },
    { name: 'Starfaring Age', level: 22, powerCellCapacity: 32 },
    { name: 'Star Colonial Period', level: 23, powerCellCapacity: 64 },
    { name: 'Anti-Matter Age', level: 24, powerCellCapacity: 128 },
    { name: 'Age of Artificial Gravity', level: 25, powerCellCapacity: 256 },
    { name: 'Quantum Age', level: 26, powerCellCapacity: 512 },
    { name: 'Age of Force', level: 27, powerCellCapacity: 1024 },
    { name: 'Gavitic Age', level: 28, powerCellCapacity: 2048 },
    { name: 'Age of Terraforming', level: 29, powerCellCapacity: 4096 },
    { name: 'Age of Terraforming', level: 30, powerCellCapacity: 8192 }
  ],
  weaponTypes: ['Laser', 'Blaster', 'Plasma', 'Sonic'],
  rangeMultipliers: { Laser: 5, Plasma: 0.5, Blaster: 1, Sonic: 1 },
  actionModifiers: { 'Automatic Fire': 50, 'Continuous Fire': 100, 'Semi-Automatic Fire': 0 },
  weightModifiers:  { Laser: 0.8, Plasma: 1.3, Blaster: 1, Sonic: 1 },
  energyTable: {
    "Light Pistol (Holdout)": {
      Laser: [0, 0, 0, 0, 0, 1, 1, 2, 2, 4, 8, 16, 32],
      Blaster: [0, 0, 0, 0, 0, 1, 1, 2, 2, 4, 8, 16, 32],
      Plasma: [0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 4, 8, 16],
    },
    "Light Pistol": {
      Laser: [0, 0, 0, 0, 0, 1, 2, 3, 4, 8, 16, 32, 64],
      Blaster: [0, 0, 0, 0, 0, 1, 2, 3, 4, 8, 16, 32, 64],
      Plasma: [0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 8, 16, 32],
    },
    "Medium Pistol": {
      Laser: [0, 0, 0, 0, 1, 2, 3, 4, 5, 10, 18, 34, 66],
      Blaster: [0, 0, 0, 0, 1, 2, 3, 4, 5, 10, 18, 34, 66],
      Plasma: [0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 10, 18, 34],
    },
    "Heavy Pistol": {
      Laser: [0, 0, 0, 1, 2, 3, 4, 5, 6, 12, 20, 36, 68],
      Blaster: [0, 0, 0, 1, 2, 3, 4, 5, 6, 12, 20, 36, 68],
      Plasma: [0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 12, 20, 36],
    },
    "Light Subassault": {
      Laser: [0, 0, 0, 1, 2, 3, 4, 5, 6, 13, 21, 37, 69],
      Blaster: [0, 0, 0, 1, 2, 3, 4, 5, 6, 13, 21, 37, 69],
      Plasma: [0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 13, 21, 37],
    },
    "Medium Subassault": {
      Laser: [0, 0, 0, 1, 2, 4, 5, 6, 7, 15, 23, 39, 71],
      Blaster: [0, 0, 0, 1, 2, 4, 5, 6, 7, 15, 23, 39, 71],
      Plasma: [0, 0, 0, 0, 1, 2, 4, 5, 6, 7, 15, 23, 39],
    },
    "Heavy Subassault": {
      Laser: [0, 0, 1, 2, 3, 5, 6, 7, 8, 17, 25, 41, 73],
      Blaster: [0, 0, 1, 2, 3, 5, 6, 7, 8, 17, 25, 41, 73],
      Plasma: [0, 0, 0, 1, 2, 3, 5, 6, 7, 8, 17, 25, 41],
    },
    "Light Assault": {
      Laser: [0, 0, 1, 2, 3, 5, 6, 7, 8, 18, 26, 42, 74],
      Blaster: [0, 0, 1, 2, 3, 5, 6, 7, 8, 18, 26, 42, 74],
      Plasma: [0, 0, 0, 1, 2, 3, 5, 6, 7, 8, 18, 26, 42],
    },
    "Medium Assault": {
      Laser: [0, 0, 1, 2, 3, 6, 7, 8, 9, 20, 28, 43, 75],
      Blaster: [0, 0, 1, 2, 3, 6, 7, 8, 9, 20, 28, 43, 75],
      Plasma: [0, 0, 0, 1, 2, 3, 6, 7, 8, 9, 20, 28, 43],
    },
    "Heavy Assault": {
      Laser: [0, 1, 2, 3, 4, 7, 8, 9, 10, 22, 30, 45, 77],
      Blaster: [0, 1, 2, 3, 4, 7, 8, 9, 10, 22, 30, 45, 77],
      Plasma: [0, 0, 1, 2, 3, 4, 7, 8, 9, 10, 22, 30, 45],
    },
    "Light Support": {
      Laser: [0, 1, 2, 3, 4, 7, 8, 9, 10, 23, 31, 46, 78],
      Blaster: [0, 1, 2, 3, 4, 7, 8, 9, 10, 23, 31, 46, 78],
      Plasma: [0, 0, 1, 2, 3, 4, 7, 8, 9, 10, 23, 31, 46],
    },
    "Medium Support": {
      Laser: [0, 1, 2, 3, 4, 8, 9, 10, 11, 25, 33, 48, 80],
      Blaster: [0, 1, 2, 3, 4, 8, 9, 10, 11, 25, 33, 48, 80],
      Plasma: [0, 1, 1, 2, 3, 4, 8, 9, 10, 11, 25, 33, 48],
    },
    "Heavy Support": {
      Laser: [1, 2, 3, 4, 5, 9, 10, 11, 12, 27, 35, 50, 82],
      Blaster: [1, 2, 3, 4, 5, 9, 10, 11, 12, 27, 35, 50, 82],
      Plasma: [1, 1, 2, 3, 4, 5, 9, 10, 11, 12, 27, 35, 50],
    },
  }

};
