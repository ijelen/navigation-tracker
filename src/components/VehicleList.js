import React from 'react'
import {List, Datagrid, TextField, DateField, EditButton, DeleteButton} from 'react-admin'


const VehicleList = (props) => {
    const postRowStyle = (record, index) => {
        if (typeof record.expires == "string") {
            const diffDays = (Date.parse(record.expires) - new Date().getTime()) / (1000*60*60*24);
            let backgroundColor;
            if (diffDays < 0) {
                // Registracija je istekla
                backgroundColor = "rgba(252, 121, 132, 0.75)" // red
            } else if (diffDays < 7) {
                // Registracija istice za manje od tjedan dana
                backgroundColor = "rgba(247, 232, 96, 0.83)"
            } else {
                backgroundColor = "white"
            }
            return ({
                backgroundColor: backgroundColor
            });
        }
    };
    return (
        <List title="Strojevi" {...props}>
            <Datagrid rowStyle={postRowStyle}>
                <TextField label="Stroj " source='name' />
                <TextField label="Tip stroja" source="type" />
                <TextField label="Oznaka" source='code' />
                <TextField label="Reg. oznaka" source='registration' />
                <TextField label="Broj šasije" source='chassis' />
                <TextField label="Vlasnik" source='owner' />
                <DateField label="Datum isteka" source='expires' locales="hr" />
                <EditButton basePath='/vehicles' />
                <DeleteButton basePath='/vehicles' />
            </Datagrid>
        </List>
    )
}

export default VehicleList