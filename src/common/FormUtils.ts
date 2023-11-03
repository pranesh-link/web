export const validateLength = (value: string | number) => `${value}`.length > 0;

export const validateRegex = (
  value: string | number,
  regex: string,
  isValid: boolean,
) => (regex ? new RegExp(regex).test(`${value}`) : isValid);
