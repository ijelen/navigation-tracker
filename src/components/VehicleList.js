import React from 'react'
import { List, SimpleList, Datagrid, TextField, DateField, EditButton, DeleteButton } from 'react-admin';
import { useMediaQuery } from '@material-ui/core';

const VehicleList = (props) => {

    const formatRecord = (record, formating) => {
        if (typeof record.expires === "string" && typeof Date.parse(record.expires) === "number") {
            const diffDays = (Date.parse(record.expires) - new Date().getTime()) / (1000 * 60 * 60 * 24);
            let returnValue = "";
            if (diffDays < 0) {
                // Registracija je istekla
                returnValue = formating.expired
            } else if (diffDays < 7) {
                // Registracija istice za manje od tjedan dana
                returnValue = formating.expiring
            }
            return returnValue
        }
    };

    const myPrimaryText = (record) => {
        return (
            <span key={record.name}>{capitalizeFirstLetter(record.type)} {record.name}</span>
        );
    };

    const mySecondaryText = (record) => {
        return (
            <div>
                <span>{record.registration}, {record.chassis} {record.code && `(${record.code})`}</span>
                <span>vlasnik: {record.owner}</span>
            </div>
        );
    }

    const myTertiaryText = (record) => {
        const date = new Date(Date.parse(record.expires));
        return (
            <span className="yuyu" style={{ color: formatRecord(record, {expired: "#e6101b", expiring: "rgb(196, 180, 7)"}) }}>{date.toLocaleDateString("hr", { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            )
    };

    const postRowStyle = (record, index) => {
        return ({
            backgroundColor: formatRecord(record, {expired: "rgba(252, 121, 132, 0.75)", expiring: "rgba(247, 232, 96, 0.83)"})
        });
    };

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (
        <List title="Evidencija registracija" bulkActionButtons={false} {...props}>
            {isSmall ? (
                <SimpleList
                    primaryText={record => myPrimaryText(record)}
                    secondaryText={record => mySecondaryText(record)}
                    tertiaryText={record => myTertiaryText(record)}
                    linkType="edit"
                />
            ) : (
                    <Datagrid rowStyle={postRowStyle}>
                        <TextField label="Stroj " source='name' />
                        <TextField label="Tip stroja" source="type" />
                        <TextField label="Reg. oznaka" source='registration' />
                        <TextField label="Broj šasije" source='chassis' />
                        <TextField label="Oznaka" source='code' />
                        <TextField label="Vlasnik" source='owner' />
                        <DateField label="Datum isteka" source='expires' locales="hr" options={{ weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }} />
                        <EditButton basePath='/vehicles' />
                        <DeleteButton basePath='/vehicles' />
                    </Datagrid>
                )}
        </List>
    )
}

export default VehicleList