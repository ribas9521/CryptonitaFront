import React from 'react'
import ReactEcharts from 'echarts-for-react';
import Card from '../../../common/ui/card/card'
import SimpleList from '../../../common/ui/simpleList/simpleList'

export default props=>{
    const { getCardOptions, mountPerformanceChart, getPerformanceList } = props
    return(
        <Card title="Performance" opt={getCardOptions() || []} >
            <ReactEcharts
                option={mountPerformanceChart() || {}}>
            </ReactEcharts>
            {/* <SimpleList className="performance-list">
                {getPerformanceList()}
            </SimpleList> */}
        </Card>
    )
}