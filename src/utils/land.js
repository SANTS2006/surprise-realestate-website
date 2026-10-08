export const LAND_TYPES = [
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'agricultural', label: 'Agricultural' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'mixed_use', label: 'Mixed use' },
  { value: 'other', label: 'Other' },
];

const UNIT_LABEL = { acres: 'acres', hectares: 'hectares', sqm: 'm²', plots: 'plots' };

export const landTypeLabel = (value) => LAND_TYPES.find((t) => t.value === value)?.label ?? value;

export function formatLandArea(area, unit) {
  return `${new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(area)} ${UNIT_LABEL[unit] ?? unit}`;
}
