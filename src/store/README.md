# Profile Store Documentation

This document explains how to use the Zustand-based profile store for managing user profile data in the MyGoFit app.

## Overview

The profile store provides a centralized way to manage user profile data throughout the application. It includes:

- **Persistent storage** using AsyncStorage
- **Optimistic updates** for better UX
- **Computed values** for common operations
- **Integration with Supabase** for data synchronization

## Files Structure

```
src/stores/
├── profileStore.ts          # Main Zustand store
├── README.md               # This documentation

src/hooks/
├── useProfile.ts           # Custom hook for profile management

src/providers/
├── SupabaseProvider.tsx      # Supabase provider with Zustand integration

src/components/profile/
├── ProfileDisplay.tsx      # Example component using the store
```

## Basic Usage

### 1. Using Store Selectors

```typescript
import {
  useProfile,
  useDisplayName,
  useAge,
  useIsProfileComplete
} from '@/stores/profileStore';

function MyComponent() {
  const profile = useProfile();
  const displayName = useDisplayName();
  const age = useAge();
  const isComplete = useIsProfileComplete();

  return (
    <View>
      <Text>{displayName}</Text>
      {age && <Text>{age} years old</Text>}
      {!isComplete && <Text>Profile incomplete</Text>}
    </View>
  );
}
```

### 2. Using the Profile Manager Hook

```typescript
import { useProfileManager } from '@/hooks/useProfile';

function ProfileScreen() {
  const {
    profile,
    isLoading,
    error,
    updateProfile,
    loadProfile
  } = useProfileManager();

  const handleUpdateWeight = async () => {
    await updateProfile({ weight: 75 });
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View>
      <Text>Weight: {profile?.weight} kg</Text>
      <Button onPress={handleUpdateWeight} title="Update Weight" />
    </View>
  );
}
```

### 3. Direct Store Access

```typescript
import { useProfileStore } from '@/stores/profileStore';

function AdvancedComponent() {
  const {
    profile,
    updateProfile,
    setLoading,
    setError
  } = useProfileStore();

  // Direct store manipulation
  const handleLocalUpdate = () => {
    updateProfile({ height: 180 });
  };

  return (
    <View>
      <Text>Height: {profile?.height} cm</Text>
      <Button onPress={handleLocalUpdate} title="Update Locally" />
    </View>
  );
}
```

## Store Structure

### State

```typescript
interface ProfileStore {
  profile: ProfileType | null; // User profile data
  isLoading: boolean; // Loading state
  error: string | null; // Error message
}
```

### Actions

```typescript
// Set complete profile
setProfile: (profile: ProfileType | null) => void;

// Update partial profile data
updateProfile: (updates: Partial<ProfileType>) => void;

// Clear all profile data
clearProfile: () => void;

// Set loading state
setLoading: (loading: boolean) => void;

// Set error message
setError: (error: string | null) => void;
```

### Computed Values

```typescript
// Check if profile has all required fields
isProfileComplete: () => boolean;

// Get formatted display name
getDisplayName: () => string;

// Calculate age from birth date
getAge: () => number | null;
```

## Integration with Supabase

The `SupabaseProvider` automatically syncs the store with Supabase:

```typescript
// In your app root
import { SupabaseProvider } from '@/providers/SupabaseProvider';

function App() {
  return (
    <SupabaseProvider>
      {/* Your app components */}
    </SupabaseProvider>
  );
}
```

### Available Operations

```typescript
const { getProfile, createProfile, updateProfile } = useSupabase();

// Load profile from database
await getProfile();

// Create new profile
await createProfile(profileData);

// Update existing profile
await updateProfile({ weight: 75 });
```

## Persistence

The store automatically persists profile data to AsyncStorage. Only the `profile` field is persisted, not loading states or errors.

### Storage Key

- **Key**: `profile-store`
- **Storage**: AsyncStorage
- **Serialization**: JSON

## Best Practices

### 1. Use Appropriate Selectors

```typescript
// ✅ Good - Only subscribes to specific data
const displayName = useDisplayName();

// ❌ Avoid - Subscribes to entire store
const { profile } = useProfileStore();
const displayName = profile ? `${profile.first_name} ${profile.last_name}` : 'User';
```

### 2. Handle Loading and Error States

```typescript
function ProfileComponent() {
  const { profile, isLoading, error } = useProfileManager();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!profile) return <EmptyState />;

  return <ProfileDisplay profile={profile} />;
}
```

### 3. Use Optimistic Updates

```typescript
const { updateProfile } = useProfileManager();

// This will update the UI immediately and sync with server
await updateProfile({ weight: newWeight });
```

### 4. Clear Data on Logout

```typescript
const { logout } = useProfileManager();

const handleLogout = () => {
  logout(); // Clears profile store
  // Handle other logout logic
};
```

## Type Safety

All store operations are fully typed using the `ProfileType` interface:

```typescript
export type ProfileType = {
  first_name?: string;
  last_name?: string;
  image_url?: string;
  email?: string;
  birth_date?: Date;
  gender?: GenderType;
  height?: number;
  weight?: number;
  body?: BodyType;
  activity?: ActivityType;
  goal?: GoalType;
};
```

## Migration from Context

If you're migrating from the existing `ProfileSetupContext`:

### Before (Context)

```typescript
const { profileData, updateProfileData } = useProfileSetup();
```

### After (Zustand)

```typescript
const { profile, updateProfile } = useProfileManager();
```

The API is very similar, making migration straightforward.

## Debugging

To debug store state, you can use the Zustand devtools:

```typescript
// In development, you can inspect store state
console.log('Current profile:', useProfileStore.getState().profile);
```

## Examples

See the `ProfileDisplay` component in `src/components/profile/ProfileDisplay.tsx` for a complete example of using the store in a real component.
