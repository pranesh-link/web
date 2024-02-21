import {
  FormField,
  FormFieldValueType,
  Elements,
  ResetIcon,
} from "react-profile-component";
import { FieldsWrap } from "../../pages/bmi-calculator/Elements";
import { BMICalculatorFields } from "../../store/common/types";
import classNames from "classnames";
import { useContext, useMemo } from "react";
import { AppContext } from "../../store/app/context";
import { findAndReplace } from "../../common/Utils";

const { ActionBtn } = Elements;

interface IFieldsProps {
  fieldError: Record<BMICalculatorFields, string>;
  formData: Record<BMICalculatorFields, FormFieldValueType>;
  isValidHt: boolean;
  isValidWt: boolean;
  updateInput: (
    value: FormFieldValueType,
    field: string,
    valueId?: string
  ) => void;
  resetForm: () => void;
  handleValidation: (value: FormFieldValueType, field: string) => void;
}
const Fields = (props: IFieldsProps) => {
  const {
    fieldError,
    formData,
    isValidHt,
    isValidWt,
    resetForm,
    handleValidation,
    updateInput,
  } = props;

  const {
    data: {
      bmiCalculatorForm: {
        label,
        showErrorOnMobileBrowsers,
        hideRemainingCharacters,
        fields,
        permissibleHeights,
        permissibleWeights,
      },
    },
  } = useContext(AppContext);

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

  const hasFieldValues = useMemo(
    () => Object.values(formData).some((item) => item !== ""),
    [formData]
  );

  return (
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
  );
};

export default Fields;
