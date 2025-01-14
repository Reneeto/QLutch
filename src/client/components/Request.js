import React, { useState } from 'react';
import Response from './Response';
import bytes from 'bytes';

export default function Request() {

    const [queryResult, setQueryResult] = useState('');
    const [status, setStatus] = useState('');
    const [time, setTime] = useState();
    const [size, setSize] = useState();

    function getQueryResult() {

        // Get time of button click
        const start = new Date();
        let byteSize = 0;

        // Requesting data from GraphQL
        fetch("http://localhost:4000/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ query: `${document.getElementById("queryInput").value}` })
        })
            .then((response) => {
                setStatus(response.status);
                return response.json()
            })
            .then((data) => {
                setTime((new Date()) - start);
                setQueryResult(data)
            });
    }

    // Function to clear the Redis cache
    const handleClearCache = () => {
        fetch("http://localhost:4000/badCacheReset");
    }

    return (
        <>
            <div className="request">
                <h2>Request</h2>
                <div className="form">
                    <div className="input lower">
                        <textarea
                            id="queryInput"
                            name='queryInput'
                            className="input-textarea"
                            type="textarea"
                            placeholder="Enter query here..."
                        />
                        <div className="input-buttons">
                            <button
                                className="button"
                                id="cache-button"
                                onClick={handleClearCache}
                            >
                                Clear Cache
                            </button>
                            <button
                                className="button"
                                onClick={getQueryResult}
                            >
                                Run
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Response 
                queryResult={queryResult} 
                status={status}
                time={time}
                size={size}
            />
        </>
    )
};