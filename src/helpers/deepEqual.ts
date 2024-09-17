export const deepEqual = (a: unknown, b: unknown): boolean => {
  // Check for strict equality
  if (a === b) return true;

  // Check for type mismatch
  if (typeof a !== typeof b) return false;

  // Check if both values are non-null objects
  if (a && typeof a === 'object' && b && typeof b === 'object') {
    // Handle array comparison
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!deepEqual(a[i], b[i])) return false;
      }
      return true;
    }

    // Handle object comparison
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      // Ensure both objects have the same keys and recursively check their values
      if (
        !keysB.includes(key) ||
        !deepEqual((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])
      ) {
        return false;
      }
    }

    return true;
  }

  // If none of the above conditions matched, the values are not equal
  return false;
};
