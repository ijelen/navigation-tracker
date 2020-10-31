import React from 'react'
import { Edit, SimpleForm, TextInput, DateInput, SelectInput } from 'react-admin'
import vehicleTypes from '../data/vehicleTypes'

const VehicleEdit = (props) => {
    return (
        <Edit title="Uredi stroj" {...props}>
            <SimpleForm>
                <TextInput label="Naziv" source="name" />
                <SelectInput label="Tip stroja" source="type" choices={vehicleTypes}/>
                <TextInput label="Oznaka" source="code" />
                <TextInput label="Registracijska oznaka" source="registration" />
                <TextInput label="Broj šasije" source="chassis" />
                <TextInput label="Vlasnik" source="owner" />
                <DateInput label="Datum isteka" source="expires" />
            </SimpleForm>
        </Edit>
    )
}

export default VehicleEdit
