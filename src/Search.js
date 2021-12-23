import React from 'react'
import ReactDOM from 'react-dom'
import {useSearchParams} from 'react-router-dom'
import {useEffect, useState} from 'react'

function Search(props) {

    const Children = props.card
    const [searchParams, setSearchParams] = useSearchParams({});
    const [searchQuery, setQuery] = useState(searchParams.get("s") || "")
    const [sSelectors, setSSelectors] = useState(searchParams.getAll("selector") || [])
    const [sortFlag, setSortFlag] = useState(searchParams.getAll("order") || [])
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const selectors = []

    function toggleSelector(selector) {
        if (sSelectors.indexOf(selector) > -1) {
            sSelectors.splice(sSelectors.indexOf(selector), 1)
        } else {
            sSelectors.push(selector)
        }
        setSearchParams({oldValue: sSelectors, order: sortFlag, s: searchQuery})
        setSSelectors(sSelectors)
    }

    if (props.selectors != null) {
        props.selectors.forEach(selector => {
            selectors.push(<li key={selector.key}
                               className={`${sSelectors.indexOf(selector.key) > -1 ? 'uk-active' : ''}`}
                               data-uk-filter-control><a data-selector={selector.key}
                                                         onClick={() => toggleSelector(selector.key)}
            >{selector.name}</a></li>)
        })
    }

    function onSearchChange(event) {
        setQuery(event.target.value)
        setSearchParams({selector: sSelectors, order: sortFlag, s: event.target.value})
    }

    function updateSort(nextValue) {
        if (nextValue == sortFlag) {
            nextValue = null
        }
        setSortFlag(nextValue)
        setSearchParams({selector: sSelectors, order: nextValue, s: searchQuery})

    }

    function loadData() {
        const params = new URLSearchParams();
        params.append("skip", data.length)
        if (searchQuery !== null) {
            params.append("s", searchQuery)
        }
        if (sortFlag !== null) {
            params.append("order", sortFlag)
        }
        if (sSelectors !== null && sSelectors.length > 0) {
            params.append("selectors", sSelectors)
        }
        setLoading(true);
        fetch(`/api/${props.type}/?${params.toString()}`)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    setLoading(false)
                    throw "can`t call"
                }
            }).then(jData=>{
                let viewData = [];
                jData.map(item=>(<Children key={item.id} {...item}/>)).forEach((item)=>viewData.push(item))
                setData(viewData)
            })
    }

    useEffect(() => {
        loadData()
    }, [searchParams])

    return (
        <div className="uk-container">
            <div>
                <div className="uk-grid-small uk-flex-middle" data-uk-grid>
                    <div className="uk-width-expand">
                        <div className="uk-grid-small uk-grid-divider uk-child-width-auto" data-uk-grid>
                            <div>

                            </div>
                            <div>
                                <form className="uk-search uk-search-default">
                                    <span className="uk-search-icon-flip" data-uk-search-icon></span>
                                    <input className="uk-search-input" value={searchQuery} onChange={onSearchChange}
                                           type="search"
                                           placeholder="Найти"></input>
                                </form>
                            </div>
                            <div>
                                <ul className="uk-subnav uk-subnav-pill" data-uk-margin>
                                    {selectors}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="uk-width-auto uk-text-nowrap">
                        <span className={` ${sortFlag == 'asc' ? 'uk-active' : ''} `}><a className="uk-icon-link"
                                                                                         onClick={() => updateSort('ask')}
                                                                                         data-uk-icon="icon: arrow-down"></a></span>
                        <span className={` ${sortFlag == 'desc' ? 'uk-active' : ''} `}><a className="uk-icon-link"
                                                                                          onClick={() => updateSort('desc')}
                                                                                          data-uk-icon="icon: arrow-up"></a></span>
                    </div>
                </div>
                <ul className="uk-child-width-1-2 uk-child-width-1-3@m uk-text-center" data-uk-grid>
                    {data}
                </ul>
            </div>
        </div>
    )


}

export default Search