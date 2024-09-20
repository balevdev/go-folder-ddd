// main.js

// Project Structure Data
const projectStructure = {
    "golang-ddd": {
        "cmd": {
            "api": {
                "main.go": "// Entry point of the application"
            }
        },
        "internal": {
            "domain": {
                "user": {
                    "entity.go": "// User entity definition",
                    "repository.go": "// User repository interface",
                    "service.go": "// User domain service"
                },
                "product": {
                    "entity.go": "// Product entity definition",
                    "repository.go": "// Product repository interface",
                    "service.go": "// Product domain service"
                },
                "order": {
                    "entity.go": "// Order entity definition",
                    "repository.go": "// Order repository interface",
                    "service.go": "// Order domain service"
                }
            },
            "application": {
                "user": {
                    "commands": {
                        "create_user.go": "// Create user use case",
                        "update_user.go": "// Update user use case"
                    },
                    "queries": {
                        "get_user.go": "// Get user use case",
                        "list_users.go": "// List users use case"
                    }
                },
                "product": {
                    "commands": {
                        "create_product.go": "// Create product use case",
                        "update_product.go": "// Update product use case"
                    },
                    "queries": {
                        "get_product.go": "// Get product use case",
                        "list_products.go": "// List products use case"
                    }
                },
                "order": {
                    "commands": {
                        "create_order.go": "// Create order use case",
                        "update_order.go": "// Update order use case"
                    },
                    "queries": {
                        "get_order.go": "// Get order use case",
                        "list_orders.go": "// List orders use case"
                    }
                }
            },
            "infrastructure": {
                "persistence": {
                    "postgres": {
                        "user_repository.go": "// PostgreSQL implementation of user repository",
                        "product_repository.go": "// PostgreSQL implementation of product repository",
                        "order_repository.go": "// PostgreSQL implementation of order repository"
                    },
                    "redis": {
                        "cache.go": "// Redis caching implementation"
                    }
                },
                "auth": {
                    "jwt.go": "// JWT authentication implementation"
                },
                "kafka": {
                    "producer.go": "// Kafka producer implementation",
                    "consumer.go": "// Kafka consumer implementation"
                },
                "telemetry": {
                    "tracing.go": "// Distributed tracing setup",
                    "metrics.go": "// Metrics collection setup"
                }
            },
            "interfaces": {
                "http": {
                    "handlers": {
                        "user_handler.go": "// HTTP handlers for user-related endpoints",
                        "product_handler.go": "// HTTP handlers for product-related endpoints",
                        "order_handler.go": "// HTTP handlers for order-related endpoints"
                    },
                    "middleware": {
                        "auth_middleware.go": "// Authentication middleware",
                        "logging_middleware.go": "// Logging middleware"
                    },
                    "routes.go": "// HTTP route definitions"
                },
                "grpc": {
                    "proto": {
                        "user.proto": "// Protocol buffer definitions for user service"
                    },
                    "services": {
                        "user_service.go": "// gRPC service implementation for user service"
                    }
                }
            }
        },
        "pkg": {
            "logger": {
                "logger.go": "// Logging utility"
            },
            "errors": {
                "errors.go": "// Custom error definitions"
            },
            "validator": {
                "validator.go": "// Input validation utility"
            }
        },
        "config": {
            "config.go": "// Configuration loading logic",
            "config.yaml": "# Configuration file"
        },
        "migrations": {
            "000001_create_users_table.up.sql": "-- SQL to create users table",
            "000001_create_users_table.down.sql": "-- SQL to drop users table",
            "000002_create_products_table.up.sql": "-- SQL to create products table",
            "000002_create_products_table.down.sql": "-- SQL to drop products table",
            "000003_create_orders_table.up.sql": "-- SQL to create orders table",
            "000003_create_orders_table.down.sql": "-- SQL to drop orders table"
        },
        "scripts": {
            "seed": {
                "seed.go": "// Database seeding script"
            }
        },
        "tests": {
            "integration": {
                "api_test.go": "// Integration tests for API"
            },
            "unit": {
                "domain_test.go": "// Unit tests for domain logic",
                "application_test.go": "// Unit tests for application services"
            }
        },
        "api": {
            "openapi": {
                "api.yaml": "# OpenAPI/Swagger specification"
            }
        },
        "deployments": {
            "dockerfile": "# Dockerfile for containerization",
            "docker-compose.yml": "# Docker Compose file for local development",
            "k8s": {
                "deployment.yaml": "# Kubernetes deployment configuration",
                "service.yaml": "# Kubernetes service configuration"
            }
        },
        "go.mod": "module golang-ddd\n\ngo 1.16\n",
        "go.sum": "",
        "Makefile": "# Makefile for common development tasks",
        ".gitignore": "# Git ignore file",
        ".golangci.yml": "# golangci-lint configuration",
        "README.md": "# Bobby Go Monolith\n\nThis is a monolithic Go application following DDD principles."
    }
};

// Function to Create ZIP File
function createZip(structure, zip, currentPath = '') {
    for (let [key, value] of Object.entries(structure)) {
        const newPath = currentPath ? `${currentPath}/${key}` : key;
        if (typeof value === 'string') {
            zip.file(newPath, value);
        } else {
            createZip(value, zip, newPath);
        }
    }
}

// Event Listener for Download Button
document.getElementById('downloadBtn').addEventListener('click', function () {
    const zip = new JSZip();
    createZip(projectStructure, zip);

    zip.generateAsync({ type: "blob" })
        .then(function (content) {
            saveAs(content, "golang-ddd.zip");
        });
});
