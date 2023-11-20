import classNames from "classnames";
import { TextInput } from "../common/Elements";
import { IFormField } from "../../../store/profile/types";

interface ITextFieldProps {
  fieldValid?: boolean;
  autoFocus: boolean;
  field: IFormField;
  isFormSubmit: boolean;
  fieldValue: string | Record<string, boolean>;
  handleTextChange: (value: string) => void;
}
export const TextField = (props: ITextFieldProps) => {
  const {
    autoFocus,
    field,
    fieldValid,
    fieldValue,
    handleTextChange,
    isFormSubmit,
  } = props;

  return (
    <TextInput
      className={classNames({
        error: fieldValid === false,
      })}
      autoFocus={autoFocus}
      placeholder={field.placeholder}
      disabled={isFormSubmit}
      value={fieldValue as string}
      maxLength={field.maxLength}
      type={field.subType ? field.subType : "text"}
      name={field.name}
      onChange={e => handleTextChange(e.target.value)}
    />
  );
};
