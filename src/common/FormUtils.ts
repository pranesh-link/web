export const validateLength = (value: string | number) => `${value}`.length > 0;

export const validateRegex = (
  value: string | number,
  regex: string,
  isValid: boolean,
) => {
  console.log(
    "validateRegex",
    new RegExp(regex),
    regex,
    new RegExp(regex).test(`${value}`),
  );
  return regex ? new RegExp(regex).test(`${value}`) : isValid;
};
