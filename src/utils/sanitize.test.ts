import { describe, it, expect } from 'vitest';
import { sanitizeHTML } from './sanitize';

describe('sanitizeHTML', () => {
  describe('XSS Prevention', () => {
    it('should remove <script> tags from input', () => {
      const maliciousInput = '<script>alert("XSS")</script><p>Safe content</p>';
      const result = sanitizeHTML(maliciousInput);
      expect(result.__html).not.toContain('<script>');
      expect(result.__html).not.toContain('alert');
      expect(result.__html).toContain('<p>Safe content</p>');
    });

    it('should remove event handlers like onclick', () => {
      const maliciousInput = '<p onclick="alert(\'XSS\')">Click me</p>';
      const result = sanitizeHTML(maliciousInput);
      expect(result.__html).not.toContain('onclick');
      expect(result.__html).toContain('Click me');
    });

    it('should remove onerror event handlers', () => {
      const maliciousInput = '<img src="invalid" onerror="alert(\'XSS\')">';
      const result = sanitizeHTML(maliciousInput);
      expect(result.__html).not.toContain('onerror');
      expect(result.__html).not.toContain('alert');
    });

    it('should remove javascript: URLs', () => {
      const maliciousInput = '<a href="javascript:alert(\'XSS\')">Click</a>';
      const result = sanitizeHTML(maliciousInput);
      expect(result.__html).not.toContain('javascript:');
      expect(result.__html).not.toContain('alert');
    });

    it('should remove data: URLs with scripts', () => {
      const maliciousInput = '<a href="data:text/html,<script>alert(\'XSS\')</script>">Click</a>';
      const result = sanitizeHTML(maliciousInput);
      expect(result.__html).not.toContain('data:');
      expect(result.__html).not.toContain('<script>');
    });

    it('should sanitize nested malicious content', () => {
      const maliciousInput = '<p><script>alert("XSS")</script><strong>Safe</strong></p>';
      const result = sanitizeHTML(maliciousInput);
      expect(result.__html).not.toContain('<script>');
      expect(result.__html).toContain('<strong>Safe</strong>');
    });

    it('should handle obfuscated XSS attempts', () => {
      const maliciousInput = '<p onmouseover="alert(1)">Hover</p>';
      const result = sanitizeHTML(maliciousInput);
      expect(result.__html).not.toContain('onmouseover');
      expect(result.__html).not.toContain('alert');
    });
  });

  describe('Safe Content Preservation', () => {
    it('should allow safe HTML tags (p, div, span)', () => {
      const safeInput = '<p>Paragraph</p><strong>Bold</strong><em>Italic</em>';
      const result = sanitizeHTML(safeInput);
      expect(result.__html).toContain('<p>Paragraph</p>');
      expect(result.__html).toContain('<strong>Bold</strong>');
      expect(result.__html).toContain('<em>Italic</em>');
    });

    it('should preserve text content', () => {
      const input = '<p>This is safe text content</p>';
      const result = sanitizeHTML(input);
      expect(result.__html).toContain('This is safe text content');
    });

    it('should allow safe attributes like class', () => {
      const input = '<p class="text-bold">Content</p>';
      const result = sanitizeHTML(input);
      expect(result.__html).toContain('class="text-bold"');
    });

    it('should handle empty strings', () => {
      const result = sanitizeHTML('');
      expect(result.__html).toBe('');
    });

    it('should handle plain text without HTML', () => {
      const plainText = 'Just plain text';
      const result = sanitizeHTML(plainText);
      expect(result.__html).toBe('Just plain text');
    });

    it('should allow heading tags (h2, h3)', () => {
      const input = '<h2>Heading 2</h2><h3>Heading 3</h3>';
      const result = sanitizeHTML(input);
      expect(result.__html).toContain('<h2>Heading 2</h2>');
      expect(result.__html).toContain('<h3>Heading 3</h3>');
    });

    it('should allow list tags (ul, ol, li)', () => {
      const input = '<ul><li>Item 1</li><li>Item 2</li></ul>';
      const result = sanitizeHTML(input);
      expect(result.__html).toContain('<ul>');
      expect(result.__html).toContain('<li>Item 1</li>');
      expect(result.__html).toContain('<li>Item 2</li>');
      expect(result.__html).toContain('</ul>');
    });

    it('should allow br tags', () => {
      const input = 'Line 1<br>Line 2';
      const result = sanitizeHTML(input);
      expect(result.__html).toContain('<br>');
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long input strings', () => {
      const longString = '<p>' + 'a'.repeat(10000) + '</p>';
      const result = sanitizeHTML(longString);
      expect(result.__html).toContain('<p>');
      expect(result.__html.length).toBeGreaterThan(10000);
    });

    it('should handle deeply nested HTML', () => {
      const nested = '<p><strong><em><b>Deeply nested</b></em></strong></p>';
      const result = sanitizeHTML(nested);
      expect(result.__html).toContain('Deeply nested');
    });

    it('should handle unicode characters', () => {
      const unicode = '<p>Hello 世界 🌍</p>';
      const result = sanitizeHTML(unicode);
      expect(result.__html).toContain('世界');
      expect(result.__html).toContain('🌍');
    });

    it('should handle special characters', () => {
      const special = '<p>&lt; &gt; &amp; &quot;</p>';
      const result = sanitizeHTML(special);
      expect(result.__html).toContain('&lt;');
      expect(result.__html).toContain('&gt;');
      expect(result.__html).toContain('&amp;');
    });

    it('should handle malformed HTML gracefully', () => {
      const malformed = '<p>Unclosed paragraph<strong>Bold';
      const result = sanitizeHTML(malformed);
      expect(result.__html).toContain('Unclosed paragraph');
      expect(result.__html).toContain('Bold');
    });

    it('should remove disallowed tags', () => {
      const input = '<div>Div content</div><script>alert("XSS")</script>';
      const result = sanitizeHTML(input);
      expect(result.__html).not.toContain('<div>');
      expect(result.__html).not.toContain('<script>');
      expect(result.__html).toContain('Div content');
    });

    it('should remove disallowed attributes', () => {
      const input = '<p id="test" data-value="123" class="safe">Content</p>';
      const result = sanitizeHTML(input);
      expect(result.__html).not.toContain('id=');
      expect(result.__html).not.toContain('data-value');
      expect(result.__html).toContain('class="safe"');
    });
  });

  describe('Return Value Format', () => {
    it('should return an object with __html property', () => {
      const result = sanitizeHTML('<p>Test</p>');
      expect(result).toHaveProperty('__html');
      expect(typeof result.__html).toBe('string');
    });

    it('should be compatible with dangerouslySetInnerHTML', () => {
      const result = sanitizeHTML('<p>Test</p>');
      // This format is required for React's dangerouslySetInnerHTML
      expect(result).toEqual({ __html: expect.any(String) });
    });
  });
});
