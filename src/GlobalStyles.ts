import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset};
    * {
        box-sizing: border-box;
    }

    body{
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        font-size: 14px;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    button {
        border: 0;
        background: 0;
        padding: 0;
        margin: 0;
    }

`;

export default GlobalStyles;
