import {
  FormFieldValueType,
  IFormField,
  validateRegex,
} from "react-profile-component";
import { round } from "../../common/Utils";
import {
  BMICalculatorFormData,
  IBMIRange,
  IMinMax,
} from "../../store/common/types";

export const getCurrentBMIRange = (bmiRanges: IBMIRange[], bmi: number) => {
  let bmiRange = bmiRanges[0];
  for (let i = 0; i < bmiRanges.length; i++) {
    const { min, max } = bmiRanges[i];
    if (!min && max && bmi <= max) {
      bmiRange = bmiRanges[i];
      break;
    } else if (min && !max && bmi >= min) {
      bmiRange = bmiRanges[i];
      break;
    } else if (min && max) {
      if (bmi >= min && bmi <= max) {
        bmiRange = bmiRanges[i];
        break;
      }
    }
  }
  return bmiRange;
};

export const getBMI = (formData: BMICalculatorFormData) => {
  const height = round(Number(formData.heightInCm) / 100, 2);
  const weight = Number(formData.weightInKg);
  return round(weight / Math.pow(height, 2), 1);
};

export const getBMIRangePercentForGauge = (
  currentBMIRange: IBMIRange,
  bmi: number
) => {
  const { prefixedPercentile, min = 0, max = 100 } = currentBMIRange;
  const percentByBMIFraction = (20 / (max - min)) * (bmi - min);
  const percentage = Math.round(prefixedPercentile + percentByBMIFraction);
  return percentage / 100;
};

export const validateBMIFields = (
  value: FormFieldValueType,
  currentFieldConfig?: IFormField
) => {
  let isRegexValid = true;
  if (currentFieldConfig?.regex) {
    isRegexValid = validateRegex(
      value as number,
      currentFieldConfig?.regex,
      true
    );
  }
  return isRegexValid ? "" : "regexError";
};

const getIdealWeights = (
  formData: BMICalculatorFormData,
  healthyBMIRange: IBMIRange,
  bmi: number
) => {
  const height = round(Number(formData.heightInCm) / 100, 2);
  const { min = 0, max = 0 } = healthyBMIRange;
  let nearestWeight = 0,
    lowestWeight = 0,
    highestWeight = 0;
  lowestWeight = round(min * Math.pow(height, 2), 1);
  highestWeight = round(max * Math.pow(height, 2), 1);
  if (bmi < min) {
    nearestWeight = lowestWeight;
  } else if (bmi > max) {
    nearestWeight = highestWeight;
  }
  return {
    nearestWeight,
    lowestWeight,
    highestWeight,
  };
};

export const getWeightSuggestConfig = (
  label: Record<string, string>,
  formData: BMICalculatorFormData,
  bmi: number,
  healthyBMIRange: IBMIRange,
  isCurrentBMIHealthy: boolean
) => {
  if (bmi) {
    const {
      nearestWeight: nearestIdealWeight,
      highestWeight,
      lowestWeight,
    } = getIdealWeights(formData, healthyBMIRange, bmi);
    const diffToIdealWeight = round(
      Number(formData.weightInKg) - nearestIdealWeight,
      2
    );
    const weightDirection = isCurrentBMIHealthy
      ? label.ideal
      : diffToIdealWeight < 0
      ? label.increase
      : label.reduce;
    return {
      weightDirection,
      idealWeightRanges: {
        min: lowestWeight,
        max: highestWeight,
      },
      diffToIdealWeight,
    };
  } else {
    return {
      weightDirection: label.reduce,
      idealWeightRanges: { min: 0, max: 100 },
      diffToIdealWeight: 0,
    };
  }
};

export const validateBMIFieldInputForRanges = (
  value: string,
  permissibleRanges: IMinMax
) => {
  const formattedValue = Number(value);
  return (
    formattedValue >= permissibleRanges.min &&
    formattedValue <= permissibleRanges.max
  );
};
