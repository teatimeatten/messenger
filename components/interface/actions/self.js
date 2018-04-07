export const LOAD_SELF = 'LOAD-SELF';
export function loadSelf(self) {
  return {
    type: LOAD_SELF,
    self,
  };
}