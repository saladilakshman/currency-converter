import { useState, useEffect } from "react";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  ThemeProvider,
  CssBaseline,
  createTheme,
  Container,
  Typography,
  IconButton,
  Autocomplete,
  TextField,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Box,
  Skeleton,
} from "@mui/material";
import { styles } from "./styles/style";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { currency } from "./utils/currency";
import { conversion_rates } from "./utils/rates";
import axios from "axios";
function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const [currencystate, setCurrencystate] = useState(
    () =>
      JSON.parse(window.localStorage.getItem("currency")) ?? {
        fromcurrency: currency[Math.floor(Math.random() * currency.length)],
        tocurrency: currency[Math.floor(Math.random() * currency.length)],
        currencyrate: 1,
        isfetching: false,
        exchangedetails: [],
      }
  );
  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://v6.exchangerate-api.com/v6/${import.meta.env.VITE_APP_API_KEY}/latest/${fromcurrency?.value}`
  //     )
  //     .then((res) => console.log(res.data?.conversion_rates))
  //     .catch((err) => console.log(err.message));
  // }, [fromcurrency]);
  const currencyexchange = () => {
    setCurrencystate((prev) => ({
      ...prev,
      fromcurrency: prev?.tocurrency,
      tocurrency: prev?.fromcurrency,
    }));
  };
  useEffect(() => {
    window.localStorage.setItem("currency", JSON.stringify(currencystate));
  }, [currencystate]);
  const localPriceConversion = (code, number) => {
    return new Intl.NumberFormat(`en-${code.value.slice(0, 2)}`, {
      notation: "compact",
      compactDisplay: "short",
    }).format(number);
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="xs" sx={styles.container}>
        <Typography
          variant="h3"
          textAlign={"center"}
          sx={styles.appname}
          py={2}
        >
          Currency Converter
        </Typography>
        <TextField
          type="number"
          placeholder="Currency value"
          fullWidth
          required
          sx={{ my: 2 }}
          value={currencystate?.currencyrate}
          onChange={(event) =>
            setCurrencystate((prev) => ({
              ...prev,
              currencyrate: Number(event.target.value),
            }))
          }
        />
        <Autocomplete
          options={currency}
          disableClearable
          getOptionLabel={(option) => option.label || ""}
          fullWidth
          required
          value={currencystate?.fromcurrency}
          onChange={(event, newVal) =>
            setCurrencystate((prev) => ({
              ...prev,
              fromcurrency: newVal,
            }))
          }
          isOptionEqualToValue={(option, value) =>
            option.value === value?.value
          }
          renderOption={(props, option) => {
            const { key, ...otherProps } = props; // Extract key from props
            return (
              <ListItem key={key} {...otherProps}>
                <ListItemAvatar>
                  <Avatar
                    src={`https://flagcdn.com/w320/${option.value.slice(
                      0,
                      2
                    )}.png`}
                    alt={option.label}
                  />
                </ListItemAvatar>
                <ListItemText primary={option.label} />
              </ListItem>
            );
          }}
          renderInput={(props) => (
            <TextField {...props} placeholder="Choose from currency" />
          )}
        />
        <IconButton
          variant="primary"
          size="large"
          sx={styles.iconbutton}
          onClick={currencyexchange}
        >
          <CurrencyExchangeIcon />
        </IconButton>
        <Autocomplete
          options={currency}
          disableClearable
          value={currencystate?.tocurrency}
          onChange={(event, newVal) =>
            setCurrencystate((prev) => ({
              ...prev,
              tocurrency: newVal,
            }))
          }
          getOptionLabel={(option) => option.label || ""}
          fullWidth
          isOptionEqualToValue={(option, value) =>
            option.value === value?.value
          }
          renderOption={(props, option) => {
            const { key, ...otherProps } = props; // Extract key from props
            return (
              <ListItem key={key} {...otherProps}>
                <ListItemAvatar>
                  <Avatar
                    src={`https://flagcdn.com/w320/${option.value.slice(
                      0,
                      2
                    )}.png`}
                    alt={option.label}
                  />
                </ListItemAvatar>
                <ListItemText primary={option.label} />
              </ListItem>
            );
          }}
          renderInput={(props) => (
            <TextField {...props} placeholder="Choose from currency" />
          )}
        />
        {currencystate?.isfetching ? (
          <>
            <Skeleton variant="rectangle" sx={styles.skeleton} />
            <Skeleton
              variant="rectangle"
              sx={{ ...styles.skeleton, width: "50%" }}
            />
          </>
        ) : (
          <Box sx={{ my: 4 }}>
            <Typography variant={"h4"} sx={styles.tocurrency.text}>
              <Box component="span">{currencystate?.currencyrate}</Box>
              <Box component="span" sx={{ textTransform: "uppercase" }}>
                {currencystate?.fromcurrency?.value}
              </Box>
              <Box
                component="img"
                src={`https://flagcdn.com/w320/${currencystate?.fromcurrency.value.slice(
                  0,
                  2
                )}.png`}
                alt=""
                sx={styles.tocurrency.image}
              />
            </Typography>
            <Typography
              variant="h2"
              textAlign="center"
              sx={styles.fromcurrency.text}
            >
              <Box component="span">
                {localPriceConversion(
                  currencystate?.tocurrency,
                  (
                    currencystate?.currencyrate *
                    conversion_rates[
                      currencystate?.tocurrency.value.toUpperCase()
                    ]
                  ).toFixed(2)
                )}
              </Box>
              <Box component="span" sx={{ textTransform: "uppercase" }}>
                ({currencystate?.tocurrency?.value})
              </Box>
              <Box
                component="img"
                src={`https://flagcdn.com/w320/${currencystate?.tocurrency.value.slice(
                  0,
                  2
                )}.png`}
                alt=""
                sx={styles.fromcurrency.image}
              />
            </Typography>
            <Typography variant="h3" textAlign="center" sx={styles.rate}>
              Rate ={" "}
              {conversion_rates[currencystate?.tocurrency?.value.toUpperCase()]}
            </Typography>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
