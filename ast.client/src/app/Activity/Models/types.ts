export interface ActivityType {
  name: string;
  requiresDistance: boolean;
  requiresRouteMap: boolean;
  caloriesBurnedPerHour: number; // Calories burned per hour for this activity type
}

export const ACTIVITY_TYPES: ActivityType[] = [
  { name: 'Running', requiresDistance: true, requiresRouteMap: true, caloriesBurnedPerHour: 600 },
  { name: 'Walking', requiresDistance: true, requiresRouteMap: false, caloriesBurnedPerHour: 300 },
  { name: 'Cycling', requiresDistance: true, requiresRouteMap: true, caloriesBurnedPerHour: 500 },
  // Add more activity types as needed
];
