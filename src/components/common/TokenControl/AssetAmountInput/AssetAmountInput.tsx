import { AssetInfo } from '@ergolabs/ergo-sdk/build/main/entities/assetInfo';
import { EventConfig, Input, InputProps } from '@ergolabs/ui-kit';
import { TextField } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import styled from 'styled-components';

import { Currency } from '../../../../common/models/Currency';

const _InnerInput: FC<InputProps> = ({ onChange, ...rest }) => {
  return (
    <TextField
      InputLabelProps={{
        shrink: true,
      }}
      sx={{
        '& input': {
          fontSize: 24,
          fontWeight: 'bold',
          padding: '35px 20px',
        },
      }}
      label={rest.label}
      variant="outlined"
      placeholder={rest.placeholder}
      value={rest.value}
      className={`${rest.className} !w-full`}
      onChange={(e) => {
        if (onChange) {
          e.target.value = e.target.value.replaceAll(',', '.');
          onChange(e as React.ChangeEvent<HTMLInputElement>);
        }
      }}
    />
  );
};

export interface TokenAmountInputValue {
  viewValue: string | undefined;
  value: number | undefined;
}

export interface TokenAmountInputProps {
  value?: Currency;
  onChange?: (data: Currency | undefined, config?: EventConfig) => void;
  disabled?: boolean;
  readonly?: boolean;
  asset?: AssetInfo;
  className?: string;
  label: string;
}

const _TokenAmountInput: React.FC<TokenAmountInputProps> = ({
  value,
  onChange,
  disabled,
  readonly,
  asset,
  className,
  label,
}) => {
  const [userInput, setUserInput] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (Number(value?.toAmount()) !== Number(userInput)) {
      setUserInput(value?.toAmount());
    }
  }, [value]);

  useEffect(() => {
    if (value && asset) {
      const newValue = value?.changeAsset(asset);

      setUserInput(newValue?.toAmount());

      if (onChange && value.asset.id !== asset.id) {
        onChange(newValue, { emitEvent: 'silent' });
      }
    }
  }, [asset?.id]);

  const enforcer = (nextUserInput: string) => {
    if (nextUserInput.startsWith('.')) {
      nextUserInput = nextUserInput.replace('.', '0.');
    }
    if (onChange) {
      setUserInput(nextUserInput);
      onChange(nextUserInput ? new Currency(nextUserInput, asset) : undefined);
      return;
    }
    setUserInput(userInput ?? '');
  };

  return (
    <NumberFormat
      readOnly={readonly}
      value={userInput || ''}
      className={className}
      type="tel"
      inputMode="decimal"
      onValueChange={({ value }, { source }) => {
        if (source === 'event') {
          enforcer(value);
        }
      }}
      allowNegative={false}
      decimalScale={asset?.decimals || 0}
      thousandSeparator=" "
      decimalSeparator="."
      size="large"
      placeholder="0.0"
      label={label}
      customInput={_InnerInput}
      disabled={disabled}
    />
  );
};

export const AssetAmountInput = styled(_TokenAmountInput)`
  border-radius: initial !important;
  border-color: transparent !important;
  background-color: transparent !important;
  padding: 0 !important;
  font-size: 24px !important;
  font-weight: 600 !important;
  line-height: 32px !important;
  height: 100%;
`;
