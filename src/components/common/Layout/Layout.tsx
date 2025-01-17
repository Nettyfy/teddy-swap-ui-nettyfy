import React from 'react';
import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { applicationConfig } from '../../../applicationConfig';
import { device } from '../../../common/constants/size';
import { useApplicationSettings } from '../../../context';
import { useSelectedNetwork } from '../../../gateway/common/network';
import { useBodyClass } from '../../../hooks/useBodyClass';
import { useMetaThemeColor } from '../../../hooks/useMetaThemeColor';
import { openCookiePolicy } from '../../../services/notifications/CookiePolicy/CookiePolicy';
import { isDarkOsTheme } from '../../../utils/osTheme';
import { NetworkHeight } from '../../NetworkHeight/NetworkHeight';
import { CardanoUpdate } from './CardanoUpdate/CardanoUpdate';
import { FooterNavigation } from './FooterNavigation/FooterNavigation';
import { Header } from './Header/Header';

const MainContainer = styled.main`
  padding: 80px 4px 148px 4px !important;

  ${device.m} {
    padding: 60px 18px 80px 24px !important;
  }

  ${device.l} {
    padding-top: 100px !important;
  }

  ${device.l} {
    padding-top: 120px !important;
  }
`;

const _Layout: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  const [{ theme }] = useApplicationSettings();
  const [network] = useSelectedNetwork();
  const ref = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [scrolledTop, setScrolledTop] = useState(true);

  useBodyClass([theme, network.name.toLowerCase()]);
  useMetaThemeColor(
    {
      dark: '#1D1D1D',
      light: `#F0F2F5`,
      get system() {
        return isDarkOsTheme() ? this.dark : this.light;
      },
    },
    theme,
  );

  useEffect(() => {
    openCookiePolicy();
  }, []);

  useEffect(() => {
    let currentScrollY = ref.current?.scrollTop || 0;

    const handleScroll = () => {
      setScrolled(currentScrollY < (ref.current?.scrollTop || 0));
      setScrolledTop((ref.current?.scrollTop || 0) < 5);
      currentScrollY = ref.current?.scrollTop || 0;
    };

    ref.current?.addEventListener('scroll', handleScroll);

    return () => document.removeEventListener('scroll', handleScroll);
  }, [ref]);

  const footerHeight = footerRef?.current?.clientHeight || 0;

  return (
    <div ref={ref} className={className}>
      {applicationConfig.cardanoUpdate && network.name === 'cardano' ? (
        <CardanoUpdate />
      ) : (
        <>
          <img
            src={'/images/bear-with-balloons.png'}
            alt="plane with bear"
            className="fixed bottom-0 right-20 w-96 z-[-1]"
          />
          <Header scrolled={scrolled} scrolledTop={scrolledTop} />
          <MainContainer
            style={{ paddingBottom: footerHeight ? footerHeight + 8 : 80 }}
          >
            {children}
          </MainContainer>
          <footer>
            {/* <SocialLinks /> */}
            <NetworkHeight />
          </footer>
          {/* <FooterNavigation ref={footerRef} /> */}
        </>
      )}
    </div>
  );
};

export const Layout = styled(_Layout)`
  position: relative;
  height: 100%;
  overflow-y: scroll;
`;
