import React from 'react'
import ReactEcharts from 'echarts-for-react';
import Card from '../../common/ui/card/card'
import SimpleList from '../../common/ui/simpleList/simpleList'

export default props => {
    const { barChart } = props
    return (
        <div>
            <div className="col-md-12 col-xs-12">
                <Card title="Performance">
                    <ReactEcharts
                        option={barChart || {}}>
                    </ReactEcharts>
                    <SimpleList/>
                </Card>
                
            </div>
        </div>
    )
}