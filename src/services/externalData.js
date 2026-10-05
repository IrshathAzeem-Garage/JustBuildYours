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

let folderFilesMapPromise = null;
let lastFolderFetchTime = 0;
const FOLDER_MAP_TTL = 30000; // 30 seconds cache for folder directory discovery

/**
 * Dynamically queries the Google Drive folder to discover current file IDs in real-time.
 * If a file was replaced, re-uploaded, or deleted, this discovers the new ID automatically.
 */
async function getFolderFilesMap() {
  const now = Date.now();
  if (folderFilesMapPromise && now - lastFolderFetchTime < FOLDER_MAP_TTL) {
    return folderFilesMapPromise;
  }

  folderFilesMapPromise = (async () => {
    const timestamp = Date.now();
    const folderUrls = [
      `/api/drive-folder?_t=${timestamp}`,
      `https://drive.google.com/embeddedfolderview?id=1Wy0fI8J6GbNNNmHGWiyrQeG2TYKa4en_&_t=${timestamp}`
    ];

    for (const url of folderUrls) {
      try {
        const res = await fetch(url, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        });

        if (res.ok) {
          const html = await res.text();
          const map = {};
          // Match id="entry-[FILE_ID]" and flip-entry-title">[FILE_NAME]</div>
          const regex = /id=["']entry-([a-zA-Z0-9_-]+)["'][\s\S]*?class=["']flip-entry-title["']>([^<]+)<\/div>/g;
          let match;
          while ((match = regex.exec(html)) !== null) {
            const fileId = match[1];
            const fileName = match[2].trim().toLowerCase();
            map[fileName] = fileId;
          }

          if (Object.keys(map).length > 0) {
            lastFolderFetchTime = Date.now();
            return map;
          }
        }
      } catch (err) {
        // Fall back to candidate or static default IDs
      }
    }

    return null;
  })();

  return folderFilesMapPromise;
}

/**
 * Fetch and parse a JSON file directly from Google Drive
 * Uses cache: "no-store" and cache-busting parameters to ensure fresh external data without stale local caches.
 */
export async function fetchDriveJson(key) {
  const fileConfig = DRIVE_CONFIG.files[key];
  if (!fileConfig) {
    throw new Error(`Unknown endpoint key: ${key}`);
  }

  const { fileName, url: customUrl } = fileConfig;
  let activeId = fileConfig.id;

  // 1. Dynamic Auto-Discovery from Google Drive folder
  try {
    const folderMap = await getFolderFilesMap();
    if (folderMap) {
      const discoveredId = folderMap[fileName.toLowerCase()];
      if (discoveredId) {
        activeId = discoveredId;
      } else {
        // If folder was successfully read and this file does not exist in it, it was deleted!
        throw new Error(`${fileName} is deleted or unavailable in Google Drive folder.`);
      }
    }
  } catch (discoveryErr) {
    if (discoveryErr.message && discoveryErr.message.includes('is deleted or unavailable')) {
      throw discoveryErr;
    }
    // Otherwise gracefully fall back to activeId
  }

  if (!activeId && !customUrl) {
    throw new Error(`${fileName} does not exist or is unavailable in the Google Drive source.`);
  }

  const timestamp = Date.now();

  // URLs to attempt: custom direct URL first, then production proxy endpoint, followed by direct Drive
  const candidateUrls = [
    ...(customUrl ? [customUrl] : []),
    ...(activeId ? [
      `/api/drive/download?id=${activeId}&export=download&_t=${timestamp}`,
      `https://drive.usercontent.google.com/download?id=${activeId}&export=download&_t=${timestamp}`,
      `https://drive.google.com/uc?export=download&id=${activeId}&_t=${timestamp}`
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

