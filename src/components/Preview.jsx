import React from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Tabs,
  Tab,
  Avatar,
  Chip
} from "@mui/material";
import { styled } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";

const SocialPreview = styled(Card)(({ theme }) => ({
  maxWidth: 500,
  margin: '0 auto',
  borderRadius: 12,
  overflow: 'hidden',
  boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
  border: '1px solid rgba(0,0,0,0.1)',
}));

const FacebookPreview = styled(SocialPreview)(({ theme }) => ({
  backgroundColor: '#ffffff',
  '& .facebook-header': {
    padding: theme.spacing(2),
    borderBottom: '1px solid #e4e6ea',
    backgroundColor: '#f0f2f5',
  },
  '& .facebook-content': {
    backgroundColor: '#f2f3f5',
    borderTop: '1px solid #dadde1',
  }
}));

const TwitterPreview = styled(SocialPreview)(({ theme }) => ({
  border: '1px solid #e1e8ed',
  backgroundColor: '#ffffff',
}));

const LinkedInPreview = styled(SocialPreview)(({ theme }) => ({
  border: '1px solid #e0e0e0',
  backgroundColor: '#ffffff',
}));

const Preview = ({ meta }) => {
  const [tab, setTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const getHostname = (url) => {
    try {
      return new URL(url || 'https://example.com').hostname.toLowerCase();
    } catch {
      return 'example.com';
    }
  };

  const FacebookCard = () => (
    <FacebookPreview>
      <Box className="facebook-header">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar 
            sx={{ width: 20, height: 20, backgroundColor: '#1877f2', fontSize: '0.75rem' }}>
            F
          </Avatar>
          <Typography variant="body2" sx={{ fontWeight: 500, color: '#1c1e21' }}>
            Facebook
          </Typography>
          <Chip 
            label="Preview" 
            size="small" 
            sx={{ 
              backgroundColor: '#e3f2fd',
              color: '#1976d2',
              height: 20,
              fontSize: '0.7rem'
            }} 
          />
        </Stack>
      </Box>
      {meta.image && (
        <CardMedia
          component="img"
          height="260"
          image={meta.image}
          alt={meta.title}
          sx={{ objectFit: "cover" }}
        />
      )}
      <CardContent className="facebook-content" sx={{ p: 2 }}>
        <Typography
          variant="caption"
          sx={{ 
            color: "#65676b", 
            textTransform: "uppercase", 
            fontSize: "0.75rem",
            fontWeight: 500,
            letterSpacing: 0.5
          }}
        >
          {getHostname(meta.url)}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ 
            fontWeight: 600, 
            color: "#1c1e21", 
            lineHeight: 1.2, 
            mt: 0.5,
            fontSize: '1rem'
          }}
        >
          {meta.title || "World Leader in AI Computing"}
        </Typography>
        <Typography
          variant="body2"
          sx={{ 
            color: "#65676b", 
            mt: 0.5, 
            lineHeight: 1.3,
            fontSize: '0.875rem'
          }}
        >
          {meta.description || "We create the world's fastest supercomputer and largest gaming platform"}
        </Typography>
      </CardContent>
    </FacebookPreview>
  );

  const TwitterCard = () => (
    <TwitterPreview>
      <Box sx={{ p: 2, borderBottom: '1px solid #e1e8ed' }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar 
            sx={{ width: 20, height: 20, backgroundColor: '#1da1f2', fontSize: '0.75rem' }}>
            T
          </Avatar>
          <Typography variant="body2" sx={{ fontWeight: 500, color: '#0f1419' }}>
            X (Formerly Twitter)
          </Typography>
          <Chip 
            label="Preview" 
            size="small" 
            sx={{ 
              backgroundColor: '#e3f2fd',
              color: '#1976d2',
              height: 20,
              fontSize: '0.7rem'
            }} 
          />
        </Stack>
      </Box>
      {meta.image && (
        <CardMedia
          component="img"
          height="250"
          image={meta.image}
          alt={meta.title}
          sx={{ objectFit: "cover" }}
        />
      )}
      <CardContent sx={{ p: 2 }}>
        <Typography
          variant="body2"
          sx={{ 
            color: "#536471", 
            fontSize: "0.875rem", 
            mb: 1,
            fontWeight: 400
          }}
        >
          {getHostname(meta.url)}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ 
            fontWeight: 700, 
            color: "#0f1419", 
            lineHeight: 1.2,
            fontSize: '0.95rem'
          }}
        >
          {meta.title || "World Leader in AI Computing"}
        </Typography>
        <Typography
          variant="body2"
          sx={{ 
            color: "#536471", 
            mt: 0.5, 
            lineHeight: 1.3,
            fontSize: '0.875rem'
          }}
        >
          {meta.description || "We create the world's fastest supercomputer and largest gaming platform"}
        </Typography>
      </CardContent>
    </TwitterPreview>
  );

  const LinkedInCard = () => (
    <LinkedInPreview>
      <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar 
            sx={{ width: 20, height: 20, backgroundColor: '#0077b5', fontSize: '0.75rem' }}>
            in
          </Avatar>
          <Typography variant="body2" sx={{ fontWeight: 500, color: '#000000e6' }}>
            LinkedIn
          </Typography>
          <Chip 
            label="Preview" 
            size="small" 
            sx={{ 
              backgroundColor: '#e3f2fd',
              color: '#1976d2',
              height: 20,
              fontSize: '0.7rem'
            }} 
          />
        </Stack>
      </Box>
      {meta.image && (
        <CardMedia
          component="img"
          height="200"
          image={meta.image}
          alt={meta.title}
          sx={{ objectFit: "cover" }}
        />
      )}
      <CardContent sx={{ p: 2, backgroundColor: "#fff" }}>
        <Typography
          variant="subtitle1"
          sx={{ 
            fontWeight: 600, 
            color: "#000000e6", 
            lineHeight: 1.2,
            fontSize: '0.95rem'
          }}
        >
          {meta.title || "World Leader in AI Computing"}
        </Typography>
        <Typography
          variant="body2"
          sx={{ 
            color: "#00000099", 
            mt: 1, 
            lineHeight: 1.3,
            fontSize: '0.875rem'
          }}
        >
          {meta.description || "We create the world's fastest supercomputer and largest gaming platform"}
        </Typography>
        <Typography
          variant="caption"
          sx={{ 
            color: "#00000099", 
            fontSize: "0.75rem", 
            mt: 1, 
            display: "block" 
          }}
        >
          {getHostname(meta.url)}
        </Typography>
      </CardContent>
    </LinkedInPreview>
  );

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <VisibilityIcon color="primary" />
        Preview
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        See how your website will look on social media platforms. This live preview 
        ensures your metadata aligns with your content and branding.
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs 
          value={tab} 
          onChange={handleTabChange}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
            }
          }}
        >
          <Tab label="Facebook" />
          <Tab label="X (Formerly Twitter)" />
          <Tab label="LinkedIn" />
        </Tabs>
      </Box>
      
      <Box>
        {tab === 0 && <FacebookCard />}
        {tab === 1 && <TwitterCard />}
        {tab === 2 && <LinkedInCard />}
      </Box>

      <Box sx={{ mt: 3, p: 2, backgroundColor: '#f8f9fa', borderRadius: 2 }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
          Platform Details:
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Chip 
            label={`Type: ${meta.type}`} 
            size="small" 
            variant="outlined"
            sx={{ backgroundColor: 'white' }}
          />
          <Chip 
            label={`Twitter Card: ${meta.twitter_card}`} 
            size="small" 
            variant="outlined"
            sx={{ backgroundColor: 'white' }}
          />
          {meta.image && (
            <Chip 
              label="Has Image" 
              size="small" 
              color="success"
              variant="outlined"
              sx={{ backgroundColor: 'white' }}
            />
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default Preview;