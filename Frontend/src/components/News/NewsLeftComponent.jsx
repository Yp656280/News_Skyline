import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { Divider } from "@mui/material";
import { Box } from "@mui/material";
const LeftHeader = ({ handleHeadlineClick, selectedHeadline, headlines }) => {
  const theme = useTheme();

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        maxHeight: "calc(100vh - 64px)",
        overflowY: "auto",
      }}
    >
      {" "}
      {/* Adjust maxHeight based on the height of the parent container */}
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor:
            theme.palette.mode === "dark" ? "#212121" : "#FFFFFF",
          color: theme.palette.mode === "dark" ? "#FFFFFF" : "#333333",

          // border: "solid blue 1px",
          overflow: "",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "600" }}>
          News Headlines
        </Typography>
        <Box
          sx={{
            // border: "solid black 1px",
            minHeight: "520px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            paddingTop: "20px",
            alignItems: "center",
          }}
        >
          {headlines.map((headline, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <Button
                variant={
                  headline === selectedHeadline ? "contained" : "outlined"
                }
                onClick={() => handleHeadlineClick(headline)}
                style={{
                  color:
                    headline === selectedHeadline
                      ? "#FFFFFF"
                      : theme.palette.mode === "dark"
                      ? "#FFFFFF"
                      : "#333333",
                  backgroundColor:
                    headline === selectedHeadline
                      ? theme.palette.primary.main
                      : "transparent",
                  textTransform: "none",
                  margin: "5px",
                  border: "none",
                  transition: "all 0.2s",
                  fontWeight: "600",
                  fontSize: "20px",
                }}
              >
                {headline}
              </Button>
            </div>
          ))}
        </Box>
        {/* <Divider
          style={{
            margin: "20px 0",
            backgroundColor:
              theme.palette.mode === "dark" ? "#FFFFFF" : "#000000",
          }}
        /> */}
      </div>
    </div>
  );
};

export default LeftHeader;
