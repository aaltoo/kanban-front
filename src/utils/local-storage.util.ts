export const getLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const setLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
  console.log("setLocalStorage", key, value);
};

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};