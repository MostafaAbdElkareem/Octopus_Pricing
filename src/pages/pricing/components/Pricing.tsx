import * as React from "react";
import { useState } from "react";
import Server from "./ServerPricing";
import Cloud from "./CloudPricing";
import Container from '@mui/material/Container';

const Pricing = () => {
    return (
        <Container fixed> 
          <Cloud initMinutes={300}  initTargets={2000}/>
          <Server initTargets={200} isUnlimited={true}/>
        </Container>
    )
}
export default Pricing