import React from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Stack,
  Typography,
  Paper,
  IconButton,
  Alert
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import MetaEditor from "../components/MetaEditor";
import Preview from "../components/Preview";
import CopySection from "../components/CopySection";

const GradientHeader = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  padding: theme.spacing(6, 0),
  borderRadius: '0 0 32px 32px',
  marginBottom: theme.spacing(4),
}));

const StyledCard = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  padding: theme.spacing(3),
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  border: '1px solid rgba(0,0,0,0.08)',
}));

// Simple URL validation
function isValidUrl(str) {
  try {
    const u = new URL(str);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch (e) {
    return false;
  }
}

// Main Page Component
export default function Home() {
  const [url, setUrl] = React.useState("");
  const [error, setError] = React.useState("");
  const [meta, setMeta] = React.useState({
    title: "",
    description: "",
    image: "",
    url: "",
    type: "website",
    twitter_card: "summary_large_image"
  });

  const mutation = useMutation({
    mutationFn: async (target) => {
      const resp = await axios.post("/api/scrape", { url: target });
      return resp.data;
    },
    onSuccess: (data) => {
      if (data?.scraped) {
        setMeta((m) => ({ ...m, ...data.scraped }));
        setError("");
      } else {
        setError("No meta data returned");
      }
    },
    onError: (err) => {
      setError(err?.response?.data?.error || err.message || "Failed to scrape");
    }
  });

  const handleCheck = () => {
    setError("");
    if (!isValidUrl(url)) {
      setError("Please enter a valid URL (include http:// or https://)");
      return;
    }
    mutation.mutate(url);
  };

  const handleUpdateMeta = (updates) => {
    setMeta((prev) => ({ ...prev, ...updates }));
  };

  const handleReset = () => {
    setUrl("");
    setMeta({
      title: "",
      description: "",
      image: "",
      url: "",
      type: "website",
      twitter_card: "summary_large_image"
    });
    setError("");
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      <GradientHeader>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
            Meta Tag Generator
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 600 }}>
            Generate beautiful meta tags for your website. Improve your social media sharing and SEO with optimized Open Graph and Twitter Card tags.
          </Typography>
        </Container>
      </GradientHeader>

      <Container maxWidth="xl" sx={{ pb: 6 }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', lg: 'row' }, 
          gap: 4,
          alignItems: 'flex-start' 
        }}>
          
          {/* Left Column - Input and Edit */}
          <Box sx={{ flex: 1, maxWidth: { lg: '500px' } }}>
            <StyledCard sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <SearchIcon color="primary" />
                Scrape Website
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Enter a website URL to automatically extract its meta tags, then customize them below.
              </Typography>
              
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <TextField
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  fullWidth
                  size="small"
                  label="Website URL"
                  error={Boolean(error)}
                />
                <Button
                  variant="contained"
                  onClick={handleCheck}
                  disabled={mutation.isLoading}
                  sx={{ minWidth: 120, borderRadius: 2 }}
                >
                  {mutation.isLoading ? "Scraping..." : "Scrape"}
                </Button>
                <IconButton onClick={handleReset} aria-label="reset">
                  <RefreshIcon />
                </IconButton>
              </Stack>
              
              {error && (
                <Alert severity="error" sx={{ borderRadius: 2 }}>
                  {error}
                </Alert>
              )}
            </StyledCard>

            <StyledCard>
              <MetaEditor meta={meta} onChange={handleUpdateMeta} />
            </StyledCard>
          </Box>

          {/* Middle Column - Code */}
          <Box sx={{ flex: 1, maxWidth: { lg: '600px' } }}>
            <StyledCard>
              <CopySection meta={meta} />
            </StyledCard>
          </Box>

          {/* Right Column - Preview */}
          <Box sx={{ flex: 1, maxWidth: { lg: '500px' } }}>
            <StyledCard>
              <Preview meta={meta} />
            </StyledCard>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}