import React from 'react'
import { Helmet } from 'react-helmet'


const MetaData = ({title}) => {
    let x = title;
    return (
        <Helmet>
           <title>{x+' - Kaktarua'}</title> 
        </Helmet>
    )
}

export default MetaData
