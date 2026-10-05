// The company's public contact details — the single place to change them.
const ADDRESS = 'Kawa Street, Bo, Sierra Leone';

export const SITE = {
  name: 'Surprise Real Estate',
  email: 'suprisesolutiongroup@gmail.com',
  phone: '+232 75 441 960',
  phoneTel: '+23275441960',
  whatsapp: '23275441960',
  address: ADDRESS,
  street: 'Kawa Street',
  city: 'Bo',
  // Bo city centre — the map opens here; the links below search the street itself.
  office: { lat: 7.9647, lng: -11.7383, title: 'Surprise Real Estate — Head Office' },
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS)}`,
  mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`,
};
