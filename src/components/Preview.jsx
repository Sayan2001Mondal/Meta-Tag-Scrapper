"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Avatar,
  Chip,
  Tabs,
  Tab,
  Stack,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FaFacebook, FaTwitter, FaDiscord, FaInstagram } from "react-icons/fa";

const SocialPreview = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  width: "100%",
  margin: "16px auto",
  boxShadow: theme.shadows[3],
  borderRadius: 12,
}));

function getHostname(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
}

export default function Preview({ meta }) {
  const [tab, setTab] = useState(0);
  const handleTabChange = (_, newValue) => setTab(newValue);
  const isMobile = useMediaQuery("(max-width:600px)");

  
  const FacebookCard = ({ platform, color, icon }) => (
    <SocialPreview>
      <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar sx={{ width: 24, height: 24, backgroundColor: color }}>
            {icon}
          </Avatar>
          <Typography variant="body2" fontWeight={500}>
            {platform}
          </Typography>
        </Stack>
      </Box>
      {meta.image && (
        <CardMedia component="img" image={meta.image} alt="Facebook preview" />
      )}
      <CardContent>
        <Typography variant="h6">{meta.title || "Facebook Title"}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {meta.description || "Default Facebook description."}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {getHostname(meta.url)}
        </Typography>
      </CardContent>
    </SocialPreview>
  );

  
  const TwitterCard = ({ platform, color, icon }) => (
    <SocialPreview>
      <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar sx={{ width: 24, height: 24, backgroundColor: color }}>
            {icon}
          </Avatar>
          <Typography variant="body2" fontWeight={500}>
            {platform}
          </Typography>
        </Stack>
      </Box>
      <Stack direction="row" spacing={2} sx={{ p: 2 }}>
        {meta.image && (
          <CardMedia
            component="img"
            image={meta.image}
            alt="Twitter preview"
            sx={{
              width: 100,
              height: 100,
              borderRadius: 2,
              objectFit: "cover",
            }}
          />
        )}
        <Box>
          <Typography variant="subtitle1" fontWeight={600}>
            {meta.title || "Twitter Title"}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5, mb: 1 }}
          >
            {meta.description || "Default Twitter description."}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {getHostname(meta.url)}
          </Typography>
        </Box>
      </Stack>
    </SocialPreview>
  );

  
  const DiscordCard = ({ platform, color, icon }) => (
    <SocialPreview>
      <Box
        sx={{
          display: "flex",
          borderLeft: `6px solid ${color}`,
        }}
      >
        <Box sx={{ flex: 1, p: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar sx={{ width: 24, height: 24, backgroundColor: color }}>
              {icon}
            </Avatar>
            <Typography variant="body2" fontWeight={500}>
              {platform}
            </Typography>
          </Stack>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mt: 1 }}>
            {meta.title || "Discord Embed"}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {meta.description || "Default Discord description."}
          </Typography>
          {meta.image && (
            <CardMedia
              component="img"
              image={meta.image}
              alt="Discord preview"
              sx={{ mt: 1, borderRadius: 2, maxHeight: 200, objectFit: "cover" }}
            />
          )}
        </Box>
      </Box>
    </SocialPreview>
  );

  
  const InstagramCard = ({ platform, color, icon }) => (
    <SocialPreview>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar sx={{ width: 24, height: 24, backgroundColor: color }}>
            {icon}
          </Avatar>
          <Typography variant="body2" fontWeight={500}>
            {platform}
          </Typography>
        </Stack>
      </Box>
      {meta.image && (
        <CardMedia
          component="img"
          image={meta.image}
          alt="Instagram preview"
          sx={{ maxHeight: 400, objectFit: "cover" }}
        />
      )}
      <CardContent>
        <Typography variant="subtitle1" fontWeight={600}>
          {meta.title || "Instagram Post"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {meta.description || "Default Instagram description."}
        </Typography>
      </CardContent>
    </SocialPreview>
  );

  const platforms = [
    {
      platform: "Facebook",
      color: "#1877f2",
      icon: <FaFacebook size={14} color="white" />,
      component: FacebookCard,
    },
    {
      platform: "X (Twitter)",
      color: "#1da1f2",
      icon: <FaTwitter size={14} color="white" />,
      component: TwitterCard,
    },
    {
      platform: "Discord",
      color: "#5865f2",
      icon: <FaDiscord size={14} color="white" />,
      component: DiscordCard,
    },
    {
      platform: "Instagram",
      color: "#E1306C",
      icon: <FaInstagram size={14} color="white" />,
      component: InstagramCard,
    },
  ];

  return (
    <Box sx={{ width: "100%", mt: 3 }}>
      {/* Desktop/Tablet → Tabs */}
      {!isMobile && (
        <>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 500,
              },
            }}
          >
            {platforms.map((p) => (
              <Tab key={p.platform} label={p.platform} />
            ))}
          </Tabs>

          <Box sx={{ mt: 2 }}>
            {React.createElement(platforms[tab].component, platforms[tab])}
          </Box>
        </>
      )}

      
      {isMobile && (
        <Box>
          {platforms.map((p) =>
            React.createElement(p.component, { key: p.platform, ...p })
          )}
        </Box>
      )}
    </Box>
  );
}
