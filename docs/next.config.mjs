import nextra from 'nextra'

const withNextra = nextra({
    latex: true,
    defaultShowCopyCode: true
})

export default withNextra({
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        })
        return config
    }
})
