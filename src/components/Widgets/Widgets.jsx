import React from 'react'
import WidgetsFollow from '../WidgetsFollow/WidgetsFollow'

import './Widgets.css'
import Search from '../search/search';

const Widgets = () => {
    return (
        <div className='widgets'>

            <Search />
            <WidgetsFollow />

        </div>
    )
}

export default Widgets
