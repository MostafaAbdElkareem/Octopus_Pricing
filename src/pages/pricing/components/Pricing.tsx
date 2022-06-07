import * as React from "react";
import { useState } from "react";
import Server from "./ServerPricing";
import Cloud from "./CloudPricing";
import Features from "./Features";
import Container from '@mui/material/Container';
import { FormControlLabel, Paper, Typography, Input, Checkbox, Tab, Fade, Box, Grid, Stack } from '@mui/material';
import discoverImg from "../../../resources/Images/discover.png";
import validateImg from "../../../resources/Images/validate.png";
import server from "../../../resources/Images/server.png";
import cloud from "../../../resources/Images/cloud-server.png";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
const Pricing = () => {

  const [discover, setDiscover] = useState(false);
  const [validate, setValidate] = useState(false);
  const [platform, setPlatform] = useState("cloud")
  const [cloudTargets, setCloudTargets] = useState(10);
  const [serverTargets, setServerTarget] = useState(10);
  const [minutes, setMinutes] = useState(100);
  const [isUnlimited, setIsUnlimited] = useState(false);
  const cloudIcon = (<img className="tab-icon" src={cloud} alt="" />);
  const serverIcon = (<img className="tab-icon" src={server} alt="" />);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setPlatform(newValue);
  };
  const platformsTabs = (
    <TabContext value={platform}>
      <Box className="tab-container">
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab icon={cloudIcon} iconPosition="start" label="Cloud" value="cloud" />
          <Tab icon={serverIcon} label="Server" iconPosition="start" value="server" />
        </TabList>
      </Box>
      <Box>
        <TabPanel value="cloud">
          <Stack direction="row" spacing={2}>
            <Box>
              Targets:
              <Input fullWidth={true} required value={cloudTargets} margin="dense" onChange={(e) => setCloudTargets(parseInt(e.target.value, 10))}
                inputProps={{ step: 10, min: 10, max: 5000, type: "number" }} />
            </Box>
            <Box>
              Minutes:
              <Input fullWidth={true} required value={minutes} margin="dense" onChange={(e) => setMinutes(parseInt(e.target.value, 10))}
                inputProps={{ step: 10, min: 100, max: 10000, type: "number" }} />
            </Box>
          </Stack>
        </TabPanel>
        <TabPanel value="server">
          <Stack direction="row" spacing={2} >
            <Box>
              Targets:
              <Input fullWidth={true} required value={serverTargets} margin="dense" onChange={(e) => setServerTarget(parseInt(e.target.value, 10))}
                inputProps={{ step: 10, min: 10, max: 2000, type: "number" }} />
            </Box>
            <Box>

              <FormControlLabel control={<Checkbox checked={isUnlimited} onChange={(e) => { setIsUnlimited(e.target.checked) }}
                name="unlimitedTargets" />} label="Unlimited Targets"
              />
            </Box>
          </Stack>
        </TabPanel>
      </Box>
    </TabContext>
  )
  const actionHandle = (id: number, flag: boolean) => {
    if (id === 0) {/* clicked from discover button */
      setDiscover(!flag);
      setValidate(false);
    } else if (id === 1) {/* clicked from vlidate */
      setValidate(!flag);
      setDiscover(false);
    }

  }
  const backHandle = () => {
    setValidate(false);
    setDiscover(false);
  }
  const discoverContainer = (
    <Box className="centered">
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Fade in={discover} appear={true} timeout={2000} mountOnEnter unmountOnExit>
          <Grid item xs={12} sm={4} md={6}>
            <Paper elevation={2} className="price-container"><Cloud /></Paper>
          </Grid>
        </Fade>
        <Fade in={discover} appear={true} timeout={3400} mountOnEnter unmountOnExit>
          <Grid item xs={12} sm={4} md={6}>
            <Paper elevation={2} className="price-container"><Server /></Paper>
          </Grid>
        </Fade>
      </Grid>
    </Box>
  )

  const validateContainer = () => {
    const plan = platform === "cloud" ? <Cloud initMinutes={minutes} initTargets={cloudTargets} /> : <Server initTargets={serverTargets} isUnlimited={isUnlimited} />;
    const planOutput = (
      <Fade in={validate} timeout={2000} mountOnEnter unmountOnExit>
        <Box className="centered">
          <Paper elevation={2} className="price-container">{plan}</Paper>
        </Box>
      </Fade>
    )
    return planOutput
  }
  return (
    <>
      <Container fixed>
        {/*   <TransitionGroup> */}
        <Box component="div" className="space">
          <Typography variant="h4" component="h4">
            Welcome to Pricing guide
          </Typography>
          <Typography variant="body1" component="p">
            Are you Ready, We will help you get the most suitable plan for your business through simple steps
            Follow the guide, Also tryout our NEW Consumption based model for more accurate monthly cost forcasting
          </Typography>
        </Box>
        <Fade in={!(discover || validate)} appear={true} timeout={300} mountOnEnter unmountOnExit >
          <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, sm: 12, md: 12 }} className="space">
            <Grid item xs={12} sm={5} md={6}>
              <Stack direction="row" spacing={1}>
                <Box component="span" className="img-container">
                  <img src={discoverImg} alt="" />
                </Box>
                <Box component="div" className="description">
                  <Typography variant="h5" component="h5">
                    Discover Deployment Options
                  </Typography>
                  <Typography variant="body1" component="p">
                    You need more details about our deployment tools, features and monthly cost , No clear target deployment numbers or minutes
                  </Typography>
                  <Box className="pricing-action" onClick={() => actionHandle(0, discover)} >
                    Compare
                  </Box>
                </Box>
              </Stack>
            </Grid>

            <Grid item xs={12} sm={5} md={6}>
              <Stack direction="row" spacing={2}>
                <Box component="span" className="img-container">
                  <img src={validateImg} alt="" />
                </Box>
                <Box component="div" className="description">
                  <Typography variant="h5" component="h5">
                    Validate Cost
                  </Typography>
                  <Typography variant="body1" component="p">
                    You need to check the monthly cost against your initial data (start with filling your data)
                  </Typography>
                  <Box>
                    {platformsTabs}
                  </Box>

                  <Box className="pricing-action" onClick={() => actionHandle(1, validate)} >
                    Calculate
                  </Box>
                </Box>
              </Stack>

            </Grid>
          </Grid>
        </Fade>
        <Stack direction="row" spacing={2}>
          <Fade in={discover || validate} appear={true} timeout={{ enter: 3800, exit: 10 }} mountOnEnter >
            <Box className="back" onClick={() => backHandle()}> <ArrowBackIcon /></Box>
          </Fade>
          {/* discover */}
          {discover && discoverContainer}
          {/* validate */}
          {validate && validateContainer()}
        </Stack>

      </Container>
      <Features />
    </>
  )
}
export default Pricing