/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[{
            hostname:"files.edgestore.dev"
        }]
        // domains:["files.edgestore.dev"]
    }
}

module.exports = nextConfig
