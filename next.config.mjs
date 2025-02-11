/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental :{
        serverActions :{
            bodySizeLimit:"4mb",
        },
    },
    images : {
        remotePatterns:[
            {
                protocol:"https",
                hostname:"la5c8xtl0vxtruc3.public.blob.vercel-storage.com"
            }
        ]
    }
};

export default nextConfig;
