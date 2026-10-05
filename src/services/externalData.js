/**
 * External Data Service
 * Connects directly to external Google Drive JSON files as the single source of truth.
 *
 * Folder: https://drive.google.com/drive/folders/1Wy0fI8J6GbNNNmHGWiyrQeG2TYKa4en_?usp=sharing
 */

export const DRIVE_CONFIG = {
  folderUrl: 'https://drive.google.com/drive/folders/1Wy0fI8J6GbNNNmHGWiyrQeG2TYKa4en_?usp=sharing',
  files: {
    whatWeBuild: {
      url: import.meta.env.VITE_WHAT_WE_BUILD_URL || '',
      id: import.meta.env.VITE_DRIVE_WHAT_WE_BUILD_ID || '1qnDuOaVU1eeMtsF0RGDZrYMpR46K2K0c',
      fileName: 'what-we-build.json'
    },
    whatPeopleSay: {
      url: import.meta.env.VITE_WHAT_PEOPLE_SAY_URL || '',
      id: import.meta.env.VITE_DRIVE_WHAT_PEOPLE_SAY_ID || '1BtahvBru2joXFm-Ae2IhbYyPmipZnWVM',
      fileName: 'what-people-say.json'
    },
    pricing: {
      url: import.meta.env.VITE_PRICING_URL || '',
      id: import.meta.env.VITE_DRIVE_PRICING_ID || '1m8aCkmkVacMGQKOy3HpNewk_bo6IKmgB',
      fileName: 'pricing.json'
    },
    madeByUs: {
      url: import.meta.env.VITE_MADE_BY_US_URL || '',
      id: import.meta.env.VITE_DRIVE_MADE_BY_US_ID || '1xTnsulNLR_lqe1p1cagyYIYnb20_z2bw',
      fileName: 'made-by-us.json'
    }
  }
};

/**
 * Fetch and parse a JSON file directly from Google Drive
 * Uses cache: "no-store" and cache-busting parameters to ensure fresh external data without stale local caches.
 */
export async function fetchDriveJson(key) {
  const fileConfig = DRIVE_CONFIG.files[key];
  if (!fileConfig || (!fileConfig.id && !fileConfig.url)) {
    throw new Error(`${fileConfig?.fileName || key} does not exist or is unavailable in the Google Drive source.`);
  }

  const { id, fileName, url: customUrl } = fileConfig;
  const timestamp = Date.now();

  // URLs to attempt: custom direct URL first, then production proxy endpoint, followed by direct Drive
  const candidateUrls = [
    ...(customUrl ? [customUrl] : []),
    ...(id ? [
      `/api/drive/download?id=${id}&export=download&_t=${timestamp}`,
      `https://drive.usercontent.google.com/download?id=${id}&export=download&_t=${timestamp}`,
      `https://drive.google.com/uc?export=download&id=${id}&_t=${timestamp}`
    ] : [])
  ];

  let lastError = null;

  for (const url of candidateUrls) {
    try {
      const res = await fetch(url, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      });

      if (res.ok) {
        const contentType = res.headers.get('content-type') || '';
        // If Google Drive returns an HTML error page (e.g., deleted or permission denied), treat as error
        if (contentType.includes('text/html')) {
          throw new Error(`Google Drive returned an HTML page instead of JSON for ${fileName}`);
        }
        const data = await res.json();
        return data;
      }
    } catch (err) {
      lastError = err;
    }
  }

  console.error(`Failed to load ${fileName} from Google Drive:`, lastError);
  throw new Error(`Unable to load ${fileName} from Google Drive`);
}

