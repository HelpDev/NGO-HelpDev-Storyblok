export const CardVariant = {
  transparent: {
    background: 'transparent',
    foreground: 'var(--color-basic-darkest)'
  },
  basic: {
    background: 'var(--color-basic-brighter)',
    foreground: 'var(--color-basic-darkest)'
  },
  primary: {
    background: 'var(--color-primary-bright)',
    foreground: 'var(--color-primary-darkest)'
  },
  secondary: {
    background: 'var(--color-secondary-bright)',
    foreground: 'var(--color-secondary-darkest)'
  },
  tertiary: {
    background: 'var(--color-tertiary-bright)',
    foreground: 'var(--color-tertiary-darkest)'
  }
};

export const CardSize = {
  1: {
    width: '100%',
    padding: '6vw'
  },
  2: {
    width: '100%',
    padding: '6vw'
  },
  '1/2': {
    width: '50%',
    padding: '4vw'
  },
  '1/3': {
    width: '33.333333%',
    padding: '3vw'
  },
  '2/3': {
    width: '66.666666%',
    padding: '3vw'
  },
  '1/4': {
    width: '25%',
    padding: '3vw'
  },
  '3/4': {
    width: '75%',
    padding: '3vw'
  }
};

export const CardImageSide = {
  left: {
    direction: 'row',
    justify: 'space-between',
    align: 'center',
    height: '100%',
    width: '50%'
  },
  right: {
    direction: 'row-reverse',
    justify: 'space-between',
    align: 'center',
    height: '100%',
    width: '50%'
  },
  top: {
    direction: 'column',
    justify: 'space-between',
    align: 'center',
    height: '50%',
    width: '100%'
  },
  bottom: {
    direction: 'column-reverse',
    justify: 'space-between',
    align: 'center',
    height: '50%',
    width: '100%'
  },
  center: {
    direction: 'column',
    justify: 'center',
    align: 'center',
    height: '100%',
    width: '100%'
  }
};
