
let cheerio;
try {
  cheerio = require('cheerio');
} catch (error) {
  console.log('Cheerio require failed, trying import');
}

import axios from "axios";

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ 
      error: "Method not allowed",
      details: `${req.method} not supported. Use POST.`
    });
  }

  const { url } = req.body;

  // Validate URL
  if (!url) {
    return res.status(400).json({ 
      error: "Missing URL",
      details: "Please provide a url in the request body"
    });
  }

  // Basic URL validation
  try {
    const urlObj = new URL(url);
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return res.status(400).json({
        error: "Invalid URL protocol",
        details: "URL must start with http:// or https://"
      });
    }
  } catch (e) {
    return res.status(400).json({
      error: "Invalid URL format",
      details: "Please provide a valid URL"
    });
  }

  console.log(`[SCRAPE] Starting scrape for: ${url}`);

  try {
    // Check if cheerio is available
    if (!cheerio || !cheerio.load) {
      console.error('[SCRAPE] Cheerio not properly loaded');
      return res.status(500).json({
        error: "Server configuration error",
        details: "HTML parser not available"
      });
    }

  
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; MetaScraper/1.0; +https://example.com/bot)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate",
        "DNT": "1",
        "Connection": "keep-alive",
      },
      timeout: 15000, // 15 second timeout
      maxRedirects: 5,
      validateStatus: function (status) {
        return status >= 200 && status < 400; 
      }
    });

    console.log(`[SCRAPE] Response status: ${response.status}`);
    console.log(`[SCRAPE] Content-Type: ${response.headers['content-type']}`);

    const html = response.data;
    
    // Check if we actually got HTML content
    if (typeof html !== 'string') {
      return res.status(500).json({
        error: "Invalid content type",
        details: "The URL did not return HTML content"
      });
    }

    console.log(`[SCRAPE] HTML length: ${html.length}`);
    console.log(`[SCRAPE] Cheerio available: ${!!cheerio}`);
    console.log(`[SCRAPE] Cheerio.load available: ${!!cheerio.load}`);

    const $ = cheerio.load(html);

    // Extract meta data
    const meta = {};
    
    // Get page title
    const title = $("head title").text().trim();
    if (title) meta.title = title;

    // Extract all meta tags
    $("meta").each((_, el) => {
      const $el = $(el);
      const key = $el.attr("name") || $el.attr("property") || $el.attr("itemprop");
      const value = $el.attr("content");
      if (key && value) {
        meta[key.toLowerCase()] = value.trim();
      }
    });

    console.log(`[SCRAPE] Found ${Object.keys(meta).length} meta tags`);

    // Build structured result with fallbacks
    const result = {
      title: meta["og:title"] || meta["twitter:title"] || meta.title || "",
      description: meta["og:description"] || meta["twitter:description"] || meta.description || "",
      image: meta["og:image"] || meta["twitter:image"] || meta["twitter:image:src"] || "",
      url: meta["og:url"] || url,
      type: meta["og:type"] || "website",
      twitter_card: meta["twitter:card"] || "summary_large_image",
    };

    
    if (result.image && !result.image.startsWith('http')) {
      try {
        const urlObj = new URL(url);
        if (result.image.startsWith('//')) {
          result.image = urlObj.protocol + result.image;
        } else if (result.image.startsWith('/')) {
          result.image = urlObj.origin + result.image;
        } else {
          result.image = urlObj.origin + '/' + result.image;
        }
      } catch (e) {
        console.log('[SCRAPE] Failed to resolve relative image URL:', e.message);
      }
    }

    console.log(`[SCRAPE] Success for ${url}`);
    console.log(`[SCRAPE] Title: ${result.title.substring(0, 50)}...`);

    return res.status(200).json({ 
      scraped: result, 
      raw: meta,
      debug: {
        responseStatus: response.status,
        contentType: response.headers['content-type'],
        metaTagCount: Object.keys(meta).length,
        htmlLength: html.length
      }
    });

  } catch (error) {
    console.error(`[SCRAPE] Error scraping ${url}:`, error.message);
    console.error(`[SCRAPE] Error stack:`, error.stack);
    
    // Provide detailed error information
    let errorDetails = error.message;
    let statusCode = 500;

    if (error.code === 'ENOTFOUND') {
      errorDetails = "Domain not found. Please check the URL.";
      statusCode = 400;
    } else if (error.code === 'ECONNREFUSED') {
      errorDetails = "Connection refused by the server.";
      statusCode = 400;
    } else if (error.code === 'ETIMEDOUT') {
      errorDetails = "Request timed out. The website took too long to respond.";
      statusCode = 408;
    } else if (error.response) {
      statusCode = error.response.status;
      errorDetails = `Server responded with status ${error.response.status}`;
      
      if (error.response.status === 403) {
        errorDetails = "Access forbidden. The website blocked the request.";
      } else if (error.response.status === 404) {
        errorDetails = "Page not found.";
      } else if (error.response.status === 429) {
        errorDetails = "Rate limited. Too many requests to this website.";
      }
    }

    return res.status(statusCode).json({
      error: "Failed to scrape",
      details: errorDetails,
      url: url,
      debug: {
        errorCode: error.code,
        axiosError: !!error.response,
        statusCode: error.response?.status,
        cheerioAvailable: !!cheerio
      }
    });
  }
}