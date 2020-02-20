import React from 'react'

const Mitigation = (props) => {
    
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
                <li>mitigation measures</li>
                <li>mitigation measures</li>
                <li>mitigation measures</li>
                <li>mitigation measures</li>
            </ol>
        </div>
    )
}
export default Mitigation