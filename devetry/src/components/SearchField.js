import React, { Component, useState, useEffect } from 'react'
import useDebounce from '../api/useDebounce'
import { searchPoemTitles } from '../api/publicAPI'
import SearchResult from './SearchResult'

export default function SearchField() {
    // State and setter for search term
    const [searchTerm, setSearchTerm] = useState('');
    // State and setter for search results
    const [results, setResults] = useState([]);
    // State for search status (whether there is a pending API request)
    const [isSearching, setIsSearching] = useState(false);

    // Now we call our hook, passing in the current searchTerm value.
    // The hook will only return the latest value (what we passed in) ...
    // ... if it's been more than 500ms since it was last called.
    // Otherwise, it will return the previous value of searchTerm.
    // The goal is to only have the API call fire when user stops typing ...
    // ... so that we aren't hitting our API rapidly.
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // Here's where the API call happens
    // We use useEffect since this is an asynchronous action
    useEffect(
        () => {
            let dummyFunc = async () => {
                // Make sure we have a value (user has entered something in input)
                if (debouncedSearchTerm) {
                    // Set isSearching state
                    setIsSearching(true);
                    // Fire off our API call
                    let result = await searchPoemTitles(debouncedSearchTerm)
                    setIsSearching(false);
                    // Set results state
                    setResults(result);
                } else {
                    setResults([]);
                }
            }
            dummyFunc();
        },
        // This is the useEffect input array
        // Our useEffect function will only execute if this value changes ...
        // ... and thanks to our hook it will only change if the original ...
        // value (searchTerm) hasn't changed for more than 500ms.
        [debouncedSearchTerm]
    );

    // Pretty standard UI with search input and results
    return (
        <>
            <div className={"searchField"}>
                <input
                    placeholder="Search Poems"
                    onChange={e => setSearchTerm(e.target.value)}
                />
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
