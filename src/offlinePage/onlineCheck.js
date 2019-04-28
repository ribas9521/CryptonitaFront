import axios from 'axios'
import history from '../common/helpers/history';

export function onlineCheck() {
    axios.get('https://api.github.com/users/ribas9521')
        .then(() => { 
            history.push('/traderList')
        })
        .catch(()=>{
            history.push('/offline')
            setTimeout(onlineCheck, 3000)
        })
}
