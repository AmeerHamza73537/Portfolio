import { useContext } from "react";
import { LenisContext } from "./lenisContext.js";

export function useLenisContext() {
  return useContext(LenisContext);
}
