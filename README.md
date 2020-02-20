# Base project from create micro-services
> ** Enjoy to use this sample skeleton!

## Configure .prod files
```python 

// plug.prod.json

{
  "server": {
    "name": "servicews",
    "port": "4000",
    "host": "micro_servicews",
    "basePath": "/service"
  },
  "registry": {
    "on": "REGISTRY_SERVICES",
    "off": "UNREGISTRY_SERVICES",
    "register": true,
    "queue": {
      "port": 5672,
      "host": "localhost"
    }
  }
}

```

## Configure .dev files
```
{
  "server": {
    "name": "servicews",
    "port": "4000",
    "host": "localhost",
    "basePath": "/service"
  },
  "registry": {
    "on": "REGISTRY_SERVICES",
    "off": "UNREGISTRY_SERVICES",
    "register": true,
    "queue": {
      "port": 5672,
      "host": "localhost"
    }
  }
}

```