import React from 'react';
import {List, 
        NumberField,
        DateField,
        Filter, 
        Datagrid, 
        Create, 
        TextField, 
        SimpleForm, 
        Edit, 
        TextInput,
        Show,
        SimpleShowLayout,
        ReferenceField,
        SelectInput,
        ReferenceInput,
        DateInput,
        BooleanField,
        NumberInput,
        BooleanInput} from 'react-admin';
const redirect = (basePath, id, data) => '/actuators';
const ActuatorsTitle = ({ actuator }) => {
    return <span>Actuator {actuator ? `"${actuator.description}"` : ''}</span>;
};



export const ActuatorList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="name" />
            <TextField source="description" />
            <BooleanField source="activated" />
            <NumberField source="threshold" />
            <BooleanField source="automatic" />
            <NumberField source="minutes" />
        </Datagrid>
    </List>
);

export const ActuatorEdit = props => (
    <Edit {...props}>
        <SimpleForm>
           
            <TextInput source="name" />
            <TextInput source="description" />
            <BooleanInput source="activated" />
            <NumberInput source="threshold" />
            <BooleanInput source="automatic" />
            <NumberInput source="minutes" />
        </SimpleForm>
    </Edit>
);

export const ActuatorCreate = props => (
    <Create {...props}>
        <SimpleForm redirect={redirect}>
            
            <TextInput source="name" />
            <TextInput source="description" />
            <BooleanInput source="activated" />
            <NumberInput source="threshold" />
            <BooleanInput source="automatic" />
            <NumberInput source="minutes" />
        </SimpleForm>
    </Create>
);

export const ActuatorShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="description" />
            <BooleanField source="activated" />
            <NumberField source="threshold" />
            <BooleanField source="automatic" />
            <NumberField source="minutes" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
        </SimpleShowLayout>
    </Show>
);