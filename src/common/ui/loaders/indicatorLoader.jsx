import React from 'react'
import ContentLoader from "react-content-loader"

const IndicatorLoader = () => (
    <ContentLoader
        height={60}
        width={300}
        speed={2}
        primaryColor="#121929"
        secondaryColor="#293750"
    >
        <rect x="150" y="13" rx="4" ry="4" width="120" height="6" />
        <rect x="190" y="33" rx="3" ry="3" width="80" height="6" />
        <circle cx="50" cy="30" r="30" />
    </ContentLoader>
)

export default IndicatorLoader