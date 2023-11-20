import classNames from "classnames";
import { isStringBooleanRecord } from "../../../common/Utils";
import { IFormField } from "../../../store/profile/types";
import {
  CheckboxInput,
  CheckboxInputLabel,
  CheckboxInputWrap,
  CheckboxTick,
} from "../common/Elements";
import TickIcon from "../../../assets/white-tick-icon.svg";

interface ICheckboxFieldProps {
  field: IFormField;
  fieldValue: string | Record<string, boolean>;
  handleCheckboxChange: (id: string) => void;
}

export const CheckboxField = (props: ICheckboxFieldProps) => {
  const { field, fieldValue, handleCheckboxChange } = props;
  return (
    <>
      {(field?.values || []).map(item => {
        const isChecked = isStringBooleanRecord(fieldValue)
          ? fieldValue[item.value]
          : false;
        return (
          <CheckboxInputWrap
            alignItems="center"
            key={item.value}
            id={item.value}
          >
            <CheckboxInput
              id={item.value}
              type="checkbox"
              onChange={() => {
                handleCheckboxChange(item.value);
              }}
              checked={isChecked}
            />
            {isChecked && (
              <CheckboxTick
                id={item.value}
                src={TickIcon}
                onClick={() => {
                  handleCheckboxChange(item.value);
                }}
              />
            )}
            <CheckboxInputLabel className={classNames({ checked: isChecked })}>
              {item.label}
            </CheckboxInputLabel>
          </CheckboxInputWrap>
        );
      })}
    </>
  );
};
