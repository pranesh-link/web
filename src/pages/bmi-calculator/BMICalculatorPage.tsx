import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../../store/app/context";
import {
  FormField,
  FormFieldValueType,
  FormHeader,
  Elements,
  ResetIcon,
} from "react-profile-component";
import {
  BMICalculatorFields,
  BMICalculatorFormData,
} from "../../store/common/types";
import GaugeChart from "react-gauge-chart";
import classNames from "classnames";
import {
  DEFAULT_BMI_CALCULATOR_FORM_DATA,
  DEFAULT_BMI_CALCULATOR_FORM_ERROR,
  PAGE_TITLES,
} from "../../common/constants";
import {
  getWeightSuggestConfig,
  getBMI,
  getBMIRangePercentForGauge,
  getCurrentBMIRange,
  validateBMIFields,
} from "./Utils";
import {
  BMICalculatorForm,
  BMIChart,
  BMIRangeInfo,
  FieldsWrap,
} from "./Elements";
import { findAndReplace } from "../../common/Utils";

const { FlexBox, ActionBtn } = Elements;

const BMICalculatorPage = () => {
  const {
    data: {
      bmiCalculatorForm: {
        label,
        showErrorOnMobileBrowsers,
        hideRemainingCharacters,
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

  const isValidHt = useMemo(() => {
    if (formData.heightInCm) {
      const height = Number(formData.heightInCm);
      return (
        height >= permissibleHeights.min && height <= permissibleHeights.max
      );
    } else {
      return true;
    }
  }, [formData.heightInCm, permissibleHeights.max, permissibleHeights.min]);

  const isValidWt = useMemo(() => {
    if (formData.weightInKg) {
      const weight = Number(formData.weightInKg);
      return (
        weight >= permissibleWeights.min && weight <= permissibleWeights.max
      );
    } else {
      return true;
    }
  }, [formData.weightInKg, permissibleWeights.max, permissibleWeights.min]);

  const isValidBMI = useMemo(
    () => Boolean(isValidHt && isValidWt && !isNaN(bmi) && bmi),
    [bmi, isValidHt, isValidWt]
  );

  const hasFieldValues = useMemo(
    () => Object.values(formData).some((item) => item !== ""),
    [formData]
  );

  const bmiRangePercent = useMemo(
    () =>
      currentBMIRange ? getBMIRangePercentForGauge(currentBMIRange, bmi) : 0,
    [currentBMIRange, bmi]
  );

  const healthyBMIRange = useMemo(
    () => bmiRanges.find((item) => item.isHealthyRange) || bmiRanges[0],
    [bmiRanges]
  );

  const isCurrentBMIHealthy = useMemo(() => {
    const { max = 100, min = 0 } = healthyBMIRange;
    return bmi <= max && bmi >= min;
  }, [healthyBMIRange, bmi]);

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

  const formattedIdealWeightRange = useMemo(() => {
    const { min, max } = weightSuggestConfig.idealWeightRanges;
    return isValidBMI ? findAndReplace(label.idealWeightRange, [min, max]) : "";
  }, [
    isValidBMI,
    label.idealWeightRange,
    weightSuggestConfig.idealWeightRanges,
  ]);

  const formattedWeightSuggestLabel = useMemo(() => {
    const { weightDirection, diffToIdealWeight } = weightSuggestConfig;
    if (isValidBMI) {
      return weightDirection === label.ideal
        ? label.healthyBMI
        : findAndReplace(label.weightSuggest, [
            weightDirection,
            Math.abs(diffToIdealWeight),
          ]);
    } else {
      return "";
    }
  }, [
    isValidBMI,
    label.healthyBMI,
    label.ideal,
    label.weightSuggest,
    weightSuggestConfig,
  ]);

  const formattedInvalidValueError = useMemo(() => {
    const { min: minHeight, max: maxHeight } = permissibleHeights;
    const { min: minWeight, max: maxWeight } = permissibleWeights;
    const heightRange = `${minHeight} - ${maxHeight}`;
    const weightRange = `${minWeight} - ${maxWeight}`;
    return findAndReplace(label.invalidHeightWeightError, [
      heightRange,
      weightRange,
    ]);
  }, [label.invalidHeightWeightError, permissibleHeights, permissibleWeights]);

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
  return header ? (
    <BMICalculatorForm isMobile={isMobile}>
      <FormHeader>{header}</FormHeader>
      <FieldsWrap direction="column">
        {fields.map((item) => {
          const fieldName = item.name as BMICalculatorFields;
          return (
            <FormField
              key={item.id}
              isFormSubmit={false}
              field={item}
              autoFocus={false}
              defaultMaxLength={3}
              fieldError={fieldError[fieldName]}
              showErrorOnMobileBrowsers={showErrorOnMobileBrowsers}
              hideRemainingCharacters={hideRemainingCharacters}
              fieldValue={formData[fieldName]}
              validateField={handleValidation}
              updateInput={updateInput}
            />
          );
        })}
        {(!isValidHt || !isValidWt) && (
          <p
            className="invalid-height-weight"
            dangerouslySetInnerHTML={{ __html: formattedInvalidValueError }}
          />
        )}

        <ActionBtn
          className={classNames("reset-button", { hidden: !hasFieldValues })}
          aria-label={label.reset}
          title={label.reset}
          onClick={(e) => {
            e.preventDefault();
            resetForm();
          }}
        >
          <ResetIcon height={24} width={24} strokeColor="#ff0000" />
        </ActionBtn>
      </FieldsWrap>

      {hasValidFieldValues && isValidBMI && (
        <>
          <p
            className={classNames(
              "weight-suggestion",
              weightSuggestConfig.weightDirection
            )}
            dangerouslySetInnerHTML={{
              __html: formattedWeightSuggestLabel,
            }}
          />
          <p
            className="ideal-weight-range"
            dangerouslySetInnerHTML={{
              __html: formattedIdealWeightRange,
            }}
          />
          <FlexBox
            direction={isMobile ? "column" : "row"}
            alignItems="center"
            className="bmi-result-wrap"
          >
            <GaugeChart
              id="gauge-chart5"
              nrOfLevels={100}
              arcsLength={[0.2, 0.2, 0.2, 0.2, 0.2]}
              colors={["#3498db", "#3f9c35", "#ffba00", "#ee4b2b", "#ff0000"]}
              percent={bmiRangePercent}
              arcWidth={0.3}
              textColor="#000"
              needleColor="rgba(128,128,128,0.4)"
              needleBaseColor="#ccc"
              animDelay={0}
              formatTextValue={() => `${bmi}`}
              arcPadding={0}
              cornerRadius={0}
              className="range-gauge"
              style={{ maxHeight: "250px", maxWidth: "500px" }}
            />

            <BMIChart gridTemplateRows="1fr 1fr 1fr">
              {bmiRanges.map((item) => {
                const { min, max, label, color, id } = item;
                return (
                  <BMIRangeInfo
                    key={id}
                    colorCode={color}
                    gridTemplateColumns="0.7fr 1fr 2fr"
                    justifyItems="center"
                    className={classNames({
                      "is-current-bmi-range": id === currentBMIRange.id,
                    })}
                  >
                    <span className="color" />
                    <span className="range">
                      {min && max && (
                        <>
                          {min} - {max}
                        </>
                      )}
                      {min && !max && <>&#8805; {min}</>}
                      {!min && max && <>&#8804; {max}</>}
                    </span>
                    <label>{label}</label>
                  </BMIRangeInfo>
                );
              })}
            </BMIChart>
          </FlexBox>
        </>
      )}
    </BMICalculatorForm>
  ) : null;
};

export default BMICalculatorPage;
