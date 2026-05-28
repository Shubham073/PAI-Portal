/**
 * Cookie utility functions for secure token storage
 */

export const cookieUtils = {
  /**
   * Set a cookie with optional expiration and security flags
   */
  setCookie: (name: string, value: string, days: number = 7): void => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    
    // Set cookie with Secure and SameSite flags
    // Note: Secure flag requires HTTPS in production
    const isSecure = window.location.protocol === 'https:';
    const cookieString = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/; SameSite=Strict${isSecure ? '; Secure' : ''}`;
    
    document.cookie = cookieString;
  },

  /**
   * Get a cookie value by name
   */
  getCookie: (name: string): string | null => {
    const nameEQ = name + '=';
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
      }
    }
    return null;
  },

  /**
   * Delete a cookie by name
   */
  deleteCookie: (name: string): void => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`;
  },

  /**
   * Check if a cookie exists
   */
  hasCookie: (name: string): boolean => {
    return cookieUtils.getCookie(name) !== null;
  },
};
