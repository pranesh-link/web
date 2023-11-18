import { isPossiblePhoneNumber } from "react-phone-number-input";
import {
  isEmptyObject,
  isString,
  isStringBooleanRecord,
} from "../../common/Utils";
import { YES, NO, FIELD_TYPES } from "../../common/constants";
import {
  ContactFormFieldData,
  ContactFormData,
  ContactFormFields,
  IFormField,
  IFormInfo,
  ContactFormValid,
  ContactFormError,
  ILabelValue,
} from "../../store/profile/types";
import CryptoJS from "crypto-js";

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

const handleSpecialValidations = (
  type: string,
  fieldValue: string | Record<string, boolean> | Object,
  isValid: boolean,
) => {
  switch (type) {
    case FIELD_TYPES.MOBILE:
      isValid = isPossiblePhoneNumber(fieldValue as string);
      break;
    case FIELD_TYPES.CHECKBOX:
      isValid = isStringBooleanRecord(fieldValue);
      break;
  }
  return isValid;
};

const getErrorPriority = (
  mandatoryError: boolean,
  regexError: boolean,
  fieldError: boolean,
) => {
  let error = "";
  switch (true) {
    case mandatoryError:
      error = "mandatoryError";
      break;
    case regexError:
      error = "regexError";
      break;
    case fieldError:
      error = "fieldError";
      break;
  }
  return error;
};

export const validateField = (
  form: IFormInfo,
  formData: ContactFormData,
  formError: ContactFormError | null,
  formValid: ContactFormValid | null,
  requiredFields: IFormField[],
  value: string | Record<string, boolean>,
  field: string,
) => {
  let mandatoryError = false,
    regexError = false,
    fieldError = false,
    isValid = false;
  const { regex = "", type } = form.fields.find(
    formField => formField.name === field,
  ) as IFormField;
  let fieldValue = value;
  if (isString(value)) {
    fieldValue = value.trim();

    isValid = validateLength(fieldValue);
    mandatoryError = !validateLength(fieldValue);
    regexError = !validateRegex(fieldValue, regex, isValid);
  }
  fieldError = !handleSpecialValidations(type, fieldValue, isValid);
  isValid = !mandatoryError && !regexError && !fieldError;

  let error = "";
  if (mandatoryError || regexError || fieldError) {
    error = getErrorPriority(mandatoryError, regexError, fieldError);
  }

  const fieldValidity = { ...(formValid || {}), [field]: isValid };
  const currentFormDisabled =
    Object.values(fieldValidity).some(valid => valid === false) ||
    Object.keys(fieldValidity).length !== requiredFields.length;
  return {
    formError: { ...(formError || {}), [field]: error },
    formValid: { ...(formValid || {}), [field]: isValid },
    formDisabled: currentFormDisabled,
  };
};

const { decrypt } = CryptoJS.AES;

export const getDecryptedConfig = (config: string[], formKey: string) =>
  config.map(item => decrypt(item, formKey).toString(CryptoJS.enc.Utf8));

const FIELD_DEFAULT_VALUE_FUNC_MAP = {
  [FIELD_TYPES.TEXT]: () => "",
  [FIELD_TYPES.MOBILE]: () => "",
  [FIELD_TYPES.TEXTAREA]: () => "",
  [FIELD_TYPES.CHECKBOX]: (values: ILabelValue[] = []) => {
    const defaultCheckboxValues: any = {};
    values.forEach(i => {
      defaultCheckboxValues[i.value] = false;
    });
    return defaultCheckboxValues;
  },
};

export const getDefaultContactFormData = (formFields: IFormField[]) => {
  const defaultFormData: any = {};
  formFields.forEach(
    i =>
      (defaultFormData[i.id] = FIELD_DEFAULT_VALUE_FUNC_MAP[i.type](i?.values)),
  );
  return defaultFormData;
};
