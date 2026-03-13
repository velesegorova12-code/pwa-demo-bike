import type { StateCreator } from 'zustand'
import { create } from 'zustand'

export function createStore<T extends object>(creator: StateCreator<T>) {
  return create<T>()(creator)
}

