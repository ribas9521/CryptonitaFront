import React from 'react'
import Indicator from '../../../common/ui/indicator/indicator';
import { format2Digits, format8Digits } from '../../../common/helpers/formatValues';

const getValueType = (balance, baseCoin, type) => {
    if (baseCoin === 'btc') {
        if (type === 'available') {
            return format8Digits(balance.totalAvailableBTC)
        }
        else if (type === 'alocated')
            return format8Digits(balance.totalAlocatedBTC)
        else {
            return format8Digits(balance.totalAmountBTC)
        }
    }
    else {
        if (type === 'available') {
            return format2Digits(balance.totalAvailableUSDT)
        }
        else if (type === 'alocated')
            return format2Digits(balance.totalAlocatedUSDT)

        else {
            return format2Digits(balance.totalAmountUSDT)
        }
    }
}

export default props => {
    const { balance, baseCoin, fetching } = props
    return (
        <div>
            <div className="col-md-4 col-sm-6 col-xs-12">

                <Indicator
                    text="Available"
                    icon='fa fa-check'
                    value={getValueType(balance, baseCoin, 'available')
                    }
                    type="info"
                    percentage={0}
                    currency={baseCoin}
                    fetching={fetching}
                />
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12">
                <Indicator
                    text="Alocated"
                    icon='fa fa-plus'
                    value={
                        getValueType(balance, baseCoin, 'alocated')}
                    type="warning"
                    percentage={0}
                    currency={baseCoin}
                    fetching={fetching}
                />
            </div>
            <div className="col-md-4 col-sm-6 col-xs-12">
                <Indicator
                    text="Total"
                    icon='fa fa-usd'
                    value={
                        getValueType(balance, baseCoin, 'amount')}
                    type={"success"}
                    percentage={0}
                    currency={baseCoin}
                    fetching={fetching}
                />
            </div>

        </div>
    )
}