

// footer 

import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { blue, grey } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Logo from '../../../public/13329016.webp';    
import Image from 'next/image';

const FooterContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? grey[900] : grey[100],
    padding: theme.spacing(4, 2),
    marginTop: theme.spacing(4),
    textAlign: 'center',
    borderTop: `1px solid ${theme.palette.divider}`,
}));
const IconLink = styled(Link)(({ theme }) => ({
    color: theme.palette.text.primary,
    margin: theme.spacing(0, 1),
    transition: 'color 0.3s',
    '&:hover': {
        color: theme.palette.primary.main,
    },
}));
const Footer = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return (
        <FooterContainer>
            <Box sx={{ mb: 2 }}>
                <Image src={Logo} alt="MetaTag Scraper Logo" width={50} height={50} />
            </Box>
            <Typography variant={isMobile ? "body2" : "body1"} color="textSecondary">
                Built with <FavoriteIcon fontSize="small" color="error" sx={{ verticalAlign: 'middle' }} /> by Sayan Mondal
            </Typography>
            <Box sx={{ mt: 1 }}>

                <IconLink href=" " target="_blank" rel="noopener" aria-label="GitHub">
                    <GitHubIcon fontSize="large" />
                </IconLink>
                <IconLink href=" " target="_blank" rel="noopener" aria-label="Twitter">
                    <TwitterIcon fontSize="large" sx={{ color: blue[500] }} />
                </IconLink>
                <IconLink href=" " target="_blank" rel="noopener" aria-label="LinkedIn">
                    <LinkedInIcon fontSize="large" sx={{ color: blue[700] }} />
                </IconLink>
                <IconLink href="mailto: " target="_blank" rel="noopener" aria-label="Email">
                    <EmailIcon fontSize="large" color="action" />
                </IconLink>
            </Box>
            <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 2 }}>
                &copy; {new Date().getFullYear()} MetaTag Scraper. All rights reserved.
            </Typography>
        </FooterContainer>
    );
}
export default Footer;