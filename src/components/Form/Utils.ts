import { isEmptyObject } from "../../common/Utils";
import { YES, NO } from "../../common/constants";
import {
  ContactFormFieldData,
  ContactFormData,
  ContactFormFields,
} from "../../store/profile/types";

export const validateLength = (value: string | number) => `${value}`.length > 0;

export const validateRegex = (
  value: string | number,
  regex: string,
  isValid: boolean,
) => (regex ? new RegExp(regex).test(`${value}`) : isValid);

const modifyBoolToYesNo = (data: Record<string, boolean>) => {
  const keys = Object.keys(data);
  const transformedData: Record<string, string | boolean> = {};
  keys.forEach(key => (transformedData[key] = data[key] ? YES : NO));
  return transformedData;
};
const FIELD_TRANSFORM_MAP: Record<string, Function> = {
  boolToYesNo: modifyBoolToYesNo,
};
export const transformField = (
  fieldData: ContactFormFieldData,
  transform: string,
) => {
  const transformFunc = FIELD_TRANSFORM_MAP[transform];
  return transformFunc(fieldData);
};

export const transformMailRequest = (
  formData: ContactFormData,
  fieldsToTransform: { id: string; transform: string }[],
) => {
  const keys = Object.keys(formData);
  keys.forEach(key => {
    const fieldData = formData[key as ContactFormFields];
    let transformedField = fieldData;
    const fieldToTransform =
      fieldsToTransform.find(field => key === field.id) || {};
    if (!isEmptyObject(fieldToTransform)) {
      transformedField = transformField(
        fieldData,
        (fieldToTransform as { id: string; transform: string }).transform,
      );
      formData[key as ContactFormFields] = transformedField;
    }
  });
  return formData;
};
