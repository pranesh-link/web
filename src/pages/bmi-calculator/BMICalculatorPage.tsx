import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../../store/app/context";
import { FormFieldValueType, FormHeader } from "react-profile-component";
import { BMICalculatorFormData } from "../../store/common/types";
import {
  DEFAULT_BMI_CALCULATOR_FORM_DATA,
  DEFAULT_BMI_CALCULATOR_FORM_ERROR,
  PAGE_TITLES,
} from "../../common/constants";
import {
  getWeightSuggestConfig,
  getBMI,
  getCurrentBMIRange,
  validateBMIFields,
  validateBMIFieldInputForRanges,
} from "./Utils";
import { BMICalculatorForm } from "./Elements";
import Fields from "../../components/bmi-calculator/Fields";
import BMIResult from "../../components/bmi-calculator/BMIResult";

const BMICalculatorPage = () => {
  const {
    data: {
      bmiCalculatorForm: {
        label,
        header,
        fields,
        bmiRanges,
        permissibleHeights,
        permissibleWeights,
      },
      currentDevice: { isMobile },
    },
  } = useContext(AppContext);

  const [formData, setFormData] = useState<BMICalculatorFormData>(
    DEFAULT_BMI_CALCULATOR_FORM_DATA
  );
  const [fieldError, setFieldError] = useState(
    DEFAULT_BMI_CALCULATOR_FORM_ERROR
  );

  useEffect(() => {
    document.title = PAGE_TITLES.bmiCalculator;
  }, []);

  const showForm = useMemo(() => setTimeout(() => header, 1000), [header]);

  const hasValidFieldValues = useMemo(
    () => Object.values(fieldError).every((item) => item === ""),
    [fieldError]
  );

  const bmi = useMemo(
    () => (hasValidFieldValues ? getBMI(formData) : 0),
    [formData, hasValidFieldValues]
  );

  const currentBMIRange = useMemo(
    () => getCurrentBMIRange(bmiRanges, bmi),
    [bmi, bmiRanges]
  );

  const isValidHt = useMemo(
    () =>
      formData.heightInCm
        ? validateBMIFieldInputForRanges(
            formData.heightInCm,
            permissibleHeights
          )
        : true,
    [formData.heightInCm, permissibleHeights]
  );

  const isValidWt = useMemo(
    () =>
      formData.weightInKg
        ? validateBMIFieldInputForRanges(
            formData.weightInKg,
            permissibleWeights
          )
        : true,
    [formData.weightInKg, permissibleWeights]
  );

  const isValidBMI = useMemo(
    () => Boolean(isValidHt && isValidWt && !isNaN(bmi) && bmi),
    [bmi, isValidHt, isValidWt]
  );

  const healthyBMIRange = useMemo(
    () => bmiRanges.find((item) => item.isHealthyRange) || bmiRanges[0],
    [bmiRanges]
  );

  const isCurrentBMIHealthy = useMemo(
    () =>
      bmi <= (healthyBMIRange.max || 100) && bmi >= (healthyBMIRange.min || 0),
    [healthyBMIRange, bmi]
  );

  const weightSuggestConfig = useMemo(
    () =>
      getWeightSuggestConfig(
        label,
        formData,
        bmi,
        healthyBMIRange,
        isCurrentBMIHealthy
      ),
    [bmi, formData, healthyBMIRange, label, isCurrentBMIHealthy]
  );

  const updateInput = useCallback(
    (fieldValue: FormFieldValueType, field: string) => {
      setFormData({ ...formData, [field]: fieldValue });
    },
    [formData]
  );

  const resetForm = useCallback(() => {
    setFormData(DEFAULT_BMI_CALCULATOR_FORM_DATA);
  }, []);

  const handleValidation = useCallback(
    (value: FormFieldValueType, field: string) => {
      const currentFieldConfig = fields.find((item) => item.id === field);
      setFieldError({
        ...fieldError,
        [field]: validateBMIFields(value, currentFieldConfig),
      });
    },
    [fieldError, fields]
  );
  return showForm ? (
    <BMICalculatorForm isMobile={isMobile}>
      <FormHeader>{header}</FormHeader>
      <Fields
        fieldError={fieldError}
        formData={formData}
        isValidHt={isValidHt}
        isValidWt={isValidWt}
        handleValidation={handleValidation}
        updateInput={updateInput}
        resetForm={resetForm}
      />
      {hasValidFieldValues && isValidBMI && (
        <BMIResult
          bmi={bmi}
          currentBMIRange={currentBMIRange}
          weightSuggestConfig={weightSuggestConfig}
          isValidBMI={isValidBMI}
        />
      )}
    </BMICalculatorForm>
  ) : null;
};

export default BMICalculatorPage;
