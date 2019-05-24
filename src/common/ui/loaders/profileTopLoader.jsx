import React from 'react'
import ContentLoader from 'react-content-loader'

const ProfileTopLoader = ({}) => {
    return (
        <ContentLoader
            height={340}
            width={1300}
            speed={1}
            primaryColor="#121929"
            secondaryColor="#293750"
        >
            <rect x="20" y="15" rx="20" ry="20" width="300" height="320" />
            {/* <rect x="92" y="347" rx="5" ry="5" width="45" height="45" />
            <rect x="148" y="347" rx="5" ry="5" width="45" height="45" />
            <rect x="205" y="347" rx="5" ry="5" width="45" height="45" /> */}
            <rect x="361" y="17" rx="10" ry="10" width="420" height="33" />
            <rect x="361" y="71" rx="10" ry="10" width="315" height="33" />
            <rect x="361" y="125" rx="10" ry="10" width="233" height="20" />
            <rect x="361" y="216" rx="5" ry="5" width="195" height="13" />
            <rect x="361" y="251" rx="5" ry="5" width="195" height="13" />
           
        </ContentLoader>
    )
}

export default ProfileTopLoader