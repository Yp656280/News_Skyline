import { Box, Paper } from "@mui/material";
import React from "react";

const Home = () => {
  return (
    <>
      <div className="flex justify-around flex-wrap">
        <Box className="basis-3/5">
          <Paper className=" m-4  p-4" elevation={12}>
            <div className="flex flex-row justify-between">
              <div>Todays Weather</div>
              <div>Current Date</div>
            </div>
            <div class="flex-1 border-t-2 border-gray-200"></div>
            <div>
              <div>efjn wefjn ijwed weid</div>
              <div>eedjnwed iwendei dwenwe</div>
            </div>
          </Paper>
          <Paper className=" m-4  p-4 h-60" elevation={12}>
            <div className="flex flex-row justify-between">
              <div>Current Weather</div>
              <div>Time</div>
            </div>
            <div class="flex-1 border-t-2 border-gray-200"></div>
            <div className=" flex flex-row justify-between">
              <div className="basis-1/2">efjn wefjn ijwed weid</div>
              <div class="divide-y divide-blue-200">
                <div className="flex pt-4 justify-between basis-1/2">
                  <div>Real Feel Shade</div>
                  <div>80</div>
                </div>
                <div className="flex pt-4 justify-between">
                  <div>Real Feel Shade</div>
                  <div>80</div>
                </div>
                <div className="flex pt-4 justify-between">
                  <div>Real Feel Shade</div>
                  <div>80</div>
                </div>
              </div>
            </div>
          </Paper>
        </Box>
        <div className="basis-1/4">
          <Paper className="m-4" elevation={12}>
            Hello
          </Paper>
        </div>
      </div>
    </>
  );
};

export default Home;
