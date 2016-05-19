
import * as actionsTypes from './actionsTypes'



export function getCities(){
    return {
        type: actionsTypes.GET_CITIES,
        graphQl: true,
        payload: {
            query: `{
                      cities{
                        cityName
                      }
                    }`
        }

    }
}

export function getNewbuilds(cityName,limit, offset, checked){
    return {
        type: actionsTypes.GET_NEWBUILDS,
        graphQl: true,
        payload: {
            query: `{
                      newbuilds(cityName: "${cityName}",limit: ${limit}, offset: ${offset + (checked ? ', checked:"' + checked + '"': '')}){
                        newbuildId,
                        lunLink,
                        name,
                        contact,
                        coment,
                        checked,
                        date
                      }
                    }`
        }

    }
}
export function getCount (cityName, checked){
    return {
        type: actionsTypes.GET_COUNT,
        graphQl: true,
        payload: {
            query: `{
                      count(cityName: "${cityName + (checked ? '", checked:"' + checked + '"': '"')})
                    }`
        }

    }
}

export function selectPage (page){
    return {
        type: actionsTypes.SELECT_PAGE,
        payload: page

    }
}

export function changeCity(city){

    return {
        type: actionsTypes.CHANGE_CITY,
        payload: city
    }
}

export function changeNewbuild(newbuild){
    return {
        type: actionsTypes.CHANGE_NEWBUILD,
        payload: newbuild
    }
}

export function saveNewbuild(newbuild){
    return {
        type: actionsTypes.SAVE_NEWBUILD,
        graphQl: true,
        payload: {
            query: `mutation {
                      updateNewbuild(
                         newbuildId: "${newbuild.newbuildId}",
                         checked: "${newbuild.checked}",
                         coment: "${newbuild.coment}"
                         ){
                        newbuildId,
                        coment,
                        checked
                      }
                    }`
        }

    }
}

export function changeChecked(checked){

    return {
        type: actionsTypes.CHANGE_CHECKED,
        payload: checked
    }
}
