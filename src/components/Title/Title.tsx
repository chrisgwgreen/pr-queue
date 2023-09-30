import { styled, css } from '@mui/system'

type TitleSize = 'default' | 'large'

export const Title = styled('h2')<{ size?: TitleSize }>(
  ({
    size = 'default',
    theme: {
      palette: { primary }
    }
  }) => css`
    position: relative;
    color: ${primary.main};
    text-transform: uppercase;
    display: block;
    padding-bottom: 0.8rem;
    font-size: ${size === 'large' ? '4rem' : '1.5rem'};
    margin: 0 0 1rem 0;

    &:after {
      content: '';
      position: absolute;
      bottom: 0.375rem;
      left: 0;
      width: 6rem;
      height: 0.25rem;
      background: ${primary.main};
    }
  `
)
