const traders = [
    {
        picture: 'http://live.themezhub.com/live-preview-kavach/kavach/dark/dist/img/avater-1.jpg',
        cover: 'https://www.50-best.com/images/badass_facebook_covers/ace_of_spade_badass_cover.jpg',
        name: 'Vô Epa',
        change24h: 1,
        change7d: 12,
        change30d: 32,
        totalReturn: 112,
        followers: 23,
        size: 12,
        data: {
            data24h: [1, -5, 3, 5, 22, 25, 32, 22],
            data7d: [1, -5, 3, 5, 22, 25, 32, 22],
            data30d: [1, -5, 3, 5, 22, 25, 32, 22]
        },
        description: 'Sergey from Latvia is a Popular Investor who keeps his risk score low. He has been with eToro since late 2017 and says he has 8 years of trading experience. He rotates his portfolio by the end of each quarter, and uses short positions as a diversification tool. He recommends copying him with $1,000.'

    },
    {
        picture: 'https://lh3.googleusercontent.com/-TLqKvsqNUCU/WzKdDgWBQsI/AAAAAAAACOU/A9N7wW2jqOcHKyoXlp4DSH80ekchQ0YgwCEwYBhgL/w140-h140-p/31694828_206221469984077_2366797807848783872_n.jpg',
        cover: 'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&h=350',
        name: 'Guilherme Ribas',
        change24h: 1,
        change7d: 12,
        change30d: 32,
        totalReturn: 112,
        followers: 23,
        size: 12,
        data: {
            data24h: [1, -5, 3, 5, 22, 25, 32, 22],
            data7d: [1, -5, 3, 5, 22, 25, 32, 22],
            data30d: [1, -5, 3, 5, 22, 25, 32, 22]
        },
        description: 'Sergey from Latvia is a Popular Investor who keeps his risk score low. He has been with eToro since late 2017 and says he has 8 years of trading experience. He rotates his portfolio by the end of each quarter, and uses short positions as a diversification tool. He recommends copying him with $1,000.'

    }
]


export const getTraders = () => {
    return dispatch => {
        dispatch({ type: 'TRADERS_CARDS_FETCHED', payload: traders })
    }
}