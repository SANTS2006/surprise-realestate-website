// Matches the "Sle 1,500.00" formatting used across the tenant/staff portal
// (Sierra Leonean Leone) — this site is the public face of the same
// company, so the currency should read identically everywhere.
export function formatCurrency(amount, { rounded = false } = {}) {
  const value = Number(amount ?? 0);
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: rounded ? 0 : 2,
    maximumFractionDigits: rounded ? 0 : 2,
  });
  return `Sle ${formatter.format(value)}`;
}

export function formatArea(sqft) {
  return `${new Intl.NumberFormat('en-US').format(sqft)} sq ft`;
}

// What kind of place a listing is, in a few words.
export function listingKind(listing) {
  if (listing.isWhole && !listing.buildingName) return 'Whole property';
  if (listing.isWhole) return 'Whole building';
  if (listing.buildingName) return `${listing.buildingName} · Unit ${listing.unitNumber}`;
  return listing.unitNumber ? `Unit ${listing.unitNumber}` : '';
}
