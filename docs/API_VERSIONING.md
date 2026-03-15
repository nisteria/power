# API Versioning Strategy

## Versioning Approach
Power Energy API uses URL-based versioning: `/v1/`

## Deprecation Policy
- 12 months support for each version
- 6 months notice before deprecation
- Legacy versions available for 6 months after deprecation

## Breaking Changes
Changes that require version bump:
- Removing endpoints
- Changing response format
- Changing parameter names/types
- Removing fields from responses

## Non-Breaking Changes
No version bump needed:
- Adding new endpoints
- Adding optional parameters
- Adding new response fields
- Bug fixes

## Migration Guide
### v1 → v2 (when available)
```bash
# Update your API calls
curl http://api.power.energy/v2/customers/me
```
