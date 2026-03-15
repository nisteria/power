# API Error Codes

## Authentication (AUTH)
| Code | HTTP | Description |
|------|------|-------------|
| AUTH_REQUIRED | 401 | Authentication required |
| AUTH_INVALID_TOKEN | 401 | Invalid or expired token |
| AUTH_INSUFFICIENT_PERMISSIONS | 403 | User lacks required permissions |

## Customer (CUST)
| Code | HTTP | Description |
|------|------|-------------|
| CUSTOMER_NOT_FOUND | 404 | Customer does not exist |
| CUSTOMER_ALREADY_EXISTS | 400 | Email already registered |
| CUSTOMER_DISABLED | 403 | Account is suspended |
| CUSTOMER_INVALID_DATA | 400 | Invalid customer data |

## Device (DEV)
| Code | HTTP | Description |
|------|------|-------------|
| DEVICE_NOT_FOUND | 404 | Device not found |
| DEVICE_OFFLINE | 503 | Device is not reachable |
| DEVICE_CONFIG_INVALID | 400 | Invalid device configuration |
| DEVICE_NOT_OWNED | 403 | Device does not belong to customer |

## Smart Meter (SM)
| Code | HTTP | Description |
|------|------|-------------|
| SMARTMETER_NOT_FOUND | 404 | Smart meter not found |
| SMARTMETER_AUTH_FAILED | 401 | Netzbetreiber authorization failed |
| SMARTMETER_DATA_UNAVAILABLE | 503 | Consumption data temporarily unavailable |
| SMARTMETER_RATE_LIMITED | 429 | API rate limit exceeded |

## Optimization (OPT)
| Code | HTTP | Description |
|------|------|-------------|
| OPTIMIZATION_FAILED | 500 | Optimization job failed |
| OPTIMIZATION_IN_PROGRESS | 409 | Another optimization is already running |
| OPTIMIZATION_TIMEOUT | 504 | Optimization took too long |

## Billing (BILL)
| Code | HTTP | Description |
|------|------|-------------|
| INVOICE_NOT_FOUND | 404 | Invoice not found |
| INVOICE_ALREADY_PAID | 400 | Invoice already paid |
| PAYMENT_FAILED | 402 | Payment processing failed |
| PAYMENT_METHOD_INVALID | 400 | Invalid payment method |

## Webhook (WH)
| Code | HTTP | Description |
|------|------|-------------|
| WEBHOOK_INVALID_URL | 400 | Webhook URL is invalid |
| WEBHOOK_DELIVERY_FAILED | 503 | Webhook delivery failed |
| WEBHOOK_RATE_LIMITED | 429 | Too many webhook deliveries |

## Rate Limiting (RATE)
| Code | HTTP | Description |
|------|------|-------------|
| RATE_LIMIT_EXCEEDED | 429 | Too many requests |

## Internal (INT)
| Code | HTTP | Description |
|------|------|-------------|
| INTERNAL_ERROR | 500 | Unexpected server error |
| SERVICE_UNAVAILABLE | 503 | Service temporarily unavailable |
| DATABASE_ERROR | 500 | Database operation failed |

## Error Response Format

```json
{
  "error": {
    "code": "AUTH_INVALID_TOKEN",
    "message": "The authentication token has expired",
    "details": {
      "expiredAt": "2026-03-14T23:00:00Z"
    }
  }
}
```
