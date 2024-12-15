import type { Preview } from "@storybook/react";
import { css, Global, ThemeProvider } from "@emotion/react";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { theme } from "@styles";

const GlobalStyles = () => (
  <Global
    styles={css`
      .customDropdownMenu {
        ul.ant-dropdown-menu {
          background-color: transparent;
          box-shadow: none;
          border-radius: 10px;
          overflow: hidden;
          padding: 0;
        }

        .ant-dropdown-menu li.ant-dropdown-menu-item {
          height: 36px;
          padding: 8px 16px;
          background-color: $white-color;
          margin-bottom: 2px;
          border-radius: 0;

          .ant-row {
            align-items: center;

            > span {
              color: $secondary-color;
            }

            svg {
              width: 16px;
              height: 18px;
              margin-right: 12px;
            }
          }
        }
      }
    `}
  />
);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeFromJSXProvider({
      themes: {
        light: theme,
      },
      defaultTheme: "light",
      Provider: ThemeProvider,
      GlobalStyles,
    }),
  ],
};

export default preview;
