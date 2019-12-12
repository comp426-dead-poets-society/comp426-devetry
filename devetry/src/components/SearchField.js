import React, { Component, useState, useEffect } from 'react'
import useDebounce from '../api/useDebounce'
import { searchPoemTitles } from '../api/publicAPI'
import SearchResult from './SearchResult'

export default function SearchField() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(
        () => {
            let dummyFunc = async () => {
                if (debouncedSearchTerm) {
                    let result = await searchPoemTitles(debouncedSearchTerm)
                    setResults(result);
                    console.log(result);
                } else {
                    setResults([]);
                }
            }
            dummyFunc();
        },
        
        [debouncedSearchTerm]
    );

    return (
        <>
            <div class="field" className={"searchField"}>
                <div class="control">
                <input class="input"
                    placeholder="Search Poems"
                    onChange={e => setSearchTerm(e.target.value)}
                />
                </div>
            </div>

            {results.map(result => (
                <React.Fragment key={result.createdAt}>
                <SearchResult poem={result}/>
                <br />
                </React.Fragment>
            ))}
        </>
    );
}
