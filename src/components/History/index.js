import React from 'react'

const History = (props) => {
    function titleCase(str) {
        str = str.toLowerCase().split(' ');
        for (let i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
        }
        return str.join(' ');
    }
    const attributes = props.graphics;
    const Address = titleCase(attributes.Address);
    return (
        <div className= "dashboardTaps">
            <div className="header-title">
                <h6>{Address}</h6>
                <p>(Parcel ID: {attributes.PID} {' '} | {' '} BldgID: {attributes.UnqBldgID})</p>
            </div> 
            <ol>
                <li>history 1</li>
                <li>history 2</li>
                <li>history 3</li>
                <li>history 4</li>
            </ol>
        </div>
    )
}
export default History