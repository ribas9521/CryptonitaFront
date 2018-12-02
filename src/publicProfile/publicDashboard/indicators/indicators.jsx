import React from 'react'
import Indicator from '../../../common/ui/indicator/indicator';

export default props => {
    const { balance } = props
    return (
        <div>
            <Indicator
                text="Available"
                icon='fa fa-check'
                value={
                    balance.totalAvailableBTC.toLocaleString(undefined, { minimumFractionDigits: 8 })}
                type="info"
                percentage={0}
                currency="btc"
            />
            <Indicator
                text="Alocated"
                icon='fa fa-plus'
                value={
                    balance.totalAlocatedBTC.toLocaleString(undefined, { minimumFractionDigits: 8 })}
                type="warning"
                percentage={0}
                currency="btc"
            />
            <Indicator
                text="Total"
                icon='fa fa-usd'
                value={
                    balance.totalAmountBTC.toLocaleString(undefined, { minimumFractionDigits: 8 })}
                type={"success"}
                percentage={0}
                currency="btc"
            />
            
        </div>
    )
}