import styles from "./Select.module.scss"
import React from "react"
import { Select } from "antd"

type SelectProps = {
    placeholder: string,
    options: Option[]
}

type Option = {
    value: string,
    label: string
}

const SelectCustom: React.FC<SelectProps> = ({placeholder, options}) => {
    const onChange = (value: string) => {
        console.log(`selected ${value}`);
      };
      
      const onSearch = (value: string) => {
        console.log('search:', value);
      };
    return (
        <Select
        showSearch
        placeholder={placeholder}
        optionFilterProp="label"
        onChange={onChange}
        onSearch={onSearch}
        style={{width: "100%"}}
        options={options}></Select>
    )
}

export default SelectCustom