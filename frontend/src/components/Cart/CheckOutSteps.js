import React from 'react'
import { Typography, Stepper, StepLabel, Step } from "@mui/material";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

function CheckOutSteps({ activeStep }) {
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon />
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheckIcon />
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalanceIcon />
        },
    ]

    return (
        <>
            <Stepper alternativeLabel activeStep={activeStep} style={{margin: '.6rem 0'}}>
                {steps.map((item, index) => {
                    return <Step key={index} active={activeStep === index ? true : false} completed={activeStep >= index ? true : false}>

                        <StepLabel icon={item.icon} style={{ color: activeStep >= index ? '#d71c1c' : 'rgba(0, 0, 0, 0.649)' }}>
                            {item.label}

                        </StepLabel>

                    </Step>
                })}


            </Stepper>

        </>
    )
}

export default CheckOutSteps