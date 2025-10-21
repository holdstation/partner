import { useCallback } from "react";
import { useSearchParams } from "react-router";

export function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  // convert URLSearchParams -> object
  const getAll = () => {
    return Object.fromEntries(searchParams.entries());
  };

  const get = useCallback(
    (key: string) => {
      return searchParams.get(key);
    },
    [searchParams],
  );

  const set = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set(key, value);
    setSearchParams(newParams);
  };

  const setMulti = (obj: Record<string, string | undefined>) => {
    const newParams = new URLSearchParams(searchParams);

    for (const [k, v] of Object.entries(obj)) {
      if (v !== undefined && v !== "") newParams.set(k, v);
    }
    setSearchParams(newParams);
  };

  const remove = (key: string) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.delete(key);
    setSearchParams(newParams);
  };

  const removeMulti = (keys: string[]) => {
    const newParams = new URLSearchParams(searchParams);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const replaceAll = (obj: Record<string, string | undefined>) => {
    const newParams = new URLSearchParams();

    for (const [k, v] of Object.entries(obj)) {
      if (v !== undefined && v !== "") newParams.set(k, v);
    }
    setSearchParams(newParams);
  };

  return { getAll, get, set, setMulti, removeMulti, remove, replaceAll };
}
