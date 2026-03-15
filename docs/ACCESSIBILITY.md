// Accessibility - Keyboard Navigation Guide

## Keyboard Shortcuts

### Global
| Shortcut | Action |
|----------|--------|
| `?` | Show help |
| `Esc` | Close modal/dialog |
| `Tab` | Next focusable element |
| `Shift+Tab` | Previous focusable element |

### Dashboard
| Shortcut | Action |
|----------|--------|
| `d` | Go to Dashboard |
| `g then d` | Go to Dashboard |
| `g then d` | Go to Devices |
| `g then t` | Go to Tariffs |
| `g then b` | Go to Billing |
| `g then s` | Go to Settings |

### Navigation
| Shortcut | Action |
|----------|--------|
| `←` / `→` | Previous/Next page |
| `Home` | First page |
| `End` | Last page |

## Focus Management

### Focus Trap
When a modal opens:
1. Focus moves to first focusable element in modal
2. Tab cycles only within modal
3. Last element cycles to first
4. Escape closes modal and returns focus

### Skip Links
- "Skip to main content" link for keyboard users
- "Skip to navigation" for secondary nav

## Screen Reader Support

### ARIA Labels
All interactive elements have:
- `aria-label` for icon-only buttons
- `aria-describedby` for helper text
- `aria-live` for dynamic content

### Example
```jsx
<button
  aria-label="Schließen"
  aria-describedby="modal-description"
>
  ✕
</button>
```
