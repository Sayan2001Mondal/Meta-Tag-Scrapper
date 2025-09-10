import React from "react";
import {
  Box,
  Typography,
  Button,
  Alert,
  Paper,
  Chip
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
  overflow: 'auto',
  maxHeight: 500,
  lineHeight: 1.6,
  '& .line': {
    display: 'flex',
  },
  '& .line-number': {
    color: '#858585',
    marginRight: theme.spacing(2),
    userSelect: 'none',
    minWidth: '20px',
    textAlign: 'right',
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
  const [copied, setCopied] = React.useState(false);

  const generateMetaTags = () => {
    const tags = [];
    
    // Basic meta tags
    if (meta.title) {
      tags.push(`<title>${meta.title}</title>`);
      tags.push(`<meta name="title" content="${meta.title}" />`);
    }
    if (meta.description) {
      tags.push(`<meta name="description" content="${meta.description}" />`);
    }
    
    // Open Graph tags
    if (meta.title) tags.push(`<meta property="og:title" content="${meta.title}" />`);
    if (meta.description) tags.push(`<meta property="og:description" content="${meta.description}" />`);
    if (meta.image) tags.push(`<meta property="og:image" content="${meta.image}" />`);
    if (meta.url) tags.push(`<meta property="og:url" content="${meta.url}" />`);
    tags.push(`<meta property="og:type" content="${meta.type}" />`);
    
    // Twitter Card tags
    tags.push(`<meta name="twitter:card" content="${meta.twitter_card}" />`);
    if (meta.title) tags.push(`<meta name="twitter:title" content="${meta.title}" />`);
    if (meta.description) tags.push(`<meta name="twitter:description" content="${meta.description}" />`);
    if (meta.image) tags.push(`<meta name="twitter:image" content="${meta.image}" />`);
    
    return tags;
  };

  const formatCodeWithLineNumbers = (tags) => {
    return tags.map((tag, index) => {
      const lineNumber = index + 1;
      let formattedTag = tag;
      
      // Add syntax highlighting
      formattedTag = formattedTag
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/(&lt;\/?[^&\s]+)/g, '<span class="tag">$1</span>')
        .replace(/(name|property|content)=/g, '<span class="attr-name">$1</span>=')
        .replace(/"([^"]*)"/g, '"<span class="attr-value">$1</span>"');
      
      return { lineNumber, content: formattedTag };
    });
  };

  const handleCopy = async () => {
    try {
      const tags = generateMetaTags();
      const metaTagsText = tags.join('\n');
      await navigator.clipboard.writeText(metaTagsText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const tags = generateMetaTags();
  const formattedTags = formatCodeWithLineNumbers(tags);

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
        <Typography variant="body2" sx={{ fontSize: '0.875rem', opacity: 0.9 }}>
          Boost your social CTR by 179% without changing your website! Learn 
          how to test different preview images and text to maximize clicks 
          across all platforms.
        </Typography>
      </NotificationBanner>

      <Box sx={{ position: 'relative' }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 1 
        }}>
          <Chip 
            label="HTML Meta Tags" 
            size="small" 
            sx={{ 
              backgroundColor: '#f5f5f5',
              color: '#666'
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
              minWidth: 120
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
          {formattedTags.slice(0, 2).map((line) => (
            <div key={line.lineNumber} className="line">
              <span className="line-number">{line.lineNumber + 1}</span>
              <span dangerouslySetInnerHTML={{ __html: line.content }} />
            </div>
          ))}
          
          <div className="line">
            <span className="line-number">{formattedTags.length + 2}</span>
            <span className="comment">&lt;!-- Facebook Meta Tags --&gt;</span>
          </div>
          {formattedTags.slice(2, 7).map((line, index) => (
            <div key={line.lineNumber} className="line">
              <span className="line-number">{index + formattedTags.length + 3}</span>
              <span dangerouslySetInnerHTML={{ __html: line.content }} />
            </div>
          ))}
          
          <div className="line">
            <span className="line-number">{formattedTags.length + 8}</span>
            <span className="comment">&lt;!-- Twitter Meta Tags --&gt;</span>
          </div>
          {formattedTags.slice(7).map((line, index) => (
            <div key={line.lineNumber} className="line">
              <span className="line-number">{index + formattedTags.length + 9}</span>
              <span dangerouslySetInnerHTML={{ __html: line.content }} />
            </div>
          ))}
          
          <div className="line">
            <span className="line-number">{formattedTags.length + 13}</span>
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
              fontSize: '0.875rem'
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