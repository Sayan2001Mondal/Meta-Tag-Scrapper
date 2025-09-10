import React, { useRef } from "react";
import {
  Box,
  TextField,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  Divider
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ImageIcon from "@mui/icons-material/Image";

const MetaEditor = ({ meta, onChange }) => {
  const fileInputRef = useRef(null);

  const handleChange = (field) => (event) => {
    onChange({ [field]: event.target.value });
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      
      const imageUrl = URL.createObjectURL(file);
      onChange({ image: imageUrl });
      
     
    }
  };

  const getCharacterCount = (text, recommended) => {
    if (!text) return { count: 0, status: 'neutral' };
    const count = text.length;
    if (count < recommended * 0.5) return { count, status: 'low' };
    if (count > recommended) return { count, status: 'high' };
    return { count, status: 'good' };
  };

  const titleCount = getCharacterCount(meta.title, 60);
  const descCount = getCharacterCount(meta.description, 160);

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <EditIcon color="primary" />
        Edit
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Customize how your content appears on search engines and social platforms. 
        Modify the title, description, and image to optimize visibility and engagement.
      </Typography>
      
      <Stack spacing={3}>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Title
          </Typography>
          <TextField
            value={meta.title}
            onChange={handleChange("title")}
            fullWidth
            multiline
            maxRows={2}
            placeholder="World Leader in AI Computing"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Recommended: 60 characters
            </Typography>
            <Chip 
              label={`${titleCount.count} characters`}
              size="small"
              color={titleCount.status === 'good' ? 'success' : titleCount.status === 'high' ? 'error' : 'default'}
              variant="outlined"
            />
          </Stack>
        </Box>
        
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Description
          </Typography>
          <TextField
            value={meta.description}
            onChange={handleChange("description")}
            fullWidth
            multiline
            rows={3}
            placeholder="We create the world's fastest supercomputer and largest gaming platform."
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Recommended: 155 - 160 characters
            </Typography>
            <Chip 
              label={`${descCount.count} characters`}
              size="small"
              color={descCount.status === 'good' ? 'success' : descCount.status === 'high' ? 'error' : 'default'}
              variant="outlined"
            />
          </Stack>
        </Box>
        
        <Divider />
        
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
            <ImageIcon fontSize="small" />
            Image
          </Typography>
          <TextField
            value={meta.image}
            onChange={handleChange("image")}
            fullWidth
            placeholder="Choose OG Image Template"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <Button 
              variant="outlined" 
              startIcon={<ImageIcon />}
              onClick={handleImageUpload}
              sx={{ borderRadius: 2, textTransform: 'none' }}
            >
              Change Image
            </Button>
          </Stack>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Recommended: 1200x630px
          </Typography>
          
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </Box>
        
        {/* <TextField
          label="URL"
          value={meta.url}
          onChange={handleChange("url")}
          fullWidth
          placeholder="https://www.nvidia.com/en-us/"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            }
          }}
        />
        
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <FormControl fullWidth>
            <InputLabel>Content Type</InputLabel>
            <Select
              value={meta.type}
              label="Content Type"
              onChange={handleChange("type")}
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="website">Website</MenuItem>
              <MenuItem value="article">Article</MenuItem>
              <MenuItem value="video">Video</MenuItem>
              <MenuItem value="music">Music</MenuItem>
              <MenuItem value="book">Book</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl fullWidth>
            <InputLabel>Twitter Card</InputLabel>
            <Select
              value={meta.twitter_card}
              label="Twitter Card"
              onChange={handleChange("twitter_card")}
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="summary">Summary</MenuItem>
              <MenuItem value="summary_large_image">Summary Large Image</MenuItem>
              <MenuItem value="app">App</MenuItem>
              <MenuItem value="player">Player</MenuItem>
            </Select>
          </FormControl>
        </Stack> */}
      </Stack>
    </Box>
  );
};

export default MetaEditor;