import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../store/app/context";
import {
  Form,
  FormField,
  FormFieldValueType,
  FormHeader,
  validateRegex,
  Elements,
  ResetIcon,
} from "react-profile-component";
import styled from "styled-components";
import {
  BMICalculatorFields,
  BMICalculatorFormData,
} from "../store/common/types";
import GaugeChart from "react-gauge-chart";
import classNames from "classnames";
import {
  DEFAULT_BMI_CALCULATOR_FORM_DATA,
  PAGE_TITLES,
} from "../common/constants";

const { Grid, FlexBox, ActionBtn } = Elements;

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
      },
      currentDevice: { isMobile },
    },
  } = useContext(AppContext);

  const [formData, setFormData] = useState<BMICalculatorFormData>(
    DEFAULT_BMI_CALCULATOR_FORM_DATA
  );
  const [fieldError, setFieldError] = useState({
    heightInCm: "",
    weightInKg: "",
  });

  useEffect(() => {
    document.title = PAGE_TITLES.bmiCalculator;
  }, []);

  const round = (value: number, precision: number) => {
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  };

  const bmi = useMemo(() => {
    const height = parseInt(formData.heightInCm) / 100;
    const weight = parseInt(formData.weightInKg);
    return round(weight / Math.pow(height, 2), 1);
  }, [formData]);

  const currentBMIRange = useMemo(() => {
    let bmiRange = bmiRanges[0];
    for (let i = 0; i < bmiRanges.length; i++) {
      const min = bmiRanges[i].min;
      const max = bmiRanges[i].max;
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
  }, [bmi, bmiRanges]);

  const updateInput = (fieldValue: FormFieldValueType, field: string) => {
    setFormData({ ...formData, [field]: fieldValue });
  };

  const resetForm = useCallback(() => {
    setFormData(DEFAULT_BMI_CALCULATOR_FORM_DATA);
  }, []);

  const isValidBMI = useMemo(() => !isNaN(bmi) && bmi, [bmi]);

  const hasFieldValues = useMemo(
    () => Object.values(formData).some((item) => item !== ""),
    [formData]
  );

  const hasValidFieldValues = useMemo(() => {
    return Object.values(fieldError).some((item) => item === "");
  }, [fieldError]);

  const bmiRangePercent = useMemo(() => {
    if (currentBMIRange) {
      const { prefixedPercentile, min = 0, max = 100 } = currentBMIRange;
      const fractionByRange = 20 / (max - min);
      const percentByBMIFraction = fractionByRange * (bmi - min);
      const percentage = Math.round(prefixedPercentile + percentByBMIFraction);
      return percentage / 100;
    } else {
      return 0;
    }
  }, [currentBMIRange, bmi]);

  const handleValidation = (value: FormFieldValueType, field: string) => {
    const currentFieldConfig = fields.find((item) => item.id === field);
    let isRegexValid = true;
    if (currentFieldConfig?.regex) {
      isRegexValid = validateRegex(
        value as number,
        currentFieldConfig?.regex,
        true
      );
    }
    setFieldError({ ...fieldError, [field]: isRegexValid ? "" : "regexError" });
  };

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
      )}
    </BMICalculatorForm>
  ) : null;
};

const BMICalculatorForm = styled(Form)`
  background: #f0f0f0;
  margin: 30px 15px;
  height: calc(100vh - 100px);
  input {
    border: 2px solid rgba(62, 62, 62, 0.45);
    max-width: 200px;
    padding: 5px 10px;
    &:focus {
      border-color: #3498db;
    }
  }
  .text-group {
    text {
      fill: #3e3e3e !important;
      font-weight: 600;
    }
  }
  .bmi-result-wrap {
    margin: 0 auto;
  }
  .reset-button {
    align-self: flex-end;
    &.hidden {
      visibility: hidden;
    }
  }

  @media only screen and (max-width: 992px) {
    input {
      border-width: 1.5px;
    }
  }
`;

const FieldsWrap = styled(FlexBox)`
  @media only screen and (min-width: 992px) {
    max-width: 50%;
    margin: 0 auto;
  }
`;

const BMIRangeInfo = styled(Grid)<{ colorCode: string }>`
  margin-bottom: 5px;
  padding: 10px 0;
  gap: 15px;
  .color {
    width: 30px;
    height: 20px;
    background: ${(props) => props.colorCode};
  }
  .range {
    font-weight: 600;
  }
  label {
    font-weight: bold;
  }
  &.is-current-bmi-range {
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px -1px 0px 1px,
      rgb(48, 71, 1) 0px -1px 0px inset, rgb(63, 156, 53) 0px 2px 12px;
  }
`;
const BMIChart = styled(Grid)`
  margin-top: 30px;
`;

export default BMICalculatorPage;
