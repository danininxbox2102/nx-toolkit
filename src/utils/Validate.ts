export const validateGameId = (input:string) => {
  input = input.toLowerCase()
  input = input.replace(" ", "-");
  return input;
}
