import * as React from "react";
import Container from '@mui/material/Container';
import features from "../../../resources/Images/pricing_features.jpg";
const Features = () => {
    return (
        <>
            <Container fixed>
                <img src={features} alt="" />
            </Container>
        </>
    )
}
export default Features