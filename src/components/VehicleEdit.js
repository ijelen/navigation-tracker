import React from 'react'
import { Edit, SimpleForm, TextInput, DateInput, SelectInput } from 'react-admin'
import vehicleTypes from '../data/vehicleTypes'

const VehicleEdit = (props) => {
    return (
        <Edit title="Uredi stroj" {...props}>
            <SimpleForm>
                 <TextInput source="name" />
                 <SelectInput source="type" choices={vehicleTypes}/>
                <TextInput source="code" />
                <TextInput source="registration" />
                <TextInput source="chassis" />
                <TextInput source="owner" />
                <DateInput label="Datum isteka" source="expires" />
            </SimpleForm>
        </Edit>
    )
}

export default VehicleEdit
