import React from 'react'
import Indicator from '../../../common/ui/indicator/indicator';

const getValueType = (balance, baseCoin, type) => {
    if (baseCoin === 'btc') {
        if (type === 'availabe') {
            return balance.totalAvailableBTC.toLocaleString(undefined, { minimumFractionDigits: 8 })
        }
        else if (type === 'alocated')
            return balance.totalAlocatedBTC.toLocaleString(undefined, { minimumFractionDigits: 8 })
        else {
            return balance.totalAmountBTC.toLocaleString(undefined, { minimumFractionDigits: 8 })
        }
    }
    else {
        if (type === 'availabe') {
            return balance.totalAvailableUSDT.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionalDigits: 2
            })
        }
        else if (type === 'alocated')
            return balance.totalAlocatedUSDT.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionalDigits: 2
            })
        else {
            return balance.totalAmountUSDT.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionalDigits: 2
            })
        }
    }
}

export default props => {
    const { balance, baseCoin } = props
    return (
        <div>
            <Indicator
                text="Available"
                icon='fa fa-check'
                value={getValueType(balance, baseCoin, 'available')
                }
                type="info"
                percentage={0}
                currency={baseCoin}
            />
            <Indicator
                text="Alocated"
                icon='fa fa-plus'
                value={
                    getValueType(balance, baseCoin, 'alocated')}
                type="warning"
                percentage={0}
                currency={baseCoin}
            />
            <Indicator
                text="Total"
                icon='fa fa-usd'
                value={
                    getValueType(balance, baseCoin, 'amount')}
                type={"success"}
                percentage={0}
                currency={baseCoin}
            />

        </div>
    )
}