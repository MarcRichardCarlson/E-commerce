import { useEffect, useState } from "react"

// Define a custom React Hook called useLocalStorage
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  // Initialize the state using useState hook
  const [value, setValue] = useState<T>(() => {
    // Try to retrieve the value from local storage based on the provided key
    const jsonValue = localStorage.getItem(key)
    
    // If a value is found in local storage, parse it and use it as the initial value
    if (jsonValue != null) return JSON.parse(jsonValue)

    // If an initial value is provided as a function, execute it to get the initial value
    if (typeof initialValue === "function") {
      return (initialValue as () => T)()
    } else {
      // Otherwise, use the provided initialValue
      return initialValue
    }
  })

  // Use the useEffect hook to listen for changes in the value or key, and update local storage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  // Return the current value and a function to update it as an array
  return [value, setValue] as [typeof value, typeof setValue]
}
