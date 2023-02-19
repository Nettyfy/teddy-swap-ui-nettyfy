import { Box, Typography } from '@ergolabs/ui-kit';
import { Trans } from '@lingui/macro';
import { Alert, AlertTitle } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const ProtocolDisclaimer = styled(Box)`
  .dark & {
    background: #111d2c;
    border-color: #15395b;
  }

  .light & {
    background: #e6f7ff;
    border-color: #91d5ff;
  }

  a {
    color: var(--spectrum-primary-color);

    &:hover {
      color: var(--spectrum-primary-color-hover);
    }

    &:active,
    &:focus {
      color: var(--spectrum-primary-color-active);
    }
  }
`;

export const ProtocolDisclaimerAlert: React.FC = () => {
  return (
    <Alert severity="info">
      <Typography.Body size="small">
        <Trans>
          By connecting a wallet, you agree to the{' '}
          <a href="https://teddyswap.org" target="_blank" rel="noreferrer">
            Cookie policy
          </a>{' '}
          and acknowledge that you have read and understand the{' '}
          <a href="https://teddyswap.org" target="_blank" rel="noreferrer">
            Protocol disclaimer
          </a>
          .
        </Trans>
      </Typography.Body>
    </Alert>
  );
};
