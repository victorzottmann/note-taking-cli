// temporary code
const add = (num1, num2) => num1 + num2;

test("add takes two numbers and returns a sum", () => {
  const result = add(1, 2);
  expect(result).toBe(3);
});
