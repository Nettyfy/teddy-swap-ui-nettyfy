import React, { FC } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { NetworkDomManager } from './common/services/NetworkDomManager';
import { RouteConfigExtended } from './components/RouterTitle/RouteConfigExtended';
import { RouterTitle } from './components/RouterTitle/RouterTitle';
import { AddLiquidityOrCreatePool } from './pages/AddLiquidityOrCreatePool/AddLiquidityOrCreatePool';
import { Farm } from './pages/Farm/Farm';
import { Liquidity } from './pages/Liquidity/Liquidity';
import { LockLiquidity } from './pages/LockLiquidity/LockLiquidity';
import { Orders } from './pages/Orders/Orders';
import { PoolOverview } from './pages/PoolOverview/PoolOverview';
import { RelockLiquidity } from './pages/RelockLiquidity/RelockLiquidity';
import { RemoveLiquidity } from './pages/RemoveLiquidity/RemoveLiquidity';
import { Swap } from './pages/Swap/Swap';
import { WithdrawalLiquidity } from './pages/WithdrawalLiquidity/WithdrawalLiquidity';

export const routesConfig: RouteConfigExtended[] = [
  {
    path: '/',
    element: <NetworkDomManager.Outlet />,
    children: [
      {
        path: '',
        element: <Navigate to="swap" />,
      },
      {
        title: 'Swap',
        path: 'swap',
        element: <Swap />,
      },
      {
        title: 'Orders',
        path: 'orders',
        element: <Orders />,
      },
      {
        path: 'liquidity',
        children: [
          {
            title: 'Liquidity',
            path: '',
            element: <Liquidity />,
          },
          {
            title: 'Add Liquidity',
            path: 'add',
            element: <AddLiquidityOrCreatePool />,
          },
          {
            title: 'Create Pool',
            path: 'create',
            element: <AddLiquidityOrCreatePool />,
          },
          {
            path: ':poolId',
            children: [
              {
                title: 'Remove Liquidity',
                path: 'remove',
                element: <RemoveLiquidity />,
              },
              {
                title: 'Lock Liquidity',
                path: 'lock',
                element: <LockLiquidity />,
              },
              {
                title: 'Relock Liquidity',
                path: 'relock',
                element: <RelockLiquidity />,
              },
              {
                title: 'Withdrawal Liquidity',
                path: 'withdrawal',
                element: <WithdrawalLiquidity />,
              },
              {
                title: 'Add Liquidity',
                path: 'add',
                element: <AddLiquidityOrCreatePool />,
              },
              {
                title: 'Create Pool',
                path: 'create',
                element: <AddLiquidityOrCreatePool />,
              },
              {
                title: 'Pool Overview',
                path: '',
                element: <PoolOverview />,
              },
            ],
          },
        ],
      },
      {
        path: 'farm',
        children: [
          {
            title: 'Farm',
            path: '',
            element: <Farm />,
          },
          {
            title: 'Add Liquidity',
            path: 'add',
            element: <AddLiquidityOrCreatePool />,
          },
          {
            title: 'Create Pool',
            path: 'create',
            element: <AddLiquidityOrCreatePool />,
          },
          {
            path: ':poolId',
            children: [
              {
                title: 'Remove Liquidity',
                path: 'remove',
                element: <RemoveLiquidity />,
              },
              {
                title: 'Lock Liquidity',
                path: 'lock',
                element: <LockLiquidity />,
              },
              {
                title: 'Relock Liquidity',
                path: 'relock',
                element: <RelockLiquidity />,
              },
              {
                title: 'Withdrawal Liquidity',
                path: 'withdrawal',
                element: <WithdrawalLiquidity />,
              },
              {
                title: 'Add Liquidity',
                path: 'add',
                element: <AddLiquidityOrCreatePool />,
              },
              {
                title: 'Create Pool',
                path: 'create',
                element: <AddLiquidityOrCreatePool />,
              },
              {
                title: 'Pool Overview',
                path: '',
                element: <PoolOverview />,
              },
            ],
          },
        ],
      },
      {
        path: '*',
        element: <Navigate to="swap" />,
      },
    ],
  },
];

export const ApplicationRoutes: FC = () => {
  const routes = useRoutes(routesConfig);
  const networkTitle = NetworkDomManager.useNetworkTitle();

  return (
    <>
      <RouterTitle
        divider="·"
        pageTitle={networkTitle ? `TeddySwap · ${networkTitle}` : 'TeddySwap'}
        routesConfig={routesConfig}
      />
      {routes}
    </>
  );
};
