export const MUNICIPAL_UTILITIES = [
  {
    name: 'Butler Electric Department',
    phone: '9738380063',
    display: '973-838-0063',
    sms: null,
    towns: ['Butler', 'Kinnelon'],
  },
];

export function getMunicipalUtilitiesForTown(town) {
  return MUNICIPAL_UTILITIES.filter((u) => u.towns.includes(town));
}