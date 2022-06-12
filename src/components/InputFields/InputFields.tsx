import React from 'react';
import { Select, DatePicker } from 'antd';
import 'antd/dist/antd.min.css';
import s from './InputFields.module.css';

const { Option } = Select;
const { RangePicker }: any = DatePicker;

type InputFieldsProps = {
    options?: string[];
    placeholder: string;
};

const InputFields: React.FC<InputFieldsProps> = ({ options, placeholder }) => {
    const dateFormatList = 'DD.MM.YYYY';

    return (
        <div className={s.container}>
            {options ? (
                <Select
                    allowClear
                    className={s.list}
                    placeholder={placeholder}
                    style={{ width: 200 }}
                >
                    {options.map((option: string, id: number) => (
                        <Option key={id} value={option}>
                            {option}
                        </Option>
                    ))}
                </Select>
            ) : null}
            <RangePicker
                className={s.calendar}
                format={dateFormatList}
                style={{ width: 330 }}
            />
        </div>
    );
};

export default InputFields;
