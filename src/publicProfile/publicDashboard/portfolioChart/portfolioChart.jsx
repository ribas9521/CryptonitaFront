import React from 'react'
import ReactEcharts from 'echarts-for-react';
import Card from '../../../common/ui/card/card'
import SimpleList from '../../../common/ui/simpleList/simpleList'

export default props=>{
    const { mountPortfolioChart, getPortfolioList } = props
    return(
        <Card title="Portfolio">
            <ReactEcharts
                option={mountPortfolioChart() || {}}>
            </ReactEcharts>
            <SimpleList className="performance-list">
                {getPortfolioList()}
            </SimpleList>
        </Card>
    )
}