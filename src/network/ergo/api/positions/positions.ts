import {
  combineLatest,
  debounceTime,
  map,
  publishReplay,
  refCount,
} from 'rxjs';

import { Position } from '../../../../common/models/Position';
import { allAmmPools$ } from '../ammPools/ammPools';
import { lpBalance$ } from '../balance/lpBalance';
import { tokenLocksGroupedByLpAsset$ } from '../common/tokenLocks';
import { networkContext$ } from '../networkContext/networkContext';

export const positions$ = combineLatest([
  allAmmPools$,
  lpBalance$,
  tokenLocksGroupedByLpAsset$,
  networkContext$,
]).pipe(
  debounceTime(200),
  map(
    ([ammPools, lpWalletBalance, tokenLocksGroupedByLpAsset, networkContext]) =>
      ammPools
        .filter(
          (ap) =>
            lpWalletBalance.get(ap.lp.asset).isPositive() ||
            tokenLocksGroupedByLpAsset[ap.lp.asset.id]?.length > 0,
        )
        .map(
          (ap) =>
            new Position(
              ap,
              lpWalletBalance.get(ap.lp.asset),
              false,
              tokenLocksGroupedByLpAsset[ap.lp.asset.id] || [],
              networkContext.height,
            ),
        ),
  ),
  publishReplay(1),
  refCount(),
);
