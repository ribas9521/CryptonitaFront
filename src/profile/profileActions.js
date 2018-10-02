const profile =
{
    profileType: 0,
    balance: {
        startAmount: 8,
        startPercentage: 80,
        returnPercentage: 20,
        availablePercentage: 50,
        alocatedPercentage: 60,
        btc: {
            available: 2,
            alocated: 8,
            return: 2,
            totalCapital: 10
        },
        dollar: {
            available: 15000,
            alocated: 22000,
            return: 3280,
            totalCapital: 37000
        }
    },
    following: [
        {
            name: 'Wall Street wolf',
            picture: '',
            percentage: 30,
            btc: 0.9,
            dollar: 5900
        },
        {
            name: 'Vitalik Buterin',
            picture: '',
            percentage: 50,
            btc: 1.5,
            dollar: 10000
        },
        {
            name: 'Satoshi Nakamoto',
            picture: '',
            percentage: 20,
            btc: 0.6,
            dollar: 4000
        }
    ],
    coins: [
        {
            name: 'Ethereum',
            picture: '',
            symbol: 'ETH',
            percentage: 33.3,
            btc: 1,
            dollar: 6000
        },
        {
            name: 'Einstenium',
            symbol: 'EMC2',
            picture: '',
            percentage: 33.3,
            btc: 1,
            dollar: 6000
        },
        {
            name: 'Dogecoin',
            symbol: 'DOGE',
            picture: '',
            percentage: 33.3,
            btc: 1,
            dollar: 6000
        }
    ],
    data: {
        data24h: [1, -5, 3, 5, 22, 25, 32, 22],
        data7d: [1, -5, 3, 5, 22, 25, 32, 22],
        data30d: [1, -5, 3, 5, 22, 25, 32, 22]
    }
}


export const getProfile = (id) => {
    return dispatch => {
        dispatch({ type: 'PROFILE_FETCHED', payload: profile })
    }
}