import { useCallback, useSyncExternalStore } from 'react'

/**
 * Minimal hash router. Routes look like `#/recipe/negroni`.
 * Hash URLs never hit the server, so refreshing or sharing a deep link
 * works on GitHub Pages without any 404.html redirect tricks.
 */
function subscribe(callback: () => void) {
  window.addEventListener('hashchange', callback)
  return () => window.removeEventListener('hashchange', callback)
}

function getPath() {
  return window.location.hash.replace(/^#/, '') || '/'
}

export function useHashRoute() {
  const path = useSyncExternalStore(subscribe, getPath, () => '/')

  /** `replace` swaps the current history entry instead of adding one. */
  const navigate = useCallback((to: string, options?: { replace?: boolean }) => {
    if (getPath() === to) return
    if (options?.replace) window.location.replace(`#${to}`)
    else window.location.hash = to
  }, [])

  const recipeMatch = path.match(/^\/recipe\/([\w-]+)$/)
  return { path, recipeId: recipeMatch?.[1] ?? null, navigate }
}
