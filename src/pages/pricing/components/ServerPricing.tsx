import * as React from "react";
import { useState } from "react";
import classNames from "classnames";
import { Divider, Box, Grid, Input, Slider, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { formatCcy, handleInvalidValue } from "../../../utils";
import { FormControlLabel } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 80,
  },
});

const FREE_TARGETS = 10;
const COST_PER_TARGET = 10;
const HIGH_AVAILABILITY_TARGETS = 100;
const UNLIMITED_TARGETS = 2001;
const UNLIMITED_PRICE = "192,000";

const isChargedTargets = (valueTargets: number | string): boolean => {
  return valueTargets > FREE_TARGETS;
};

const ServerPricing = (props: { initTargets?: number, isUnlimited?: boolean }) => {
  // Styling
  const classes = useStyles();

  // Deployment Targets
  const newTarget = props.initTargets === undefined ? FREE_TARGETS : props.initTargets
  const [valueTargets, setValueTargets] = useState(newTarget);

  const handleSliderChange = (event: any, newValue: any) => {
    setValueTargets(newValue);
    setLastTargetsSliderVal(valueTargets);
  };

  const handleBlur = () => {
    if (valueTargets < 0) {
      setValueTargets(0);
    } else if (valueTargets > 10000) {
      setValueTargets(10000);
    }
  };

  // Single spot where targets slider value to be set by the user
  const updateUserTargets = (valueTargets: number) => {
    setValidTargets(valueTargets); // update display value
    setLastTargetsSliderVal(valueTargets); // remember user's last value

    // reset checkbox if targets slider value is not eligible to HA
    if (valueTargets < HIGH_AVAILABILITY_TARGETS) {
      setHaCheckboxVal(false);
    }
  };
  const setValidTargets = (num: number) => {
    let vaildVal = handleInvalidValue(num);
    setValueTargets(vaildVal);
  };

  // High Availablity
  const [LastTargetsSliderVal, setLastTargetsSliderVal] = useState(
    valueTargets
  );

  const [haCheckboxVal, setHaCheckboxVal] = useState(false);
  const isEligibleHA = valueTargets >= HIGH_AVAILABILITY_TARGETS;
  const renderHaChecked = haCheckboxVal || isEligibleHA;
  const highAvailabilityCheck = (e: { target: { checked: any } }) => {
    // Updating checkbox state
    /* set checkbox value from wizard step */

    const newHaCheckboxVal = e.target.checked;
    setHaCheckboxVal(newHaCheckboxVal);
    // [ ] => [x]
    if (newHaCheckboxVal) {
      // Set high availablility value
      if (valueTargets < HIGH_AVAILABILITY_TARGETS) {
        setValueTargets(HIGH_AVAILABILITY_TARGETS);
      }
    } else {
      // [x] => [ ]
      // Reset to user's last input value
      setValueTargets(LastTargetsSliderVal);
    }
  };

  // Unlimited Targets
  const initChxBox = props.isUnlimited === undefined ? false : props.isUnlimited
  const [
    unlimitedTargetsCheckboxVal,
    setUnlimitedTargetsCheckboxVal,
  ] = useState(initChxBox);
  const isEligibleUnlimited = valueTargets >= UNLIMITED_TARGETS;
  const renderUnlimitedTargetsChecked =
    unlimitedTargetsCheckboxVal || isEligibleUnlimited;
  const unlimitedTargetsCheck = (e: { target: { checked: any } }) => {
    // Updating checkbox state
    const newUnlimitedTargetsCheckboxVal = e.target.checked;
    setUnlimitedTargetsCheckboxVal(newUnlimitedTargetsCheckboxVal);
    // [ ] => [x]
    if (newUnlimitedTargetsCheckboxVal) {
      // Set unlimited target value
      if (valueTargets < UNLIMITED_TARGETS) {
        setValueTargets(UNLIMITED_TARGETS);
      }
    } else {
      // [x] => [ ]
      // Reset to user's last input value
      setValueTargets(LastTargetsSliderVal);
    }
  };

  // Calculations
  const calcChargedTargets = (valueTargets: any) => {
    if (isChargedTargets(valueTargets)) {
      return valueTargets - FREE_TARGETS;
    } else {
      return 0;
    }
  };

  const targetsPrice = calcChargedTargets(valueTargets) * COST_PER_TARGET;
  const totalPrice = targetsPrice;

  return (
    <>
      <Box>
        <h2><a href="https://octopus.com/pricing/server">Server</a></h2>
        <Typography>
          For{" "}
          {renderUnlimitedTargetsChecked
            ? ` unlimited deployment targets`
            : " up to " + valueTargets + " deployment targets "}
        </Typography>

        <div>
          {renderUnlimitedTargetsChecked ? null : (
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <Slider
                  value={typeof valueTargets === "number" ? valueTargets : newTarget}
                  valueLabelDisplay="auto"
                  onChange={handleSliderChange}
                  aria-labelledby="input-slider"
                  min={10}
                  max={2000}
                />
              </Grid>

              <Grid item>
                <Input
                  className={classes.input}
                  value={valueTargets}
                  margin="dense"
                  onChange={(e) =>
                    updateUserTargets(parseInt(e.target.value, 10))
                  }
                  onBlur={handleBlur}
                  inputProps={{
                    step: 10,
                    min: 10,
                    max: 2000,
                    type: "number",
                    "aria-labelledby": "input-slider",
                  }}
                />
              </Grid>
            </Grid>
          )}
          <FormControlLabel
            control={
              <Checkbox
                checked={renderUnlimitedTargetsChecked}
                onChange={unlimitedTargetsCheck}
                name="unlimitedTargets"
                color="primary"
              />
            }
            label="Unlimited Targets"
          />
        </div>


        <Typography variant="caption" >
          High availability feature included in plan with more than 100
          deployment targets.
        </Typography>
        <Divider variant="fullWidth" className="line" />
        <Typography variant="h4" >
          {renderUnlimitedTargetsChecked
            ? UNLIMITED_PRICE
            : formatCcy(totalPrice)}
          <sup>*</sup>
        </Typography>
        <span> / Month</span>


      </Box>
      <Box className="pricing-action" >
        Start a Trial
      </Box>
    </>
  );
};
export default ServerPricing;
