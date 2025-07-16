const HISTORY_KEY = 'history';

export function getPrevPathname(): string {
  const storedHistory = sessionStorage.getItem(HISTORY_KEY);
  const parsedHistory: string[] = storedHistory ? JSON.parse(storedHistory) : [];

  if (parsedHistory.length > 1) {
    parsedHistory.pop();
    const previousPage = parsedHistory.pop();

    sessionStorage.setItem(HISTORY_KEY, JSON.stringify(parsedHistory));
    return previousPage || '/';
  }

  return '/';
}
