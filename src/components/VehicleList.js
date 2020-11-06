import React from 'react'
import { List, useListContext, Datagrid, TextField, DateField, EditButton, DeleteButton } from 'react-admin';
import { useMediaQuery } from '@material-ui/core';

import {List as MuiList} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

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

    const postRowStyle = (record, index) => {
        return ({
            backgroundColor: formatRecord(record, {expired: "rgba(252, 121, 132, 0.75)", expiring: "rgba(247, 232, 96, 0.83)"})
        });
    };

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const MySimpleList = (props) => {
        const { ids, data, basePath } = useListContext();
        return (
            <MuiList>
                {ids.map(id =>
                <ListItem 
                    style={{backgroundColor: formatRecord(data[id], {expired: "rgba(252, 121, 132, 0.75)", expiring: "rgba(247, 232, 96, 0.83)"})}} 
                    key={id} 
                    button 
                    component="a" 
                    href={`#${basePath}/${id}`}
                    >
                    <ListItemText 
                        primary={(
                            <Grid container justify="space-between">
                                <Grid item>
                                   {capitalizeFirstLetter(data[id].type)} {data[id].name}
                                </Grid>
                                <Grid item>
                                    <DateField record={data[id]} source="expires" locales="hr" options={{ weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }} />
                                </Grid>
                            </Grid>
                            )}
                        secondary={(
                            <div>
                                <span>{data[id].registration}, {data[id].chassis} {data[id].code && `(${data[id].code})`}</span>
                                <span>vlasnik: {data[id].owner}</span>
                            </div>
                            )} 
                    />
                </ListItem>
            )}
        </MuiList>
        )
    }

    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (
        <List title="Evidencija registracija" bulkActionButtons={false} {...props}>
            {isSmall ? (
                 <MySimpleList/>
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