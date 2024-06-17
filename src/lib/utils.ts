import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPaletteName = (name: string) => {
  return name
    .replace(/_/g, ' ') // Replace underscores with spaces
    .split(' ') // Split the string into an array of words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(' '); // Join the array back into a single string
}

export const LOWER_OPACITY = .3

