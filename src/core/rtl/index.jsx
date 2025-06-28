import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme({
  direction: "rtl",
});

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const Rtl = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
    </ThemeProvider>
  );
};

export default Rtl;
