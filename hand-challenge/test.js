const translate = require("./main.js").translate;
const createFistLoopStartAndCloseIndex =
  require("./main.js").createFistLoopStartAndCloseIndex;

describe("hand language translator", () => {
  describe("createFistLoopStartAndCloseIndex", () => {
    it("creates an index of fist loops with openings and closures", () => {
      const arr = Array.from(
        "👇🤜👇👇👇👇👇👇👇👉👆👈🤛👉👇👊👇🤜👇👉👆👆👆👆👆👈🤛👉👆👆👊👆👆👆👆👆👆👆👊👊👆👆👆👊"
      );
      expect(createFistLoopStartAndCloseIndex(arr)).toEqual({
        "🤜": {
          1: 12,
          17: 26,
        },
        "🤛": {
          12: 1,
          26: 17,
        },
      });
    });
    it("throws an error when there is an unclosed fist loop", () => {
      const arr = Array.from("👇🤜👇👇🤛🤜");
      try {
        createFistLoopStartAndCloseIndex(arr);
      } catch (e) {
        expect(e.message).toBe("An unclosed fist loop was spotted");
      }
    });
    it("creates an index of fist loops with openings and closures even when there is nested fistloops", () => {
      const arr = Array.from(
        "👉👆👆👆👆👆👆👆👆🤜👇👈👆👆👆👆👆👆👆👆👆👉🤛👈👊👉👉👆👉👇🤜👆🤛👆👆👉👆👆👉👆👆👆🤜👉🤜👇👉👆👆👆👈👈👆👆👆👉🤛👈👈🤛👉👇👇👇👇👇👊👉👇👉👆👆👆👊👊👆👆👆👊👉👇👊👈👈👆🤜👉🤜👆👉👆🤛👉👉🤛👈👇👇👇👇👇👇👇👇👇👇👇👇👇👇👊👉👉👊👆👆👆👊👇👇👇👇👇👇👊👇👇👇👇👇👇👇👇👊👉👆👊👉👆👊"
      );
      expect(createFistLoopStartAndCloseIndex(arr)).toEqual({
        "🤜": {
          30: 32,
          42: 59,
          44: 56,
          85: 94,
          87: 91,
          9: 22,
        },
        "🤛": {
          22: 9,
          32: 30,
          56: 44,
          59: 42,
          91: 87,
          94: 85,
        },
      });
    });
  });

  describe("translate", () => {
    it("translates 'Hello' from given emoji string", () => {
      const string =
        "👇🤜👇👇👇👇👇👇👇👉👆👈🤛👉👇👊👇🤜👇👉👆👆👆👆👆👈🤛👉👆👆👊👆👆👆👆👆👆👆👊👊👆👆👆👊";

      expect(translate(string)).toBe("Hello");
    });
    it("translates 'Hello World!' from given emoji string", () => {
      const string =
        "👉👆👆👆👆👆👆👆👆🤜👇👈👆👆👆👆👆👆👆👆👆👉🤛👈👊👉👉👆👉👇🤜👆🤛👆👆👉👆👆👉👆👆👆🤜👉🤜👇👉👆👆👆👈👈👆👆👆👉🤛👈👈🤛👉👇👇👇👇👇👊👉👇👉👆👆👆👊👊👆👆👆👊👉👇👊👈👈👆🤜👉🤜👆👉👆🤛👉👉🤛👈👇👇👇👇👇👇👇👇👇👇👇👇👇👇👊👉👉👊👆👆👆👊👇👇👇👇👇👇👊👇👇👇👇👇👇👇👇👊👉👆👊👉👆👊";

      expect(translate(string)).toBe("Hello World!\n");
    });
  });
});
