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

  // Reusable Social Card
  const SocialCard = ({ platform, color, icon, title, description }) => (
    <SocialPreview>
      <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar sx={{ width: 24, height: 24, backgroundColor: color }}>
            {icon}
          </Avatar>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {platform}
          </Typography>
          <Chip
            label="Preview"
            size="small"
            sx={{
              backgroundColor: color + "22",
              color,
              height: 20,
              fontSize: "0.7rem",
            }}
          />
        </Stack>
      </Box>

      {meta.image && (
        <CardMedia
          component="img"
          image={meta.image}
          alt={`${platform} preview`}
          sx={{
            width: "100%",
            maxHeight: 250,
            objectFit: "cover",
          }}
        />
      )}

      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {meta.title || title}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
          {meta.description || description}
        </Typography>
        <Typography variant="caption" sx={{ color: "#555", mt: 1, display: "block" }}>
          {getHostname(meta.url)}
        </Typography>
      </CardContent>
    </SocialPreview>
  );

  const previews = [
    {
      platform: "Facebook",
      color: "#1877f2",
      icon: <FaFacebook size={14} color="white" />,
      title: "Default Facebook Title",
      description: "Default description for Facebook preview.",
    },
    {
      platform: "X (Twitter)",
      color: "#1da1f2",
      icon: <FaTwitter size={14} color="white" />,
      title: "Default Twitter Title",
      description: "Default description for Twitter preview.",
    },
    {
      platform: "Discord",
      color: "#5865f2",
      icon: <FaDiscord size={14} color="white" />,
      title: "Default Discord Embed",
      description: "Default description for Discord preview.",
    },
    {
      platform: "Instagram",
      color: "#E1306C",
      icon: <FaInstagram size={14} color="white" />,
      title: "Default Instagram Title",
      description: "Default description for Instagram preview.",
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
            {previews.map((p) => (
              <Tab key={p.platform} label={p.platform} />
            ))}
          </Tabs>

          <Box sx={{ mt: 2 }}>
            <SocialCard {...previews[tab]} />
          </Box>
        </>
      )}

      {/* Mobile → Stack all previews */}
      {isMobile && (
        <Box>
          {previews.map((p) => (
            <SocialCard key={p.platform} {...p} />
          ))}
        </Box>
      )}
    </Box>
  );
}
