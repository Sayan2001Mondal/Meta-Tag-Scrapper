import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Alert,
  Paper,
  Chip,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CodeIcon from "@mui/icons-material/Code";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const CodeBlock = styled(Box)(({ theme }) => ({
  backgroundColor: '#1e1e1e',
  color: '#d4d4d4',
  padding: theme.spacing(2),
  borderRadius: 12,
  fontFamily: 'Monaco, Consolas, "Courier New", monospace',
  fontSize: '0.875rem',
  overflowX: 'auto',
  maxHeight: 500,
  lineHeight: 1.6,
  '& .line': {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  '& .line-number': {
    color: '#858585',
    marginRight: theme.spacing(1),
    userSelect: 'none',
    minWidth: '20px',
    textAlign: 'right',
    flexShrink: 0,
  },
  '& .tag': { color: '#569cd6' },
  '& .attr-name': { color: '#92c5f8' },
  '& .attr-value': { color: '#ce9178' },
  '& .comment': { color: '#6a9955', fontStyle: 'italic' },
}));

const NotificationBanner = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(90deg, #ff6b35 0%, #f7931e 100%)',
  color: 'white',
  padding: theme.spacing(2),
  borderRadius: 12,
  marginBottom: theme.spacing(2),
}));

const CopySection = ({ meta }) => {
  const [copied, setCopied] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  
  const safeMeta = {
    title: meta.title || "",
    description: meta.description || "",
    image: meta.image || "",
    url: meta.url || "",
    type: meta.type || "website",
    twitter_card: meta.twitter_card || "summary",
  };

  const generateMetaTags = () => {
    const tags = [];

    if (safeMeta.title) {
      tags.push({ type: 'title', value: safeMeta.title });
      tags.push({ type: 'meta', name: 'title', value: safeMeta.title });
    }
    if (safeMeta.description) {
      tags.push({ type: 'meta', name: 'description', value: safeMeta.description });
    }
    if (safeMeta.title) tags.push({ type: 'meta', property: 'og:title', value: safeMeta.title });
    if (safeMeta.description) tags.push({ type: 'meta', property: 'og:description', value: safeMeta.description });
    if (safeMeta.image) tags.push({ type: 'meta', property: 'og:image', value: safeMeta.image });
    if (safeMeta.url) tags.push({ type: 'meta', property: 'og:url', value: safeMeta.url });
    tags.push({ type: 'meta', property: 'og:type', value: safeMeta.type });

    tags.push({ type: 'meta', name: 'twitter:card', value: safeMeta.twitter_card });
    if (safeMeta.title) tags.push({ type: 'meta', name: 'twitter:title', value: safeMeta.title });
    if (safeMeta.description) tags.push({ type: 'meta', name: 'twitter:description', value: safeMeta.description });
    if (safeMeta.image) tags.push({ type: 'meta', name: 'twitter:image', value: safeMeta.image });

    return tags;
  };

  const handleCopy = async () => {
    try {
      const tags = generateMetaTags();
      const text = tags.map(tag => {
        if (tag.type === 'title') return `<title>${tag.value}</title>`;
        if (tag.property) return `<meta property="${tag.property}" content="${tag.value}" />`;
        return `<meta name="${tag.name}" content="${tag.value}" />`;
      }).join('\n');

      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const tags = generateMetaTags();

  const renderTag = (tag) => {
    if (tag.type === 'title') {
      return (
        <>
          &lt;<span className="tag">title</span>&gt;
          <span>{tag.value}</span>
          &lt;/<span className="tag">title</span>&gt;
        </>
      );
    } else if (tag.property) {
      return (
        <>
          &lt;<span className="tag">meta</span> <span className="attr-name">property</span>="<span className="attr-value">{tag.property}</span>" <span className="attr-name">content</span>="<span className="attr-value">{tag.value}</span>" /&gt;
        </>
      );
    } else {
      return (
        <>
          &lt;<span className="tag">meta</span> <span className="attr-name">name</span>="<span className="attr-value">{tag.name}</span>" <span className="attr-name">content</span>="<span className="attr-value">{tag.value}</span>" /&gt;
        </>
      );
    }
  };

  return (
    <Box>
      <Typography variant={isMobile ? "subtitle1" : "h6"} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CodeIcon color="primary" />
        Copy
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Copy the HTML meta tags for your site. Insert these tags in your site's head
        section for improved social sharing and SEO.
      </Typography>

      <NotificationBanner elevation={0}>
        <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
          NEW: A/B Test Your Open Graph Tags
        </Typography>
        <Typography variant="body2" sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem', opacity: 0.9 }}>
          Boost your social CTR by 179% without changing your website! Learn
          how to test different preview images and text to maximize clicks
          across all platforms.
        </Typography>
      </NotificationBanner>

      <Box sx={{ position: 'relative' }}>
        <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Chip
            label="HTML Meta Tags"
            size="small"
            sx={{
              backgroundColor: '#f5f5f5',
              color: '#666',
              mb: isMobile ? 1 : 0
            }}
          />
          <Button
            size="small"
            startIcon={<ContentCopyIcon />}
            onClick={handleCopy}
            variant={copied ? "contained" : "outlined"}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              minWidth: 120,
              alignSelf: isMobile ? 'flex-start' : 'auto'
            }}
            color={copied ? "success" : "primary"}
          >
            {copied ? "Copied!" : "Copy To Clipboard"}
          </Button>
        </Box>

        <CodeBlock>
          <div className="line">
            <span className="line-number">1</span>
            <span className="comment">&lt;!-- HTML Meta Tags --&gt;</span>
          </div>
          {tags.map((tag, idx) => (
            <div key={idx} className="line">
              <span className="line-number">{idx + 2}</span>
              {renderTag(tag)}
            </div>
          ))}
          <div className="line">
            <span className="line-number">{tags.length + 2}</span>
            <span className="comment">&lt;!-- Meta Tags Generated via https://www.opengraph.xyz --&gt;</span>
          </div>
        </CodeBlock>
      </Box>

      {copied && (
        <Alert
          severity="success"
          sx={{
            mt: 2,
            borderRadius: 2,
            '& .MuiAlert-message': {
              fontSize: isMobile ? '0.75rem' : '0.875rem'
            }
          }}
        >
          Meta tags copied to clipboard!
        </Alert>
      )}
    </Box>
  );
};

export default CopySection;
