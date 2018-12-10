import React from 'react'
import ReactEcharts from 'echarts-for-react';
import Card from '../../../common/ui/card/card'

const BalanceChart = props => {
    const { mountBalanceChart } = props
    return (
        <Card title="Balance Chart" >
            <ReactEcharts
                option={mountBalanceChart() || {}}>
            </ReactEcharts>            
        </Card>
    )
}

export default BalanceChart