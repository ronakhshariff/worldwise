export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in kilometers
};

export const calculatePoints = (
  distance: number, 
  usedHints: { name?: boolean; language?: boolean }
): number => {
  // Base points start at 10
  let points = 10;
  
  // Deduct points for using hints
  if (usedHints.name) {
    points -= 2; // Name hint costs 2 points
  }
  if (usedHints.language) {
    points -= 2; // Language hint costs 2 points
  }
  
  // Distance-based deductions
  if (distance <= 50) {
    // Very close to actual location (within 50km)
    return Math.max(0, points);
  } else if (distance <= 200) {
    // Close to actual location (within 200km)
    return Math.max(0, points - 1);
  } else if (distance <= 500) {
    // Moderately close (within 500km)
    return Math.max(0, points - 2);
  } else if (distance <= 1000) {
    // Somewhat close (within 1000km)
    return Math.max(0, points - 3);
  } else if (distance <= 2000) {
    // Not very close (within 2000km)
    return Math.max(0, points - 4);
  } else if (distance <= 5000) {
    // Far away (within 5000km)
    return Math.max(0, points - 5);
  } else {
    // Very far away (more than 5000km)
    return Math.max(0, points - 6);
  }
};

export const getAccuracyLevel = (points: number): { level: string; color: string; bgColor: string } => {
  if (points >= 9) return { level: 'Perfect', color: 'text-green-600', bgColor: 'bg-green-100' };
  if (points >= 8) return { level: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100' };
  if (points >= 7) return { level: 'Great', color: 'text-blue-600', bgColor: 'bg-blue-100' };
  if (points >= 6) return { level: 'Good', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
  if (points >= 4) return { level: 'Fair', color: 'text-orange-600', bgColor: 'bg-orange-100' };
  return { level: 'Poor', color: 'text-red-600', bgColor: 'bg-red-100' };
};
