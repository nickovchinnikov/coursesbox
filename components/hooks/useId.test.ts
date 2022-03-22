import { renderHook } from "@testing-library/react-hooks";

import { useId } from "./useId";

describe("useId check", () => {
  it("Id check", () => {
    const { result } = renderHook(useId);
    expect(result.current).toMatch(/(\w|\d){13}/);
  });
  it("Generate unique id per render", () => {
    const { result: res1 } = renderHook(useId);
    const { result: res2 } = renderHook(useId);

    expect(res1.current).not.toBe(res2.current);
  });
});
