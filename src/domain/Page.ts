interface ISort {
    unsorted : boolean
    sorted : boolean
    empty : boolean
}

interface IPageable {
    sort : ISort
    pageNumber : number
    pageSize : number
    offset : number
    paged : boolean
    unpaged : boolean
}

export interface IPages<T> {
    content : Array<T>
    pageable : IPageable
    last : boolean
    totalElements : number
    totalPages : number
    first : boolean
    sort : ISort
    number : number
    numberOfElements : number
    size : number
    empty : boolean
}
