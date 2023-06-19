import React, { FC } from "react";
import Select, { ActionMeta, OnChangeValue, SingleValue } from "react-select";
import makeAnimated from "react-select/animated";

export type OptionType = {
  label: string;
  value: string;
};

export type SingleValueType = SingleValue<OptionType>;
export type ActionMetaType = ActionMeta<OptionType>;

interface CustomSelectProps {
  instanceId: string;
  options: Array<OptionType>;
  callback: (
    selectedOption: SingleValueType,
    actionMeta?: ActionMeta<OptionType>
  ) => void;
}

const CustomSelect: FC<CustomSelectProps> = ({
  instanceId,
  options,
  callback,
}) => {
  const handleChange = (
    selectedOption: SingleValueType,
    actionMeta: ActionMetaType
  ) => {
    callback(selectedOption, actionMeta);
  };

  return (
    <Select
      instanceId={instanceId}
      components={makeAnimated()}
      options={options}
      isClearable={true}
      onChange={(value, actionMeta) =>
        handleChange(value as SingleValueType, actionMeta as ActionMetaType)
      }
    />
  );
};

export default CustomSelect;
