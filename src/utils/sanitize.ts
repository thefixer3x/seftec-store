
import DOMPurify from 'dompurify';

export const sanitizeHTML = (html: string): {__html: string} => {
  return {
    __html: DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'h2', 'h3', 'ul', 'li', 'br', 'ol'],
      ALLOWED_ATTR: ['class'],
      ALLOW_DATA_ATTR: false
    })
  };
};
