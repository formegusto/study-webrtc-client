import React from 'react';
import AttendantsComponent from './Webinar/AttendantsComponent';
import HostComponent from './Webinar/HostComponent';

function WebinarComponent() {
    return (
        <>
            {window.localStorage.getItem('host') === null ? 
                <AttendantsComponent />
                :
                <HostComponent />
            }
        </>
    );
}

export default WebinarComponent;