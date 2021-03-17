//This is ONLY for mix search and filters by category 
export default function searchFilters(category){
    console.log('entro action')

    return {type:'SEARCH_FILTERS', payload: category}
  }