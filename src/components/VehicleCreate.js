import React from 'react'
import { Create, SimpleForm, TextInput, DateInput, SelectInput, useNotify, useRefresh, useRedirect } from 'react-admin'
import vehicleTypes from '../data/vehicleTypes'

const VehicleCreate = (props) => {
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = ({ data }) => {
        notify(`Novi stroj "${data.name}" je pohranjen`)
        redirect('/vehicles');
        refresh();
    };

    return (
        <Create onSuccess={onSuccess} title="Dodaj stroj" {...props}>
            <SimpleForm>
                <TextInput label="Naziv" source="name" />
                <SelectInput label="Tip stroja" source="type" choices={vehicleTypes}/>
                <TextInput label="Oznaka" source="code" />
                <TextInput label="Registracijska oznaka" source="registration" />
                <TextInput label="Broj šasije" source="chassis" />
                <TextInput label="Vlasnik" source="owner" />
                <DateInput label="Datum isteka" source="expires" defaultValue={new Date()} />
            </SimpleForm>
        </Create>
    )
}

export default VehicleCreate
