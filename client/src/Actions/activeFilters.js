//Url IMAGES Firebase
export default function activeFilters(condition){
  console.log('entro en active filters action')
    return {type:'ACTIVE_FILTERS', payload: condition}
  }