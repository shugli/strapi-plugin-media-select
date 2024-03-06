import React from 'react';
import PropTypes from 'prop-types';
import { Combobox, ComboboxOption } from '@strapi/design-system/Combobox';
import {Stack } from '@strapi/design-system/Stack';
import { Field, FieldLabel, FieldError, FieldHint } from '@strapi/design-system/Field';
import { useIntl } from 'react-intl';
import getTrad from '../../utils/getTrad';

const MediaSelect = React.forwardRef(({
    value,
    onChange,
    name,
    intlLabel,
    labelAction,
    required,
    attribute,
    description,
    placeholder,
    disabled,
    error,
}, forwardedRef) => {
    const { formatMessage, messages } = useIntl();
    const parsedOptions = JSON.parse(messages[getTrad('countries')]);
    const isValidValue = !value || parsedOptions.hasOwnProperty(value);

    return (
        <Field
            name={name}
            id={name}
            error={!isValidValue ? formatMessage({ id: getTrad('media-select.unsupported-media-code') }, { mediaCode: value }) : error}
            required={required}
            hint={description && formatMessage(description)}
        >
            <Stack spacing={1}>
                <FieldLabel action={labelAction}>
                    {formatMessage(intlLabel)}
                </FieldLabel>

                <Combobox
                    ref={forwardedRef}
                    placeholder={placeholder && formatMessage(placeholder)} 
                    aria-label={formatMessage(intlLabel)}
                    aria-disabled={disabled}
                    disabled={disabled}
                    value={isValidValue ? value : null}
                    onChange={mediaCode => onChange({ target: { name: name, value: mediaCode, type: attribute.type }})}
                    onClear={() => onChange({ target: { name: name, value: '', type: attribute.type }})}
                >
                    {Object.entries(parsedOptions).sort(([c1, n1], [c2, n2]) => n1.localeCompare(n2)).map(([mediaCode, mediaName]) => (
                        <ComboboxOption value={mediaCode} key={mediaCode}>{mediaName}</ComboboxOption>
                    ))}
                </Combobox>

                <FieldHint />
                <FieldError />
            </Stack>
        </Field>
    )
})

MediaSelect.defaultProps = {
    description: null,
    disabled: false,
    error: null,
    labelAction: null,
    required: false,
    value: '',
};

MediaSelect.propTypes = {
    intlLabel: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    attribute: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.object,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    labelAction: PropTypes.object,
    required: PropTypes.bool,
    value: PropTypes.string,
};

export default MediaSelect;
