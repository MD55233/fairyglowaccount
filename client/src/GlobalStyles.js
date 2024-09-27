import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Custom scrollbar styles for WebKit browsers (Chrome, Safari) */
  ::-webkit-scrollbar {
    width: 8px; /* Width of the scrollbar */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #21295c; /* Color of the scrollbar thumb */
    border-radius: 10px; /* Round the edges of the scrollbar thumb */
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #4d547d; /* Darker color on hover */
  }

  ::-webkit-scrollbar-track {
    background-color: #4d547d; /* Background color of the scrollbar track */
  }

  /* Custom scrollbar styles for Firefox */
  * {
    scrollbar-width: thin; /* Sets the width of the scrollbar */
    scrollbar-color:  #4d547d  #21295c ; /* Thumb color and track color */
  }
`;

export default GlobalStyles;
