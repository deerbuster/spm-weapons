import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { TechLevel, Weapon, WeaponConstants } from './weapon.constants';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatButtonModule, MatCardModule, MatGridListModule, FormsModule, MatSliderModule, MatFormFieldModule, MatInputModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  weaponData: Weapon[] = WeaponConstants.weaponData;
  techLevels: TechLevel[] = WeaponConstants.techLevels;
  weightModifiers: Record<string, number> = WeaponConstants.weightModifiers;
  weaponTypes: string[] = WeaponConstants.weaponTypes;
  rangeMultipliers: Record<string, number> = WeaponConstants.rangeMultipliers;
  energyTable = WeaponConstants.energyTable;


  

  classes: string[] = [];
  templates: string[] = [];

  selectedClass: string | null = null;
  selectedTemplate: string | null = null;
  selectedTechLevel = this.techLevels.find(t => t.level === 25)!;
  selectedWeaponType: string | null = null;
  selectedBonus: number = 0;
  actions: string[] = [];
  selectedAction: string | null = null;
  selectedReliabilityAdjustment: number = 0;
  selectedPowerCells: number = 1; // Default to 1 power cell
  selectedRangeIncrement: number = 0; // Default to 0% increment
  selectedWeapon: Weapon | undefined;
  selectedWeightReduction: number = 0;

  constructor() {
    this.populateClasses();
  }
  
  getWeaponByClassAndTemplate(): Weapon | undefined {
    if (!this.selectedClass || !this.selectedTemplate) {
      return undefined; // Return early if either is not populated
    }
    return this.weaponData.find(
      (weapon) => weapon.class === this.selectedClass && weapon.template === this.selectedTemplate
    );
  }
  
  
  onTechLevelChange(): void {
    this.selectedBonus = 0; // Reset bonus to 0
  }

  populateClasses(): void {
    this.classes = Array.from(new Set(this.weaponData.map(item => item.class)));
  }

  onClassChange(): void {
    const matchingTemplates = this.weaponData.filter(item => item.class === this.selectedClass);
    
    this.templates = matchingTemplates.map(item => item.template);

    if (this.templates.length === 1) {
      this.selectedTemplate = this.templates[0];
    } else {
      this.selectedTemplate = null;
    }
    this.selectedWeapon = this.getWeaponByClassAndTemplate();
    this.updateWeaponType();
  }

  updateWeaponType(): void {
    if (this.selectedClass === 'Sonic Stunner') {
      this.selectedWeaponType = 'Sonic';
    } else {
      this.selectedWeaponType = null;
    }
  }

  isWeaponTypeDisabled(type: string): boolean {
    if (this.selectedClass === 'Sonic Stunner') {
      return type !== 'Sonic';
    }
    return type === 'Sonic';
  }

  getApertureEnergy(): string | null {
    if (this.selectedWeaponType === 'Sonic') {
      // Sonic Stunners always display NA
      return 'NA';
    }
  
    if (!this.selectedTemplate || !this.selectedWeaponType || !this.selectedTechLevel) {
      return null;
    }
  
    // Safe access with explicit casting for template and weapon type
    const templateData = this.energyTable[this.selectedTemplate as keyof typeof this.energyTable];
    if (!templateData) {
      return null;
    }
  
    const energyValues = templateData[this.selectedWeaponType as keyof typeof templateData];
    if (!energyValues) {
      return null;
    }
  
    const levelIndex = this.selectedTechLevel.level - 18; // Offset to match table index
    const energyValue = energyValues[levelIndex] ?? null;
  
    // Format the result based on the weapon type
    if (this.selectedWeaponType === 'Laser') {
      return `LE ${energyValue}`;
    } else if (this.selectedWeaponType === 'Blaster') {
      return `BE ${energyValue}`;
    } else if (this.selectedWeaponType === 'Plasma') {
      return `PE ${energyValue}`;
    }
  
    return null;
  }

  getFumbleRange(): string | null {
    if (!this.selectedTemplate) {
      return null;
    }
  
    // Determine fumble range based on weapon type
    if (this.selectedTemplate.includes('Hold-Out')) {
      return '1-5';
    } else if (this.selectedTemplate.includes('Pistol')) {
      return '1-3';
    } else if (
      this.selectedTemplate.includes('Hunting') ||
      this.selectedTemplate.includes('Sniping')
    ) {
      return '1-2';
    } else if (
      this.selectedTemplate.includes('Assault') ||
      this.selectedTemplate.includes('Subassault')
    ) {
      return '1-3';
    } else if (this.selectedTemplate.includes('Support')) {
      return '1-4';
    } else if (this.selectedTemplate.includes('Sonic Stunner')) {
      return '1-2';
    }
  
    return null;
  }
  
  getMaxBonus(): number {
    if (!this.selectedTechLevel) {
      return 5; // Default minimum range
    }
  
    const techLevel = this.selectedTechLevel.level;
  
    if (techLevel <= 18) return 5;
    if (techLevel === 19) return 10;
    if (techLevel === 20) return 15;
    if (techLevel === 21) return 20;
    if (techLevel === 22) return 25;
    if (techLevel === 23) return 30;
    if (techLevel === 24) return 35;
    if (techLevel === 25) return 40;
    if (techLevel === 26) return 45;
    if (techLevel >= 27) return 50;
  
    return 5; // Fallback in case of unexpected tech level
  }
  
  getBonusRange(): string {
    const maxBonus = this.getMaxBonus();
    return `0 - ${maxBonus}`;
  }

  getAvailableActions(): void {
    if (this.selectedWeaponType === 'Blaster') {
      this.actions = ['Semi-Automatic Fire', 'Automatic Fire', 'Continuous Fire'];
    } else if (this.selectedWeaponType === 'Laser') {
      this.actions = ['Semi-Automatic Fire', 'Automatic Fire', 'Continuous Fire'];
    } else if (this.selectedWeaponType === 'Plasma') {
      this.actions = ['Semi-Automatic Fire', 'Automatic Fire'];
    } else if (this.selectedWeaponType === 'Sonic') {
      this.actions = ['Semi-Automatic Fire'];
    } else {
      this.actions = [];
    }
    this.selectedAction = null; // Reset action when weapon type changes
  }

  getActionPenalty(): number {
    if (this.selectedWeaponType === 'Blaster') {
      if (this.selectedAction === 'Automatic Fire') return -1;
      if (this.selectedAction === 'Continuous Fire') return -3;
    } else if (this.selectedWeaponType === 'Laser') {
      if (this.selectedAction === 'Automatic Fire') return -2;
      if (this.selectedAction === 'Continuous Fire') return -5;
    } else if (this.selectedWeaponType === 'Plasma') {
      if (this.selectedAction === 'Automatic Fire') return -2;
    }
    return 0;
  }

  getApertureEnergyWithPenalty(): string | null {
    const baseEnergy = this.getApertureEnergy();
    if (!baseEnergy || baseEnergy === 'NA') {
      return baseEnergy; // Return NA or incomplete directly
    }
  
    const penalty = this.getActionPenalty();
    const energyValue = parseInt(baseEnergy.slice(3), 10) + penalty; // Parse and adjust energy
    const prefix = baseEnergy.slice(0, 2); // LE, BE, or PE
  
    return `${prefix} ${Math.max(0, energyValue)}`; // Ensure energy does not drop below 0
  }

  onWeaponTypeChange(): void {
    this.getAvailableActions();
    this.selectedAction = null; // Reset action on weapon type change
    console.log('Selected Weapon Type:', this.selectedWeaponType);
  }

  getBreakageNumber(): number | null {
    if (!this.selectedWeaponType) {
      return null; // No weapon type selected
    }
  
    // Base breakage numbers for weapon types
    let breakageNumber: number;
    if (this.selectedWeaponType === 'Blaster') {
      breakageNumber = 5;
    } else if (this.selectedWeaponType === 'Laser') {
      breakageNumber = 3;
    } else if (this.selectedWeaponType === 'Plasma') {
      breakageNumber = 7;
    } else if (this.selectedWeaponType === 'Sonic') {
      return 1; // Sonic Stunners are unaffected by actions
    } else {
      return null;
    }
  
    // Adjust for action type
    if (this.selectedAction === 'Automatic Fire') {
      breakageNumber += 1;
    } else if (this.selectedAction === 'Continuous Fire') {
      breakageNumber += 2;
    }
  
    return breakageNumber;
  }
  getBaseReliability(): number | null {
    if (!this.selectedWeaponType) {
      return null; // No weapon type selected
    }
  
    if (this.selectedWeaponType === 'Blaster') {
      return 75;
    } else if (this.selectedWeaponType === 'Laser') {
      return 95;
    } else if (this.selectedWeaponType === 'Plasma') {
      return 55;
    } else if (this.selectedWeaponType === 'Sonic') {
      return 150;
    }
  
    return null; // Invalid weapon type
  }
  getActionReliabilityModifier(): number {
    if (!this.selectedAction || this.selectedWeaponType === 'Sonic') {
      return 0; // Sonic Stunners and no action have no modifier
    }
  
    if (this.selectedAction === 'Automatic Fire') {
      return -10;
    } else if (this.selectedAction === 'Continuous Fire') {
      return -20;
    }
  
    return 0; // Semi-Automatic Fire or invalid action
  }
  getReliabilityAdjustmentRange(): { min: number; max: number } {
    if (!this.selectedTechLevel) {
      return { min: -50, max: 0 }; // Default to lowest range
    }
  
    const techLevel = this.selectedTechLevel.level;
  
    if (techLevel === 18) return { min: -50, max: 0 };
    if (techLevel === 19) return { min: -50, max: 35 };
    if (techLevel === 20) return { min: -50, max: 65 };
    if (techLevel === 21) return { min: -50, max: 90 };
    if (techLevel === 22) return { min: -50, max: 110 };
    if (techLevel === 23) return { min: -50, max: 125 };
    if (techLevel === 24) return { min: -50, max: 135 };
    if (techLevel === 25) return { min: -50, max: 140 };
    if (techLevel === 26) return { min: -50, max: 144 };
    if (techLevel === 27) return { min: -50, max: 147 };
    if (techLevel === 28) return { min: -50, max: 149 };
    if (techLevel >= 29) return { min: -50, max: 150 };
  
    return { min: -50, max: 0 }; // Default
  }

  getTotalReliability(): number | null {
    const baseReliability = this.getBaseReliability();
    if (baseReliability === null) {
      return null; // No base reliability available
    }
  
    const actionModifier = this.getActionReliabilityModifier();
    const adjustment = this.selectedReliabilityAdjustment;
  
    return baseReliability + actionModifier + adjustment;
  }

  getHuntingClassification(): string | null {
    if (!this.selectedWeaponType) {
      return null; // No weapon type selected
    }
  
    const updatedEnergy = this.getApertureEnergyWithPenalty();
    if (!updatedEnergy || updatedEnergy === 'NA') {
      return null; // Invalid or incomplete energy
    }
  
    const energyValue = parseInt(updatedEnergy.slice(3), 10); // Extract numerical value
  
    if (this.selectedWeaponType === 'Laser' || this.selectedWeaponType === 'Blaster') {
      if (energyValue >= 1 && energyValue <= 3) return '-';
      if (energyValue >= 4 && energyValue <= 7) return 'I';
      if (energyValue >= 8 && energyValue <= 12) return 'II';
      if (energyValue >= 13) return 'III';
    } else if (this.selectedWeaponType === 'Plasma') {
      if (energyValue >= 1 && energyValue <= 2) return '-';
      if (energyValue >= 3 && energyValue <= 5) return 'I';
      if (energyValue >= 6 && energyValue <= 9) return 'II';
      if (energyValue >= 10) return 'III';
    }
  
    return '-'; // Default classification if none match
  }
  getPowerCellCapacity(): number | null {
    if (!this.selectedTechLevel) {
      return null; // No tech level selected
    }
    return this.selectedTechLevel.powerCellCapacity;
  }
  
  getShotsPerPowerCell(): number | null {
    const capacity = this.getPowerCellCapacity();
    const energy = this.getApertureEnergyWithPenalty();
  
    if (!capacity || !energy || energy === 'NA') {
      return null; // Incomplete selection or invalid data
    }
  
    let energyValue = parseInt(energy.slice(3), 10); // Extract numerical value
    if (energyValue === 0) {
      return null; // Avoid division by zero
    }
    if (this.selectedWeaponType === 'Plasma'){
      energyValue = energyValue * 2;
    }
      
  
    return Math.floor(capacity / energyValue);
  }

  getTotalShots(): number | null {
    const shotsPerCell = this.getShotsPerPowerCell();
    if (shotsPerCell === null) {
      return null; // Invalid data or incomplete selection
    }
    return shotsPerCell * this.selectedPowerCells; // Total shots = shots per cell * number of cells
  }

  getWeaponWeight(): number | null {
    this.selectedWeapon = this.getWeaponByClassAndTemplate();
    if (!this.selectedWeapon)
      return 0;

    // Retrieve weight based on the selected template
    return this.selectedWeapon.weight;
  }
  
  getWeightModifier(): number {
    if (!this.selectedWeaponType) {
      return 1; // Default modifier if no weapon type is selected
    }
  
    return this.weightModifiers[this.selectedWeaponType] ?? 1; // Return the modifier or default to 1
  }

  getTotalWeight(): number | null {
    const baseWeight = this.getWeaponWeight();
    if (baseWeight === null) {
      return null; // Incomplete selection
    }
  
    const modifier = this.getWeightModifier();
    return Math.round(baseWeight * modifier * (1-this.selectedWeightReduction/100) * 10)/10;
  }

  getBaseRanges(): { PB: number; Sh: number; Me: number; Lo: number; Ex: number } | null {
    if (!this.selectedWeapon) {
      console.error('No weapon class/template selected');
      return null; // No class selected
    }
  
 
    return { PB: this.selectedWeapon.pb, Sh: this.selectedWeapon.sh, Me: this.selectedWeapon.me, Lo: this.selectedWeapon.lo, Ex: this.selectedWeapon.ex };
  }
  
  getFinalRanges(): { PB: number; Sh: number; Me: number; Lo: number; Ex: number } | null {
    const baseRanges = this.getBaseRanges();
    if (!baseRanges || !this.selectedWeaponType) {
      return null; // Incomplete selection
    }
  
    const multiplier = this.rangeMultipliers[this.selectedWeaponType] ?? 1; // Default to x1 multiplier
    const increment = 1 + this.selectedRangeIncrement / 100; // Convert percentage to a factor
  
    // Apply multiplier first, then the increment
    return {
      PB: Math.round(baseRanges.PB * multiplier * increment),
      Sh: Math.round(baseRanges.Sh * multiplier * increment),
      Me: Math.round(baseRanges.Me * multiplier * increment),
      Lo: Math.round(baseRanges.Lo * multiplier * increment),
      Ex: Math.round(baseRanges.Ex * multiplier * increment),
    };
  }
  
  getTotalCost(): number | null {
    if (!this.selectedClass) {
      console.error('No class selected');
      return null; // No class selected
    }
  
    // Retrieve base cost from weaponData
    const weapon = this.weaponData.find(
      w => w.class.toLowerCase().trim() === this.selectedClass?.toLowerCase().trim()
    );
  
    if (!weapon) {
      console.error('Class not found in weaponData:', this.selectedClass);
      return null; // No matching weapon
    }
  
    const baseCost = weapon.cost;
    let totalModifiers = 0;
  
    // Weapon Type Modifier
    if (this.selectedWeaponType === 'Laser') {
      totalModifiers -= 20; // Subtract 20%
    } else if (this.selectedWeaponType === 'Plasma') {
      totalModifiers += 50; // Add 50%
    }
  
    // Bonus Modifier
    if (this.selectedBonus) {
      totalModifiers += Math.pow(this.selectedBonus, 2); // Bonus squared as a percent
    }
  
    // Action Modifier
    if (this.selectedAction === 'Automatic Fire') {
      totalModifiers += 50; // Add 50%
    } else if (this.selectedAction === 'Continuous Fire') {
      totalModifiers += 100; // Add 100%
    }
  
    // Reliability Adjustment
    if (this.selectedReliabilityAdjustment) {
      totalModifiers += Math.pow(this.selectedReliabilityAdjustment, 2); // Reliability squared as a percent
    }

    // Weight Reduction Adjustment
    totalModifiers += Math.pow(this.selectedWeightReduction, 2);
  
    // Range Increment Modifier
    totalModifiers += this.selectedRangeIncrement || 0; // Add range increment percentage
  
    // Calculate Final Cost
    const finalCost = baseCost * (1 + totalModifiers / 100);
    return Math.round(finalCost); // Return rounded cost
  }
  
  
}
