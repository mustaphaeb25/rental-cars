// src/utils/statusTranslator.js
const statusTranslations = {
  'disponible': 'Available',
   // Assuming 'louee' means rented
  'réservée': 'Rented',
  'en maintenance': 'In Maintenance',
  'en attente': 'Pending', // Added 'en attente'
  'annulée': 'Cancelled',
  'validée': 'Validated',
  'refusée':'Rejected'
  // Add any other French statuses you might use in your database
};

export const translateStatus = (frenchStatus) => {
  // Ensure frenchStatus is a string before calling toLowerCase()
  if (typeof frenchStatus !== 'string') {
    return frenchStatus; // Return as is if not a string
  }
  return statusTranslations[frenchStatus.toLowerCase()] || frenchStatus; // Fallback to original if no translation found
};