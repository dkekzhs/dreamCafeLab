import axios from '@/utils/common-axios'

export const getMapCafeData = async (code) => {
    let data = await axios.get('district/map/' + code);
    return data.data.result
}