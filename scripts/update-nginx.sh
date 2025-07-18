#!/bin/bash

# Update Nginx Configuration for SaaS Frontend
# This script copies our custom nginx config and reloads nginx

echo "🔧 Updating Nginx configuration for SaaS frontend..."

# Check if running in Docker environment
if [ -f /.dockerenv ]; then
    echo "📦 Running in Docker container"
    
    # Copy our config to nginx config directory
    if [ -f /workspace/config/nginx/default.conf ]; then
        echo "📋 Copying nginx configuration..."
        
        # Try common nginx config locations
        if [ -d /etc/nginx/conf.d ]; then
            cp /workspace/config/nginx/default.conf /etc/nginx/conf.d/default.conf
            echo "✅ Configuration copied to /etc/nginx/conf.d/"
        elif [ -d /etc/nginx/sites-available ]; then
            cp /workspace/config/nginx/default.conf /etc/nginx/sites-available/default
            echo "✅ Configuration copied to /etc/nginx/sites-available/"
        else
            echo "❌ Could not find nginx config directory"
            exit 1
        fi
        
        # Test nginx configuration
        echo "🧪 Testing nginx configuration..."
        if nginx -t; then
            echo "✅ Nginx configuration is valid"
            
            # Reload nginx
            echo "🔄 Reloading nginx..."
            if nginx -s reload; then
                echo "✅ Nginx reloaded successfully"
                echo "🌐 Frontend should now be available at https://saas-dev.unifiedaisolutions.com"
            else
                echo "❌ Failed to reload nginx"
                exit 1
            fi
        else
            echo "❌ Nginx configuration test failed"
            exit 1
        fi
    else
        echo "❌ Nginx config file not found at /workspace/config/nginx/default.conf"
        exit 1
    fi
else
    echo "🖥️  Running on host system"
    echo "📝 Use docker-compose to update nginx configuration:"
    echo "   docker-compose restart saas-nginx"
fi

echo "🎉 Nginx configuration update complete!"