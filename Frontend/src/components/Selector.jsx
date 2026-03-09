import React from 'react'
import Select from 'react-select';

export default function Selector({options,placeholder,onChange}) {
    return (
            <Select
                className="selector"
                options={options}
                placeholder={placeholder}
                isSearchable
                onChange={onChange}
                styles={{
                    control: (base) => ({
                        ...base,
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderRadius: '0.5rem',
                        padding: '0rem',
                        minHeight: 'unset',
                        boxShadow: 'none',
                        '&:hover': {
                            borderColor: 'var(--blue-color)',
                        },
                    }),

                    valueContainer: (base) => ({
                        ...base,
                        padding: '0rem',
                    }),

                    input: (base) => ({
                        ...base,
                        color: 'var(--black)',
                        margin: 0,
                        padding: 0,
                    }),

                    singleValue: (base) => ({
                        ...base,
                        color: 'var--green-color)',
                    }),

                    placeholder: (base) => ({
                        ...base,
                        color: 'var(--light-gray)',
                    }),

                    menu: (base) => ({
                        ...base,
                        backgroundColor: 'var(--white)',
                        borderRadius: '0.5rem',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                        zIndex: 20,
                    }),

                    option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected
                            ? 'var(--blue-color)'
                            : state.isFocused
                                ? '#e6f7fb'
                                : 'var(--background-color)',
                        color: state.isSelected
                            ? '#fff'
                            : 'var(--black)',
                        cursor: 'pointer',
                    }),

                    indicatorSeparator: () => ({
                        display: 'none',
                    }),

                    dropdownIndicator: (base) => ({
                        ...base,
                        padding: '0 0.5rem',
                        color: 'var(--gray)',
                        '&:hover': {
                            color: 'var(--blue-color)',
                        },
                    }),
                }}
            />
    )
}
