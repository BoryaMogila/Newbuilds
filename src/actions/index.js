
import * as actionsTypes from './actionsTypes'



export function getCities(){
    return {
        type: actionsTypes.GET_CITIES,
        graphQl: true,
        payload: {
            query: `{
                      cities{
                        cityId,
                        cityName,
                        tableName
                      }
                    }`
        }

    }
}

export function getNewbuilds(tableName, limit, offset, checked){
    return {
        type: actionsTypes.GET_NEWBUILDS,
        graphQl: true,
        payload: {
            query: `{
                      newbuilds(tableName: "${tableName}", limit: ${limit}, offset: ${offset}, checked: "${checked}"){
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
export function getCount (tableName, checked){
    return {
        type: actionsTypes.GET_COUNT,
        graphQl: true,
        payload: {
            query: `{
                      count(tableName: "${tableName}", checked: "${checked}")
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

export function saveNewbuild(tableName, newbuild){
    return {
        type: actionsTypes.SAVE_NEWBUILD,
        graphQl: true,
        payload: {
            query: `mutation {
                      updateNewbuild(
                         tableName: "${tableName}",
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
