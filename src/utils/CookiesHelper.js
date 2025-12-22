
const isBrowser = () => typeof document !== "undefined";

export function getCookie(name) {
  if (!isBrowser()) return null;
  
  const nameEQ = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(';');
  
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      const value = cookie.substring(nameEQ.length, cookie.length);
      
      try {
        if (!value || value === "undefined" || value === "null" || value === "NaN") {
          console.warn(`Invalid value in ${name} cookie:`, value);
          clearSpecificCookie(name);
          return null;
        }
        
        const parsedValue = JSON.parse(value);
        return parsedValue;
        
      } catch (error) {
        return value;
      }
    }
  }
  return null;
}

// --------------------------------------------------
// COMMON PARSER FOR ALL TOKEN FUNCTIONS
// --------------------------------------------------
export function parseCookieValue(value) {
  if (!value) return null;

  // remove surrounding quotes
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }

  // remove bearer
  if (value.toLowerCase().startsWith("bearer ")) {
    value = value.substring(7).trim();
  }

  return value.trim();
}

// --------------------------------------------------
// getBarkToken
// --------------------------------------------------
export function getBarkToken() {
    if (!isBrowser()) return null;

  const name = "barkToken=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const parts = decodedCookie.split(";");

  for (let part of parts) {
    part = part.trim();
    if (part.startsWith(name)) {
      let value = part.substring(name.length);

      // Remove double or single quotes if wrapped
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1); // remove first & last quote
      }

      return value.trim();
    }
  }

  return null;
}

// --------------------------------------------------
// getRequestToken
// --------------------------------------------------
export function getRequestToken() {
  if (!isBrowser()) return null;

  const raw = getCookie("requestToken");
  return parseCookieValue(raw);
}

// --------------------------------------------------
// getCreateRequestToken
// --------------------------------------------------
export function getCreateRequestToken() {
  if (!isBrowser()) return null;

  const raw = getCookie("createRequestToken");
  return parseCookieValue(raw);
}

// --------------------------------------------------
// getCreateRequest
// --------------------------------------------------
export function getcreateRequest() {
  if (!isBrowser()) return null;

  const raw = getCookie("createRequest");
  return parseCookieValue(raw);
}

// --------------------------------------------------
// getRegisterTokens
// --------------------------------------------------
export function getRegisterTokens() {
  if (!isBrowser()) return null;

  const raw = getCookie("registerTokens");
  return parseCookieValue(raw);
}

// --------------------------------------------------
// barkUserToken → JSON.parse (MAIN FIX)
// --------------------------------------------------
export function getBarkUserData() {
  if (!isBrowser()) return null;

  // Use getCookie instead of direct cookie access
  const raw = getCookie("barkUserToken");
  
  // getCookie already handles JSON parsing and invalid values
  // So just return whatever getCookie returns
  return raw;
}

// --------------------------------------------------
// CLEAR MULTIPLE COOKIES
// --------------------------------------------------
export function clearCookies() {
   if (!isBrowser()) return;
  
  // Clear specific cookies you know about
  const cookiesToClear = ['barkToken', 'barkUserToken', 'session', 'token'];
  
  cookiesToClear.forEach(cookieName => {
    // Try multiple domain/path combinations
    const domains = [null, '127.0.0.1', 'localhost'];
    const paths = ['/', '/en', ''];
    
    domains.forEach(domain => {
      paths.forEach(path => {
        let cookieString = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
        
        if (path) cookieString += ` path=${path};`;
        if (domain) cookieString += ` domain=${domain};`;
        
        document.cookie = cookieString;
      });
    });
  });
  
  // Also try to clear all accessible cookies
  document.cookie.split(';').forEach(cookie => {
    const name = cookie.split('=')[0].trim();
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  });
}

// --------------------------------------------------
// SET COOKIE
// --------------------------------------------------
export function setCookie(key, value, days = 1) {
  if (!isBrowser()) return null;
  if (!key) return;

  // remove wrapping quotes
  if (
    typeof value === "string" &&
    ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'")))
  ) {
    value = value.slice(1, -1);
  }

  // stringify object
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }

  // expiry
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;

  // set cookie
  document.cookie = `${key}=${encodeURIComponent(
    value
  )}; ${expires}; path=/; SameSite=Lax`;

  return true;
}

// --------------------------------------------------
// HELPER FUNCTION: Clear Specific Cookie
// --------------------------------------------------
function clearSpecificCookie(name) {
  if (!isBrowser()) return;
  
  const domains = [null, '127.0.0.1', 'localhost'];
  const paths = ['/', '/en', ''];
  
  domains.forEach(domain => {
    paths.forEach(path => {
      let cookieString = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
      if (path) cookieString += ` path=${path};`;
      if (domain) cookieString += ` domain=${domain};`;
      
      document.cookie = cookieString;
    });
  });
}