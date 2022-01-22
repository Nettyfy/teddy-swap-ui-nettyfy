import React from 'react';

import { Currency } from '../../../../common/models/Currency';
import { Flex, Typography } from '../../../../ergodex-cdk';
import { TokenIcon } from '../../../TokenIcon/TokenIcon';
import { FormSection } from '../FormSection/FormSection';

interface PairSpaceProps {
  readonly title: string;
  readonly xAmount: Currency;
  readonly yAmount: Currency;
  readonly fees?: boolean;
  readonly children?: React.ReactChild | React.ReactChild[];
}

const FormPairSection: React.FC<PairSpaceProps> = ({
  title,
  xAmount,
  yAmount,
  fees,
  children,
}): JSX.Element => {
  return (
    <FormSection title={title}>
      <Flex direction="col">
        <Flex.Item marginBottom={2}>
          <Flex justify="space-between" align="center">
            <Flex.Item>
              <Flex align="center">
                <Flex.Item marginRight={2}>
                  <TokenIcon name={xAmount.asset.name} />
                </Flex.Item>
                <Flex.Item>
                  <Typography.Body strong>{xAmount.asset.name}</Typography.Body>
                </Flex.Item>
              </Flex>
            </Flex.Item>
            <Flex.Item>
              <Flex>
                <Typography.Body strong>
                  {fees ? undefined : xAmount.toString({ suffix: false })}
                </Typography.Body>
              </Flex>
            </Flex.Item>
          </Flex>
        </Flex.Item>
        <Flex.Item marginBottom={children ? 2 : 0}>
          <Flex justify="space-between">
            <Flex.Item>
              <Flex>
                <Flex.Item marginRight={2}>
                  <TokenIcon name={yAmount.asset.name} />
                </Flex.Item>
                <Flex.Item>
                  <Typography.Body strong>{yAmount.asset.name}</Typography.Body>
                </Flex.Item>
              </Flex>
            </Flex.Item>
            <Flex.Item>
              <Flex>
                <Typography.Body strong>
                  {fees ? undefined : yAmount.toString({ suffix: false })}
                </Typography.Body>
              </Flex>
            </Flex.Item>
          </Flex>
        </Flex.Item>
      </Flex>
    </FormSection>
  );
};

export { FormPairSection };
