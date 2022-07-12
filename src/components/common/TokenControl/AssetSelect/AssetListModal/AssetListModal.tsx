import { AssetInfo } from '@ergolabs/ergo-sdk';
import { ArrowLeftOutlined, Flex, Modal, Typography } from '@ergolabs/ui-kit';
import { Trans } from '@lingui/macro';
import React, { useState } from 'react';
import { Observable } from 'rxjs';
import styled from 'styled-components';

import {
  hasAvailablePoolsWith,
  importTokenAsset,
} from '../../../../../gateway/api/assets';
import { AssetListImportTokenState } from './AssetListImportTokenState/AssetListImportTokenState';
import { AssetListSelectTokenState } from './AssetListSelectTokenState/AssetListSelectTokenState';

enum AssetListModalState {
  SELECT_TOKEN,
  IMPORT_TOKEN,
}

interface TokenListModalProps {
  readonly close: () => void;
  readonly onSelectChanged?: (name: AssetInfo) => void | undefined;
  readonly assets$?: Observable<AssetInfo[]>;
  readonly assetsToImport$?: Observable<AssetInfo[]>;
}

const StyledArrowLeftOutlined = styled(ArrowLeftOutlined)`
  cursor: pointer;
`;

const AssetListModal: React.FC<TokenListModalProps> = ({
  close,
  onSelectChanged,
  assets$,
  assetsToImport$,
}) => {
  const [assetListModalState, setAssetListModalState] =
    useState<AssetListModalState>(AssetListModalState.SELECT_TOKEN);

  const [assetToImport, setAssetToImport] = useState<AssetInfo | undefined>();

  const handleAssetSelect = (asset: AssetInfo) => {
    if (onSelectChanged) {
      onSelectChanged(asset);
    }

    if (close) {
      close();
    }
  };

  const handleAssetImport = (asset: AssetInfo) => {
    hasAvailablePoolsWith(asset).subscribe((hasAvailablePoolsWith) => {
      if (hasAvailablePoolsWith) {
        importTokenAsset(asset);
        handleAssetSelect(asset);
      } else {
        setAssetToImport(asset);
        setAssetListModalState(AssetListModalState.IMPORT_TOKEN);
      }
    });
  };

  const handleAssetsImport = (mainAsset: AssetInfo, assets: AssetInfo[]) => {
    importTokenAsset(assets.concat(mainAsset));
    handleAssetSelect(mainAsset);
  };

  const resetModalState = () => {
    setAssetToImport(undefined);
    setAssetListModalState(AssetListModalState.SELECT_TOKEN);
  };

  return (
    <>
      <Modal.Title>
        {assetListModalState === AssetListModalState.SELECT_TOKEN ? (
          <Trans>Select a token</Trans>
        ) : (
          <Flex align="center">
            <Flex.Item marginRight={5}>
              <Typography.Title level={5}>
                <StyledArrowLeftOutlined onClick={resetModalState} />
              </Typography.Title>
            </Flex.Item>
            <Trans>Select a token</Trans>
          </Flex>
        )}
      </Modal.Title>
      <Modal.Content width={500}>
        {assetListModalState === AssetListModalState.SELECT_TOKEN && (
          <AssetListSelectTokenState
            assetsToImport$={assetsToImport$}
            assets$={assets$}
            onAssetImport={handleAssetImport}
            onAssetSelect={handleAssetSelect}
          />
        )}
        {assetListModalState === AssetListModalState.IMPORT_TOKEN && (
          <AssetListImportTokenState
            onAssetsImport={handleAssetsImport}
            asset={assetToImport!}
          />
        )}
      </Modal.Content>
    </>
  );
};

export { AssetListModal };
