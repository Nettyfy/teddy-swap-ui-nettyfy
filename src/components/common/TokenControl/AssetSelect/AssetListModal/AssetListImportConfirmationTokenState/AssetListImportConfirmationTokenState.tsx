import { Alert, Button, Flex } from '@ergolabs/ui-kit';
import { Trans } from '@lingui/macro';
import first from 'lodash/first';
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';

import { useObservable } from '../../../../../../common/hooks/useObservable';
import { AssetInfo } from '../../../../../../common/models/AssetInfo';
import {
  getAssetToImportFor,
  hasAvailablePoolsWith,
} from '../../../../../../gateway/api/assets';
import { ImportTokenInfo } from './ImportTokenInfo/ImportTokenInfo';
import { ImportTokenPairSelectControl } from './ImportTokenPairSelectControl/ImportTokenPairSelectControl';
import { ImportTokenWarning } from './ImportTokenWarning/ImportTokenWarning';

const StyledAlert = styled(Alert)`
  width: 100%;
`;

export interface AssetListImportConfirmationTokenStateProps {
  readonly asset: AssetInfo;
  readonly onAssetsImportConfirm: (
    mainAsset: AssetInfo,
    assets: AssetInfo[],
  ) => void;
}

export const AssetListImportConfirmationTokenState: FC<AssetListImportConfirmationTokenStateProps> =
  ({ asset, onAssetsImportConfirm }) => {
    const [hasAvailablePools] = useObservable(hasAvailablePoolsWith(asset));
    const [selectedPairTokens, setSelectedPairTokens] = useState<
      AssetInfo[] | undefined
    >();
    const [toImportPairTokens] = useObservable(
      getAssetToImportFor(asset.id),
      [],
      [],
    );

    useEffect(() => {
      if (!selectedPairTokens && !!toImportPairTokens.length) {
        setSelectedPairTokens([first(toImportPairTokens)!]);
      }
    }, [toImportPairTokens]);

    return (
      <Flex col>
        {!hasAvailablePools && (
          <Flex.Item marginBottom={6}>
            <StyledAlert
              borderRadius="l"
              type="warning"
              description={<ImportTokenWarning />}
            />
          </Flex.Item>
        )}
        <Flex.Item marginBottom={6}>
          <ImportTokenInfo asset={asset} />
        </Flex.Item>
        {!hasAvailablePools && (
          <Flex.Item marginBottom={6}>
            <ImportTokenPairSelectControl
              value={selectedPairTokens}
              onChange={setSelectedPairTokens}
              assets={toImportPairTokens}
              mainAsset={asset}
            />
          </Flex.Item>
        )}
        <Button
          type="primary"
          size="extra-large"
          disabled={!selectedPairTokens?.length && !hasAvailablePools}
          onClick={() => onAssetsImportConfirm(asset, selectedPairTokens || [])}
        >
          <Trans>Import</Trans>
        </Button>
      </Flex>
    );
  };
