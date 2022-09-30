import { Icon, Box, Image, useColorModeValue } from '@chakra-ui/react';
import appConfig from 'configs/app/config';
import NextLink from 'next/link';
import React from 'react';
import type { FunctionComponent, SVGAttributes } from 'react';

import blockscoutLogo from 'icons/logo.svg';
import useLink from 'lib/link/useLink';
import getDefaultTransitionProps from 'theme/utils/getDefaultTransitionProps';

// predefined network logos
const LOGOS: Record<string, React.FunctionComponent<React.SVGAttributes<SVGElement>>> = {
  '/xdai/mainnet': require('icons/networks/logos/gnosis.svg'),
  '/eth/mainnet': require('icons/networks/logos/eth.svg'),
  '/etc/mainnet': require('icons/networks/logos/etc.svg'),
  '/poa/core': require('icons/networks/logos/poa.svg'),
  '/rsk/mainnet': require('icons/networks/logos/rsk.svg'),
  '/xdai/testnet': require('icons/networks/logos/gnosis.svg'),
  '/poa/sokol': require('icons/networks/logos/sokol.svg'),
  '/artis/sigma1': require('icons/networks/logos/artis.svg'),
  '/lukso/l14': require('icons/networks/logos/lukso.svg'),
  '/astar': require('icons/networks/logos/astar.svg'),
  '/shiden': require('icons/networks/logos/shiden.svg'),
  '/shibuya': require('icons/networks/logos/shibuya.svg'),
};

interface Props {
  isCollapsed?: boolean;
  onClick?: (event: React.SyntheticEvent) => void;
}

const NetworkLogo = ({ isCollapsed, onClick }: Props) => {
  const logoColor = useColorModeValue('blue.600', 'white');
  const link = useLink();
  const href = link('network_index');
  const logo = appConfig.network.logo || LOGOS[appConfig.network.basePath];

  const style = useColorModeValue({}, { filter: 'brightness(0) invert(1)' });

  let logoEl;

  if (logo && typeof logo === 'string') {
    logoEl = (
      <Image
        h="20px"
        src={ logo }
        alt={ `${ appConfig.network.name } network icon` }
      />
    );
  } else if (typeof logo !== undefined) {
    logoEl = (
      <Icon
        as={ logo as FunctionComponent<SVGAttributes<SVGElement>> }
        width="auto"
        height="20px"
        { ...getDefaultTransitionProps() }
        style={ style }
      />
    );
  } else {
    <Icon
      as={ blockscoutLogo }
      width="113px"
      height="20px"
      color={ logoColor }
      { ...getDefaultTransitionProps() }
      style={ style }
    />;
  }

  return (
    <NextLink href={ href } passHref>
      <Box
        as="a"
        width={{ base: '113px', lg: isCollapsed === false ? '113px' : 0, xl: isCollapsed ? '0' : '113px' }}
        display="inline-flex"
        overflow="hidden"
        onClick={ onClick }
        { ...getDefaultTransitionProps({ transitionProperty: 'width' }) }
        aria-label="Link to main page"
      >
        { logoEl }
      </Box>
    </NextLink>
  );
};

export default React.memo(NetworkLogo);
