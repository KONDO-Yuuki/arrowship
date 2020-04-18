import { arrowShip } from ".";

const callCounter = jest.fn();
const notIdempotencyFunc = async (result: string) => {
  callCounter(result);
  return {
    result: result
  };
};

const notCalledFunc = async (result: string) => {
  callCounter(result);
  return {
    result
  };
};
test("arrowship", async () => {
  const saveResult = await arrowShip(notIdempotencyFunc, ["save"], {
    mode: "save",
    funcName: "test"
  });
  const useResult = await arrowShip(notCalledFunc, ["use"], {
    mode: "use",
    funcName: "test"
  });
  const noopResult = await arrowShip(notIdempotencyFunc, ["prod", 3], {
    mode: undefined,
    funcName: "test"
  });

  expect(saveResult).toEqual({
    result: "save"
  });
  expect(useResult).toEqual({
    result: "save"
  });
  expect(noopResult).toEqual({
    result: "prod"
  });
  expect(callCounter.mock.calls).toEqual([["save"], ["prod"]]);
});
