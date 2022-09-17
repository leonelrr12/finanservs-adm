import { createTheme } from "@mui/material";
import styled, { createGlobalStyle } from 'styled-components'
import { ReactSVG } from 'react-svg'


export const theme = createTheme({
    colors: {
        white: "#ffffff",
        dark: "#27212e",
        black: "#373737",
        accent: "#E53251",
        gray: "#F2F2F2",
        blue: "#0d6efd",
        silver: "#716385",
    },
    dims: {
        widths: {
            small: '30em',
            forms: '17.5em'
        },
        padding: {
            largePadding: '0.8em 1.2em',
            mediumPadding: '2em',
            tallPadding: '3em 1.5em'
        },
        margin: {
            small: '0.5em',
            intersection: '1em',
            normal: '2em',
            inline: '0.5ch'
        },
        borderRadius: {
            small: '0.4em',
            normal: '0.8em'
        },
        fonts: {
            small: '0.8em',
            medium: '1.5em',
            title: '3em'
        },
        circle: {
            small: '1em',
            medium: '3em',
            big: '6em'
        }
    },
    shadows: {
        depth1: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        depth2: '0 4px 6px -1 rgba(0, 0, 0, 0.1), 0 2px 4px -1 rgba(0, 0, 0, 0.06)',
        depth3: '0 20px 25px -5 rgba(0, 0, 0, 0.1), 0 20px 25px -5 rgba(0, 0, 0, 0.04)',

    }
})


export let GlobalStyles = createGlobalStyle`
  * { box-sizing: border-box }
`;

export const LayoutContainer = styled.div`
    display: grid;
    min-height: 100vh;
    grid-template-rows: auto minmax(0, 1fr) auto;
`;
    // margin: 10px;
    // margin-top: 50px;

export const SmallContainer = styled.div`
    width: ${ theme.dims.widths.small };
    max-width: 100vw;
    margin: 0 auto;
`

export const CenteredContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
`

export const ClearButton = styled.button`
    outline: 0;
    border: 0;
    background-color: transparent;
    font-size: 1em;
    display: block;
`

export const SvgButton = styled(ReactSVG)`
    & svg {
        width: ${ theme.dims.circle.small };
        height: ${ theme.dims.circle.small };
        display: inline-block;
        vertical-align: bottom;
    }
    background-color: ${ ({ theme, active }) => active ? theme.colors.accent : theme.colors.dark };
    cursor: pointer;
    border-radius: 50%;
    width: ${ theme.dims.circle.medium };
    height: ${ theme.dims.circle.medium };
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: ${ theme.dims.margin.intersection };

    & path {
        fill: ${ theme.colors.white } !important
    }
`

export const Title = styled.h1`
    font-size: ${ theme.dims.fonts.medium };
    font-weight: bold;
    display: inline-block;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-left: ${ theme.dims.margin.intersection };
    vertical-align: middle;
`

export const AppButton = styled.button`
  background-color: ${ theme.colors.blue};
  border-radius: ${ theme.dims.borderRadius.normal};
  padding: ${ theme.dims.padding.largePadding};
  box-shadow: ${ theme.shadows.depth1};
  margin-top: ${ theme.dims.margin.normal };
  font-size: 1em;
  color: ${ theme.colors.white};
  cursor: pointer;
  border: none;

  &:hover{
    opacity:0.8;
    box-shadow: ${ theme.shadows.depth2};
  }
`;

export const FooterContainer = styled.footer`
    display: grid;
    grid-template-columns: minmax(auto, 1fr) auto minmax(auto, 1fr);
    border: 1px solid;
    border-color: ${ theme.colors.gray };
    height: 3em;
    text-align: center;
    justify-content: space-around;
    align-items: center;
`;