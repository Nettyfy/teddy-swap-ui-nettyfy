import { Box, Flex, Typography } from '@ergolabs/ui-kit';
import React, { FC } from 'react';
import styled from 'styled-components';

import { Currency } from '../../../../../../common/models/Currency';
import { AssetIcon } from '../../../../../AssetIcon/AssetIcon';
import { DataTag } from '../../../../../common/DataTag/DataTag';

interface AssetBoxProps {
  readonly currency: Currency;
  readonly className?: string;
}

const _AssetBox: FC<AssetBoxProps> = ({ currency, className }) => (
  <Box padding={[1, 2]} className={className} borderRadius="m">
    <Flex align="center">
      <Flex.Item marginRight={1}>
        <AssetIcon size="small" asset={currency.asset} />
      </Flex.Item>
      <Flex.Item marginRight={1} flex={1}>
        <Typography.Title level={5}>{currency.asset.ticker}</Typography.Title>
      </Flex.Item>
      <Flex.Item>
        <DataTag
          content={currency.toString(
            Math.max(currency.asset.decimals || 0, 2),
            2,
          )}
          size="small"
        />
      </Flex.Item>
    </Flex>
  </Box>
);

export const AssetBox = styled(_AssetBox)`
  border-color: var(--spectrum-asset-box-border-color);
`;
